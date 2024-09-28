package com.example.backend.infra.security;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;
    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = this.recoverToken(request);
        logger.info("Token recovered: " + token);
        if (token != null) {
            String userEmail = tokenService.validateToken(token);
            logger.info("Token validation result: " + userEmail);
            User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found"));
            var authorities = user.getAuthorities();
            logger.info("User authorities: " + authorities);
            var auth = new UsernamePasswordAuthenticationToken(user, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(auth);
            logger.info("User authenticated: " + userEmail + " with roles: " + user.getAuthorities());
        } else {
            logger.info("Token not found in Authorization header");
        }
        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        var token = request.getHeader("Authorization");
        if (token == null) return null;
        return token.replace("Bearer ", "");
    }
}
