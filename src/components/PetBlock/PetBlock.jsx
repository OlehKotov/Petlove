import React from 'react'
import css from "./PetBlock.module.css";

const PetBlock = ({src, alt, className}) => {
  return (
    <div>
        <img src={src} alt={alt} className={className}/>
    </div>
  )
}

export default PetBlock