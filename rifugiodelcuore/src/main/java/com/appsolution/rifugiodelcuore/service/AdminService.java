package com.appsolution.rifugiodelcuore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appsolution.rifugiodelcuore.model.Admin;
import com.appsolution.rifugiodelcuore.repository.AdminRepository;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> findAll() {
        return adminRepository.findAll();
    }

    public Admin save(Admin admin) {
        // Salva la password così com'è, senza crittografia a causa di malfunzionamenti con Spring Security
        return adminRepository.save(admin);
    }

    public Admin findById(Integer id) {
        return adminRepository.findById(id).orElse(null);
    }

    public void deleteById(Integer id) {
        adminRepository.deleteById(id);
    }
}
