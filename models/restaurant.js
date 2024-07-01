import mongoose from 'mongoose';

// schema for menu
const menuSchema = new mongoose.Schema({
    id: { type: String },
    name: {
        type: String
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    defaultPrice: {
        type: Number,
    },
    category: {
        type: String
    },
    imageId: { type: String },
    inStock: { type: Number },
});

// schema for the SLA 
const slaSchema = new mongoose.Schema({
    deliveryTime: { type: Number },
    lastMileTravel: { type: Number },
    serviceability: { type: String },
    slaString: { type: String },
    lastMileTravelString: { type: String },
    iconType: { type: String }
});

// schema for the availability 
const availabilitySchema = new mongoose.Schema({
    nextCloseTime: { type: Date },
    opened: { type: Boolean }
});

// schema for the aggregatedDiscountInfoV3
const aggregatedDiscountInfoV3Schema = new mongoose.Schema({
    header: { type: String },
    subHeader: { type: String }
});

// main restaurant schema
const restaurantSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    cloudinaryImageId: { type: String },
    image: { type: String },
    locality: { type: String },
    areaName: { type: String },
    costForTwo: { type: String },
    cuisines: { type: [String] },
    avgRating: { type: Number },
    parentId: { type: String },
    avgRatingString: { type: String },
    totalRatingsString: { type: String },
    sla: { type: slaSchema },
    availability: { type: availabilitySchema },
    isOpen: { type: Boolean },
    type: { type: String },
    aggregatedDiscountInfoV3: { type: aggregatedDiscountInfoV3Schema },
    menu: [menuSchema]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
