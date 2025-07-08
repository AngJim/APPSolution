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
        
        // (Validazione email (regex))
        if (!veterinario.getEmail().matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            throw new IllegalArgumentException("Formato email non valido.");
        }        

        // (Validazione codice fiscale (regex))
        if (!veterinario.getCodiceFiscale().matches("^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$")) {
            throw new IllegalArgumentException("Formato del codice fiscale non valido.");
        }

        if (veterinarioRepository.existsByCodiceFiscale(veterinario.getCodiceFiscale())) {
            throw new IllegalArgumentException("Codice fiscale già presente nel sistema.");
        }

        if (veterinarioRepository.existsByEmail(veterinario.getEmail())) {
            throw new IllegalArgumentException("Email già registrata.");
        }
  
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
        existingVeterinario.setCodiceFiscale(updatedVeterinario.getCodiceFiscale());
        existingVeterinario.setClinica(updatedVeterinario.getClinica());
        existingVeterinario.setSpecializzazione(updatedVeterinario.getSpecializzazione());
        existingVeterinario.setTipoContratto(updatedVeterinario.getTipoContratto());
        return veterinarioRepository.save(existingVeterinario);
    }
    
    //filtra per nome e cognome
    public List<Veterinario> searchVeterinari(String query) {
        return veterinarioRepository.searchByquery(query);
    }

    

    
}
