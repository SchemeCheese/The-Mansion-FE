import React from 'react';
import { Button } from 'ui/antd';
import { ButtonProps } from 'antd/lib/button/button';
import styled from 'styled-components';

const MButton: React.FunctionComponent<ButtonProps> = styled(Button)`
  border-radius: 4px;

  &:hover,
  &:focus {
    border-color: #1d39c4;
    color: #1d39c4;
  }
`;

export default MButton;
