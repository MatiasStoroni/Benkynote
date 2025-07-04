package com.benkynote.benkynote.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import static org.springframework.security.config.Customizer.withDefaults;
import jakarta.servlet.MultipartConfigElement;
//import static org.springframework.security.oauth2.jwt.;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {

  @Value("${auth0.audience}")
  private String audience;

  @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
  private String issuer;

  @Value("${web.cors.allowed-origins}")
  private String corsAllowedOrigins;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf((csrf) -> csrf.disable())
        .cors(withDefaults())
        .authorizeHttpRequests(authorizeRequests -> 
          authorizeRequests
                            .requestMatchers("/users/**").permitAll()
                            .requestMatchers("/users/getJavaId").permitAll()
                            .requestMatchers("/roles/**").permitAll()
                            .requestMatchers("/subjects/**").permitAll()
                            .requestMatchers("/users/{userId}/notes/**").permitAll()
                            .requestMatchers("/users/{userId}/calendar/**").permitAll()
                            .requestMatchers("/api/public/**").permitAll()
                            .requestMatchers("/users/{userId}/events/**").permitAll()
                            .requestMatchers("/users/{userId}/events/{eventId}/**").permitAll()
                            .requestMatchers("/institutions/**").permitAll()
                            .requestMatchers("/users/sessions/**").authenticated()
                            

                            .requestMatchers("/api/private").hasAuthority("cliente")
                          //.requestMatchers("/api/private-scoped").hasAuthority("cliente")
                           .anyRequest().authenticated()
        )
        .oauth2ResourceServer(oauth2ResourceServer -> oauth2ResourceServer.jwt(jwt -> jwt.decoder(jwtDecoder()) // hay
                                                                                                                // que
                                                                                                                // crearlos
                                                                                                                // más
                                                                                                                // abajo
            .jwtAuthenticationConverter(jwtAuthenticationConverter())));
    return http.build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList(corsAllowedOrigins));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS", "HEAD"));
    configuration.setAllowCredentials(true);
    configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
    configuration.setExposedHeaders(Arrays.asList("X-Get-Header"));
    configuration.setMaxAge(3600L);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

  @Bean
  JwtDecoder jwtDecoder() {

    NimbusJwtDecoder jwtDecoder = JwtDecoders.fromOidcIssuerLocation(issuer);

    OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator(audience);
    OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuer);
    OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer, audienceValidator);

    jwtDecoder.setJwtValidator(withAudience);

    return jwtDecoder;
  }

  @Bean
  JwtAuthenticationConverter jwtAuthenticationConverter() {
    JwtGrantedAuthoritiesConverter converter = new JwtGrantedAuthoritiesConverter();
    converter.setAuthoritiesClaimName("https://Benkynote/roles");
    converter.setAuthorityPrefix("");

    JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
    jwtConverter.setJwtGrantedAuthoritiesConverter(converter);
    return jwtConverter;
  }

  // @Bean
  // public MultipartConfigElement multipartConfigElement() {
  //   MultipartConfigFactory factory = new MultipartConfigFactory();
  //   factory.setMaxFileSize("10MB");
  //   factory.setMaxRequestSize("10MB");
  //   return factory.createMultipartConfig();
  // }

}
