import React, { Component } from 'react';
import UserService from '../services/UserService';

class ViewUserSuscriptionComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            user: {},
            ULsuscripcion: []
        };

    }

    componentDidMount() {
        UserService.getUserById(this.state.id).then(res => {
            this.setState({ user: res.data });
            console.log(`Ubicación del usuario ${this.state.user.nombre}: Latitud ${this.state.user.latitud}°, Longitud ${this.state.user.longitud}°`);
        });
        UserService.getSuscriptionDetails(this.state.id).then(res => {
            this.setState({ ULsuscripcion: res.data });
        });
    }

    cancel() {
        this.props.history.push('/users');
    }

    render() {


        return (
            <div>
                <h2 className='text-center'>Detalles de suscripción del usuario </h2>
                <br></br>
                <div className="row">
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Id_registro</th>
                                <th>Usuario</th>
                                <th>Latitud</th>
                                <th>Longitud</th>
                                <th>Zona</th>
                                <th>Monumentos</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.ULsuscripcion.map(
                                    ULsuscripcion =>
                                        <tr key={ULsuscripcion.id}>
                                            <td> {ULsuscripcion.registros} </td>
                                            <td> {ULsuscripcion.usuario} </td>
                                            <td> {ULsuscripcion.latitud} </td>
                                            <td> {ULsuscripcion.longitud} </td>
                                            <td> {ULsuscripcion.zona} </td>
                                            <td> {ULsuscripcion.monumento} </td>
                                            <td> {ULsuscripcion.fecha} </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

export default ViewUserSuscriptionComponent;