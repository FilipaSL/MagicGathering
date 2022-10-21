import { login } from "./index";

const loginRequest = {
  loginUser: async (body) => {
    const user = await login("/login", "POST", body).then((res) => {
      localStorage.setItem("userInfo", JSON.stringify(res));
      return res;
    });
    return user;
  },
  registerUser: async (body) => {
    try {
      const ans = await login(`/login/register`, "POST", body).then((data) => {
        localStorage.setItem("userInfo", JSON.stringify(data));

        return data;
      });
      return ans;
    } catch (error) {
      return error;
    }
  },
};

export default loginRequest;
