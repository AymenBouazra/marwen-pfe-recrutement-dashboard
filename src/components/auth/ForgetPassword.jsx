import React, { useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

const ForgetPassword = () => {
    const [loading, setLoading] = useState(false)
    const validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate,
        onSubmit: async values => {
            try {
                setLoading(true)
                const response = await axios.post(process.env.REACT_APP_BASE_URL + 'auth/forget-password', values)
                toast.success(response.data.message)
                setLoading(false)
            } catch (error) {
                if (error.response.status === 400) {
                    console.log(error.response);
                    toast.error(error.response.data.message)
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
                                    <img src="img/logo/dark-logo.svg" width="180" alt="" />
                                </div>
                                <p className="text-center">Your Social Campaigns</p>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-4">
                                        <h1 htmlFor="email" className="form-label text-center w-100 mb-3">Enter your e-mail adress here </h1>
                                        <input type="email" className={"form-control"} id="email"
                                            name="email"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email} />
                                        {formik.touched.email && formik.errors.email && (
                                            <div className='pt-2 text-danger'>{formik.errors.email}</div>)}
                                    </div>
                                    <button type='submit' disabled={loading} className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">{loading ?
                                        <div>
                                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                            <span> Verifying...</span>
                                        </div>
                                        : 'Search'}</button>

                                    <div className="d-flex align-items-center justify-content-center">
                                        <p className="fs-4 mb-0 fw-bold">Return to</p>
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

export default ForgetPassword