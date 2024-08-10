import React from 'react'

function Alert(props) {
    return (
        <div className="alert fixed z-[100] top-4 right-5 bg-zinc-600 border border-orange-50 rounded-md transition-transform">
            <div className='flex items-center justify-between'>
                <span className="text-lg relative px-4 py-3">{props.alertMessage}</span>
                <button onClick={()=>{props.setIsAlert(false)}} className="border-zinc-300 outline-none py-0 px-[0.6rem] rounded mr-2 text-3xl hover:bg-zinc-700">&times;</button>
            </div>
        </div>
    )
}

export default Alert
