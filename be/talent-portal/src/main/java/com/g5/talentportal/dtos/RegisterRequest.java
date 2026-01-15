package com.g5.talentportal.dtos;
 
import lombok.Data;
 
@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String fullName;
    private String email;
}
 