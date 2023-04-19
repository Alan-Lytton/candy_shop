import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../css/createCandy.css'

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
                console.log(err.response.data.errors);
                setError(err.response.data.errors);
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
        <div className="create__candy__container">
            <button className='admin__logout__button' onClick={logout}>Logout</button>
            <h1>Create Candy</h1>
            <form className="create__candy__form" onSubmit={createCandy}>
                <div className="form-group">
                    {error.candyName ? <p className='create__candy__error__message'>{error.candyName.message}</p> : ""}
                    <label className="create__candy__label">Candy Name: </label>
                    <input className="create__candy__input" type="text" name="candyName" value={candy.candyName} onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                    {error.candyCategory ? <p className='create__candy__error__message'>{error.candyCategory.message}</p> : ""}
                    <label className="create__candy__label">Candy Category: </label>
                    <input className="create__candy__input" type="text" name="candyCategory" value={candy.candyCategory} onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                    {error.candyDescription ? <p className='create__candy__error__message'>{error.candyDescription.message}</p> : ""}
                    <label className="create__candy__label">Candy Description: </label>
                    <input className="create__candy__input" type="textarea" name="candyDescription" value={candy.candyDescription} onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                    {error.candyPrice ? <p className='create__candy__error__message'>{error.candyPrice.message}</p> : ""}
                    <label className="create__candy__label">Candy Price: </label>
                    <input className="create__candy__input" type="number" name="candyPrice" value={candy.candyPrice} onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                    {error.candyStock ? <p className='create__candy__error__message'>{error.candyStock.message}</p> : ""}
                    <label className="create__candy__label">Candy Stock: </label>
                    <input className="create__candy__input" type="number" name="candyStock" value={candy.candyStock} onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                    {error.candyImage ? <p className='create__candy__error__message'>{error.candyImage.message}</p> : ""}
                    <label className="create__candy__label">Candy Image: </label>
                    <input className="create__candy__input" type="text" name="candyImage" value={candy.candyImage} onChange={onChangeHandler} />
                </div>
                <input className="create__candy__submit__btn" type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default CreateCandy