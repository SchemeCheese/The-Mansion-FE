import { Input } from 'antd';
import React from 'react'
import { InputProps } from 'antd/lib/input/Input';
import styled from 'styled-components';

const MInput: React.FunctionComponent<InputProps> = styled(Input)`
    border-radius: 4px;
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.15);
`;

export default MInput;
