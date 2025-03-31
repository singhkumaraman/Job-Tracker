package org.firstproject.jobtracker.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.firstproject.jobtracker.model.Users;
import java.util.Collection;
import java.util.List;

public class UserPrinciple implements UserDetails {
    private  final Users user;

    public UserPrinciple(Users user) {
           this.user=user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }
}
