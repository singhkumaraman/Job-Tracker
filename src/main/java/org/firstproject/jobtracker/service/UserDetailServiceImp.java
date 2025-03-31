package org.firstproject.jobtracker.service;

import org.firstproject.jobtracker.model.UserPrinciple;
import org.firstproject.jobtracker.model.Users;
import org.firstproject.jobtracker.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImp implements UserDetailsService {
    private final UserRepository userRepository;

    public UserDetailServiceImp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepository.findByEmail(username);
        if(user==null) {
            throw new UsernameNotFoundException(username);
        }
        return new UserPrinciple(user);
    }
}
