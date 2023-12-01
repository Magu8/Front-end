export const faveOrRemove = async (url, token) => {
  try {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let response = await fetch(url, token);
    let data = await response.json();
    return data;
  } catch (e) {
    return new Error(e);
  }
};
