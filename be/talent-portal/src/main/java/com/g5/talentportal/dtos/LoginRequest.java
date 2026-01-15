package com.g5.talentportal.dtos;
 
import lombok.Data;
import jakarta.validation.constraints.NotBlank;
 
@Data
public class LoginRequest {
    @NotBlank(message = "Username cannot be empty")
    private String username;
    @NotBlank(message = "Password cannot be empty")
    private String password;
}
 
 