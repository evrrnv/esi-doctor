package dev.diltheyaislan.app.keycloak.provider.appdb.entity;

import java.sql.Date;

public class User {
	private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
	private String keycloakId;
	private String phone;
	private Sexe sexe;
	private Integer level;
	private Specialty specialty;
	private String address;
	private Date birthDate;
	private Role role;
	public User() {
	}

    public User(String id, String firstName, String lastName, String email, String phone, String keycloakId, String username, Sexe sexe, Specialty specialty, String address, Integer level, Date birthDate, Role role, String passowrd) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
		this.phone = phone;
		this.keycloakId = keycloakId;
        this.password = passowrd;
		this.sexe = sexe;
		this.specialty = specialty;
		this.address = address;
		this.level = level;
		this.birthDate = birthDate;
		this.role = role;
    }

	public String getRole() {
		return this.role.name();
	}

	public void setRole(String role) {
		if (role != null) {
			for (Role r : Role.values()) {
				if (role.equals(r.toString())) {
				   this.setRole(r);
				}
			}
		}
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		if (birthDate != null) {
			this.birthDate = birthDate;
		}
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		if (level != null) {
			if (level != null && level >= 1 && level <= 5) {
				this.level = level;
			}
		}
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		if (address != null) {
			this.address = address;
		}
	}

	public String getSpecialty() {
		if (specialty == Specialty.SIW) return "SIW";
		else if (specialty == Specialty.ISI) return "ISI";
		return null;
	}

	public void setSpecialty(String specialty) {
		if (specialty != null) {
	        if (specialty.equalsIgnoreCase("SIW")) {
				this.specialty = Specialty.SIW;
			} else if (specialty.equalsIgnoreCase("ISI")) {
    			this.specialty = Specialty.ISI;
    		}
	    }
	}

	public String getSexe() {
		if (sexe == Sexe.M) return "M";
		else if (sexe == Sexe.F) return "F";
		return null;
	}

	public void setSexe(String sexe) {
		if (sexe != null) {
	        if (sexe.equalsIgnoreCase("M")) {
				this.sexe = Sexe.M;
			} else if (sexe.equalsIgnoreCase("F")) {
    			this.sexe = Sexe.F;
    		}
	    }
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		if (username != null) {
			this.username = username;
		}
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		if (firstName != null) {
			this.firstName = firstName;
		}
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		if (lastName != null) {
			this.lastName = lastName;
		}
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		if (email != null) {
			this.email = email;
		}
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
        this.password = password;
    }

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getKeycloakId() {
		return keycloakId;
	}

	public void setKeycloakId(String keycloakId) {
		this.keycloakId = keycloakId;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", email=" + email + ", prenom=" + firstName + ", nom=" + lastName
				+ ", telephone=" + this.phone  + ", password=" + password + ", username=" + username 
				+ ", keycloakId=" + keycloakId + ", sexe=" + getSexe() + ", specialite=" + getSpecialty() 
				+ ", datedenaissance=" + birthDate + ", niveau=" + level + ", adresse=" + address + "]";
	}
}