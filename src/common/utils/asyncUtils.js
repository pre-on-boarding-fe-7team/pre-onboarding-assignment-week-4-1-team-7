export const reducerUtils = {
  initial: (data = null, total = null, user = null) => ({
    loading: false,
    data,
    user,
    total,
    error: null,
  }),
  loading: (preveState = null) => ({
    data: preveState,
    total: preveState,
    user: preveState,
    loading: true,
    error: null,
  }),
  success: (data, total, user) => ({
    data,
    total,
    user,
    loading: false,
    error: null,
  }),
  error: error => ({
    data: null,
    total: null,
    user: null,
    loading: false,
    error,
  }),
};
