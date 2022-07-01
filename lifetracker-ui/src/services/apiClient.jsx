import axios from 'axios';


/**
 * API CLIENT class is in charge of creating requests to the server 
 * without cluttering or using axios in react components
 */
class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl;
        this.token = null;
        this.tokenName = 'lifetracker_token'
    }
    //setter
    setToken(token) {
        this.token = token;
        localStorage.setItem(this.tokenName,token);
    }

    async request({ endpoint, method = `GET`, data = {} }) {
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {"Accept":"application/json, text/plain, /","Content-Type": "application/json"}

        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }

        try {
            const res = await axios({ url, method, data, headers })
            return { data: res.data, error: null }
        } catch (error) {
            console.error({ errorResponse: error.response });

            const message = error?.response?.data?.error?.message
            return { data: null, error: message || String(error) }
        }
    }

    async loginUser(credentials) {
        return await this.request({endpoint: `auth/login`, method: `POST`, data: credentials})
    }

    async signupUser(credentials) {
        return await this.request({endpoint: `auth/register`, method: `POST`, data: credentials})
    }

    async fetchUserFromToken() {
        return await this.request({endpoint: `auth/me`, method: `GET`})
    }

}

export default new ApiClient('http://localhost:3001')