import './App.css';
import { Component } from 'react';
import { UsuarioService } from './service/UsuarioService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Menubar } from 'primereact/menubar';
import { Panel } from 'primereact/panel';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import 'primereact/resources/themes/nova-alt/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'






export default class App extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      usuario: {
        id: null,
        nombre: null,
        apellido: null,
        latitud: null,
        longitud: null
      },
      selectedUsuario : {
      }
    };
    
    this.items = [
      {
        label: 'Nuevo usuario',
        icon: 'pi pi-fw pi-plus',
        command: () => { this.showSaveDialog() }
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        command: () => { alert('Usuario guardado') }
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-fw pi-trash',
        command: () => { alert('Usuario eliminado') }
      }

    ];

    this.usuarioService = new UsuarioService();
    this.guardar = this.guardar.bind(this);

    this.footer = (
      <div>
        <Button label='Guardar' icon="pi pi-check" onClick={this.guardar}></Button>
      </div>
    );

  }

  componentDidMount() {
    this.usuarioService.getAll().then(data => this.setState({ usuarios: data }))
  }

  guardar() {
    this.usuarioService.guardaUsuario(this.state.usuario).then(data => {
      this.setState({
        visible : false,
        usuario: {
          id: null,
          nombre: null,
          apellido: null,
          latitud: null,
          longitud : null
        }
      })
    })
      
  }


  render() {
    return (

      <div style={{ width: '80%', margin: '0 auto', marginTop: '20px' }}>
        <Menubar model={this.items} />
        <br />
        <Panel header="Lista de usuarios" >
          <DataTable value={this.state.usuarios}>
            <Column field="id" header="ID"></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="apellido" header="Apellido"></Column>
            <Column field="longitud" header="Longitud"></Column>
            <Column field="latitud" header="Latitud"></Column>
          </DataTable>
        </Panel>

        <Dialog header="Crear usuario" footer={this.footer} visible={this.state.visible} style={{ width: "25%" }} modal={true} onHide={() => this.setState({ visible: false })}>
         <form id="usuario-form">
          <span className='p-float-label'>
            <InputText id="nombre" value={this.state.usuario.nombre} style={{ width: '100%' }} onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let usuario = Object.assign({}, prevState.usuario);
                usuario.nombre = val;
              })
            }} />
            <label htmlFor="nombre">Nombre</label>
          </span>
          <br />
          <span className='p-float-label'>
            <InputText id="apellido" value={this.state.usuario.apellido} style={{ width: '100%' }} onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
                let usuario = Object.assign({}, prevState.usuario);
                usuario.apellido = val;
              })
            }} />
            <label htmlFor="apellido">Apellido</label>
          </span>
          </form>
        </Dialog>
      </div>
    );
  }

  showSaveDialog() {
    this.setState({
      visible: true,
      usuario: {
        id: null,
        nombre: null,
        apellido: null,
        latitud: null,
        longitud : null
      }
    });

  }

}