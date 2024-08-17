import React, { useState } from "react";

// Icons
import cancelIcon from "../assets/cancel.svg";
import saveIcon from "../assets/submit.svg";
import axios from "axios";

function UpdateModal(props) {
  const [formData, setFormData] = useState(props.carryPropsData);

  // Controlled Components
  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });

    checkEmpty(event, [name], value);
  };

  // Check if the input is empty and if it's empty then assign the previous value to that particular input field
  const checkEmpty = (event, name, value) => {
    event.target.addEventListener("focusout", () => {
      if (value === "") {
        setFormData((prev) => {
          return { ...prev, [name]: (value = props.carryPropsData[name]) };
        });
      }
    });
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

  // Show Alert
  const handleAlert = () => {
    setTimeout(() => {
      props.setIsAlert(false);
    }, 5000);
  };

  // Update or Edit Data
  const updateEntry = async () => {
    try {
      const response = await axios({
        method: "PUT",
        url: "http://localhost:9000/updateData",
        data: formData,
      });
      if (response.status === 200) {
        props.setIsAlert(true);
        handleAlert();
        props.setAlertMessage(response.data.message);
        props.autoLiveReload();
      } else {
        throw "Unable to update data";
      }
    } catch (error) {
      console.log(error);
      props.setAlertMessage(error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 left-1/2 top-1/2 z-[99] flex h-[47rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-5 rounded-md border border-zinc-50 bg-zinc-900 px-5 py-10 text-center shadow-md sm:h-[90%] sm:w-[90%] sm:justify-start sm:overflow-y-scroll">
        <fieldset className="flex flex-col items-center justify-center gap-5 border border-zinc-500 py-5">
          <legend>
            <h3 className="rounded border px-5 py-3 text-3xl leading-relaxed tracking-wide">
              Update Data For "
              <span className="text-sky-500 underline underline-offset-4">
                {props.carryPropsData.name}
              </span>
              "
            </h3>
          </legend>
          <form className="mx-16 flex w-full flex-col gap-5 rounded px-10 text-lg sm:mx-0">
            <div className="flex items-center justify-between gap-5">
              <label className="w-20 text-right text-zinc-300" htmlFor="name">
                Name :
              </label>
              <input
                onChange={handleChange}
                className="flex-[2] rounded border-none bg-zinc-800 px-3 py-2 text-base outline-none focus:border-zinc-500"
                type="text"
                placeholder={props.carryPropsData.name}
                name="name"
                value={formData.name}
              />
            </div>
            <div className="flex items-center justify-between gap-5">
              <label className="w-20 text-right text-zinc-300" htmlFor="gender">
                Gender :
              </label>
              <select
                className="flex-[2] appearance-none rounded border-none bg-zinc-800 bg-[url(./assets/down-arrow.png)] bg-[95%] bg-no-repeat px-3 py-2 text-base outline-none focus:border-zinc-500"
                style={{ backgroundSize: "1.5rem" }}
                name="gender"
                onChange={handleChange}
                value={formData.gender}
              >
                <option
                  value={props.carryPropsData.gender}
                  defaultValue
                  disabled
                  hidden
                >
                  {props.carryPropsData.gender}
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex items-center justify-between gap-5">
              <label className="w-20 text-right text-zinc-300" htmlFor="phone">
                Phone :
              </label>
              <input
                onChange={handleChange}
                className="flex-[2] cursor-not-allowed rounded border-none bg-zinc-700 px-3 py-2 text-base outline-none focus:border-zinc-500"
                type="tel"
                disabled
                placeholder={props.carryPropsData.phone}
                name="phone"
                value={formData.phone}
              />
            </div>
            <div className="flex items-center justify-between gap-5">
              <label className="w-20 text-right text-zinc-300" htmlFor="email">
                Email :
              </label>
              <input
                onChange={handleChange}
                className="flex-[2] cursor-not-allowed rounded border-none bg-zinc-700 px-3 py-2 text-base outline-none focus:border-zinc-500"
                type="email"
                disabled
                placeholder={props.carryPropsData.email}
                name="email"
                value={formData.email}
              />
            </div>
            <div className="flex items-center justify-between gap-5">
              <label
                className="w-20 text-right text-zinc-300"
                htmlFor="address"
              >
                Address :
              </label>
              <input
                onChange={handleChange}
                className="w-full flex-[2] rounded border-none bg-zinc-800 px-3 py-2 text-base outline-none focus:border-zinc-500"
                type="text"
                placeholder={props.carryPropsData.address}
                name="address"
                value={formData.address}
              />
            </div>
            <div className="flex items-center justify-between gap-5">
              <label className="w-20 text-right text-zinc-300" htmlFor="city">
                City :
              </label>
              <input
                onChange={handleChange}
                className="flex-[2] rounded border-none bg-zinc-800 px-3 py-2 text-base outline-none focus:border-zinc-500"
                type="text"
                placeholder={props.carryPropsData.city}
                name="city"
                value={formData.city}
              />
            </div>
            <div className="flex items-center justify-between gap-5">
              <label
                className="w-20 text-right text-zinc-300"
                htmlFor="pincode"
              >
                Pincode :
              </label>
              <input
                onChange={handleChange}
                className="flex-[2] rounded border-none bg-zinc-800 px-3 py-2 text-base outline-none focus:border-zinc-500"
                type="text"
                placeholder={props.carryPropsData.pincode}
                name="pincode"
                value={formData.pincode}
              />
            </div>
            <div className="flex items-center justify-between gap-5">
              <label className="w-20 text-right text-zinc-300" htmlFor="dob">
                D.O.B. :
              </label>
              <input
                onChange={(e) => {
                  handleChange(e);
                  calculateAge(e);
                }}
                className="w-full flex-[2] rounded border-none bg-zinc-800 px-3 py-2 text-base outline-none focus:border-zinc-500"
                type="date"
                placeholder={props.carryPropsData.dob}
                name="dob"
                value={formData.dob}
              />
            </div>
            <div className="flex items-center justify-between gap-5">
              <label className="w-20 text-right text-zinc-300" htmlFor="age">
                Age :
              </label>
              <input
                onChange={handleChange}
                className="flex-[2] cursor-not-allowed rounded border-none bg-zinc-700 px-3 py-2 text-base outline-none focus:border-zinc-500"
                type="text"
                disabled
                placeholder={props.carryPropsData.age}
                name="age"
                value={formData.age}
              />
            </div>
          </form>
          <div className="flex gap-10">
            <button
              onClick={() => {
                props.setShowUpdateModal(false);
              }}
              className="flex items-center justify-between gap-2 rounded border-l-2 border-t-2 border-orange-50 border-opacity-70 bg-red-700 px-4 py-2 text-xl hover:bg-red-800"
            >
              Cancel
              <img src={cancelIcon} className="h-6 invert" alt="cancel" />
            </button>
            <button
              onClick={async () => {
                await updateEntry();
                await props.setShowUpdateModal(false);
              }}
              className="flex items-center justify-between gap-2 rounded border-l-2 border-t-2 border-orange-50 border-opacity-70 bg-sky-700 px-4 py-2 text-xl hover:bg-sky-800"
            >
              Save
              <img src={saveIcon} className="h-[1.3rem] invert" alt="delete" />
            </button>
          </div>
        </fieldset>

        {/* For Close Button */}
        <button
          onClick={() => {
            props.setShowUpdateModal(false);
          }}
          className="absolute right-0 top-2 mr-2 rounded border-zinc-300 bg-zinc-700 px-[0.6rem] py-0 text-3xl outline-none"
        >
          &times;
        </button>
      </div>

      {/* For Background Blur */}
      <div
        onClick={() => {
          {
            /*props.setShowUpdateModal(false)*/
          }
        }}
        className="fixed inset-0 left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 backdrop-blur"
      ></div>
    </>
  );
}

export default UpdateModal;
