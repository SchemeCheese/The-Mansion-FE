/** ***********************************
Module Name : Customer
Developer Name : MinhNV
Created Date : 23/06/2023
Updated Date : 23/06/2023
Main functions : Customer List Page
************************************ */

import customerStyles from 'styles/customer.module.css';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Col, Form, Input, Pagination, Row, Select, Spin, Table } from 'ui/antd';

import { searchCustomer } from 'actions';

import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

import { CustomerSearch, RootState } from 'types';

const { Option } = Select;

interface Props {
  type: string;
}

export const customerLevelMapping = (status: string) => {
  const svgStatus = {
    '1': (
      <>
        <svg
          fill="none"
          height="16"
          style={{ position: 'absolute', top: 10 }}
          viewBox="0 0 16 16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect fill="#DFD4FF" height="16" opacity="0.01" width="16" />
          <rect
            fill="#885EFE"
            height="13.3333"
            opacity="0.01"
            width="13.3333"
            x="1.3335"
            y="1.33398"
          />
          <path
            d="M7.99973 3.14285C8.30656 3.14285 8.55529 2.88702 8.55529 2.57143C8.55529 2.25584 8.30656 2 7.99973 2C7.69291 2 7.44417 2.25584 7.44417 2.57143C7.44417 2.88702 7.69291 3.14285 7.99973 3.14285Z"
            fill="#FAAD14"
            fillOpacity="0.85"
          />
          <path
            d="M14.1117 5.99999C14.4185 5.99999 14.6673 5.74415 14.6673 5.42856C14.6673 5.11297 14.4185 4.85714 14.1117 4.85714C13.8049 4.85714 13.5562 5.11297 13.5562 5.42856C13.5562 5.74415 13.8049 5.99999 14.1117 5.99999Z"
            fill="#FAAD14"
            fillOpacity="0.85"
          />
          <path
            d="M2.44461 5.42856C2.44461 5.74415 2.19588 5.99999 1.88905 5.99999C1.58223 5.99999 1.3335 5.74415 1.3335 5.42856C1.3335 5.11297 1.58223 4.85714 1.88905 4.85714C2.19588 4.85714 2.44461 5.11297 2.44461 5.42856Z"
            fill="#FAAD14"
            fillOpacity="0.85"
          />
          <path
            d="M2.98642 11.7143H13.0139L14.0979 6.69536C14.1219 6.58401 14.113 6.46782 14.0723 6.36172C14.0317 6.25562 13.961 6.16447 13.8695 6.10001C13.7781 6.03554 13.6699 6.00071 13.559 6C13.4481 5.99929 13.3396 6.03272 13.2473 6.096L10.4375 8.02257L8.49684 4.03015C8.45069 3.93524 8.37977 3.85543 8.29201 3.79965C8.20425 3.74387 8.10313 3.71433 7.99996 3.71433C7.8968 3.71433 7.79568 3.74387 7.70792 3.79965C7.62016 3.85543 7.54924 3.93524 7.50309 4.03015L5.56246 8.02257L2.75253 6.096C2.66028 6.03274 2.55173 5.99933 2.44085 6.00006C2.32998 6.00078 2.22185 6.03562 2.13038 6.10008C2.03892 6.16453 1.96829 6.25567 1.9276 6.36176C1.88691 6.46784 1.87801 6.58402 1.90205 6.69536L2.98642 11.7143Z"
            fill="#FAAD14"
            fillOpacity="0.85"
          />
          <path
            d="M3.00016 13.4286V12.2857H13.0002V13.4286C13.0002 13.5801 12.9416 13.7255 12.8374 13.8326C12.7333 13.9398 12.5919 14 12.4446 14H3.55572C3.40838 14 3.26707 13.9398 3.16288 13.8326C3.05869 13.7255 3.00016 13.5801 3.00016 13.4286Z"
            fill="#FAAD14"
            fillOpacity="0.85"
          />
        </svg>
        <span style={{ paddingLeft: 20 }}>VIP</span>
      </>
    ),
    '2': (
      <>
        <svg
          fill="none"
          height="16"
          style={{ position: 'absolute', top: 10 }}
          viewBox="0 0 16 16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect fill="#DFD4FF" height="16" opacity="0.01" width="16" />
          <rect
            fill="#885EFE"
            height="13.3333"
            opacity="0.01"
            width="13.3333"
            x="1.3335"
            y="1.33398"
          />
          <path
            d="M7.27751 1.80898C7.56867 1.17565 8.43166 1.17565 8.72282 1.80898L10.1314 4.87295C10.2483 5.12717 10.4797 5.30288 10.7472 5.34047L13.9711 5.79358C14.6374 5.88723 14.9041 6.7449 14.4177 7.22998L12.0644 9.57672C11.8691 9.77143 11.7807 10.0557 11.8292 10.3332L12.413 13.6772C12.5337 14.3684 11.8355 14.8985 11.2438 14.5649L8.38074 12.9513C8.1432 12.8175 7.85713 12.8175 7.61959 12.9513L4.75657 14.5649C4.16478 14.8985 3.46661 14.3684 3.58729 13.6772L4.17114 10.3332C4.21958 10.0557 4.13118 9.77143 3.93593 9.57672L1.58264 7.22998C1.09621 6.7449 1.36289 5.88723 2.02927 5.79358L5.25312 5.34047C5.5206 5.30288 5.75203 5.12717 5.8689 4.87295L7.27751 1.80898Z"
            fill="#9254DE"
          />
        </svg>
        <span style={{ paddingLeft: 20 }}>Dominant</span>
      </>
    ),
    '3': (
      <>
        <svg
          fill="none"
          height="16"
          style={{ position: 'absolute', top: 10 }}
          viewBox="0 0 16 16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect fill="#DFD4FF" height="16" opacity="0.01" width="16" />
          <rect
            fill="#885EFE"
            height="13.3333"
            opacity="0.01"
            width="13.3333"
            x="1.3335"
            y="1.33398"
          />
          <path
            d="M10.0963 6.81584C9.49774 7.44023 8.76512 7.75669 7.91903 7.75669C7.07314 7.75669 6.34059 7.44012 5.74188 6.81594C5.14316 6.19165 4.8396 5.42769 4.8396 4.54523C4.8396 3.66298 5.14316 2.89903 5.74176 2.27474C6.3404 1.65045 7.07283 1.33398 7.91903 1.33398C8.765 1.33398 9.49755 1.65045 10.0963 2.27464C10.695 2.89913 10.9984 3.66309 10.9984 4.54523C10.9984 5.42769 10.695 6.19155 10.0963 6.81584Z"
            fill="#52C41A"
          />
          <path
            d="M13.2037 10.7441C13.2551 11.0434 13.2901 11.3268 13.3073 11.5866C13.3244 11.8405 13.3331 12.1055 13.3332 12.3742C13.3332 13.0705 13.121 13.6341 12.7025 14.0493C12.2893 14.4595 11.7428 14.6674 11.0779 14.6674H4.92177C4.25692 14.6674 3.71021 14.4594 3.29702 14.0493C2.87864 13.6337 2.6665 13.0703 2.6665 12.3743C2.6665 12.1069 2.67509 11.8421 2.69206 11.5869C2.70931 11.3265 2.74423 11.043 2.79565 10.7441C2.84754 10.4426 2.91434 10.1577 2.99425 9.8972C3.07696 9.62773 3.18933 9.36192 3.32812 9.1071C3.47209 8.84271 3.64154 8.61251 3.83144 8.42289C4.03035 8.22443 4.2737 8.06502 4.55482 7.94895C4.83508 7.83319 5.14565 7.7745 5.47808 7.7745C5.60859 7.7745 5.73489 7.83034 5.97836 7.99585C6.13064 8.0993 6.30622 8.21731 6.50021 8.3466C6.66752 8.45789 6.8944 8.56215 7.17435 8.65645C7.44806 8.74872 7.72555 8.79551 7.99952 8.79551C8.27354 8.79551 8.55115 8.74872 8.82454 8.65645C9.1048 8.56205 9.33169 8.45778 9.49915 8.3465C9.69502 8.21598 9.87051 8.09798 10.0205 7.99595C10.2643 7.83044 10.3905 7.7746 10.521 7.7746C10.8534 7.7746 11.164 7.83319 11.4443 7.94885C11.7257 8.06512 11.9689 8.22453 12.1676 8.42279C12.3577 8.6123 12.527 8.84261 12.6711 9.1071C12.81 9.36192 12.9224 9.62783 13.005 9.89709C13.085 10.1576 13.1518 10.4426 13.2037 10.7441Z"
            fill="#52C41A"
          />
        </svg>
        <span style={{ paddingLeft: 20 }}>General</span>
      </>
    ),
    '9': (
      <>
        <svg
          fill="none"
          height="16"
          style={{ position: 'absolute', top: 10 }}
          viewBox="0 0 16 16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect fill="#DFD4FF" height="16" opacity="0.01" width="16" />
          <rect
            fill="#885EFE"
            height="13.3333"
            opacity="0.01"
            width="13.3333"
            x="1.3335"
            y="1.33398"
          />
          <path
            d="M8.00016 1.33398C4.32416 1.33398 1.3335 4.32465 1.3335 8.00065C1.3335 11.6767 4.32416 14.6673 8.00016 14.6673C11.6762 14.6673 14.6668 11.6767 14.6668 8.00065C14.6668 4.32465 11.6762 1.33398 8.00016 1.33398ZM4.60622 6.70772C4.60622 6.4952 4.69269 6.28671 4.84295 6.13637C4.99329 5.98611 5.20138 5.89964 5.4143 5.89964C5.62683 5.89964 5.83531 5.98611 5.98562 6.13637C6.13628 6.28671 6.22239 6.4952 6.22239 6.70772C6.22239 6.92025 6.13628 7.12873 5.98562 7.27904C5.83531 7.42934 5.62683 7.5158 5.4143 7.5158C5.20178 7.5158 4.99329 7.4293 4.84295 7.27904C4.69269 7.12873 4.60622 6.92025 4.60622 6.70772ZM10.4857 10.4862C10.2491 10.7229 9.86533 10.7229 9.62865 10.4862C9.19362 10.0512 8.61531 9.81172 8.00016 9.81172C7.38493 9.81172 6.80667 10.0513 6.37164 10.4862C6.25329 10.6046 6.09818 10.6638 5.94311 10.6638C5.78804 10.6638 5.63289 10.6046 5.51455 10.4862C5.27786 10.2496 5.27786 9.86582 5.51451 9.62914C6.17843 8.96522 7.06121 8.59956 8.00012 8.59956C8.00016 8.59956 8.00008 8.59956 8.00016 8.59956C8.93907 8.59956 9.82182 8.96522 10.4857 9.62914C10.7224 9.86578 10.7224 10.2495 10.4857 10.4862ZM11.1573 7.27904C11.007 7.42934 10.7985 7.5158 10.586 7.5158C10.3735 7.5158 10.165 7.4293 10.0147 7.27904C9.864 7.12873 9.77794 6.92025 9.77794 6.70772C9.77794 6.4952 9.864 6.28671 10.0147 6.13637C10.165 5.98611 10.3731 5.89964 10.586 5.89964C10.7985 5.89964 11.007 5.98611 11.1573 6.13637C11.308 6.28671 11.3941 6.4952 11.3941 6.70772C11.3941 6.92025 11.308 7.12873 11.1573 7.27904Z"
            fill="#FF7875"
          />
        </svg>
        <span style={{ paddingLeft: 20 }}>Undesirable</span>
      </>
    ),
  };

  if (status === '1' || status === '2' || status === '3' || status === '9') {
    return svgStatus[status];
  }

  return '';
};

