const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::cardlist.cardlist",
  ({ strapi }) => ({
    async updateMany(ctx) {
      const {
        request: {
          body: { data },
        },
      } = ctx;

      let responseArr = [];
      for (const [cardlistId, patchObject] of Object.entries(data)) {
        const res = await strapi
          .service("api::cardlist.cardlist")
          .update(cardlistId, { data: patchObject });
        responseArr.push(res);
      }
      return this.transformResponse(responseArr);
    },
  })
);
