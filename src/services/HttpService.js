import axios from "axios";

class HttpService {

    async post(endpoint, data) {
        console.log(`method: POST, endpoint: ${endpoint}, data: ${data}`);
        const url = `${process.env.REACT_APP_API_BASE_URL}${endpoint}`;
        console.log(`url: ${url}`);
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data),
        });
        return response;
    }

    async getAll(endpoint) {
        console.log(`method: GET, endpoint: ${endpoint}`);
        const url = `${process.env.REACT_APP_API_BASE_URL}${endpoint}`;
        console.log(`url: ${url}`);
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response;
    }

    async getById(endpoint, id) {
        console.log(`method: GET, endpoint: ${endpoint}, id: ${id}`);
        const url = `${process.env.REACT_APP_API_BASE_URL}${endpoint}/${id}`;
        console.log(`url: ${url}`);
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response;
    }

    async put(endpoint, id, data) {
        console.log(`method: PUT, endpoint: ${endpoint}, id: ${id}`);
        const url = `${process.env.REACT_APP_API_BASE_URL}${endpoint}/${id}`;
        console.log(`url: ${url}`);
        const response = await axios.put(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data),
        });
        return response;
    }

    async delete(endpoint, id) {
        const url = `${process.env.REACT_APP_API_BASE_URL}${endpoint}/${id}`;
        console.log(`url: ${url}`);
        await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    }

    async request(endpoint, method, data) {
        console.log(`method: ${method}, endpoint: ${endpoint}, data: ${data}`);
        const url = `${process.env.REACT_APP_API_BASE_URL}${endpoint}`;
        console.log(`url: ${url}`);
        const response = await axios.request({
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            ...(data && { body: JSON.stringify(data) })
        });
        return response;
    }
}

export default HttpService;