import React, { useState } from 'react'
// import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CiLock } from "react-icons/ci";
import { MdArrowForwardIos } from "react-icons/md";
import image from "../assets/footerlogin.png"
import { ImCross } from 'react-icons/im';
import { useAmount } from '../context/Contex';
const Login = (props) => {
  // const location = useNavigate()
  const { amount, setamount } = useAmount()
  const [login, setlogin] = useState({
    emailphone: "",
    password: ""
  })
  const onChange = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value })
    // console.log(login)
  }
  const handleclick = (e) => {
    e.preventDefault()
    fetch("https://paytm-backend-br8r.onrender.com/api/auth/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(login)
    }).then(data => data.json()).then((data) => {
      // console.log(data)
      if (data.success) {
        localStorage.setItem("token", data.token)
        props.setclickmodal(!props.clickmodal)
        setamount({ ...amount, name: data.name, id: data._id, price: data.amount })
        localStorage.setItem('amount', JSON.stringify(data))
        localStorage.setItem('balance',data.amount)
        // console.log(amount)
      } else {
        console.log("something went wrong")
      }
    })
  }
  return (
    <div className='absolute z-20  bg-yellow-50  border border-blue-50 h-[100vh] w-[100vw] top-0 md:absolute md:h-[60vh] md:top-[20%] md:left-[25%] md:w-[60vw]' style={{ boxShadow: "2px 2px 3px grey" }}>
      <div className=' absolute mt-1 mr-1 right-1 '>
        <ImCross onClick={() => props.setclickmodal(!props.clickmodal)} />
      </div>
      <div className='flex flex-col justify-center  p-4 mt-[30px] md:mt-0'>
        <h1 className='font-bold'>Login with your Paytm account</h1>
        <input type="text" required name='emailphone' placeholder='Enter Email/ Phone Number' value={login.emailphone} onChange={onChange} className='border border-grey w-[80vw] md:w-[50vw] mt-4 focus:border-none p-2 text-blue-300' />
        <input type="password" required name='password' placeholder='Enter password' value={login.password} onChange={onChange} className='border border-grey w-[80vw] md:w-[50vw] mt-4 focus:border-none p-2 text-blue-300' />
        <div className='mt-3 flex '>
          <Link onClick={handleclick} className='bg-[#00b9f5] text-white w-[80vw] md:w-[50vw] p-2 text-center flex justify-center'><CiLock className="mt-1 mr-2" /><span className='text-[16px] ' >Signin securely</span><MdArrowForwardIos className="mt-1 ml-2 " /></Link>
          <span className='text-[#00b9f5] w-[20vw] ml-2'>forgot password</span>
        </div>
        <span className='mt-3 text-[15px]'>By signing in, you agree to our <span className='text-[#00b9f5] '>privacy policy </span> and <span className='text-[#00b9f5]'> terms of use</span></span>
        <span className='mt-3 text-[15px]'>Dont have an account ? <Link onClick={() => { props.setclickmodalsignup(!props.clickmodalsignup); props.setclickmodal(!props.clickmodal) }} className='text-[#00b9f5]'> SignUp</Link></span>
      </div>
      <div className=' bottom-0 absolute '><img className='w-[0vw] md:h-[10vh] md:w-[100vw]' src={image} alt="" /></div>
    </div>
  )
}

export default Login