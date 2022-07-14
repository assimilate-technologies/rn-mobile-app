import { API_URL, BASE_ROUTES } from '../shared/constants/environment';
import axios from './axios';

const login = (payload) => {
    const url = `${API_URL}${BASE_ROUTES.AUTH}/otp/init`;
    return axios.post(url, payload);
}
const verify = (payload) => {
    const url = `${API_URL}${BASE_ROUTES.AUTH}/otp/verify`;
    return axios.post(url, payload);
}
export default {
    login,verify
}