import React, { useEffect, useState } from 'react'
import Axios from "axios"
import "../App.css"
import { Link, useSearchParams } from 'react-router-dom'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';


function Cards() {
    const [products, setProducts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        Axios.get(`https://e-commerce-backend-1-zfsu.onrender.com/products/?${searchParams}`)
            .then(res => {
                console.log(res.data.products)
                setProducts(res.data.products)
            }).catch(error => {
                console.log(error)
            })


    }, [searchParams])
    return (
        <>
            <div className='container mt-2' >
                <div className='row'>
                    {products.map((item, index) => {
                        return (
                            <div key={index} className="col-sm-12 col-md-6 col-lg-3 my-3">
                                <div className="card p-3 h-100 rounded">
                                    <img
                                        className="card-img-top mx-auto"
                                        src={item.thumbnail}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">{item.description}</p>
                                    
                                        <div className="ratings mt-auto">
                                            <div className="rating-outer">
                                       <div className='rating-inner' style={{width:`${item.rating/5 *100}%`}}></div>
                                            </div>
                                        </div>
                                        <p className="card-text"><CurrencyRupeeIcon/>{item.price}</p>
                                        <Link to={`/products/${item._id}`} className="btn btn-warning">View Product Details</Link>

                                    </div>
                                </div>
                            </div>

                            // <div key={index} className='col-md-3'>
                            //     <div className="card h-100" style={{ width: "18rem" }}>
                            //         <img src={item.thumbnail} className="card-img-top" alt="..." />
                            //         <div className="card-body">
                            //             <h5 className="card-title">{item.title}</h5>
                            //             <p className="card-text">{item.description}</p>
                            //             <div className='ratings mt-auto'>
                            //                 <div className='rating-outer'>
                            //                     <div className='rating-inner' style={{width:`${item.rating/5 *100}%`}}></div>
                            //                 </div>
                            //             </div>
                            //             <Link to={`/products/${item._id}`} className="btn btn-warning">View Product Details</Link>
                            //             <a href="" > </a>
                            //         </div>
                            //     </div>
                            // </div>

                        )
                    })}
                </div>
            </div>

        </>
    )
}

export default Cards