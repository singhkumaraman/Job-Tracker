package org.firstproject.jobtracker.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {
    private static String secretKey="";

    public JwtService() throws NoSuchAlgorithmException {
        KeyGenerator keyGenerator=KeyGenerator.getInstance("HmacSHA256");
        SecretKey sk =keyGenerator.generateKey();
        secretKey= Base64.getEncoder().encodeToString(sk.getEncoded());
    }
    public static String generateToken(String Email) {
        Map<String, Object> claims = new HashMap<String, Object>();
        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(Email)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() * 60 * 60 * 15))
                .and()
                .signWith(getKey())
                .compact();
    }
    private static Key getKey(){
        byte[] secKey = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(secKey);
    }



}
