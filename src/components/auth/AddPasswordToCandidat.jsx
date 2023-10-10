import React, { useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';

const AddPasswordToCandidat = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const email = searchParams.get('email');
    const validate = values => {
        const errors = {};
        if (!values.password) {
            errors.password = 'Password est obligatoire';
        } else if (values.password.length < 6) {
            errors.password = 'Must be 6 characters or more';
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = 'Password confirmation est obligatoire';
        } else if (values.confirmPassword.length < 6) {
            errors.confirmPassword = 'Must be 6 characters or more';
        } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'The password and password confirmation must be identical!';
        }
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validate,
        onSubmit: async values => {
            try {
                setLoading(true)
                const response = await axios.put(process.env.REACT_APP_BASE_URL + '/api/auth/new-password/' + email, { password: values.password })
                toast.success(response.data.message)
                navigate('/login')
                setLoading(false)
            } catch (error) {
                if (error.response.status === 400) {
                    toast.error(error.response.data.message)
                    navigate('/forget-password')
                } else if (error.response.status === 500) {
                    toast.error(error.response.data.message)
                }
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
                                <div className="text-nowrap logo-img text-center d-block py-3 w-100">
                                    <img src="img/logo/logo-color-1.svg" width="180" alt="" />
                                </div>

                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label">Nouveau mot de passe</label>
                                        <input type="password" className={"form-control " + (!formik.touched.password ? '' : formik.touched.password && formik.errors.password ? 'is-invalid' : 'is-valid')} id="password"
                                            name="password"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password} />
                                        {formik.touched.password && formik.errors.password && (
                                            <div className='pt-2 text-danger'>{formik.errors.password}</div>)}
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="confirmPassword" className="form-label">Confirmer mot de passe</label>
                                        <input type="password" className={"form-control " + (!formik.touched.confirmPassword ? '' : formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : 'is-valid')} id="confirmPassword"
                                            name="confirmPassword"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.confirmPassword} />
                                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                            <div className='pt-2 text-danger'>{formik.errors.confirmPassword}</div>)}
                                    </div>
                                    <button type='submit' disabled={loading} className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">{loading ?
                                        <div>
                                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                            <span> Changement en cours...</span>
                                        </div>
                                        : 'Changer'}</button>

                                    <div className="d-flex align-items-center justify-content-center">
                                        <p className="fs-4 mb-0 fw-bold">Retourner à</p>
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

export default AddPasswordToCandidat