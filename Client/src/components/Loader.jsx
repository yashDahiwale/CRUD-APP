import React, { useEffect, useState } from "react";

function Loader() {
  const [loading, setLoading] = useState(false);

  // Loader
  if (loading) {
    function loadingFunc() {
      document.getElementById("loader").classList.add("hidden");
    }
    loadingFunc();
  }

  // For Laptop/Desktop
  window.onload = () => {
    setLoading(true);
  };

  // For Mobile/Tablets
  if (window.innerWidth <= 768) {
    useEffect(() => {
      setTimeout(() => {
        setLoading(true);
      }, 500);
    }, []);
  }

  return (
    <div
      id="loader"
      className="fixed z-[1000] grid h-full w-full place-items-center bg-black"
    >
      <span className="text-center text-3xl">Loading...</span>
    </div>
  );
}

export default Loader;
