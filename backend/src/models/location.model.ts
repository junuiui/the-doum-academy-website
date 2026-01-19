import { Schema, model } from "mongoose";

const LocationSchema = new Schema({
  // Location
  location: {type: String, required: true, unique: true},

  // Address
  address: {type: String, required: true},

  // phone number
  phone: {type: String, required: true},

  // email
  email: {type: String, required: true},

  // map link
  mapEmbedLink: {type: String, required: true},

  // Direction Base
  directionsBase: {type: String, required: true}
})

export const Location = model('Location', LocationSchema);