import HttpService from "./HttpService";

const GET = 'GET';
const POST = 'POST';

class AdminService extends HttpService {

    constructor() {
        super();
        this.baseEndpoint = process.env.REACT_APP_API_ADMIN_ENDPOINT;
    }

    async getAllUsers() {
        return super.getAll(`${process.env.REACT_APP_API_ADMIN_ENDPOINT}/users`);
    }

    async getUserRoles(userId) {
        return await super.request(`${process.env.REACT_APP_API_ADMIN_ENDPOINT}/user-id/${userId}/roles`, 'GET', null);
    }

    async promoteUserToAdmin(userId) {
        return await super.request(`${process.env.REACT_APP_API_ADMIN_ENDPOINT}/promote/${userId}`, 'POST', null);
    }

    async revokeAdminFromUser(userId) {
        return await super.request(`${process.env.REACT_APP_API_ADMIN_ENDPOINT}/revoke/${userId}`, 'POST', null);
    }
}

export default AdminService;