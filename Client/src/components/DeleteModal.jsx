import React from "react";
import axios from "axios";

// Icons
import cancelIcon from "../assets/cancel.svg";
import deleteIcon from "../assets/delete.svg";

function DeleteModal(props) {
  // Show Alert
  const handleAlert = () => {
    setTimeout(() => {
      props.setIsAlert(false);
    }, 5000);
  };

  // Delete Data From Data Table
  const deleteEntry = async (id) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `http://localhost:9000/delete/${id}`,
      });
      if (response.status === 200) {
        props.setIsAlert(true);
        handleAlert();
        props.setAlertMessage(response.data.message);
        props.autoLiveReload();
      } else {
        throw "Unable to delete data";
      }
    } catch (error) {
      props.setAlertMessage(error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 left-1/2 top-1/2 z-[99] flex h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-10 rounded-md border border-zinc-50 bg-zinc-900 px-5 py-10 text-center shadow-md sm:h-[40%] sm:w-5/6">
        <span className="text-3xl sm:text-2xl leading-relaxed tracking-wide">
          Do you want to delete the data with the name "
          <span className="text-red-500 underline underline-offset-4">
            {props.carryPropsData.name}
          </span>
          "?
        </span>
        <div className="flex gap-10 sm:gap-5">
          <button
            onClick={() => {
              props.setShowDeleteModal(false);
            }}
            className="flex items-center justify-between gap-2 rounded border-l-2 border-t-2 border-orange-50 border-opacity-70 bg-sky-700 px-4 py-2 text-xl hover:bg-sky-800 sm:text-lg"
          >
            Cancel
            <img src={cancelIcon} className="h-6 sm:h-5 invert" alt="cancel" />
          </button>
          <button
            onClick={() => {
              deleteEntry(props.carryPropsData._id);
              props.setShowDeleteModal(false);
            }}
            className="flex items-center justify-between gap-2 rounded border-l-2 border-t-2 border-orange-50 border-opacity-70 bg-red-700 px-4 py-2 text-xl hover:bg-red-800 sm:text-lg"
          >
            Delete
            <img src={deleteIcon} className="h-6 sm:h-5 invert" alt="delete" />
          </button>
        </div>
        <button
          onClick={() => {
            props.setShowDeleteModal(false);
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
            /*props.setShowDeleteModal(false)*/
          }
        }}
        className="fixed inset-0 left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 backdrop-blur"
      ></div>
    </>
  );
}

export default DeleteModal;
