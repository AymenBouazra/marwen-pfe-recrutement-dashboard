import React, { useContext, useEffect, useState } from 'react'
import EvaluationService from '../../services/evaluation'
import { CoockieContext } from '../../features/contexts'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const Evaluations = () => {
    const [evaluations, setEvaluations] = useState([])
    const [loading, setLoading] = useState(false)
    const Context = useContext(CoockieContext)

    const fetchEvaluations = async () => {
        const response = await EvaluationService.getAllEvaluations()
        setEvaluations(response.data)

    }

    const accepterCandidat = async (id) => {
        Swal.fire({
            title: 'Vous êtes sûr?',
            text: "Vous ne pourrez pas revenir en arrière !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#34aadc',
            cancelButtonColor: '#757575',
            cancelButtonText: 'Annuler',
            confirmButtonText: 'Oui!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true)

                    const response = await EvaluationService.accepter(id)
                    toast.success(response.data.message)
                    setLoading(false)
                } catch (error) {
                    setLoading(false)
                    toast.error(error.response.data.message)
                }
            }
            fetchEvaluations()
        })
    }

    const refuserCandidat = async (id) => {
        Swal.fire({
            title: 'Vous êtes sûr?',
            text: "Vous ne pourrez pas revenir en arrière !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#34aadc',
            cancelButtonColor: '#757575',
            cancelButtonText: 'Annuler',
            confirmButtonText: 'Oui!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true)

                    const response = await EvaluationService.refuser(id)
                    toast.success(response.data.message)
                    setLoading(false)
                } catch (error) {
                    setLoading(false)
                    toast.error(error.response.data.message)
                }
            }
            fetchEvaluations()
        })
    }

    useEffect(() => {
        fetchEvaluations()
    }, [])

    return (
        <div className="container-fluid">
            <div className="card">
                <div className='card-header'>
                    <h2 className="fw-semibold">Evaluations</h2>
                </div>
                <div className="card-body">
                    <div className="w-100">
                        <div className="p-4">
                            <h5 className="card-title fw-semibold mb-4">Liste des evaluations</h5>
                            <div className="table-responsive">
                                <table className="table table-hover table-bordered text-nowrap mb-0 align-middle">
                                    <thead className="text-dark fs-4">
                                        <tr>
                                            <th className="border-bottom-0" style={{ width: '50px' }}>
                                                <h6 className="fw-semibold mb-0">Id</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Candidat</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Note</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Evalué par</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Commentaire</h6>
                                            </th>
                                            <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">Formulaire</h6>
                                            </th>
                                            {Context.role === 'Administrateur' && <th className="border-bottom-0" style={{ width: '100px' }}>
                                                <h6 className="fw-semibold mb-0">Actions</h6>
                                            </th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {evaluations.length === 0 ?
                                            <tr>
                                                <td colSpan={6}><h4 className='text-center text-muted'>No evaluations yet received</h4></td>
                                            </tr> :
                                            evaluations?.map((data, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="border-bottom-0"><h6 className="fw-semibold mb-0">{index + 1}</h6></td>
                                                        <td className="border-bottom-0">
                                                            <h6 className="fw-normal mb-1">{data.candidatId.nom + ' ' + data.candidatId.prenom}</h6>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <p className="mb-0 fw-semibold">{data.note}%</p>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <p className="mb-0 fw-normal">{data.evaluateurId.nom + ' ' + data.evaluateurId.prenom}</p>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <p className="mb-0 fw-normal">{data.commentaire}</p>
                                                        </td>
                                                        <td className="border-bottom-0">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <span className="fw-semibold">{data.formulaireId.title}</span>
                                                            </div>
                                                        </td>
                                                        {(Context.role === 'Administrateur' || (Context.role === 'Evaluateur' && data.statut)) && <td className="border-bottom-0">
                                                            {data.statut === true ? <span className='fw-semibold text-success uppercase'>Accepté</span> : data.statut === false ? <span className='fw-semibold text-danger uppercase'>Refusé</span> :
                                                                <><button onClick={() => accepterCandidat(data._id)} className='btn btn-success me-2'>{loading ? <><span className="spinner-border spinner-border-sm" aria-hidden="true"></span> Saving...</> : <> Accepter <i className='ti ti-check'></i></>}</button>
                                                                    <button onClick={() => refuserCandidat(data._id)} className='btn btn-danger me-2'>{loading ? <><span className="spinner-border spinner-border-sm" aria-hidden="true"></span> Saving...</> : <>Refuser <i className='ti ti-x'></i></>}</button></>}

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

export default Evaluations