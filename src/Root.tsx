import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Branch from 'pages/branch-manager';
import CustomerDetail from 'pages/customer/detail';
import Customer from 'pages/customer/list';
import Dashboard from 'pages/dashboard';
import DeviceManager from 'pages/device-manager';
import DeviceManagerCreate from 'pages/device-manager/DeviceManagerCreate';
import ReservationCheckinTodayDetail from 'pages/front-desk/detail/checkin_today';
import ReservationCheckoutTodayDetail from 'pages/front-desk/detail/checkout_today';
import ReservationInhouseTodayDetail from 'pages/front-desk/detail/inhouse_today';
import FrontDesk from 'pages/front-desk/list';
import Guest from 'pages/guest';
import GuestCheckin from 'pages/guest/checkin';
import GuestCheckinBookerInfo from 'pages/guest/checkin/BookerInfo';
import ConfirmReservation from 'pages/guest/checkin/ConfirmReservation';
import FinishCheckin from 'pages/guest/checkin/FinishCheckin';
import Payment from 'pages/guest/checkin/Payment';
import GuestCheckinPersonalId from 'pages/guest/checkin/PersonalId';
import GuestCheckinSelectRoom from 'pages/guest/checkin/SelectRoom';
import GuestCustomerInfo from 'pages/guest/GuestCustomerInfo';
import GuestPayment from 'pages/guest/GuestPayment';
import GuestRoomNumber from 'pages/guest/GuestRoomNumber';
import GuestThank from 'pages/guest/GuestThank';
import HouseKeeping from 'pages/house-keeping';
import NightAudit from 'pages/night_audit';
import StatusPayment from 'pages/payment/StatusPayment';
import Report from 'pages/report/list';
import Create from 'pages/reservation/create';
import ReservationDetail from 'pages/reservation/detail';
import Reservation from 'pages/reservation/list';
import { selectBranchInfo, selectUser } from 'selectors';
import styled, { ThemeProvider } from 'styled-components';
import useTreeChanges from 'tree-changes-hook';

import { useAppSelector } from 'modules/hooks';
import theme from 'modules/theme';

import { showAlert } from 'actions';

import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import SystemAlerts from 'containers/SystemAlerts';
import Login from 'routes/Login';
import NotFound from 'routes/NotFound';
import Private from 'routes/Private';

import { BranchInfoState, UserState } from 'types';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  opacity: 1 !important;
  position: relative;
  transition: opacity 0.5s;
`;

const Main = styled.main<Pick<UserState, 'isAuthenticated'>>`
  padding: 0;
