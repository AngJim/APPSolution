package com.appsolution.rifugiodelcuore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.appsolution.rifugiodelcuore.model.Veterinario;
import com.appsolution.rifugiodelcuore.service.VeterinarioService;

@RestController
@RequestMapping("/api/veterinari")
public class VeterinarioController {
    
    @Autowired
    private VeterinarioService veterinarioService;

    @GetMapping
    public List<Veterinario> getAllVeterinari(){
        return veterinarioService.getAllVeterinari();
    }

    @PostMapping
    public ResponseEntity<?> createVeterinario(@RequestBody Veterinario veterinario) {
        try {
            Veterinario saved = veterinarioService.saveVeterinario(veterinario);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    
    @GetMapping("/search")
    public List<Veterinario> searchVeterinari(@RequestParam String query) {
        return veterinarioService.searchVeterinari(query);
    }

    
}  
