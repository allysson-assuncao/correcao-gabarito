package com.example.backend.request;

import com.example.backend.controllers.AuthController;
import com.example.backend.dto.LoginRequestDTO;
import com.example.backend.dto.RegisterRequestDTO;
import com.example.backend.infra.security.TokenService;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.mockito.Mockito.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;


import java.util.Optional;

@WebMvcTest(AuthController.class)
public class AuthRequestsTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private UserRepository user;

    @MockBean
    private TokenService tokenService;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

    /*@Test
    void testLoginSuccess() throws Exception {
        // Configurar o comportamento do mock
        when(user.findByEmail("test@example.com")).thenReturn(Optional.of(new User("test@example.com", "passwordHash", "testUser")));
        when(tokenService.generateToken(any(User.class))).thenReturn("testToken");

        LoginRequestDTO request = new LoginRequestDTO("test@example.com", "password");

        mockMvc.perform(post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("testUser"))
                .andExpect(jsonPath("$.token").value("testToken"));
    }

    @Test
    void testLoginFailure() throws Exception {
        // Configurar o comportamento do mock
        when(user.findByEmail("test@example.com")).thenReturn(Optional.empty());

        LoginRequestDTO request = new LoginRequestDTO("test@example.com", "wrongPassword");

        mockMvc.perform(post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testRegisterSuccess() throws Exception {
        when(user.findByEmail("test@example.com")).thenReturn(Optional.empty());
        when(tokenService.generateToken(any(User.class))).thenReturn("testToken");

        RegisterRequestDTO request = new RegisterRequestDTO("test@example.com", "testUser", "password");

        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("testUser"))
                .andExpect(jsonPath("$.token").value("testToken"));
    }

    @Test
    void testRegisterFailure() throws Exception {
        when(user.findByEmail("test@example.com")).thenReturn(Optional.of(new User("test@example.com", "passwordHash", "testUser")));

        RegisterRequestDTO request = new RegisterRequestDTO("test@example.com", "testUser", "password");

        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @WithMockUser
    @Test
    void testAuthenticatedEndpoint() throws Exception {
        mockMvc.perform(get("/test"))
                .andExpect(status().isOk())
                .andExpect(content().string("Successfully authenticated"));
    }
*/
    @WithMockUser
    @Test
    void testAuthenticatedEndpointWithToken() throws Exception {
        String token = "Bearer testToken";

        mockMvc.perform(get("/test")
                        .header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(content().string("Successfully authenticated"));
    }

}
