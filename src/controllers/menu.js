const categoryModel = require("../models/category");
const itemModel = require("../models/item");

const menuController = {
  getBestSeller: async (req, res, next) => {
    const itemsDB = await itemModel.findAll({
      limit: 8,
      include: [
        {
          model: categoryModel,
          attributes: ["Name"],
          as: "Category",
        },
      ],
    });

     return res.status(200).json({
       message: "Get best seller Items by DB",
       data: itemsDB,
     });
  },
  getAllItems: async (req, res, next) => {
    const itemsDB = await itemModel.findAll({
      include: [
        {
          model: categoryModel,
          attributes: ["Name"],
          as: "Category",
        },
      ],
    });
    return res.status(200).json({
      message: "Get All Items by DB1",
      data: itemsDB,
    });
  },
  getItemByID: async (req, res, next) => {
    const idReq = req.params.id;
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
