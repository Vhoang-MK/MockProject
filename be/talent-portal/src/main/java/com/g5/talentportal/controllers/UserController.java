package com.g5.talentportal.controllers;
 
import com.g5.talentportal.dtos.CreateUserRequest;
import com.g5.talentportal.dtos.UserResponse;
import com.g5.talentportal.entities.User;
import com.g5.talentportal.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
 
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
 
    private final UserService userService;
 
    @PostMapping
    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody CreateUserRequest request) {
        User createdUser = userService.createUser(request);
        UserResponse response = UserResponse.fromEntity(createdUser);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
 
    @GetMapping
    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<Page<UserResponse>> getAllUsers(
            @PageableDefault(size = 10, sort = "fullName") Pageable pageable
    ) {
        Page<User> userPage = userService.getAllUsers(pageable);
        Page<UserResponse> responsePage = userPage.map(UserResponse::fromEntity);
        return ResponseEntity.ok(responsePage);
    }
}
 