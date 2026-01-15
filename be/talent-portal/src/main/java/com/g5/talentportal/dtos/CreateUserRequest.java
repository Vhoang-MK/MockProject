package com.g5.talentportal.dtos;
 
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
 
@Data
public class CreateUserRequest {
 
    @NotBlank(message = "Username cannot be empty")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String username;
 
    @NotBlank(message = "Password cannot be empty")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;
 
    @NotBlank(message = "Full name cannot be empty")
    private String fullName;
 
    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Email should be valid")
    private String email;
 
    @NotNull(message = "Role ID cannot be null")
    private Integer roleId;
 
    private Long managerId;
}
 