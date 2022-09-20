const baseUrl = process.env.REACT_APP_SERVER_URL;

const get = async endpoint => {
  const url = baseUrl + endpoint;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${res.status.toString()} Error 인한 요청 실패!`);
  }
  const result = await res.json();

  return result;
};

export { get };
