import { createSlice, PayloadAction } from 'redux-starter-kit';

export type ApiErrorAction = {
  error: string;
};

type MetricsState = {
  options: string[];
  selected: string[];
};

const initialState: MetricsState = {
  options: [],
  selected: [],
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricsDataReceived: (state, action: PayloadAction<string[]>) => {
      state.options = action.payload;
    },
    metricsApiErrorReceived: (state, _: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
