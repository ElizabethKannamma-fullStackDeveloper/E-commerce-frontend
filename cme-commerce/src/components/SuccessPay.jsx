import React, { useEffect, useState } from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';



function SuccessPay({cartItems,setCartItems}) {
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(()=>{
        fetch("https://e-commerce-backend-1-zfsu.onrender.com/orders/",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(cartItems)

        })
        .then(() => {
            setCartItems([])
            setOrderPlaced(true)
            toast.success("order placed")
        })
    },[])
        
    


  return (
 <> <h2 className='mt-5 text-center'style={{color:"white"}}>Your Cart is Empty</h2>
        <h2 className='mt-5 text-center'style={{color:"white"}}>Your Order has been Placed successfully</h2>
        <h1 style={{color:"green"}} className='mt-5 text-center'><TaskAltIcon fontSize='large'/></h1>
        <Link to="/home"><button style={{marginLeft:"59rem",marginTop:"20px"}}className='btn btn-warning '>Place Another order</button></Link>
    </>
  )
}

export default SuccessPay