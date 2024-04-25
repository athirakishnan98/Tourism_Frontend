import React from 'react';
import './Button.css'

function Button({children='Click', onClick, className,color}) {
  return (
    <button style={{backgroundColor:color}} className={`btn ${className}`} onClick={onClick}>{children}</button>
  )
}

export default Button