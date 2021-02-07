import axios, {AxiosResponse} from 'axios';

const API_URL = '/auth/';

type UserType = {
    id: number;
    username: string;
    email: string;
    roles: Array<string>;
    accessToken: string;
};

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

    register(username: string, email: string, password: string, agreed: boolean): Promise<AxiosResponse> {
        return axios
            .post(API_URL + "signup", {
                username,
                email,
                password,
                agreed
        });
    }

    getCurrentUser(): UserType {
        const userJson = localStorage.getItem('user');
        return userJson ? JSON.parse(userJson) : null;
    }
}

export default new AuthService();
