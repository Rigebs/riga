package com.rige.security;

import com.rige.entities.RoleEntity;
import com.rige.entities.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    String jwtSecret;

    @Value("${jwt.expiration}")
    long jwtExpiration;

    public String createAccessToken(UserEntity user) {
        long expirationTime = jwtExpiration * 1_000;
        Date expirationDate = new Date(System.currentTimeMillis() + expirationTime);

        Map<String, Object> claims = new HashMap<>();
        claims.put("name", user.getName());
        claims.put("phone", user.getPhone());
        claims.put("address", user.getAddress());
        claims.put("roles", user.getRoles().stream()
                .map(RoleEntity::getName)
                .collect(Collectors.toList()));

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(expirationDate)
                .signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes()))
                .compact();
    }

    public String createRefreshToken(String email) {
        long refreshExpiration = jwtExpiration * 7 * 1_000;
        Date expirationDate = new Date(System.currentTimeMillis() + refreshExpiration);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(expirationDate)
                .signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes()))
                .compact();
    }

    public String getEmailFromRefreshToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(jwtSecret.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public UsernamePasswordAuthenticationToken getAuthentication(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(jwtSecret.getBytes())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            String email = claims.getSubject();

            @SuppressWarnings("unchecked")
            ArrayList<String> roles = (ArrayList<String>) claims.get("roles");

            Collection<GrantedAuthority> authorities = new ArrayList<>();
            for (String role : roles) {
                authorities.add(new SimpleGrantedAuthority(role));
            }

            return new UsernamePasswordAuthenticationToken(email, null, authorities);
        } catch (JwtException e) {
            throw new JwtException("Invalid token: " + e.getMessage());
        }
    }
}