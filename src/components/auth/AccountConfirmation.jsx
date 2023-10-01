import React, { useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const AccountConfirmation = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const email = searchParams.get('email');
    const validate = values => {
        const errors = {};
        if (!values.code) {
            errors.code = 'Code is required';
        } else if (values.code.length !== 6) {
            errors.code = 'Code must be 6 caracters';
        }
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            code: '',
        },
        validate,
        onSubmit: async values => {
            try {
                setLoading(true)
                const data = {
                    confirmationCode: values.code,
                    email
                }
                const response = await axios.put(process.env.REACT_APP_BASE_URL + 'auth/account-confirmation', data)

                if (response.status === 200) {
                    toast.success(response.data.message)
                    navigate('/login')
                }
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

    const resendCode = async () => {
        try {
            const data = {
                email
            }
            const response = await axios.put(process.env.REACT_APP_BASE_URL + 'auth/resend-code', data)
            if (response.status === 200) {
                toast.success(response.data.message)
            }
        } catch (error) {
            if (error.response.status === 400) {
                toast.error(error.response.data.message)
            } else if (error.response.status === 500) {
                toast.error(error.response.data.message)
            }
        }
    }
    return (
        <div
            className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
            <div className="d-flex align-items-center justify-content-center w-100">
                <div className="row justify-content-center w-100">
                    <div className="col-md-8 col-lg-6 col-xxl-3">
                        <div className="card mb-0">
                            <div className="card-body">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="code" className="form-label text-center w-100">Confirmation code</label>
                                        <input type="code" className={"form-control"} id="code"
                                            name="code"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.code} />
                                        {formik.touched.code && formik.errors.code && (
                                            <div className='pt-2 text-danger'>{formik.errors.code}</div>)}
                                    </div>
                                    <button type='submit' className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">{loading ?
                                        <div>
                                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                            <span> Verifying...</span>
                                        </div>
                                        : 'Submit code'}</button>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <p className="fs-4 mb-0 fw-bold">Didn't receive the confirmation code? <strong className='text-primary cursor-pointer' onClick={resendCode} > {loading ? 'Sending...' : 'Resend'}</strong> </p>
                                    </div>

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

export default AccountConfirmation