import { useState, useCallback } from 'react';

function useInputs(initialValue = null) {
  const [values, setValues] = useState(initialValue);
  console.info(values);

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setValues(values => ({ ...values, [name]: value }));
  }, []);

  return [values, onChange, setValues];
}

export default useInputs;
