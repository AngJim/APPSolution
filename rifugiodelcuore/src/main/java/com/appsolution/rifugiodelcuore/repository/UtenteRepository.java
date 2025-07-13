package com.appsolution.rifugiodelcuore.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appsolution.rifugiodelcuore.model.Utente;

public interface UtenteRepository extends JpaRepository<Utente, String>{
    // Codice Fiscale è la chiave primaria, 
    // quindi non serve un metodo specifico per cercare per codice fiscale 
    Optional<Utente> findByCodiceFiscaleIgnoreCase(String codiceFiscale);
    boolean existsByEmailIgnoreCase(String email);
    boolean existsByNomeAndCognomeIgnoreCase(String nome, String cognome);
}
    
