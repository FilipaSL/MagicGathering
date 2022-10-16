import { sendRequest, login } from "./index";

const userRequests = {
  loginUser: async (body) => {
    const user = await login("/users/login", "POST", body)
    .then((res) => {
      localStorage.setItem("userInfo", JSON.stringify(res));
      return res;
    });
    return user;
  },
  getAllUsers: () => {
    const users = sendRequest("/users").then((data) => {
      return data;
    });
    return users;
  },
};

export default userRequests;
