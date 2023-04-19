import React, {useState} from 'react'
import axios from 'axios'
// import {useNavigate} from 'react-router-dom'


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

        axios.post("http://localhost:8000/api/user/login", userLogin)
            .then(res => {
                console.log(res);
                console.log(res.data);
                setUserLogin(res.data);
            })
            .catch(err => {
                console.log(err);
                console.log(userLogin);
                console.log(err.response.data.error.errors);
                setError(err.response.data.error.errors);
            })
    }

    const logout = () => {
        axios.get('http://localhost:8000/api/user/logout', {withCredentials: true})
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
            <h1> ADMIN LOGIN  </h1>

            <form className="col-md-6 mx-auto" onSubmit={createUserLogin}>
                {/*EMAIL INPUT*/}
                <div className="form-group">
                    {error.email ? <p className='text-danger'>{error.email.message}</p> : "Invalid email"}
                    <label>Email: </label>
                    <input className="form-control border-success text-capitalize" type="email" name="email" value={userLogin.email} onChange={onChangeHandler} />
                </div>

                {/*PASSWORD INPUT*/}
                <div className="form-group">
                    {error.password ? <p className='text-danger'>{error.password.message}</p> : ""}
                    <label>Password: </label>
                    <input className="form-control border-success text-capitalize" type="password" name="password" value={userLogin.password} onChange={onChangeHandler} />
                </div>

                <input className="btn btn-primary m-2" type="submit" value="Submit"/>
            </form>
        </div>
    )
}
export default UserLogin