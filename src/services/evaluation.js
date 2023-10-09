import http from '../utils/http'

const createOne = data => {
    return http.post("evaluation", data);
};

const getOne = (idEvaluateur) => {
    return http.get("evaluation/" + idEvaluateur);
}
const getAllEvaluations = () => {
    return http.get("evaluation");
}

const accepter = (id) => {
    return http.put("evaluation/accepter/" + id);
}

const refuser = (id) => {
    return http.put("evaluation/refuser/" + id);
}

const EvaluationService = {
    createOne,
    getOne,
    getAllEvaluations,
    accepter,
    refuser
}

export default EvaluationService