import axios from 'axios'
import '../css/createCandy.css'
import React, {useState, useEffect} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'

const EditCandy = props => {

    const {id} = useParams();
    const [candy, setCandy] = useState({
        candyName: "",
        candyPrice: 0,
        candyDescription: "",
        candyImage: "",
        candyCategory: "",
        candyStock: 0,
        onSale: false,
        candyDiscount: 0
    })
    const [allCategories, setAllCategories] = useState([])
    const [error, setError] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/admin/candy/' + id, {withCredentials: true})
            .then(res => {
                // console.log(res.data)
                // console.log("Grabbing one Candy")
                setCandy(res.data.oneCandy)
            })
            .catch(err => {
                // console.log(err)
                props.setAuthorized("Please Log In!");  // Sends back to main page with this message
                navigate("/admin/login")
            })    
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8000/api/admin/category", {withCredentials: true})
            .then(res => {
                // console.log(res.data.categories)
                setAllCategories(res.data.categories)
            })
            .catch(err => console.log(err))
    }, [candy])

    const onChangeHandler = (e) => {
        setCandy({...candy, [e.target.name]: e.target.value})
    }

    const updateCandy = (e) => {
        e.preventDefault();
        let isOnSale = (candy.onSale) ? candy.candyDiscount : 0
        axios.patch('http://localhost:8000/api/candy/edit/' + id, {...candy, candyDiscount: isOnSale})
            .then(res => {
                setCandy(res.data.oneCandy);
                // console.log(res.data.oneCandy)
                navigate('/admin/dashboard')
            })
            .catch(err => {
                // console.log(err);
                // console.log(err.response.data.errors)
                setError(err.response.data.errors);
            })
    }

    const deleteCandy = (id) => {
        axios.delete("http://localhost:8000/api/candy/delete/" + id)
            .then(res => {
                // console.log("Successful Delete",res)
                navigate('/admin/dashboard')
            })
            .catch(err => {
                // console.log(err)
                props.setAuthorized("Please Log In!");  // Sends back to main page with this message
                navigate("/admin/login")
            }) 
    }

    const logout = () => {
        axios.get('http://localhost:8000/api/logout', {withCredentials: true})
            .then(res => {
                // console.log(res);
                navigate("/admin/login")
            })
            .catch(err => {
                // console.log(err)
                props.setAuthorized("Please Log In!");  // Sends back to main page with this message
                navigate("/admin/login")
            }) 
    }

    return (
        <div className="create__candy__container">
            <div className="edit__candy__top__buttons">
                <div className="edit__candy__top__buttons__left">
                    <button className="landingPage__route__btn"><Link className="landingPage__route__btn__font"to={'/admin/dashboard'}>Dashboard</Link></button>
                    <button className='admin__logout__button' onClick={logout}>Logout</button>
                </div>
                <button className='admin__delete__candy' onClick={() => deleteCandy(id)}>Delete Candy</button>
            </div>
            <h1>Edit {candy?.candyName}</h1>
            <form className="create__candy__form" onSubmit={updateCandy}>
                {error.candyName ? <p className='create__candy__error__message'>{error.candyName.message}</p> : ""}
                <div className="form-group">
                    <label className="create__candy__label">Name: </label>
                    <input className="create__candy__input" type="text" name="candyName" value={candy?.candyName} onChange={onChangeHandler} />
                </div>
                {error.candyCategory ? <p className='create__candy__error__message'>{error.candyCategory.message}</p> : ""}
                <div className="form-group">
                    <label className="create__candy__label">Category: </label>
                    <select className="create__candy__input" name="candyCategory" defaultValue={candy.candyCategory} onChange={onChangeHandler}>
                        {
                            allCategories.map(category => {
                                return (
                                    <option value={category.categoryName} selected={candy && candy.candyCategory == category.categoryName}>{category.categoryName}</option>
                                )
                            })
                        }
                    </select>
                </div>
                {error.candyDescription ? <p className='create__candy__error__message'>{error.candyDescription.message}</p> : ""}
                <div className="form-group">
                    <label className="create__candy__label">Description: </label>
                    <input className="create__candy__input" type="textarea" name="candyDescription" value={candy?.candyDescription} onChange={onChangeHandler} />
                </div>
                {error.candyPrice ? <p className='create__candy__error__message'>{error.candyPrice.message}</p> : ""}
                <div className="form-group">
                    <label className="create__candy__label">Price: </label>
                    <input className="create__candy__input" type="number" name="candyPrice" value={candy?.candyPrice} onChange={onChangeHandler} />
                </div>
                {error.candyStock ? <p className='create__candy__error__message'>{error.candyStock.message}</p> : ""}
                <div className="form-group">
                    <label className="create__candy__label">Stock: </label>
                    <input className="create__candy__input" type="number" name="candyStock" value={candy?.candyStock} onChange={onChangeHandler} />
                </div>
                {error.candyImage ? <p className='create__candy__error__message'>{error.candyImage.message}</p> : ""}
                <div className="form-group">
                    <label className="create__candy__label">Image: </label>
                    <input className="create__candy__input" type="text" name="candyImage" value={candy?.candyImage} onChange={onChangeHandler} />
                </div>
                {error.candyDiscount ? <p className='create__candy__error__message'>{error.candyDiscount.message}</p> : ""}
                <div className="form-group">
                    <label className="create__candy__label">On Sale: </label>
                    <input className="create__candy__input" type="checkbox" name="onSale" checked={candy.onSale} onChange={() => setCandy({...candy, onSale: !candy.onSale})} />

                    {candy.onSale ? (
                        <div className="form-group">
                            <label className="create__candy__label">Discount: </label>
                            <input className="create__candy__input" type="number" name="candyDiscount" value={candy.candyDiscount} onChange={onChangeHandler} />
                        </div>
                    ) : null}
                </div>
                <input className="create__candy__submit__btn" type="submit" value="Submit"/>
            </form>
        </div>
    )
}
export default EditCandy
