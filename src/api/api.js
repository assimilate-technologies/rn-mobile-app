import { API_URL, AUTH_API_URL, BASE_ROUTES } from '../shared/constants/environment';
import axios, { axiosInstance1 } from './axios';

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
    return axios.post(url, payload);
}
const handleUpdateUserDetails = (payload) => {
    const url = `${API_URL}${BASE_ROUTES.USERS}/user-detail/update`;
    return axios.post(url, payload);
}
const handleUpdateUIDAIPATH = (payload) => {
    const url = `${API_URL}${BASE_ROUTES.USERS}/user-detail/update-uidai`;
    return axios.post(url, payload);
}
const uploadProfileImage = (payload, token) => {
    const formData = new FormData();
    formData.append('file', {
        name: payload.fileName,
        type: payload.type,
        uri: payload.uri,
    });
    console.log(payload,formData);
    const url = `${AUTH_API_URL}upload/upload-file`;
    return axiosInstance1.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    });
}
export default {
    login, verify, payment, paymentUpdate, getUser, getWalletAmount,
    getUserDetail,
    handleCreateUserDetails,
    handleUpdateUserDetails,
    handleUpdateUIDAIPATH,
    uploadProfileImage
}