import "../database/connect.js";
import { DataModel } from "../Models/DataSchema.js";
import { ObjectId } from "mongodb";

const PostFormData = async (req, res) => {
  const data = req.body;

  try {
    const isDuplicate = await DataModel.findOne({ $or: [{ phone: data.phone }, { email: data.email }] });
    if (isDuplicate) {
      throw ("Data with the same phone or email already exists.");
    } else {
      const instaceDataModel = new DataModel(data);
      await instaceDataModel.save();
      // console.log("Data has been saved in the database");
      res.status(200).json({ message: "Data Saved Successfully!" });
    }
  } catch (error) {
    // console.log("Unable to save the data in the database", error);
    res.status(200).json({ message: error });
  }
}

const fetchAllData = async (req, res) => {
  try {
    const response = await DataModel.find({});
    if (response.length === 0) {
      throw ("Database is empty; please enter some data!");
    } else {
      res.status(200).json({ response, message: "Unable To Get Data From Database!" });
    }
  } catch (error) {
    // console.log("Unable to fetch data from database!");
    res.status(200).json({ message: error });
  }
};

const deleteEntry = async (req, res) => {
  try {
    const id = req.params.id;
    await DataModel.deleteOne({ _id: new ObjectId(`${id}`) });
    // console.log("Entry Deleted Successfully")
    res.status(200).json({ message: "Data Deleted Successfully" })
  } catch (error) {
    // console.log(error);
    res.status(200).json({ message: "Unable to Delete Data", error: error })
  }
}

const updateEntry = async (req, res) => {
  try {
    const data = req.body;
    const dataLength = Object.keys(data).length; // For Length of an Object
    const dataKey = Object.keys(data); // For Keys of an Object
    const dataValue = Object.values(data); // For Values of an Object

    // For Updating Every Field of the Document with the Same _id
    for (let i = 0; i < dataLength; i++) {
      await DataModel.updateOne({ _id: data._id }, { $set: { [dataKey[i]]: dataValue[i] } })
    }
    // console.log("Update Successfull");
    res.status(200).json({ message: "Data Updated Successfully!" });
  } catch (error) {
    console.log(error)
    res.status(200).json({ message: "Unbale to update the data!" })
  }
}

export { fetchAllData, PostFormData, deleteEntry, updateEntry };
