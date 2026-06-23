import { Schema,model } from "mongoose";

const menuItemSchema = new Schema({
  name:        { type: String, required: true },
  description: { type: String },
  price:       { type: Number, required: true },
  category:    { type: String },
  available:   { type: Boolean, default: true },
})

const storeSchema = new Schema({
  storeName: { type: String, required: true },
  email:     { type: String, required: true, unique: true,trim:true,lowercase:true,index:true,match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'] },
  password:  { type: String, required: true },
  contact:   { type: String, required: true,unique:true,match: [/^\+\d{1,3}-\d{3}-\d{7}$/,"Enter valid contact format +code-3digits-7digits"] },
  address: {
    city:    { type: String },
  },
  menuItems: [menuItemSchema],
}, { timestamps: true })

const Store =  model('Store', storeSchema)
export default Store;