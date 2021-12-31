import { v4 as uuidv4 } from 'uuid';

const defaultSubCardState = {
//   id: "23dfd234",
  title: "Drink a glass of water",
  cover: {
    image:
      "https://cdn.pixabay.com/photo/2021/12/27/01/30/christmas-6896107__340.jpg",
  },
  desciption: "Add a more detailed desciption",
  comments: [
    {
      name: "Khushal Gupta",
      remark: "Do something, this and that",
    },
  ],
};

export default class SubCardModel {
  constructor(givenCardState) {
    if (givenCardState) {
      this.state = { ...defaultSubCardState, ...givenCardState };
    } else {
      this.state = defaultSubCardState;
    }
    this.state.id = uuidv4();
  }
}
