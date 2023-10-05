import http from '../utils/http'
const getAllEvaluateurs = async () => {
    return await http.get("evaluateur");
}
const updateOne = (id, data) => {
    return http.put(`evaluateur/${id}`, data);
};

const removeOne = id => {
    return http.delete(`evaluateur/${id}`);
};
const getOne = id => {
    return http.get(`evaluateur/${id}`);
};

const createOne = data => {
    return http.post("evaluateur", data);
};

const EvaluateurService = {
    getAllEvaluateurs,
    updateOne,
    removeOne,
    getOne,
    createOne,
}

export default EvaluateurService