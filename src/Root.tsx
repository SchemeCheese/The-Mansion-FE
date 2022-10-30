import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create from 'pages/reservation/create';
import ReservationDetail from 'pages/reservation/detail';
import Reservation from 'pages/reservation/list';
import { selectUser } from 'selectors';
import styled, { ThemeProvider } from 'styled-components';
import useTreeChanges from 'tree-changes-hook';

import { useAppSelector } from 'modules/hooks';
import theme from 'modules/theme';

import { showAlert } from 'actions';

// import Footer from 'components/Footer';
// import Header from 'components/Header';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import SystemAlerts from 'containers/SystemAlerts';
// import Home from 'routes/Home';
import Login from 'routes/Login';
import NotFound from 'routes/NotFound';
import Private from 'routes/Private';

import { UserState } from 'types';

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
  const user = useAppSelector(selectUser);
  const { changed } = useTreeChanges(user);

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

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppWrapper data-testid="app">
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
          {/* {isAuthenticated && <Header />} */}
          <Main isAuthenticated={isAuthenticated}>
            <Routes>
              <Route
                element={
                  <PublicRoute isAuthenticated={isAuthenticated} to="/reservation">
                    <Login />
                  </PublicRoute>
                }
                path="/"
              />
              <Route
                element={
                  <PublicRoute isAuthenticated={isAuthenticated} to="/reservation">
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
              <Route
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated} to="/">
                    <Reservation />
                  </PrivateRoute>
                }
                path="/reservation"
              />
              <Route
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated} to="/">
                    <ReservationDetail />
                  </PrivateRoute>
                }
                path="/reservation/:id"
              />
              <Route
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated} to="/">
                    <Create />
                  </PrivateRoute>
                }
                path="/reservation/create"
              />
              <Route element={<NotFound />} path="*" />
            </Routes>
          </Main>
          {/* <Footer /> */}
          <SystemAlerts />
        </AppWrapper>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default Root;
