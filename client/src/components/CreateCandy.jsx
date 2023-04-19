import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const CreateCandy = () => {

    const [candy, setCandy] = useState({
        candyName: "",
        candyPrice: 0,
        candyDescription: "",
        candyImage: "",
        candyCategory: "",
        candyStock: 0
    })
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setCandy({...candy, [e.target.name]: e.target.value})
    }

    const createCandy = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/candy/add", candy)
            .then(res => {
                console.log(res);
                console.log(res.data);
                setCandy(res.data);
            })
            .catch(err => {
                console.log(err);
                console.log(candy);
                console.log(err.response.data.error.errors);
                setError(err.response.data.error.errors);
            })
    }

    const logout = () => {
        axios.get('http://localhost:8000/api/logout', {withCredentials: true})
            .then(res => {
                console.log(res);
                navigate("/")
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="create__candy col-md-6 mx-auto border border-dark p-2">
            <button className='btn' onClick={logout}>Logout</button>
            <h1>Create Candy</h1>
            <form className="col-md-6 mx-auto" onSubmit={createCandy}>
                <div className="form-group">
                    {error.candyName ? <p className='text-danger'>{error.candyName.message}</p> : ""}
                    <label>Candy Name: </label>
                    <input className="form-control border-success text-capitalize" type="text" name="candyName" value={candy.candyName} onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                    {error.candyCategory ? <p className='text-danger'>{error.candyCategory.message}</p> : ""}
                    <label>Candy Category: </label>
                    <input className="form-control border-success text-capitalize" type="text" name="candyCategory" value={candy.candyCategory} onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                    {error.candyDescription ? <p className='text-danger'>{error.candyDescription.message}</p> : ""}
                    <label>Candy Description: </label>
                    <input className="form-control border-success text-capitalize" type="textarea" name="candyDescription" value={candy.candyDescription} onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                    {error.candyPrice ? <p className='text-danger'>{error.candyPrice.message}</p> : ""}
                    <label>Candy Price: </label>
                    <input className="form-control border-success text-capitalize" type="number" name="candyPrice" value={candy.candyPrice} onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                    {error.candyStock ? <p className='text-danger'>{error.candyStock.message}</p> : ""}
                    <label>Candy Stock: </label>
                    <input className="form-control border-success text-capitalize" type="number" name="candyStock" value={candy.candyStock} onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                    {error.candyImage ? <p className='text-danger'>{error.candyImage.message}</p> : ""}
                    <label>Candy Image: </label>
                    <input className="form-control border-success text-capitalize" type="text" name="candyImage" value={candy.candyImage} onChange={onChangeHandler} />
                </div>
                <input className="btn btn-primary m-2" type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default CreateCandy