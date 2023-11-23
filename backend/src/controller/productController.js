import { Sequelize } from "sequelize";
import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const response = await Product.findAll();
    res.status(200).json(response)
  } catch (err) {
    console.log(err.message);
  }
}

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const response = await Product.findOne({
      where: {
        id: id
      }
    });
    res.status(200).json(response)
  } catch (err) {
    console.log(err.message);
  }
}

export const createProduct = async (req, res) => {
  try {
    const { name, price, stock, colour } = req.body
    await Product.create({ name: name, price: price, stock: stock, colour: colour });

    res.status(201).json({
      msg: 'Product created successfully'
    })

  } catch (err) {
    console.log(err.message);
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { name, price, stock, colour } = req.body
    await Product.update({ name: name, price: price, stock: stock, colour: colour }, {
      where: {
        id: id
      }
    });

    res.status(200).json({
      msg: 'Product Updated successfully'
    })

  } catch (err) {
    console.log(err.message);
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    await Product.destroy({
      where: {
        id: id
      }
    });

    res.status(200).json({
      msg: 'Product Deleted successfully'
    })

  } catch (err) {
    console.log(err.message);
  }
}

export const searchProduct = async (req, res) => {
  const searchTerm = req.body.searchTerm.toLowerCase();
  const Op = Sequelize.Op
  try {
    const response = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${searchTerm}%`,
        }
      }
    });

    res.status(200).json(response)

  } catch (err) {
    console.log(err.message);
  }


}