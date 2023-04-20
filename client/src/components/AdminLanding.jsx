import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

const AdminLanding = () => {

    const [allCandy, setAllCandy] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/candy")
            .then(res => {
                console.log(res.data.allCandy)
                setAllCandy(res.data.allCandy)
            })
            .catch(err => console.log(err))
    }, [])

    const logout = () => {
        axios.get('http://localhost:8000/api/logout', {withCredentials: true})
            .then(res => {
                console.log(res);
                navigate("/admin/login")
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <h1>Hello you Fools!</h1>
            {
                allCandy.map((candy) => {
                    return (
                        <div key={candy._id}>
                            <h2>{candy.candyName}</h2>
                            <Link to={`/admin/candy/edit/${candy._id}`}>Edit</Link>
                        </div>
                    )
                })
            }
            <button className="landingPage__route__btn"><Link to={'/admin/candy/create'}>Create Candy</Link></button>
            <button className='admin__logout__button' onClick={logout}>Logout</button>
        </div>
    )
}

export default AdminLanding