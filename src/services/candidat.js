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

const createOne = data => {
    return http.post("candidats/addFromJson", data);
};

const UserService = {
    getAllCandidats,
    updateOne,
    removeOne,
    getOne,
    createOne,
}

export default UserService