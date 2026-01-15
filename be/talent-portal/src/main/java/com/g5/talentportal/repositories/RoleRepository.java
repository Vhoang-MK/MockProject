package com.g5.talentportal.repositories;
 
import com.g5.talentportal.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
 
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String name);
}
 
 