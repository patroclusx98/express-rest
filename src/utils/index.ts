import { Request, Response } from 'express'
import mongoose from 'mongoose'
import joi from 'joi'

import { DEFAULT_LIMIT, DEFAULT_OFFSET, DEFAULT_SORT_BY, DEFAULT_SORT_ORDER } from 'const'

export const validateRequest = async (validationSchema: joi.ObjectSchema<any>, requestObject: any) => {
  return validationSchema.validateAsync(requestObject)
}

export const isValidationError = (err: any) => {
  return err instanceof joi.ValidationError || err instanceof mongoose.Error.ValidationError
}

export type MetadataObject = {
  limit: number
  offset: number
  sortBy: string
  sortOrder: string
}

export type RequestMetadataParams = {
  req: Request
}

export const getRequestMetadata = (params: RequestMetadataParams): MetadataObject => {
  const { req } = params

  const limit = req.query.limit ? parseInt(req.query.limit as string) : DEFAULT_LIMIT
  const offset = req.query.offset ? parseInt(req.query.offset as string) : DEFAULT_OFFSET
  const sortBy = req.query.sortBy ? (req.query.sortBy as string) : DEFAULT_SORT_BY
  const sortOrder = req.query.sortOrder ? (req.query.sortOrder as string) : DEFAULT_SORT_ORDER

  return { limit, offset, sortBy, sortOrder }
}

export const convertSortOrder = (sortOrder: string) => {
  switch (sortOrder) {
    case 'ASC':
      return 1
    case 'DESC':
      return -1
    default:
      return 1
  }
}

export type ResponseParams = {
  res: Response
  statusCode: number
  message: string
  data: any
  metadata?: MetadataObject
}

export const createResponse = (params: ResponseParams) => {
  const { res, statusCode, message, data, metadata } = params

  res.status(statusCode).json({ response: { message, data, metadata } })
}

export type ErrorResponseParams = {
  res: Response
  statusCode: number
  message: string
  err: any
}

export const createErrorResponse = (params: ErrorResponseParams) => {
  const { res, statusCode, message, err } = params

  res.status(statusCode).json({ response: { errorMessage: message, errorInfo: err } })
}
