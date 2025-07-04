package com.appsolution.rifugiodelcuore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appsolution.rifugiodelcuore.model.Veterinario;

public interface VeterinarioRepository extends JpaRepository<Veterinario, Integer> {
    
}
