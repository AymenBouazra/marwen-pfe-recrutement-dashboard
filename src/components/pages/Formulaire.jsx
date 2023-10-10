import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import FormService from '../../services/formulaire'
import { Formik } from 'formik';
import { CoockieContext } from '../../features/contexts';


const Forms = () => {
    const [forms, setForms] = useState([])
    const [loading, setLoading] = useState(false)
    const [formUpdateOpen, setFormUpdateOpen] = useState(false)
    const [notification, setNotification] = useState('')
    const [form, setForm] = useState({})

    const Context = useContext(CoockieContext)

    const fetchForms = async () => {
        const response = await FormService.getAllForms()
        setForms(response.data)

    }
    const fetchForm = async (id) => {
        const response = await FormService.getOne(id)
        setForm(response.data)
        setFormUpdateOpen(prev => { return !prev })
    }

    const deleteConsultant = async (id) => {
        await FormService.removeOne(id)
        fetchForms()
    }

    useEffect(() => {
        fetchForms()
    }, [])

    return (
        <div className="container-fluid">
            <div className="card">
                <div className='card-header'>
                    <h2 className="fw-semibold">Formulaires</h2>
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
                            <i className='ti ti-plus'></i>  Créé un formulaire
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
                                        title: '',
                                        description: ''
                                    }}
                                    validate={(values) => {
                                        const errors = {};
                                        if (!values.title) {
                                            errors.title = 'Titre est obligatoire';
                                        }
                                        if (!values.description) {
                                            errors.description = 'Type est obligatoire';
                                        }

                                        return errors;
                                    }}
                                    onSubmit={async (values) => {
                                        try {
                                            setLoading(true);
                                            const response = await FormService.createOne(values)
                                            toast.success(response.data.message)
                                            setLoading(false);
                                            setNotification(response.data.message)
                                            setTimeout(() => {
                                                fetchForms()
                                                setNotification('')
                                            }, 5000)
                                        } catch (error) {
                                            toast.warning(error.response.data.message)
                                            setLoading(false);
                                        }
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
                                            <div className="col-12">
                                                <label htmlFor="title" className="form-label">
                                                    Titre
                                                </label>
                                                <input type="text" value={values.title || ''} onChange={handleChange} onBlur={handleBlur} name="title" id='title' className="form-control" />
                                                <p className="text-danger" > {errors.title && touched.title && errors.title}</p>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="description" className="form-label">
                                                    Description
                                                </label>
                                                <textarea name="description" id="description2" value={values.description || ''} onBlur={handleBlur} onChange={handleChange} className="form-control" cols="30" rows="10"></textarea>
                                                <p className="text-danger" > {errors.description && touched.description && errors.description}</p>
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
                                    initialValues={form ? form : {
                                        title: '',
                                        description: '',
                                    }}
                                    validate={(values) => {
                                        const errors = {};
                                        if (!values.title) {
                                            errors.title = 'Nom est obligatoire';
                                        }
                                        if (!values.description) {
                                            errors.description = 'Prénom est obligatoire';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={async (values, resetForm) => {
                                        setLoading(true);
                                        try {
                                            const response = await FormService.updateOne(form._id, values)
                                            toast.success(response.data.message)
                                            setLoading(false);
                                            resetForm()
                                            fetchForms()
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
                                            <div className="col-12">
                                                <label htmlFor="title2" className="form-label">
                                                    Titre
                                                </label>
                                                <input type="text" value={values.title || ''} onChange={handleChange} onBlur={handleBlur} name="title" id='title2' className="form-control" />
                                                <p className="text-danger" > {errors.title && touched.title && errors.title}</p>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="description2" className="form-label">
                                                    Description
                                                </label>
                                                <textarea name="description" id="description2" value={values.description || ''} onBlur={handleBlur} onChange={handleChange} className="form-control" cols="30" rows="10"></textarea>
                                                <p className="text-danger" > {errors.description && touched.description && errors.description}</p>
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
                            <h5 className="card-title fw-semibold mb-4">Liste des forms</h5>
                            <div className="table-responsive">
                                <table className="table table-hover table-bordered text-nowrap mb-0 align-middle">
                                    <thead className="text-dark fs-4">
                                        <tr>
                                            <th className="border-bottom-0" style={{ width: '50px' }}>
                                                <h6 className="fw-semibold mb-0">Id</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Titre</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Description</h6>
                                            </th>
                                            {(Context.role === 'Administrateur' || Context.role === 'Consultant') && <th className="border-bottom-0" style={{ width: '100px' }}>
                                                <h6 className="fw-semibold mb-0">Actions</h6>
                                            </th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {forms.length === 0 ?
                                            <tr>
                                                <td colSpan={5}><h4 className='text-center text-muted'>No forms yet received</h4></td>
                                            </tr> :
                                            forms?.map((data, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="border-bottom-0"><h6 className="fw-semibold mb-0">{index + 1}</h6></td>
                                                        <td className="border-bottom-0">
                                                            <h6 className="fw-normal mb-1">{data.title}</h6>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <p title={data.description} className="mb-0 fw-normal">{data.description.length > 50 ? data.description.substring(0, 50) + '...' : data.description}</p>
                                                        </td>
                                                        {(Context.role === 'Administrateur' || Context.role === 'Consultant') && <td className="border-bottom-0">
                                                            <button onClick={() => deleteConsultant(data._id)} className='btn btn-danger me-2'><i className='ti ti-trash'></i></button>
                                                            <button className='btn btn-success'
                                                                type='button'
                                                                onClick={() => fetchForm(data._id)}
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

export default Forms