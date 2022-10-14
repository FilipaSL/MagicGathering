import { sendRequest } from "./index";

const cardsRequest = {
  getUserCards: async (id) => {
    //it can be more than one element
    const userCollection = await sendRequest(`/collections/all/${id}`);

    let allCards = await sendRequest("/cards");

    //it can be an official or not and it will create empty results
    if (userCollection) {
      let userCards = userCollection.map((userCol) => {
        if (allCards) {
          return allCards.filter((elem) => {
            return elem.collectionId == userCol.id;
          });
        }
      });

      if (userCards) {
        //clean empty results
        let desiredCards = userCards.filter((entry) => entry.length > 0);
        return desiredCards;
      }
    }

    res.status(404).send("User does not have cards");
  },

  deleteCard: async (id) => {
    try {
      const ans = await sendRequest(`/cards/delete/${id}`);
      console.log(ans);
    } catch {
      (error) => console.log(error);
    }
  },
};

export default cardsRequest;
