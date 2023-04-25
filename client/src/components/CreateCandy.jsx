import axios from 'axios'
import '../css/createCandy.css'
import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

const CreateCandy = props => {

    const [allCategories, setAllCategories] = useState([])
    const [candy, setCandy] = useState({
        candyName: "",
        candyPrice: 0,
        candyDescription: "",
        candyImage: "",
        candyCategory: "",
        candyStock: 0,
        // onSale: "",
        // candyDiscount: 0
    })
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setCandy({...candy, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/admin/category", {withCredentials: true})
        .then(res => {
            console.log(res.data.categories)
            setAllCategories(res.data.categories)
        })
        .catch(err => {
            console.log(err)
            props.setAuthorized("Please Log In!");  // Sends back to main page with this message
            navigate("/admin/login")
        })
    }, [])

    const createCandy = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/candy/add", candy)
            .then(res => {
                console.log(res);
                console.log(res.data);
                setCandy(res.data);
                navigate('/admin/dashboard')
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
                console.log("Logged Out!");
                navigate("/admin/login")
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="create__candy__container">
            <button className="landingPage__route__btn create__dashboard__button"><Link className="landingPage__route__btn__font" to={'/admin/dashboard'}>Dashboard</Link></button>
            <button className='admin__logout__button' onClick={logout}>Logout</button>
            <h1>Create Candy</h1>
            <form className="create__candy__form" onSubmit={createCandy}>
                    {error.candyName ? <p className='create__candy__error__message'>{error.candyName.message}</p> : ""}
                <div className="form-group">
                    <label className="create__candy__label">Name: </label>
                    <input className="create__candy__input" type="text" name="candyName" value={candy.candyName} onChange={onChangeHandler} />
                </div>
                    {error.candyCategory ? <p className='create__candy__error__message'>{error.candyCategory.message}</p> : ""}
                <div className="form-group">
                    <label className="create__candy__label">Category: </label>
                    <select className="create__candy__input" name="candyCategory" onChange={onChangeHandler}>
                        <option value="none" selected disabled>Select Category</option>
                        {
                            allCategories.map(category => {
                                return (
                                    <option value={category.categoryName}>{category.categoryName}</option>
                                )
                            })
                        }
                    </select>
                </div>
                    {error.candyDescription ? <p className='create__candy__error__message'>{error.candyDescription.message}</p> : ""}
                <div className="form-group">
                    <label className="create__candy__label">Description: </label>
                    <input className="create__candy__input" type="text" name="candyDescription" value={candy.candyDescription} onChange={onChangeHandler} />
                </div>
                    {error.candyPrice ? <p className='create__candy__error__message'>{error.candyPrice.message}</p> : ""}
                <div className="form-group">
                    <label className="create__candy__label">Price: </label>
                    <input className="create__candy__input" type="number" name="candyPrice" value={candy.candyPrice} onChange={onChangeHandler} />
                </div>
                    {error.candyStock ? <p className='create__candy__error__message'>{error.candyStock.message}</p> : ""}
                <div className="form-group">
                    <label className="create__candy__label">Stock: </label>
                    <input className="create__candy__input" type="number" name="candyStock" value={candy.candyStock} onChange={onChangeHandler} />
                </div>
                    {error.candyImage ? <p className='create__candy__error__message'>{error.candyImage.message}</p> : ""}
                <div className="form-group">
                    <label className="create__candy__label">Image: </label>
                    <input className="create__candy__input" type="text" name="candyImage" value={candy.candyImage} onChange={onChangeHandler} />
                </div>
                    {/* {error.candyDiscount ? <p className='create__candy__error__message'>{error.candyDiscount.message}</p> : ""}
                <div className="form-group">
                    <label className="create__candy__label">On Sale: </label>
                    <input className="create__candy__input" type="checkbox" name="onSale" checked={candy.onSale} onChange={() => setCandy({...candy, onSale: !candy.onSale})} />

                    {candy.onSale ? (
                        <div className="form-group">
                        <label className="create__candy__label">Discount: </label>
                        <input className="create__candy__input" type="number" name="candyDiscount" value={candy.candyDiscount} onChange={onChangeHandler} />
                    </div>
                    ) : null}
                </div> */}
                <input className="create__candy__submit__btn" type="submit" value="Submit"/>
            </form>
        </div>
    )
}
export default CreateCandy