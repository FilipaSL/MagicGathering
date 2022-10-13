const mongoURL = process.env.MONGO_SERVER;

module.exports = {
  sendRequest: async (url, method, body) => {
    return await fetch(url, {
      method: method,
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((col) => {
        console.log(col);
        return col;
      })
      .catch((error) => {
        return error;
      });
  },
};
