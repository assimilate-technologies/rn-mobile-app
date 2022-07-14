
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export let refreshTokenData = {
    isExecuting: false,
    promise: null,
};

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    async (conf) => {
        const accessToken = await AsyncStorage.getItem('accessToken')
        if (accessToken) {
            conf.headers["Authorization"] = `Bearer ${accessToken}`;
        }        
        return conf;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance
