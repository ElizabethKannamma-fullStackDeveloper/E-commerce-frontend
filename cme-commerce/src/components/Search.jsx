import React, { useState } from 'react'
import "../App.css"
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom"

function Search() {
    const [keyword,setKeyword]=useState("");
    const navigate=useNavigate();
    const handleSearch=(e)=>{
        e.preventDefault()
        navigate("/search?keyword="+keyword)
    }
    return (
        <>
            <div className='search'>
                <input onBlur={handleSearch} onChange={(e)=>setKeyword(e.target.value)} className="form-control me-2" type="search" placeholder="Enter Material Name..." aria-label="Search" />
                <button onClick={handleSearch}><SearchIcon></SearchIcon></button>
            </div>
        </>
    )
}

export default Search