import { sendRequest } from "./index";

const collectionRequests = {

  getAllCollections: () => {
    const collections = sendRequest("/collections")
    .then((data) => {
      return data;
    });
    return collections;
  },
  getAllCollectionsFromUser: (id) => {
    const collections = sendRequest(`/collections/all/${id}`)
    .then((data) => {
      return data;
    });
    return collections;
  },
};

export default collectionRequests;
