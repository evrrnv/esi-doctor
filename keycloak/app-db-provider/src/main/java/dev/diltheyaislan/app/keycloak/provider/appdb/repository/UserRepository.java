package dev.diltheyaislan.app.keycloak.provider.appdb.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.jboss.logging.Logger;

import dev.diltheyaislan.app.infrastructure.database.DbConnection;
import dev.diltheyaislan.app.keycloak.provider.appdb.HashUtil;
import dev.diltheyaislan.app.keycloak.provider.appdb.entity.User;

public class UserRepository implements IUserRepository {

	private final Logger log = Logger.getLogger(UserRepository.class);

	private final String SQL_SELECT_BY_USERNAME = "SELECT * FROM users WHERE username=? OR CAST(id as text)=?";
	private final String SQL_SELECT_BY_EMAIL = "SELECT * FROM users WHERE email=? OR CAST(id as text)=?";
	private final String SQL_INSERT = "INSERT INTO users (nom, prenom, username, email, telephone, keycloak_id, sexe, specialite, adresse, niveau, datedenaissance, password) VALUES (?, ?, ?, ?, ?, ?, CAST(? AS SEXE), CAST(? AS SPECIALITE), ?, ?, ?, ?) RETURNING id";
	private final String SQL_UPDATE = "UPDATE users SET nom=?, prenom=?, keycloak_id=?, telephone=?, email=?, sexe=CAST(? AS SEXE), specialite=CAST(? AS SPECIALITE), adresse=?, niveau=?, datedenaissance=?, password=? WHERE username=?";
	private final String SQL_DELETE = "DELETE FROM users WHERE username=?";
	private final String SQL_COUNT = "SELECT COUNT(*) AS count FROM users";
	private final String SQL_SELECT_ALL = "SELECT * FROM users";

	private DbConnection db = new DbConnection();

	private static UserRepository instance;

	private UserRepository() {

	}

	public static UserRepository getInstance() {
		if (instance == null) {
			instance = new UserRepository();
		}
		return instance;
	}
 
	@Override
	public String insert(User user) {
		
		if (getByUsername(user.getUsername()) != null) {
			return null;
		} 

		String insertedId = null;

		try {
			db.connect();
			db.createPreparedStatement(SQL_INSERT);

			db.getPreparedStatement().setString(1, user.getLastName());
			db.getPreparedStatement().setString(2, user.getFirstName());
			db.getPreparedStatement().setString(3, user.getUsername());
			db.getPreparedStatement().setString(4, user.getEmail());
			db.getPreparedStatement().setString(5, user.getPhone());
			db.getPreparedStatement().setString(6, user.getKeycloakId());
			db.getPreparedStatement().setString(7, user.getSexe());
			db.getPreparedStatement().setString(8, user.getSpecialty());
			db.getPreparedStatement().setString(9, user.getAddress());
			db.getPreparedStatement().setObject(10, user.getLevel(), java.sql.Types.INTEGER);
			db.getPreparedStatement().setDate(11, user.getBirthDate());
			db.getPreparedStatement().setString(12, user.getPassword());

			db.getPreparedStatement().executeUpdate();
			
			ResultSet rs = db.getPreparedStatement().getGeneratedKeys();
			if (rs.next()) {
				insertedId = rs.getString(1);
			}

			db.disconnect();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}

		return insertedId;
	}

