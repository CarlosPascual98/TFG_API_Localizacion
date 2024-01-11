package com.tfg.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tfg.api.model.ULsuscription;

public interface SuscripcionRepository extends JpaRepository<ULsuscription, Long> {
	
	@Query(value = "SELECT * FROM sistema_gestion_usuarios.user_location_suscription where usuario = :nombreUser",nativeQuery = true)
	List<ULsuscription> findByNombreUsuario(@Param("nombreUser") String nombreUser);
}
