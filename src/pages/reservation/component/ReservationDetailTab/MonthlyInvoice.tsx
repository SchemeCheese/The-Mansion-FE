import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Card, Col, Row } from 'ui/antd';
import { formatNumber } from 'helpers';
import DiskMonthlyInvoice from 'pages/reservation/detail/DiskMonthlyInvoice';
import Paid from 'pages/reservation/detail/Paid';
import AddInvoiceModal from 'pages/reservation/modal/TransactionModal/AddInvoiceModal';
import PaySelectedModal from 'pages/reservation/modal/TransactionModal/PaySelectedModal';
import SelectedPayMethodModal from 'pages/reservation/modal/TransactionModal/SelectedPayMethodModal';
import { selectGetMonthlyInvoices, selectPaymentMonthlyInvoices } from 'selectors';
import useTreeChanges from 'tree-changes-hook';

import { useAppSelector } from 'modules/hooks';

import { getMonthlyInvoicesAction } from 'actions';

import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';
import { notify } from 'ui/notification';
import detailStyles from 'pages/reservation/detail/reservation-detail.module.css';

interface Props {
  reservationDetailId: string;
  reservationId: string;
}

function MonthlyInvoice({ reservationDetailId, reservationId }: Props) {
  const { t } = useTranslation();

  const [data, setData] = useState<any>([]);
  const [addMonthlyInvoiceSucess, setAddMonthlyInvoiceSucess] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState<string>('');

  const monthlyInvoiceData = useAppSelector(selectGetMonthlyInvoices);
  const paymentMonthlyInvoiceData = useAppSelector(selectPaymentMonthlyInvoices);

  const { changed } = useTreeChanges(monthlyInvoiceData);
  const { changed: paymentMonthlyInvoiceChanged } = useTreeChanges(paymentMonthlyInvoiceData);

  let tabList: any = [];

  if (data && data.transactions) {
    tabList = data.transactions.map((item: any, index: number) => {
      return {
        key: index.toString(),
        tab: item.description,
      };
    });
  }

  useEffect(() => {
    if (changed('is_searching', false)) {
      setData(monthlyInvoiceData.data.transactions);
    }
  }, [changed]);

  useEffect(() => {
    if (paymentMonthlyInvoiceChanged('status', 'SUCCESS')) {
      notify.success(t('message.Paid successfully!'));

      dispatch(
        getMonthlyInvoicesAction({
          reservation_info_id: reservationId,
          reservation_detail_id: reservationDetailId,
        }),
      );
    }
  }, [paymentMonthlyInvoiceChanged]);

  useEffect(() => {
    if (tabList.length > 0) {
      setActiveTabKey(tabList[0].key.toString());
    }
  }, [data]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [isOpenAddInvoiceModalVisible, setIsOpenAddInvoiceModalVisible] = useState(false);

  const dispatch = useDispatch();

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeysTable: any, selectedRows: any) => {
      let totalAmount = 0;
      const selectedRowsData = selectedRows.map((item: any) => {
        totalAmount += item.actual_amount;

        return {
          ...item,
          date: item.use_month,
          description: item.description,
          unit_price: formatNumber(item.actual_amount),
          amount: formatNumber(item.actual_amount),
          total: formatNumber(item.actual_amount),
        };
      });

      setPaySelectedRowKeys(selectedRowKeysTable);
      setSelectedRowKeys(selectedRowKeysTable);
      setTotalAmount(totalAmount);
      setSelectedRows(selectedRowsData);
    },
    getCheckboxProps: (record: any) => ({
      name: record.name,
    }),
  };

  const handleAddNewInvoice = () => {
    setIsOpenAddInvoiceModalVisible(true);
  };

  useEffect(() => {
    if (addMonthlyInvoiceSucess) {
      dispatch(
        getMonthlyInvoicesAction({
          reservation_info_id: reservationId,
          reservation_detail_id: reservationDetailId,
        }),
      );

      setAddMonthlyInvoiceSucess(false);
    }
  }, [addMonthlyInvoiceSucess]);

  useEffect(() => {
    dispatch(
      getMonthlyInvoicesAction({
        reservation_info_id: reservationId,
        reservation_detail_id: reservationDetailId,
      }),
    );
  }, []);

  const [discountAmount, setDiscountAmount] = useState('');
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [paySelectedRowKeys, setPaySelectedRowKeys] = useState<any>([]);
  const [paySelectedRows, setPaySelectedRows] = useState<any>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isModalOpenPaySelected, setIsModalOpenPaySelected] = useState(false);
  const [isModalOpenSelectedPaymentMethod, setIsModalOpenSelectedPaymentMethod] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const contentList: any = {};

  if (monthlyInvoiceData.data.transactions) {
    Object.keys(monthlyInvoiceData.data.transactions).forEach((key: any) => {
      const tabKey = `${key}`;
      let tabName = monthlyInvoiceData.data.transactions[key].description;

      if (key.toLowerCase() === 'deposit') {
        tabName = t('common.Deposit');
      }

      tabList.push({
        key: tabKey,
        tab: tabName,
      });

      contentList[tabKey] = (
        <DiskMonthlyInvoice
          items={monthlyInvoiceData.data.transactions[key].items}
          rowSelectionDisk={key.toLowerCase() === 'deposit' ? null : rowSelection}
        />
      );
    });
  }

  if (monthlyInvoiceData.data.paid?.length) {
    tabList.push({
      key: 'paid',
      tab: 'Paid',
    });

    contentList.paid = <Paid items={monthlyInvoiceData.data.paid} type="monthly-invoice" />;
  }

  return (
    <>
      <PaySelectedModal
        discountAmount={discountAmount}
        isSelectAll={isSelectAll}
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

      <SelectedPayMethodModal
        discountAmount={discountAmount}
        paySelectedRowKeys={paySelectedRowKeys}
        reservationDetailId={reservationDetailId}
        setIsModalOpenPaySelected={setIsModalOpenPaySelected}
        setIsModalOpenSelectedPaymentMethod={setIsModalOpenSelectedPaymentMethod}
        totalAmount={totalAmount}
        type="monthly-invoice"
        visible={isModalOpenSelectedPaymentMethod}
      />

      <Row className={detailStyles.transactionPane}>
        <Col span={24}>
          <Card
            activeTabKey={activeTabKey}
            className={detailStyles.transactionTabs}
            onTabChange={key => {
              setActiveTabKey(key.toString());
            }}
            style={{ width: '100%' }}
            tabList={tabList}
          >
            <Col style={{ textAlign: 'right', marginBottom: 16 }}>
              <PattonButton
                onClick={() => handleAddNewInvoice()}
                style={{ marginLeft: 25, padding: '0 18px 0 24px' }}
              >
                {t('common.Add')}
              </PattonButton>
              <MButton
                disabled={selectedRows.length === 0}
                onClick={() => setIsModalOpenPaySelected(true)}
                style={{ marginLeft: 25, padding: '0 18px 0 18px' }}
              >
                {t('paySelected.Pay Selected')}
              </MButton>
            </Col>
            {contentList && contentList[activeTabKey]}
          </Card>
        </Col>
        <AddInvoiceModal
          dataInvoice={{
            reservation_detail_id: reservationDetailId,
            reservation_id: reservationId,
          }}
          isModalOpen={isOpenAddInvoiceModalVisible}
          setAddMonthlyInvoiceSucess={setAddMonthlyInvoiceSucess}
          setModalVisible={setIsOpenAddInvoiceModalVisible}
        />
      </Row>
    </>
  );
}

export default MonthlyInvoice;
