const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::card.card", ({ strapi }) => ({
  async updateMany(ctx) {
    const {
      request: {
        body: { data },
      },
    } = ctx;

    let responseArr = [];
    for (const [cardId, patchObject] of Object.entries(data)) {
      const res = await strapi
        .service("api::card.card")
        .update(cardId, { data: patchObject });
      responseArr.push(res);
    }
    return this.transformResponse(responseArr);
  },
}));
