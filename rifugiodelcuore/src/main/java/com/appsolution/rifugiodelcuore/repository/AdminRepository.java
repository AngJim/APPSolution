package com.appsolution.rifugiodelcuore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.appsolution.rifugiodelcuore.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    
}
