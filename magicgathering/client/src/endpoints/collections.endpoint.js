import { sendRequest } from "./index";

const collectionRequests = {
  getAllCollections: () => {
    const collections = sendRequest("/collections").then((data) => {
      return data;
    });
    return collections;
  },
  getAllCollectionsFromUser: () => {
    const collections = sendRequest(`/collections/all`).then((data) => {
      return data;
    });
    return collections;
  },
  deleteCollection: (id) => {
    try {
      const ans = sendRequest(`/collections/delete/${id}`, "DELETE").then(
        (data) => {
          return data;
        }
      );
      return ans;
    } catch (error) {
      return error;
    }
  },
  updateCollection: (id, body) => {
    try {
      const ans = sendRequest(`/collections/update/${id}`, "PUT", body).then(
        (data) => {
          return data;
        }
      );
      return ans;
    } catch (error) {
      return error;
    }
  },
  createCollection: (body) => {
    try {
      const ans = sendRequest(`collections/new`, "POST", body).then((data) => {
        return data;
      });
      return ans;
    } catch (error) {
      return error;
    }
  },
};

export default collectionRequests;
