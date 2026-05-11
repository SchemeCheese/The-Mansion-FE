import React from 'react';
import type { ButtonProps } from 'ui/antd';
import styled from 'styled-components';

import MButton from './MButton';

const PattonButton: React.FunctionComponent<ButtonProps> = styled(MButton)`
  background-color: #1d39c4;
  color: #fff;

  &:hover,
  &:focus {
    background-color: #1d39c4;
    color: #fff;
  }
`;

export default PattonButton;
