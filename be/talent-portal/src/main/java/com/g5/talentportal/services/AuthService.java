package com.g5.talentportal.services;
 
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.g5.talentportal.dtos.AuthResponse;
import com.g5.talentportal.dtos.LoginRequest;
import com.g5.talentportal.dtos.RegisterRequest;
import com.g5.talentportal.entities.Role;
import com.g5.talentportal.entities.User;
import com.g5.talentportal.enums.UserStatus;
import com.g5.talentportal.repositories.RoleRepository;
import com.g5.talentportal.repositories.UserRepository;
import com.g5.talentportal.security.JwtService;

import lombok.RequiredArgsConstructor;
 
@Service
@RequiredArgsConstructor
public class AuthService {
 
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
 
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new IllegalStateException("Username already exists");
        }
 
        Role userRole = roleRepository.findByName("MEMBER")
                .orElseThrow(() -> new RuntimeException("Error: Default role MEMBER not found."));
 
        User user = new User();
        user.setUsername(request.getUsername());
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(userRole);
        user.setStatus(UserStatus.ACTIVE);
 
        userRepository.save(user);
 
        String jwtToken = jwtService.generateToken(user);
        return new AuthResponse(jwtToken);
    }
 
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        User user = (User) authentication.getPrincipal();
        String jwtToken = jwtService.generateToken(user);
        return new AuthResponse(jwtToken);
    }
}
 