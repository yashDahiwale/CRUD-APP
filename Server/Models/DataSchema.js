import mongoose, { model } from "mongoose";

const dataSchema = mongoose.Schema({
  name: String,
  gender: String,
  phone: String,
  email: String,
  address: String,
  city: String,
  pincode: String,
  age: String,
  dob: String,
  timeStamp: String
});

dataSchema.pre("save", function () {
  this.timeStamp = `${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`
})

const DataModel = new model("datas", dataSchema);

export { DataModel };
