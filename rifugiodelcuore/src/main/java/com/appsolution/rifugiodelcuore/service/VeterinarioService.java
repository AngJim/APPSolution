package com.appsolution.rifugiodelcuore.service;

import org.springframework.stereotype.Service;

import com.appsolution.rifugiodelcuore.repository.VeterinarioRepository;

@Service
public class VeterinarioService {

    public final VeterinarioRepository veterinarioRepository;

    public VeterinarioService(VeterinarioRepository veterinarioRepository) {
        this.veterinarioRepository = veterinarioRepository;
    }
    
}
