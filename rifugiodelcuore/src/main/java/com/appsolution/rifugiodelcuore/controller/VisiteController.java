package com.appsolution.rifugiodelcuore.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.appsolution.rifugiodelcuore.model.Visite;
import com.appsolution.rifugiodelcuore.service.VisiteService;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/visite")
public class VisiteController {

    
    @Autowired
    private VisiteService service;
    
    private final VisiteService visiteService;
    
    public VisiteController(VisiteService visiteService) {
        this.visiteService = visiteService;
    }
    
    @GetMapping
    public List<Visite> getAll() {
        return visiteService.getAllVisite();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Visite> getById(@PathVariable Integer id) {
        return visiteService.getVisiteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public Visite create(@RequestBody Visite visite) {
        return visiteService.saveVisite(visite);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Visite> update(@PathVariable Integer id, @RequestBody Visite nuovaVisite) {
        return visiteService.updateVisite(id, nuovaVisite)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        visiteService.deleteVisite(id);
        return ResponseEntity.noContent().build();
    }
    
    

   
    
}


