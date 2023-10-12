import http from '../utils/http'
const stats = async () => {
    return await http.get("stats");
}


const DashboardService = {
    stats
}

export default DashboardService