import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useParams, useNavigate} from 'react-router-dom'

const EditCandy = () => {

    const {id} = useParams();
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
        axios.get('http://localhost:8000/api/candy/edit/' + id)
            .then(res => {
                console.log("Successfully grabbing all candy")
                setCandy(res.data)
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