import React from 'react'
import bgMain from "../assets/bgMain.jpeg"

function BG() {
  return (
    <img className="fixed -z-10 object-cover object-center h-full w-full opacity-80" src={bgMain} alt="Backgroung-Img" />
  )
}

export default BG
