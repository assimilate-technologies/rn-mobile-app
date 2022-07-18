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
const getUser = () => {
    const url = `${API_URL}${BASE_ROUTES.USERS}`;
    return axios.get(url);
}
const payment = (payload) => {
    const url = `${API_URL}${BASE_ROUTES.TRANSACTION}/payment`;
    return axios.post(url, payload);
}

const paymentUpdate = (payload) => {
    const url = `${API_URL}${BASE_ROUTES.TRANSACTION}/payment/update`;
    return axios.post(url, payload);
}

const getWalletAmount = () => {
    const url = `${API_URL}${BASE_ROUTES.TRANSACTION}/payment/wallet`;
    return axios.get(url);
}
const getUserDetail = (payload) => {
    const url = `${API_URL}${BASE_ROUTES.USERS}/user-detail`;
    return axios.get(url);
}
const handleCreateUserDetails = (payload) => {
    const url = `${API_URL}${BASE_ROUTES.USERS}/user-detail`;
    return axios.post(url,payload);
}
const handleUpdateUserDetails = (payload) => {
    const url = `${API_URL}${BASE_ROUTES.USERS}/user-detail/update`;
    return axios.post(url,payload);
}
const handleUpdateUIDAIPATH = (payload) => {
    const url = `${API_URL}${BASE_ROUTES.USERS}/user-detail/update-uidai`;
    return axios.post(url,payload);
}
export default {
    login, verify, payment, paymentUpdate, getUser, getWalletAmount,
    getUserDetail,
    handleCreateUserDetails,
    handleUpdateUserDetails,
    handleUpdateUIDAIPATH
}