function CustomerList({ type }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchCondition, setSearchCondition] = useState({
    current_page: 1,
    per_page: process.env.REACT_APP_RESERVATION_PER_PAGE
      ? parseInt(process.env.REACT_APP_RESERVATION_PER_PAGE, 10)
      : 10,
    client_kind: '',
    client_rank: '',
    client_info: '',
    type,
  });

  const isSearching = useSelector<RootState>(({ customer }) => customer.is_searching);
  const items: any = useSelector<RootState>(({ customer }) => customer.data);
  const total: any = useSelector<RootState>(({ customer }) => customer.total);
  const currentPage: any = useSelector<RootState>(({ customer }) => customer.current_page);

  useEffect(() => {
    dispatch(searchCustomer(searchCondition));
  }, []);

  const onChangeCurrentPage = (page: number, pageSize: number) => {
    setSearchCondition({
      ...searchCondition,
      current_page: page,
      per_page: pageSize,
    });

    dispatch(
      searchCustomer({
        ...searchCondition,
        current_page: page,
        per_page: pageSize,
      }),
    );
  };

  const convertData = (data: any) => {
    if (data) {
      return data.map((item: any) => {
        return {
          ...item,
          key: item.id,
          phone: item.phone_number,
        };
      });
    }

    return [];
  };

  const fetchSearchCustomer = (data: CustomerSearch) => {
    dispatch(searchCustomer(data));
  };

  const searchInput = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      fetchSearchCustomer({
        ...searchCondition,
        current_page: 1,
      });
    }
  };

  const searchSelect = (value: string, key: string) => {
    let valueTemporary = value;

    if (value === undefined) {
      valueTemporary = '';
    }

    const stateTemporary = {
      ...searchCondition,
      [key]: valueTemporary,
      current_page: 1,
    };

    setSearchCondition(stateTemporary);
    fetchSearchCustomer(stateTemporary);
  };

  const listColumns = [
    {
      title: 'Level',
      dataIndex: 'client_rank',
      key: 'client_rank',
      render: (text: string) => (
        <div style={{ minWidth: 80 }}>{customerLevelMapping(text?.toString())}</div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'client_kind',
      key: 'client_kind',
      render: (text: string) => (
        <div style={{ minWidth: 80 }}>{text.toString() === '2' ? 'Grp' : 'Person'}</div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Nationality',
      dataIndex: 'nationality',
      key: 'nationality',
    },
    {
      title: 'Last Checkin',
      dataIndex: 'last_checkin',
      key: 'last_checkin',
    },
    {
      title: 'Checkout',
      dataIndex: 'checkout',
      key: 'checkout',
    },
    {
      title: 'Branch Name',
      dataIndex: 'branch_name',
      key: 'branch_name',
    },
  ];

  return (
    <Row style={{ background: 'white', padding: 16 }}>
      <Col span={24}>
        <Input.Group>
          <Row>
            <Col span={3} style={{ paddingRight: 16 }}>
              <Select
                allowClear
                onChange={value => searchSelect(value, 'client_kind')}
                placeholder={t('customer.Type.placeholder')}
                style={{ width: '100%', fontSize: 12 }}
              >
                <Option value="1">Personal</Option>
                <Option value="2">Group</Option>
              </Select>
            </Col>
            <Col span={3} style={{ paddingRight: 16 }}>
              <Select
                allowClear
                onChange={value => searchSelect(value, 'client_rank')}
                placeholder={t('customer.Level.placeholder')}
                style={{ width: '100%', fontSize: 12 }}
              >
                <Option value="1">VIP</Option>
                <Option value="2">Dominant</Option>
                <Option value="3">General</Option>
                <Option value="9">Undesirable</Option>
              </Select>
            </Col>
            <Col span={18}>
              <MInput
                onChange={e =>
                  setSearchCondition({
                    ...searchCondition,
                    client_info: e.target.value,
                  })
                }
                onKeyUp={event => searchInput(event)}
                placeholder={t('customer.Email Phone Name.placeholder')}
                style={{ height: 32, fontSize: 12 }}
              />
            </Col>
          </Row>
        </Input.Group>
      </Col>
      <Col span={24} style={{ paddingTop: 16 }}>
        <PattonButton>
          {' '}
          <PlusOutlined style={{ marginLeft: 0, marginRight: 8 }} /> {t('common.New')}
        </PattonButton>
      </Col>
      <Col span={24} style={{ paddingTop: 16 }}>
        {!isSearching ? (
          <>
            <Table
              className={customerStyles.customerList}
              columns={listColumns}
              dataSource={convertData(items)}
              onRow={(record: any) => {
                return {
                  onClick: () => {
                    navigate(`/customer/${record.id}`);
                  },
                };
              }}
              pagination={false}
              rowClassName={(record: any) => {
                if (record.is_new) {
                  return 'new-customer';
                }

                return '';
              }}
              size="small"
              style={{ overflowX: 'hidden', overflowY: 'auto', minHeight: 450 }}
            />
            {total > 0 && (
              <Pagination
                defaultCurrent={currentPage}
                onChange={onChangeCurrentPage}
                pageSize={10}
                showSizeChanger={false}
                style={{ float: 'right', marginTop: 15 }}
                total={total}
              />
            )}
          </>
        ) : (
          <Spin style={{ width: '100%', minHeight: 300, marginTop: '15%' }} />
        )}
      </Col>
    </Row>
  );
}

export default CustomerList;
