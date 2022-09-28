import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { AgentInfosGetResult } from 'types';

export const getAgentInfos = createAction(ActionTypes.AGENT_INFOS_GET);

export const getAgentInfosFinish = createAction(
  ActionTypes.AGENT_INFOS_GET_FINISH,
  (payload: AgentInfosGetResult) => actionPayload(payload),
);
