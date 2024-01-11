package com.tfg.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "UserLocationSuscription")
public class ULsuscription {

	// Atributos
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long registros;
	
	@Column(name = "usuario")
	private String usuario;
	
	@Column(name = "latitud")
	private double latitud;
	
	@Column(name = "longitud")
	private double longitud;
	
	@Column(name = "zona")
	private String zona;
	
	@Column(name = "fecha")
	private String fecha;
	
	@Column(name = "monumento")
	private String monumento;
	

	// Constructores

	public ULsuscription() {
	}


	public ULsuscription(String usuario, double latitud, double longitud, String zona, String fecha, String monumento) {
		super();
		this.usuario = usuario;
		this.latitud = latitud;
		this.longitud = longitud;
		this.zona = zona;
		this.fecha = fecha;
		this.monumento = monumento;
	}

	// Getters y setters
	
	public long getRegistros() {
		return registros;
	}


	public void setRegistros(long registros) {
		this.registros = registros;
	}
	
	public double getLatitud() {
		return latitud;
	}


	public void setLatitud(double latitud) {
		this.latitud = latitud;
	}


	public double getLongitud() {
		return longitud;
	}


	public void setLongitud(double longitud) {
		this.longitud = longitud;
	}


	public String getZona() {
		return zona;
	}


	public void setZona(String zona) {
		this.zona = zona;
	}


	public String getFecha() {
		return fecha;
	}


	public void setFecha(String fecha) {
		this.fecha = fecha;
	}


	public String getUsuario() {
		return usuario;
	}


	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	
	public String getMonumento() {
		return monumento;
	}

	public void setMonumento(String monumento) {
		this.monumento = monumento;
	}



}
