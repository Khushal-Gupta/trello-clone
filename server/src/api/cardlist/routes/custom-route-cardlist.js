module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/cardlists",
      handler: "custom-cardlist.updateMany",
    },
  ],
};
