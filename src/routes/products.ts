import express from 'express'

import ProductModel from 'models/product'
import { ProductGetSchema, ProductPutSchema, ProductPatchSchema, ProductDeleteSchema } from 'schemas/product'
import { SCC_200_OK, SCC_201_CREATED, ERR_400_CLIENT, ERR_404_NOT_FOUND, ERR_409_EXISTS, ERR_500_INTERNAL } from 'const'
import {
  validateRequest,
  getRequestMetadata,
  convertSortOrder,
  isValidationError,
  createResponse,
  createErrorResponse,
} from 'utils'

export const productsRouter = express.Router()

type FilterTypes = { barcode?: RegExp; name?: RegExp }

// GET
productsRouter.get('/', async (req, res) => {
  try {
    await validateRequest(ProductGetSchema, req.query)

    const filters: FilterTypes = {}
    if (req.query.barcode) {
      filters.barcode = new RegExp(req.query.barcode as string, 'i')
    }
    if (req.query.name) {
      filters.name = new RegExp(req.query.name as string, 'i')
    }

    const { limit, offset, sortBy, sortOrder } = getRequestMetadata({ req })

    const products = await ProductModel.find(filters, null, {
      skip: offset,
      limit: limit,
      sort: { [sortBy]: convertSortOrder(sortOrder) },
    })

    if (!products.length) {
      return createErrorResponse({ res, ...ERR_404_NOT_FOUND, err: req.query })
    }

    return createResponse({ res, ...SCC_200_OK, data: products, metadata: { limit, offset, sortBy, sortOrder } })
  } catch (err) {
    if (isValidationError(err)) {
      return createErrorResponse({ res, ...ERR_400_CLIENT, err })
    }
    return createErrorResponse({ res, ...ERR_500_INTERNAL, err })
  }
})

// PUT
productsRouter.put('/', async (req, res) => {
  try {
    await validateRequest(ProductPutSchema, req.body)

    const existingProduct = await ProductModel.findOne({ barcode: req.body.barcode })
    if (existingProduct) {
      return createErrorResponse({ res, ...ERR_409_EXISTS, err: existingProduct })
    }

    const newProductModel = new ProductModel({
      barcode: req.body.barcode,
      name: req.body.name,
      count: req.body.count,
    })

    const newProduct = await newProductModel.save()
    return createResponse({ res, ...SCC_201_CREATED, data: newProduct })
  } catch (err) {
    if (isValidationError(err)) {
      return createErrorResponse({ res, ...ERR_400_CLIENT, err })
    }
    return createErrorResponse({ res, ...ERR_500_INTERNAL, err })
  }
})

// PATCH
productsRouter.patch('/', async (req, res) => {
  try {
    await validateRequest(ProductPatchSchema, req.body)

    const existingProduct = await ProductModel.findOne({ barcode: req.body.barcode })
    if (!existingProduct) {
      return createErrorResponse({ res, ...ERR_404_NOT_FOUND, err: existingProduct })
    }

    if (req.body.name) {
      existingProduct.name = req.body.name
    }
    if (req.body.count) {
      existingProduct.count = req.body.count
    }

    const updatedProduct = await existingProduct.save()
    return createResponse({ res, ...SCC_200_OK, data: updatedProduct })
  } catch (err) {
    if (isValidationError(err)) {
      return createErrorResponse({ res, ...ERR_400_CLIENT, err })
    }
    return createErrorResponse({ res, ...ERR_500_INTERNAL, err })
  }
})

// DELETE
productsRouter.delete('/', async (req, res) => {
  try {
    await validateRequest(ProductDeleteSchema, req.body)

    const deletedProduct = await ProductModel.findOneAndDelete({ barcode: req.body.barcode })
    if (!deletedProduct) {
      return createErrorResponse({ res, ...ERR_404_NOT_FOUND, err: req.body })
    }

    return createResponse({ res, ...SCC_200_OK, data: deletedProduct })
  } catch (err) {
    if (isValidationError(err)) {
      return createErrorResponse({ res, ...ERR_400_CLIENT, err })
    }
    return createErrorResponse({ res, ...ERR_500_INTERNAL, err })
  }
})
