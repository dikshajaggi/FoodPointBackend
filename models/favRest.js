import mongoose from "mongoose";

const favRest = new mongoose.Schema({
    userId: {
        type: String,
        required: true
      },
    restId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }
})

const FavouriteRest = mongoose.model('FavRest', favRest)
export default FavouriteRest