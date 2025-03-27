package org.firstproject.jobtracker.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String password;
}
