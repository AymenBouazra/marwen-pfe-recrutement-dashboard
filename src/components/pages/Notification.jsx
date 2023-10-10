import React, { useContext, useEffect, useState } from 'react'
import { CoockieContext } from '../../features/contexts'
import UserService from '../../services/user'
import { Link } from 'react-router-dom'

const Notification = () => {
    const [profile, setProfile] = useState({})
    const Context = useContext(CoockieContext)
    useEffect(() => {
        const fetchProfile = async () => {
            const response = await UserService.getOne(Context.id)
            console.log(response.data.statut);
            setProfile(response.data)
        }
        fetchProfile()
    }, [Context.id])
    return (
        <div className="container-fluid">
            <div className="card">
                <div className='card-header'>
                    <h2 className="fw-semibold">Notification</h2>
                </div>
                <div className="card-body">
                    {
                        profile.statut === undefined ?
                            <>
                                {
                                    (profile.formulaire && profile.testPassed === false) ?
                                        <div className='mb-3'>
                                            <div className="badge bg-secondary position-relative h1"><h5 className='text-white mb-0'>Nouvelles</h5>
                                                <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                                                    <span className="visually-hidden">New alerts</span>
                                                </span>
                                            </div>
                                            <p>Vous avez été séléctionné pour passer un text technique
                                                cliquez ici<Link to="/test-technique" className='btn btn-link'> Test</Link>
                                            </p>
                                        </div>
                                        : (profile.formulaire && profile.testPassed === true) && <>
                                            <span className='h4'><strong>Notification</strong></span>
                                            <h5 className='mb-4 mt-2 text-success bg-light p-3 rounded'>
                                                Votre test a été envoyé et vous serez notifié des feedbacks des evaluateurs par mail
                                            </h5>
                                            <hr className='w-75 mx-auto' />
                                        </>}
                            </>
                            :
                            profile.statut === 'Accepted' ?
                                <p className='text-success'>
                                    Merci pour votre temps et votre intérêt pour notre Société. À l’heure actuelle, nous avons décidé d'accepter votre candidature.
                                </p>
                                :
                                profile.statut === 'Refused' &&
                                <p>Merci pour votre temps et votre intérêt pour notre Société. À l’heure actuelle, nous avons décidé de rechercher d’autres candidats qui correspondent davantage à nos exigences, mais nous tenons à vous remercier de nous donner l’opportunité d’examiner votre candidature.</p>
                    }

                </div>
            </div>
        </div>
    )
}

export default Notification