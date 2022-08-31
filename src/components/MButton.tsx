import React from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button/button';
import styled from 'styled-components';

const MButton: React.FunctionComponent<ButtonProps> = styled(Button)`
  border-radius: 4px;
`;

export default MButton;
