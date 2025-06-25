package com.appsolution.rifugiodelcuore.repository;

import com.appsolution.rifugiodelcuore.model.Visite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface VisiteRepository extends JpaRepository<Visite, Integer> {
    
}