const Catalog = require("../models/catalog");
const User = require("../models/user");
const Asset = require("../models/asset");
const Product = require("../models/product");
const { Op } = require("sequelize");
const sendErrorMessage = require("../util/error-handler");
const { ASSET_TYPES } = require("../constants/asset.constant");

exports.postBuyProduct = (request, response) => {
  Promise.all([
    User.findOne({ where: { address: request.body.address } }),
    Catalog.findByPk(request.body.id),
  ])
    .then(([user, catalog]) => {
      if (user && catalog) {
        const { cash1, cash2, cash3 } = user;
        const { cost1, cost2, cost3, req1, req2, req3 } = catalog;
        const assetTypes = ASSET_TYPES;

        const reqsMap = {
          [assetTypes[0]]: req1,
          [assetTypes[1]]: req2,
          [assetTypes[2]]: req3,
        };

        const assetTypesQuery = assetTypes.map((type) => ({
          type,
        }));

        if (cash1 > cost1 && cash2 > cost2 && cash3 > cost3) {
          let isEligibleForPurchase = true;

          Asset.findAll({
            where: {
              address: user.address,
              [Op.or]: assetTypesQuery,
            },
          })
            .then((assets) => {
              assets.forEach((asset) => {
                if (reqsMap[asset.type] && asset.level < reqsMap[asset.type]) {
                  isEligibleForPurchase = false;
                }
              });
            })
            .then(() => {
              if (isEligibleForPurchase) {
                buyProduct(response, user, catalog);
              } else {
                throw new Error("Is not eligible for purchase");
              }
            })
            .catch((err) => sendErrorMessage(response, err));
        } else {
          throw new Error("Not enough funds");
        }
      } else {
        throw new Error("no user or catalog was found!");
      }
    })
    .catch((err) => {
      sendErrorMessage(response, err);
    });
};

function buyProduct(response, user, catalog) {
  user.cash1 = user.cash1 - catalog.cost1;
  user.cash2 = user.cash2 - catalog.cost2;
  user.cash3 = user.cash3 - catalog.cost3;

  Promise.all([
    user.save(),
    Product.create({
      address: user.address,
      id: Math.floor(Math.random() * 100),
    }),
  ])
    .then(([savedUser]) => {
      const successResponse = {
        success: true,
        data: {
          resources: {
            cash1: savedUser.cash1,
            cash2: savedUser.cash2,
            cash3: savedUser.cash3,
          },
        },
      };
      response.send(successResponse);
    })
    .catch((err) => sendErrorMessage(response, err));
}
