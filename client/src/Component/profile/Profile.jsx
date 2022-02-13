import React from 'react';
import './profile.css';
import {userRegister,userLogin} from '../../axios';
import {useDispatch,useSelector} from 'react-redux';
import{setUser} from '../../store/user-slice';
import {useNavigate} from 'react-router-dom';
const url = 'http://localhost:4000';



const Profile = () => {
    const {user} = useSelector((state) => state.user)
    return (
        <>
            <div className='container'>
                 <h2 className='profile'>My Profile</h2>
                <div className='row'>
                   <div className='col-lg-5'>
                        <img className='profileimg' src={`http://localhost:4000${user.avatar.url}`}/>
                        <button className='btn btn-danger profileBtn'>Edit Profile</button>
                   </div>
                   <div className='col-lg-7'>
                        <div className='name'>
                            <h4>Full Name</h4>
                            <p>{user.name}</p>
                        </div>
                        <div className='name'>
                            <h4>Email</h4>
                            <p>{user.email}</p>
                        </div>
                        <div className='name'>
                            <h4>Joined On</h4>
                            <p>{user.createdAt}</p>
                        </div>

                        <button className='btn btn-dark orderBtn'>My Orders</button><br/>
                        <button className='btn btn-dark changepass'>Change Password</button>
                   </div>
                </div>
            </div>
        </>
    )
}

export default Profile
