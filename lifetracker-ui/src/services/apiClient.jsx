import axios from 'axios';
import { API_BASE_URL } from '../constants';

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
        localStorage.setItem(this.tokenName, token);
    }

    async request({ endpoint, method = `GET`, data = {} }) {
        const url = `${this.remoteHostUrl}${endpoint}`

        const headers = { "Content-Type": "application/json" }

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
        return await this.request({ endpoint: `auth/login`, method: `POST`, data: credentials })
    }

    async signupUser(credentials) {
        console.log(credentials);
        return await this.request({ endpoint: `auth/register`, method: `POST`, data: credentials })
    }

    async fetchUserFromToken() {
        return await this.request({ endpoint: `auth/me`, method: `GET` })
    }

    async createNutrition(credentials) {
        return await this.request({ endpoint: `nutrition/create`, method: `POST`, data: credentials })
    }

    async fetchNutritions() {
        return await this.request({ endpoint: `nutrition/`, method: `GET` })
    }

    async fetchNutritionById(id) {
        return await this.request({ endpoint: `nutrition/id/${id}`, method: `GET` })
    }

    // exercise requests

    async createExercise(credentials) {
        return await this.request({ endpoint: `exercise/create`, method: `POST`, data: credentials })
    }

    async fetchExercises() {
        return await this.request({ endpoint: `exercise/`, method: `GET` })
    }

    async fetchExerciseById(id) {
        return await this.request({ endpoint: `exercise/id/${id}`, method: `GET` })
    }

    // activity requests

    async getActivity() {
        return await this.request({endpoint: `activity/`, method: `GET`})
    }

}

export default new ApiClient(API_BASE_URL)