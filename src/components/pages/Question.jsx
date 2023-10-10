import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import QuestionService from '../../services/question'
import { Formik } from 'formik';
import { CoockieContext } from '../../features/contexts';
import FormService from '../../services/formulaire'

const Question = () => {
    const [questions, setQuestions] = useState([])
    const [forms, setForms] = useState([])
    const [loading, setLoading] = useState(false)
    const [formUpdateOpen, setQuestionUpdateOpen] = useState(false)
    const [notification, setNotification] = useState('')
    const [form, setQuestion] = useState({})
    const Context = useContext(CoockieContext)

    const fetchQuestions = async () => {
        const response = await QuestionService.getAllQuestions()
        setQuestions(response.data)

    }
    const fetchForms = async () => {
        const response = await FormService.getAllForms()
        setForms(response.data)

    }
    const fetchQuestion = async (id) => {
        const response = await QuestionService.getOne(id)
        setQuestion(response.data)
        setQuestionUpdateOpen(prev => { return !prev })
    }

    const deleteQuestion = async (id) => {
        await QuestionService.removeOne(id)
        fetchQuestions()
    }

    useEffect(() => {
        fetchQuestions()
        fetchForms()
    }, [])

    return (
        <div className="container-fluid">
            <div className="card">
                <div className='card-header'>
                    <h2 className="fw-semibold">Questions</h2>
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
                            <i className='ti ti-plus'></i>  Create form
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
                                        questionTitle: '',
                                        questionType: '',
                                        formulaireId: ''
                                    }}
                                    validate={(values) => {
                                        const errors = {};
                                        if (!values.questionTitle) {
                                            errors.questionTitle = 'Question est obligatoire';
                                        }
                                        if (!values.questionType) {
                                            errors.questionType = 'Type est obligatoire';
                                        }
                                        if (!values.formulaireId) {
                                            errors.formulaireId = 'Formulaire est obligatoire';
                                        }

                                        return errors;
                                    }}
                                    onSubmit={async (values, resetQuestion) => {
                                        setLoading(true);
                                        try {
                                            const response = await QuestionService.createOne(values)
                                            toast.success(response.data.message)
                                            setNotification(response.data.message)
                                            fetchQuestions()
                                            setTimeout(() => {
                                                setNotification('')
                                            }, 5000)
                                        } catch (error) {
                                            toast.warning(error.response.data.message)
                                        }
                                        setLoading(false);
                                        resetQuestion()
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
                                                <label htmlFor="questionTitle" className="form-label">
                                                    Question
                                                </label>
                                                <input type="text" value={values.questionTitle || ''} onChange={handleChange} onBlur={handleBlur} name="questionTitle" id='questionTitle' className="form-control" />
                                                <p className="text-danger" > {errors.questionTitle && touched.questionTitle && errors.questionTitle}</p>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <label htmlFor="questionType" className="form-label">
                                                    Type de réponse
                                                </label>
                                                <select name="questionType" id="questionType2" value={values.questionType || ''} onBlur={handleBlur} onChange={handleChange} className="form-control">
                                                    <option value="">Choisissez un type</option>
                                                    <option value="Text">Texte</option>
                                                    <option value="Video">Vidéo</option>
                                                </select>
                                                <p className="text-danger" > {errors.questionType && touched.questionType && errors.questionType}</p>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <label htmlFor="formulaireId" className="form-label">
                                                    Affecter au formulaire:
                                                </label>
                                                <select name="formulaireId" id="formulaireId2" value={values.formulaireId || ''} onBlur={handleBlur} onChange={handleChange} className="form-control">
                                                    <option value="">Choisissez un formulaire</option>
                                                    {forms.map((f, index) => {
                                                        return (
                                                            <option key={index} value={f._id}>{f.title}</option>
                                                        )
                                                    })}
                                                </select>
                                                <p className="text-danger" > {errors.formulaireId && touched.formulaireId && errors.formulaireId}</p>
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
                                        onClick={() => setQuestionUpdateOpen(false)}
                                    >
                                        <i className='ti ti-x'></i>
                                    </button>
                                    {notification && <div className="alert alert-success animate slideIn" role="alert">
                                        {notification}
                                    </div>}
                                </div>
                                <Formik
                                    initialValues={form ? form : {
                                        questionTitle: '',
                                        questionType: '',
                                        formulaireId: ''
                                    }}
                                    validate={(values) => {
                                        const errors = {};
                                        if (!values.questionTitle) {
                                            errors.questionTitle = 'Nom est obligatoire';
                                        }
                                        if (!values.questionType) {
                                            errors.questionType = 'Prénom est obligatoire';
                                        }
                                        if (!values.formulaireId) {
                                            errors.formulaireId = 'Prénom est obligatoire';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={async (values, resetQuestion) => {
                                        setLoading(true);
                                        try {
                                            const response = await QuestionService.updateOne(form._id, values)
                                            toast.success(response.data.message)
                                            setLoading(false);
                                            fetchQuestions()
                                            setQuestionUpdateOpen(false)
                                            resetQuestion()
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
                                                <label htmlFor="questionTitle" className="form-label">
                                                    Question
                                                </label>
                                                <input type="text" value={values.questionTitle || ''} onChange={handleChange} name="questionTitle" onBlur={handleBlur} id='questionTitle2' className="form-control" />
                                                <p className="text-danger" > {errors.questionTitle && touched.questionTitle && errors.questionTitle}</p>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <label htmlFor="questionType2" className="form-label">
                                                    Type de réponse
                                                </label>
                                                <select name="questionType" id="questionType2" value={values.questionType || ''} onBlur={handleBlur} onChange={handleChange} className="form-control">
                                                    <option value="">Choisissez un type</option>
                                                    <option value="Text">Texte</option>
                                                    <option value="Video">Vidéo</option>
                                                </select>
                                                <p className="text-danger" > {errors.questionType && touched.questionType && errors.questionType}</p>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <label htmlFor="formulaireId" className="form-label">
                                                    Affecter au formulaire:
                                                </label>
                                                <select name="formulaireId" id="formulaireId2" value={values.formulaireId || ''} onBlur={handleBlur} onChange={handleChange} className="form-control">
                                                    <option value="">Choisissez un formulaire</option>
                                                    {forms.map((f, index) => {
                                                        return (
                                                            <option key={index} value={f._id}>{f.title}</option>
                                                        )
                                                    })}
                                                </select>
                                                <p className="text-danger" > {errors.formulaireId && touched.formulaireId && errors.formulaireId}</p>
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
                            <h5 className="card-title fw-semibold mb-4">Liste des questions</h5>
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
                                                <h6 className="fw-semibold mb-0">Type</h6>
                                            </th>
                                            {(Context.role === 'Administrateur' || Context.role === 'Consultant') && <th className="border-bottom-0" style={{ width: '100px' }}>
                                                <h6 className="fw-semibold mb-0">Actions</h6>
                                            </th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {questions.length === 0 ?
                                            <tr>
                                                <td colSpan={5}><h4 className='text-center text-muted'>No questions yet received</h4></td>
                                            </tr> :
                                            questions?.map((data, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="border-bottom-0"><h6 className="fw-semibold mb-0">{index + 1}</h6></td>
                                                        <td className="border-bottom-0">
                                                            <h6 className="fw-normal mb-1">{data.questionTitle}</h6>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <p className="mb-0 fw-normal">{data.questionType}</p>
                                                        </td>
                                                        {(Context.role === 'Administrateur' || Context.role === 'Consultant') && <td className="border-bottom-0">
                                                            <button onClick={() => deleteQuestion(data._id)} className='btn btn-danger me-2'><i className='ti ti-trash'></i></button>
                                                            <button className='btn btn-success'
                                                                type='button'
                                                                onClick={() => fetchQuestion(data._id)}
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

export default Question