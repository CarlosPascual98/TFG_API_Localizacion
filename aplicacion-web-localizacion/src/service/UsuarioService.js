import axios from "axios";

export class UsuarioService {

    baseURL = "http://localhost:8092/api_localizacion/v3/"

    getAll() {
        return axios.get(this.baseURL + "usuarios").then(res => res.data);
    }

    guardaUsuario(usuario) {
        return axios.post(this.baseURL + "usuarios", usuario).then(res => res.data);

    }

}