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
    
}