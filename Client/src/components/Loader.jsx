import React from 'react'

function Loader() {

    // Loader
    window.onload = () => {
        const loader = document.getElementById("loader");
        loader.style.display = "none";
    }

    return (
        <div id="loader" className="h-full w-full z-[1000] bg-black fixed grid place-items-center">
            <span className="text-center text-3xl">Loading...</span>
        </div>
    )
}

export default Loader
