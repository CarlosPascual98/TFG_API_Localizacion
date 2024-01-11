import React, { Component } from 'react';
import UserService from '../services/UserService';
import { withRouter } from 'react-router-dom';

class ListUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.viewUser = this.viewUser.bind(this);
        this.viewUserSuscription = this.viewUserSuscription.bind(this);
    }

    componentDidMount() {
        UserService.getUsers().then((res) => {
            this.setState({ users: res.data });
        });
    }

    addUser() {
        this.props.history.push('/add-user');
        window.location.reload();
    }

    editUser(id) {
        this.props.history.push(`/update-user/${id}`);
        window.location.reload();
    }

    deleteUser(id) {
        const confirmMessage = '¿Está seguro de que desea borrar este usuario';
        if (window.confirm(confirmMessage)) {
            UserService.deleteUser(id).then(res => {
                this.setState({ users: this.state.users.filter(user => user.id !== id) });
            });
        } else { }
    }

    viewUser(id) {
        this.props.history.push(`/view-user/${id}`);
        window.location.reload();
    }

    viewUserSuscription(id) {
        this.props.history.push(`/view-user-suscription/${id}`);
        window.location.reload();
    }

    handleDeleteUserSuscription = () => {
        const confirmMessage = '¿Está seguro de que quiere borrar los datos de suscripción de los usuarios?';
        if (window.confirm(confirmMessage)) {
            UserService.deleteSuscriptionData();
        } else {
        }
    };

    handleDeleteAllUsers = () => {
        const confirmMessage = '¿Está seguro de que desea borrar todos los usuarios?';
        if (window.confirm(confirmMessage)) {
            UserService.deleteAllUsers().then(
                window.location.reload());
        } else {
        }
    };

    render() {
        return (
            <div>
                <h2 className='text-center'>Lista de Usuarios</h2>
                <div className="row">
                    <button className='btn btn-primary' onClick={this.addUser}>Añadir usuario</button>
                </div>
                <br></br>
                <div className="row">
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Zona</th>
                                <th>Latitud</th>
                                <th>Longitud</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(
                                    user =>
                                        <tr key={user.id}>
                                            <td> {user.nombre} </td>
                                            <td> {user.apellido} </td>
                                            <td> {user.zona} </td>
                                            <td> {user.latitud} </td>
                                            <td> {user.longitud} </td>
                                            <td>
                                                <button className='btn btn-info' onClick={() => this.editUser(user.id)}>Editar</button>
                                                <button className='btn btn-danger' style={{ marginLeft: "10px" }} onClick={() => this.deleteUser(user.id)}>Eliminar</button>
                                                <button className='btn btn-warning' style={{ marginLeft: "10px" }} onClick={() => this.viewUser(user.id)}>Ver en el mapa</button>
                                                <button className='btn btn-success' style={{ marginLeft: "10px" }} onClick={() => this.viewUserSuscription(user.id)}>Ver detalles de suscripción</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <button className='btn btn-danger' onClick={this.handleDeleteUserSuscription.bind(this)} >Borrar datos de suscripción</button>
                    <button className='btn btn-danger' style={{ marginLeft: "10px" }} onClick={this.handleDeleteAllUsers.bind(this)} >Borrar usuarios</button>
                </div>
            </div>
        );
    }
}

export default withRouter(ListUserComponent);