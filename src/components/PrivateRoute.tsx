import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import MLayout from './MLayout';

interface Props {
  breadCrumb?: any;
  children: React.ReactElement;
  isAuthenticated: boolean;
  to?: string;
}

export default function PrivateRoute(props: Props): JSX.Element {
  const { breadCrumb, children, isAuthenticated, to = '/login' } = props;
  const { pathname } = useLocation();

  return isAuthenticated ? (
    <MLayout breadCrumb={breadCrumb}>{children}</MLayout>
  ) : (
    <Navigate state={{ redirect: pathname, isAuthenticated }} to={to} />
  );
}
