package com.tfg.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
	
	// Atributos
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nombre")
	private String nombre;
	
	@Column(name = "apellido")
	private String apellido;
	
	@Column(name = "latitud")
	private double latitud;
	
	@Column(name = "longitud")
	private double longitud;
	
	@Column(name = "zona")
	private String zona;
	
	@Column(name = "monumento")
	private String monumento;
	
	// Default constructor
	public User() {}
	
	// Constructor
	public User(String nombre, String apellido, long latitud, long longitud, String zona, String monumento) {
		super();
		this.nombre = nombre;
		this.apellido = apellido;
		this.latitud = latitud;
		this.longitud = longitud;
		this.zona = zona;
		this.monumento = monumento;
	}
	
	// Getters y setters
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getApellido() {
		return apellido;
	}
	public void setApellido(String apellido) {
		this.apellido = apellido;
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

	public String getMonumento() {
		return monumento;
	}

	public void setMonumento(String monumento) {
		this.monumento = monumento;
	}
	
	

}
