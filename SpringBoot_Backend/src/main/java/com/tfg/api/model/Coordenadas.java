package com.tfg.api.model;

public class Coordenadas {
	
	private double latitud;
	
	private double longitud;
	
	public Coordenadas() {}
	
	public Coordenadas(double latitud, double longitud) {
		super();
		this.latitud = latitud;
		this.longitud = longitud;
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
	

}
