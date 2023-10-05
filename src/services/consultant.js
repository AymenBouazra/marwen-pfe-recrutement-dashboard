import http from '../utils/http'
const getAllConsultants = async () => {
    return await http.get("consultant");
}
const updateOne = (id, data) => {
    return http.put(`consultant/${id}`, data);
};

const removeOne = id => {
    return http.delete(`consultant/${id}`);
};
const getOne = id => {
    return http.get(`consultant/${id}`);
};

const createOne = data => {
    return http.post("consultant", data);
};

const ConsultantService = {
    getAllConsultants,
    updateOne,
    removeOne,
    getOne,
    createOne,
}

export default ConsultantService