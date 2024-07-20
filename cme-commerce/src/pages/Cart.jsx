import React, { Fragment, useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';



function Cart({ cartItems, setCartItems }) {

    const [orderPlaced, setOrderPlaced] = useState(false);
    const increaseQTY = (item) => {
        if (item.product.stock === item.qty) {
            return
        }
        const updatedItems = cartItems.map((element) => {
            if (element.product._id == item.product._id) {
                element.qty++
            }
            return element
        })
        setCartItems(updatedItems)
    }


    const decreaseQty = (item) => {
        if (item.qty > 1) {
            const updatedItems = cartItems.map((element) => {
                if (element.product._id == item.product._id) {
                    element.qty--
                }
                return element
            })
            setCartItems(updatedItems)
        }

    }

    const DeleteItem = (item) => {
        const updatedItems = cartItems.filter((element) => {
            if (element.product._id !== item.product._id) {
                return true;
            }
        })
        setCartItems(updatedItems)
    }

    function handleOrders() {
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
        
    }
    return (
        cartItems.length > 0 ?
            <>
                <div className="container container-fluid" style={{backgroundColor:"white"}}>
                    <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {cartItems.map((item, index) => (
                                <Fragment>
                                    <hr />
                                    <div key={index} className="cart-item">
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={item.product.thumbnail} alt={item.product.description} height="90" width="115" />
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/products/${item.product._id}`}>{item.product.title}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price"><CurrencyRupeeIcon/>{item.product.price}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus" onClick={() => { decreaseQty(item) }}>-</span>
                                                    <input type="number" style={{ width: "60px" }} className="form-control count d-inline" value={item.qty} readOnly />

                                                    <span className="btn btn-primary plus" onClick={() => increaseQTY(item)}>+</span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <DeleteIcon onClick={() => DeleteItem(item)} style={{ color: "red" }} />
                                            </div>

                                        </div>
                                    </div>
                                </Fragment>
                            ))}



                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, curval) => (acc + curval.qty), 0)} (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values"><CurrencyRupeeIcon/>{cartItems.reduce((acc, curval) => (acc + curval.product.price * curval.qty), 0)}</span></p>

                                <hr />
                                <button id="checkout_btn" className="btn btn-warning btn-block" onClick={handleOrders}>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </> : (!orderPlaced ? <h2 className='mt-5 text-center'style={{color:"white"}}>Your Cart is Empty</h2> : <>
                <h2 className='mt-5 text-center'style={{color:"white"}}>Your Order has been Placed successfully</h2>
                <h1 style={{color:"green"}} className='mt-5 text-center'><TaskAltIcon fontSize='large'/></h1>
            </>)
    )
}

export default Cart