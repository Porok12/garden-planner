interface UserInput {
    id: number;
    username: string;
    email: string;
    roles: string[];
    accessToken: string;
}

export default function authHeader() {
    const user: UserInput = JSON.parse(localStorage.getItem('user') || '');

    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}
