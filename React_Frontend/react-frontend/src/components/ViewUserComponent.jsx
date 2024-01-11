import React, { Component } from 'react';
import UserService from '../services/UserService';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./styles.css";
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
// import MarkerClusterGroup from "react-leaflet-cluster";

class ViewUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            user: {},
            infoLugarActual: '',
            puertas: [
                {
                    id: 1,
                    geocode: [40.411269, -3.676502],
                    popUp: "Puerta del Niño Jesús",
                    info: "Próxima al Hospital del Niño Jesús y a la plaza del mismo nombre se encuentra la Puerta del Niño Jesús, diseñada por Herrero Palacios. Este acceso nos lleva a la Rosaleda del Retiro, obra de Cecilio Rodríguez en 1915 y realizada sobre un lago artificial que cada invierno se utilizaba para patinar."
                },
                {
                    id: 2,
                    geocode: [40.415276, -3.688631],
                    popUp: "Puerta de Felipe IV",
                    info: "Esta puerta monumental, denominada también del Ángel y de Mariana de Neoburgo, fue levantada en las inmediaciones del Monasterio de los Jerónimos y el Paseo del Prado, en la actual calle de Felipe IV, como cierre del Real Sitio del Buen Retiro; su financiación corrió a expensas del Ayuntamiento de Madrid, con el fin de celebrar la entrada en la Corte de la referida reina, segunda esposa de Carlos II, en mayo de 1690; el proyecto fue realizado por el arquitecto Melchor de Bueras. En 1880 fue trasladada a este lugar, como entrada representativa al Jardín del Parterre, una vez segregados los restos de las construcciones palaciales de los jardines del antiguo sitio real, y la posterior urbanización de los solares resultantes de la demolición del Palacio."
                },
                {
                    id: 3,
                    geocode: [40.414813, -3.677770],
                    popUp: "Puerta de Herrero Palacios",
                    info: "Se levantó esta puerta como acceso a la antigua Casa de Fieras, una fundación recreativa de 1830, realizada a instancia del rey Fernando VII en su zona reservada del Parque del Retiro. Contaba originalmente con dos hojas de rejería metálica, hoy perdidas, prolongación de la verja del recinto, si bien mantiene su disposición con grandes pilares de ladrillo, coronados por figuras de leones, a los que acompañaban otros menores, flanqueando la puerta, con jarrones como remate."
                },
                {
                    id: 4,
                    geocode: [40.419632, -3.687858],
                    popUp: "Puerta Real",
                    info: "La Puerta Real, también llamada de Carlos III, es un conjunto monumental del último tercio del siglo xviii, que se encuentra en el Paseo del Prado, en la ciudad española de Madrid. Forma parte del cerramiento del Real Jardín Botánico."
                },
                {
                    id: 5,
                    geocode: [40.421050, -3.681850],
                    popUp: "Puerta de Hernani",
                    info: "La Puerta se ubicó a finales del siglo xix justo cuando se produjo el cerramiento del Parque, posteriormente fue substituida por otro enrejado. El arquitecto constructor fue José Urioste y Velada, al igual que la de Puerta de España y de la Independencia. El acceso de esta puerta va a dar a la Plaza de Nicaragua."
                },
                {
                    id: 6,
                    geocode: [40.409866, -3.688409],
                    popUp: "Puerta del Ángel caído",
                    info: "Se trata de la puerta más cercana a la estación de Atocha, en el lado suroeste del parque, muy cerca del Jardín Botánico y del Paseo del Prado. Si sigues recto desde esta puerta te encontrarás con la glorieta del Ángel Caído, la escultura más famosa del parque, ubicado en lo alto de una fuente."
                }
            ],
            lugares: [
                {
                    id: 1,
                    geocode: [40.413638, -3.681833],
                    popUp: "Palacio de cristal",
                    info: "El Palacio de Cristal de El Retiro es uno de los mejores ejemplos de la llamada arquitectura del hierro en Madrid. Planeado originalmente como un gigantesco invernadero para albergar plantas tropicales con motivo de la Exposición de Flora de las Islas Filipinas, celebrada en 1887, actualmente es una de las sedes del Museo Reina Sofía, que acoge varias exposiciones temporales."
                },
                {
                    id: 2,
                    geocode: [40.417349, -3.682924],
                    popUp: "Monumento a Alfonso XII",
                    info: "Conjunto escultórico y arquitectónico rinde homenaje al rey Alfonso XII. Inaugurado por su hijo Alfonso XIII en 1922, el monumento se inspira en los realizados a Victor Manuel II en Roma y a Guillermo I en Berlín."
                },
                {
                    id: 3,
                    geocode: [40.413229, -3.678081],
                    popUp: "Jardines de Cecilio Rodríguez de cristal",
                    info: "Fueron construidos en los años 40 del pasado siglo y reciben este nombre en honor a Cecilio Rodríguez, Jardinero Mayor de Madrid y una persona que dedicó prácticamente toda su vida al cuidado del parque de El Retiro. Desde muy pequeño, con apenas 8 años, Cecilio comenzó de aprendiz de jardinero y hasta que falleció con 88 años, estuvo desempeñando su labor."
                },
                {
                    id: 4,
                    geocode: [40.410807, -3.680288],
                    popUp: "La Rosaleda",
                    info: "La iniciativa fue del entonces alcalde de Madrid, Carlos Prats, que quería darle un aire más elegante a esta parte del parque. Antes de la Rosaleda, llamada en un principio “Rosería”, en este lugar se encontraba la estatua al Marqués de Salamanca que hoy adorna la plaza del mismo nombre y antes incluso había un estanque que se helaba todos los inviernos y servía a los madrileños para patinar sobre hielo."
                },
                {
                    id: 5,
                    geocode: [40.421086, -3.680647],
                    popUp: "Montaña artificial",
                    info: "Localizada junto a la confluencia de la calle O’Donnell y la avenida de Menéndez Pelayo, la montaña fue creada durante el reinado de Fernando VII en 1817, formando parte del jardín romántico ideado por Bernardino Berogán, de disfrute exclusivo de la familia real en su momento. Posteriormente, el uso principal de este espacio hasta el día de su cierre en 2004 fue el de sala de exposiciones."
                },
                {
                    id: 6,
                    geocode: [40.412009, -3.687137],
                    popUp: "Bosque del Recuerdo",
                    info: "El bosque del Recuerdo, anteriormente conocido como bosque de los Ausentes, es un monumento construido como homenaje a las 192 víctimas de los atentados del 11 de marzo de 2004 en Madrid."
                },
                {
                    id: 7,
                    geocode: [40.415307, -3.687721],
                    popUp: "Jardín del Parterre",
                    info: "El jardín del Parterre se construyó durante el reinado de Felipe V (1724-1746) en el emplazamiento de otro jardín, el Jardín de las Ocho Calles u Ochavado, formado por 8 calles que se cruzaban en una plaza circular."
                },
                {
                    id: 8,
                    geocode: [40.411034, -3.682661],
                    popUp: "Fuente del Ángel Caído",
                    info: "La fuente del Ángel Caído o monumento del Ángel Caído se encuentra en el parque del Retiro de la villa de Madrid, en la glorieta del Ángel Caído, sobre el solar que ocupaba la fábrica de Porcelanas de la China, destruida durante la Guerra de la Independencia en 1813. Es obra de Ricardo Bellver (escultura principal) y Francisco Jareño (pedestal)."
                },
                {
                    id: 9,
                    geocode: [40.418623, -3.685597],
                    popUp: "Fuente de los Galápagos",
                    info: "Encargada por Fernando VII para conmemorar el primer aniversario del nacimiento de Isabel II, la Fuente de los Galápagos también es conocida por este motivo por el nombre de la entonces princesa. Instalada en la Red de San Luis en 1832, allí permanecerá casi 50 años hasta que en 1879 se traslada a la glorieta de Nicaragua del Retiro, zona contigua al Estanque Grande y al templete de música en el parque de El Retiro."
                },
                {
                    id: 10,
                    geocode: [40.419346, -3.681631],
                    popUp: "Monumento a Cuba",
                    info: "En el Parque de El Retiro, al final del Paseo de Colombia, se encuentra la Plaza del Salvador, donde podemos ver la Fuente de Cuba. El plan para levantar un monumento en homenaje a la república caribeña surge como agradecimiento al gobierno cubano por la construcción que éste hizo, en 1929, de un Monumento al Soldado español en las lomas de San Juan1, en Santiago de Cuba."
                }
            ],
            distancia: 0,
            userIcon: new Icon({
                iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
                iconSize: [38, 38]
            }),
            puertaIcon: new Icon({
                iconUrl: "https://cdn-icons-png.flaticon.com/128/1207/1207248.png",
                iconSize: [30, 30]
            }),
            lugarIcon: new Icon({
                iconUrl: "https://cdn-icons-png.flaticon.com/128/4797/4797108.png",
                iconSize: [20, 20]
            })

        };

        this.changeLatitudHandlerArriba = this.changeLatitudHandlerArriba.bind(this);
        this.changeLatitudHandlerAbajo = this.changeLatitudHandlerAbajo.bind(this);
        this.changeLatitudHandlerDerecha = this.changeLatitudHandlerDerecha.bind(this);
        this.changeLatitudHandlerIzquierda = this.changeLatitudHandlerIzquierda.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.wait = this.wait.bind(this);
        this.getZona = this.getZona.bind(this);
        this.changeZonaFromCoordinates = this.changeZonaFromCoordinates.bind(this);
    }


    componentDidMount() {
        UserService.getUserById(this.state.id).then(res => {
            this.setState({ user: res.data });
        });
        this.changeZonaFromCoordinates();
        this.changeMonumentoFromCoordinates();
        // Agrega un event listener para el evento 'keydown'
        document.addEventListener('keydown', this.handleTeclaPresionada);
    }

    componentWillUnmount() {
        // Elimina el event listener cuando el componente se desmonta para evitar pérdidas de memoria
        document.removeEventListener('keydown', this.handleTeclaPresionada);
    }

    handleTeclaPresionada = (event) => {
        if (event.key === 'w') {
            this.changeLatitudHandlerArriba();
            this.changeZonaFromCoordinates();
            this.changeMonumentoFromCoordinates();
            this.wait();

        } if (event.key === 's') {
            this.changeLatitudHandlerAbajo();
            this.changeZonaFromCoordinates();
            this.changeMonumentoFromCoordinates();
            this.wait();
        }
        if (event.key === 'a') {
            this.changeLatitudHandlerIzquierda();
            this.changeZonaFromCoordinates();
            this.changeMonumentoFromCoordinates();
            this.wait();
        }
        if (event.key === 'd') {
            this.changeLatitudHandlerDerecha();
            this.changeZonaFromCoordinates();
            this.changeMonumentoFromCoordinates();
            this.wait();
        }
    };

    // LLama al metodo updateUser del Servicio, el cual manda un PUT a springboot con la nueva info de usuario
    updateUser = () => {
        UserService.updateUser(this.state.user, this.state.id);
    }

    //Hace una pequeña pausa
    wait = () => {
        setTimeout(() => {
            this.updateUser();
        }, 100);
    }

    // Vuelve al menu principal
    volver = () => {
        this.props.history.push('/users');
        window.location.reload();
    }

    // 
    suscribeUser = () => {
        console.log("Suscripción iniciada");
        UserService.registrarUbicacion(this.state.user, this.state.id);
        this.intervalo = setInterval(this.postearLocalizacion, 5000);
    }

    // 
    unSuscribeUser = () => {
        console.log("Suscripción terminada");
        UserService.registrarUbicacion(this.state.user, this.state.id);
        clearInterval(this.intervalo);
    }

    // Manda el user en un post para que pueda ser guardado en la base de datos, cuando la suscripcion esta activa
    postearLocalizacion = () => {
        console.log(`Ubicación del usuario ${this.state.user.nombre}: Latitud ${this.state.user.latitud}°, Longitud ${this.state.user.longitud}°`);
        UserService.registrarUbicacion(this.state.user, this.state.id);
    }

    // Mueve al usuario hacia arriba
    changeLatitudHandlerArriba = () => {
        const nuevaLatitud = this.state.user.latitud + 0.00005;
        const nuevaLatitudLim = nuevaLatitud.toFixed(6);
        this.setState(prevState => ({
            user: {
                ...prevState.user,

                latitud: parseFloat(nuevaLatitudLim),
            },
        }));
    }

    // Mueve al usuario hacia abajo
    changeLatitudHandlerAbajo = () => {
        const nuevaLatitud = this.state.user.latitud - 0.00005;
        const nuevaLatitudLim = nuevaLatitud.toFixed(6);
        this.setState(prevState => ({
            user: {
                ...prevState.user,

                latitud: parseFloat(nuevaLatitudLim),
            },
        }));
    }

    // Mueve al usuario hacia la derecha
    changeLatitudHandlerDerecha = () => {
        const nuevaLongitud = this.state.user.longitud + 0.00005;
        const nuevaLongitudLim = nuevaLongitud.toFixed(6);
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                longitud: parseFloat(nuevaLongitudLim),
            },
        }));
    }

    // Mueve al usuario hacia la izquierda
    changeLatitudHandlerIzquierda = () => {
        const nuevaLongitud = this.state.user.longitud - 0.00005;
        const nuevaLongitudLim = nuevaLongitud.toFixed(6);
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                longitud: parseFloat(nuevaLongitudLim),
            },
        }));
    }
    // Obtiene la zona del user
    getZona = () => {
        const lat = this.state.user.latitud;
        const long = this.state.user.longitud;
        const latMax = 40.421559;
        const latNorte = 40.418530;
        const latSur = 40.412474;
        const latMin = 40.407415;
        const longMin = -3.689001;
        const longOeste = -3.685898;
        const longEste = -3.680944;
        const longMax = -3.676288;

        if (latMin < lat && lat < latSur && longMin < long && long < longMax) {
            return 'Sur'
        } else if (latNorte < lat && lat < latMax && longMin < long && long < longMax) {
            return 'Norte'
        } else if (latSur < lat && lat < latNorte && longEste < long && long < longMax) {
            return 'Este'
        } else if (latSur < lat && lat < latNorte && longMin < long && long < longOeste) {
            return 'Oeste'
        } else if (latSur < lat && lat < latNorte && longOeste < long && long < longEste) {
            return 'Centro'
        } else {
            return 'Fuera de límites'
        }
    }

    isNearMonument = () => {
        const maxDistance = 50;
        const mensaje = '';
        const nearPlaces = this.state.lugares.filter((lugar) => {
            const distance = this.calculaDistancia(lugar.geocode);
            return distance <= maxDistance;
        });
        const nearPuertas = this.state.puertas.filter((puerta) => {
            const distance = this.calculaDistancia(puerta.geocode);
            return distance <= maxDistance;
        });

        if (nearPlaces.length !== 0) {
            this.setState({ infoLugarActual: nearPlaces[0].info });
            return nearPlaces[0].popUp;
        } else if (nearPuertas.length !== 0) {
            this.setState({ infoLugarActual: nearPuertas[0].info });
            return nearPuertas[0].popUp;
        }
        else {
            this.setState({ infoLugarActual: "" });
            return mensaje
        }

    }

    // Cambia el monumento del user
    changeMonumentoFromCoordinates() {
        const nuevoMonumento = this.isNearMonument();
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                monumento: nuevoMonumento,
            },
        }));
    }

    // Cambia la zona del user
    changeZonaFromCoordinates() {
        const nuevaZona = this.getZona();
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                zona: nuevaZona,
            },
        }));
    }

    // Calcula la distancia del usuario a un punto con la formula de Haversine
    calculaDistancia = (point) => {
        const lat1 = this.state.user.latitud;
        const lon1 = this.state.user.longitud;
        const lat2 = point[0];
        const lon2 = point[1];

        const R = 6371000;

        const toRadians = (angle) => (Math.PI / 180) * angle;

        const la1 = toRadians(lat1);
        const lo1 = toRadians(lon1);
        const la2 = toRadians(lat2);
        const lo2 = toRadians(lon2);

        const dLat = la2 - la1;
        const dLon = lo2 - lo1;

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(la1) * Math.cos(la2) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c;

        const nuevaDistancia = distance.toFixed(2);

        this.setState({ distancia: nuevaDistancia });

        return nuevaDistancia;
    };

    render() {
        return (
            <div>
                <br></br>
                <div className='card col-md-11' style={{ display: 'inline-block' }}>
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
                        <div className='row'>
                            <label style={{ marginRight: '10px' }}>Zona:  </label>
                            <div> {this.state.user.zona}</div>
                        </div>
                        <div className='row'>
                            <label style={{ marginRight: '10px' }}>Lugar:  </label>
                            <div> {this.state.user.monumento}</div>
                        </div>
                        <div className='row'>
                            <label style={{ marginRight: '10px' }}>Suscribirse a la localización del usuario:  </label>
                            <button className='btn btn-success' onClick={this.suscribeUser.bind(this)} >Iniciar suscripción</button>
                            <button style={{ marginLeft: '10px' }} className='btn btn-danger' onClick={this.unSuscribeUser.bind(this)} >Terminar suscripción</button>
                        </div>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div >
                    <MapContainer id='mapa' center={[40.414347, -3.6830652]} zoom={15}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {this.state.puertas.map(puertas => (
                            <Marker key={puertas.id} position={puertas.geocode} icon={this.state.puertaIcon}>
                                <Popup>
                                    <div>{puertas.popUp}</div>
                                    <div className='row'>
                                        <div >Calcular distancia: {this.state.distancia} metros</div>
                                        <button className='btn btn-secondary btn-sm' onClick={() => this.calculaDistancia(puertas.geocode)}>Calcular</button>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}

                        {this.state.lugares.map(lugares => (
                            <Marker key={lugares.id} position={lugares.geocode} icon={this.state.lugarIcon}>
                                <Popup>
                                    <div>{lugares.popUp}</div>
                                    <div className='row'>
                                        <div >Calcular distancia: {this.state.distancia} metros</div>
                                        <button className='btn btn-secondary btn-sm' onClick={() => this.calculaDistancia(lugares.geocode)}>Calcular</button>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}

                        {this.state.user.latitud && this.state.user.longitud && (
                            <Marker position={[this.state.user.latitud, this.state.user.longitud]} icon={this.state.userIcon}>
                                <Popup>{`Ubicación del usuario ${this.state.user.nombre}: Latitud ${this.state.user.latitud}°, Longitud ${this.state.user.longitud}°`}</Popup>
                            </Marker>
                        )}
                    </MapContainer>
                    <br></br>
                    <div className='card col-md-11'>
                        <h4>Información del lugar: {this.state.user.monumento}</h4>
                        {this.state.infoLugarActual}
                    </div>
                </div>

                <br></br>
                <div>
                    <button className='btn btn-success' onClick={this.volver.bind(this)}>Volver</button>
                </div>
            </div>
        );
    }
}

export default ViewUserComponent;
