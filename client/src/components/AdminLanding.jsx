import axios from 'axios'
import '../css/adminLanding.css'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const AdminLanding = props => {
    const [allCandy, setAllCandy] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        axios.get("http://localhost:8000/api/admin/candy", {withCredentials: true})
            .then(res => {
                // console.log(res.data.allCandy)
                setAllCandy(res.data.allCandy)
            })
            .catch(err => {
                // console.log(err)
                props.setAuthorized("Please Log In!");  // Sends back to main page with this message
                navigate("/admin/login")
            })
    }, [])

    const logout = () => {
        axios.get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res => {
                // console.log(res);
                navigate("/admin/login")
            })
            .catch(err => {
                // console.log(err);
            })
    }

    // get all candies
    const filteredCandy = allCandy.filter(candy =>
        candy.candyName.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="admin__landing__container">
            <h1>Hello Admin!</h1>
            <input
                type="text"
                placeholder="Search"
                className="search-input"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
            />
            <div className="admin__table__wrapper">
                <table className='admin__table'>
                    <thead>
                        <tr>
                            <th className="admin__table__th">Name</th>
                            <th className="admin__table__th">Category</th>
                            <th className="admin__table__th">Stock</th>
                            <th className="admin__table__th">Price</th>
                            <th className="admin__table__th">OnSale & Discount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredCandy.map((candy) => {
                                return (
                                    <tr key={candy._id}>
                                        <td className="admin__table__td"><Link className="table__candyName" to={`/admin/candy/edit/${candy._id}`}>{candy.candyName}</Link></td>
                                        <td className="admin__table__td">{candy.candyCategory}</td>
                                        <td className="admin__table__td">{candy.candyStock}</td>
                                        <td className="admin__table__td">${candy.candyPrice}</td>
                                        <td className="admin__table__td">${candy.candyDiscount} {candy.onSale ? 'true' : 'false'}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="admin__landing__buttons">
                <button className="admin__landing__create"><Link className="admin__landing__create__font" to={'/admin/candy/create'}>Create</Link></button>
                <button className='admin__logout__button' onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default AdminLanding;
