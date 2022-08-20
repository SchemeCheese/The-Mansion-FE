import { Button } from 'antd';
import React from 'react'
import { ButtonProps } from 'antd/lib/button/button';
import styled from 'styled-components';

const MButton: React.FunctionComponent<ButtonProps> = styled(Button)`
    border-radius: 4px;
`;

export default MButton;
