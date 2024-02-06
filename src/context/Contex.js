import { createContext,useContext, useEffect, useState } from "react";

const context=createContext();
const Contextprovider=(props)=>{
    const [amount,setamount]=useState({
        name:"",
        price:"",
        id:""
    })
    useEffect(()=>{
        const data=localStorage.getItem('amount')
        if(data){
            const parsedata=JSON.parse(data)
            setamount({...amount,name:parsedata.name,price:parsedata.amount,id:parsedata.id})
        }
    },[])
    return <context.Provider value={{amount,setamount}}>
    {props.children}
    </context.Provider>
}

const useAmount=()=>useContext(context)

export {useAmount,Contextprovider}