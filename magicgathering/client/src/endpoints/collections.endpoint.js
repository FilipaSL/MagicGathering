import { sendRequest } from "./index";

const collectionRequests = {
  getAllCollections: () => {
    const collections = sendRequest("/collections").then((data) => {
      return data;
    });
    return collections;
  },
  getAllCollectionsFromUser: (id) => {
    const collections = sendRequest(`/collections/all/${id}`).then((data) => {
      return data;
    });
    return collections;
  },
  deleteCollection: (id) => {
    try {
      const ans = sendRequest(`/collections/delete/${id}`, "DELETE");
      return ans;
    } catch (error) {
      console.log(error);
    }
  },
  updateCollection: (id, body) => {
    try {
      const ans = sendRequest(`/collections/update/${id}`, "PUT", body);
      return ans;
    } catch (error) {
      console.log(error);
    }
  },
  createCollection: (body) => {
    try {
      const ans = sendRequest(`collections/new`, "POST", body);
      return ans;
    } catch (error) {
      console.log(error);
    }
  },
};

export default collectionRequests;
