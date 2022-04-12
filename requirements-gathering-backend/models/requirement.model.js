const mongoose = require('mongoose')

const Schema = mongoose.Schema

const requirementSchema = new Schema({
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    opening: { type: String, required: true, trim: true },
    rating: { type: Number, require: true, min: 1, max: 100 },
    region: {type: String, required: true, trim: true },
    status: { type: String, enum: ['open', 'inprogress', 'completed', 'obsolete'], default: 'open' },
    img: { type: String, required: false, trim: true }
}, { timestamps: true })

const Post = mongoose.model('engenData', requirementSchema)

module.exports = Post