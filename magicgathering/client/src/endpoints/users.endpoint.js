import { sendRequest, login } from "./index";

const userRequests = {
  loginUser: async (body) => {
    const user = await login("/users/login", "POST", body).then((res) => {
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
  deleteUser: (id) => {
    const status = sendRequest(`/users/delete/${id}`, "DELETE").then((data) => {
      return data;
    });
    return status;
  },
  updateUser: (id, body) => {
    try {
      const ans = sendRequest(`/users/update/${id}`, "PUT", body).then(
        (data) => {
          return data;
        }
      );
      return ans;
    } catch (error) {
      return error;
    }
  },
  createUser: (body) => {
    try {
      const ans = sendRequest(`users/new`, "POST", body).then((data) => {
        return data;
      });
      return ans;
    } catch (error) {
      return error;
    }
  },
};

export default userRequests;
