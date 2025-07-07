package com.appsolution.rifugiodelcuore.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.appsolution.rifugiodelcuore.model.Visite;
import com.appsolution.rifugiodelcuore.repository.VisiteRepository;

@Service
public class VisiteService {
    @Autowired
    private final VisiteRepository visiteRepository;
    
    public VisiteService(VisiteRepository visiteRepository) {
        this.visiteRepository = visiteRepository;
    }
    
    public List<Visite> getAllVisite() {
        return visiteRepository.findAll();
    }
    
    public Optional<Visite> getVisiteById(Integer id) {
        return visiteRepository.findById(id);
    }
    
    public Visite saveVisite(Visite visite) {
        return visiteRepository.save(visite);
    }
    
    public void deleteVisite(Integer id) {
        visiteRepository.deleteById(id);
    }
    
    public Optional<Visite> updateVisite(Integer id, Visite updatedVisite) {
        return visiteRepository.findById(id).map(visite -> {
            visite.setMicrochipAnimale(updatedVisite.getMicrochipAnimale());
            visite.setCodiceFiscaleVeterinario(updatedVisite.getCodiceFiscaleVeterinario());
            visite.setDataVisita(updatedVisite.getDataVisita());
            visite.setOrarioVisita(updatedVisite.getOrarioVisita());
            visite.setTipoVisita(updatedVisite.getTipoVisita());
            visite.setUrgenza(updatedVisite.getUrgenza());
            visite.setNoteAggiuntive(updatedVisite.getNoteAggiuntive());
            return visiteRepository.save(visite);
        });
    }


    public List<Visite> filtra(String microchip, String codiceFiscale, String data, String tipo, String urgenza) {
    return visiteRepository.findAll().stream()
        .filter(v -> microchip == null || microchip.isEmpty() || v.getMicrochipAnimale().contains(microchip))
        .filter(v -> codiceFiscale == null || codiceFiscale.isEmpty() || v.getCodiceFiscaleVeterinario().contains(codiceFiscale))
        .filter(v -> data == null || data.isEmpty() || v.getDataVisita().toString().equals(data))
        .filter(v -> tipo == null || tipo.isEmpty() || v.getTipoVisita().equalsIgnoreCase(tipo))
        .filter(v -> urgenza == null || urgenza.isEmpty() || v.getUrgenza().equalsIgnoreCase(urgenza))
        .toList();
    }

    
}