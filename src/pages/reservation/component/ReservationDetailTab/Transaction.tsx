/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 15/09/2022
Updated Date : 23/11/2022
Main functions : Transaction Tab
************************************ */

import 'styles/transaction.css';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Card, Col, Input, message, Modal, Row, Space } from 'antd';
import { formatNumber } from 'helpers';
import Disk from 'pages/reservation/detail/Disk';
import Paid from 'pages/reservation/detail/Paid';
import AddDiscount from 'pages/reservation/modal/TransactionModal/AddDiscount';
import AddItem from 'pages/reservation/modal/TransactionModal/AddItem';
import Deposit from 'pages/reservation/modal/TransactionModal/Deposit';
import PaySelectedModal from 'pages/reservation/modal/TransactionModal/PaySelectedModal';
import RoomAuditCharge from 'pages/reservation/modal/TransactionModal/RoomAuditCharge';
import SelectDiskModal from 'pages/reservation/modal/TransactionModal/SelectDiskModal';
import SelectedPayMethodModal from 'pages/reservation/modal/TransactionModal/SelectedPayMethodModal';
import TransferRoom from 'pages/reservation/modal/TransactionModal/TransferRoom';
import {
  selectAddItem,
  selectChangeDisk,
  selectChangeRoom,
  selectCreatePayment,
  selectDeleteItem,
  selectGetReservationDetail,
} from 'selectors';
import useTreeChanges from 'tree-changes-hook';
import _ from 'underscore';

import { useAppSelector } from 'modules/hooks';

import {
  deleteItemAction,
  downloadPDFInvoiceTransaction,
  getReservation,
  getReservationDetail,
  resetReservationByFolio,
} from 'actions';

import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

interface Props {
  noPadding?: boolean;
  reservationDetailId: string;
  reservationId: string;
  type?: string;
}

const { TextArea } = Input;

