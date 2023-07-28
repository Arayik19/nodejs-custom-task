const Catalog = require("../models/catalog");
const sendErrorMessage = require("../util/error-handler");

exports.getCatalogById = (request, response) => {
  Catalog.findByPk(request.params.id)
    .then((catalog) => {
      if (catalog) {
        const resCatalog = {
          id: catalog.id,
          name: catalog.name,
          description: catalog.description,
          imageUrl: catalog.url,
          price: {
            cost1: catalog.cost1,
            cost2: catalog.cost2,
            cost3: catalog.cost3,
          },
          req: {
            req1: catalog.req1,
            req2: catalog.req2,
            req3: catalog.req3,
          },
        };

        response.send(resCatalog);
      } else {
        throw new Error("No catalog was found!");
      }
    })
    .catch((err) => sendErrorMessage(response, err));
};
