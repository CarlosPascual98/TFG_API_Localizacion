import React, { Component } from 'react';
import UserService from '../services/UserService';

class ViewUserComponent extends Component {
    constructor(props) {
    super(props)

    const { id } = this.props.match.params;
    this.state = {
        id: id,
        user: {}
    }
   
}

componentDidMount() {
    UserService.getUserById(this.state.id).then(res => {
      this.setState({user: res.data});
    });
  }

    render() {
        return (
            <div>
                <br></br>
                <div className='card col-md-6'>
                    <h3 className='text-center'>Ver detalles del usuario </h3>
                    <div className='card-body'>
                        <div className='row'>
                            <label style={{ marginRight: '10px' }}>Nombre de usuario:</label>
                            <div> {'' + this.state.user.nombre + ' ' + this.state.user.apellido}</div>
                        </div>
                        <div className='row'>
                            <label style={{ marginRight: '10px' }}>Coordenadas:  </label>
                            <div> {'Latitud: ' + this.state.user.latitud + '° Longitud: ' + this.state.user.longitud + '°'}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewUserComponent;
