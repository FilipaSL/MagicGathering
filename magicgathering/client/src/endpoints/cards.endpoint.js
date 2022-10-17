import { sendRequest } from "./index";

const cardsRequest = {
  getUserCards: async (userCollections) => {
    //it can be more than one element
    try {
      //it can be an official or not and it will create empty results
      return Promise.all(
        userCollections.map((collection) =>
          sendRequest(`/cards/collection/${collection._id}`).then((ans) => {
            return ans;
          })
        )
      ).then((data) => {
        return data.flat();
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteCard: async (id) => {
    try {
      const ans = await sendRequest(`/cards/delete/${id}`, "DELETE");
      return ans;
    } catch (error) {
      console.log(error);
    }
  },
  updateCard: (id, body) => {
    try {
      const ans = sendRequest(`/cards/update/${id}`, "PUT", body);
      return ans;
    } catch (error) {
      console.log(error);
    }
  },
  createCard: (body) => {
    try {
      const ans = sendRequest(`cards/new`, "POST", body);
      return ans;
    } catch (error) {
      console.log(error);
    }
  },
};

export default cardsRequest;
