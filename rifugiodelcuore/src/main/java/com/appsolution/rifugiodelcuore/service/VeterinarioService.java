package com.appsolution.rifugiodelcuore.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.appsolution.rifugiodelcuore.model.Veterinario;
import com.appsolution.rifugiodelcuore.repository.VeterinarioRepository;

@Service
public class VeterinarioService {

    public final VeterinarioRepository veterinarioRepository;

    public VeterinarioService(VeterinarioRepository veterinarioRepository) {
        this.veterinarioRepository = veterinarioRepository;
    }

    public List<Veterinario> getAllVeterinari() {
        return veterinarioRepository.findAll();
    }

    public Veterinario getVeterinarioById(int id) {
        return veterinarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Veterinario non trovato: " + id));
    }

    public Veterinario saveVeterinario(Veterinario veterinario) {
        return veterinarioRepository.save(veterinario);
    }

    public void deleteVeterinario(int id) {
        veterinarioRepository.deleteById(id);
    }

    public Veterinario updateVeterinario(int id, Veterinario updatedVeterinario) {
        Veterinario existingVeterinario = veterinarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Veterinario non trovato: " + id));
        existingVeterinario.setNome(updatedVeterinario.getNome());
        existingVeterinario.setCognome(updatedVeterinario.getCognome());
        existingVeterinario.setTelefono(updatedVeterinario.getTelefono());
        existingVeterinario.setEmail(updatedVeterinario.getEmail());
        existingVeterinario.setClinica(updatedVeterinario.getClinica());
        existingVeterinario.setSpecializzazione(updatedVeterinario.getSpecializzazione());
        existingVeterinario.setTipoContratto(updatedVeterinario.getTipoContratto());
        return veterinarioRepository.save(existingVeterinario);
    }
    
    public List<Veterinario> searchVeterinari(String query) {
        return veterinarioRepository.findAll().stream()
            .filter(v -> v.getNome().toLowerCase().contains(query.toLowerCase()) ||
                         v.getCognome().toLowerCase().contains(query.toLowerCase()) ||
                         v.getClinica().toLowerCase().contains(query.toLowerCase()))
            .toList();
    }

    
}
