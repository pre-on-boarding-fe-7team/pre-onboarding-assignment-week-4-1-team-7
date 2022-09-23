export const reducerUtils = {
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
