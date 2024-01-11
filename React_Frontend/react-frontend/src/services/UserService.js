import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8092/api/v1/users";
const post_location_url = "http://localhost:8092/api/v1/suscripcion/userLocation";

class UserService {

    // Users

    getUsers() {
        return axios.get(USER_API_BASE_URL);
    }
    createUser(user) {
        return axios.post(USER_API_BASE_URL, user);
    }

    getUserById(userId) {
        return axios.get(`${USER_API_BASE_URL}/${userId}`)
    }

    updateUser(user, userId) {
        return axios.put(USER_API_BASE_URL + '/' + userId, user);
    }

    deleteUser(userId) {
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }

    deleteAllUsers() {
        return axios.delete(USER_API_BASE_URL);
    }

    // Suscripciones

    getSuscriptionDetails(userId) {
        return axios.get(post_location_url + '/' + userId);
    }

    registrarUbicacion(user, userId) {
        return axios.post(post_location_url + '/' + userId, user);
    }

    deleteSuscriptionData() {
        return axios.delete(post_location_url);
    }

}

const userServiceInstance = new UserService();
export default userServiceInstance;