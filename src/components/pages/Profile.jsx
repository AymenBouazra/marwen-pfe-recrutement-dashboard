import React, { useContext, useEffect, useState } from 'react'
import UserService from '../../services/user'
import { CoockieContext } from '../../features/contexts'
const Profile = () => {
    const [profile, setProfile] = useState({})
    const Context = useContext(CoockieContext)
    const fetchProfile = async () => {
        const response = await UserService.getOne(Context.id)
        setProfile(response.data)
    }
    useEffect(() => {
        fetchProfile()
    }, [])
    return (
        <div className="container-fluid">
            <div className="card">
                <div className='card-header'>
                    <h2 className=" fw-semibold">Profile details</h2>
                </div>
                <div className="card-body">
                    <span>{profile.email}</span>
                </div>
            </div>
        </div>
    )
}

export default Profile