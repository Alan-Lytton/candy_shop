import axios from 'axios'
import '../css/createCandy.css'
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const UserForm = () => {

    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: "",

    })
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const createUser = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/register", user, {withCredentials: true})
            .then(res => {
                console.log(res);
                console.log(res.data);
                setUser(res.data);
                navigate('/admin/dashboard')
            })
            .catch(err => {
                console.log(err);
                console.log(user);
                console.log(err.response.data.error.errors);
                setError(err.response.data.error.errors);
            })
    }


    return (
        <div className="create__candy__container">
            <br />
            <h1> ADMIN SIGN UP  </h1>
            <form className="create__candy__form form_signup_user" onSubmit={createUser}>
                {/*EMAIL INPUT*/}
                {error.email ? <p className="create__candy__error__message errorsofall">{error.email.message}</p> : null}
                <div className="form-group">
                    <label className={"create__candy__label"}>Email: </label>
                    <input className="create__candy__input newinput" type="email" name="email" value={user.email} onChange={onChangeHandler} />
                </div>

                {/*PASSWORD INPUT*/}
                {error.password ? <p className="create__candy__error__message errorsofall">{error.password.message}</p> : null}
                <div className="form-group">
                    <label className={"create__candy__label"}>Password: </label>
                    <input className="create__candy__input newinput" type="password" name="password" value={user.password} onChange={onChangeHandler} />
                </div>

                {/* CONFIRM PASSWORD INPUT*/}
                {error.confirmPassword? <p className="create__candy__error__message errorsofall">{error.confirmPassword.message}</p> : null}
                <div className="form-group">
                    <label className={"create__candy__label"}>Confirm Password: </label>
                    <input className="create__candy__input newinput" type="password" name="confirmPassword" value={user.confirmPassword} onChange={onChangeHandler} />
                </div>

                <div className="button_container_ls">
                <input className={"create__candy__submit__btn loginBtnAdmin"} type="submit" value="Submit"/>
                <a className='linkToAdminLogin' href="/admin/login">Log In</a>
                </div>
            </form>
        </div>
    )
}
export default UserForm