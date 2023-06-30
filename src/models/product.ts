import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  barcode: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
})

export default mongoose.model('Product', productSchema)
