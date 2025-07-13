package com.appsolution.rifugiodelcuore.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.appsolution.rifugiodelcuore.dto.VeterinarioDTO;
import com.appsolution.rifugiodelcuore.model.Veterinario;
import com.appsolution.rifugiodelcuore.service.VeterinarioService;

@RestController
@RequestMapping("/api/veterinari")
public class VeterinarioController {

    private final VeterinarioService veterinarioService;

    public VeterinarioController(VeterinarioService veterinarioService) {
        this.veterinarioService = veterinarioService;
    }

    /* ---------- CRUD BASE ---------- */

    /** Elenco completo */
    @GetMapping
    public List<Veterinario> getAllVeterinari() {
        return veterinarioService.getAllVeterinari();
    }

    /** Singolo veterinario per ID */
    @GetMapping("/{id}")
    public ResponseEntity<?> getVeterinarioById(@PathVariable int id) {
        try {
            return ResponseEntity.ok(veterinarioService.getVeterinarioById(id));
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    /** Crea veterinario + utente */
    @PostMapping
    public ResponseEntity<?> createVeterinario(@RequestBody VeterinarioDTO dto) {
        try {
            Veterinario saved = veterinarioService.salvaVeterinarioConUtente(dto);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    /** Aggiorna veterinario e anagrafica */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateVeterinario( @PathVariable int id,
                                                @RequestBody Veterinario updated) {
        try {
            Veterinario mod = veterinarioService.updateVeterinario(id, updated);
            return ResponseEntity.ok(mod);
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    /** Cancella veterinario */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVeterinario(@PathVariable int id) {
        try {
            veterinarioService.deleteVeterinario(id);
            return ResponseEntity.ok("Veterinario eliminato con successo");
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    /* ---------- RICERCA ---------- */

@GetMapping("/search")
public List<Veterinario> search(
        @RequestParam(required = false) String cf,
        @RequestParam(required = false) String nome,
        @RequestParam(required = false) String cognome) {

    return veterinarioService.searchVeterinari(cf, nome, cognome);
}
}
