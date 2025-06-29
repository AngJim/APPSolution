package com.appsolution.rifugiodelcuore.controller;

import com.appsolution.rifugiodelcuore.model.Adozione;
import com.appsolution.rifugiodelcuore.service.AdozioneService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adozioni")
public class AdozioneController {

    private final AdozioneService adozioneService;

    public AdozioneController(AdozioneService adozioneService) {
        this.adozioneService = adozioneService;
    }

    @GetMapping
    public List<Adozione> getAll() {
        return adozioneService.getAllAdoption();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Adozione> getById(@PathVariable Long id) {
        return adozioneService.getAdoptionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Adozione create(@RequestBody Adozione adozione) {
        return adozioneService.saveAdozione(adozione);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Adozione> update(@PathVariable Long id, @RequestBody Adozione nuovaAdozione) {
        return adozioneService.updateAdozione(id, nuovaAdozione)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        adozioneService.deleteAdozione(id);
        return ResponseEntity.noContent().build();
    }
}
