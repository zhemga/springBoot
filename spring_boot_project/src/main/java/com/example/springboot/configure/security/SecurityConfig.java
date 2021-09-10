package com.example.springboot.configure.security;

import com.example.springboot.constants.Roles;
import com.example.springboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;

@Configuration
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserService userService;

    @Value("${springdoc.api-docs.path}")
    private String restApiDocPath;
    @Value("${springdoc.swagger-ui.path}")
    private String swaggerPath;

    private final JwtTokenFilter jwtTokenFilter;

    public SecurityConfig(
            JwtTokenFilter jwtTokenFilter) {
        super();
        this.jwtTokenFilter = jwtTokenFilter;
        // Inherit security context in async function calls
        SecurityContextHolder.setStrategyName(SecurityContextHolder.MODE_INHERITABLETHREADLOCAL);
    }

    // Set password encoding schema
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userService)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // Enable CORS and disable CSRF
        http = http.cors().and().csrf().disable();

        // Set session management to stateless
        http = http
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and();

        // Set unauthorized requests exception handler
        http = http
                .exceptionHandling()
                .authenticationEntryPoint(
                        (request, response, ex) -> {
                            //logger.error("Unauthorized request - {}", ex.getMessage());
                            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
                        }
                )
                .and();

        // Set permissions on endpoints
        http.authorizeRequests()
                // Swagger endpoints must be publicly accessible
                .antMatchers(String.format("%s/**", restApiDocPath)).permitAll()
                .antMatchers(String.format("%s/**", swaggerPath)).permitAll()
                // Authenticated
                .antMatchers("/api/users/**").hasAuthority(Roles.Admin)
                .antMatchers("/api/usersById/**").hasAuthority(Roles.Admin)
                .antMatchers("/api/roles/**").hasAuthority(Roles.Admin)
                .antMatchers("/api/makeUser/**").hasAuthority(Roles.Admin)
                .antMatchers("/api/makeDoctor/**").hasAuthority(Roles.Admin)
                .antMatchers("/api/hospitalsById/**").hasAuthority(Roles.Admin)
                .antMatchers(HttpMethod.DELETE, "/**").hasAuthority(Roles.Admin)
                .antMatchers("/api/doctors/**").hasAuthority(Roles.User)
                .antMatchers("/api/admissions/**").hasAuthority(Roles.User)
                .antMatchers("/api/hospitals/**").hasAuthority(Roles.User)
                .antMatchers("/api/cancelAdmission/**").hasAuthority(Roles.User)
                .antMatchers("/api/checkAdmission/**").hasAuthority(Roles.Doctor)
                // System public
                .antMatchers(String.format("/login/**")).permitAll()
                .antMatchers(String.format("/register/**")).permitAll()
                .antMatchers(String.format("/static/**")).permitAll()
                .antMatchers(String.format("/volt-react-dashboard/**")).permitAll();


        http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
    }

    // Expose authentication manager bean
    @Override @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}