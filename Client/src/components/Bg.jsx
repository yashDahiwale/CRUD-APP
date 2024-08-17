import React from "react";
import bgMain from "../assets/bgMain.jpeg";

function BG() {
  return (
    <img
      className="fixed -z-10 h-full w-full object-cover object-center opacity-80"
      src={bgMain}
      alt="Backgroung-Img"
    />
  );
}

export default BG;
