import React, { useContext, useEffect, useState } from 'react'
import CandidatService from '../../services/candidat'
import UserService from '../../services/user'
import { CoockieContext } from '../../features/contexts'
import ReponseService from '../../services/response'
import { toast } from 'react-toastify'

const TestTechnique = () => {
    const [candidatForm, setcandidatForm] = useState()
    const [candidat, setcandidat] = useState()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        reponses: [],
        videos: { questions: [], files: [] }
    });
    const Context = useContext(CoockieContext)
    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            // Handle file input
            const selectedFile = e.target.files[0];
            if (!formData.videos.files.some((file) => file.name === selectedFile.name)) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    videos: {
                        ...prevFormData.videos,
                        questions: [...prevFormData.videos.questions, name],
                        files: [...prevFormData.videos.files, selectedFile],
                    },
                }));
            } else {
                console.log('File is already in the list.');
                e.target.value = '';
            }
        } else {
            // Handle text input
            const index = formData.reponses.findIndex((item) => Object.keys(item)[0] === name);
            if (index !== -1) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    reponses: [
                        ...prevFormData.reponses.slice(0, index),
                        { [name]: value },
                        ...prevFormData.reponses.slice(index + 1),
                    ],
                }));
            } else {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    reponses: [...prevFormData.reponses, { [name]: value }],
                }));
            }
        }
    };
    const handleSubmit = async (e) => {
        setLoading(true)
        const formDataToSend = new FormData();
        formData.videos.files.forEach((file) => {
            formDataToSend.append('videos', file);
        });
        formDataToSend.append('videoQuestions', JSON.stringify(formData.videos.questions));
        formDataToSend.append('formulaireId', candidatForm._id);
        formDataToSend.append('candidatId', Context.id);
        formDataToSend.append('reponses', JSON.stringify(formData.reponses));
        try {
            const response = await ReponseService.createOne(formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success(response.data.message);
            setLoading(false)
        } catch (error) {
            toast.success(error.response.data.message);
            setLoading(false)
        }
    };
    useEffect(() => {
        const fetchForm = async () => {
            const form = await CandidatService.getFormFromCandidat(Context.id)
            setcandidatForm(form.data)
        }
        const fetchCandidat = async () => {
            const user = await UserService.getOne(Context.id)
            setcandidat(user.data)
        }
        fetchCandidat()
        fetchForm()
    }, [Context.id])
    return (
        <div className="container-fluid">
            <div className="card">
                <div className='card-header'>
                    <h2 className="fw-semibold">Formulaire test technique</h2>
                </div>
                <div className="card-body">
                    {(candidatForm && candidat?.testPassed===false) ?  candidatForm.questions.map((el, index) => {
                        return <div key={index} className='d-flex flex-column mb-3'>
                            <label className='h4' htmlFor={index}>{el.questionTitle}</label>
                            {el.questionType === 'Text' ?
                                <textarea name={el.questionTitle} onChange={handleChange} className='form-control' id={index} cols="30" rows="5"></textarea> :
                                <input
                                    type='file'
                                    accept="video/mp4,video/x-m4v,video/*"
                                    name={el.questionTitle}
                                    onChange={handleChange}
                                    className='form-control'
                                />
                            }
                        </div>
                    })
                    : 
                    <>
                    <h1>Test passé</h1>
                    <p>
                        Vous avez déjà passé le test technique, vous allez être notifié par mail aprés l'évaluation de votre test
                        </p>
                        </>
                        }
                    {
                       (candidat?.testPassed===false) && <div className='d-flex justify-content-end mb-4'>
                        <button
                            className='btn btn-primary ms-auto'
                            type='button'
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? <>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> Chargement...
                            </> :
                                <>
                                    <i className="ti ti-device-floppy" style={{ fontSize: '16px' }}></i>
                                    &nbsp;<span style={{ fontSize: '16px' }}>Envoyer</span>
                                </>
                            }
                        </button>
                    </div>}
                </div>
            </div>
        </div >
    )
}

export default TestTechnique