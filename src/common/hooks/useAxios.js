import { useState, useEffect, useCallback } from 'react';
import { reducerUtils } from '../utils/async.utill';

export default function useAxios(api) {
  const [apiState, setApiState] = useState(reducerUtils.initial());

  const sendQuery = useCallback(async () => {
    setApiState(reducerUtils.loading());

    try {
      const data = await api();
      setApiState(reducerUtils.success(data));
    } catch (e) {
      setApiState(reducerUtils.error(e));
    }
  }, [api]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery]);

  return { ...apiState };
}
