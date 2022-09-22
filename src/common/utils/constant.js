export const ROUTE = {
  MAIN: '/',
  USER: '/user',
  NOT_FOUND: '*',
};

export const API_STATUS = {
  LOADING: 'Loading',
  SUCCESS: 'Success',
  FAILED: 'Failed',
  SERACH_LOADING: 'SearchLoading',
};

export const FILTERING_TYPE = {
  NONE: '필터링 없음',
  ACTIVE: '활성화',
  NONE_ACTIVE: '비활성화',
  STAFF: '임직원 계좌',
  NONE_STAFF: '비임직원 계좌',
  // SEARCH_RESULT: '검색 결과',
};

export const ACTIVE_TYPE = {
  ACTIVE: FILTERING_TYPE.ACTIVE,
  NONE_ACTIVE: FILTERING_TYPE.NONE_ACTIVE,
  STAFF: FILTERING_TYPE.STAFF,
  NONE_STAFF: FILTERING_TYPE.NONE_STAFF,
  ALLOW_MARKETING_PUSH: '동의',
  NONE_ALLOW_MARKETING_PUSH: '미동의',
};
