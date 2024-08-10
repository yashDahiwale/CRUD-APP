import React from 'react'
import axios from "axios"

// Icons
import cancelIcon from "../assets/cancel.svg"
import deleteIcon from "../assets/delete.svg"

function DeleteModal(props) {

  // Show Alert
  const handleAlert = () => {
    setTimeout(() => {
      props.setIsAlert(false);
    }, 5000);
  }

  // Delete Data From Data Table
  const deleteEntry = async (id) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `http://localhost:9000/delete/${id}`
      })
      if (response.status === 200) {
        props.setIsAlert(true)
        handleAlert();
        props.setAlertMessage(response.data.message);
        props.autoLiveReload();
      } else {
        throw ("Unable to delete data")
      }
    } catch (error) {
      props.setAlertMessage(error)
    }
  }

  return (
    <>
      <div className='h-[300px] w-[500px] z-[99] text-center py-10 px-5 bg-zinc-900 border border-zinc-50 shadow-md rounded-md fixed flex gap-10 flex-col items-center justify-center inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <span className='text-3xl tracking-wide leading-relaxed'>Do you want to delete the data with the name "<span className='text-red-500 underline underline-offset-4'>{props.carryPropsData.name}</span>"?</span>
        <div className='flex gap-10'>
          <button onClick={() => { props.setShowDeleteModal(false) }} className='px-4 py-2 text-xl rounded bg-sky-700 hover:bg-sky-800 flex items-center justify-between gap-2 border-l-2 border-t-2 border-orange-50 border-opacity-70'>Cancel<img src={cancelIcon} className="h-6 invert" alt="cancel" /></button>
          <button onClick={() => { deleteEntry(props.carryPropsData._id); props.setShowDeleteModal(false) }} className='px-4 py-2 text-xl rounded  bg-red-700 hover:bg-red-800 flex items-center justify-between gap-2 border-l-2 border-t-2 border-orange-50 border-opacity-70'>Delete<img src={deleteIcon} className="h-6 invert" alt="delete" /></button>
        </div>
        <button onClick={() => { props.setShowDeleteModal(false) }} className="border-zinc-300 absolute top-2 right-0 outline-none py-0 px-[0.6rem] rounded mr-2 text-3xl bg-zinc-700">&times;</button>
      </div>

      {/* For Background Blur */}
      <div onClick={() => { { /*props.setShowDeleteModal(false)*/ } }} className='h-full w-full fixed inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex backdrop-blur'></div>
    </>
  )
}

export default DeleteModal
