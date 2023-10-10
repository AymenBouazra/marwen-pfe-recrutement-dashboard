import React, { useContext, useEffect, useState } from 'react'
import UserService from '../../services/user'
import { CoockieContext } from '../../features/contexts'
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
            setProfile(response.data)
        }
        fetchProfile()
    }, [Context.id])
    return (
        <div className="container-fluid">
            <div className="card">
                <div className='card-header'>
                    <h2 className="fw-semibold">Profile</h2>
                </div>
                <div className="card-body">

                    {notification && <div className="alert alert-success animate slideIn" role="alert">
                        {notification}
                    </div>}
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
                                errors.nom = 'Nom est obligatoire';
                            }
                            if (!values.prenom) {
                                errors.prenom = 'Prénom est obligatoire';
                            }
                            if (Context.role === 'Candidat') {
                                if (!values.adresse) {
                                    errors.adresse = 'Adresse est obligatoire';
                                }
                                if (!values.phone) {
                                    errors.phone = 'Téléphone est obligatoire';
                                }
                                if (!values.diplome) {
                                    errors.diplome = 'Diplôme est obligatoire';
                                }
                                if (!values.education) {
                                    errors.education = 'Étude est obligatoire';
                                }
                                if (!values.experience) {
                                    errors.experience = 'Expérience est obligatoire';
                                }
                                if (!values.competence) {
                                    errors.competence = 'Compétence est obligatoire';
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
                                        {loading ? <><span className="spinner-border spinner-border-sm" aria-hidden="true"></span> Saving...</> : <><i className="ti ti-device-floppy" style={{ fontSize: '16px' }}></i>&nbsp;<span style={{ fontSize: '16px' }}>Sauvegarder</span></>}
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