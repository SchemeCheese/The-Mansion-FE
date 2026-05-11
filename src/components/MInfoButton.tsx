import React from 'react';
import type { ButtonProps } from 'ui/antd';
import { Button } from 'ui/antd';
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
