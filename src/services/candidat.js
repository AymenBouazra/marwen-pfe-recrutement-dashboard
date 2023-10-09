import http from '../utils/http'
const getAllCandidats = async () => {
    return await http.get("candidats/getCandidats");
}
const updateOne = (id, data) => {
    return http.put(`candidats/${id}`, data);
};

const removeOne = id => {
    return http.delete(`candidats/delete/${id}`);
};
const getOne = id => {
    return http.get(`candidats/${id}`);
};

const getFormFromCandidat = id => {
    return http.get(`candidats/getFormFromCandidat/${id}`);
};

const createOne = data => {
    return http.post("candidats/addFromJson", data);
};

const CandidatService = {
    getAllCandidats,
    updateOne,
    removeOne,
    getOne,
    createOne,
    getFormFromCandidat
}

export default CandidatService