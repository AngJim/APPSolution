package com.appsolution.rifugiodelcuore.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import com.appsolution.rifugiodelcuore.model.Visite;
import com.appsolution.rifugiodelcuore.repository.VisiteRepository;

@Service
public class VisiteService {
    
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
            visite.setId_Animale(updatedVisite.getId_Animale());
            visite.setId_Veterinario(updatedVisite.getId_Veterinario());
            visite.setData_Visita(updatedVisite.getData_Visita());
            visite.setOrario_Visita(updatedVisite.getOrario_Visita());
            visite.setTipo_Visita(updatedVisite.getTipo_Visita());
            visite.setUrgenza(updatedVisite.getUrgenza());
            visite.setNote_Aggiuntive(updatedVisite.getNote_Aggiuntive());
            return visiteRepository.save(visite);
        });
    }
    
    // Metodi aggiuntivi specifici per le visite - usando filtri manuali
    public List<Visite> getVisiteByAnimale(Integer idAnimale) {
        return visiteRepository.findAll().stream()
                .filter(visite -> visite.getId_Animale() != null && visite.getId_Animale().equals(idAnimale))
                .collect(Collectors.toList());
    }
   
    public List<Visite> getVisiteByVeterinario(Integer idVeterinario) {
        return visiteRepository.findAll().stream()
                .filter(visite -> visite.getId_Veterinario() != null && visite.getId_Veterinario().equals(idVeterinario))
                .collect(Collectors.toList());
    }
    
    public List<Visite> getVisiteByData(String dataVisita) {
        return visiteRepository.findAll().stream()
                .filter(visite -> visite.getData_Visita() != null && visite.getData_Visita().equals(dataVisita))
                .collect(Collectors.toList());
    }
    
    public List<Visite> getVisiteByTipo(String tipoVisita) {
        return visiteRepository.findAll().stream()
                .filter(visite -> visite.getTipo_Visita() != null && visite.getTipo_Visita().equalsIgnoreCase(tipoVisita))
                .collect(Collectors.toList());
    }
    
    public List<Visite> getVisiteByUrgenza(String urgenza) {
        return visiteRepository.findAll().stream()
                .filter(visite -> visite.getUrgenza() != null && visite.getUrgenza().equalsIgnoreCase(urgenza))
                .collect(Collectors.toList());
    }
}