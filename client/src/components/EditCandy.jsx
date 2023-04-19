import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

const EditCandy = () => {

    const [allCandy, setAllCandy] = useState([])
    const [candy, setCandy] = useState({
        candyName: "",
        candyPrice: 0,
        candyDescription: "",
        candyImage: "",
        candyCategory: "",
        candyStock: 0
    })
    const [error, setError] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/candy')
            .then(res => {
                console.log("Successfully grabbing all candy")
                setAllCandy(res.data)
            })
            .catch(err => console.log(err))
    })

    const updateCandy = (e) => {
        e.preventDefault();
    }

    return (
        <div>EditCandy</div>
    )
}

export default EditCandy