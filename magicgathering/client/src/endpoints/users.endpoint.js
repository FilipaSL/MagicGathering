import { sendRequest } from "./index";

const userRequests = {
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
      const ans = sendRequest(`/users/update/${id}`, "PATCH", body).then(
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
