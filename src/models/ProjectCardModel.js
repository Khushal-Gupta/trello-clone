import { v4 as uuidv4 } from "uuid";

import SubCardModel from "./SubCardModel";

const defaultProjectCardState = {
  //id: "23234",
  title: "To Dos",
  items: [new SubCardModel()],
};

export class ProjectCardModel {
  constructor(givenProjectCard) {
    if (givenProjectCard) {
      this.state = { ...defaultProjectCardState, ...givenProjectCard };
    } else {
      this.state = defaultProjectCardState;
    }
    this.state.id = givenProjectCard.id || uuidv4();
  }

  addNewCard(givenTitle) {
    const newSubCard = new SubCardModel({ title: givenTitle });
    const newProjectCard = new ProjectCardModel(this.state);
    newProjectCard.state.items.push(newSubCard);
    const indexOfCard = DUMMY_PROJECT_CARDS.findIndex(
      (elem) => elem.state.id === this.state.id
    );
    DUMMY_PROJECT_CARDS[indexOfCard] = newProjectCard;
    console.log(DUMMY_PROJECT_CARDS[indexOfCard]);
  }
}

export let DUMMY_PROJECT_CARDS = [
  new ProjectCardModel({
    title: "To Do's",
    items: [
      new SubCardModel({
        title: "Complete Authentication",
        description: "Implement It by tonight",
        comments: [{ name: "Ragnar", remark: "Very nice....." }],
      }),
      new SubCardModel({
        title: "Add a new develop Branch",
        description: "Implement It by tonight",
        comments: [{ name: "Ragnar", remark: "Very nice....." }],
      }),
    ],
  }),
  new ProjectCardModel({
    title: "Code Reviews",
    items: [
      new SubCardModel({
        title: "Refactor your components properly, use Right names",
        description: "....empty....",
        comments: [{ name: "Rhaul", remark: "please.......do it properly" }],
      }),
    ],
  }),
];
