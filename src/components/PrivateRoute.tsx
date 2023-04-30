import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import MLayout from './MLayout';

interface Props {
  breadCrumb?: any;
  children: React.ReactElement;
  isAuthenticated: boolean;
  isGuestScreen?: boolean;
  to?: string;
}

export default function PrivateRoute(props: Props): JSX.Element {
  const { breadCrumb, children, isAuthenticated, isGuestScreen, to = '/login' } = props;
  const { pathname } = useLocation();

  if (isAuthenticated) {
    if (isGuestScreen) {
      return children;
    }

    return <MLayout breadCrumb={breadCrumb}>{children}</MLayout>;
  }

  return <Navigate state={{ redirect: pathname, isAuthenticated }} to={to} />;
}
