import React from 'react'
import css from "./PetBlock.module.css";

const PetBlock = ({src, alt}) => {
  return (
    <div>
        <img src={src} alt={alt} className={css.image}/>
    </div>
  )
}

export default PetBlock