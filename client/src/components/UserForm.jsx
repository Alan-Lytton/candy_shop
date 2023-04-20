import React, {useState} from 'react'
import axios from 'axios'
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
            })
            .catch(err => {
                console.log(err);
                console.log(user);
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
            <h1> ADMIN SIGN UP  </h1>

            <form className="col-md-6 mx-auto" onSubmit={createUser}>
                {/*EMAIL INPUT*/}
                <div className="form-group">
                    {error.email ? <p className='text-danger'>{error.email.message}</p> : null}
                    <label>Email: </label>
                    <input className="form-control border-success text-capitalize" type="email" name="email" value={user.email} onChange={onChangeHandler} />
                </div>

                {/*PASSWORD INPUT*/}
                <div className="form-group">
                    {error.password ? <p className='text-danger'>{error.password.message}</p> : null}
                    <label>Password: </label>
                    <input className="form-control border-success text-capitalize" type="password" name="password" value={user.password} onChange={onChangeHandler} />
                </div>

                {/* CONFIRM PASSWORD INPUT*/}
                <div className="form-group">
                    {error.confirmPassword? <p className='text-danger'>{error.confirmPassword.message}</p> : null}
                    <label>Confirm Password: </label>
                    <input className="form-control border-success text-capitalize" type="password" name="confirmPassword" value={user.confirmPassword} onChange={onChangeHandler} />
                </div>

                <input className="btn btn-primary m-2" type="submit" value="Submit"/>
            </form>
        </div>
    )
}
export default UserForm