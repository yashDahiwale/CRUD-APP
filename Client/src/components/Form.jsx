import React, { useEffect, useState } from "react";
import axios from "axios";

// Main CSS
import "../index.css"

// Import Components
import Alert from "./Alert";

// Icons
import insertIcon from "../assets/insert.svg"
import resetIcon from "../assets/reset.svg"
import submitIcon from "../assets/submit.svg"
import nameIcon from "../assets/name.svg"
import phoneIcon from "../assets/phone.svg"
import emailIcon from "../assets/email.svg"
import addressIcon from "../assets/address.svg"
import cityIcon from "../assets/city.svg"
import dobIcon from "../assets/dob.svg"
import genderIcon from "../assets/gender.svg"
import ageIcon from "../assets/age.svg"
import pincodeIcon from "../assets/pincode.svg"

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
        dob: ""
    });

    const [isAlert, setIsAlert] = useState(false);

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const [isResetDisabled, setIsResetDisabled] = useState(true);

    const [alertMessage, setAlertMessage] = useState("");

    // Controlled Components
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => {
            return { ...prev, [name]: value }
        });
    }

    // Submit Form
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios({
                method: "POST",
                url: "http://localhost:9000/formData",
                data: formData,
            });

            handleReset();
            setIsAlert(true);
            handleAlert();
            setAlertMessage(response.data.message);
            props.autoLiveReload();

        } catch (error) {
            console.log("Unable to Send Data!", error);
        }
        setIsSubmitDisabled(true)
        setIsResetDisabled(true)
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
            dob: ""
        })
        setIsSubmitDisabled(true)
        setIsResetDisabled(true)
    }

    // Show Alert
    const handleAlert = () => {
        setTimeout(() => {
            setIsAlert(false);
        }, 5000);
    }

    // Calcute Age from D.O.B.
    const calculateAge = (event) => {
        const birthYear = Number(event.target.value.slice(0, 4));
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;
        setFormData((prev) => {
            return { ...prev, age: age }
        })
    }

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
        }
        if (checkEmptyArrayForSubmit(Object.values(formData))) {
            setIsSubmitDisabled(true)
        } else {
            setIsSubmitDisabled(false)
        }

        // For Reset Button
        if ((Object.values(formData)).every(item => item === "")) {
            setIsResetDisabled(true)
        } else {
            setIsResetDisabled(false)
        }

        // For Age Validation
        if (formData.age <= 0) {
            setIsSubmitDisabled(true);
        }
    }

    useEffect(() => {
        checkInputs();
    }, [formData]);

    return (
        <div className="flex items-center justify-center">

            <form onSubmit={handleSubmit} className="flex items-center justify-center">
                <fieldset className="flex flex-col px-5 py-10 pt-5 border-2 border-orange-50 rounded shadow-lg bg-[#d1d5db2b] backdrop-filter backdrop-blur" style={{ width: "min(100%, 1000px)" }}>
                    <legend className="text-center">
                        <h1 className="text-4xl text-center py-3 px-7 shadow-md rounded-md bg-[#71717a3d] border-2 border-orange-50 backdrop-filter backdrop-blur font-[500] tracking-wider flex items-center justify-center gap-5">Insert Data<img src={insertIcon} className="h-10 invert select-none" alt="insert" /></h1>
                    </legend>
                    <div className="flex flex-col space-y-6 p-5 md:text-lg">
                        <div className="flex justify-between gap-5">
                            <div className="w-4/5 bg-zinc-950 rounded flex items-center border-l-2 border-t-2 border-orange-50 border-opacity-70">
                                <img className="h-5 pl-3 border-r pr-3 border-zinc-400" src={nameIcon} alt="" />
                                <input required onChange={handleChange} value={formData.name} className="py-2 w-full px-3 rounded border-none bg-transparent outline-none transition-all duration-200" type="text" placeholder="Enter Name" name="name" />
                            </div>
                            <div className="w-2/5 bg-zinc-950 rounded flex items-center border-l-2 border-t-2 border-orange-50 border-opacity-70">
                                <img className="h-5 pl-3 border-r pr-3 border-zinc-400" src={genderIcon} alt="" />
                                <select required className="py-2 w-full px-3 rounded border-none outline-none transition-all duration-200 appearance-none bg-[url(./assets/down-arrow.png)] bg-no-repeat bg-[95%]" style={{ backgroundSize: "1.5rem" }} name="gender" onChange={handleChange} value={formData.gender}>
                                    <option value="" defaultValue disabled hidden>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-between gap-5">
                            <div className="w-3/5 bg-zinc-950 rounded flex items-center border-l-2 border-t-2 border-orange-50 border-opacity-70">
                                <img className="h-5 pl-3 border-r pr-3 border-zinc-400" src={phoneIcon} alt="" />
                                <input minLength={10} maxLength={10} required onChange={handleChange} value={formData.phone} className="py-2 w-full px-3 rounded border-none outline-none  transition-all duration-200" type="tel" placeholder="Enter Phone" name="phone" />
                            </div>
                            <div className="w-3/5 bg-zinc-950 rounded flex items-center border-l-2 border-t-2 border-orange-50 border-opacity-70">
                                <img className="h-5 pl-3 border-r pr-3 border-zinc-400" src={emailIcon} alt="" />
                                <input required onChange={handleChange} value={formData.email} className="py-2 w-full px-3 rounded border-none outline-none  transition-all duration-200" type="email" placeholder="Enter Email" name="email" />
                            </div>
                        </div>
                        <div className="flex justify-between gap-5">
                            <div className="w-3/5 bg-zinc-950 rounded flex items-center border-l-2 border-t-2 border-orange-50 border-opacity-70">
                                <img className="h-5 pl-3 border-r pr-3 border-zinc-400" src={addressIcon} alt="" />
                                <input required onChange={handleChange} value={formData.address} className="py-2 w-full px-3 rounded border-none outline-none  transition-all duration-200" type="text" placeholder="Enter Address" name="address" />
                            </div>
                            <div className="w-[45%] bg-zinc-950 rounded flex items-center border-l-2 border-t-2 border-orange-50 border-opacity-70">
                                <img className="h-5 pl-3 border-r pr-3 border-zinc-400" src={cityIcon} alt="" />
                                <input required onChange={handleChange} value={formData.city} className="py-2 w-full px-3 rounded border-none outline-none  transition-all duration-200" type="text" placeholder="Enter City" name="city" />
                            </div>
                            <div className="w-[35%] bg-zinc-950 rounded flex items-center border-l-2 border-t-2 border-orange-50 border-opacity-70">
                                <img className="h-5 pl-3 border-r pr-3 border-zinc-400 invert" src={pincodeIcon} alt="" />
                                <input minLength={6} maxLength={6} required onChange={handleChange} value={formData.pincode} className="py-2 w-full px-3 rounded border-none outline-none  transition-all duration-200" type="text" placeholder="Enter Pincode" name="pincode" />
                            </div>
                        </div>
                        <div className="flex justify-between gap-5">
                            <div className="flex justify-start items-center gap-3 w-full">
                                <label className="text-zinc-200 text-xl text-nowrap font-[500]" htmlFor="dob">D.O.B. -</label>
                                <div className="w-full bg-zinc-950 rounded flex items-center border-l-2 border-t-2 border-orange-50 border-opacity-70">
                                    <img className="h-5 pl-3 border-r pr-3 border-zinc-400" src={dobIcon} alt="" />
                                    <input required onChange={(e) => { handleChange(e); calculateAge(e) }} value={formData.dob} className="py-2 px-3 rounded w-full border-none text-gray-400 outline-none  transition-all duration-200" type="date" name="dob" />
                                </div>
                            </div>
                            <div className="flex justify-start items-center gap-3 w-full">
                                <label className="text-zinc-200 text-xl text-nowrap font-[500]" htmlFor="age">Age -</label>
                                <div className="w-full bg-zinc-800 rounded flex items-center border-l-2 border-t-2 border-orange-50 border-opacity-70">
                                    <img className="h-6 pl-3 border-r pr-3 border-zinc-400" src={ageIcon} alt="" />
                                    <input disabled required onChange={handleChange} value={formData.age} className="py-2 w-full px-4 rounded border-none outline-none  transition-all duration-200 disabled:bg-zinc-800 disabled:cursor-not-allowed placeholder:text-xl" type="text" placeholder="-- --" name="age" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-10">
                        <button disabled={isSubmitDisabled} className="py-2 px-4 text-lg tracking-wide bg-sky-700 rounded shadow-md hover:bg-sky-800 disabled:bg-sky-950 disabled:cursor-not-allowed flex items-center justify-between gap-2 border-l-2 border-t-2 border-orange-50 border-opacity-70" type="submit">Submit<img src={submitIcon} className="h-4 invert" alt="submit" /></button>
                        <button disabled={isResetDisabled} className="py-2 px-4 text-lg tracking-wide bg-red-700 rounded shadow-md hover:bg-red-800 disabled:bg-red-900 disabled:cursor-not-allowed flex items-center justify-between gap-2 border-l-2 border-t-2 border-orange-50 border-opacity-70" type="reset" onClick={handleReset}>Reset<img src={resetIcon} className="h-4 invert" alt="reset" /></button>
                    </div>
                </fieldset>
            </form>

            {isAlert ? <Alert alertMessage={alertMessage} setIsAlert={setIsAlert} /> : null}
        </div>
    );
}
export default Form;
