import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import '../css/adminLanding.css'

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
        <div className="admin__landing__container">
            <h1>Hello you Fools!</h1>
            <table className='admin__table'>
                <thead>
                    <tr>
                        <th className="admin__table__th">Name</th>
                        <th className="admin__table__th">Category</th>
                        <th className="admin__table__th">Stock</th>
                        <th className="admin__table__th">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allCandy.map((candy) => {
                            return (
                                <tr key={candy._id}>
                                    <td className="admin__table__td"><Link className="table__candyName" to={`/admin/candy/edit/${candy._id}`}>{candy.candyName}</Link></td>
                                    <td className="admin__table__td">{candy.candyCategory}</td>
                                    <td className="admin__table__td">{candy.candyStock}</td>
                                    <td className="admin__table__td">{candy.candyPrice}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="admin__landing__buttons">
                <button className="admin__landing__create"><Link className="admin__landing__create__font" to={'/admin/candy/create'}>Create</Link></button>
                <button className='admin__logout__button' onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default AdminLanding