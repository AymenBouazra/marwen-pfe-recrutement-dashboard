import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import { toast } from 'react-toastify'
import axios from 'axios';


const Register = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const validate = values => {
        const errors = {};
        if (!values.prenom) {
            errors.prenom = 'First name is required';
        } else if (values.prenom.length > 15) {
            errors.prenom = 'Must be 15 characters or less';
        }

        if (!values.nom) {
            errors.nom = 'Last name is required';
        } else if (values.nom.length > 20) {
            errors.nom = 'Must be 20 characters or less';
        }

        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 6) {
            errors.password = 'Must be 6 characters or more';
        }
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            prenom: '',
            nom: '',
            email: '',
            password: '',
        },
        validate,
        onSubmit: async values => {
            try {
                setLoading(true)
                const response = await axios.post(process.env.REACT_APP_BASE_URL + 'auth/register', values)
                toast.success(response.data.message)
                navigate('/login')
                setLoading(false)
            } catch (error) {
                toast.error(error.response.data.message)
                setLoading(false)
            }
        },
    });
    return (
        <div
            className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
            <div className="d-flex align-items-center justify-content-center w-100">
                <div className="row justify-content-center w-100">
                    <div className="col-md-8 col-lg-6 col-xxl-3">
                        <div className="card mb-0">
                            <div className="card-body">
                                <Link to="/" className="text-nowrap logo-img text-center d-block py-3 w-100">
                                    <img src="img/logo/dark-logo.svg" width="180" alt="" />
                                </Link>
                                <p className="text-center">Your Social Campaigns</p>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="prenom" className="form-label">First name</label>
                                        <input type="text" className={"form-control " + (!formik.touched.prenom ? '' : formik.touched.prenom && formik.errors.prenom ? 'is-invalid' : 'is-valid')} id="prenom"
                                            name="prenom"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.prenom} />
                                        {formik.touched.prenom && formik.errors.prenom && (
                                            <div className='pt-2 text-danger'>{formik.errors.prenom}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="nom" className="form-label">Last name</label>
                                        <input type="text" className={"form-control " + (!formik.touched.nom ? '' : formik.touched.nom && formik.errors.nom ? 'is-invalid' : 'is-valid')} id="nom"
                                            name="nom"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.nom} />
                                        {formik.touched.nom && formik.errors.nom && (
                                            <div className='pt-2 text-danger'>{formik.errors.nom}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input type="email" className={"form-control " + (!formik.touched.email ? '' : formik.touched.email && formik.errors.email ? 'is-invalid' : 'is-valid')} id="email"
                                            name="email"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email} />
                                        {formik.touched.email && formik.errors.email && (
                                            <div className='pt-2 text-danger'>{formik.errors.email}</div>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className={"form-control " + (!formik.touched.password ? '' : formik.touched.password && formik.errors.password ? 'is-invalid' : 'is-valid')} id="password"
                                            name="password"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password} />
                                        {formik.touched.password && formik.errors.password && (
                                            <div className='pt-2 text-danger'>{formik.errors.password}</div>)}
                                    </div>
                                    <button type='submit' disabled={loading} className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">
                                        {loading ?
                                            <div>
                                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                                <span> Creating...</span>
                                            </div>
                                            : 'Sign Up'}
                                    </button>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <p className="fs-4 mb-0 fw-bold">Already have an Account?</p>
                                        <Link className="text-primary fw-bold ms-2" to="/login">Sign In</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register