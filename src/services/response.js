import http from '../utils/http'

const createOne = data => {
    return http.post("reponse", data);
};

const getOne = (idReponse) => {
    return http.get("reponse/" + idReponse);
}

const ReponseService = {
    createOne,
    getOne
}

export default ReponseService