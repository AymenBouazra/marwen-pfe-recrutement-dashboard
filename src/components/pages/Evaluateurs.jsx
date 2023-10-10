import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import EvaluateursService from '../../services/evaluateur'
import { Formik } from 'formik';
import { CoockieContext } from '../../features/contexts';


const Evaluateurs = () => {
    const [evaluateurs, setEvaluateurs] = useState([])
    const [loading, setLoading] = useState(false)
    const [formUpdateOpen, setFormUpdateOpen] = useState(false)
    const [notification, setNotification] = useState('')
    const [evaluateur, setEvaluateur] = useState({})
    const Context = useContext(CoockieContext)

    const fetchEvaluateurs = async () => {
        const response = await EvaluateursService.getAllEvaluateurs()
        setEvaluateurs(response.data)

    }
    const fetchEvaluateur = async (id) => {
        const response = await EvaluateursService.getOne(id)
        setEvaluateur(response.data)
        setFormUpdateOpen(prev => { return !prev })
    }

    const deleteEvaluateur = async (id) => {
        await EvaluateursService.removeOne(id)
        fetchEvaluateurs()
    }

    useEffect(() => {
        fetchEvaluateurs()
    }, [])

    return (
        <div className="container-fluid">
            <div className="card">
                <div className='card-header'>
                    <h2 className="fw-semibold">Evaluateurs</h2>
                </div>
                <div className="card-body">
                    {Context.role === 'Administrateur' && <div className='d-flex justify-content-end mb-4'>
                        {!formUpdateOpen && <button
                            className='btn btn-primary ms-auto'
                            type='button'
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseCreate"
                            aria-expanded="false"
                            aria-controls="collapseCreate"
                        >
                            <i className='ti ti-plus'></i>  Create evaluateur
                        </button>}
                    </div>}
                    <div className={`collapse ${formUpdateOpen ? 'd-none' : ''}`} id="collapseCreate">
                        <div className="card">
                            <div className="card-body">
                                {notification && <div className="alert alert-success animate slideIn" role="alert">
                                    {notification}
                                </div>}
                                <Formik
                                    initialValues={{
                                        nom: '',
                                        prenom: '',
                                        email: '',
                                        password: '',
                                        role: 'Evaluateur',
                                        confirmed: true

                                    }}
                                    validate={(values) => {
                                        const errors = {};
                                        if (!values.nom) {
                                            errors.nom = 'Nom est obligatoire';
                                        }
                                        if (!values.prenom) {
                                            errors.prenom = 'Prénom est obligatoire';
                                        }
                                        if (!values.email) {
                                            errors.email = 'Email est obligatoire';
                                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                            errors.email = 'Invalid email address';
                                        }
                                        if (!values.password) {
                                            errors.password = 'Password est obligatoire';
                                        } else if (values.password.length < 6) {
                                            errors.password = 'Must be 6 characters or more';
                                        }

                                        return errors;
                                    }}
                                    onSubmit={async (values, resetForm) => {
                                        setLoading(true);
                                        try {
                                            const response = await EvaluateursService.createOne(values)
                                            toast.success(response.data.message)
                                            setNotification(response.data.message)
                                            fetchEvaluateurs()
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
                                                <input type="email" value={values.email || ''} onChange={handleChange} onBlur={handleBlur} className="form-control" id="email" />
                                            </div>
                                            <div className="mb-3 col-12">
                                                <label htmlFor="password" className="form-label">
                                                    Mot de passe
                                                </label>
                                                <input type="password" value={values.password || ''} onChange={handleChange} onBlur={handleBlur} className="form-control" id="password" />
                                            </div>

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
                    </div>
                    <div className={`collapse ${formUpdateOpen ? 'show' : ''}`} id="collapseUpdate">
                        <div className="card">
                            <div className="card-body">
                                <div className='d-flex justify-content-end mb-4'>
                                    <button
                                        className='btn btn-secondary ms-auto'
                                        type='button'
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseUpdate"
                                        aria-expanded="false"
                                        aria-controls="collapseUpdate"
                                        onClick={() => setFormUpdateOpen(false)}
                                    >
                                        <i className='ti ti-x'></i>
                                    </button>
                                    {notification && <div className="alert alert-success animate slideIn" role="alert">
                                        {notification}
                                    </div>}
                                </div>
                                <Formik
                                    initialValues={evaluateur ? evaluateur : {
                                        nom: '',
                                        prenom: '',
                                        email: '',
                                        password: '',
                                        role: 'Evaluateur',
                                        confirmed: true
                                    }}
                                    validate={(values) => {
                                        const errors = {};
                                        if (!values.nom) {
                                            errors.nom = 'Nom est obligatoire';
                                        }
                                        if (!values.prenom) {
                                            errors.prenom = 'Prénom est obligatoire';
                                        }
                                        if (!values.email) {
                                            errors.email = 'Email est obligatoire';
                                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                            errors.email = 'Invalid email address';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={async (values, resetForm) => {
                                        setLoading(true);
                                        try {
                                            const response = await EvaluateursService.updateOne(evaluateur._id, values)
                                            toast.success(response.data.message)
                                            setLoading(false);
                                            resetForm()
                                            fetchEvaluateurs()
                                            setFormUpdateOpen(false)

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
                                            <div className="col-sm-6 col-xs-12">
                                                <label htmlFor="nom2" className="form-label">
                                                    Nom
                                                </label>
                                                <input type="text" value={values.nom || ''} onChange={handleChange} name="nom" onBlur={handleBlur} className="form-control" />
                                                <p className="text-danger" > {errors.nom && touched.nom && errors.nom}</p>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <label htmlFor="prenom2" className="form-label">
                                                    Prénom
                                                </label>
                                                <input type="text" value={values.prenom || ''} onChange={handleChange} name='prenom' onBlur={handleBlur} className="form-control" id="prenom2" />
                                                <p className="text-danger" > {errors.prenom && touched.prenom && errors.prenom}</p>

                                            </div>
                                            <div className="mb-3 col-12">
                                                <label htmlFor="email2" className="form-label">
                                                    E-mail
                                                </label>
                                                <input type="email" value={values.email || ''} onChange={handleChange} name='email' onBlur={handleBlur} className="form-control" id="email2" />
                                            </div>
                                            <div className="mb-3 col-12">
                                                <label htmlFor="password2" className="form-label">
                                                    Mot de passe
                                                </label>
                                                <input type="password" value={values.password || ''} onChange={handleChange} name='password' onBlur={handleBlur} className="form-control" id="password2" />
                                            </div>
                                            <div className='d-flex justify-content-end mb-4'>
                                                <button
                                                    className='btn btn-primary ms-auto'
                                                    type='submit'
                                                    disabled={loading}
                                                >
                                                    {loading ? <><span className="spinner-border spinner-border-sm" aria-hidden="true"></span> Updating...</> : <><i className="ti ti-device-floppy" style={{ fontSize: '16px' }}></i>&nbsp;<span style={{ fontSize: '16px' }}>Update</span></>}
                                                </button>
                                            </div>
                                        </form>)}
                                </Formik>
                            </div>
                        </div>
                    </div>
                    <div className="w-100">
                        <div className="card-body p-4">
                            <h5 className="card-title fw-semibold mb-4">Liste des evaluateurs</h5>
                            <div className="table-responsive">
                                <table className="table table-hover table-bordered text-nowrap mb-0 align-middle">
                                    <thead className="text-dark fs-4">
                                        <tr>
                                            <th className="border-bottom-0" style={{ width: '50px' }}>
                                                <h6 className="fw-semibold mb-0">Id</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Nom</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Prenom</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Email</h6>
                                            </th>
                                            {Context.role === 'Administrateur' && <th className="border-bottom-0" style={{ width: '100px' }}>
                                                <h6 className="fw-semibold mb-0">Actions</h6>
                                            </th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {evaluateurs.length === 0 ?
                                            <tr>
                                                <td colSpan={5}><h4 className='text-center text-muted'>No evaluateurs yet received</h4></td>
                                            </tr> :
                                            evaluateurs?.map((data, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="border-bottom-0"><h6 className="fw-semibold mb-0">{index + 1}</h6></td>
                                                        <td className="border-bottom-0">
                                                            <h6 className="fw-normal mb-1">{data.nom.toUpperCase()}</h6>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <p className="mb-0 fw-normal">{data.prenom}</p>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <span className="badge bg-primary rounded-3 fw-semibold">{data.email}</span>
                                                            </div>
                                                        </td>
                                                        {Context.role === 'Administrateur' && <td className="border-bottom-0">
                                                            <button onClick={() => deleteEvaluateur(data._id)} className='btn btn-danger me-2'><i className='ti ti-trash'></i></button>
                                                            <button className='btn btn-success'
                                                                type='button'
                                                                onClick={() => fetchEvaluateur(data._id)}
                                                            ><i className='ti ti-edit'></i></button>
                                                        </td>}
                                                    </tr>
                                                )
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Evaluateurs