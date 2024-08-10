import axios from 'axios'
import React, { useEffect, useState } from 'react'

// Import Components
import Alert from './Alert';
import DeleteModal from './DeleteModal';

// Icons
import editIcon from "../assets/edit.svg"
import deleteIcon from "../assets/delete.svg"
import tableIcon from "../assets/table.svg"
import UpdateModal from './UpdateModal';

function DataTable(props) {

  // State Variables
  const [allData, setAllData] = useState();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [isAlert, setIsAlert] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");

  const [dataMessage, setDataMessage] = useState();

  const [carryPropsData, setCarryPropsData] = useState();

  // Get Data From Database
  const fetchData = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:9000/fetchAllData"
      })
      setAllData(response.data.response);
      setDataMessage(response.data.message);
    } catch (error) {
      console.log("Unable to get data!");
    }
  }

  // Live Reload
  useEffect(() => {
    fetchData();
  }, [props.isLiveReload]);

  // Table Row For Existing And Newly Added Data
  const tableRowData = (props, index) => {
    return (
      <tr key={props._id}>
        <td className='p-2 border border-collapse text-center'>{index + 1}</td>
        <td className='p-2 border border-collapse text-nowrap'>{props.name}</td>
        <td className='p-2 border border-collapse'>{props.email}</td>
        <td className='p-2 border border-collapse'>{props.age}</td>
        <td className='p-2 border border-collapse'>{props.gender}</td>
        <td className='p-2 border border-collapse'>{props.phone}</td>
        <td className='p-2 border border-collapse'>{props.address}</td>
        <td className='p-2 border border-collapse'>{props.city}</td>
        <td className='p-2 border border-collapse'>{props.pincode}</td>
        <td className='p-2 border border-collapse text-nowrap'>{props.dob}</td>
        <td className='p-2 border border-collapse'>
          <div className='flex gap-2 justify-center'>
            <button onClick={() => { setShowUpdateModal(true); setCarryPropsData(props) }} className='px-3 py-2 bg-sky-700 hover:bg-sky-800 rounded flex items-center justify-center gap-1 border-l-2 border-t-2 border-orange-50 border-opacity-70'>Edit<img src={editIcon} className="h-5 invert select-none" alt="edit" /></button>
            <button onClick={() => { setShowDeleteModal(true); setCarryPropsData(props) }} className='px-3 py-2 bg-red-700 hover:bg-red-800 rounded flex items-center justify-center gap-1 border-l-2 border-t-2 border-orange-50 border-opacity-70'>Delete<img src={deleteIcon} className="h-5 invert select-none" alt="delete" /></button>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <div className='flex flex-col gap-5 items-center justify-center' >
      <div className='flex flex-col items-center space-y-5 ' style={{ width: "min(90%, 1200px)" }}>
        {allData ? <>
          <h3 className='text-4xl text-center w-full p-3 mx-5 mb-5 shadow-md rounded bg-[#71717a9f] border-2 border-orange-50 backdrop-filter backdrop-blur font-[500] tracking-wider flex items-center justify-center gap-5'>Data Table<img src={tableIcon} className="h-9 invert select-none" alt="table" /></h3>
          <table className='bg-violet-00 backdrop-filter backdrop-blur bg-zinc-400 bg-opacity-10 w-full'>
            <thead className='bg-zinc-900'>
              <tr className='text-lg font-[500]'>
                <td className='p-2 border border-collapse'>#</td>
                <td className='p-2 border border-collapse'>Name</td>
                <td className='p-2 border border-collapse'>Email</td>
                <td className='p-2 border border-collapse'>Age</td>
                <td className='p-2 border border-collapse'>Gender</td>
                <td className='p-2 border border-collapse'>Phone</td>
                <td className='p-2 border border-collapse'>Address</td>
                <td className='p-2 border border-collapse'>City</td>
                <td className='p-2 border border-collapse'>Pincode</td>
                <td className='p-2 border border-collapse'>Date of Birth</td>
                <td className='p-2 border border-collapse'>Actions</td>
              </tr>
            </thead>
            <tbody>
              {allData.map(tableRowData)}
            </tbody>
          </table>
        </> : <h3 className='text-2xl text-red-400 underline underline-offset-4'>{dataMessage}</h3>
        }
        {
          isAlert ? <Alert alertMessage={alertMessage} setIsAlert={setIsAlert} /> : null
        }
      </div>
      {showDeleteModal ? <DeleteModal autoLiveReload={props.autoLiveReload} carryPropsData={carryPropsData} setShowDeleteModal={setShowDeleteModal} setIsAlert={setIsAlert} setAlertMessage={setAlertMessage} /> : null}

      {showUpdateModal ? <UpdateModal autoLiveReload={props.autoLiveReload} carryPropsData={carryPropsData} setShowUpdateModal={setShowUpdateModal} setIsAlert={setIsAlert} setAlertMessage={setAlertMessage} /> : null}
    </div>
  )
}

export default DataTable