package com.appsolution.rifugiodelcuore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.appsolution.rifugiodelcuore.model.Veterinario;

public interface VeterinarioRepository extends JpaRepository<Veterinario, Integer> {
    
    @Query("SELECT v FROM Veterinario v WHERE " +
           "LOWER(v.nome) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(v.cognome) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Veterinario> searchByquery(@Param("query") String query);

    boolean existsByCodiceFiscale(String codiceFiscale);
    boolean existsByEmail(String email);
}
