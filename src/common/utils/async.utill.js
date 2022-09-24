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

const handleAsyncAccountsState = (state, { type, payload }) => {
  const { data, loading, error } = reducerUtils[type](payload);
  state.data = data;
  state.loading = loading;
  state.error = error;
};

export const createExtraReducers = fetchAccounts => builder => {
  builder.addCase(fetchAccounts.pending, state => {
    handleAsyncAccountsState(state, { type: 'loading' });
  });
  builder.addCase(fetchAccounts.fulfilled, (state, { payload }) => {
    handleAsyncAccountsState(state, { type: 'success', payload });
  });
  builder.addCase(fetchAccounts.rejected, (state, { payload }) => {
    handleAsyncAccountsState(state, { type: 'error', payload });
  });
};

export const UsersReducerUtils = {
  initial: (data = null, total = null) => ({
    loading: false,
    data,
    total,
    error: null,
  }),
  loading: (preveState = null) => ({
    data: preveState,
    total: preveState,
    loading: true,
    error: null,
  }),
  success: (data, total) => ({
    data,
    total,
    loading: false,
    error: null,
  }),
  error: error => ({
    data: null,
    total: null,
    loading: false,
    error,
  }),
};

const handleAsyncUsersState = (state, { type, payload }) => {
  const { data, total, loading, error } = UsersReducerUtils[type](payload);
  state.data = data;
  state.total = total;
  state.loading = loading;
  state.error = error;
};

export const createExtraUsersReducers = fetchAccounts => builder => {
  builder.addCase(fetchAccounts.pending, state => {
    handleAsyncUsersState(state, { type: 'loading' });
  });
  builder.addCase(fetchAccounts.fulfilled, (state, { payload }) => {
    handleAsyncUsersState(state, { type: 'success', payload });
  });
  builder.addCase(fetchAccounts.rejected, (state, { payload }) => {
    handleAsyncUsersState(state, { type: 'error', payload });
  });
};
