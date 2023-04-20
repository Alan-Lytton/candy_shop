import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../css/createCandy.css'

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
        <div className="create__candy__container">
            <br />
            <h1> ADMIN SIGN UP  </h1>
            <form className={"create__candy__form"} onSubmit={createUser}>
                {/*EMAIL INPUT*/}
                <div className="form-group">
                    {error.email ? <p className="create__candy__error__message">{error.email.message}</p> : null}
                    <label className={"create__candy__label"}>Email: </label>
                    <input className="create__candy__input" type="email" name="email" value={user.email} onChange={onChangeHandler} />
                </div>

                {/*PASSWORD INPUT*/}
                <div className="form-group">
                    {error.password ? <p className="create__candy__error__message">{error.password.message}</p> : null}
                    <label className={"create__candy__label"}>Password: </label>
                    <input className="create__candy__input" type="password" name="password" value={user.password} onChange={onChangeHandler} />
                </div>

                {/* CONFIRM PASSWORD INPUT*/}
                <div className="form-group">
                    {error.confirmPassword? <p className="create__candy__error__message">{error.confirmPassword.message}</p> : null}
                    <label className={"create__candy__label"}>Confirm Password: </label>
                    <input className="create__candy__input" type="password" name="confirmPassword" value={user.confirmPassword} onChange={onChangeHandler} />
                </div>

                <input className={"create__candy__submit__btn"} type="submit" value="Submit"/>
            </form>
        </div>
    )
}
export default UserForm