import React, { Component } from 'react';
import UserService from '../services/UserService';

class CreateUserComponent extends Component {
    constructor(props) {
        super(props)

        this.zonasPermitidas = ['Norte', 'Sur', 'Este', 'Oeste', 'Centro'];

        this.state = {
            nombre: '',
            apellido: '',
            latitud: 0,
            longitud: 0,
            zona: '',

        }
        this.changeNombreHandler = this.changeNombreHandler.bind(this);
        this.changeApellidoHandler = this.changeApellidoHandler.bind(this);
        this.changeLatitudHandler = this.changeLatitudHandler.bind(this);
        this.changeLongitudHandler = this.changeLongitudHandler.bind(this);
        this.changeZonaHandler = this.changeZonaHandler.bind(this);
    }

    saveUser = (event) => {
        event.preventDefault();
        let user = {
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            latitud: this.state.latitud,
            longitud: this.state.longitud,
            zona: this.state.zona,
        };
        console.log('user => ' + JSON.stringify(user));
        UserService.createUser(user).then(res => {
            this.props.history.push('/users');
            window.location.reload();
        });
    }

    changeNombreHandler = (event) => {
        this.setState({ nombre: event.target.value });
    }

    changeApellidoHandler = (event) => {
        this.setState({ apellido: event.target.value });
    }

    changeLatitudHandler = (event) => {
        this.setState({ latitud: event.target.value });
    }

    changeLongitudHandler = (event) => {
        this.setState({ longitud: event.target.value });
    }

    changeZonaHandler = (event) => {
        const zonaElegida = event.target.value;

        // Fijar latitud y longitud predeterminadas según la zona
        let latitudPredeterminada = 0;
        let longitudPredeterminada = 0;

        switch (zonaElegida) {
            case 'Norte':
                // Puerta de Hernani
                latitudPredeterminada = 40.421050;
                longitudPredeterminada = -3.681850;
                break;
            case 'Sur':
                // Puerta del Niño Jesús
                latitudPredeterminada = 40.411250;
                longitudPredeterminada = -3.676700;
                break;
            case 'Este':
                // Puerta de Herrero Palacios 
                latitudPredeterminada = 40.414800;
                longitudPredeterminada = -3.677850;
                break;
            case 'Oeste':
                // Puerta de Felipe IV
                latitudPredeterminada = 40.415350;
                longitudPredeterminada = -3.688450;
                break;
            case 'Centro':
                // Fuente de lap Alcachofa
                latitudPredeterminada = 40.415400;
                longitudPredeterminada = -3.684100;
                break;
            default:
                // Latitud y longitud predeterminadas por defecto que sera el centro
                // Fuente de lap Alcachofa
                latitudPredeterminada = 40.415420;
                longitudPredeterminada = -3.684100;
        }

        this.setState({
            zona: zonaElegida,
            latitud: latitudPredeterminada,
            longitud: longitudPredeterminada,
        });
    }

    cancel() {
        this.props.history.push('/users');
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>Añadir usuario</h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label> Nombre: </label>
                                        <input placeholder='Nombre' name='nombre' className='form-control'
                                            value={this.state.nombre} onChange={this.changeNombreHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Apellido: </label>
                                        <input placeholder='Apellido' name='apellido' className='form-control'
                                            value={this.state.apellido} onChange={this.changeApellidoHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Zona: </label>
                                        <select className='form-control' value={this.state.zona} onChange={this.changeZonaHandler}>
                                            <option value="">Selecciona...</option>
                                            {this.zonasPermitidas.map((opcion) => {
                                                return (
                                                    <option key={opcion} value={opcion}>
                                                        {opcion}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label> Latitud: </label>
                                        <input placeholder='Latitud' name='latitud' className='form-control'
                                            value={this.state.latitud} onChange={this.changeLatitudHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Longitud: </label>
                                        <input placeholder='Longitud' name='longitud' className='form-control'
                                            value={this.state.longitud} onChange={this.changeLongitudHandler} />
                                    </div>
                                    <button className='btn btn-success' onClick={this.saveUser.bind(this)}>Guardar</button>
                                    <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancelar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateUserComponent;