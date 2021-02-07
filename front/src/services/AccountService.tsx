import axios, {AxiosResponse} from 'axios';

const API_URL = '/account/';

class AccountService {
    requestReset(email: string) {
        return axios
            .post(API_URL + "reset-password", {
                email
            });
    }
}

export default new AccountService();
