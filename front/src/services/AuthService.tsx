import axios, {AxiosResponse} from 'axios';

const API_URL = '/auth/';

class AuthService {
    login(username: string, password: string): Promise<AxiosResponse> {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then((response: any) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout(): void {
        localStorage.removeItem("user");
    }

    register(username: string, email: string, password: string): Promise<AxiosResponse> {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser(): void {
        return JSON.parse(localStorage.getItem('user') || '');
    }
}

export default new AuthService();
