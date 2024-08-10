import React, { useState } from 'react'

// Icons
import cancelIcon from "../assets/cancel.svg"
import saveIcon from "../assets/submit.svg"
import axios from 'axios'

function UpdateModal(props) {

    const [formData, setFormData] = useState(props.carryPropsData)

    // Controlled Components
    const handleChange = (event) => {
        let { name, value } = event.target;
        setFormData((prev) => {
            return { ...prev, [name]: value }
        });

        checkEmpty(event, [name], value);
    }

    // Check if the input is empty and if it's empty then assign the previous value to that particular input field
    const checkEmpty = (event, name, value) => {
        event.target.addEventListener("focusout", () => {
            if (value === '') {
                setFormData((prev) => {
                    return { ...prev, [name]: value = props.carryPropsData[name] }
                })
            }
        })
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

    // Show Alert
    const handleAlert = () => {
        setTimeout(() => {
            props.setIsAlert(false);
        }, 5000);
    }

    // Update or Edit Data
    const updateEntry = async () => {
        try {
            const response = await axios({
                method: "PUT",
                url: "http://localhost:9000/updateData",
                data: formData
            })
            if (response.status === 200) {
                props.setIsAlert(true)
                handleAlert();
                props.setAlertMessage(response.data.message);
                props.autoLiveReload();
            } else {
                throw ("Unable to update data")
            }
        } catch (error) {
            console.log(error)
            props.setAlertMessage(error)
        }
    }


    return (
        <>
            <div className='h-[47rem] w-[40rem] z-[99] text-center py-10 px-5 bg-zinc-900 border border-zinc-50 shadow-md rounded-md fixed flex gap-5 flex-col items-center justify-center inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>

                <fieldset className='border border-zinc-500 flex items-center justify-center flex-col gap-5 py-5'>
                    <legend>
                        <h3 className='text-3xl tracking-wide leading-relaxed border px-5 py-3 rounded'>Update Data For "<span className='underline underline-offset-4 text-sky-500'>{props.carryPropsData.name}</span>"</h3>
                    </legend>
                    <form className='flex flex-col gap-5 px-10 mx-16 rounded text-lg w-full'>
                        <div className='flex justify-between items-center gap-5'>
                            <label className='text-zinc-300 text-right w-20' htmlFor="name">Name :</label>
                            <input onChange={handleChange} className='py-2 px-3 outline-none border-none flex-[2] bg-zinc-800 text-base rounded focus:border-zinc-500' type="text" placeholder={props.carryPropsData.name} name='name' value={formData.name} />
                        </div>
                        <div className='flex justify-between items-center gap-5'>
                            <label className='text-zinc-300 text-right w-20' htmlFor="gender">Gender :</label>
                            <select className='py-2 px-3 outline-none border-none flex-[2] bg-zinc-800 text-base rounded focus:border-zinc-500 appearance-none bg-[url(./assets/down-arrow.png)] bg-no-repeat bg-[95%]' style={{ backgroundSize: "1.5rem" }} name="gender" onChange={handleChange} value={formData.gender}>
                                <option value={props.carryPropsData.gender} defaultValue disabled hidden>{props.carryPropsData.gender}</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='flex justify-between items-center gap-5'>
                            <label className='text-zinc-300 text-right w-20' htmlFor="phone">Phone :</label>
                            <input onChange={handleChange} className='py-2 px-3 outline-none border-none flex-[2] bg-zinc-700 text-base rounded focus:border-zinc-500 cursor-not-allowed' type="tel" disabled placeholder={props.carryPropsData.phone} name='phone' value={formData.phone} />
                        </div>
                        <div className='flex justify-between items-center gap-5'>
                            <label className='text-zinc-300 text-right w-20' htmlFor="email">Email :</label>
                            <input onChange={handleChange} className='py-2 px-3 outline-none border-none flex-[2] bg-zinc-700 text-base rounded focus:border-zinc-500 cursor-not-allowed' type="email" disabled placeholder={props.carryPropsData.email} name='email' value={formData.email} />
                        </div>
                        <div className='flex justify-between items-center gap-5'>
                            <label className='text-zinc-300 text-right w-20' htmlFor="address">Address :</label>
                            <input onChange={handleChange} className='py-2 px-3 outline-none border-none flex-[2] bg-zinc-800 text-base rounded focus:border-zinc-500 w-full' type="text" placeholder={props.carryPropsData.address} name='address' value={formData.address} />
                        </div>
                        <div className='flex justify-between items-center gap-5'>
                            <label className='text-zinc-300 text-right w-20' htmlFor="city">City :</label>
                            <input onChange={handleChange} className='py-2 px-3 outline-none border-none flex-[2] bg-zinc-800 text-base rounded focus:border-zinc-500' type="text" placeholder={props.carryPropsData.city} name='city' value={formData.city} />
                        </div>
                        <div className='flex justify-between items-center gap-5'>
                            <label className='text-zinc-300 text-right w-20' htmlFor="pincode">Pincode :</label>
                            <input onChange={handleChange} className='py-2 px-3 outline-none border-none flex-[2] bg-zinc-800 text-base rounded focus:border-zinc-500' type="text" placeholder={props.carryPropsData.pincode} name='pincode' value={formData.pincode} />
                        </div>
                        <div className='flex justify-between items-center gap-5'>
                            <label className='text-zinc-300 text-right w-20' htmlFor="dob">D.O.B. :</label>
                            <input onChange={(e) => { handleChange(e); calculateAge(e) }} className='py-2 px-3 outline-none border-none flex-[2] bg-zinc-800 text-base rounded focus:border-zinc-500 w-full' type="date" placeholder={props.carryPropsData.dob} name='dob' value={formData.dob} />
                        </div>
                        <div className='flex justify-between items-center gap-5'>
                            <label className='text-zinc-300 text-right w-20' htmlFor="age">Age :</label>
                            <input onChange={handleChange} className='py-2 px-3 outline-none border-none flex-[2] bg-zinc-700 text-base rounded focus:border-zinc-500 cursor-not-allowed' type="text" disabled placeholder={props.carryPropsData.age} name='age' value={formData.age} />
                        </div>
                    </form>
                    <div className='flex gap-10'>
                        <button onClick={() => { props.setShowUpdateModal(false) }} className='px-4 py-2 text-xl rounded bg-red-700 hover:bg-red-800 flex items-center justify-between gap-2 border-l-2 border-t-2 border-orange-50 border-opacity-70'>Cancel<img src={cancelIcon} className="h-6 invert" alt="cancel" /></button>
                        <button onClick={async () => { await updateEntry(); await props.setShowUpdateModal(false) }} className='px-4 py-2 text-xl rounded  bg-sky-700 hover:bg-sky-800 flex items-center justify-between gap-2 border-l-2 border-t-2 border-orange-50 border-opacity-70'>Save<img src={saveIcon} className="h-[1.3rem] invert" alt="delete" /></button>
                    </div>
                </fieldset>

                {/* For Close Button */}
                <button onClick={() => { props.setShowUpdateModal(false) }} className="border-zinc-300 absolute top-2 right-0 outline-none py-0 px-[0.6rem] rounded mr-2 text-3xl bg-zinc-700">&times;</button>
            </div>

            {/* For Background Blur */}
            <div onClick={() => { { /*props.setShowUpdateModal(false)*/ } }} className='h-full w-full fixed inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex backdrop-blur'></div>
        </>
    )
}

export default UpdateModal
