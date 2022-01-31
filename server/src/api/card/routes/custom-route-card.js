module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/cards",
      handler: "custom-card.updateMany",
    },
  ],
};
