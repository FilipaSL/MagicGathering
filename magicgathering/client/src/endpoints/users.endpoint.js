import { sendRequest, login } from "./index";

const userRequests = {
  loginUser: (body) => {
    const user = login("/users/login", "POST", body).then((res) => {
      localStorage.setItem("userInfo", JSON.stringify(res));
      console.log(res);
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
