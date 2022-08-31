import React from 'react';
import { ButtonProps } from 'antd/lib/button/button';
import styled from 'styled-components';

import MButton from './MButton';

const PattonButton: React.FunctionComponent<ButtonProps> = styled(MButton)`
  background-color: #1d39c4;
  color: #fff;

  &:hover {
    background-color: #1d39c4;
    color: #fff;
  }
`;

export default PattonButton;
