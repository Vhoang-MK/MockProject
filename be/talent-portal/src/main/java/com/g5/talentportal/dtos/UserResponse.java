package com.g5.talentportal.dtos;
 
import com.g5.talentportal.entities.User;
import com.g5.talentportal.enums.UserStatus;
import lombok.Builder;
import lombok.Data;
 
@Data
@Builder
public class UserResponse {
    private Long id;
    private String username;
    private String fullName;
    private String email;
    private UserStatus status;
    private String roleName;
    private String managerName;
 
    public static UserResponse fromEntity(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .status(user.getStatus())
                .roleName(user.getRole() != null ? user.getRole().getName() : null)
                .managerName(user.getManager() != null ? user.getManager().getFullName() : null)
                .build();
    }
}
 