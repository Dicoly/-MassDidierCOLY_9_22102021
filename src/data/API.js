import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

/**
 * @class
 * @returns Each fucntion get datas in API
 */
class API {
    /**
     * Get initial user
     * @return  {object} user
     */
    static async getInitialUser() {
        return axios.get(`/user/${12}`);
    }

    /**
     * Get a user by his id
     * @param   {number} id user's id
     * @return  {object} user
     */
    static async getUserById(id) {
        return axios.get(`/user/${id}`);
    }

    /**
     * Get a user's activity
     * @param   {number} id user's id
     * @return  {object} activity
     */
    static async getActivity(id) {
        return axios.get(`/user/${id}/activity`);
    }

    /**
     * Get a user's activity duration
     * @param   {number} id user's id
     * @return  {object} activity duration
     */
    static async getSessionDuration(id) {
        return axios.get(`/user/${id}/average-sessions`);
    }

    /**
     * Get a user's activity intensity
     * @param   {number} id user's id
     * @return  {object} activity intensity
     */
    static async getSessionIntensity(id) {
        return axios.get(`/user/${id}/performance`);
    }
}

export default API;