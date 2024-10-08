import axios from 'axios';
import { config } from '../../config/config';

const refresh = (): Promise<{
    accessToken: string;
    userType: number;
}> => {
    const REFRESH_URL = `${config.API_URL}/auth/refresh`;

    return new Promise((resolve, reject) => {
        axios
            .get(REFRESH_URL, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default refresh;
