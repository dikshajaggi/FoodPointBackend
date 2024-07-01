import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    en: {type: String, required: true},
    hn: {type: String, required: true},
    image: {type: String, required: true}
})

const Category = mongoose.model('category', CategorySchema)
export default Category