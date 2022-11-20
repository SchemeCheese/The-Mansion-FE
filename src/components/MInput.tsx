import React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input/Input';
import styled from 'styled-components';

const MInput: React.FunctionComponent<InputProps> = styled(Input)`
  background: #fff;
  border: 1px solid rgb(0 0 0 15%);
  border-radius: 4px;

  &:hover,
  &:focus {
    border-color: #1d39c4;
  }
`;

export default MInput;
