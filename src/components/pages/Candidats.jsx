import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import CandidatsService from '../../services/candidat'
const Candidats = () => {
    const [jsonData, setJsonData] = useState(null);
    const [candidats, setCandidats] = useState([])
    const [loading, setLoading] = useState(false)
    const [notification, setNotification] = useState('')

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type !== 'application/json') {
                event.target.value = null
                setJsonData(null)
                toast.warning('The selected file is not of type Json!')
            } else {
                readAndParseJSON(file);
            }
        }
    };

    const readAndParseJSON = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsedData = JSON.parse(event.target.result);
                setJsonData(parsedData);
            } catch (error) {
                console.error('Error parsing JSON: ', error);
                setJsonData(null);
            }
        };
        reader.readAsText(file);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true)
            if (jsonData) {
                const response = await CandidatsService.createOne(jsonData)
                if (response.status === 201 || response.status === 200) {
                    toast.success(response.data.message)
                    setNotification(response.data.message)
                    setJsonData(null)
                    setTimeout(() => {
                        setNotification('')
                    }, 5000)
                    fetchCandidats()
                } else {
                    toast.warning('An error has been occured')
                }
            } else {
                toast.info('Select a file to upload!')
            }
            setLoading(false)
        } catch (error) {
            toast.warning(error.response.data.message)
            setLoading(false)
        }
    }

    const fetchCandidats = async () => {
        const response = await CandidatsService.getAllCandidats()
        setCandidats(response.data)

    }

    const deleteCandidat = async (id) => {
        await CandidatsService.removeOne(id)
        fetchCandidats()
    }
    useEffect(() => {
        fetchCandidats()
    }, [])

    return (
        <div className="container-fluid">
            <div className="card">
                <div className='card-header'>
                    <h2 className="fw-semibold">Candidats</h2>
                </div>
                <div className="card-body">
                    <h6 className='mb-3'>To upload candidats please select a .Json File below.</h6>
                    <input
                        type="file"
                        onChange={handleFileUpload}
                        className='form-control mb-2'
                        accept="application/JSON"
                    />

                    <div className='d-flex justify-content-end mb-4'>
                        {jsonData && <p className='text-warning'>
                            {jsonData.length + ' candidats'}
                        </p>
                        }
                        {notification && (
                            <div className='animate slideIn'>
                                <div className="alert candidats alert-success m-0" role="alert">
                                    {notification}
                                </div>
                            </div>
                        )}
                        <button
                            onClick={handleSubmit}
                            className='btn btn-primary ms-auto'
                            disabled={loading}
                        >
                            {loading ? <><span className="spinner-border spinner-border-sm" aria-hidden="true"></span> Uploading...</> : <><i className="ti ti-upload"></i> Upload file</>}
                        </button>
                    </div>
                    <div className="card w-100">
                        <div className="card-body p-4">
                            <h5 className="card-title fw-semibold mb-4">Recent Transactions</h5>
                            <div className="table-responsive">
                                <table className="table table-hover table-bordered text-nowrap mb-0 align-middle">
                                    <thead className="text-dark fs-4">
                                        <tr>
                                            <th className="border-bottom-0">
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
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Actions</h6>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {candidats.length === 0 ?
                                            <tr>
                                                <td colSpan={5}><h4 className='text-center text-muted'>No candidats yet received</h4></td>
                                            </tr> :
                                            candidats?.map((data, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="border-bottom-0"><h6 className="fw-semibold mb-0">{index + 1}</h6></td>
                                                        <td className="border-bottom-0">
                                                            <h6 className="fw-semibold mb-1">{data.nom}</h6>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <p className="mb-0 fw-normal">{data.prenom}</p>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <span className="badge bg-primary rounded-3 fw-semibold">{data.email}</span>
                                                            </div>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <button onClick={() => deleteCandidat(data._id)} className='btn btn-danger me-2'><i className='ti ti-trash'></i></button>
                                                            <button className='btn btn-success'><i className='ti ti-edit'></i></button>
                                                        </td>
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
        </div>
    )
}

export default Candidats