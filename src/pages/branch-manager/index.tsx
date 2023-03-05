/** ***********************************
Module Name : Branch Manager
Developer Name : HanhTV
Created Date : 16/02/2023
Updated Date : 16/02/2023
Main functions : Branch Manager Index
************************************ */

import 'styles/branch_manager.css';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Pagination, Row, Select, Space, Spin, Table, Tabs } from 'antd';
import * as _ from 'lodash';
import DownLoadCSV from 'pages/branch-manager/DownLoadCSV';
import { selectBranchManagerState } from 'selectors';
import useTreeChanges from 'tree-changes-hook';

import { useAppSelector } from 'modules/hooks';

import { branchManager } from 'actions';

import { RootState } from 'types';

import Header from './Header';

function Branch() {
  const DAY = 'To Day';
  const WEEK = 'This Week';
  const MONTH = 'This Month';
  const YEAR = 'This Year';
  const { TabPane } = Tabs;
  const { Option } = Select;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const DataElectric: any = useSelector<RootState>(
    ({ getBranchManager }) => getBranchManager.DataElectric,
  );
  const DataWater: any = useSelector<RootState>(
    ({ getBranchManager }) => getBranchManager.DataWater,
  );
  const branchManagerdata = useAppSelector(selectBranchManagerState);
  const [Date, setDate] = useState(DAY);
  const [resultFilterE, setResultFilterE] = useState([]);
  const [resultFilterW, setResultFilterW] = useState([]);
  const [checkFilter, setCheckFilter] = useState(false);
  const [Econsum, setEconsum] = useState(0);
  const [Wconsum, setWconsum] = useState(0);
  const [EYOY, setEYOY] = useState(0);
  const [WYOY, setWYOY] = useState(0);
  const [avgE, setAvgE] = useState(0);
  const [avgW, setAvgW] = useState(0);
  const [totalE, setTotalE] = useState(0);
  const [totalW, setTotalW] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { changed: branchManagerChanged } = useTreeChanges(branchManagerdata);

  useEffect(() => {
    dispatch(branchManager());
  }, []);

  useEffect(() => {
    if (branchManagerChanged('status', 'SUCCESS')) {
      setTotalE(DataElectric.length);
      setTotalW(DataWater.length);
      setIsLoading(false);
    }
  }, [branchManagerChanged]);

  const columns = [
    {
      title: t('branchManager.branch_code'),
      dataIndex: 'code',
      key: 'code',
      render: (text: any) => <button type="button">{text}</button>,
    },
    {
      title: t('branchManager.branch_name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('branchManager.area'),
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: t('branchManager.consumption'),
      key: 'consumption',
      dataIndex: 'consumption',
    },
    {
      title: t('branchManager.avg'),
      key: 'dailyAbg',
      dataIndex: 'dailyAbg',
    },
    {
      title: t('branchManager.yoy'),
      key: 'yOY',
      dataIndex: 'yOY',
    },
    {
      title: t('branchManager.action'),
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <button type="button">More</button>
        </Space>
      ),
    },
  ];

  const convertData = (data: any) => {
    if (data) {
      return data.map((item: any, index: any) => {
        return {
          ...item,
          key: index,
          name: item.name,
          area: item.area,
          consumption: item.consumption,
          dailyAbg: item.dailyAbg,
          yOY: item.yOY,
        };
      });
    }

    return [];
  };

  const currentPage = 1;

  // Filter
  const FilterBranch = 'FilterBranch';
  const FilterArea = 'FilterArea';
  const [sttFilter, setSttFilter] = useState(false);

  const filterData = (value: any, type: string) => {
    let dataCurrentE: any = [];
    let dataCurrentW: any = [];

    switch (type) {
      case FilterBranch:
        dataCurrentE = branchManagerdata.DataElectric.filter(branch => {
          return branch.code === value || (value === 'all' && true);
        });
        dataCurrentW = branchManagerdata.DataWater.filter(branch => {
          return branch.code === value || (value === 'all' && true);
        });
        setResultFilterE(convertData(dataCurrentE));
        setResultFilterW(convertData(dataCurrentW));
        setCheckFilter(true);
        setSttFilter(!sttFilter);
        setTotalE(branchManagerdata.DataElectric.length);
        setTotalW(branchManagerdata.DataWater.length);

        return;
      case FilterArea:
        dataCurrentE = branchManagerdata.DataElectric.filter(branch => {
          return branch.area.toLocaleLowerCase() === value || (value === 'all' && true);
        });
        dataCurrentW = branchManagerdata.DataWater.filter(branch => {
          return branch.area.toLocaleLowerCase() === value || (value === 'all' && true);
        });
        setResultFilterE(dataCurrentE);
        setResultFilterW(dataCurrentW);
        setCheckFilter(true);
        setSttFilter(!sttFilter);
        setTotalE(branchManagerdata.DataElectric.length);
        setTotalW(branchManagerdata.DataWater.length);

        return;
      default:
        setCheckFilter(false);
        setSttFilter(!sttFilter);
        setTotalE(branchManagerdata.DataElectric.length);
        setTotalW(branchManagerdata.DataWater.length);
        break;
    }
  };

  // Fetch Data
  const fetchData = (value: any) => {
    switch (value) {
      case DAY:
        setDate(DAY);
        // dispatch({
        //   type: 'branchAndanalysis/fetchBranchForDay',
        // });
        break;
      case WEEK:
        setDate(WEEK);
        // dispatch({
        //   type: 'branchAndanalysis/fetchBranchForWeek',
        // });
        break;
      case MONTH:
        setDate(MONTH);
        // dispatch({
        //   type: 'branchAndanalysis/fetchBranchForMonth',
        // });
        break;
      case YEAR:
        setDate(YEAR);
        // dispatch({
        //   type: 'branchAndanalysis/fetchBranchForYear',
        // });
        break;
      default:
        break;
    }
  };

  const count = (array: any, key: any) => {
    return array.reduce(function (r: any, a: any) {
      return r + a[key];
    }, 0);
  };

  useEffect(() => {
    if (checkFilter) {
      const e = count(resultFilterE, 'consumption');
      const w = count(resultFilterW, 'consumption');

      setEconsum(e);
      setWconsum(w);

      if (resultFilterE.length !== 0) {
        setEYOY(_.meanBy(resultFilterE, (item: any) => item.yOY));
        setEYOY(_.meanBy(resultFilterW, (item: any) => item.yOY));
        setAvgE(_.meanBy(resultFilterE, (item: any) => item.dailyAbg));
        setAvgW(_.meanBy(resultFilterW, (item: any) => item.dailyAbg));
        setTotalE(resultFilterE.length);
        setTotalW(resultFilterW.length);
      } else {
        setEYOY(0);
        setWYOY(0);
        setAvgE(0);
        setAvgW(0);
        setTotalE(0);
        setTotalW(0);
      }
    } else {
      const e = count(branchManagerdata.DataElectric, 'consumption');
      const w = count(branchManagerdata.DataWater, 'consumption');

      setEconsum(e);
      setWconsum(w);
      setEYOY(_.meanBy(branchManagerdata.DataElectric, (item: any) => item.yOY));
      setWYOY(_.meanBy(branchManagerdata.DataWater, (item: any) => item.yOY));
      setAvgE(_.meanBy(branchManagerdata.DataElectric, (item: any) => item.dailyAbg));
      setAvgW(_.meanBy(branchManagerdata.DataWater, (item: any) => item.dailyAbg));
      setTotalE(branchManagerdata.DataElectric.length);
      setTotalW(branchManagerdata.DataWater.length);
    }
  }, [checkFilter, branchManagerdata.DataElectric, branchManagerdata.DataWater, sttFilter]);

  const onChangeCurrentPage = (page: number, pageSize: number) => {
    setIsLoading(false);
  };

  return !isLoading ? (
    <>
      <Row align="middle">
        {/* START Branch Select */}
        <Col span={2}>
          <span style={{ paddingLeft: '24px', fontSize: '12px' }}>Branch</span>
        </Col>
        <Col span={3}>
          <Select
            defaultValue="all"
            onChange={value => filterData(value, FilterBranch)}
            style={{ width: '100%' }}
          >
            <Option value="all">All branch</Option>
            <Option value="SUNHN">Hanoi Branch</Option>
            <Option value="SUNPQ">Phu Quoc Branch</Option>
            <Option value="SUNVT">Vung Tau Branch</Option>
            <Option value="SUNQN">Quang Ninh Branch</Option>
            <Option value="SUNCM">Ca Mau Branch</Option>
            <Option value="SUNHCM">Ho Chi Minh Branch</Option>
            <Option value="SUNDN">Da Nang Branch</Option>
          </Select>
        </Col>
        {/* END Branch Select */}

        {/* START Area Select */}
        <Col span={2}>
          <span style={{ paddingLeft: '24px', fontSize: '12px' }}>Area</span>
        </Col>
        <Col span={3}>
          <Select
            defaultValue="all"
            onChange={value => filterData(value, FilterArea)}
            style={{ width: '100%' }}
          >
            <Option value="all">All Area</Option>
            <Option value="hotel">Hotel</Option>
            <Option value="spa">Spa</Option>
            <Option value="restaurant">Restaurant</Option>
            <Option value="pool">Pool</Option>
            <Option value="golf_course">Golf course</Option>
            <Option value="other">Other</Option>
          </Select>
        </Col>
        {/* END Area Select */}

        {/* START Filter time */}
        <Col className="branch-filter-time" offset={9} span={5}>
          <div
            aria-hidden="true"
            className={Date === DAY ? 'active' : ''}
            onClick={() => fetchData(DAY)}
            onKeyDown={() => fetchData(DAY)}
          >
            To Day
          </div>
          <div
            aria-hidden="true"
            className={Date === WEEK ? 'active' : ''}
            onClick={() => fetchData(WEEK)}
            onKeyDown={() => fetchData(WEEK)}
          >
            This Week
          </div>
          <div
            aria-hidden="true"
            className={Date === MONTH ? 'active' : ''}
            onClick={() => fetchData(MONTH)}
            onKeyDown={() => fetchData(MONTH)}
          >
            This Month
          </div>
          <div
            aria-hidden="true"
            className={Date === YEAR ? 'active' : ''}
            onClick={() => fetchData(YEAR)}
            onKeyDown={() => fetchData(YEAR)}
          >
            This Year
          </div>
        </Col>
        {/* END Filter time */}
      </Row>
      <Tabs className="branch-manager" defaultActiveKey="1" style={{ minHeight: '100%' }}>
        <TabPane key="e" className="content" tab={t('branchManager.tab_electricity')}>
          <Header avg={avgE} consum={Econsum} type={1} yoy={EYOY} />
          <Row>
            <Col span={24} style={{ paddingTop: 16 }}>
              <Table
                className="branch-manager-list"
                columns={columns}
                dataSource={checkFilter ? resultFilterE : convertData(DataElectric)}
                pagination={false}
                size="small"
                style={{ overflowX: 'hidden', overflowY: 'auto' }}
              />
              {totalE > 0 && (
                <Pagination
                  current={currentPage}
                  onChange={onChangeCurrentPage}
                  pageSize={10}
                  showSizeChanger={false}
                  style={{ float: 'right', marginTop: 15 }}
                  total={totalE}
                />
              )}
            </Col>
          </Row>
        </TabPane>
        <TabPane key="w" className="content" tab={t('branchManager.tab_water')}>
          <Header avg={avgW} consum={Wconsum} type={0} yoy={WYOY} />
          <Row>
            <Col span={24} style={{ paddingTop: 16 }}>
              <Table
                className="branch-manager-list"
                columns={columns}
                dataSource={checkFilter ? resultFilterW : convertData(DataWater)}
                pagination={false}
                size="small"
                style={{ overflowX: 'hidden', overflowY: 'auto' }}
              />
              {totalW > 0 && (
                <Pagination
                  current={currentPage}
                  onChange={onChangeCurrentPage}
                  pageSize={10}
                  showSizeChanger={false}
                  style={{ float: 'right', marginTop: 15 }}
                  total={totalW}
                />
              )}
            </Col>
          </Row>
        </TabPane>
        <TabPane key="d" className="content" tab={t('branchManager.tab_dowload')}>
          <Row>
            <Col span={24} style={{ paddingTop: 16 }}>
              <DownLoadCSV />
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </>
  ) : (
    <Spin style={{ width: '100%', minHeight: 300, marginTop: '15%' }} />
  );
}

export default Branch;
