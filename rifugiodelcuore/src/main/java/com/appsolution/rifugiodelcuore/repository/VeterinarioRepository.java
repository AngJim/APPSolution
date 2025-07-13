package com.appsolution.rifugiodelcuore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.appsolution.rifugiodelcuore.model.Utente;
import com.appsolution.rifugiodelcuore.model.Veterinario;

public interface VeterinarioRepository extends JpaRepository<Veterinario, Integer> {

    /* CF esatto (al max 1 risultato) */
    Optional<Veterinario> findByUtente_CodiceFiscaleIgnoreCase(String cf);

    /* match parziale su nome e/o cognome */
    @Query("""
           SELECT v FROM Veterinario v
           JOIN   v.utente u
           WHERE  (:nome    IS NULL OR LOWER(u.nome)    LIKE LOWER(CONCAT('%', :nome, '%')))
           AND    (:cognome IS NULL OR LOWER(u.cognome) LIKE LOWER(CONCAT('%', :cognome, '%')))
           """)
    List<Veterinario> searchByNomeECognome(@Param("nome") String nome,
                                           @Param("cognome") String cognome);

    Optional<Veterinario> findByUtente(Utente utente);
}