	@Override
	public User getByUsername(String username) {
		User user = null;
		try {
			db.connect();
			db.createPreparedStatement(SQL_SELECT_BY_USERNAME);

			db.getPreparedStatement().setString(1, username);
			db.getPreparedStatement().setString(2, username);

			ResultSet rs = db.getPreparedStatement().executeQuery();

			if  (rs.next()) {
				user = new User();
				user.setId(rs.getString("id"));
				user.setFirstName(rs.getString("prenom"));
				user.setLastName(rs.getString("nom"));
				user.setEmail(rs.getString("email"));
				user.setUsername(rs.getString("username"));
				user.setPhone(rs.getString("telephone"));
				user.setKeycloakId(rs.getString("keycloak_id"));
				user.setSexe(rs.getString("sexe"));
				user.setSpecialty(rs.getString("specialite"));
				user.setAddress(rs.getString("adresse"));
				user.setLevel(rs.getInt("niveau"));
				user.setBirthDate(rs.getDate("datedenaissance"));
				user.setPassword(rs.getString("password"));
				user.setRole(rs.getString("role"));
				
			}

			rs.close();
			db.disconnect();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return user;
	}

	@Override
	public User getByEmail(String username) {
		User user = null;
		try {
			db.connect();
			db.createPreparedStatement(SQL_SELECT_BY_EMAIL);

			db.getPreparedStatement().setString(1, username);
			db.getPreparedStatement().setString(2, username);

			ResultSet rs = db.getPreparedStatement().executeQuery();

			if  (rs.next()) {
				user = new User();
				user.setId(rs.getString("id"));
				user.setFirstName(rs.getString("prenom"));
				user.setLastName(rs.getString("nom"));
				user.setEmail(rs.getString("email"));
				user.setUsername(rs.getString("username"));
				user.setPhone(rs.getString("telephone"));
				user.setKeycloakId(rs.getString("keycloak_id"));
				user.setSexe(rs.getString("sexe"));
				user.setSpecialty(rs.getString("specialite"));
				user.setAddress(rs.getString("adresse"));
				user.setLevel(rs.getInt("niveau"));
				user.setBirthDate(rs.getDate("datedenaissance"));
				user.setPassword(rs.getString("password"));
				user.setRole(rs.getString("role"));
			}

			rs.close();
			db.disconnect();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return user;
	}

	@Override
	public void update(User user) {
		try {
			db.connect();
			db.createPreparedStatement(SQL_UPDATE);

			db.getPreparedStatement().setString(1, user.getLastName());
			db.getPreparedStatement().setString(2, user.getFirstName());
			db.getPreparedStatement().setString(3, user.getKeycloakId());
			db.getPreparedStatement().setString(4, user.getPhone());
			db.getPreparedStatement().setString(5, user.getEmail());
			db.getPreparedStatement().setString(6, user.getSexe());
			db.getPreparedStatement().setString(7, user.getSpecialty());
			db.getPreparedStatement().setString(8, user.getAddress());
			db.getPreparedStatement().setObject(9, user.getLevel(), java.sql.Types.INTEGER);
			db.getPreparedStatement().setDate(10, user.getBirthDate());
			db.getPreparedStatement().setString(11, user.getPassword());
			db.getPreparedStatement().setString(12, user.getUsername());

			db.getPreparedStatement().executeUpdate();
			db.disconnect();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void remove(String username) {
		try {
			db.connect();
			db.createPreparedStatement(SQL_DELETE);

			db.getPreparedStatement().setString(1, username);

			db.getPreparedStatement().executeUpdate();
			db.disconnect();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public int count() {
		int count = 0;
		try {
			db.connect();
			db.createPreparedStatement(SQL_COUNT);

			ResultSet rs = db.getPreparedStatement().executeQuery();

			if  (rs.next()) {
				count = rs.getInt("count");
			}

			rs.close();
			db.disconnect();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return count;
	}

	@Override
	public List<User> getAll() {
		List<User> users = new ArrayList<>();
		try {
			db.connect();
			db.createPreparedStatement(SQL_SELECT_ALL);
			ResultSet rs = db.getPreparedStatement().executeQuery();

			while (rs.next()) {
				User user = new User();
				user.setId(rs.getString("id"));
				user.setFirstName(rs.getString("prenom"));
				user.setLastName(rs.getString("nom"));
				user.setEmail(rs.getString("email"));
				user.setUsername(rs.getString("username"));
				user.setPhone(rs.getString("telephone"));
				user.setKeycloakId(rs.getString("keycloak_id"));
				user.setSexe(rs.getString("sexe"));
				user.setSpecialty(rs.getString("specialite"));
				user.setAddress(rs.getString("adresse"));
				user.setLevel(rs.getInt("niveau"));
				user.setBirthDate(rs.getDate("datedenaissance"));
				user.setPassword(rs.getString("password"));
				user.setRole(rs.getString("role"));
				users.add(user);
			}

			rs.close();
			db.disconnect();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return users;
	}
}
