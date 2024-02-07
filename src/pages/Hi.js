import React from 'react'
import { useAmount } from '../context/Contex'

const Hi = () => {
    const {amount}=useAmount()
  return (
    
    <div className='text-center'>{localStorage.getItem("token")?`Hi ${amount.name}`:"please signin"}</div>
  )
}

export default Hi