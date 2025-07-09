package com.appsolution.rifugiodelcuore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.appsolution.rifugiodelcuore.model.Donazione;

@Repository
public interface DonazioneRepository extends JpaRepository<Donazione, Long>{

}
