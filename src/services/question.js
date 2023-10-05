import http from '../utils/http'
const getAllQuestions = async () => {
    return await http.get("question");
}
const updateOne = (id, data) => {
    return http.put(`question/${id}`, data);
};

const removeOne = id => {
    return http.delete(`question/${id}`);
};
const getOne = id => {
    return http.get(`question/${id}`);
};

const createOne = data => {
    return http.post("question", data);
};

const QuestionService = {
    getAllQuestions,
    updateOne,
    removeOne,
    getOne,
    createOne,
}

export default QuestionService