package com.appsolution.rifugiodelcuore.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appsolution.rifugiodelcuore.model.Animale;

public interface AnimaleRepository extends JpaRepository<Animale, Long> {
    
    Optional<Animale> findByMicrochipAnimale(String microchipAnimale);
}
