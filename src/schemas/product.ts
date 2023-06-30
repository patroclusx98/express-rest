import joi from 'joi'

import ProductModel from 'models/product'
import { SORT_ORDER_VALUES } from 'const'

export const ProductGetSchema = joi.object({
  barcode: joi.string().alphanum(),
  name: joi.string().alphanum(),
  limit: joi.number().min(1),
  offset: joi.number().min(0),
  sortBy: joi.string().valid(...Object.keys(ProductModel.schema.obj)),
  sortOrder: joi.string().valid(...SORT_ORDER_VALUES),
})

export const ProductPutSchema = joi.object({
  barcode: joi.string().alphanum().required(),
  name: joi.string().alphanum().required(),
  count: joi.number().required(),
})

export const ProductPatchSchema = joi.object({
  barcode: joi.string().alphanum().required(),
  name: joi.string().alphanum(),
  count: joi.number(),
})

export const ProductDeleteSchema = joi.object({
  barcode: joi.string().alphanum().required(),
})
