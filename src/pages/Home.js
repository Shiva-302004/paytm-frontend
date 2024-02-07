import React, { useEffect, useState } from 'react'
// import { useAmount } from '../context/Contex'
import { LuUpload } from "react-icons/lu";
import { Link } from 'react-router-dom';
const Home = () => {
  // const { amount } = useAmount()
  const [user, setuser] = useState([])
  const [search,setsearch]=useState("")
  const getuser = () => {
    fetch("https://paytm-backend-br8r.onrender.com/api/auth/user/alluser", {
      method: "GET",
      headers: {
        token: localStorage.getItem('token')
      }
    }).then(res => res.json()).then((data) => {
      setuser(data.data)
      // console.log(data.data)
    })
  }
  useEffect(() => {
    if(localStorage.getItem("token")){
      getuser()
    }
  }, [])
  const onChange=(e)=>{
    setsearch(e.target.value)
    // console.log(search)
  }
  const searchuser=()=>{
      fetch(`https://paytm-backend-br8r.onrender.com/api/auth/user/allusers/${search}`,{
        method: "GET",
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(res=>res.json()).then((data)=>setuser(data.data))
  }
  useEffect(()=>{
    if(search.length>=0){
      searchuser()
    }
  },[search.length])
  return (
    <>
    {
      localStorage.getItem('token')?
      <div>
        <input type="text" name='search' value={search} className='border border-grey w-[80vw] md:w-[50vw] mt-4 focus:border-none p-2 text-blue-300 ml-[10%] md:ml-[15%] ' onChange={onChange}/>
      </div>
      :
      <div>please signin</div>
    }
      <div className=' flex flex-col mt-16'>
        {
           user.length>0?user.map((item)=>{

        return <div className='flex justify-evenly w-[90vw] h-[60px] pt-3 ml-3 mt-3' key={item._id} style={{boxShadow:"2px 2px 4px grey"}}>
          <h4 className='uppercase text-xl'>{item.name}</h4>
          <h6 className='text-xl'> {item.phone}</h6>
          <Link to={`/sendmoney/${item._id}`} onClick={localStorage.setItem("username",item.name)} className='mt-1'><LuUpload  /></Link>
        </div>
          }):<div className='text-center'>nothing is present</div>
        }
      </div>
    </>
  )
}

export default Home