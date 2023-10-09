import React, { useContext, useEffect, useState } from 'react'
import UserService from '../../services/user'
import { CoockieContext } from '../../features/contexts'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
const Profile = () => {
    const [loading, setLoading] = useState(false)
    const [notification, setNotification] = useState('')


    const [profile, setProfile] = useState({})
    const Context = useContext(CoockieContext)

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('fr-FR', options);
    }
    useEffect(() => {
        const fetchProfile = async () => {
            const response = await UserService.getOne(Context.id)
            console.log(response.data);
            setProfile(response.data)
        }
        fetchProfile()
    }, [Context.id])
    return (
        <div className="container-fluid">
            <div className="card">
                <div className='card-header'>
                    <h2 className="fw-semibold">Profile details</h2>
                </div>
                <div className="card-body">
                    {
                        profile?.evaluation?.statut ?
                            <>
                                {
                                    (profile.formulaire && profile.testPassed === false ) ?
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
                            : <>
                                {profile.evaluation.statut === true && profile.testPassed === true? 
                                <p>

                                </p>:
                                profile.evaluation.statut === false && profile.testPassed === true  && <p></p>}
                            </>}
                    {notification && <div className="alert alert-success animate slideIn" role="alert">
                        {notification}
                    </div>}
                    <div>{JSON.stringify(profile)}</div>
                    <Formik
                        initialValues={profile ? profile : {
                            nom: '',
                            prenom: '',
                            email: '',
                            password: '',
                            adresse: '',
                            phone: '',
                            diplome: '',
                            education: '',
                            experience: '',
                            competence: '',
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.nom) {
                                errors.nom = 'Nom is required';
                            }
                            if (!values.prenom) {
                                errors.prenom = 'Prénom is required';
                            }
                            if (Context.role === 'Candidat') {
                                if (!values.adresse) {
                                    errors.adresse = 'Adresse is required';
                                }
                                if (!values.phone) {
                                    errors.phone = 'Téléphone is required';
                                }
                                if (!values.diplome) {
                                    errors.diplome = 'Diplôme is required';
                                }
                                if (!values.education) {
                                    errors.education = 'Étude is required';
                                }
                                if (!values.experience) {
                                    errors.experience = 'Expérience is required';
                                }
                                if (!values.competence) {
                                    errors.competence = 'Compétence is required';
                                }
                            }
                            return errors;
                        }}
                        onSubmit={async (values) => {
                            setLoading(true);
                            try {
                                const response = await UserService.updateOne(profile._id, values)
                                toast.success(response.data.message)
                                setNotification(response.data.message)
                                setTimeout(() => {
                                    setNotification('')
                                }, 5000)
                            } catch (error) {
                                toast.warning(error.response.data.message)
                            }
                            setLoading(false);
                        }}
                        enableReinitialize
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form className='row' onSubmit={handleSubmit}>
                                <div className="mb-3 col-12">
                                    <span htmlFor="nom" className="text-muted">
                                        Créé le: {formatDate(profile.createdAt)}
                                    </span>
                                </div>
                                <div className="col-sm-6 col-xs-12">
                                    <label htmlFor="nom" className="form-label">
                                        Nom
                                    </label>
                                    <input type="text" value={values.nom || ''} onChange={handleChange} onBlur={handleBlur} name="nom" className="form-control" />
                                    <p className="text-danger" > {errors.nom && touched.nom && errors.nom}</p>
                                </div>
                                <div className="col-sm-6 col-xs-12">
                                    <label htmlFor="prenom" className="form-label">
                                        Prénom
                                    </label>
                                    <input type="text" value={values.prenom || ''} onChange={handleChange} onBlur={handleBlur} className="form-control" id="prenom" />
                                    <p className="text-danger" > {errors.prenom && touched.prenom && errors.prenom}</p>

                                </div>
                                <div className="mb-3 col-12">
                                    <label htmlFor="email" className="form-label">
                                        E-mail
                                    </label>
                                    <input type="email" value={values.email || ''} onChange={handleChange} onBlur={handleBlur} className="form-control cursor-not-allowed" id="email" disabled />
                                </div>
                                <div className="mb-3 col-12">
                                    <label htmlFor="password" className="form-label">
                                        Mot de passe: <span className='text-muted' style={{ fontSize: '10px' }}> optionel</span>
                                    </label>
                                    <input type="password" value={values.password || ''} onChange={handleChange} onBlur={handleBlur} className="form-control" id="password" />
                                </div>
                                {Context.role === 'Candidat' &&
                                    <>
                                        <div className="col-8">
                                            <label htmlFor="adresse" className="form-label">
                                                Adresse
                                            </label>
                                            <input type="text" value={values.adresse || ''} onChange={handleChange} onBlur={handleBlur} className="form-control" id="adresse" />
                                            <p className="text-danger" > {errors.adresse && touched.adresse && errors.adresse}</p>

                                        </div>
                                        <div className="col-sm-4">
                                            <label htmlFor="phone" className="form-label">
                                                Téléphone
                                            </label>
                                            <input type="phone" value={values.phone || ''} onChange={handleChange} onBlur={handleBlur} className="form-control" id="phone" />
                                            <p className="text-danger" > {errors.phone && touched.phone && errors.phone}</p>

                                        </div>
                                        <div className="col-sm-6">
                                            <label htmlFor="diplome" className="form-label">
                                                Diplôme
                                            </label>
                                            <input type="text" value={values.diplome || ''} onChange={handleChange} onBlur={handleBlur} className="form-control" id="diplome" />
                                            <p className="text-danger" > {errors.diplome && touched.diplome && errors.diplome}</p>

                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="education" className="form-label">
                                                Ètude
                                            </label>
                                            <input type="text" value={values.education || ''} onChange={handleChange} onBlur={handleBlur} className="form-control" id="education" />
                                            <p className="text-danger" > {errors.education && touched.education && errors.education}</p>

                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="experience" className="form-label">
                                                Expérience
                                            </label>
                                            <input type="text" value={values.experience || ''} onChange={handleChange} onBlur={handleBlur} className="form-control" id="experience" />
                                            <p className="text-danger" > {errors.experience && touched.experience && errors.experience}</p>

                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="competence" className="form-label">
                                                Compétence
                                            </label>
                                            <input type="text" value={values.competence || ''} onChange={handleChange} onBlur={handleBlur} className="form-control" id="competence" />
                                            <p className="text-danger" > {errors.competence && touched.competence && errors.competence}</p>

                                        </div>
                                    </>
                                }
                                <div className='d-flex justify-content-end mb-4'>
                                    <button
                                        className='btn btn-primary ms-auto'
                                        type='submit'
                                        disabled={loading}
                                    >
                                        {loading ? <><span className="spinner-border spinner-border-sm" aria-hidden="true"></span> Saving...</> : <><i className="ti ti-device-floppy" style={{ fontSize: '16px' }}></i>&nbsp;<span style={{ fontSize: '16px' }}>Save</span></>}
                                    </button>
                                </div>
                            </form>)}
                    </Formik>
                </div>
            </div>
        </div >
    )
}

export default Profile