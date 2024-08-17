import axios from "axios";
import React, { useEffect, useState } from "react";

// Import Components
import Alert from "./Alert";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";

// Icons
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import tableIcon from "../assets/table.svg";
import loadingIcon from "../assets/loading-icon.gif";

function DataTable(props) {
  // State Variables
  const [allData, setAllData] = useState();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [isAlert, setIsAlert] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");

  const [dataMessage, setDataMessage] = useState(
    <img src={loadingIcon} className="m-auto w-16"></img>
  );

  const [carryPropsData, setCarryPropsData] = useState();

  // Get Data From Database
  const fetchData = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:9000/fetchAllData",
      });
      setAllData(response.data.response);
      setDataMessage(response.data.message);
    } catch (error) {
      console.log("Unable to get data!");
      setDataMessage("Unable To Get Data From Database!");
    }
  };

  // Live Reload
  useEffect(() => {
    fetchData();
  }, [props.isLiveReload]);

  // Table Row For Existing And Newly Added Data
  const tableRowData = (props, index) => {
    return (
      <tr key={props._id}>
        <td className="border-collapse border p-2 text-center">{index + 1}</td>
        <td className="border-collapse text-nowrap border p-2">{props.name}</td>
        <td className="border-collapse border p-2">{props.email}</td>
        <td className="border-collapse border p-2">{props.age}</td>
        <td className="border-collapse border p-2">{props.gender}</td>
        <td className="border-collapse border p-2">{props.phone}</td>
        <td className="border-collapse border p-2">{props.address}</td>
        <td className="border-collapse border p-2">{props.city}</td>
        <td className="border-collapse border p-2">{props.pincode}</td>
        <td className="border-collapse text-nowrap border p-2">{props.dob}</td>
        <td className="border-collapse border p-2">
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                setShowUpdateModal(true);
                setCarryPropsData(props);
              }}
              className="flex items-center justify-center gap-1 rounded border-l-2 border-t-2 border-orange-50 border-opacity-70 bg-sky-700 px-3 py-2 hover:bg-sky-800"
            >
              Edit
              <img
                src={editIcon}
                className="h-5 select-none invert"
                alt="edit"
              />
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setCarryPropsData(props);
              }}
              className="flex items-center justify-center gap-1 rounded border-l-2 border-t-2 border-orange-50 border-opacity-70 bg-red-700 px-3 py-2 hover:bg-red-800"
            >
              Delete
              <img
                src={deleteIcon}
                className="h-5 select-none invert"
                alt="delete"
              />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      {allData ? (
        <>
          <div className="" style={{ width: "min(90%, 1200px)" }}>
            <h3 className="mb-5 flex w-full items-center justify-center gap-5 rounded border-2 border-orange-50 bg-[#71717a9f] p-3 text-center text-4xl font-[500] tracking-wider shadow-md backdrop-blur backdrop-filter">
              Data Table
              <img
                src={tableIcon}
                className="h-9 select-none invert"
                alt="table"
              />
            </h3>
            <div className="flex flex-col items-center space-y-5 table:items-start table:overflow-x-scroll">
              <table className="bg-violet-00 w-full bg-zinc-400 bg-opacity-10 backdrop-blur backdrop-filter">
                <thead className="bg-zinc-900">
                  <tr className="text-lg font-[500]">
                    <td className="border-collapse border p-2">#</td>
                    <td className="border-collapse border p-2">Name</td>
                    <td className="border-collapse border p-2">Email</td>
                    <td className="border-collapse border p-2">Age</td>
                    <td className="border-collapse border p-2">Gender</td>
                    <td className="border-collapse border p-2">Phone</td>
                    <td className="border-collapse border p-2">Address</td>
                    <td className="border-collapse border p-2">City</td>
                    <td className="border-collapse border p-2">Pincode</td>
                    <td className="border-collapse border p-2">
                      Date of Birth
                    </td>
                    <td className="border-collapse border p-2">Actions</td>
                  </tr>
                </thead>
                <tbody>{allData.map(tableRowData)}</tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <h3 className="text-center text-2xl text-red-400 underline underline-offset-4">
          {dataMessage}
        </h3>
      )}
      {isAlert ? (
        <Alert alertMessage={alertMessage} setIsAlert={setIsAlert} />
      ) : null}
      {showDeleteModal ? (
        <DeleteModal
          autoLiveReload={props.autoLiveReload}
          carryPropsData={carryPropsData}
          setShowDeleteModal={setShowDeleteModal}
          setIsAlert={setIsAlert}
          setAlertMessage={setAlertMessage}
        />
      ) : null}

      {showUpdateModal ? (
        <UpdateModal
          autoLiveReload={props.autoLiveReload}
          carryPropsData={carryPropsData}
          setShowUpdateModal={setShowUpdateModal}
          setIsAlert={setIsAlert}
          setAlertMessage={setAlertMessage}
        />
      ) : null}
    </div>
  );
}

export default DataTable;
