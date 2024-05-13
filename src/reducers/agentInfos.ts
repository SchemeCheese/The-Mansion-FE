import { createReducer } from '@reduxjs/toolkit';

import { getAgentInfos, getAgentInfosFinish } from 'actions';

import { AgentInfosState } from 'types';

export const agentInfosState = {
  is_searching: true,
  total: 0,
  data: [],
  cached: true,
  updatedAt: 0,
};

export default {
  agentInfos: createReducer<AgentInfosState>(agentInfosState, builder => {
    builder
      .addCase(getAgentInfos, draft => {
        draft.is_searching = true;
      })
      .addCase(getAgentInfosFinish, (draft, { payload }) => {
        draft.is_searching = false;
        draft.data = payload.data;
        draft.total = payload.total;
        draft.updatedAt = payload.updatedAt;
      });
  }),
};
