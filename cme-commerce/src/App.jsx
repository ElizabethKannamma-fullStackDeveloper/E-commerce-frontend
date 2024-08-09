import Cards from './components/Cards'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import ProductDetails from './pages/ProductDetails'
import { useEffect, useState } from 'react'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart'
import Login from './pages/Login'
import Registration from './pages/Registration'
import ShowNoNavbar from './components/ShowNoNavbar'
import Payment from './components/Payment'
import axios from 'axios'
import {Elements} from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js'
import SuccessPay from './components/SuccessPay'


function App() {

  const [cartItems, setCartItems] = useState([]);
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(()=>{
    async function getStripeApiKey(){
      const {data}=await axios.get("https://e-commerce-backend-1-zfsu.onrender.com/payment/stripeApi")
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  },[])

  return (
    <>
      <Router>
        <ToastContainer theme='dark' />
        <ShowNoNavbar>
          <Header cartItems={cartItems}></Header>
        </ShowNoNavbar>
        <Routes>
          <Route path="/" element={<Navigate replace to='/register'></Navigate>}></Route>
          <Route path='/register' Component={Registration}></Route>
          <Route path='/login' Component={Login}></Route>
          <Route path='/home' Component={Cards}></Route>
          <Route path='/search' Component={Cards}></Route>
          <Route path='/order/success' element={<SuccessPay cartItems={cartItems} setCartItems={setCartItems}></SuccessPay>}></Route>
          {stripeApiKey && <Route path='/payment' element={<Elements stripe={loadStripe(stripeApiKey)}><Payment cartItems={cartItems} setCartItems={setCartItems}></Payment></Elements>}></Route>}
          <Route path='/products/:id' element={<ProductDetails cartItems={cartItems} setCartItems={setCartItems}></ProductDetails>}></Route>
          <Route path='/cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems}></Cart>}></Route>
        </Routes>
      </Router>

    </>
  )
}

export default App