`;

function Root() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const branchInfoSelected: BranchInfoState = useAppSelector(selectBranchInfo);
  const { changed } = useTreeChanges(user);
  const navigate = useNavigate();

  const { isAuthenticated, username } = user;

  useEffect(() => {
    if (changed('isAuthenticated', true)) {
      dispatch(
        showAlert(`Hello! And welcome ${username}!`, {
          variant: 'success',
          icon: 'bell',
          timeout: 10,
        }),
      );
    }
  }, [dispatch, changed]);

  const reservationBreadCrum = (
    <>
      <span className="ant-breadcrumb-link" style={{ paddingRight: 8, color: 'rgba(0,0,0,.45)' }}>
        {branchInfoSelected.abbreviation}
      </span>
      /
      <span
        aria-hidden="true"
        className="ant-breadcrumb-link"
        onClick={() => {
          navigate('/reservation');
        }}
        style={{ paddingLeft: 8, cursor: 'pointer' }}
      >
        {t('common.Reservation')}
      </span>
    </>
  );

  const frontDeskBreadCrum = (
    <>
      <span className="ant-breadcrumb-link" style={{ paddingRight: 8, color: 'rgba(0,0,0,.45)' }}>
        {branchInfoSelected.abbreviation}
      </span>
      /
      <span
        aria-hidden="true"
        className="ant-breadcrumb-link"
        onClick={() => {
          navigate('/front-desk');
        }}
        style={{ paddingLeft: 8, cursor: 'pointer' }}
      >
        {t('frontDesk.Front Desk')}
      </span>
    </>
  );

  const dashboardBreadCrum = (
    <>
      <span className="ant-breadcrumb-link" style={{ paddingRight: 8, color: 'rgba(0,0,0,.45)' }}>
        {branchInfoSelected.abbreviation}
      </span>
      /
      <span
        aria-hidden="true"
        className="ant-breadcrumb-link"
        onClick={() => {
          navigate('/front-desk');
        }}
        style={{ paddingLeft: 8, cursor: 'pointer' }}
      >
        {t('common.Dashboard')}
      </span>
    </>
  );

  const deviceBreadCrum = (
    <>
      <span className="ant-breadcrumb-link" style={{ paddingRight: 8, color: 'rgba(0,0,0,.45)' }}>
        {branchInfoSelected.abbreviation}
      </span>
      /
      <span
        aria-hidden="true"
        className="ant-breadcrumb-link"
        onClick={() => {
          navigate('/front-desk');
        }}
        style={{ paddingLeft: 8, cursor: 'pointer' }}
      >
        {t('common.Device Manager')}
      </span>
    </>
  );

  const branchManagerBreadCrum = (
    <>
      <span className="ant-breadcrumb-link" style={{ paddingRight: 8, color: 'rgba(0,0,0,.45)' }}>
        {branchInfoSelected.abbreviation}
      </span>
      /
      <span
        aria-hidden="true"
        className="ant-breadcrumb-link"
        onClick={() => {
          navigate('/power-monitoring/branch-manager');
        }}
        style={{ paddingLeft: 8, cursor: 'pointer' }}
      >
        {t('branchManager.title')}
      </span>
    </>
  );

  const nightAuditBreadCrum = (
    <>
      <span className="ant-breadcrumb-link" style={{ paddingRight: 8, color: 'rgba(0,0,0,.45)' }}>
        {branchInfoSelected.abbreviation}
      </span>
      /
      <span
        aria-hidden="true"
        className="ant-breadcrumb-link"
        onClick={() => {
          navigate('/night-audit');
        }}
        style={{ paddingLeft: 8, cursor: 'pointer' }}
      >
        {t('common.Night Audit')}
      </span>
    </>
  );
  const houseKeepingBreadCrum = (
    <>
      <span className="ant-breadcrumb-link" style={{ paddingRight: 8, color: 'rgba(0,0,0,.45)' }}>
        {branchInfoSelected.abbreviation}
      </span>
      /
      <span
        aria-hidden="true"
        className="ant-breadcrumb-link"
        onClick={() => {
          navigate('/house-keeping');
        }}
        style={{ paddingLeft: 8, cursor: 'pointer' }}
      >
        {t('common.House Keeping')}
      </span>
    </>
  );

  const customerBreadCrum = (
    <>
      <span className="ant-breadcrumb-link" style={{ paddingRight: 8, color: 'rgba(0,0,0,.45)' }}>
        {branchInfoSelected.abbreviation}
      </span>
      /
      <span
        aria-hidden="true"
        className="ant-breadcrumb-link"
        onClick={() => {
          navigate('/customer');
        }}
        style={{ paddingLeft: 8, cursor: 'pointer' }}
      >
        {t('common.Customer')}
      </span>
    </>
  );

  const reportBreadCrum = (
    <>
      <span className="ant-breadcrumb-link" style={{ paddingRight: 8, color: 'rgba(0,0,0,.45)' }}>
        {branchInfoSelected.abbreviation}
      </span>
      /
      <span
        aria-hidden="true"
        className="ant-breadcrumb-link"
        onClick={() => {
          navigate('/report');
        }}
        style={{ paddingLeft: 8, cursor: 'pointer' }}
      >
        {t('report.Reports')}
      </span>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <AppWrapper className="custom-wrapper" data-testid="app">
        <Helmet
          defer={false}
          encodeSpecialCharacters
          htmlAttributes={{ lang: 'pt-br' }}
          titleAttributes={{ itemprop: 'name', lang: 'pt-br' }}
          titleTemplate={`%s | ${username}`}
        >
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <Main isAuthenticated={isAuthenticated}>
          <Routes>
            <Route
              element={
                <PublicRoute
                  isAuthenticated={isAuthenticated}
                  to={user.permission.dashboard?.view === true ? '/dashboard' : '/reservation'}
                >
                  <Login />
                </PublicRoute>
              }
              path="/"
            />
            <Route
              element={
                <PublicRoute isAuthenticated={isAuthenticated} to="/dashboard">
                  <Login />
                </PublicRoute>
              }
              path="/login"
            />
            <Route
              element={
                <PrivateRoute isAuthenticated={isAuthenticated} to="/">
                  <Private />
                </PrivateRoute>
              }
              path="/private"
            />
            {(user.permission.reservation?.view === true ||
              user.permission.calendar?.view === true) && (
              <>
                <Route
                  element={
                    <PrivateRoute
                      breadCrumb={reservationBreadCrum}
                      isAuthenticated={isAuthenticated}
                      to="/"
                    >
                      <Reservation />
                    </PrivateRoute>
                  }
                  path="/reservation"
                />
                <Route
                  element={
                    <PrivateRoute
                      breadCrumb={reservationBreadCrum}
                      isAuthenticated={isAuthenticated}
                      to="/"
                    >
                      <ReservationDetail />
                    </PrivateRoute>
                  }
                  path="/reservation/:id"
                />
              </>
            )}
            {user.permission.reservation?.create === true && (
              <Route
                element={
                  <PrivateRoute
                    breadCrumb={reservationBreadCrum}
                    isAuthenticated={isAuthenticated}
                    to="/"
                  >
                    <Create />
                  </PrivateRoute>
                }
                path="/reservation/create"
              />
            )}
            <Route
              element={
                <PrivateRoute
                  breadCrumb={reservationBreadCrum}
                  isAuthenticated={isAuthenticated}
                  to="/"
                >
                  <StatusPayment />
                </PrivateRoute>
              }
              path="/status-payment/:type"
            />
            {user.permission.nightAudit?.view === true && (
              <Route
                element={
                  <PrivateRoute
                    breadCrumb={nightAuditBreadCrum}
                    isAuthenticated={isAuthenticated}
                    to="/"
                  >
                    <NightAudit />
                  </PrivateRoute>
                }
                path="night-audit"
              />
            )}
            {user.permission.houseKeeping?.view === true && (
              <Route
                element={
                  <PrivateRoute
                    breadCrumb={houseKeepingBreadCrum}
                    isAuthenticated={isAuthenticated}
                    to="/"
                  >
                    <HouseKeeping />
                  </PrivateRoute>
                }
                path="house-keeping"
              />
            )}
            {user.permission.frontDeskWalkin?.view === true && (
              <Route
                element={
                  <PrivateRoute
                    breadCrumb={houseKeepingBreadCrum}
                    isAuthenticated={isAuthenticated}
                    to="/"
                  >
                    <HouseKeeping />
                  </PrivateRoute>
                }
                path="house-keeping"
              />
            )}
            {user.permission.frontDeskCheckin?.view === true && (
              <>
                <Route
                  element={
                    <PrivateRoute
                      breadCrumb={frontDeskBreadCrum}
                      isAuthenticated={isAuthenticated}
                      to="/"
                    >
                      <FrontDesk />
                    </PrivateRoute>
                  }
                  path="/front-desk"
                />
                <Route
                  element={
                    <PrivateRoute
                      breadCrumb={frontDeskBreadCrum}
                      isAuthenticated={isAuthenticated}
                      to="/"
                    >
                      <ReservationCheckinTodayDetail />
                    </PrivateRoute>
                  }
                  path="/front-desk/checkin-today/:id"
                />
                <Route
                  element={
                    <PrivateRoute
                      breadCrumb={frontDeskBreadCrum}
                      isAuthenticated={isAuthenticated}
                      to="/"
                    >
                      <ReservationInhouseTodayDetail />
                    </PrivateRoute>
                  }
                  path="/front-desk/inhouse-today/:id/detail/:reservationDetailId"
                />
                <Route
                  element={
                    <PrivateRoute
                      breadCrumb={frontDeskBreadCrum}
                      isAuthenticated={isAuthenticated}
                      to="/"
                    >
                      <ReservationCheckoutTodayDetail />
                    </PrivateRoute>
                  }
                  path="/front-desk/checkout-today/:id/detail/:reservationDetailId"
                />
              </>
            )}
            {user.permission.dashboard?.view === true && (
              <>
                <Route
                  element={
                    <PrivateRoute
                      breadCrumb={dashboardBreadCrum}
                      isAuthenticated={isAuthenticated}
                      to="/"
                    >
                      <Dashboard />
                    </PrivateRoute>
                  }
                  path="/dashboard"
                />
                <Route
                  element={
                    <PrivateRoute
                      breadCrumb={branchManagerBreadCrum}
                      isAuthenticated={isAuthenticated}
                      to="/"
                    >
                      <Branch />
                    </PrivateRoute>
                  }
                  path="/power-monitoring/branch-manager"
                />
                <Route
                  element={
                    <PrivateRoute
                      breadCrumb={deviceBreadCrum}
                      isAuthenticated={isAuthenticated}
                      to="/"
                    >
                      <DeviceManager />
                    </PrivateRoute>
                  }
                  path="/power-monitoring/device"
                />
              </>
            )}
            <Route
              element={
                <PrivateRoute
                  breadCrumb={frontDeskBreadCrum}
                  isAuthenticated={isAuthenticated}
                  to="/"
                >
                  <DeviceManagerCreate />
                </PrivateRoute>
              }
              path="/power-monitoring/device/create"
            />

            {user.permission.customer?.view === true && (
              <>
                <Route
                  element={
                    <PrivateRoute
                      breadCrumb={customerBreadCrum}
                      isAuthenticated={isAuthenticated}
                      to="/"
                    >
                      <Customer />
                    </PrivateRoute>
                  }
                  path="/customer"
                />
                <Route
                  element={
                    <PrivateRoute
                      breadCrumb={customerBreadCrum}
                      isAuthenticated={isAuthenticated}
                      to="/"
                    >
                      <CustomerDetail />
                    </PrivateRoute>
                  }
                  path="/customer/:id"
                />
              </>
            )}
            <Route
              element={
                <PrivateRoute
                  breadCrumb={dashboardBreadCrum}
                  isAuthenticated={isAuthenticated}
                  isGuestScreen
                  to="/"
                >
                  <Guest />
                </PrivateRoute>
              }
              path="/guest"
            />
            <Route
              element={
                <PrivateRoute
                  breadCrumb={frontDeskBreadCrum}
                  isAuthenticated={isAuthenticated}
                  isGuestScreen
                  to="/"
                >
                  <GuestCheckin />
                </PrivateRoute>
              }
              path="/guest/checkin"
            />
            <Route
              element={
                <PrivateRoute
                  breadCrumb={frontDeskBreadCrum}
                  isAuthenticated={isAuthenticated}
                  isGuestScreen
                  to="/"
                >
                  <GuestCheckinSelectRoom />
                </PrivateRoute>
              }
              path="/guest/checkin/select-room"
            />
            <Route
              element={
                <PrivateRoute
                  breadCrumb={frontDeskBreadCrum}
                  isAuthenticated={isAuthenticated}
                  isGuestScreen
                  to="/"
                >
                  <GuestCheckinPersonalId />
                </PrivateRoute>
              }
              path="/guest/checkin/upload-personal-id"
            />
            <Route
              element={
                <PrivateRoute
                  breadCrumb={frontDeskBreadCrum}
                  isAuthenticated={isAuthenticated}
                  isGuestScreen
                  to="/"
                >
                  <GuestCheckinBookerInfo />
                </PrivateRoute>
              }
              path="/guest/checkin/booker-info"
            />
            <Route
              element={
                <PrivateRoute
                  breadCrumb={frontDeskBreadCrum}
                  isAuthenticated={isAuthenticated}
                  isGuestScreen
                  to="/"
                >
                  <ConfirmReservation />
                </PrivateRoute>
              }
              path="/guest/checkin/confirm"
            />
            <Route
              element={
                <PrivateRoute
                  breadCrumb={frontDeskBreadCrum}
                  isAuthenticated={isAuthenticated}
                  isGuestScreen
                  to="/"
                >
                  <FinishCheckin />
                </PrivateRoute>
              }
              path="/guest/checkin/finish"
            />
            <Route
              element={
                <PrivateRoute
                  breadCrumb={frontDeskBreadCrum}
                  isAuthenticated={isAuthenticated}
                  isGuestScreen
                  to="/"
                >
                  <Payment />
                </PrivateRoute>
              }
              path="/guest/checkin/payment"
            />
            <Route
              element={
                <PrivateRoute
                  breadCrumb={dashboardBreadCrum}
                  isAuthenticated={isAuthenticated}
                  isGuestScreen
                  to="/"
                >
                  <GuestPayment />
                </PrivateRoute>
              }
              path="/guest-payment"
            />
            <Route
              element={
                <PrivateRoute
                  breadCrumb={dashboardBreadCrum}
                  isAuthenticated={isAuthenticated}
                  isGuestScreen
                  to="/"
                >
                  <GuestCustomerInfo />
                </PrivateRoute>
              }
              path="/guest-customer-info"
            />
            <Route
              element={
                <PrivateRoute
                  breadCrumb={dashboardBreadCrum}
                  isAuthenticated={isAuthenticated}
                  isGuestScreen
                  to="/"
                >
                  <GuestRoomNumber />
                </PrivateRoute>
              }
              path="/guest-room-number"
            />
            <Route
              element={
                <PrivateRoute
                  breadCrumb={dashboardBreadCrum}
                  isAuthenticated={isAuthenticated}
                  isGuestScreen
                  to="/"
                >
                  <GuestThank />
                </PrivateRoute>
              }
              path="/guest-thank/:type"
            />
            <Route
              element={
                <PrivateRoute breadCrumb={reportBreadCrum} isAuthenticated={isAuthenticated} to="/">
                  <Report />
                </PrivateRoute>
              }
              path="/report"
            />
            <Route element={<NotFound />} path="*" />
          </Routes>
        </Main>
        <SystemAlerts />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default Root;
