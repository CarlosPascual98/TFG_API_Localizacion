package com.tfg.api.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfg.api.exception.ResourceNotFoundException;
import com.tfg.api.model.ULsuscription;
import com.tfg.api.model.User;
import com.tfg.api.repository.SuscripcionRepository;
import com.tfg.api.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/v1")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private SuscripcionRepository suscripcionRepository;

	@Autowired
	private JdbcTemplate jdbcTemplate;

	// Método para obtener la fecha y hora actual
	private String obtenerFechaYHoraActual() {
		LocalDateTime fechaYHora = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss dd-MM-yyyy");
		return fechaYHora.format(formatter);
	}

	// <<<<<<<<<<<<<<<<<<< Metodos de /user >>>>>>>>>>>>>>>>>>>>

	// GET todos los usuarios
	@GetMapping("/users")
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	// POST añadir un nuevo User
	@PostMapping("/users")
	public User createUser(@RequestBody User user) {
		return userRepository.save(user);
	}

	// GET Buscar un usuario por su ID
	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		User user = userRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("El id: " + id + " no se corresponde con ningún usuario"));
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	/*
	 * // GET Buscar la localizacion de un usuario por su ID
	 * 
	 * @GetMapping("/userslocation/{id}") public ResponseEntity<List<Double>>
	 * getUserLocationById(@PathVariable Long id) { User user =
	 * userRepository.findById(id) .orElseThrow(() -> new ResourceNotFoundException
	 * ("El id: " + id + " no se corresponde con ningún usuario")); List<Double>
	 * userLocation = Arrays.asList(user.getLatitud(), user.getLongitud()); return
	 * new ResponseEntity<>(userLocation, HttpStatus.OK); }
	 */

	// PUT Actualizar un usuario
	@PutMapping("/users/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
		User user = userRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("El id: " + id + " no se corresponde con ningún usuario"));
		user.setNombre(userDetails.getNombre());
		user.setApellido(userDetails.getApellido());
		user.setLatitud(userDetails.getLatitud());
		user.setLongitud(userDetails.getLongitud());
		user.setZona(userDetails.getZona());
		User updatedUser = userRepository.save(user);
		return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
	}

	// DELETE Borrar un usuario
	@DeleteMapping("/users/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id) {
		User user = userRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("El id: " + id + " no se corresponde con ningún usuario"));
		userRepository.delete(user);
		Map<String, Boolean> response = new HashMap<>();
		response.put("Usuario eliminado", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	// DELETE Resetea la tabla de usuarios
	@DeleteMapping("/users")
	public ResponseEntity<Map<String, Boolean>> deleteAllUsers() {
		jdbcTemplate.execute("DELETE FROM sistema_gestion_usuarios.users");
		jdbcTemplate.execute("ALTER TABLE sistema_gestion_usuarios.users AUTO_INCREMENT = 1");
		Map<String, Boolean> response = new HashMap<>();
		response.put("Todos los registros de la tabla users eliminados y secuencia reseteada", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	// <<<<<<<<<<<<<<<<<<< Metodos de /suscripcion >>>>>>>>>>>>>>>>>>>>

	// POST para meter un registro en la tabla ULsuscripción
	@PostMapping("/suscripcion/userLocation/{userId}")
	public ResponseEntity<ULsuscription> crearSuscripcionLocalizacion(@PathVariable long userId,
			@RequestBody User userDetails) {
		userRepository.findById(userId).orElseThrow(
				() -> new ResourceNotFoundException("El id: " + userId + " no se corresponde con ningún usuario"));
		ULsuscription registro = new ULsuscription();
		registro.setUsuario(userDetails.getNombre() + " " + userDetails.getApellido());
		registro.setLatitud(userDetails.getLatitud());
		registro.setLongitud(userDetails.getLongitud());
		registro.setZona(userDetails.getZona());
		registro.setFecha(obtenerFechaYHoraActual());
		registro.setMonumento(userDetails.getMonumento());
		suscripcionRepository.save(registro);
		return new ResponseEntity<ULsuscription>(registro, HttpStatus.OK);
	}

	// DELETE para reseteat la tabla ULsuscripcion
	@DeleteMapping("/suscripcion/userLocation")
	public ResponseEntity<Map<String, Boolean>> deleteUserSuscription() {
		jdbcTemplate.execute("DELETE FROM sistema_gestion_usuarios.user_location_suscription");
		jdbcTemplate.execute("ALTER TABLE sistema_gestion_usuarios.user_location_suscription AUTO_INCREMENT = 1");
		Map<String, Boolean> response = new HashMap<>();
		response.put("Todos los registros de la tabla user_location_suscription eliminados y secuencia reseteada",
				Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	// GET Devuelve las ubicaciones en las que ha estado un usuario.
	@GetMapping("/suscripcion/userLocation/{userId}")
	public List<ULsuscription> getSuscripcionLocalizacion(@PathVariable long userId) {
		User user = userRepository.findById(userId).orElseThrow(
				() -> new ResourceNotFoundException("El id: " + userId + " no se corresponde con ningún usuario"));
		String nombreUser = user.getNombre() + " " + user.getApellido();
		return suscripcionRepository.findByNombreUsuario(nombreUser);
	}

	// GET todos las ubicaciones guardadas
	@GetMapping("/suscripcion")
	public List<ULsuscription> getULSuscription() {
		return suscripcionRepository.findAll();
	}

}
