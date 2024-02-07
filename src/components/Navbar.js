import React, { useState } from 'react'
import logo from "../assets/logo.png"
import footernav from "../assets/footernav.png"
import { Link, useNavigate } from 'react-router-dom'
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import { useAmount } from '../context/Contex';
import menuu from "../assets/menu.png"
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import add from "../assets/addmoney.png"
// import { CgProfile } from "react-icons/cg";
const Navbar = () => {
    const [click, setclick] = useState(false)
    const [clickmodal, setclickmodal] = useState(false)
    const [clickmodalsignup, setclickmodalsignup] = useState(false)
    const [menu, setmenu] = useState(false)
    const { amount } = useAmount()
    const location = useNavigate()
    return (
        <div style={{ boxShadow: "0px 1px 8px grey" }} className=''>
            <div className='bg-white text-black h-[50px] md:flex ' >
                <div className='absolute top-2 text-2xl left-1 md:hidden' onClick={() => setclick(!click)}>
                    {
                        click ? <ImCross className='text-lg' /> : <GiHamburgerMenu />
                    }
                </div>
                <img className='w-[150px]  h-10 pl-8 pt-3 pb-2' src={logo} alt="" />
                <div className={`flex flex-col  mt-[8px] w-[100vw] h-[90vh] ${!click ? "left-[-100%]" : "left-0"} absolute z-10  bg-white items-center text-black md:relative md:flex-row md:w-0 md:z-0 md:h-auto md:left-0 md:ml-[15%] lg:ml-[25%]`} style={{ transition: "ease-in 0.2s" }}>
                    <div className='flex flex-col md:flex-row'>
                        <Link className='ml-4 py-2 font-semibold' to={"/"}>Home</Link>
                        <hr className='w-[100vw] md:hidden' />
                        <Link className='ml-4 py-2 font-semibold' to={"/about"} >Company</Link>
                        <hr className='w-[100vw] md:hidden' />
                        <Link className='ml-4 py-2 font-semibold md:w-[180px]' to={"/about"} >Investors Relation</Link>
                        <hr className='w-[100vw] md:hidden' />
                        <Link className='ml-4 py-2 font-semibold' to={"/about"} >Career</Link>
                        <hr className='w-[100vw] md:hidden' />
                    </div>
                    <div className='md:absolute md:bottom-0 md:visible md:h-[5vh] md:z-10 mb-0'>
                        <img src={footernav} className={`w-[100vw] absolute ${click ? "visible" : "hidden"} bottom-0 left-0 md:absolute md:bottom-0 md:visible md:h-[5vh]`} alt="" />
                    </div>
                </div>
                {
                    localStorage.getItem('token') ?

                        <div className={`flex md:bg-[#00baf2] md:w-[130px] h-8 mt-1 pl-2 rounded-full absolute top-0 right-2 ${click ? "hidden" : "visible"} md:visible`}>
                            <Link className='pt-0 mt-2 text-[13px] text-white md:visible '>Hi {amount.name}</Link>
                            {/* <CgProfile className='ml-1 text-3xl mt-[2px]' /> */}
                            <img src="https://pwebassets.paytm.com/commonwebassets/paytmweb/header/images/loginImg.svg" className={`ml-6 text-3xl mt-[2px] hover:`} onClick={() => setmenu(!menu)} alt="" />
                        </div>
                        :
                        <div className={`flex bg-[#00baf2] w-[110px] h-8 mt-1 pl-2 rounded-full absolute top-0 right-2 ${click ? "hidden" : "visible"} md:visible`}>
                            <Link onClick={() => { setclickmodal(!clickmodal) }} className='pt-0 mt-2 text-[13px] text-white'>Sign in</Link>
                            {/* <CgProfile className='ml-1 text-3xl mt-[2px]' /> */}
                            <img src="https://pwebassets.paytm.com/commonwebassets/paytmweb/header/images/loginImg.svg" className='ml-4 text-3xl mt-[2px]' alt="" />
                        </div>

                }
                {
                    clickmodal ? <div className={`${!clickmodal ? "hidden" : "visible"} ${clickmodal ? (document.body.style.background = "grey") : document.body.style.background = "white"}  mt-9`}>
                        <Login clickmodal={clickmodal} setclickmodal={setclickmodal} clickmodalsignup={clickmodalsignup} setclickmodalsignup={setclickmodalsignup} />
                    </div>
                        :
                        <div className={`${!clickmodalsignup ? "hidden" : "visible"} ${clickmodalsignup ? (document.body.style.background = "grey"  ) : (document.body.style.background = "white")}  `}>
                            <Signup clickmodalsignup={clickmodalsignup} setclickmodalsignup={setclickmodalsignup} clickmodal={clickmodal} setclickmodal={setclickmodal} />
                        </div>
                }
            </div>
            <div className={`flex flex-col  mt-[8px] w-[100vw] h-[90vh] ${!menu ? "left-[-100%]" : "left-0"} absolute z-20  bg-white items-center  text-black   md:w-[304px] md:rounded-md md:${menu ? "visible" : "hidden"} md:h-auto md:left-[60%] lg:left-[70%] md:right-3 md:border md:border-slate-500 md:p-1`} style={{ transition: "ease-in 0.2s", boxShadow: "1px 2px -3px black" }}>
                <div className='flex flex-col '>
                    <div className='absolute left-3   ' >
                        <div className='flex flex-col  md:visible '>
                            <div className='flex flex-row'><MdOutlineAccountBalanceWallet className=' text-blue-800'/><span className='text-slate-500 mt-[-5px]'> wallet balance</span></div>
                            <div className='font-bold'>Rs. {localStorage.getItem("balance")}</div>
                            <div></div>
                        </div>
                        <div>
                           <Link to={"/addmoney"}><img src={add} className='absolute right-[-80%] top-[10%]' alt="" /></Link> 
                        </div>
                    </div>
                    <img src={menuu} className="md:hidden h-16 " alt="" />
                    <h1 className="md:hidden text-center uppercase">{amount.name}</h1>
                    <hr className=''/>
                    <Link className='ml-4 py-2 font-semibold md:mt-12' to={"/"}>Home</Link>
                    <hr className='w-[100vw] md:hidden' />
                    <Link className='ml-4 py-2 font-semibold' to={"/about"} >Company</Link>
                    <hr className='w-[100vw] md:hidden' />
                    <Link className='ml-4 py-2 font-semibold' to={"/about"} >Company</Link>
                    <hr className='w-[100vw] md:hidden' />
                    <Link className='ml-4 py-2 font-semibold' to={"/about"} >Company</Link>
                    <hr className='w-[100vw] md:hidden' />
                    <Link className='ml-4 py-2 font-semibold' to={"/about"} >Company</Link>
                    <hr className='w-[100vw] md:hidden' />
                    <Link className='ml-4 py-2 font-semibold md:w-[180px]' to={"/about"} >Investors Relation</Link>
                    <hr className='w-[100vw] md:hidden' />
                    <Link className='ml-4 py-2 font-semibold' onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('amount'); localStorage.removeItem('balance');localStorage.removeItem('username');setmenu(!menu); location("/login") }} >Logout</Link>
                    <hr className='w-[100vw] md:hidden' />
                </div>
                <div className='md:absolute md:bottom-0 md:visible md:h-[5vh] md:z-10 mb-0'>
                    <img src={footernav} className={`w-[100vw] absolute ${menu ? "visible" : "hidden"} bottom-0 left-0 md:absolute md:bottom-0 md:visible md:h-[5vh]`} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Navbar