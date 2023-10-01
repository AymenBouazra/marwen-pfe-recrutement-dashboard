import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

const oneDayInSeconds = 24 * 60 * 60;

const Login = () => {
    const [cookies, setCookie] = useCookies();
    const [loading, setLoading] = useState(false)
    const [rememberDevice, setRememberDevice] = useState(false)
    const navigate = useNavigate()
    const validate = values => {
        const errors = {};
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
            email: '',
            password: '',
        },
        validate,
        onSubmit: async values => {
            try {
                setLoading(true)
                const response = await axios.post(process.env.REACT_APP_BASE_URL + 'auth/login', values)
                setCookie("token", response.data.token, { maxAge: rememberDevice ? oneDayInSeconds * 14 : oneDayInSeconds });
                toast.success(response.data.message)
                navigate('/')
                setLoading(false)
            } catch (error) {
                if (error.response.status === 400) {
                    toast.warning(error.response.data.message)
                    navigate('/account-confirmation?email=' + values.email)
                } else {
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
                                    <img src="img/logo/dark-logo.svg" width="180" alt="" />
                                </div>
                                <p className="text-center">Your Social Campaigns</p>
                                <form onSubmit={formik.handleSubmit}>
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
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <div className="form-check">
                                            <input className="form-check-input primary" type="checkbox" value="" id="flexCheckChecked" checked={rememberDevice} onChange={() => setRememberDevice(!rememberDevice)} />
                                            <label className="form-check-label text-dark" htmlFor="flexCheckChecked">
                                                Remeber this Device
                                            </label>
                                        </div>
                                        <Link className="text-primary fw-bold" to="/forget-password">Forgot Password ?</Link>
                                    </div>
                                    <button type='submit' disabled={loading} className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">
                                        {loading ?
                                            <div>
                                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                                <span> Connecting...</span>
                                            </div>
                                            : 'Sign In'}
                                    </button>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <p className="fs-4 mb-0 fw-bold">New to Modernize?</p>
                                        <Link className="text-primary fw-bold ms-2" to="/register">Create an account</Link>
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

export default Login