package com.g5.talentportal.services;
 
import com.g5.talentportal.dtos.CreateUserRequest;
import com.g5.talentportal.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
 
public interface UserService {
    User createUser(CreateUserRequest request);
    Page<User> getAllUsers(Pageable pageable);
}
 