function Transaction({ noPadding, reservationDetailId, reservationId, type }: Props) {
  const { t } = useTranslation();
  const reservationDetailInfo: any = useAppSelector(selectGetReservationDetail);
  const { amount_info: amountInfo, paid, transactions } = reservationDetailInfo.data;

  const [isModalOpenAddItem, setIsModalOpenAddItem] = useState(false);
  const [isModalOpenPaySelected, setIsModalOpenPaySelected] = useState(false);
  const [isModalOpenChangeDisk, setIsModalOpenChangeDisk] = useState(false);
  const [isModalOpenAditRoomCharge, setIsModalOpenAditRoomCharge] = useState(false);
  const [isModalOpenTransferRoom, setIsModalOpenTransferRoom] = useState(false);
  const [deleteSaleDetailId, setDeleteSaleDetailId] = useState(0);

  const [discountAmount, setDiscountAmount] = useState('');

  const addItemData = useAppSelector(selectAddItem);
  const deleteItemData = useAppSelector(selectDeleteItem);
  const changeDiskData = useAppSelector(selectChangeDisk);
  const changeRoomData = useAppSelector(selectChangeRoom);
  const createPaymentData = useAppSelector(selectCreatePayment);

  const { changed: addItemChanged } = useTreeChanges(addItemData);
  const { changed: deleteItemChanged } = useTreeChanges(deleteItemData);
  const { changed: changeDiskChanged } = useTreeChanges(changeDiskData);
  const { changed: changeRoomChanged } = useTreeChanges(changeRoomData);
  const { changed: createPaymentChanged } = useTreeChanges(createPaymentData);

  const dispatch = useDispatch();

  const tabList: any = [];
  const contentList: any = {};
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [paySelectedRowKeys, setPaySelectedRowKeys] = useState<any>([]);
  const [paySelectedRows, setPaySelectedRows] = useState<any>([]);

  const resetSelectedSelect = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  const rowSelectionDisk = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[], newSelectedRows: any) => {
      setSelectedRowKeys(newSelectedRowKeys);
      setSelectedRows(newSelectedRows);
      setPaySelectedRowKeys(newSelectedRowKeys);
      setPaySelectedRows(newSelectedRows);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.description === 'Discount' || record.description === 'Deposit',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const handleDeleteItem = (item: any) => {
    showDeleteItemModal();
    setDeleteSaleDetailId(item.sale_detail_id);
  };

  const handlePayment = () => {
    const { items } = transactions[activeTabKey];
    const newSelectedRows: any = [];
    const newSelectedRowKeys: any = [];

    items.forEach((item: any) => {
      if (
        item.description.toLowerCase() !== 'discount' &&
        item.description.toLowerCase() !== 'deposit'
      ) {
        newSelectedRows.push({
          amount: item.quantity,
          date: item.date,
          description: item.description,
          key: item.sale_detail_id,
          sale_detail_id: item.sale_detail_id,
          storage_id: item.storage_id,
          total: formatNumber(item.total_amount),
          total_amount: item.total_amount,
          unit_price: item.unit_price,
        });
        newSelectedRowKeys.push(item.sale_detail_id);
      }
    });

    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRows);
    setPaySelectedRowKeys(newSelectedRowKeys);
    setPaySelectedRows(newSelectedRows);

    setIsModalOpenPaySelected(true);
  };

  const handleInvoiceDownloadPdf = () => {
    dispatch(
      downloadPDFInvoiceTransaction({
        payload: {
          reservation_detail_id: reservationDetailId ?? '',
          reservation_info_id: reservationId ?? '',
          file_name: `the_mansion_hotel_${reservationId}_${reservationDetailId}.pdf`,
        },
      }),
    );
  };

  if (transactions) {
    Object.keys(transactions).forEach((key: any) => {
      const tabKey = `${key}`;
      let tabName = `Disk ${key}`;

      if (key.toLowerCase() === 'deposit') {
        tabName = t('common.Deposit');
      }

      tabList.push({
        key: tabKey,
        tab: tabName,
      });

      contentList[tabKey] = (
        <Disk
          handleDeleteItem={handleDeleteItem}
          items={transactions[key].items}
          rowSelectionDisk={key.toLowerCase() === 'deposit' ? null : rowSelectionDisk}
        />
      );
    });
  }

  if (paid?.length) {
    tabList.push({
      key: 'paid',
      tab: 'Paid',
    });

    contentList.paid = <Paid items={paid} />;
  }

  const [activeTabKey, setActiveTabKey] = useState<string>(
    transactions ? Object.keys(transactions)[0] : '',
  );
  const [isModalOpenSelectedPaymentMethod, setIsModalOpenSelectedPaymentMethod] = useState(false);
  const [isModalOpenAddDiscount, setIsModalOpenAddDiscount] = useState(false);
  const [isModalOpenDeposit, setIsModalOpenDeposit] = useState(false);

  const gridStyleLeft: React.CSSProperties = {
    textAlign: 'left',
    color: '#1D39C4',
    paddingLeft: 20,
    fontSize: 15,
  };

  const gridStyleRight: React.CSSProperties = {
    textAlign: 'right',
    float: 'right',
    color: '#1D39C4',
    paddingRight: 20,
    fontSize: 18,
  };

  const svgButton: React.CSSProperties = {
    cursor: 'pointer',
  };

  const totalAmount = _.reduce(
    paySelectedRows,
    function (total, item: any) {
      return parseInt(item.total_amount, 10) + total;
    },
    0,
  );

  useEffect(() => {
    if (addItemChanged('status', 'SUCCESS')) {
      message.success(t('message.Add item successfully!'));

      dispatch(
        getReservation({
          reservation_id: reservationId,
        }),
      );

      dispatch(
        getReservationDetail({
          reservation_id: reservationId,
          reservation_detail_id: reservationDetailId,
        }),
      );
    }
  }, [addItemChanged]);

  useEffect(() => {
    if (deleteItemChanged('status', 'SUCCESS')) {
      message.success(t('message.Delete item successfully!'));

      dispatch(
        getReservationDetail({
          reservation_id: reservationId,
          reservation_detail_id: reservationDetailId,
        }),
      );
    }
  }, [deleteItemChanged]);

  useEffect(() => {
    if (transactions) {
      setActiveTabKey(Object.keys(transactions)[0]);
    }
  }, [transactions]);

  useEffect(() => {
    resetSelectedSelect();
  }, [reservationDetailInfo]);

  useEffect(() => {
    if (changeDiskChanged('status', 'SUCCESS')) {
      message.success(t('message.Change disk successfully!'));

      resetSelectedSelect();

      dispatch(
        getReservationDetail({
          reservation_id: reservationId,
          reservation_detail_id: reservationDetailId,
        }),
      );
    }
  }, [changeDiskChanged]);

  useEffect(() => {
    if (changeRoomChanged('status', 'SUCCESS')) {
      message.success(t('message.Transfer room successfully!'));

      resetSelectedSelect();

      dispatch(
        getReservationDetail({
          reservation_id: reservationId,
          reservation_detail_id: reservationDetailId,
        }),
      );
    }
  }, [changeRoomChanged]);

  useEffect(() => {
    if (createPaymentChanged('status', 'SUCCESS')) {
      message.success(t('message.Paid successfully!'));

      resetSelectedSelect();

      dispatch(
        getReservationDetail({
          reservation_id: reservationId,
          reservation_detail_id: reservationDetailId,
        }),
      );
    }
  }, [createPaymentChanged]);

  const [isDeleteItemModalOpen, setIsDeleteItemModalOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');

  const showDeleteItemModal = () => {
    setIsDeleteItemModalOpen(true);
  };

  const handleDeleteItemOk = () => {
    dispatch(
      deleteItemAction({
        payload: {
          sale_detail_ids: [
            {
              id: deleteSaleDetailId,
              comment: deleteReason,
            },
          ],
        },
      }),
    );
    setDeleteReason('');
    setIsDeleteItemModalOpen(false);
  };

  const handleDeleteItemCancel = () => {
    setDeleteReason('');
    setIsDeleteItemModalOpen(false);
  };

  return (
    <Row
      style={{
        paddingTop: noPadding ? 10 : 16,
        background: noPadding ? '' : '#F0F2F5',
        paddingBottom: noPadding ? 10 : 25,
        paddingRight: noPadding ? 6 : 15,
        paddingLeft: noPadding ? 6 : 15,
      }}
    >
      <Modal
        okButtonProps={{
          style: { backgroundColor: '#1D39C4' },
          disabled: deleteReason.trim() === '',
        }}
        okText={t('common.Delete')}
        onCancel={handleDeleteItemCancel}
        onOk={handleDeleteItemOk}
        title={t('common.The reason for deletion')}
        visible={isDeleteItemModalOpen}
      >
        <div style={{ marginTop: -15, paddingBottom: 10 }}>
          Reason <span style={{ color: 'red' }}>*</span>
        </div>
        <TextArea
          onChange={event => setDeleteReason(event.target.value)}
          rows={4}
          value={deleteReason}
        />
      </Modal>
      <Col span={16} style={{ paddingRight: 16 }}>
        <Card
          activeTabKey={activeTabKey}
          className="transaction-tabs"
          onTabChange={key => {
            setActiveTabKey(key);
          }}
          style={{ width: '100%' }}
          tabList={tabList}
        >
          <div style={{ minHeight: type && type === 'checkout_today' ? 430 : 380 }}>
            {contentList[activeTabKey]}
          </div>
          <div>
            {type && type === 'checkout_today' ? (
              <Row>
                <Col span={4} style={{ paddingRight: 17 }}>
                  <PattonButton
                    onClick={() => setIsModalOpenAddItem(true)}
                    style={{ width: '100%' }}
                    type="primary"
                  >
                    {t('common.Add Item')}
                  </PattonButton>
                  <AddItem
                    reservationDetailId={reservationDetailId}
                    reservationId={reservationId}
                    setIsModalOpen={setIsModalOpenAddItem}
                    visible={isModalOpenAddItem}
                  />
                </Col>
                <Col span={20} style={{ paddingLeft: 10 }}>
                  <Row>
                    <Col span={4} style={{ paddingLeft: 10 }}>
                      <MButton
                        disabled={selectedRowKeys.length === 0}
                        onClick={() => setIsModalOpenPaySelected(true)}
                        style={{ width: '100%' }}
                      >
                        {t('paySelected.Pay Selected')}
                      </MButton>
                      <PaySelectedModal
                        discountAmount={discountAmount}
                        paySelectedRowKeys={paySelectedRowKeys}
                        selectedRows={selectedRows}
                        setDiscountAmount={setDiscountAmount}
                        setIsModalOpen={setIsModalOpenPaySelected}
                        setIsModalOpenSelectedPaymentMethod={setIsModalOpenSelectedPaymentMethod}
                        setPaySelectedRowKeys={setPaySelectedRowKeys}
                        setPaySelectedRows={setPaySelectedRows}
                        totalAmount={totalAmount}
                        visible={isModalOpenPaySelected}
                      />
                    </Col>
                    <Col span={4} style={{ paddingLeft: 10 }}>
                      <MButton
                        disabled={selectedRowKeys.length === 0}
                        onClick={() => setIsModalOpenChangeDisk(true)}
                        style={{ width: '100%' }}
                      >
                        {t('paySelected.Transfer Disk')}
                      </MButton>
                      <SelectDiskModal
                        saleDetailIds={selectedRowKeys}
                        setIsModalOpen={setIsModalOpenChangeDisk}
                        visible={isModalOpenChangeDisk}
                      />
                    </Col>
                    <Col span={4} style={{ paddingLeft: 10 }}>
                      <MButton style={{ width: '100%' }}>{t('common.Overtime')}</MButton>
                    </Col>
                    <Col span={4} style={{ paddingLeft: 10 }}>
                      <MButton
                        onClick={() => setIsModalOpenAddDiscount(true)}
                        style={{ width: '100%' }}
                      >
                        {t('common.Discount')}
                      </MButton>
                      <AddDiscount
                        setIsModalOpen={setIsModalOpenAddDiscount}
                        visible={isModalOpenAddDiscount}
                      />
                    </Col>
                    <Col span={4} style={{ paddingLeft: 10 }}>
                      <MButton
                        onClick={() => setIsModalOpenDeposit(true)}
                        style={{ width: '100%' }}
                      >
                        {t('common.Deposit')}
                      </MButton>
                      <Deposit
                        grandTotal={amountInfo?.grand_total}
                        isModalVisible={isModalOpenDeposit}
                        setModalVisible={setIsModalOpenDeposit}
                      />
                    </Col>
                    <Col span={4} style={{ paddingLeft: 10 }}>
                      <MButton
                        disabled={selectedRowKeys.length === 0}
                        onClick={() => setIsModalOpenTransferRoom(true)}
                        style={{ width: '100%' }}
                      >
                        {t('transaction.Transfer Room')}
                      </MButton>
                      <TransferRoom
                        selectedSaleRowKeys={selectedRowKeys}
                        setIsModalOpen={setIsModalOpenTransferRoom}
                        totalAmount={totalAmount}
                        visible={isModalOpenTransferRoom}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            ) : (
              <>
                <Row>
                  <Col span={8} style={{ paddingRight: 17 }}>
                    <PattonButton
                      onClick={() => setIsModalOpenAddItem(true)}
                      style={{ width: '100%' }}
                      type="primary"
                    >
                      {t('common.Add Item')}
                    </PattonButton>
                    <AddItem
                      reservationDetailId={reservationDetailId}
                      reservationId={reservationId}
                      setIsModalOpen={setIsModalOpenAddItem}
                      visible={isModalOpenAddItem}
                    />
                  </Col>
                  <Col span={8} style={{ paddingRight: 17 }}>
                    <MButton
                      disabled={selectedRowKeys.length === 0}
                      onClick={() => setIsModalOpenPaySelected(true)}
                      style={{ width: '100%' }}
                    >
                      {t('paySelected.Pay Selected')}
                    </MButton>
                    <PaySelectedModal
                      discountAmount={discountAmount}
                      paySelectedRowKeys={paySelectedRowKeys}
                      selectedRows={selectedRows}
                      setDiscountAmount={setDiscountAmount}
                      setIsModalOpen={setIsModalOpenPaySelected}
                      setIsModalOpenSelectedPaymentMethod={setIsModalOpenSelectedPaymentMethod}
                      setPaySelectedRowKeys={setPaySelectedRowKeys}
                      setPaySelectedRows={setPaySelectedRows}
                      totalAmount={totalAmount}
                      visible={isModalOpenPaySelected}
                    />
                  </Col>
                  <Col span={8}>
                    <MButton
                      onClick={() => setIsModalOpenAditRoomCharge(true)}
                      style={{ width: '100%' }}
                    >
                      {t('auditRoomCharge.Add Room Charge')}
                    </MButton>
                    <RoomAuditCharge
                      reservationDetailId={reservationDetailId}
                      reservationId={reservationId}
                      setIsModalOpen={setIsModalOpenAditRoomCharge}
                      visible={isModalOpenAditRoomCharge}
                    />
                  </Col>
                </Row>
                <Row style={{ paddingTop: 18 }}>
                  <Col span={8} style={{ paddingRight: 17 }}>
                    <MButton style={{ width: '100%' }}>{t('transaction.Add Disk')}</MButton>
                  </Col>
                  <Col span={8} style={{ paddingRight: 17 }}>
                    <MButton
                      disabled={selectedRowKeys.length === 0}
                      onClick={() => setIsModalOpenChangeDisk(true)}
                      style={{ width: '100%' }}
                    >
                      {t('paySelected.Transfer Disk')}
                    </MButton>
                    <SelectDiskModal
                      saleDetailIds={selectedRowKeys}
                      setIsModalOpen={setIsModalOpenChangeDisk}
                      visible={isModalOpenChangeDisk}
                    />
                  </Col>
                  <Col span={8}>
                    <MButton
                      disabled={selectedRowKeys.length === 0}
                      onClick={() => setIsModalOpenTransferRoom(true)}
                      style={{ width: '100%' }}
                    >
                      {t('transaction.Transfer Room')}
                    </MButton>
                    <TransferRoom
                      selectedSaleRowKeys={selectedRowKeys}
                      setIsModalOpen={setIsModalOpenTransferRoom}
                      totalAmount={totalAmount}
                      visible={isModalOpenTransferRoom}
                    />
                  </Col>
                </Row>
              </>
            )}
          </div>
        </Card>
      </Col>
      <Col span={8}>
        <div
          className="site-card-border-less-wrapper transaction-checkout"
          style={{ height: '90%' }}
        >
          <Card
            bordered={false}
            style={{ border: '1px solid #1D39C4', height: '100%' }}
            title="Checkout"
          >
            <div style={{ flexGrow: 1, background: '#F7F9FA', marginTop: 1 }}>
              <Space direction="vertical" size="small" style={{ display: 'flex', paddingTop: 20 }}>
                <div className="checkout-card-grid">
                  <span style={gridStyleLeft}>{t('common.Sub total')}</span>
                  <span style={gridStyleRight}>{formatNumber(amountInfo?.sub_total)}</span>
                </div>
                <div className="checkout-card-grid">
                  <span style={gridStyleLeft}>
                    {t('common.Deposit')}{' '}
                    <svg
                      fill="none"
                      height="14"
                      onClick={() => setIsModalOpenDeposit(true)}
                      style={svgButton}
                      viewBox="0 0 14 14"
                      width="14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.99992 0.333496C3.38087 0.333496 0.333252 3.38111 0.333252 7.00016C0.333252 10.6192 3.38087 13.6668 6.99992 13.6668C10.619 13.6668 13.6666 10.6192 13.6666 7.00016C13.6666 3.38111 10.619 0.333496 6.99992 0.333496ZM10.8094 7.00016C10.8094 7.26316 10.5962 7.47635 10.3333 7.47635H7.47611V10.3335C7.47611 10.5965 7.26291 10.8097 6.99992 10.8097C6.73693 10.8097 6.52373 10.5965 6.52373 10.3335V7.47635H3.66658C3.40359 7.47635 3.19039 7.26316 3.19039 7.00016C3.19039 6.73717 3.40359 6.52397 3.66659 6.52397H6.52373V3.66683C6.52373 3.40384 6.73693 3.19064 6.99992 3.19064C7.26291 3.19064 7.47611 3.40384 7.47611 3.66683V6.52397H10.3333C10.5962 6.52397 10.8094 6.73717 10.8094 7.00016Z"
                        fill="#1D39C4"
                      />
                    </svg>
                    <Deposit
                      grandTotal={amountInfo?.grand_total}
                      isModalVisible={isModalOpenDeposit}
                      setModalVisible={setIsModalOpenDeposit}
                    />
                  </span>
                  <span style={gridStyleRight}>{formatNumber(amountInfo?.deposit)}</span>
                </div>
                <div className="checkout-card-grid">
                  <span style={gridStyleLeft}>
                    {t('common.Discount')}{' '}
                    <svg
                      fill="none"
                      height="14"
                      onClick={() => setIsModalOpenAddDiscount(true)}
                      style={svgButton}
                      viewBox="0 0 14 14"
                      width="14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.99992 0.333496C3.38087 0.333496 0.333252 3.38111 0.333252 7.00016C0.333252 10.6192 3.38087 13.6668 6.99992 13.6668C10.619 13.6668 13.6666 10.6192 13.6666 7.00016C13.6666 3.38111 10.619 0.333496 6.99992 0.333496ZM10.8094 7.00016C10.8094 7.26316 10.5962 7.47635 10.3333 7.47635H7.47611V10.3335C7.47611 10.5965 7.26291 10.8097 6.99992 10.8097C6.73693 10.8097 6.52373 10.5965 6.52373 10.3335V7.47635H3.66658C3.40359 7.47635 3.19039 7.26316 3.19039 7.00016C3.19039 6.73717 3.40359 6.52397 3.66659 6.52397H6.52373V3.66683C6.52373 3.40384 6.73693 3.19064 6.99992 3.19064C7.26291 3.19064 7.47611 3.40384 7.47611 3.66683V6.52397H10.3333C10.5962 6.52397 10.8094 6.73717 10.8094 7.00016Z"
                        fill="#1D39C4"
                      />
                    </svg>
                    <AddDiscount
                      setIsModalOpen={setIsModalOpenAddDiscount}
                      visible={isModalOpenAddDiscount}
                    />
                  </span>
                  <span style={gridStyleRight}>{formatNumber(amountInfo?.discount)}</span>
                </div>
                <div className="checkout-card-grid">
                  <span style={gridStyleLeft}>{t('common.VAT')}</span>
                  <span style={gridStyleRight}>{formatNumber(amountInfo?.vat)}</span>
                </div>
                <div className="checkout-card-grid">
                  <span style={gridStyleLeft}>{t('common.Paid')}</span>
                  <span style={gridStyleRight}>{formatNumber(amountInfo?.paid)}</span>
                </div>
                <div className="checkout-card-grid">
                  <span style={gridStyleLeft}>
                    {t('common.Exchange currency')}{' '}
                    <svg
                      fill="none"
                      height="14"
                      style={svgButton}
                      viewBox="0 0 14 14"
                      width="14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.99992 0.333496C3.38087 0.333496 0.333252 3.38111 0.333252 7.00016C0.333252 10.6192 3.38087 13.6668 6.99992 13.6668C10.619 13.6668 13.6666 10.6192 13.6666 7.00016C13.6666 3.38111 10.619 0.333496 6.99992 0.333496ZM10.8094 7.00016C10.8094 7.26316 10.5962 7.47635 10.3333 7.47635H7.47611V10.3335C7.47611 10.5965 7.26291 10.8097 6.99992 10.8097C6.73693 10.8097 6.52373 10.5965 6.52373 10.3335V7.47635H3.66658C3.40359 7.47635 3.19039 7.26316 3.19039 7.00016C3.19039 6.73717 3.40359 6.52397 3.66659 6.52397H6.52373V3.66683C6.52373 3.40384 6.73693 3.19064 6.99992 3.19064C7.26291 3.19064 7.47611 3.40384 7.47611 3.66683V6.52397H10.3333C10.5962 6.52397 10.8094 6.73717 10.8094 7.00016Z"
                        fill="#1D39C4"
                      />
                    </svg>
                  </span>
                  <span style={gridStyleRight}>USD</span>
                </div>

                <div className="checkout-card-grid">
                  <span style={gridStyleLeft}>{t('common.Exchange rate')}</span>
                  <span style={gridStyleRight}>23.000</span>
                </div>
                <div className="checkout-card-grid">
                  <span style={gridStyleLeft}>{t('common.Amount')}</span>
                  <span style={gridStyleRight}>
                    {formatNumber(parseInt(amountInfo?.grand_total, 10) / 23000)}
                  </span>
                </div>
              </Space>
            </div>
            <div style={{ borderTop: '1px solid #1D39C4' }}>
              <span style={{ ...gridStyleLeft, position: 'relative', top: '40%' }}>
                {t('common.Grand Total')}
              </span>
              <span style={{ ...gridStyleRight, position: 'relative', top: '40%' }}>
                {formatNumber(amountInfo?.grand_total)}
              </span>
            </div>
          </Card>
        </div>
        <Row style={{ paddingTop: transactions?.length === 0 ? 18 : 22 }}>
          <Col span={12} style={{ paddingRight: 18 }}>
            <MButton
              onClick={handleInvoiceDownloadPdf}
              style={{
                width: '100%',
                border: '1px solid #1D39C4',
                color: '#1D39C4',
                background: '#F0F2F5',
              }}
            >
              {t('common.Print Invoice')}
            </MButton>
          </Col>

          <Col span={12}>
            <PattonButton onClick={handlePayment} style={{ width: '100%' }} type="primary">
              {t('common.Payment')}
            </PattonButton>
            <SelectedPayMethodModal
              discountAmount={discountAmount}
              paySelectedRowKeys={paySelectedRowKeys}
              reservationDetailId={reservationDetailId}
              setIsModalOpenPaySelected={setIsModalOpenPaySelected}
              setIsModalOpenSelectedPaymentMethod={setIsModalOpenSelectedPaymentMethod}
              totalAmount={totalAmount}
              visible={isModalOpenSelectedPaymentMethod}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Transaction;
