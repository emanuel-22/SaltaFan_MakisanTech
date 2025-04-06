package com.makisanTech.saltaFan.service;

import com.makisanTech.saltaFan.dto.LoginDTO;
import com.makisanTech.saltaFan.dto.request.RegistrationDTO;
import com.makisanTech.saltaFan.dto.response.LoginResponseDTO;
import com.makisanTech.saltaFan.model.Role;
import com.makisanTech.saltaFan.model.User;
import com.makisanTech.saltaFan.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository repository;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private JwtService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public LoginResponseDTO login(LoginDTO data) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(data.email(), data.password())
        );

        User user = repository.findByEmail(data.email());

        if (auth.isAuthenticated()) {
            String token = jwtService.generateToken(data.email());
            return new LoginResponseDTO(user.getId(), user.getName(), token, user.getRole());
        }

        return null;
    }

    public LoginResponseDTO register(RegistrationDTO data) {

        if  (repository.findByEmail(data.email()) != null) {
            throw new IllegalArgumentException("El email ya está registrado.");
        }

        User user = new User();

        user.setName(data.name());
        user.setSurname(data.surname());
        user.setEmail(data.email());
        user.setPassword(encoder.encode(data.password()));
        user.setPhone(data.phone());
        user.setRole(Role.USER);

        repository.save(user);

        return login(new LoginDTO(data.email(), data.password()));
    }
}
