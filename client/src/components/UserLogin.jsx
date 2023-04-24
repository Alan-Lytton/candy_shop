import axios from 'axios'
import '../css/createCandy.css'
import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'


const UserLogin= () => {

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setUserLogin({...userLogin, [e.target.name]: e.target.value})
    }

    const createUserLogin = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/login", userLogin, {withCredentials: true})
            .then(res => {
                console.log(res);
                console.log(res.data);
                setUserLogin(res.data);
                navigate('/admin/dashboard')
            })
            .catch(err => {
                console.log(err);
                console.log(userLogin);
                console.log(err.response.data.error.errors);
                setError(err.response.data.error.errors);
            })
    }

    return (
            <div className={"create__candy__container"}>
                <button className='admin__logout__button'><Link className='landingPage__route__btn__font' to={"/"}>Client page</Link></button>
                <h1> ADMIN LOGIN  </h1>
                <form className="create__candy__form login_admin_form" onSubmit={createUserLogin}>
                    {/*EMAIL INPUT*/}
                    {error.email ? <p className='create__candy__error__message errorsofall'>{error.email.message}</p> : null}
                    <div className="form-group">
                        <label className={"create__candy__label"}>Email: </label>
                        <input className="create__candy__input newinput" type="email" name="email" value={userLogin.email} onChange={onChangeHandler} />
                    </div>
                    {/*PASSWORD INPUT*/}
                    {error.password ? <p className='create__candy__error__message errorsofall'>{error.password.message}</p> : null}
                    <div className="form-group">
                        <label className={"create__candy__label"}>Password: </label>
                        <input className={"create__candy__input newinput"} type="password" name="password" value={userLogin.password} onChange={onChangeHandler} />
                    </div>
                    <div className="button_container_ls">
                    <input className="create__candy__submit__btn loginBtnAdmin" type="submit" value="Submit"/>
                </div>
                </form>
        </div>
    )
}
export default UserLogin;