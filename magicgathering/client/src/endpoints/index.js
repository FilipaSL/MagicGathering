module.exports = {
  login: async (url, method, body) => {
    return await fetch(url, {
      method: method,
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
  },
  sendRequest: async (url, method, body) => {
    const userLog = localStorage.getItem("userInfo");
    return await fetch(url, {
      method: method,
      body: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLog.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
  },
};
