import HttpService from "./HttpService";

class AuthService extends HttpService {
    async register(userRegistrationDTO) {
        return super.post(`${process.env.REACT_APP_API_AUTH_ENDPOINT}/register`, userRegistrationDTO);
    }

    async login(email, password) {
        return super.post(`${process.env.REACT_APP_API_AUTH_ENDPOINT}/login`, { email, password });
    }

    async logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
    }

}

export default AuthService;