package com.appsolution.rifugiodelcuore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appsolution.rifugiodelcuore.model.Adozione;

public interface AdozioneRepository extends JpaRepository<Adozione, Long> {
    
}
