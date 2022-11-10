/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 01/09/2022
Updated Date : 03/09/2022
Main functions : Channel Manager Tab
************************************ */

import 'styles/channel.css';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ArrowDownOutlined, ArrowUpOutlined, RedoOutlined } from '@ant-design/icons';
import { Col, DatePicker, Input, message, Row, Select, Space, Table, Tag } from 'antd';
import { formatNumber } from 'helpers';
import moment from 'moment';
import { selectChannel, selectUpdateRoomAvailable } from 'selectors';
import useTreeChanges from 'tree-changes-hook';
import _ from 'underscore';

import { useAppSelector } from 'modules/hooks';
import { colors } from 'modules/theme';

import { fetchChannelsAction } from 'actions';

import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

import QuickBulkUpdateModal from './QuickBulkUpdateModal';

const { OptGroup, Option } = Select;
const { Search } = Input;
const emptyPrice = '---';

function NoRoomAvailable() {
  return (
    <span
      style={{
        position: 'absolute',
        top: '25%',
        right: '25%',
      }}
    >
      <svg
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" fill="#FAAD14" fillOpacity="0.85" r="12" />
      </svg>
      <span style={{ position: 'relative', left: -15, top: -8, color: 'white' }}>0</span>
    </span>
  );
}

function ChannelManager() {
  const dispatch = useDispatch();

  const [channelSearch, setChannelSearch] = useState({
    room_type: '',
    channel: '',
    rate_plan: '',
  });
  const [isShowMore, setIsShowMore] = useState<any>();
  const [isShowQuickUpdateModal, setIsShowQuickUpdateModal] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({
    room_number: 0,
    room_id: '',
    from_date: '',
  });

  const onChange = (date: any) => {
    dispatch(
      fetchChannelsAction({
        fromDate: date.format('YYYY-MM-DD'),
      }),
    );
  };

  const channelData = useAppSelector(selectChannel);
  const selectUpdateRoomAvailableData = useAppSelector(selectUpdateRoomAvailable);
  const { changed: updateRoomAvailableChanged } = useTreeChanges(selectUpdateRoomAvailableData);

  useEffect(() => {
    if (updateRoomAvailableChanged('status', 'SUCCESS')) {
      message.success('Update room available successfully!');

      dispatch(
        fetchChannelsAction({
          fromDate: channelData.dates[0].format,
        }),
      );
    }
  }, [updateRoomAvailableChanged]);

  useEffect(() => {
    const channelIsShowMore = channelData.channels.map((item: any) => {
      if (item.standard_rates.length > 4) {
        return {
          rateId: item.rateId,
          is_show_more: 1,
        };
      }

      return {
        rateId: item.rateId,
        is_show_more: 0,
      };
    });

    setIsShowMore(channelIsShowMore);
  }, [channelData]);

  const dates = [];

  for (let index = 0; index < channelData.dates.length; index++) {
    const bgColor =
      channelData.dates[index].day === 'Sun' || channelData.dates[index].day === 'Sat'
        ? '#FFF2E8'
        : '#FFFFFF';

    dates.push(
      <Col
        key={index}
        flex={1}
        style={{
          border: '1px solid #E8E8E8',
          borderRightStyle: 'none',
          textAlign: 'center',
          backgroundColor: bgColor,
        }}
      >
        <p
          style={{
            margin: 0,
            color: 'rgba(0, 0, 0, 0.45)',
          }}
        >
          {channelData.dates[index].day}
        </p>
        <p
          style={{
            margin: 0,
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          {channelData.dates[index].date}
        </p>
        <p
          style={{
            margin: 0,
            color: 'rgba(0, 0, 0, 0.45)',
            textTransform: 'uppercase',
          }}
        >
          {channelData.dates[index].month}
        </p>
      </Col>,
    );
  }

  return (
    <>
      <QuickBulkUpdateModal
        isShowQuickUpdateModal={isShowQuickUpdateModal}
        setIsShowQuickUpdateModal={setIsShowQuickUpdateModal}
        updateInfo={updateInfo}
      />
      <Row style={{ paddingBottom: 20 }}>
        <Col offset={16} span={8}>
          <div style={{ float: 'right' }}>
            <PattonButton>Bulk Update</PattonButton>
            <MButton icon={<RedoOutlined />} style={{ marginLeft: 10 }}>
              Search
            </MButton>
            <PattonButton style={{ marginLeft: 10 }}>Save</PattonButton>
          </div>
        </Col>
      </Row>
      <Row className="channel" style={{ backgroundColor: '#FFFFFF' }}>
        <Col
          className="pick-date"
          span={9}
          style={{
            border: '1px solid #FFF2E8',
            borderRightStyle: 'none',
            textAlign: 'center',
            paddingTop: 18,
            color: colors.pattron,
            fontWeight: 'bold',
          }}
        >
          <Space size="large">
            <svg
              fill="none"
              height="18"
              viewBox="0 0 20 18"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 9.00003C0 4.03765 4.08292 6.28119e-05 9.10102 0C13.8933 0 17.8326 3.68266 18.1772 8.33636L18.2318 9.07333L18.6754 8.41529C18.8969 8.08676 19.3458 7.99801 19.6781 8.21719C20.0102 8.43625 20.1 8.88017 19.8785 9.20878L17.9391 12.0848C17.7553 12.3574 17.4611 12.5139 17.1565 12.5139C16.8519 12.5139 16.5576 12.3574 16.3738 12.0848L14.4344 9.20874C14.2128 8.88023 14.3026 8.43625 14.6348 8.21719C14.9485 8.01033 15.3666 8.07824 15.5985 8.36378L16.1591 9.05374L16.053 8.17494C15.6392 4.74433 12.6801 2.07576 9.10102 2.07576C5.23985 2.07576 2.099 5.1818 2.099 9.00003C2.099 12.8183 5.23985 15.9242 9.10102 15.9243C9.68066 15.9243 10.1505 16.3889 10.1505 16.9622C10.1505 17.5354 9.68066 18 9.10102 18C4.08292 18 0 13.9624 0 9.00003Z"
                fill="#1D39C4"
              />
            </svg>

            <svg
              fill="none"
              height="14"
              viewBox="0 0 14 14"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.887 0.175154C13.0138 0.0583844 13.1656 0 13.3158 0C13.5161 0 13.7133 0.102174 13.8494 0.297398C14.0857 0.64041 14.0388 1.14215 13.7446 1.41766L7.77457 7.01531L13.7148 12.5819C14.009 12.8574 14.056 13.3592 13.8197 13.7022C13.5834 14.0452 13.1531 14.0999 12.8589 13.8244L6.25507 7.63747C6.09389 7.48786 6 7.25797 6 7.01713C6 6.77447 6.09389 6.5464 6.25507 6.39497L12.887 0.175154Z"
                fill="#1D39C4"
              />
              <path
                d="M6.88703 0.175154C7.01378 0.0583844 7.16558 0 7.31581 0C7.51611 0 7.71328 0.102174 7.84943 0.297398C8.08573 0.64041 8.03878 1.14215 7.74458 1.41766L1.77457 7.01531L7.71485 12.5819C8.00905 12.8574 8.05599 13.3592 7.8197 13.7022C7.5834 14.0452 7.15306 14.0999 6.85886 13.8244L0.255074 7.63747C0.0938911 7.48786 -9.53674e-07 7.25797 -9.53674e-07 7.01713C-9.53674e-07 6.77447 0.0938911 6.5464 0.255075 6.39497L6.88703 0.175154Z"
                fill="#1D39C4"
              />
            </svg>

            <svg
              fill="none"
              height="14"
              viewBox="0 0 8 14"
              width="8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.31581 -2.99071e-08C7.16558 -3.64738e-08 7.01378 0.0583849 6.88703 0.175155L0.255074 6.39497C0.0938919 6.5464 -6.37836e-07 6.77447 -6.48444e-07 7.01713C-6.58971e-07 7.25797 0.0938919 7.48786 0.255074 7.63747L6.85886 13.8244C7.15306 14.0999 7.5834 14.0452 7.8197 13.7022C8.05599 13.3592 8.00905 12.8574 7.71485 12.5819L1.77457 7.01531L7.74458 1.41766C8.03878 1.14215 8.08573 0.640409 7.84943 0.297399C7.71329 0.102174 7.51611 -2.11515e-08 7.31581 -2.99071e-08Z"
                fill="#1D39C4"
              />
            </svg>
            <DatePicker
              bordered={false}
              dateRender={current => {
                const style: React.CSSProperties = {};

                if (current.day() === 0 || current.day() === 6) {
                  style.color = 'red';
                }

                return (
                  <div className="ant-picker-cell-inner" style={style}>
                    {current.date()}
                  </div>
                );
              }}
              defaultValue={moment()}
              format="D MMM Y"
              onChange={onChange}
              style={{ paddingBottom: 8 }}
              suffixIcon={null}
            />
            <svg
              fill="none"
              height="14"
              style={{ marginLeft: -34 }}
              viewBox="0 0 8 14"
              width="8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.684193 -2.99071e-08C0.834422 -3.64738e-08 0.986215 0.0583849 1.11297 0.175155L7.74493 6.39497C7.90611 6.5464 8 6.77447 8 7.01713C8 7.25797 7.90611 7.48786 7.74493 7.63747L1.14114 13.8244C0.846941 14.0999 0.4166 14.0452 0.180303 13.7022C-0.0559934 13.3592 -0.00904711 12.8574 0.28515 12.5819L6.22543 7.01531L0.255417 1.41766C-0.0387803 1.14215 -0.0857267 0.640409 0.15057 0.297399C0.286714 0.102174 0.483889 -2.11515e-08 0.684193 -2.99071e-08Z"
                fill="#1D39C4"
              />
            </svg>
            <svg
              fill="none"
              height="14"
              style={{ marginLeft: -14 }}
              viewBox="0 0 14 14"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.11297 0.175154C0.986216 0.0583844 0.834422 0 0.684194 0C0.48389 0 0.286715 0.102174 0.150571 0.297398C-0.0857261 0.64041 -0.0387797 1.14215 0.255417 1.41766L6.22543 7.01531L0.285151 12.5819C-0.00904652 12.8574 -0.0559928 13.3592 0.180304 13.7022C0.4166 14.0452 0.846942 14.0999 1.14114 13.8244L7.74493 7.63747C7.90611 7.48786 8 7.25797 8 7.01713C8 6.77447 7.90611 6.5464 7.74493 6.39497L1.11297 0.175154Z"
                fill="#1D39C4"
              />
              <path
                d="M7.11297 0.175154C6.98622 0.0583844 6.83442 0 6.68419 0C6.48389 0 6.28672 0.102174 6.15057 0.297398C5.91427 0.64041 5.96122 1.14215 6.25542 1.41766L12.2254 7.01531L6.28515 12.5819C5.99095 12.8574 5.94401 13.3592 6.1803 13.7022C6.4166 14.0452 6.84694 14.0999 7.14114 13.8244L13.7449 7.63747C13.9061 7.48786 14 7.25797 14 7.01713C14 6.77447 13.9061 6.5464 13.7449 6.39497L7.11297 0.175154Z"
                fill="#1D39C4"
              />
            </svg>
          </Space>
        </Col>
        <Col span={15}>
          <Row>{dates}</Row>
        </Col>
      </Row>
      <Row style={{ paddingTop: 20 }}>
        <Col span={24}>
          <Space className="channel-filter" size="middle">
            <Select defaultValue="" size="large">
              <Option value="">All Rates & Availability</Option>
            </Select>
            <Select
              defaultValue=""
              onChange={value => {
                if (value === '') {
                  setChannelSearch({
                    ...channelSearch,
                    room_type: '',
                    channel: '',
                  });
                } else if (parseInt(value, 10) > 100) {
                  setChannelSearch({
                    ...channelSearch,
                    room_type: value,
                    channel: '',
                  });
                } else {
                  setChannelSearch({
                    ...channelSearch,
                    channel: value,
                    room_type: '',
                  });
                }
              }}
              size="large"
              value={channelSearch.room_type ? channelSearch.room_type : channelSearch.channel}
            >
              <Option value="">
                <svg
                  fill="none"
                  height="10"
                  style={{ marginRight: 10 }}
                  viewBox="0 0 14 10"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.896 5.77794V1.11127C1.896 0.681719 1.54622 0.333496 1.11475 0.333496C0.683274 0.333496 0.333496 0.681719 0.333496 1.11127V8.88905C0.333496 9.31861 0.683274 9.66683 1.11475 9.66683C1.54622 9.66683 1.896 9.31861 1.896 8.88905V8.11127H12.1043V8.88905C12.1043 9.31861 12.4541 9.66683 12.8856 9.66683C13.3171 9.66683 13.6668 9.31861 13.6668 8.88905V5.77794H1.896Z"
                    fill="black"
                    fillOpacity="0.45"
                  />
                  <path
                    d="M3.84912 2.66683C3.20191 2.66683 2.67725 3.18916 2.67725 3.8335V5.00016H5.021V3.8335C5.021 3.18916 4.49633 2.66683 3.84912 2.66683Z"
                    fill="black"
                    fillOpacity="0.45"
                  />
                  <path
                    d="M12.495 2.66683H6.97412C6.32691 2.66683 5.80225 3.18916 5.80225 3.8335V5.00016H13.6668V3.8335C13.6668 3.18916 13.1422 2.66683 12.495 2.66683Z"
                    fill="black"
                    fillOpacity="0.45"
                  />
                </svg>
                All Room Types
              </Option>
              <OptGroup label="Rooms & Rates View">
                {channelData.rates.map((item: any) => (
                  <Option key={item.rateId} value={item.rateId}>
                    {item.name}
                  </Option>
                ))}
              </OptGroup>
              <OptGroup label="Channel View">
                {channelData.websites.map((item: any) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </OptGroup>
            </Select>
            <Select
              defaultValue="1"
              onChange={value => {
                setChannelSearch({
                  ...channelSearch,
                  rate_plan: value,
                });
              }}
              size="large"
              value={channelSearch.rate_plan}
            >
              <Option value="">
                <svg
                  fill="none"
                  height="14"
                  style={{ marginRight: 10, marginTop: 5 }}
                  viewBox="0 0 14 14"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.2779 0.333496H8.75404C8.08626 0.333496 7.45792 0.593496 6.98571 1.06571L0.807376 7.24462C0.506283 7.54571 0.333496 7.96238 0.333496 8.39016C0.333496 8.81571 0.506283 9.23238 0.807376 9.5335L4.46738 13.1935C4.76795 13.494 5.18462 13.6668 5.61238 13.6668C6.03792 13.6668 6.45459 13.494 6.75571 13.193L12.9346 7.01407C13.4068 6.54238 13.6668 5.91404 13.6668 5.24628V1.72238C13.6668 0.956283 13.044 0.333496 12.2779 0.333496ZM10.6113 4.77795C9.84516 4.77795 9.2224 4.15516 9.2224 3.38907C9.2224 2.62295 9.84519 2.00019 10.6113 2.00019C11.3774 2.00019 12.0002 2.62295 12.0002 3.38904C12.0002 4.15516 11.3774 4.77795 10.6113 4.77795Z"
                    fill="black"
                    fillOpacity="0.45"
                  />
                </svg>
                <span style={{ paddingTop: 5 }}>All Rate Plans</span>
              </Option>
              <Option value="2">STANDARD RATE</Option>
              <Option value="3">WEBSITE TRỰC TIẾP</Option>
            </Select>
            <Search
              allowClear
              className="search-room-rate"
              placeholder="Search room rate..."
              size="large"
              style={{
                width: 250,
              }}
            />
            <p
              aria-hidden="true"
              onClick={() =>
                setChannelSearch({
                  room_type: '',
                  channel: '',
                  rate_plan: '',
                })
              }
              style={{ paddingTop: 10, fontSize: 13, color: '#1890FF', cursor: 'pointer' }}
            >
              Clear all filters
            </p>
          </Space>
        </Col>
      </Row>
      <Row style={{ paddingTop: 20 }}>
        {channelData.channels
          .filter((item: any) => {
            if (channelSearch.room_type === '') {
              return true;
            }

            return item.rateId === channelSearch.room_type;
          })
          .map((item: any) => {
            const columns = [
              {
                title: () => (
                  <>
                    <svg
                      fill="none"
                      height="14"
                      viewBox="0 0 20 14"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.34375 8.16667V1.16667C2.34375 0.522334 1.81908 0 1.17188 0C0.524666 0 0 0.522334 0 1.16667V12.8333C0 13.4777 0.524666 14 1.17188 14C1.81908 14 2.34375 13.4777 2.34375 12.8333V11.6667H17.6562V12.8333C17.6562 13.4777 18.1809 14 18.8281 14C19.4753 14 20 13.4777 20 12.8333V8.16667H2.34375Z"
                        fill="black"
                        fillOpacity="0.65"
                      />
                      <path
                        d="M5.27344 3.5C4.30262 3.5 3.51562 4.28349 3.51562 5.25V7H7.03125V5.25C7.03125 4.28349 6.24426 3.5 5.27344 3.5Z"
                        fill="black"
                        fillOpacity="0.65"
                      />
                      <path
                        d="M18.2422 3.5H9.96094C8.99012 3.5 8.20312 4.28349 8.20312 5.25V7H20V5.25C20 4.28349 19.213 3.5 18.2422 3.5Z"
                        fill="black"
                        fillOpacity="0.65"
                      />
                    </svg>
                    <span style={{ paddingLeft: 15 }}>{item.name}</span>
                    <svg
                      fill="none"
                      height="14"
                      style={{ float: 'right' }}
                      viewBox="0 0 8 14"
                      width="8"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.96513 5.4677C7.94174 5.42475 7.90781 5.38903 7.86682 5.36417C7.82582 5.33932 7.77922 5.32622 7.73178 5.32622H4.21808L4.80716 0.643446C4.81348 0.580775 4.79935 0.517713 4.76703 0.464416C4.73471 0.411119 4.6861 0.370686 4.62901 0.349629C4.57193 0.328572 4.50969 0.328115 4.45232 0.348333C4.39495 0.36855 4.3458 0.408265 4.31276 0.461083L0.039731 8.24968C0.0147435 8.29196 0.00104853 8.34042 5.78485e-05 8.39004C-0.000932835 8.43967 0.0108167 8.48867 0.034095 8.53199C0.0573734 8.57532 0.0913382 8.6114 0.132487 8.63652C0.173636 8.66164 0.22048 8.67489 0.268188 8.67489H3.72938L3.26254 13.3647C3.25795 13.4272 3.27358 13.4894 3.30692 13.5416C3.34026 13.5937 3.38941 13.6328 3.44655 13.6525C3.50369 13.6723 3.56553 13.6716 3.62224 13.6505C3.67894 13.6295 3.72725 13.5893 3.75949 13.5364L7.96191 5.74864C7.98628 5.70629 7.99942 5.65798 7.99998 5.60862C8.00055 5.55927 7.98852 5.51064 7.96513 5.4677Z"
                        fill="#1D39C4"
                      />
                    </svg>
                  </>
                ),
                dataIndex: 'name',
                key: 'name',
                width: '25%',
                render: (value: any, record: any, index: number) => {
                  if (record.is_website_direct_price) {
                    return (
                      <>
                        <span>Website trực tiếp...</span>
                        <span
                          style={{
                            color: '#1D39C4',
                            fontSize: 12,
                            paddingLeft: 10,
                            paddingRight: 5,
                          }}
                        >
                          1 Channel
                        </span>
                        <svg
                          fill="none"
                          height="8"
                          viewBox="0 0 5 8"
                          width="5"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.19534 3.52866C4.45569 3.78901 4.45569 4.21112 4.19534 4.47147L1.80482 6.86199C1.38484 7.28197 0.666748 6.98453 0.666748 6.39059L0.666748 1.60954C0.666748 1.01561 1.38484 0.718161 1.80482 1.13814L4.19534 3.52866Z"
                            fill="#1D39C4"
                          />
                        </svg>

                        <svg
                          fill="none"
                          height="14"
                          style={{ float: 'right' }}
                          viewBox="0 0 8 14"
                          width="8"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.96513 5.4677C7.94174 5.42475 7.90781 5.38903 7.86682 5.36417C7.82582 5.33932 7.77922 5.32622 7.73178 5.32622H4.21808L4.80716 0.643446C4.81348 0.580775 4.79935 0.517713 4.76703 0.464416C4.73471 0.411119 4.6861 0.370686 4.62901 0.349629C4.57193 0.328572 4.50969 0.328115 4.45232 0.348333C4.39495 0.36855 4.3458 0.408265 4.31276 0.461083L0.039731 8.24968C0.0147435 8.29196 0.00104853 8.34042 5.78485e-05 8.39004C-0.000932835 8.43967 0.0108167 8.48867 0.034095 8.53199C0.0573734 8.57532 0.0913382 8.6114 0.132487 8.63652C0.173636 8.66164 0.22048 8.67489 0.268188 8.67489H3.72938L3.26254 13.3647C3.25795 13.4272 3.27358 13.4894 3.30692 13.5416C3.34026 13.5937 3.38941 13.6328 3.44655 13.6525C3.50369 13.6723 3.56553 13.6716 3.62224 13.6505C3.67894 13.6295 3.72725 13.5893 3.75949 13.5364L7.96191 5.74864C7.98628 5.70629 7.99942 5.65798 7.99998 5.60862C8.00055 5.55927 7.98852 5.51064 7.96513 5.4677Z"
                            fill="#1D39C4"
                          />
                        </svg>
                      </>
                    );
                  }

                  if (record.is_standard_price) {
                    return (
                      <>
                        <span style={{ paddingRight: 5 }}>Standard Rates</span>
                        <span>
                          <Tag color="#1D39C4" style={{ borderRadius: 17, width: 82 }}>
                            {record.total_channel} Channel
                          </Tag>
                        </span>
                        <svg
                          fill="none"
                          height="14"
                          style={{ float: 'right' }}
                          viewBox="0 0 8 14"
                          width="8"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.96513 5.4677C7.94174 5.42475 7.90781 5.38903 7.86682 5.36417C7.82582 5.33932 7.77922 5.32622 7.73178 5.32622H4.21808L4.80716 0.643446C4.81348 0.580775 4.79935 0.517713 4.76703 0.464416C4.73471 0.411119 4.6861 0.370686 4.62901 0.349629C4.57193 0.328572 4.50969 0.328115 4.45232 0.348333C4.39495 0.36855 4.3458 0.408265 4.31276 0.461083L0.039731 8.24968C0.0147435 8.29196 0.00104853 8.34042 5.78485e-05 8.39004C-0.000932835 8.43967 0.0108167 8.48867 0.034095 8.53199C0.0573734 8.57532 0.0913382 8.6114 0.132487 8.63652C0.173636 8.66164 0.22048 8.67489 0.268188 8.67489H3.72938L3.26254 13.3647C3.25795 13.4272 3.27358 13.4894 3.30692 13.5416C3.34026 13.5937 3.38941 13.6328 3.44655 13.6525C3.50369 13.6723 3.56553 13.6716 3.62224 13.6505C3.67894 13.6295 3.72725 13.5893 3.75949 13.5364L7.96191 5.74864C7.98628 5.70629 7.99942 5.65798 7.99998 5.60862C8.00055 5.55927 7.98852 5.51064 7.96513 5.4677Z"
                            fill="#1D39C4"
                          />
                        </svg>
                      </>
                    );
                  }

                  return (
                    <>
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: 14,
                          color: '#1D39C4',
                          paddingLeft: 25,
                          paddingRight: 5,
                        }}
                      >
                        {value}
                      </span>
                      <span style={{ fontWeight: 400, fontSize: 14, color: '#1D39C4' }}>
                        {item.name}
                      </span>
                      <span style={{ float: 'right' }}>
                        <svg
                          fill="none"
                          height="12"
                          style={{ marginRight: 20 }}
                          viewBox="0 0 14 12"
                          width="14"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.3898 9.1823L8.67977 0.913156C7.92302 -0.303577 6.07831 -0.305194 5.32055 0.913156L0.610759 9.1823C-0.162835 10.4256 0.773753 12 2.28998 12H11.7102C13.2251 12 14.1634 10.4269 13.3898 9.1823ZM7.00016 10.5077C6.56948 10.5077 6.21891 10.1729 6.21891 9.76157C6.21891 9.35025 6.56948 9.01543 7.00016 9.01543C7.43084 9.01543 7.78141 9.35025 7.78141 9.76157C7.78141 10.1729 7.43084 10.5077 7.00016 10.5077ZM7.78141 7.52315C7.78141 7.93447 7.43084 8.26929 7.00016 8.26929C6.56948 8.26929 6.21891 7.93447 6.21891 7.52315V3.79244C6.21891 3.38112 6.56948 3.0463 7.00016 3.0463C7.43084 3.0463 7.78141 3.38112 7.78141 3.79244V7.52315Z"
                            fill="#FAAD14"
                            fillOpacity="0.85"
                          />
                        </svg>
                        <svg
                          fill="none"
                          height="14"
                          viewBox="0 0 8 14"
                          width="8"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.96513 5.4677C7.94174 5.42475 7.90781 5.38903 7.86682 5.36417C7.82582 5.33932 7.77922 5.32622 7.73178 5.32622H4.21808L4.80716 0.643446C4.81348 0.580775 4.79935 0.517713 4.76703 0.464416C4.73471 0.411119 4.6861 0.370686 4.62901 0.349629C4.57193 0.328572 4.50969 0.328115 4.45232 0.348333C4.39495 0.36855 4.3458 0.408265 4.31276 0.461083L0.039731 8.24968C0.0147435 8.29196 0.00104853 8.34042 5.78485e-05 8.39004C-0.000932835 8.43967 0.0108167 8.48867 0.034095 8.53199C0.0573734 8.57532 0.0913382 8.6114 0.132487 8.63652C0.173636 8.66164 0.22048 8.67489 0.268188 8.67489H3.72938L3.26254 13.3647C3.25795 13.4272 3.27358 13.4894 3.30692 13.5416C3.34026 13.5937 3.38941 13.6328 3.44655 13.6525C3.50369 13.6723 3.56553 13.6716 3.62224 13.6505C3.67894 13.6295 3.72725 13.5893 3.75949 13.5364L7.96191 5.74864C7.98628 5.70629 7.99942 5.65798 7.99998 5.60862C8.00055 5.55927 7.98852 5.51064 7.96513 5.4677Z"
                            fill="#1D39C4"
                          />
                        </svg>
                      </span>
                    </>
                  );
                },
              },
              {
                title: 'AVAIL',
                dataIndex: 'age',
                key: 'age',
                width: '12.5%',
                render: (value: any, record: object, index: number) => {
                  if (index >= 2) {
                    return (
                      <div>
                        <Select
                          defaultValue="min-stay"
                          style={{ fontWeight: 600, minWidth: '84%' }}
                        >
                          <Option value="rate">RATES</Option>
                          <Option value="cta">CTA</Option>
                          <Option value="ctd">CTD</Option>

                          <Option value="min-stay">MIN STAY</Option>
                          <Option value="max-stay">MAX STAY</Option>
                        </Select>
                        <svg
                          fill="none"
                          height="14"
                          style={{ marginRight: 7, marginTop: 7, float: 'right' }}
                          viewBox="0 0 14 14"
                          width="14"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.22051 1.26815C8.82312 0.665539 9.62433 0.333496 10.4764 0.333496C12.2358 0.333496 13.6669 1.76457 13.6669 3.52399C13.6669 4.37604 13.3349 5.17725 12.7323 5.77986L9.94662 8.56552C9.34398 9.16813 8.5428 9.50017 7.69075 9.50017C6.83911 9.50017 6.03793 9.16854 5.43571 8.56673L6.61329 7.38753C7.18947 7.96288 8.19206 7.96246 8.76824 7.38711L11.5538 4.60146C11.8415 4.31338 12.0002 3.93091 12.0002 3.52399C12.0002 2.68374 11.3166 2.00015 10.4764 2.00015C10.0695 2.00015 9.68699 2.15884 9.39891 2.44653L7.85135 3.99409C7.36926 3.80131 6.84486 3.69735 6.30969 3.69735C6.12969 3.69735 5.95347 3.7221 5.77738 3.74684C5.76359 3.74878 5.74981 3.75072 5.73602 3.75264L8.22051 1.26815Z"
                            fill="black"
                            fillOpacity="0.45"
                          />
                          <path
                            d="M4.60148 11.5538L6.13443 10.0208C6.62092 10.2248 7.14724 10.3335 7.69065 10.3335C7.84838 10.3335 8.00198 10.3122 8.15558 10.291C8.18084 10.2875 8.2061 10.284 8.23138 10.2806L5.77986 12.7321C5.17722 13.3348 4.37604 13.6668 3.52399 13.6668C1.76457 13.6668 0.333496 12.2358 0.333496 10.4763C0.333496 9.62425 0.665513 8.82307 1.26815 8.22046L4.05383 5.43481C5.25908 4.22958 7.3599 4.22997 8.56474 5.43359L7.38716 6.6128C6.81098 6.03745 5.80839 6.03786 5.23221 6.61321L2.44655 9.39886C2.15887 9.68694 2.00018 10.0694 2.00018 10.4763C2.00018 11.3166 2.68376 12.0002 3.52402 12.0002C3.93091 12.0002 4.31341 11.8415 4.60148 11.5538Z"
                            fill="black"
                            fillOpacity="0.45"
                          />
                        </svg>
                      </div>
                    );
                  }

                  return (
                    <span style={{ color: 'rgba(0, 0, 0, 0.65)', fontSize: 12, fontWeight: 700 }}>
                      RATES
                    </span>
                  );
                },
              },
              {
                title: () => {
                  if (item.available_rooms_number[0]) {
                    return item.available_rooms_number[0];
                  }

                  return <NoRoomAvailable />;
                },
                dataIndex: 'data1',
                key: 'data1',
                align: 'center' as const,
                className: 'data-channel',
                onHeaderCell: (column: any) => {
                  return {
                    onClick: () => {
                      setUpdateInfo({
                        room_number: item.available_rooms_number[0],
                        room_id: item.roomId,
                        from_date: channelData.dates[0].format,
                      });
                      setIsShowQuickUpdateModal(true);
                    },
                  };
                },
                render: (text: string) => {
                  return {
                    props: {
                      style: {
                        background:
                          channelData.dates[0].day === 'Sun' || channelData.dates[0].day === 'Sat'
                            ? 'rgb(255, 242, 232)'
                            : '',
                      },
                    },
                    children: <div>{text}</div>,
                  };
                },
              },
              {
                title: () => {
                  if (item.available_rooms_number[1]) {
                    return item.available_rooms_number[1];
                  }

                  return <NoRoomAvailable />;
                },
                dataIndex: 'data2',
                key: 'data2',
                align: 'center' as const,
                className: 'data-channel',
                onHeaderCell: () => {
                  return {
                    onClick: () => {
                      setUpdateInfo({
                        room_number: item.available_rooms_number[1],
                        room_id: item.roomId,
                        from_date: channelData.dates[1].format,
                      });
                      setIsShowQuickUpdateModal(true);
                    },
                  };
                },
                render: (text: string) => {
                  return {
                    props: {
                      style: {
                        background:
                          channelData.dates[1].day === 'Sun' || channelData.dates[1].day === 'Sat'
                            ? 'rgb(255, 242, 232)'
                            : '',
                      },
                    },
                    children: <div>{text}</div>,
                  };
                },
              },
              {
                title: () => {
                  if (item.available_rooms_number[2]) {
                    return item.available_rooms_number[2];
                  }

                  return <NoRoomAvailable />;
                },
                dataIndex: 'data3',
                key: 'data3',
                align: 'center' as const,
                className: 'data-channel',
                onHeaderCell: () => {
                  return {
                    onClick: () => {
                      setUpdateInfo({
                        room_number: item.available_rooms_number[2],
                        room_id: item.roomId,
                        from_date: channelData.dates[2].format,
                      });
                      setIsShowQuickUpdateModal(true);
                    },
                  };
                },
                render: (text: string) => {
                  return {
                    props: {
                      style: {
                        background:
                          channelData.dates[2].day === 'Sun' || channelData.dates[2].day === 'Sat'
                            ? 'rgb(255, 242, 232)'
                            : '',
                      },
                    },
                    children: <div>{text}</div>,
                  };
                },
              },
              {
                title: () => {
                  if (item.available_rooms_number[3]) {
                    return item.available_rooms_number[3];
                  }

                  return <NoRoomAvailable />;
                },
                dataIndex: 'data4',
                key: 'data4',
                align: 'center' as const,
                className: 'data-channel',
                onHeaderCell: () => {
                  return {
                    onClick: () => {
                      setUpdateInfo({
                        room_number: item.available_rooms_number[3],
                        room_id: item.roomId,
                        from_date: channelData.dates[3].format,
                      });
                      setIsShowQuickUpdateModal(true);
                    },
                  };
                },
                render: (text: string) => {
                  return {
                    props: {
                      style: {
                        background:
                          channelData.dates[3].day === 'Sun' || channelData.dates[3].day === 'Sat'
                            ? 'rgb(255, 242, 232)'
                            : '',
                      },
                    },
                    children: <div>{text}</div>,
                  };
                },
              },
              {
                title: () => {
                  if (item.available_rooms_number[4]) {
                    return item.available_rooms_number[4];
                  }

                  return <NoRoomAvailable />;
                },
                dataIndex: 'data5',
                key: 'data5',
                align: 'center' as const,
                className: 'data-channel',
                onHeaderCell: () => {
                  return {
                    onClick: () => {
                      setUpdateInfo({
                        room_number: item.available_rooms_number[4],
                        room_id: item.roomId,
                        from_date: channelData.dates[4].format,
                      });
                      setIsShowQuickUpdateModal(true);
                    },
                  };
                },
                render: (text: string) => {
                  return {
                    props: {
                      style: {
                        background:
                          channelData.dates[4].day === 'Sun' || channelData.dates[4].day === 'Sat'
                            ? 'rgb(255, 242, 232)'
                            : '',
                      },
                    },
                    children: <div>{text}</div>,
                  };
                },
              },
              {
                title: () => {
                  if (item.available_rooms_number[5]) {
                    return item.available_rooms_number[5];
                  }

                  return <NoRoomAvailable />;
                },
                dataIndex: 'data6',
                key: 'data6',
                align: 'center' as const,
                className: 'data-channel',
                onHeaderCell: () => {
                  return {
                    onClick: () => {
                      setUpdateInfo({
                        room_number: item.available_rooms_number[5],
                        room_id: item.roomId,
                        from_date: channelData.dates[5].format,
                      });
                      setIsShowQuickUpdateModal(true);
                    },
                  };
                },
                render: (text: string) => {
                  return {
                    props: {
                      style: {
                        background:
                          channelData.dates[5].day === 'Sun' || channelData.dates[5].day === 'Sat'
                            ? 'rgb(255, 242, 232)'
                            : '',
                      },
                    },
                    children: <div>{text}</div>,
                  };
                },
              },
              {
                title: () => {
                  if (item.available_rooms_number[6]) {
                    return item.available_rooms_number[6];
                  }

                  return <NoRoomAvailable />;
                },
                dataIndex: 'data7',
                key: 'data7',
                align: 'center' as const,
                className: 'data-channel',
                onHeaderCell: () => {
                  return {
                    onClick: () => {
                      setUpdateInfo({
                        room_number: item.available_rooms_number[6],
                        room_id: item.roomId,
                        from_date: channelData.dates[6].format,
                      });
                      setIsShowQuickUpdateModal(true);
                    },
                  };
                },
                render: (text: string) => {
                  return {
                    props: {
                      style: {
                        background:
                          channelData.dates[6].day === 'Sun' || channelData.dates[6].day === 'Sat'
                            ? 'rgb(255, 242, 232)'
                            : '',
                      },
                    },
                    children: <div>{text}</div>,
                  };
                },
              },
              {
                title: () => {
                  if (item.available_rooms_number[7]) {
                    return item.available_rooms_number[7];
                  }

                  return <NoRoomAvailable />;
                },
                dataIndex: 'data8',
                key: 'data8',
                align: 'center' as const,
                className: 'data-channel',
                onHeaderCell: () => {
                  return {
                    onClick: () => {
                      setUpdateInfo({
                        room_number: item.available_rooms_number[7],
                        room_id: item.roomId,
                        from_date: channelData.dates[7].format,
                      });
                      setIsShowQuickUpdateModal(true);
                    },
                  };
                },
                render: (text: string) => {
                  return {
                    props: {
                      style: {
                        background:
                          channelData.dates[7].day === 'Sun' || channelData.dates[7].day === 'Sat'
                            ? 'rgb(255, 242, 232)'
                            : '',
                      },
                    },
                    children: <div>{text}</div>,
                  };
                },
              },
              {
                title: () => {
                  if (item.available_rooms_number[8]) {
                    return item.available_rooms_number[8];
                  }

                  return <NoRoomAvailable />;
                },
                dataIndex: 'data9',
                key: 'data9',
                align: 'center' as const,
                className: 'data-channel',
                onHeaderCell: () => {
                  return {
                    onClick: () => {
                      setUpdateInfo({
                        room_number: item.available_rooms_number[8],
                        room_id: item.roomId,
                        from_date: channelData.dates[8].format,
                      });
                      setIsShowQuickUpdateModal(true);
                    },
                  };
                },
                render: (text: string) => {
                  return {
                    props: {
                      style: {
                        background:
                          channelData.dates[8].day === 'Sun' || channelData.dates[8].day === 'Sat'
                            ? 'rgb(255, 242, 232)'
                            : '',
                      },
                    },
                    children: <div>{text}</div>,
                  };
                },
              },
              {
                title: () => {
                  if (item.available_rooms_number[9]) {
                    return item.available_rooms_number[9];
                  }

                  return <NoRoomAvailable />;
                },
                dataIndex: 'data10',
                key: 'data10',
                align: 'center' as const,
                className: 'data-channel',
                onHeaderCell: () => {
                  return {
                    onClick: () => {
                      setUpdateInfo({
                        room_number: item.available_rooms_number[9],
                        room_id: item.roomId,
                        from_date: channelData.dates[9].format,
                      });
                      setIsShowQuickUpdateModal(true);
                    },
                  };
                },
                render: (text: string) => {
                  return {
                    props: {
                      style: {
                        background:
                          channelData.dates[9].day === 'Sun' || channelData.dates[9].day === 'Sat'
                            ? 'rgb(255, 242, 232)'
                            : '',
                      },
                    },
                    children: <div>{text}</div>,
                  };
                },
              },
            ];

            const data: any[] = [];

            const rate = _.find(isShowMore, (rateTemporary: any) => {
              return rateTemporary.rateId === item.rateId;
            });

            const channelLength =
              rate && rate.is_show_more === 1 ? 7 : item.standard_rates.length + 2;

            // for (let index = 0; index < item.standard_rates.length + 2; index++) {
            for (let index = 0; index < channelLength; index++) {
              if (index === 0) {
                if (channelSearch.rate_plan !== '2') {
                  data.push({
                    key: '1',
                    name: 'John Brown',
                    is_website_direct_price: 1,
                    total_channel: item.total_channel,
                    age: 32,
                    data1: formatNumber(item.website_direct_rate[0], emptyPrice),
                    data2: formatNumber(item.website_direct_rate[1], emptyPrice),
                    data3: formatNumber(item.website_direct_rate[2], emptyPrice),
                    data4: formatNumber(item.website_direct_rate[3], emptyPrice),
                    data5: formatNumber(item.website_direct_rate[4], emptyPrice),
                    data6: formatNumber(item.website_direct_rate[5], emptyPrice),
                    data7: formatNumber(item.website_direct_rate[6], emptyPrice),
                    data8: formatNumber(item.website_direct_rate[7], emptyPrice),
                    data9: formatNumber(item.website_direct_rate[8], emptyPrice),
                    data10: formatNumber(item.website_direct_rate[9], emptyPrice),
                  });
                }
              } else if (index === 1) {
                if (channelSearch.rate_plan !== '3') {
                  data.push({
                    key: '1',
                    name: 'John Brown',
                    is_standard_price: 1,
                    total_channel: item.total_channel,
                    age: 32,
                    data1: formatNumber(item.standard_price[0], emptyPrice),
                    data2: formatNumber(item.standard_price[1], emptyPrice),
                    data3: formatNumber(item.standard_price[2], emptyPrice),
                    data5: formatNumber(item.standard_price[4], emptyPrice),
                    data6: formatNumber(item.standard_price[5], emptyPrice),
                    data4: formatNumber(item.standard_price[3], emptyPrice),
                    data7: formatNumber(item.standard_price[6], emptyPrice),
                    data8: formatNumber(item.standard_price[7], emptyPrice),
                    data9: formatNumber(item.standard_price[8], emptyPrice),
                    data10: formatNumber(item.standard_price[9], emptyPrice),
                  });
                }
              } else if (channelSearch.rate_plan !== '3') {
                if (
                  channelSearch.channel === '' ||
                  channelSearch.channel === item.standard_rates[index - 2]?.channel?.toLowerCase()
                ) {
                  data.push({
                    key: '1',
                    name: item.standard_rates[index - 2].channel,
                    is_channel_price: 1,
                    total_channel: item.total_channel,
                    age: 32,
                    data1: formatNumber(item.standard_rates[index - 2].prices[0], emptyPrice),
                    data2: formatNumber(item.standard_rates[index - 2].prices[1], emptyPrice),
                    data3: formatNumber(item.standard_rates[index - 2].prices[2], emptyPrice),
                    data4: formatNumber(item.standard_rates[index - 2].prices[3], emptyPrice),
                    data5: formatNumber(item.standard_rates[index - 2].prices[4], emptyPrice),
                    data6: formatNumber(item.standard_rates[index - 2].prices[5], emptyPrice),
                    data7: formatNumber(item.standard_rates[index - 2].prices[6], emptyPrice),
                    data8: formatNumber(item.standard_rates[index - 2].prices[7], emptyPrice),
                    data9: formatNumber(item.standard_rates[index - 2].prices[8], emptyPrice),
                    data10: formatNumber(item.standard_rates[index - 2].prices[9], emptyPrice),
                  });
                }
              }
            }

            return (
              <Col span={24} style={{ marginTop: 30 }}>
                <Table
                  bordered
                  className="channel-table"
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  rowClassName={(record: object, index: number) => {
                    if (index > 1) {
                      return 'green';
                    }

                    return '';
                  }}
                />
                {item.standard_rates.length > 5 && (
                  <div style={{ textAlign: 'center', paddingTop: 12 }}>
                    <MButton
                      onClick={() => {
                        const rateIndex = isShowMore.findIndex((rateTmpp: any) => {
                          return rateTmpp.rateId === item.rateId;
                        });
                        const isShowMoreTemporary = [...isShowMore];

                        isShowMoreTemporary[rateIndex].is_show_more =
                          isShowMoreTemporary[rateIndex].is_show_more === 1 ? 0 : 1;

                        setIsShowMore(isShowMoreTemporary);
                      }}
                    >
                      {_.find(isShowMore, (rateTemporary: any) => {
                        return rateTemporary.rateId === item.rateId;
                      })?.is_show_more ? (
                        <>
                          All Channel <ArrowDownOutlined />{' '}
                        </>
                      ) : (
                        <>
                          See Less <ArrowUpOutlined />{' '}
                        </>
                      )}
                    </MButton>
                  </div>
                )}
              </Col>
            );
          })}
      </Row>
    </>
  );
}

export default ChannelManager;
