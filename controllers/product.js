import Product from '../models/product.js'

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message })
}

export const CreateNewProduct = async (req, res) => {
  try {
    const {
      description,
      days,
      price,
      person,
      category,
      photos,
      location,
      sale
    } = req.body

    if (
      !description ||
      !days ||
      !price ||
      !person ||
      !category ||
      !photos ||
      !location ||
      sale === undefined
    ) {
      return sendErrorResponse(res, 400, 'All fields are required.')
    }

    const newProduct = new Product({
      description,
      days,
      price,
      person,
      category,
      photos,
      location,
      sale
    })
    await newProduct.save()

    return res.status(201).json({
      message: 'Product created successfully',
      product: newProduct
    })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal server error.')
  }
}

export const GetAllProducts = async (_, res) => {
  try {
    const products = await Product.find()
    return res.status(200).json({ data: products })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal server error.')
  }
}

export const DeleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    const deletedProduct = await Product.findByIdAndDelete(id)
    if (!deletedProduct) {
      return sendErrorResponse(res, 404, 'Product not found.')
    }
    return res
      .status(200)
      .json({ message: 'Product has been deleted successfully.' })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal server error.')
  }
}

export const UpdateProduct = async (req, res) => {
  const { id } = req.params
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true
    })
    if (!updatedProduct) {
      return sendErrorResponse(res, 404, 'Product not found.')
    }
    return res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct
    })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal server error.')
  }
}

export const GetOneProduct = async (req, res) => {
  const { id } = req.params
  try {
    const product = await Product.findById(id)
    if (!product) {
      return sendErrorResponse(res, 404, 'Product not found.')
    }
    return res.status(200).json({ product })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal server error.')
  }
}
