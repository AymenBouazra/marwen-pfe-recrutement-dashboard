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

                const response = await axios.post(process.env.REACT_APP_BASE_URL + '/api/auth/login', values)
                if (response.status === 200) {
                    setCookie("token", response.data.token, { maxAge: rememberDevice ? oneDayInSeconds * 14 : oneDayInSeconds });
                    window.location.href = '/'
                }
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
                if (error.response.status === 400 && error.response.data.message === 'Please check your mailbox to verify your account!') {
                    toast.warning(error.response.data.message)
                    navigate('/account-confirmation?email=' + values.email)
                } else if (error.response.status === 400 && error.response.data.message === 'Email or password incorrect') {
                    toast.warning(error.response.data.message)
                } else if (error.response.status === 401) {
                    navigate('/new-password?email=' + values.email)
                } else {
                    toast.error(error.response.data.message)
                }
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
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Adresse e-mail </label>
                                        <input type="email" className={"form-control " + (!formik.touched.email ? '' : formik.touched.email && formik.errors.email ? 'is-invalid' : 'is-valid')} id="email"
                                            name="email"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                            defaultValue='admin@gmail.com' />
                                        {formik.touched.email && formik.errors.email && (
                                            <div className='pt-2 text-danger'>{formik.errors.email}</div>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label">Mot de passe</label>
                                        <input type="password" className={"form-control " + (!formik.touched.password ? '' : formik.touched.password && formik.errors.password ? 'is-invalid' : 'is-valid')} id="password"
                                            name="password"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                            defaultValue='123456' />
                                        {formik.touched.password && formik.errors.password && (
                                            <div className='pt-2 text-danger'>{formik.errors.password}</div>)}
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <div className="form-check">
                                            <input className="form-check-input primary" type="checkbox" value="" id="flexCheckChecked" checked={rememberDevice} onChange={() => setRememberDevice(!rememberDevice)} />
                                            <label className="form-check-label text-dark" htmlFor="flexCheckChecked">
                                                Me souvenir
                                            </label>
                                        </div>
                                        <Link className="text-primary fw-bold" to="/forget-password">Mot de passe oublié?</Link>
                                    </div>
                                    <button type='submit' disabled={loading} className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">
                                        {loading ?
                                            <div>
                                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                                <span> Connection...</span>
                                            </div>
                                            : 'Sign In'}
                                    </button>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <p className="fs-4 mb-0 fw-bold">Nouveau à Recrute?</p>
                                        <Link className="text-primary fw-bold ms-2" to="/register">Create an account</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-none'>
                {JSON.stringify(cookies)}
            </div>
        </div>
    )
}

export default Login