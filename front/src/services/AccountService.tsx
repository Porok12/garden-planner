import axios, {AxiosResponse} from 'axios';

const API_URL = '/account/';

class AccountService {
    requestReset(email: string) {
        return axios
            .post(API_URL + "reset", {
                email
            });
    }

    resetPassword(password: string, token: string) {
        return axios
            .post(API_URL + "reset/" + token, {
                password
            });
    }

    activateAccount(token: string) {
        return axios
            .post(API_URL + "active/" + token);
    }
}

export default new AccountService();
