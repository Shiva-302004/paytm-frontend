import React, { useState } from 'react'
import img from "../assets/banner.png"
import img1 from "../assets/paymentbank.png"
import { useAmount } from '../context/Contex'
import { Link } from 'react-router-dom'
import { FaRupeeSign } from "react-icons/fa";
import { ImCross } from 'react-icons/im'
// const defaultdata={upipin:""}
const AddMoney = () => {
    const {amount}=useAmount()
    const [deposit,setdeposit]=useState({deposit:0,upipin:""})
    const [modal,setmodal]=useState(false)
    const [modalimage,setmodalimage]=useState(false)
    const [balance,setbalance]=useState("")
    const [balanced,setbalanced]=useState()
    const onChange=(e)=>{
        setdeposit({...deposit,[e.target.name]:e.target.value})
        // console.log(deposit)
        setbalanced(deposit.deposit)
    }
    const handleclick=()=>{
        fetch("https://paytm-backend-br8r.onrender.com/api/auth/transaction/addmoney",{
            method:"POST",
            headers:{
                token:localStorage.getItem('token'),
                "Content-Type":"application/json"
            },
            body:JSON.stringify(deposit)
        }).then((res)=>res.json()).then((data)=>{
            // console.log(data)
            if(data.success){
                setmodal(!modal)
                setdeposit({...deposit,upipin:"",deposit:0})
                setbalance(data.data.amount)
                localStorage.setItem("balance",data.data.amount)
                setmodalimage(!modalimage)
            }
        })
    }
  return (
    <div>
        <img src={img} className='absolute top-10 right-0 h-[100px] md:auto' alt=""></img>
        <img src={img1} className='absolute top-12 left-0 md:left-[25%] ' alt=""></img>
        <div className='flex flex-col justify-center  mt-[10vh] ml-2'>
            <h1 className='font-semibold text-xl'>Add Money to the wallet</h1>
            <div className='mt-2'>Available Balance : Rs. {localStorage.getItem("balance")}</div>
            <FaRupeeSign className='absolute mt-20'/>
            <input className='border-b-2 border-grey w-[90vw] md:w-[90vw] mt-4 focus:border-none py-2 px-6 text-blue-300' placeholder='Enter Amount' type="number" name='deposit' value={deposit.deposit} onChange={onChange}/>
            
        </div>
        <Link className="bg-[#00b9f5] w-[93vw] md:w-[96vw] absolute bottom-0 h-[10vh] text-center text-white  ml-3" onClick={()=>setmodal(!modal)}>
            <div className='mt-3'>Add Money</div>
        </Link>
        <div className={`absolute   z-20 bg-yellow-50 p-2 h-[100vh] w-[100vw] top-0 text-center md:w-[60vw] md:h-[90vh] md:top-12 md:left-[20%] ${modal?"visible":"hidden"}`}>
            <ImCross className='text-black' onClick={()=>setmodal(!modal)}></ImCross>
            <input className='border-b-2 border-grey w-[90vw] md:w-[50vw] mt-4 focus:border-none py-2 px-6 text-blue-300 md:mt-36' disabled type="number" value={deposit.deposit}/>
            <input className='border-b-2 border-grey w-[90vw] md:w-[50vw] mt-4 focus:border-none py-2 px-6 text-blue-300'type="text" placeholder='enter upi pin' name="upipin" value={deposit.upipin} onChange={onChange}/>
            <Link className="bg-[#00b9f5] w-[93vw] md:w-[50vw]  absolute right-4 bottom-10 h-[10vh] text-center text-white  ml-3 md:left-8" onClick={handleclick}>
            <div className='mt-3' >Deposit money</div>
        </Link>
        </div>
        <div className={`absolute   z-20 bg-yellow-50 p-2 h-[100vh] w-[100vw] top-0 text-center md:w-[60vw] md:h-[90vh] md:top-12 md:left-[20%] ${modalimage?"visible":"hidden"}`}>
            <ImCross className='text-black' onClick={()=>setmodalimage(!modalimage)}></ImCross>
            <input className='text-center border-grey w-[90vw] md:w-[50vw] mt-4 focus:border-none py-2 px-6 text-blue-300 md:mt-36' disabled type="number" value={balanced}/>
            <h2> Money deposited successfully</h2>
        </div>
    </div>
  )
}

export default AddMoney