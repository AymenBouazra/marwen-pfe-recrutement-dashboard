import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import CandidatsService from '../../services/candidat'
import FormulairesService from '../../services/formulaire'
import { CoockieContext } from '../../features/contexts';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

const Candidats = () => {
    const [jsonData, setJsonData] = useState(null);
    const [candidats, setCandidats] = useState([])
    const [formulaires, setFormulaires] = useState([])
    const [loading, setLoading] = useState(false)
    const [notification, setNotification] = useState('')
    const [selectedForm, setSelectedForm] = useState({
        idUser: '',
        idFormulaire: ''
    })

    const Context = useContext(CoockieContext)

    const handleChangeSelectForm = (id, { currentTarget }) => {
        setSelectedForm({
            idUser: id,
            idFormulaire: currentTarget.value
        });
    }

    const handleSubmitSelectedForm = async () => {
        const response = await FormulairesService.affectForm(selectedForm.idUser, selectedForm.idFormulaire)
        setSelectedForm({
            idUser: '',
            idFormulaire: ''
        });
        toast.success(response.data.message)
        fetchCandidats()
    }

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
    const fetchFormulaires = async () => {
        const response = await FormulairesService.getAllForms()
        setFormulaires(response.data)

    }

    const deleteCandidat = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await CandidatsService.removeOne(id)
                fetchCandidats()
            }
        })

    }


    useEffect(() => {
        fetchFormulaires()
        fetchCandidats()
    }, [])

    return (
        <div className="container-fluid">
            <div className="card">
                <div className='card-header'>
                    <h2 className="fw-semibold">Candidats</h2>
                </div>
                <div className="card-body">
                    {(Context.role === 'Consultant' || Context.role === 'Administrateur') &&
                        <>
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
                            </div></>}
                    <div className="card w-100">
                        <div className="card-body p-4">
                            <h5 className="card-title fw-semibold mb-4">Liste des candidats</h5>
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
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Formulaire affecté</h6>
                                            </th>
                                            {(Context.role === 'Administrateur' || Context.role === 'Evaluateur' || Context.role==='Consultant RH') && <th className="border-bottom-0" style={{ width: '350px' }}>
                                                <h6 className="fw-semibold mb-0">Actions</h6>
                                            </th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {candidats.length === 0 ?
                                            <tr>
                                                <td colSpan={6}><h4 className='text-center text-muted'>No candidats yet received</h4></td>
                                            </tr> :
                                            candidats?.map((data, index) => {
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
                                                                <span className="badge bg-light text-dark rounded-3 fw-semibold">{data.email}</span>
                                                            </div>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <p className="mb-0 fw-normal">{data.formulaire ? data.formulaire.title : 'N\'est pas affecté'}</p>
                                                        </td>
                                                        {(Context.role === 'Administrateur' || Context.role === 'Evaluateur' || Context.role==='Consultant RH')&& 
                                                            <td className="border-bottom-0 d-flex">
                                                                {(Context.role === 'Administrateur' || Context.role==='Consultant RH')&&<button onClick={() => deleteCandidat(data._id)} className='btn btn-danger me-2'><i className='ti ti-trash'></i></button>}
                                                                { !data.reponse ? 
                                                                <>
                                                                    {<select className={`form-select me-2 ${data.formulaire && 'cursor-not-allowed'}`} title='Affecter un formulaire'
                                                                        style={{ minWidth: '150px' }}
                                                                        onChange={(event) => handleChangeSelectForm(data._id, event)}
                                                                        disabled={data.formulaire}>
                                                                        <option value="">Affecter un formulaire</option>
                                                                        {formulaires?.map((formulaire, i) => {
                                                                            return <option key={i} value={formulaire._id}>{formulaire.title}</option>
                                                                        })}
                                                                    </select>}
                                                                    {(selectedForm.idFormulaire !== '' && selectedForm.idUser === data._id) &&
                                                                        <button className='btn btn-success' onClick={() => handleSubmitSelectedForm(data._id)}>
                                                                            <i className='ti ti-check'></i>
                                                                        </button>
                                                                    }
                                                                </>
                                                                    : (data.reponse && (Context.role === 'Administrateur' || Context.role === 'Evaluateur')) &&
                                                                     !data.statut ?
                                                                      <Link to={'/evaluate/' + data._id + '/' + data.reponse._id} className='btn btn-secondary'>Evaluate</Link> :
                                                                       <span className={`fw-semibold ${data.statut===true ?'text-success': 'text-danger'} uppercase`}>{data.statut===true ?
                                                                       'Accepté' : 'Refusé'}</span>
                                                                       }

                                                            </td>}
                                                            {/* <><button onClick={() => accepterCandidat(data._id)} className='btn btn-success me-2'>{loading ? <><span className="spinner-border spinner-border-sm" aria-hidden="true"></span> Saving...</> : <> Accepter <i className='ti ti-check'></i></>}</button>
                                                                    <button onClick={() => refuserCandidat(data._id)} className='btn btn-danger me-2'>{loading ? <><span className="spinner-border spinner-border-sm" aria-hidden="true"></span> Saving...</> : <>Refuser <i className='ti ti-x'></i></>}</button></> */}
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