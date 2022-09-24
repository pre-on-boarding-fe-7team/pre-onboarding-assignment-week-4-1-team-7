export const reducerUtils = {
  initial: (data = null) => ({
    loading: false,
    data,
    error: null,
  }),
  loading: (preveState = null) => ({
    data: preveState,
    loading: true,
    error: null,
  }),
  success: data => ({
    data,
    loading: false,
    error: null,
  }),
  error: error => ({
    data: null,
    loading: false,
    error,
  }),
};

const handleAsyncState = (state, { type, payload }) => {
  const { data, loading, error } = reducerUtils[type](payload);
  state.data = data;
  state.loading = loading;
  state.error = error;
};

export const createExtraReducers = fetchAccounts => builder => {
  builder.addCase(fetchAccounts.pending, state => {
    handleAsyncState(state, { type: 'loading' });
  });
  builder.addCase(fetchAccounts.fulfilled, (state, { payload }) => {
    handleAsyncState(state, { type: 'success', payload });
  });
  builder.addCase(fetchAccounts.rejected, (state, { payload }) => {
    handleAsyncState(state, { type: 'error', payload });
  });
};
