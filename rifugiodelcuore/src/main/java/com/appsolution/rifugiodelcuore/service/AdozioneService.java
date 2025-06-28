package com.appsolution.rifugiodelcuore.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appsolution.rifugiodelcuore.repository.AdozioneRepository;
import com.appsolution.rifugiodelcuore.model.Adozione;

@Service
public class AdozioneService {

    @Autowired
    private final AdozioneRepository adozioneRepository;

    public AdozioneService(AdozioneRepository adozioneRepository) {
        this.adozioneRepository = adozioneRepository;
    }

    public List<Adozione> getAllAdoption() {
        return adozioneRepository.findAll();
    }

    public Optional<Adozione> getAdoptionById(Long id) {
        return adozioneRepository.findById(id);
    }

    public Adozione saveAdozione(Adozione adozione) {
        return adozioneRepository.save(adozione);
    }

    public void deleteAdozione(Long id) {
        adozioneRepository.deleteById(id);
    }



}
