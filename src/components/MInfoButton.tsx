import React from 'react';
import { Button } from 'ui/antd';
import { ButtonProps } from 'antd/lib/button/button';
import styled from 'styled-components';

import { colors } from 'modules/theme';

const MInfoButton: React.FunctionComponent<ButtonProps> = styled(Button)`
  border-color: ${colors.pattron};
  border-radius: 4px;

  &:hover,
  &:focus {
    border-color: ${colors.pattron};
    color: ${colors.pattron};
  }
`;

export default MInfoButton;
