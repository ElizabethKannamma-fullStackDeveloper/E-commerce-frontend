import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from "axios"
import "../App.css"
import { toast } from 'react-toastify'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function ProductDetails({ cartItems, setCartItems }) {
    const [product, setProduct] = useState(null)
    const [qty, setQty] = useState(1);
    const { id } = useParams()
    useEffect(() => {
        Axios.get(`https://e-commerce-backend-1-zfsu.onrender.com/products/${id}`)
            .then(res => {
                console.log(res.data.product)
                setProduct(res.data.product)
            }).catch(error => {
                console.log(error)
            })


    }, [])

    const addHandler = () => {
        const itemExists = cartItems.find((item) => item.product._id === product._id);
        if (!itemExists) {
            const newProduct = { product, qty };
            setCartItems((items) => [...items, newProduct])
        }
        toast.success("Item added to Cart")
    }

    const increaseQTY=()=>{
        if(product.stock=== qty){
            return
        }
        setQty((state)=>state+1)
    }

    
    const decreaseQty=()=>{
        if( qty>1){
            setQty((state)=>state-1)
        }
        
    }
    return (
        product &&
        <>

            <div className="container container-fluid mt-5" style={{backgroundColor:"white"}}>
                <div className="row f-flex justify-content-around">
                    <div className="col-12 col-lg-5 img-fluid my-2" id="product_image">
                        <img src={product.thumbnail} alt="sdf" height="500" width="400" />
                    </div>

                    <div className="col-12 col-lg-5 mt-5">
                        <h3>{product.title}</h3>
                        <p id="product_id">Product ID : {product._id}</p>
                        <hr />

                        <div className="rating-outer">
                            <div className='rating-inner' style={{ width: `${product.rating / 5 * 100}%` }}></div>

                        </div>


                        <hr />

                        <p id="product_price"><CurrencyRupeeIcon/>{product.price}</p>
                        <div className="stockCounter d-inline">
                            <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                            <input type="number" style={{ width: "60px" }} className="form-control count d-inline text-center" value={qty} readOnly />

                            <span className="btn btn-primary plus" onClick={increaseQTY}>+</span>
                        </div>
                        <button type="button" onClick={addHandler} disabled={product.stock==0} id="cart_btn" className="btn btn-warning d-inline ml-4">Add to Cart</button>

                        <hr />

                        <p>Status: <span id="stock_status" className={product.stock > 0 ? "text-success" : "text-danger"}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</span></p>

                        <hr />

                        <h4 className="mt-2">Description:</h4>
                        <p>{product.description}</p>
                        <hr />
                        <p id="product_seller mb-3">Sold by: <strong>{product.brand}</strong></p>

                        <div className="rating w-50"></div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default ProductDetails