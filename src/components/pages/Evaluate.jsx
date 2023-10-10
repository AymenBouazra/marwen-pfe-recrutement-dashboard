import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReponseService from '../../services/response'
import ReactPlayer from 'react-player'
import EvaluationService from '../../services/evaluation'
import { CoockieContext } from '../../features/contexts'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

const Evaluate = () => {
    const [candidatReponse, setCandidatReponse] = useState()
    const [loading, setLoading] = useState(false)
    const [notes, setNotes] = useState([])
    const [commentaire, setCommentaire] = useState('')
    const navigate = useNavigate()
    const Context = useContext(CoockieContext)

    const { idCandidat, idReponse } = useParams()

    const handleCollectNotes = (e) => {
        const { id, value } = e.target;
        const existingNoteIndex = notes.findIndex((note) => note[id] !== undefined);

        if (existingNoteIndex !== -1) {
            const updatedNotes = [...notes];
            updatedNotes[existingNoteIndex][id] = value;
            setNotes(updatedNotes);
        } else {
            setNotes([...notes, { [id]: Number(value) }]);
        }
        console.log(notes);
    };

    const handleSubmit = async () => {
        let sumNotes = 0
        let noteLength = notes.length
        for (let note of notes) {
            console.log(Object.values(note));
            sumNotes += Number(Object.values(note)[0])
        }
        const calcul = (sumNotes / (noteLength * 5)) * 100
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
                    const obj = {
                        candidatId: idCandidat,
                        reponseId: idReponse,
                        evaluateurId: Context.id,
                        note: calcul,
                        formulaireId: candidatReponse.formulaireId,
                        commentaire: commentaire
                    }
                    const response = await EvaluationService.createOne(obj)
                    toast.success(response.data.message)
                    navigate('/evaluations')
                    setLoading(false)
                } catch (error) {
                    setLoading(false)
                    toast.error(error.response.data.message)
                }
            }
        })


    }
    useEffect(() => {
        const fetchReponse = async () => {
            const response = await ReponseService.getOne(idReponse)
            setCandidatReponse(response.data)
        }
        fetchReponse()
    }, [idReponse])

    return (
        <div className="container-fluid">
            <div className="card">
                <div className='card-header'>
                    <h2 className="fw-semibold">
                        Evaluation for candidat: {candidatReponse?.candidatId.nom + ' ' + candidatReponse?.candidatId.prenom}
                    </h2>
                </div>
                <div className="card-body">
                    {candidatReponse && candidatReponse.reponses.map((reponse, index) => {
                        const question = Object.keys(reponse)[0];
                        const answer = reponse[question];
                        return (
                            <div className="card" key={index}>
                                <div className='card-header py-1 d-flex justify-content-between align-items-center'>
                                    <h5 className="fw-semibold">
                                        {question}
                                    </h5>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <input type='number' className='form-control bg-white me-2' width='100px' id={'noteQuestion n°' + index} onChange={handleCollectNotes} min={0} max={5} /> */5</div>
                                </div>
                                <div className='card-body'>
                                    {answer}
                                </div>
                            </div>
                        );
                    })}
                    {candidatReponse && candidatReponse.videoPaths.map((video, index) => {
                        return (
                            <div className="card" key={index}>
                                <div className='card-header py-1 d-flex justify-content-between'>
                                    <h5 className="fw-semibold">
                                        {video.question}
                                    </h5>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <input type='number' className='form-control bg-white me-2' width='100px' id={'noteVideo n°' + index} onChange={handleCollectNotes} min={0} max={5} /> */5</div>
                                </div>
                                <div className='card-body'>
                                    <ReactPlayer url={video.path} controls width="100%" height='auto' />
                                </div>
                            </div>
                        );
                    })}
                    <hr />
                    <div>
                        <h3>
                            Commentaire
                        </h3>
                        <textarea className='form-control mb-3' onChange={(e) => setCommentaire(e.target.value)} cols="30" rows="5">

                        </textarea>
                    </div>
                    <div className='d-flex justify-content-end mb-4'>
                        <button
                            className='btn btn-primary ms-auto'
                            type='button'
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? <>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> Calcule en cours...
                            </> :
                                <span style={{ fontSize: '16px' }}>Calculer note</span>
                            }
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Evaluate