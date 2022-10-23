/** ***********************************
Module Name : Reservation
Developer Name : Xuan
Created Date : 14/09/2022
Updated Date : 14/09/2022
Main functions : Transaction Add Item
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Modal, Row, Select, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { formatNumber } from 'helpers';

import { addItemAction, productType, searchProduct } from 'actions';

import { RootState } from 'types';

interface Props {
  reservationDetailId: string;
  reservationId: string;
  setIsModalOpen: (visible: boolean) => void;
  visible: boolean;
}

interface DataType {
  description_category_id: string | number;
  id: number;
  mount: string | number;
  product: string;
  total: string;
  unit_price: string;
  update_price: string | number;
}

function AddItem({ reservationDetailId, reservationId, setIsModalOpen, visible }: Props) {
  const { t } = useTranslation();
  const { Option } = Select;

  const [searchProductType, setSearchProductType] = useState('');
  const [dataAmount, setDataAmount] = useState<any>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchProduct({ type_product: searchProductType }));
    dispatch(productType({}));
  }, []);

  const onChangeProductType = (value: string) => {
    console.log(`selected ${value}`);
    setSearchProductType(value);
  };

  const handleClickUpdateAmount =
    (item: any, type: string = '') =>
    () => {
      const dataAmountState = [...dataAmount];

      if (dataAmountState.length < 0) {
        dataAmountState.push(item);
      } else {
        const checkAmount = dataAmountState.findIndex(element => element.id === item.id);

        if (checkAmount < 0) {
          dataAmountState.push(item);
        }
      }

      const indexAmount = dataAmountState.findIndex(element => element.id === item.id);

      if (indexAmount >= 0) {
        const itTemporary = { ...dataAmountState[indexAmount] };

        if (type === 'minus') {
          if (itTemporary.quantity > 0) {
            itTemporary.quantity--;
          }
        } else {
          itTemporary.quantity++;
        }

        dataAmountState[indexAmount] = itTemporary;
      }

      setDataAmount(dataAmountState);
    };

  const columns: ColumnsType<DataType> = [
    {
      title: t('common.Product'),
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: t('common.Unit price'),
      dataIndex: 'unit_price',
      key: 'unit_price',
      align: 'right',
    },
    {
      title: t('common.Updated price'),
      dataIndex: 'sales_price',
      key: 'sales_price',
      render: (text: string, record: any) => {
        return (
          <Input
            onChange={event => {
              const dataAmountStateTemporary = [...dataAmount];

              console.log(text);

              const indexAmount = dataAmountStateTemporary.findIndex(
                element => element.id === record.id,
              );

              if (indexAmount !== -1) {
                dataAmountStateTemporary[indexAmount].sales_price = event.target.value;
              } else {
                dataAmountStateTemporary.push({
                  ...record,
                  sales_price: event.target.value,
                });
              }

              setDataAmount(dataAmountStateTemporary);
            }}
            placeholder="0"
            style={{ width: 96, borderRadius: 4 }}
          />
        );
      },
    },
    {
      title: t('common.Amount'),
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      render: (value, record) => (
        <span style={{ float: 'right', display: 'inline-flex', lineHeight: '28px' }}>
          <Button onClick={handleClickUpdateAmount(record, 'minus')} style={{ border: 'none' }}>
            <svg
              fill="none"
              height="14"
              viewBox="0 0 14 14"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              {value === 0 ? (
                <path
                  d="M7.00016 0.333496C3.38111 0.333496 0.333496 3.38111 0.333496 7.00016C0.333496 10.6192 3.38111 13.6668 7.00016 13.6668C10.6192 13.6668 13.6668 10.6192 13.6668 7.00016C13.6668 3.38111 10.6192 0.333496 7.00016 0.333496ZM10.8097 7.00016C10.8097 7.26316 10.5965 7.47635 10.3335 7.47635H3.66683C3.40384 7.47635 3.19064 7.26316 3.19064 7.00016C3.19064 6.73717 3.40384 6.52397 3.66683 6.52397H10.3335C10.5965 6.52397 10.8097 6.73717 10.8097 7.00016Z"
                  fill="black"
                  fillOpacity="0.25"
                />
              ) : (
                <path
                  d="M7.00016 0.333496C3.38111 0.333496 0.333496 3.38111 0.333496 7.00016C0.333496 10.6192 3.38111 13.6668 7.00016 13.6668C10.6192 13.6668 13.6668 10.6192 13.6668 7.00016C13.6668 3.38111 10.6192 0.333496 7.00016 0.333496ZM10.8097 7.00016C10.8097 7.26316 10.5965 7.47635 10.3335 7.47635H3.66683C3.40384 7.47635 3.19064 7.26316 3.19064 7.00016C3.19064 6.73717 3.40384 6.52397 3.66683 6.52397H10.3335C10.5965 6.52397 10.8097 6.73717 10.8097 7.00016Z"
                  fill="#1D39C4"
                />
              )}
            </svg>
          </Button>
          {value}
          <Button onClick={handleClickUpdateAmount(record)} style={{ border: 'none' }}>
            <svg
              fill="none"
              height="14"
              viewBox="0 0 14 14"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.00016 0.333496C3.38111 0.333496 0.333496 3.38111 0.333496 7.00016C0.333496 10.6192 3.38111 13.6668 7.00016 13.6668C10.6192 13.6668 13.6668 10.6192 13.6668 7.00016C13.6668 3.38111 10.6192 0.333496 7.00016 0.333496ZM10.8097 7.00016C10.8097 7.26316 10.5965 7.47635 10.3335 7.47635H7.47635V10.3335C7.47635 10.5965 7.26316 10.8097 7.00016 10.8097C6.73717 10.8097 6.52397 10.5965 6.52397 10.3335V7.47635H3.66683C3.40384 7.47635 3.19064 7.26316 3.19064 7.00016C3.19064 6.73717 3.40384 6.52397 3.66683 6.52397H6.52397V3.66683C6.52397 3.40384 6.73717 3.19064 7.00016 3.19064C7.26316 3.19064 7.47635 3.40384 7.47635 3.66683V6.52397H10.3335C10.5965 6.52397 10.8097 6.73717 10.8097 7.00016Z"
                fill="#1D39C4"
              />
            </svg>
          </Button>
        </span>
      ),
    },
    {
      title: t('common.Total'),
      dataIndex: 'total',
      key: 'total',
      align: 'right',
    },
    {
      title: t('common.Disk'),
      dataIndex: 'disk',
      key: 'disk',
      render: (text: string, record: any) => (
        <Select
          defaultValue="1"
          onChange={value => {
            const dataAmountStateTemporary = [...dataAmount];

            console.log(text);

            const indexAmount = dataAmountStateTemporary.findIndex(
              element => element.id === record.id,
            );

            if (indexAmount !== -1) {
              dataAmountStateTemporary[indexAmount].storage_id = value;
            } else {
              dataAmountStateTemporary.push({
                ...record,
                storage_id: value,
              });
            }

            setDataAmount(dataAmountStateTemporary);
          }}
          style={{ borderRadius: 2, width: 223, height: 32 }}
        >
          <Option value="1">A</Option>
          <Option value="2">B</Option>
          <Option value="3">C</Option>
        </Select>
      ),
    },
    {
      title: t('common.Action'),
      dataIndex: 'action',
      key: 'action',
      render: () => (
        <Button style={{ border: 'none' }}>
          <svg
            fill="none"
            height="14"
            viewBox="0 0 12 14"
            width="12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M8.05136 2.00016H10.3078C10.8742 2.00016 11.3334 2.46655 11.3334 3.04183V3.87516C11.3334 4.10529 11.1497 4.29183 10.9232 4.29183H1.077C0.850422 4.29183 0.666748 4.10529 0.666748 3.87516V3.04183C0.666748 2.46655 1.12596 2.00016 1.69239 2.00016H3.9488V1.5835C3.9488 0.893127 4.49982 0.333496 5.17957 0.333496H6.82059C7.50034 0.333496 8.05136 0.893127 8.05136 1.5835V2.00016ZM5.17957 1.16683C4.95341 1.16683 4.76931 1.3538 4.76931 1.5835V2.00016H7.23085V1.5835C7.23085 1.3538 7.04676 1.16683 6.82059 1.16683H5.17957Z"
              fill="#F5222D"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d="M1.31689 5.26158C1.3134 5.1873 1.37174 5.12516 1.44495 5.12516H10.5545C10.6277 5.12516 10.686 5.1873 10.6825 5.26158L10.3441 12.4762C10.3128 13.1439 9.7728 13.6668 9.11484 13.6668H2.8846C2.22664 13.6668 1.68664 13.1439 1.65535 12.4762L1.31689 5.26158ZM8.051 5.75016C7.82434 5.75016 7.64075 5.93663 7.64075 6.16683V11.5835C7.64075 11.8137 7.82434 12.0002 8.051 12.0002C8.27767 12.0002 8.46126 11.8137 8.46126 11.5835V6.16683C8.46126 5.93663 8.27767 5.75016 8.051 5.75016ZM5.99972 5.75016C5.77306 5.75016 5.58946 5.93663 5.58946 6.16683V11.5835C5.58946 11.8137 5.77306 12.0002 5.99972 12.0002C6.22638 12.0002 6.40998 11.8137 6.40998 11.5835V6.16683C6.40998 5.93663 6.22638 5.75016 5.99972 5.75016ZM3.94844 5.75016C3.72178 5.75016 3.53818 5.93663 3.53818 6.16683V11.5835C3.53818 11.8137 3.72178 12.0002 3.94844 12.0002C4.1751 12.0002 4.3587 11.8137 4.3587 11.5835V6.16683C4.3587 5.93663 4.1751 5.75016 3.94844 5.75016Z"
              fill="#F5222D"
              fillRule="evenodd"
            />
          </svg>
        </Button>
      ),
    },
  ];

  const convertData = (data: any) => {
    if (data) {
      const stateAmount = [...dataAmount];

      return data
        .filter((currentValue: DataType) => {
          if (searchProductType) {
            return currentValue.description_category_id === parseInt(searchProductType, 10);
          }

          return true;
        })
        .map((item: any) => {
          const amountItem = stateAmount.find(element => element.id === item.id);
          const total = amountItem ? amountItem.quantity * item.price : 0;

          return {
            id: item.id,
            description_id: item.id,
            key: item.id,
            product: item.name,
            unit_price: formatNumber(item.price),
            normal_price: item.price,
            sales_price: item.price,
            storage_id: 1,
            quantity: amountItem ? amountItem.quantity : 0,
            total: formatNumber(total),
          };
        });
    }

    return [];
  };

  const handleAddItem = () => {
    dispatch(
      addItemAction({
        payload: {
          items: dataAmount,
          reservation_id: reservationId,
          reservation_detail_id: reservationDetailId,
        },
      }),
    );
    setDataAmount([]);
    setIsModalOpen(false);
  };

  const isSearching = useSelector<RootState>(({ product }) => product.is_searching);
  const items = useSelector<RootState>(({ product }) => product.data);
  const listProductTypes: any = useSelector<RootState>(({ getProductType }) => getProductType.data);

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#F0F2F5' }}
      cancelButtonProps={{ style: { borderRadius: 4 } }}
      okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
      okText={t('common.Save')}
      onCancel={() => setIsModalOpen(false)}
      onOk={handleAddItem}
      title={<b>{t('transaction.Add Product / Service')}</b>}
      visible={visible}
      width={1000}
    >
      <Row>
        <Form autoComplete="off" layout="vertical">
          <Form.Item label={t('common.Product Type')} name="">
            <Select
              onChange={onChangeProductType}
              placeholder="Select Type"
              style={{ borderRadius: 2, width: 223, height: 32 }}
            >
              {listProductTypes.length > 0 &&
                listProductTypes.map((type: any) => <Option key={type.id}>{type.name}</Option>)}
            </Select>
          </Form.Item>
        </Form>
      </Row>
      <Row>
        {!isSearching ? (
          <Table columns={columns} dataSource={convertData(items)} pagination={false} />
        ) : (
          <Spin style={{ width: '100%', minHeight: 300, marginTop: '15%' }} />
        )}
      </Row>
    </Modal>
  );
}

export default AddItem;
