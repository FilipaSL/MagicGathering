import { sendRequest } from "./index";

const cardsRequest = {
  getUserCards: async (userCollections) => {
    //it can be more than one element
    try {
      //  const userCollection = await sendRequest(`/collections/all/${id}`);
      let allCards = [];
      //it can be an official or not and it will create empty results

      await userCollections.forEach(async (collection) => {
        let respCards = await sendRequest(
          `/cards/collection/${collection._id}`
        ).then( (ans)=>     {   console.log(ans); allCards.push(ans); return ans;}
        )
        console.log(respCards);

      });
      console.log(allCards);

      return allCards;
    } catch (error) {
      console.log(error);
    }
  },

  deleteCard: async (id) => {
    try {
      const ans = await sendRequest(`/cards/delete/${id}`);
      return ans;
    } catch (error) {
      console.log(error);
    }
  },
};

export default cardsRequest;
