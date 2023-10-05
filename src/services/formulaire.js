import http from '../utils/http'
const getAllForms = async () => {
    return await http.get("form");
}
const updateOne = (id, data) => {
    return http.put(`form/${id}`, data);
};

const removeOne = id => {
    return http.delete(`form/${id}`);
};
const getOne = id => {
    return http.get(`form/${id}`);
};

const createOne = data => {
    return http.post("form", data);
};

const FormService = {
    getAllForms,
    updateOne,
    removeOne,
    getOne,
    createOne,
}

export default FormService