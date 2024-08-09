import { useElements, useStripe, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Payment({cartItems,setCartItems}) {
console.log(cartItems);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const paymentData = {
    amount: Math.round(orderInfo.EstimatedPrice*100)
  }


  const order = {
      orderItems:cartItems,

  }

  if(orderInfo){
    order.EstimatedPrice=orderInfo.EstimatedPrice
  }

  

  const submitHandler=async (e)=>{
    e.preventDefault();
    document.querySelector("#pay_btn").disabled=true;
    try {
      const {data}=await axios.post("https://e-commerce-backend-1-zfsu.onrender.com/payment/process",paymentData)
      const client_secret=data.client_secret
      const result =stripe.confirmCardPayment(client_secret,{
        payment_method:{
          card:elements.getElement(CardNumberElement)
        }
      })
      if(result.error){
        toast((await result).error.message,{
          type:"error"
        })
        document.querySelector("#pay_btn").disabled=false;
      }else{
        if((await result).paymentIntent.status==="succeeded"){
          toast("payment Success!",{
            type:"success"

          })
          sessionStorage.removeItem("orderInfo")
          navigate("/order/success")
        }else{
          toast("Please Try again",{
            type:"warning"

            
          })
        }

      }
    } catch (err) {
      console.error(err);
    }
  }

  


  return (
    <>
      <div className='row-wrapper'>
        <div className='col-10 col-lg-5'>
          <form onSubmit={submitHandler} className='shadow-lg'>
            <h1 className='mb-4'>Card Info</h1>
            <div className='form-group py-3'>
              <label htmlFor="card_num">card Number</label>
              <CardNumberElement 
                    type="text"
                    id='card_num'
                    className='form-control py-3'/>
            </div>
            <div className='form-group py-3'>
              <label htmlFor="card_exp">Card Expiry</label>
              <CardExpiryElement
              type="text"
              id='card_exp'
              className='form-control py-3'
              value=""/>
            </div>
            <div className='form-group py-3'>
              <label htmlFor="card_cvc">Card CVC</label>
              <CardCvcElement
              type="text"
              id='card_cvc'
              className='form-control py-3'
              value=""/>
            </div>

            <button id='pay_btn' type='submit' className='btn btn-success py-3'>Pay {`${orderInfo && orderInfo.EstimatedPrice}`}</button>
          </form>
        </div>
      </div></>
  )
}

export default Payment