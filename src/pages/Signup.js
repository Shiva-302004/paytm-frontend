import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CiLock } from "react-icons/ci";
import { MdArrowForwardIos } from "react-icons/md";
// import image from "../assets/footerlogin.png"
import { ImCross } from 'react-icons/im';
const Signup = (props) => {
  const location=useNavigate()
  const [login, setlogin] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    upipin: ""
  })
  const onChange = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value })
    // console.log(login)
  }
  const handleclick = () => {
    fetch("https://paytm-backend-br8r.onrender.com/api/auth/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(login)
    }).then(data => data.json()).then((data) => {
      // console.log(data)
      if (data.success) {
        localStorage.setItem("token", data.token)
        localStorage.setItem('amount',JSON.stringify(data))
        props.setclickmodalsignup(!props.clickmodalsignup)
        location("/hi")
      } else {
        console.log("something went wrong")
      }
    })
  }
  return (
    <div className='z-20 absolute bg-yellow-50  border border-blue-50 h-[100vh] w-[100vw] top-0 md:absolute md:h-[80vh] md:top-[20%] md:left-[25%] md:w-[60vw]' style={{ boxShadow: "2px 2px 3px grey" }}>
      <div className=' absolute right-1 mt-1 mr-1 '>
        <ImCross onClick={() => props.setclickmodalsignup(!props.clickmodalsignup)} />
      </div>
      <div className='flex flex-col justify-center  p-4 mt-[30px] md:mt-0'>
        <h1 className='font-bold'>SignUp with your Paytm account</h1>
        <input type="text" required name='name' placeholder='Enter name' value={login.name} onChange={onChange} className='border border-grey w-[80vw] md:w-[50vw] mt-4 focus:border-none p-2 text-blue-300' />
        <input type="text" required name='email' placeholder='Enter Email ' value={login.email} onChange={onChange} className='border border-grey w-[80vw] md:w-[50vw] mt-4 focus:border-none p-2 text-blue-300' />
        <input type="password" required name='password' placeholder='Enter password' value={login.password} onChange={onChange} className='border border-grey w-[80vw] md:w-[50vw] mt-4 focus:border-none p-2 text-blue-300' />
        <input type="text" required name='phone' placeholder='Enter phone number' value={login.phone} onChange={onChange} className='border border-grey w-[80vw] md:w-[50vw] mt-4 focus:border-none p-2 text-blue-300' />
        <input type="text" required name='upipin' placeholder='Enter upipin' value={login.upipin} onChange={onChange} className='border border-grey w-[80vw] md:w-[50vw] mt-4 focus:border-none p-2 text-blue-300' />
        <div className='mt-3 flex '>
          <Link onClick={handleclick} className='bg-[#00b9f5] text-white w-[80vw] md:w-[50vw] p-2 text-center flex justify-center'><CiLock className="mt-1 mr-2" /><span className='text-[16px] ' >Signin securely</span><MdArrowForwardIos className="mt-1 ml-2 " /></Link>
          <span className='text-[#00b9f5] w-[20vw] ml-2'>forgot password</span>
        </div>
        <span className='mt-3 text-[15px]'>By signing in, you agree to our <span className='text-[#00b9f5] '>privacy policy </span> and <span className='text-[#00b9f5]'> terms of use</span></span>
        <span className='mt-3 text-[15px]'>Already have an account ? <Link onClick={() => { props.setclickmodalsignup(!props.clickmodalsignup); props.setclickmodal(!props.clickmodal) }} className='text-[#00b9f5]'> Sign In</Link></span>
      </div>
      {/* <div className=' bottom-0 fixed '><img className='w-[100vw] md:h-[10vh]' src={image} alt="" /></div> */}
    </div>
  )
}

export default Signup