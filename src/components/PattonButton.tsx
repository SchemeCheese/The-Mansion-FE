import React from 'react'
import { ButtonProps } from 'antd/lib/button/button';
import styled from 'styled-components';
import MButton from './MButton';

const PattonButton: React.FunctionComponent<ButtonProps> = styled(MButton)`
    background-color: #1D39C4;
    color: #FFFFFF;
    &:hover {
        background-color: #1D39C4;
        color: #FFFFFF;
    }
`;

export default PattonButton;
