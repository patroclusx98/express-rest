export const SORT_ORDER_VALUES = ['ASC', 'DESC']

// Pagination and sorting defaults
export const DEFAULT_LIMIT = 30
export const DEFAULT_OFFSET = 0
export const DEFAULT_SORT_BY = 'barcode'
export const DEFAULT_SORT_ORDER = 'ASC'

// Success messages
export const SCC_200_OK = { statusCode: 200, message: 'Operation successful' }
export const SCC_201_CREATED = { statusCode: 201, message: 'Operation successful' }

// Error messages
export const ERR_400_CLIENT = { statusCode: 400, message: 'Operation failed, Client Error due to invalid request' }
export const ERR_404_NOT_FOUND = { statusCode: 404, message: 'Operation failed, Product(s) not found' }
export const ERR_409_EXISTS = { statusCode: 409, message: 'Operation failed, Product already exists' }
export const ERR_500_INTERNAL = { statusCode: 500, message: 'Operation failed, Internal Server Error' }
