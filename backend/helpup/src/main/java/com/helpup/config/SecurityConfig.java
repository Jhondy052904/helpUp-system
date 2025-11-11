package com.helpup.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // disable CSRF for API testing
                .authorizeHttpRequests()
                .anyRequest().permitAll() // allow all endpoints without authentication
                .and()
                .formLogin().disable(); // disable Spring's default login page
        return http.build();
    }
}
