const url = 'https://randomuser.me/api/?results=15';

const headerDefault = Bearer => ({
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const getUserList = async () => {
  try {
    const response = await fetch(url, headerDefault());
    const payload = await response.json();
    return {
      result: payload.results,
      info: payload.info,
      isFetch: true,
    }
  } catch (error) {
    return {
      result: error,
      isFetch: false
    }
  }
};