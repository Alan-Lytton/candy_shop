import React, {useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import '../css/createCandy.css'


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

    // const logout = () => {
    //     axios.get('http://localhost:8000/api/logout', {withCredentials: true})
    //         .then(res => {
    //             console.log(res);
    //             navigate("/")
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }


    return (
            <div className={"create__candy__container"}>
                <br />
                <h1> ADMIN LOGIN  </h1>
                <form className="create__candy__form" onSubmit={createUserLogin}>
                    {/*EMAIL INPUT*/}
                    <div className="form-group">
                        {error.email ? <p className='create__candy__error__message'>{error.email.message}</p> : null}

                        <label className={"create__candy__label"}>Email: </label>
                        <input className={"create__candy__input"} type="email" name="email" value={userLogin.email} onChange={onChangeHandler} />
                    </div>
                    {/*PASSWORD INPUT*/}
                    <div className="form-group">
                        {error.password ? <p className='create__candy__error__message'>{error.password.message}</p> : null}

                        <label className={"create__candy__label"}>Password: </label>
                        <input className={"create__candy__input"} type="password" name="password" value={userLogin.password} onChange={onChangeHandler} />
                    </div>

                    <input className="create__candy__submit__btn" type="submit" value="Submit"/>
                </form>
        </div>
    )
}
export default UserLogin;