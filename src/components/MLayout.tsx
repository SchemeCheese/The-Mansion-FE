import 'antd/dist/antd.min.css';
import './layout.css';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Form, Layout, Menu, Modal, Select, Tooltip } from 'antd';
import moment from 'moment';
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
  const { t } = useTranslation();

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
    normal_time_check_in: '',
    normal_time_check_out: '',
    addition_cico_fee: '',
  });

  const changeBranch = (value: string) => {
    setCurrentBranchId(value);
    setCurrentFacility({
      id: '',
      operator_code: '',
      branch_code: '',
      facility_code: '',
      name: '',
      normal_time_check_in: '',
      normal_time_check_out: '',
      addition_cico_fee: '',
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
          normal_time_check_in: currentFacility?.normal_time_check_in,
          normal_time_check_out: currentFacility?.normal_time_check_out,
          addition_cico_fee: branchFacilities.data.addition_cico_fee,
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
  }, []);

  useEffect(() => {
    const facilityLocal = window.localStorage.getItem('facility_id');
    const branchLocal = window.localStorage.getItem('branch_id');

    if (facilityLocal && branchLocal) {
      const facilitySelected = _.find(branchFacilities.data.facilities, (item: any) => {
        return item.id.toString() === facilityLocal;
      });

      dispatch(
        branchSelected({
          operator_code: facilitySelected.operator_code,
          branch_code: facilitySelected.branch_code,
          facility_code: facilitySelected.facility_code,
          normal_time_check_in: facilitySelected.normal_time_check_in,
          normal_time_check_out: facilitySelected.normal_time_check_out,
          addition_cico_fee: branchFacilities.data.addition_cico_fee,
        }),
      );
    }
  }, [branchFacilities]);

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
          normal_time_check_in: facilitySelected.normal_time_check_in,
          normal_time_check_out: facilitySelected.normal_time_check_out,
          addition_cico_fee: branchFacilities.data.addition_cico_fee,
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
          normal_time_check_in: facilitySelected.normal_time_check_in,
          normal_time_check_out: facilitySelected.normal_time_check_out,
          addition_cico_fee: branchFacilities.data.addition_cico_fee,
        });

        window.localStorage.setItem('branch_id', branchFacilities.branch_id);
        window.localStorage.setItem('facility_id', facilitySelected.id);
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
              label: t('common.Reservation'),
              onClick: () => {
                navigate('/reservation');
              },
            },
            {
              key: '2',
              icon: (
                <span>
                  <svg
                    fill="none"
                    height="18"
                    style={{ position: 'relative', top: 2 }}
                    viewBox="0 0 18 18"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M8.99984 0.666992C7.412 0.666992 6.11173 1.88413 6.11173 3.39071C6.11173 4.04008 6.35434 4.63617 6.75691 5.10391C5.01978 5.82495 3.74128 7.3577 3.47081 9.19328H1.43373C1.01473 9.19328 0.666504 9.51416 0.666504 9.92039C0.666504 10.3266 1.01473 10.6475 1.43373 10.6475H2.27385V16.6066C2.27385 17.0128 2.62207 17.3337 3.04107 17.3337H14.9586C15.3776 17.3337 15.7258 17.0128 15.7258 16.6066V10.6475H16.5659C16.985 10.6475 17.3332 10.3266 17.3332 9.92039C17.3332 9.51416 16.985 9.19328 16.5659 9.19328H14.5289C14.2584 7.3577 12.9799 5.82495 11.2428 5.10391C11.6453 4.63618 11.8879 4.04008 11.8879 3.39071C11.8879 1.88413 10.5877 0.666992 8.99984 0.666992ZM7.64618 3.39071C7.64618 2.69533 8.24867 2.1212 8.99984 2.1212C9.751 2.1212 10.3535 2.69533 10.3535 3.39071C10.3535 4.08608 9.751 4.66021 8.99984 4.66021C8.24867 4.66021 7.64618 4.08608 7.64618 3.39071ZM12.9736 9.19328H5.02606C5.38747 7.44458 7.02901 6.11442 8.99984 6.11442C10.9707 6.11442 12.6123 7.44459 12.9736 9.19328ZM3.8083 15.8795V10.6475H14.1914V15.8795H3.8083Z"
                      fill="white"
                      fillRule="evenodd"
                    />
                  </svg>
                </span>
              ),
              label: t('frontDesk.Front Desk'),
              onClick: () => {
                navigate('/front-desk');
              },
            },
            {
              key: '3',
              icon: (
                <span>
                  <svg
                    fill="none"
                    height="18"
                    style={{ position: 'relative', top: 3 }}
                    viewBox="0 0 18 18"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M13.9396 6.79085C13.6576 6.79085 13.4289 6.56221 13.4289 6.28023C13.4289 5.15399 12.5127 4.23774 11.3864 4.23774C11.1045 4.23774 10.8758 4.00911 10.8758 3.72712C10.8758 3.44513 11.1045 3.2165 11.3864 3.2165C12.5127 3.2165 13.4289 2.30025 13.4289 1.17402C13.4289 0.892029 13.6576 0.663396 13.9396 0.663396C14.2215 0.663396 14.4502 0.892029 14.4502 1.17402C14.4502 2.30025 15.3664 3.2165 16.4927 3.2165C16.7746 3.2165 17.0033 3.44513 17.0033 3.72712C17.0033 4.00911 16.7746 4.23774 16.4927 4.23774C15.3664 4.23774 14.4502 5.15399 14.4502 6.28023C14.4502 6.56221 14.2215 6.79085 13.9396 6.79085ZM13.0783 3.72712C13.4195 3.95393 13.7128 4.24722 13.9396 4.58835C14.1663 4.24722 14.4596 3.95393 14.8008 3.72712C14.4596 3.50031 14.1663 3.20703 13.9396 2.8659C13.7128 3.20703 13.4195 3.50031 13.0783 3.72712Z"
                      fill="white"
                      fillRule="evenodd"
                    />
                    <path
                      clipRule="evenodd"
                      d="M8.83334 17.0033C4.31804 17.0033 0.663409 13.3493 0.663409 8.83333C0.663409 4.39926 4.17123 0.856662 8.47596 0.6712C8.70484 0.661601 8.91213 0.805026 8.98329 1.0227C9.05439 1.24039 8.97197 1.47882 8.78153 1.60599C7.21531 2.65204 6.28024 4.39944 6.28024 6.28023C6.28024 9.37736 8.79993 11.8971 11.8971 11.8971C13.4331 11.8971 14.867 11.2889 15.9347 10.1845C16.0939 10.0198 16.3434 9.98133 16.5449 10.0903C16.7463 10.1994 16.8505 10.4292 16.7997 10.6526C15.966 14.3193 12.6849 17.0033 8.83334 17.0033ZM6.85678 1.95922C3.85297 2.81454 1.68465 5.57017 1.68465 8.83333C1.68465 12.7751 4.89154 15.982 8.83334 15.982C11.6159 15.982 14.0599 14.4153 15.2403 12.0192C14.238 12.606 13.0937 12.9183 11.8971 12.9183C8.23685 12.9183 5.259 9.94045 5.259 6.28023C5.259 4.67275 5.83694 3.14779 6.85678 1.95922Z"
                      fill="white"
                      fillRule="evenodd"
                    />
                    <path
                      clipRule="evenodd"
                      d="M9.85458 10.1418C9.85458 10.4238 10.0832 10.6524 10.3652 10.6524C10.6472 10.6524 10.8758 10.4238 10.8758 10.1418C10.8758 9.43791 11.4485 8.86524 12.1524 8.86524C12.4344 8.86524 12.663 8.63661 12.663 8.35462C12.663 8.07263 12.4344 7.844 12.1524 7.844C11.4485 7.844 10.8758 7.27134 10.8758 6.56745C10.8758 6.28546 10.6472 6.05683 10.3652 6.05683C10.0832 6.05683 9.85458 6.28546 9.85458 6.56745C9.85458 7.27134 9.28193 7.844 8.57803 7.844C8.29604 7.844 8.06741 8.07263 8.06741 8.35462C8.06741 8.63661 8.29604 8.86524 8.57803 8.86524C9.28193 8.86524 9.85458 9.43791 9.85458 10.1418ZM10.3652 8.69907C10.2628 8.5725 10.1473 8.457 10.0207 8.35462C10.1473 8.25225 10.2628 8.13675 10.3652 8.01018C10.4676 8.13675 10.5831 8.25225 10.7097 8.35462C10.5831 8.457 10.4676 8.5725 10.3652 8.69907Z"
                      fill="white"
                      fillRule="evenodd"
                    />
                    <path
                      clipRule="evenodd"
                      d="M8.4691 0.507947C8.77093 0.495289 9.04462 0.684476 9.13859 0.971932C9.23243 1.25922 9.12368 1.57398 8.87227 1.74187C7.35137 2.75765 6.44363 4.45412 6.44363 6.28023C6.44363 9.28712 8.89017 11.7337 11.8971 11.7337C13.3888 11.7337 14.7803 11.1435 15.8172 10.071C16.0274 9.85349 16.3567 9.80275 16.6226 9.94664C16.8885 10.0906 17.0261 10.394 16.959 10.6889C16.1086 14.4291 12.7621 17.1667 8.83333 17.1667C4.22779 17.1667 0.5 13.4395 0.5 8.83333C0.5 4.3103 4.07841 0.697113 8.4691 0.507947ZM15.9347 10.1845C14.867 11.2889 13.4331 11.8971 11.8971 11.8971C8.79993 11.8971 6.28024 9.37736 6.28024 6.28023C6.28024 4.39944 7.21531 2.65204 8.78153 1.60599C8.97197 1.47882 9.05439 1.24039 8.98329 1.0227C8.91213 0.805026 8.70484 0.661601 8.47596 0.6712C4.17123 0.856662 0.663409 4.39926 0.663409 8.83333C0.663409 13.3493 4.31804 17.0033 8.83334 17.0033C12.6849 17.0033 15.966 14.3193 16.7997 10.6526C16.8505 10.4292 16.7463 10.1994 16.5449 10.0903C16.3434 9.98133 16.0939 10.0198 15.9347 10.1845ZM13.9395 6.95425C13.5673 6.95425 13.2655 6.65246 13.2655 6.28023C13.2655 5.24424 12.4225 4.40114 11.3864 4.40114C11.0142 4.40114 10.7124 4.09935 10.7124 3.72712C10.7124 3.35489 11.0142 3.0531 11.3864 3.0531C12.4225 3.0531 13.2655 2.21001 13.2655 1.17402C13.2655 0.801789 13.5673 0.5 13.9395 0.5C14.3118 0.5 14.6136 0.801789 14.6136 1.17402C14.6136 2.21001 15.4566 3.0531 16.4926 3.0531C16.8649 3.0531 17.1667 3.35489 17.1667 3.72712C17.1667 4.09935 16.8649 4.40114 16.4926 4.40114C15.4566 4.40114 14.6136 5.24424 14.6136 6.28023C14.6136 6.65246 14.3118 6.95425 13.9395 6.95425ZM13.8388 4.4458C13.8737 4.49232 13.9073 4.53985 13.9396 4.58835C13.9718 4.53985 14.0054 4.49232 14.0403 4.4458C14.2158 4.21168 14.4241 4.00342 14.6582 3.82784C14.7047 3.79296 14.7523 3.75937 14.8008 3.72712C14.7523 3.69488 14.7047 3.66129 14.6582 3.62641C14.4241 3.45083 14.2158 3.24257 14.0403 3.00844C14.0054 2.96193 13.9718 2.9144 13.9396 2.8659C13.9073 2.9144 13.8737 2.96193 13.8388 3.00844C13.6633 3.24257 13.455 3.45083 13.2209 3.62641C13.1743 3.66129 13.1268 3.69488 13.0783 3.72712C13.1268 3.75937 13.1743 3.79296 13.2209 3.82784C13.455 4.00342 13.6633 4.21168 13.8388 4.4458ZM13.9395 4.30838C14.1079 4.0909 14.3033 3.89545 14.5208 3.72712C14.3033 3.55879 14.1079 3.36335 13.9395 3.14587C13.7712 3.36335 13.5758 3.55879 13.3583 3.72712C13.5758 3.89545 13.7712 4.0909 13.9395 4.30838ZM6.39311 2.28256C3.72514 3.27002 1.84804 5.83173 1.84804 8.83333C1.84804 12.6849 4.98177 15.8186 8.83333 15.8186C11.3664 15.8186 13.6111 14.4907 14.839 12.4175C13.9335 12.8526 12.9341 13.0817 11.8971 13.0817C8.1466 13.0817 5.09559 10.0307 5.09559 6.28023C5.09559 4.82114 5.5604 3.42821 6.39311 2.28256ZM6.57262 2.04659C3.71717 2.99041 1.68465 5.674 1.68465 8.83333C1.68465 12.7751 4.89154 15.982 8.83334 15.982C11.5124 15.982 13.8775 14.5297 15.1033 12.2833C15.1507 12.1965 15.1964 12.1084 15.2403 12.0192C15.1556 12.0688 15.0698 12.1165 14.9831 12.1621C14.0441 12.6565 12.9925 12.9183 11.8971 12.9183C8.23685 12.9183 5.259 9.94045 5.259 6.28023C5.259 4.7735 5.76676 3.33926 6.67026 2.18659C6.73068 2.10952 6.79286 2.03371 6.85678 1.95922C6.7612 1.98644 6.66646 2.01558 6.57262 2.04659ZM10.3652 10.8158C9.99296 10.8158 9.69118 10.514 9.69118 10.1418C9.69118 9.52815 9.19168 9.02864 8.57802 9.02864C8.20579 9.02864 7.904 8.72686 7.904 8.35463C7.904 7.98239 8.20579 7.68061 8.57802 7.68061C9.19168 7.68061 9.69118 7.1811 9.69118 6.56745C9.69118 6.19522 9.99296 5.89343 10.3652 5.89343C10.7374 5.89343 11.0392 6.19522 11.0392 6.56745C11.0392 7.1811 11.5387 7.68061 12.1524 7.68061C12.5246 7.68061 12.8264 7.98239 12.8264 8.35463C12.8264 8.72686 12.5246 9.02864 12.1524 9.02864C11.5387 9.02864 11.0392 9.52815 11.0392 10.1418C11.0392 10.514 10.7374 10.8158 10.3652 10.8158ZM10.3652 8.69907C10.4 8.65607 10.4363 8.61436 10.474 8.574C10.5096 8.5359 10.5465 8.49902 10.5846 8.4634C10.6249 8.42568 10.6667 8.38939 10.7097 8.35462C10.6667 8.31985 10.6249 8.28357 10.5846 8.24585C10.5465 8.21023 10.5096 8.17335 10.474 8.13525C10.4363 8.09489 10.4 8.05317 10.3652 8.01018C10.3304 8.05317 10.2941 8.09489 10.2564 8.13525C10.2208 8.17335 10.1839 8.21023 10.1458 8.24585C10.1054 8.28357 10.0637 8.31985 10.0207 8.35462C10.0637 8.38939 10.1054 8.42568 10.1458 8.4634C10.1839 8.49902 10.2208 8.5359 10.2564 8.574C10.2941 8.61436 10.3304 8.65607 10.3652 8.69907ZM10.3652 8.45117C10.3965 8.41811 10.4287 8.38592 10.4617 8.35463C10.4287 8.32334 10.3965 8.29114 10.3652 8.25808C10.3339 8.29114 10.3017 8.32333 10.2686 8.35462C10.3017 8.38591 10.3339 8.41811 10.3652 8.45117ZM13.9396 6.79085C13.6576 6.79085 13.4289 6.56221 13.4289 6.28023C13.4289 5.15399 12.5127 4.23774 11.3864 4.23774C11.1045 4.23774 10.8758 4.00911 10.8758 3.72712C10.8758 3.44513 11.1045 3.2165 11.3864 3.2165C12.5127 3.2165 13.4289 2.30025 13.4289 1.17402C13.4289 0.892029 13.6576 0.663396 13.9396 0.663396C14.2215 0.663396 14.4502 0.892029 14.4502 1.17402C14.4502 2.30025 15.3664 3.2165 16.4927 3.2165C16.7746 3.2165 17.0033 3.44513 17.0033 3.72712C17.0033 4.00911 16.7746 4.23774 16.4927 4.23774C15.3664 4.23774 14.4502 5.15399 14.4502 6.28023C14.4502 6.56221 14.2215 6.79085 13.9396 6.79085ZM10.3652 10.6524C10.0832 10.6524 9.85458 10.4238 9.85458 10.1418C9.85458 9.43791 9.28193 8.86524 8.57803 8.86524C8.29604 8.86524 8.06741 8.63661 8.06741 8.35462C8.06741 8.07263 8.29604 7.844 8.57803 7.844C9.28193 7.844 9.85458 7.27134 9.85458 6.56745C9.85458 6.28546 10.0832 6.05683 10.3652 6.05683C10.6472 6.05683 10.8758 6.28546 10.8758 6.56745C10.8758 7.27134 11.4485 7.844 12.1524 7.844C12.4344 7.844 12.663 8.07263 12.663 8.35462C12.663 8.63661 12.4344 8.86524 12.1524 8.86524C11.4485 8.86524 10.8758 9.43791 10.8758 10.1418C10.8758 10.4238 10.6472 10.6524 10.3652 10.6524Z"
                      fill="white"
                      fillRule="evenodd"
                    />
                  </svg>
                </span>
              ),
              label: t('common.Night Audit'),
              onClick: () => {
                navigate('/night-audit');
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
              <span style={{ marginRight: 28, fontSize: 12, cursor: 'pointer' }}>
                {branchFacilities.data.business_date
                  ? moment(branchFacilities.data.business_date).format('DD/MM/YYYY')
                  : t('common.Not yet setting')}
              </span>
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
