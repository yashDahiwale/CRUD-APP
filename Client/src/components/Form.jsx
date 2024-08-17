import React, { useEffect, useState } from "react";
import axios from "axios";

// Main CSS
import "../index.css";

// Import Components
import Alert from "./Alert";

// Icons
import insertIcon from "../assets/insert.svg";
import resetIcon from "../assets/reset.svg";
import submitIcon from "../assets/submit.svg";
import nameIcon from "../assets/name.svg";
import phoneIcon from "../assets/phone.svg";
import emailIcon from "../assets/email.svg";
import addressIcon from "../assets/address.svg";
import cityIcon from "../assets/city.svg";
import dobIcon from "../assets/dob.svg";
import genderIcon from "../assets/gender.svg";
import ageIcon from "../assets/age.svg";
import pincodeIcon from "../assets/pincode.svg";

function Form(props) {
  // State Variables
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    age: "",
    dob: "",
  });

  const [isAlert, setIsAlert] = useState(false);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const [isResetDisabled, setIsResetDisabled] = useState(true);

  const [alertMessage, setAlertMessage] = useState("");

  // Controlled Components
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // Submit Form
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitDisabled(true);
    setIsResetDisabled(true);
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:9000/formData",
        data: formData,
      });

      handleReset();
      handleAlert();
      setAlertMessage(response.data.message);
      props.autoLiveReload();
    } catch (error) {
      handleReset();
      handleAlert();
      setAlertMessage("Unable to Save Data!");
      console.log("Unable to Send Data!", error);
    }
  };

  // Reset Form
  const handleReset = () => {
    setFormData({
      name: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      pincode: "",
      age: "",
      dob: "",
    });
    setIsSubmitDisabled(true);
    setIsResetDisabled(true);
  };

  // Show Alert
  const handleAlert = () => {
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    }, 5000);
  };

  // Calcute Age from D.O.B.
  const calculateAge = (event) => {
    const birthYear = Number(event.target.value.slice(0, 4));
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    setFormData((prev) => {
      return { ...prev, age: age };
    });
  };

  // Input Fields Validation
  const checkInputs = () => {
    // Check Empty Input Fields

    // For Submit Button
    const checkEmptyArrayForSubmit = (arr) => {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === "") {
          return true;
        }
      }
      return false;
    };
    if (checkEmptyArrayForSubmit(Object.values(formData))) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }

    // For Reset Button
    if (Object.values(formData).every((item) => item === "")) {
      setIsResetDisabled(true);
    } else {
      setIsResetDisabled(false);
    }

    // For Age Validation
    if (formData.age <= 0) {
      setIsSubmitDisabled(true);
    }
  };

  useEffect(() => {
    checkInputs();
  }, [formData]);

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center"
      >
        <fieldset
          className="flex flex-col rounded border-2 border-orange-50 bg-[#d1d5db2b] px-5 py-10 pt-5 shadow-lg backdrop-blur backdrop-filter"
          style={{ width: "min(100%, 1000px)" }}
        >
          <legend className="text-center">
            <h1 className="flex items-center justify-center gap-5 rounded-md border-2 border-orange-50 bg-[#71717a3d] px-7 py-3 text-center text-4xl font-[500] tracking-wider shadow-md backdrop-blur backdrop-filter xsm:gap-2 xsm:px-3">
              Insert Data
              <img
                src={insertIcon}
                className="h-10 select-none invert"
                alt="insert"
              />
            </h1>
          </legend>
          <div className="flex flex-col space-y-6 p-5 sm:px-1 md:text-lg">
            <div className="flex justify-between gap-5 sm:flex-col">
              <div className="flex w-4/5 items-center rounded border-l-2 border-t-2 border-orange-50 border-opacity-70 bg-zinc-950 sm:w-full">
                <img
                  className="h-5 border-r border-zinc-400 pl-3 pr-3"
                  src={nameIcon}
                  alt=""
                />
                <input
                  required
                  onChange={handleChange}
                  value={formData.name}
                  className="w-full rounded border-none bg-transparent px-3 py-2 outline-none transition-all duration-200"
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                />
              </div>
              <div className="flex w-2/5 items-center rounded border-l-2 border-t-2 border-orange-50 border-opacity-70 bg-zinc-950 sm:w-full">
                <img
                  className="h-5 border-r border-zinc-400 pl-3 pr-3"
                  src={genderIcon}
                  alt=""
                />
                <select
                  required
                  className="w-full appearance-none rounded border-none bg-[url(./assets/down-arrow.png)] bg-[95%] bg-no-repeat px-3 py-2 outline-none transition-all duration-200"
                  style={{ backgroundSize: "1.5rem" }}
                  name="gender"
                  onChange={handleChange}
                  value={formData.gender}
                >
                  <option value="" defaultValue disabled hidden>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between gap-5 sm:flex-col">
              <div className="flex w-3/5 items-center rounded border-l-2 border-t-2 border-orange-50 border-opacity-70 bg-zinc-950 sm:w-full">
                <img
                  className="h-5 border-r border-zinc-400 pl-3 pr-3"
                  src={phoneIcon}
                  alt=""
                />
                <input
                  minLength={10}
                  maxLength={10}
                  required
                  onChange={handleChange}
                  value={formData.phone}
                  className="w-full rounded border-none px-3 py-2 outline-none transition-all duration-200"
                  type="tel"
                  placeholder="Enter Phone"
                  name="phone"
                />
              </div>
              <div className="flex w-3/5 items-center rounded border-l-2 border-t-2 border-orange-50 border-opacity-70 bg-zinc-950 sm:w-full">
                <img
                  className="h-5 border-r border-zinc-400 pl-3 pr-3"
                  src={emailIcon}
                  alt=""
                />
                <input
                  required
                  onChange={handleChange}
                  value={formData.email}
                  className="w-full rounded border-none px-3 py-2 outline-none transition-all duration-200"
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                />
              </div>
            </div>
            <div className="flex justify-between gap-5 sm:flex-col">
              <div className="flex w-3/5 items-center rounded border-l-2 border-t-2 border-orange-50 border-opacity-70 bg-zinc-950 sm:w-full">
                <img
                  className="h-5 border-r border-zinc-400 pl-3 pr-3"
                  src={addressIcon}
                  alt=""
                />
                <input
                  required
                  onChange={handleChange}
                  value={formData.address}
                  className="w-full rounded border-none px-3 py-2 outline-none transition-all duration-200"
                  type="text"
                  placeholder="Enter Address"
                  name="address"
                />
              </div>
              <div className="flex w-[45%] items-center rounded border-l-2 border-t-2 border-orange-50 border-opacity-70 bg-zinc-950 sm:w-full">
                <img
                  className="h-5 border-r border-zinc-400 pl-3 pr-3"
                  src={cityIcon}
                  alt=""
                />
                <input
                  required
                  onChange={handleChange}
                  value={formData.city}
                  className="w-full rounded border-none px-3 py-2 outline-none transition-all duration-200"
                  type="text"
                  placeholder="Enter City"
                  name="city"
                />
              </div>
              <div className="flex w-[35%] items-center rounded border-l-2 border-t-2 border-orange-50 border-opacity-70 bg-zinc-950 sm:w-full">
                <img
                  className="h-5 border-r border-zinc-400 pl-3 pr-3 invert"
                  src={pincodeIcon}
                  alt=""
                />
                <input
                  minLength={6}
                  maxLength={6}
                  required
                  onChange={handleChange}
                  value={formData.pincode}
                  className="w-full rounded border-none px-3 py-2 outline-none transition-all duration-200"
                  type="text"
                  placeholder="Enter Pincode"
                  name="pincode"
                />
              </div>
            </div>
            <div className="flex justify-between gap-5 sm:!mt-3 sm:flex-col sm:gap-2">
              <div className="flex w-full items-center justify-start gap-3 sm:flex-col sm:gap-1">
                <label
                  className="text-nowrap text-xl font-[500] text-zinc-200 sm:self-start sm:text-base"
                  htmlFor="dob"
                >
                  D.O.B. -
                </label>
                <div className="flex w-full items-center overflow-x-hidden rounded border-l-2 border-t-2 border-orange-50 border-opacity-70 bg-zinc-950">
                  <img
                    className="h-5 border-r border-zinc-400 pl-3 pr-3"
                    src={dobIcon}
                    alt=""
                  />
                  <input
                    required
                    onChange={(e) => {
                      handleChange(e);
                      calculateAge(e);
                    }}
                    value={formData.dob}
                    className="w-full rounded border-none px-3 py-2 text-gray-400 outline-none transition-all duration-200"
                    type="date"
                    name="dob"
                  />
                </div>
              </div>
              <div className="flex w-full items-center justify-start gap-3 sm:flex-col sm:gap-1">
                <label
                  className="text-nowrap text-xl font-[500] text-zinc-200 sm:self-start sm:text-base"
                  htmlFor="age"
                >
                  Age -
                </label>
                <div className="flex w-full items-center rounded border-l-2 border-t-2 border-orange-50 border-opacity-70 bg-zinc-800">
                  <img
                    className="h-6 border-r border-zinc-400 pl-3 pr-3"
                    src={ageIcon}
                    alt=""
                  />
                  <input
                    disabled
                    required
                    onChange={handleChange}
                    value={formData.age}
                    className="w-full rounded border-none px-4 py-2 outline-none transition-all duration-200 placeholder:text-xl disabled:cursor-not-allowed disabled:bg-zinc-800"
                    type="text"
                    placeholder="-- --"
                    name="age"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-10">
            <button
              disabled={isSubmitDisabled}
              className="flex items-center justify-between gap-2 rounded border-l-2 border-t-2 border-orange-50 border-opacity-70 bg-sky-700 px-4 py-2 text-lg tracking-wide shadow-md hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-sky-950"
              type="submit"
            >
              Submit
              <img src={submitIcon} className="h-4 invert" alt="submit" />
            </button>
            <button
              disabled={isResetDisabled}
              className="flex items-center justify-between gap-2 rounded border-l-2 border-t-2 border-orange-50 border-opacity-70 bg-red-700 px-4 py-2 text-lg tracking-wide shadow-md hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-red-900"
              type="reset"
              onClick={handleReset}
            >
              Reset
              <img src={resetIcon} className="h-4 invert" alt="reset" />
            </button>
          </div>
        </fieldset>
      </form>

      {isAlert ? (
        <Alert alertMessage={alertMessage} setIsAlert={setIsAlert} />
      ) : null}
    </div>
  );
}
export default Form;
