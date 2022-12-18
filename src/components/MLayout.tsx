import 'antd/dist/antd.min.css';
import './layout.css';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Form, Layout, Menu, Modal, Select, Tooltip } from 'antd';
import { selectFacilitesByBranch, selectGetBranchs, selectUser } from 'selectors';
import _ from 'underscore';

import { useAppSelector } from 'modules/hooks';

import { branchFacilites, branchs, branchSelected, logOut } from 'actions';

import Footer from 'components/Footer';

import MButton from './MButton';
import Notification from './Notification';

const { Content, Header, Sider } = Layout;

const { Option } = Select;

interface Props {
  breadCrumb?: any;
  children: React.ReactElement;
}

function MLayout(props: Props) {
  const { breadCrumb, children } = props;
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();

  const handleClickLogout = () => {
    dispatch(logOut());
  };

  const user = useAppSelector(selectUser);

  const menu = (
    <Menu
      items={[
        {
          label: (
            <button onClick={handleClickLogout} type="button">
              Logout
            </button>
          ),
          key: '0',
        },
      ]}
    />
  );

  const navigate = useNavigate();
  const isFirstLoad = useRef(false);

  const allBranchs: any = useAppSelector(selectGetBranchs);

  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [currentBranchId, setCurrentBranchId] = useState<string>(
    window.localStorage.getItem('branch_id') ?? '1',
  );
  const [currentBranchName, setCurrentBranchName] = useState<string>('');
  const [currentFacility, setCurrentFacility] = useState({
    id: window.localStorage.getItem('facility_id') ?? '',
    operator_code: '',
    branch_code: '',
    facility_code: '',
    name: '',
  });

  const changeBranch = (value: string) => {
    setCurrentBranchId(value);
    setCurrentFacility({
      id: '',
      operator_code: '',
      branch_code: '',
      facility_code: '',
      name: '',
    });
    form.setFieldsValue({
      outlet: undefined,
    });
    dispatch(branchFacilites({ branchId: value }));
  };

  const selectFacility = (value: string) => {
    const facilitySelected = _.find(branchFacilities.data.facilities, (item: any) => {
      return item.id.toString() === value;
    });

    setCurrentFacility(facilitySelected);
  };

  const [form] = Form.useForm();

  const handleSubmitChangeFacility = () => {
    form.validateFields().then(() => {
      setIsModalOpen(false);

      dispatch(
        branchSelected({
          operator_code: currentFacility?.operator_code,
          branch_code: currentFacility?.branch_code,
          facility_code: currentFacility?.facility_code,
        }),
      );
      setCurrentBranchName(currentFacility?.name);

      window.localStorage.setItem('branch_id', currentBranchId);
      window.localStorage.setItem('facility_id', currentFacility.id);

      window.location.reload();
    });
  };

  const branchFacilities: any = useAppSelector(selectFacilitesByBranch);

  useEffect(() => {
    dispatch(branchs({}));
    dispatch(branchFacilites({ branchId: window.localStorage.getItem('branch_id') ?? '1' }));
  }, [dispatch]);

  useEffect(() => {
    if (
      allBranchs.data?.length > 0 &&
      branchFacilities.data.facilities?.length > 0 &&
      isFirstLoad.current === false
    ) {
      isFirstLoad.current = true;

      const facilityLocal = window.localStorage.getItem('facility_id');
      const branchLocal = window.localStorage.getItem('branch_id');

      if (facilityLocal && branchLocal) {
        const facilitySelected = _.find(branchFacilities.data.facilities, (item: any) => {
          return item.id.toString() === facilityLocal;
        });

        const branchInfoSelected = _.find(allBranchs.data, (item: any) => {
          return item.id.toString() === branchLocal;
        });

        setCurrentBranchName(facilitySelected.name);
        setCurrentBranchId(branchInfoSelected.id.toString());
        setCurrentFacility({
          id: facilitySelected.id,
          operator_code: facilitySelected.operator_code,
          branch_code: facilitySelected.branch_code,
          facility_code: facilitySelected.facility_code,
          name: facilitySelected.name,
        });
      } else {
        const facilitySelected = branchFacilities.data.facilities[0];

        setCurrentBranchName(facilitySelected.name);
        setCurrentBranchId(branchFacilities.branch_id.toString());
        setCurrentFacility({
          id: facilitySelected.id,
          operator_code: facilitySelected.operator_code,
          branch_code: facilitySelected.branch_code,
          facility_code: facilitySelected.facility_code,
          name: facilitySelected.name,
        });

        window.localStorage.setItem('branch_id', branchFacilities.branch_id);
        window.localStorage.setItem('facility_id', facilitySelected.id);

        dispatch(
          branchSelected({
            operator_code: facilitySelected.operator_code,
            branch_code: facilitySelected.branch_code,
            facility_code: facilitySelected.facility_code,
          }),
        );
      }
    }
  }, [allBranchs, branchFacilities]);

  return (
    <Layout>
      <Sider collapsed={collapsed} collapsible trigger={null}>
        <div className="logo">
          <svg
            fill="none"
            height="24"
            viewBox="0 0 20 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6822 4.03766L10.4475 17.5148L5.11471 5.57691C4.91367 4.91071 4.67189 4.29823 4.38936 3.73948C3.1397 1.30569 1.94981 0.0592511 0.816961 0.00283879C0.466513 -0.0159653 0.284497 0.0780551 0.273631 0.2849C0.268198 0.392352 0.423047 0.518608 0.735462 0.660982C1.20544 0.859768 1.56947 1.0693 1.83027 1.28689C2.5203 1.84295 2.85988 2.24053 2.84902 2.47692C2.8463 2.50916 2.7648 2.5602 2.6018 2.63004C2.4388 2.69988 2.35187 2.83151 2.341 3.01955C2.32742 3.25595 2.54204 3.62128 2.97942 4.11825C3.61511 4.83012 4.05521 5.39155 4.30786 5.79719L4.36763 6.03627L4.24809 6.03089C4.13671 6.02552 4.00631 5.98254 3.85961 5.90464C3.7102 5.82673 3.62055 5.78644 3.59066 5.78375C3.24022 5.76495 3.05277 5.96105 3.03103 6.37205C3.02017 6.56009 3.3027 7.05437 3.87863 7.84952C4.13943 8.20948 4.33774 8.48617 4.47901 8.68764V9.3028C4.43554 9.27326 4.35948 9.19535 4.24809 9.06641C4.10411 8.89986 3.9384 8.8139 3.74551 8.80315C3.28368 8.77898 3.03918 9.02074 3.01202 9.52577C2.99843 9.77828 3.08808 10.0765 3.27825 10.4176C3.60425 10.9092 3.9384 11.3927 4.28341 11.8682C4.35948 11.9891 4.42196 12.1073 4.47901 12.2255V13.6036C3.92753 12.478 3.29455 11.8897 2.58007 11.8521C2.03674 11.8252 1.75421 12.0321 1.73247 12.4726C1.71617 12.8031 2.11552 13.7083 2.93595 15.1885C3.75366 16.6686 4.15029 17.6679 4.12313 18.1891C4.12041 18.2374 4.10139 18.2912 4.06608 18.3529C3.91395 18.2186 3.7591 17.9339 3.60696 17.4987C3.41408 16.905 3.25108 16.486 3.12068 16.2415C2.94682 15.9165 2.69145 15.6264 2.36274 15.3738C2.03131 15.1186 1.76236 14.987 1.55589 14.9763C0.996261 14.9467 0.700145 15.2798 0.664829 15.9756C0.643096 16.3705 0.912044 16.897 1.46896 17.5578C2.14812 18.3503 2.58279 19.0299 2.77838 19.594L2.7485 19.7337C2.65342 19.7283 2.57192 19.7176 2.50944 19.6988C2.10194 19.5188 1.72161 19.2878 1.37116 19.0003C1.06418 18.764 0.901178 18.6458 0.884878 18.6431C0.325247 18.6162 0.0291321 18.8929 -0.000751035 19.4785C-0.0143343 19.7633 0.183981 20.048 0.602346 20.3381C1.60479 21.0204 2.08564 21.7807 2.04217 22.6161C2.03674 22.7424 2.02044 22.8606 2.00142 22.9707L2.01501 23.1856C2.12095 23.3011 2.25407 23.3629 2.41435 23.371C2.83 23.3924 3.40321 22.3367 4.13671 20.2092C5.10656 17.4235 5.64989 15.0649 5.77214 13.1227L10.4013 23.4784L15.5928 12.2148L17.2853 22.6833H19.9992L16.6822 4.03766Z"
              fill="white"
            />
          </svg>
          {!collapsed && (
            <span
              className={isFirstLoad.current ? 'company-name' : ''}
              style={{
                color: 'white',
                fontSize: 20,
                position: 'relative',
                top: -4,
                paddingLeft: 10,
                fontFamily: 'Avenir,"Helvetica Neue",Arial,Helvetica,sans-serif',
                fontWeight: 600,
              }}
            >
              {' '}
              SClound PMS{' '}
            </span>
          )}
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: (
                <span>
                  <svg
                    fill="none"
                    height="12"
                    viewBox="0 0 18 12"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.7359 5.21568C4.34807 5.21568 4.03367 5.54106 4.03367 5.94246C4.03367 6.34386 4.34807 6.66924 4.7359 6.66924H9.76236C10.1502 6.66924 10.4646 6.34386 10.4646 5.94246C10.4646 5.54106 10.1502 5.21568 9.76236 5.21568H4.7359Z"
                      fill="white"
                    />
                    <path
                      clipRule="evenodd"
                      d="M2.14705 1.57728L0.677408 10.8555C0.596271 11.3678 0.978244 11.8332 1.47979 11.8332H11.4993C11.8617 11.8332 12.1706 11.5613 12.2289 11.1912L13.6937 1.89078C13.7609 1.46453 14.3524 1.46212 14.4228 1.88782L15.1149 6.07331C15.1787 6.4593 15.5426 6.71059 15.9115 6.62333C16.2552 6.54202 16.4763 6.1952 16.4132 5.83618L15.671 1.61131C15.524 0.774659 14.8199 0.166504 13.9982 0.166504H3.75185C2.95524 0.166504 2.2759 0.763714 2.14705 1.57728ZM3.44546 1.91637L2.16776 10.0244C2.13842 10.2105 2.27731 10.3796 2.45961 10.3796H10.7048C10.8859 10.3796 11.0404 10.2437 11.0696 10.0587L12.3535 1.91112C12.3902 1.67839 12.2165 1.46705 11.9887 1.46705H3.95614C3.70251 1.46705 3.48628 1.6573 3.44546 1.91637Z"
                      fill="white"
                      fillRule="evenodd"
                    />
                    <path
                      d="M15.8606 10.4561L15.571 9.13217C15.4863 8.74482 15.7231 8.36033 16.0982 8.27639C16.4754 8.19201 16.8461 8.44406 16.921 8.8358L17.3195 10.9195C17.4061 11.3727 17.071 11.7949 16.6246 11.7949H14.142C13.7848 11.7949 13.4953 11.4952 13.4953 11.1255C13.4953 10.7558 13.7848 10.4561 14.142 10.4561H15.8606Z"
                      fill="white"
                    />
                  </svg>
                </span>
              ),
              label: 'Reservation',
              onClick: () => {
                navigate('/reservation');
              },
            },
          ]}
          mode="inline"
          subMenuCloseDelay={1}
          subMenuOpenDelay={1}
          theme="dark"
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            height: 50,
            lineHeight: '48px',
            borderBottom: '1px solid #f5f5f5',
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <span style={{ fontSize: 13 }}>{breadCrumb}</span>

          <MButton onClick={showModal} style={{ marginLeft: '31%', fontSize: 12 }}>
            {currentBranchName}
          </MButton>
          <Modal
            bodyStyle={{ backgroundColor: '#F0F2F5' }}
            okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
            okText={t('common.Save')}
            onCancel={handleCancel}
            onOk={handleSubmitChangeFacility}
            title={<b>Switch Branchs</b>}
            visible={isModalOpen}
          >
            <p style={{ paddingBottom: 0 }}>Please select your branch & outlet</p>
            <Form
              form={form}
              initialValues={{
                branch: currentBranchId,
                outlet: currentFacility.id?.toString(),
              }}
              layout="vertical"
            >
              <Form.Item
                label={<span>Select branch</span>}
                name="branch"
                rules={[{ required: true }]}
              >
                <Select
                  allowClear
                  onChange={changeBranch}
                  style={{ marginTop: -10 }}
                  value={currentBranchId === '' ? undefined : currentBranchId}
                >
                  {allBranchs.data.length > 0 &&
                    allBranchs.data.map((branch: any) => (
                      <Option key={branch.id}>{branch.name}</Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={<span>Select Outlet</span>}
                name="outlet"
                rules={[{ required: true }]}
              >
                <Select
                  allowClear
                  onChange={selectFacility}
                  placeholder="Select Outlet"
                  value={currentFacility.id ? currentFacility.id.toString() : undefined}
                >
                  {branchFacilities.data.facilities?.length > 0 &&
                    branchFacilities.data.facilities.map((facility: any) => (
                      <Option key={facility.id} value={facility.id.toString()}>
                        {facility.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Form>
          </Modal>

          <div style={{ float: 'right', paddingRight: '15px' }}>
            <Tooltip placement="top" title="System Date">
              <span style={{ marginRight: 28, fontSize: 12, cursor: 'pointer' }}>19/05/2021</span>
            </Tooltip>

            <Notification />

            <Dropdown overlay={menu} placement="bottom" trigger={['click']}>
              <Avatar style={{ marginBottom: 0, marginRight: 10, background: '#7265e6' }}>
                <svg
                  fill="none"
                  height="24"
                  viewBox="0 0 20 24"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6836 4.12695L10.4489 17.9038L5.11611 5.70042C4.91508 5.01941 4.6733 4.39331 4.39076 3.82214C3.1411 1.33423 1.95121 0.0600695 0.818365 0.00240278C0.467917 -0.0168195 0.285901 0.0792917 0.275035 0.290736C0.269601 0.400578 0.424451 0.529641 0.736866 0.675181C1.20685 0.878388 1.57088 1.09258 1.83168 1.31501C2.52171 1.88344 2.86129 2.28985 2.85042 2.5315C2.8477 2.56445 2.76621 2.61663 2.60321 2.68802C2.44021 2.75942 2.35327 2.89398 2.34241 3.0862C2.32882 3.32785 2.54344 3.70131 2.98082 4.20933C3.61652 4.93703 4.05662 5.51095 4.30926 5.9256L4.36903 6.17L4.2495 6.1645C4.13812 6.15901 4.00772 6.11508 3.86102 6.03544C3.7116 5.95581 3.62195 5.91462 3.59207 5.91187C3.24162 5.89265 3.05417 6.09311 3.03244 6.51325C3.02157 6.70547 3.3041 7.21074 3.88003 8.02357C4.14083 8.39154 4.33915 8.67438 4.48041 8.88033V9.50917C4.43695 9.47897 4.36088 9.39933 4.2495 9.26752C4.10552 9.09727 3.9398 9.0094 3.74692 8.99841C3.28509 8.9737 3.04059 9.22084 3.01342 9.73709C2.99984 9.99522 3.08949 10.3 3.27965 10.6488C3.60565 11.1513 3.9398 11.6456 4.28481 12.1316C4.36088 12.2552 4.42336 12.376 4.48041 12.4969V13.9056C3.92893 12.755 3.29595 12.1536 2.58147 12.1152C2.03814 12.0877 1.75561 12.2991 1.73388 12.7495C1.71758 13.0873 2.11693 14.0127 2.93735 15.5257C3.75507 17.0388 4.1517 18.0603 4.12453 18.5931C4.12182 18.6425 4.1028 18.6974 4.06748 18.7606C3.91535 18.6233 3.7605 18.3322 3.60837 17.8873C3.41549 17.2805 3.25249 16.8521 3.12209 16.6022C2.94822 16.2699 2.69286 15.9733 2.36414 15.7152C2.03271 15.4543 1.76376 15.3198 1.55729 15.3088C0.997664 15.2786 0.701549 15.6191 0.666233 16.3303C0.644499 16.734 0.913448 17.2722 1.47036 17.9477C2.14953 18.7578 2.58419 19.4526 2.77979 20.0292L2.74991 20.172C2.65482 20.1665 2.57332 20.1556 2.51084 20.1363C2.10334 19.9523 1.72301 19.7162 1.37256 19.4224C1.06558 19.1807 0.902581 19.0599 0.886282 19.0571C0.326651 19.0297 0.030536 19.3125 0.000652773 19.9112C-0.0129305 20.2022 0.185385 20.4933 0.60375 20.7899C1.60619 21.4874 2.08704 22.2645 2.04358 23.1185C2.03814 23.2476 2.02184 23.3684 2.00283 23.481L2.01641 23.7007C2.12236 23.8188 2.25547 23.8819 2.41576 23.8902C2.83141 23.9121 3.40462 22.8329 4.13811 20.6581C5.10796 17.8104 5.65129 15.3994 5.77354 13.414L10.4027 24L15.5942 12.4859L17.2867 23.1872H20.0007L16.6836 4.12695Z"
                    fill="white"
                  />
                </svg>
              </Avatar>
            </Dropdown>
            <span style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.65)' }}>{user.username}</span>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            minHeight: 280,
            paddingTop: 20,
          }}
        >
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default MLayout;
