import http from "./http.service"

const endpoint = "/sliders"
const sliderService = {
    create:async (payload) => {
        const {data} = await http.post(`${endpoint}`,payload)
        return data
    },
    getList:async () => {
        const {data} = await http.get(`${endpoint}`)
            return data
    }
}
export default sliderService