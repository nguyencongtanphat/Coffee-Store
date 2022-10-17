const categoryModel = require("../models/category");
const itemModel = require("../models/item");
const client = require("../utils/redis/redisConnect");

const menuController = {
  getAllItems: async (req, res, next) => {
    //check in cache
    const cachedItems = await client.get("items");
    if (cachedItems) {
      return res.status(200).json({
        message: "Get All Items cache",
        data: JSON.parse(cachedItems),
      });
    }

    const itemsDB = await itemModel.findAll({
      include: [
        {
          model: categoryModel,
          attributes: ["Name"],
          as: "Category",
        },
      ],
    });
    //cache data to cache
    client.SETEX("items", 30, JSON.stringify(itemsDB));
    return res.status(200).json({
      message: "Get All Items by DB",
      data: itemsDB,
    });
  },
  getItemByID: async (req, res, next) => {
    const idReq = req.params.id;
    //check in cache
    const cachedItem = await client.get(`item-${idReq}`);
    if (cachedItem) {
      return res.status(200).json({
        message: "Get Item from cache",
        data: JSON.parse(cachedItem),
      });
    }
    const itemDB = await itemModel.findByPk(idReq, {
      include: [
        {
          model: categoryModel,
          attributes: ["Name"],
        },
      ],
    });
    if (!itemDB) {
      return res.status(404).json({
        message: "Get Error",
      });
    }
    client.SETEX(`item-${idReq}`, 30, JSON.stringify(itemDB));
    return res.status(200).json({
      message: "Get Item from Database",
      data: itemDB,
    });
    
  },
  getItemsByCategory: async (req, res, next) => {
    const categoryID = req.params.id;
    const itemsDB = await itemModel.findAll({
      where: {
        Type: categoryID,
      },
      include: [
        {
          model: categoryModel,
          attributes: ["Name"],
        },
      ],
    });
    return res.status(200).json({
      message: "Get Items By Category",
      data: itemsDB,
    });
  },
  getAllCategory: async (req, res, next) => {
    const categoryDB = await categoryModel.findAll();

    return res.status(200).json({
      message: "Get Categories",
      data: categoryDB,
    });
  },
};

module.exports = menuController;
