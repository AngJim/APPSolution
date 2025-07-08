package com.appsolution.rifugiodelcuore.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.appsolution.rifugiodelcuore.model.Animale;
import com.appsolution.rifugiodelcuore.repository.AnimaleRepository;

@Service
public class AnimaleService {

    private final AnimaleRepository animaleRepository;

    public AnimaleService(AnimaleRepository animaleRepository) {
        this.animaleRepository = animaleRepository;
    }

    public List<Animale> getAllAnimali() {
        return animaleRepository.findAll();
    }

    public Optional<Animale> getAnimaleById(Long id) {
        return animaleRepository.findById(id);
    }

    public Animale saveAnimale(Animale animale) {
        return animaleRepository.save(animale);
    }

    public void deleteAnimale(Long id) {
        animaleRepository.deleteById(id);
    }

    public Optional<Animale> updateAnimale(Long id, Animale updatedAnimale) {
        return animaleRepository.findById(id).map(animale -> {
            animale.setNome(updatedAnimale.getNome());
            animale.setSpecie(updatedAnimale.getSpecie());
            animale.setRazza(updatedAnimale.getRazza());
            animale.setGenere(updatedAnimale.getGenere());
            animale.setTaglia(updatedAnimale.getTaglia());
            animale.setEta(updatedAnimale.getEta());
            animale.setDescrizione(updatedAnimale.getDescrizione());
            return animaleRepository.save(animale);
        });
    }
}
