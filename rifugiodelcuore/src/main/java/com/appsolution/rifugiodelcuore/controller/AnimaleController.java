package com.appsolution.rifugiodelcuore.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appsolution.rifugiodelcuore.model.Animale;
import com.appsolution.rifugiodelcuore.service.AnimaleService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/animali")
public class AnimaleController {

    private final AnimaleService animaleService;

    public AnimaleController(AnimaleService animaleService) {
        this.animaleService = animaleService;
    }

    @GetMapping
    public List<Animale> getAll() {
        return animaleService.getAllAnimali();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Animale> getById(@PathVariable Long id) {
        return animaleService.getAnimaleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Animale create(@RequestBody Animale animale) {
        return animaleService.saveAnimale(animale);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Animale> update(@PathVariable Long id, @RequestBody Animale nuovoAnimale) {
        return animaleService.updateAnimale(id, nuovoAnimale)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        animaleService.deleteAnimale(id);
        return ResponseEntity.noContent().build();
    }

    
}
