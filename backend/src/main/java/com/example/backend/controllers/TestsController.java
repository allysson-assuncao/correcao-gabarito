package com.example.backend.controllers;

import com.example.backend.dto.LoginRequestDTO;
import com.example.backend.dto.RegisterRequestDTO;
import com.example.backend.infra.security.TokenService;
import com.example.backend.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import java.util.Optional;

@WebMvcTest(TestsController.class)
public class TestsController {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private User user;

    @Mock
    private TokenService tokenService;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

    @Test
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

    @WithMockUser // Usar um usuário simulado para acessar o endpoint protegido
    @Test
    void testAuthenticatedEndpoint() throws Exception {
        mockMvc.perform(get("/test"))
                .andExpect(status().isOk())
                .andExpect(content().string("Successfully authenticated"));
    }

}
