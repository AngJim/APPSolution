package com.appsolution.rifugiodelcuore.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.appsolution.rifugiodelcuore.model.Utente;
import com.appsolution.rifugiodelcuore.repository.UtenteRepository;

import jakarta.transaction.Transactional;

@Service
public class UtenteService {
    
    private final UtenteRepository utenteRepository;
    public UtenteService(UtenteRepository utenteRepository) {
        this.utenteRepository = utenteRepository;
    }

        /* ------------------------------------------------------------
                                LETTURA
       ------------------------------------------------------------ */

    public Optional<Utente> findByCodiceFiscale(String codiceFiscale) {
        return utenteRepository.findById(codiceFiscale);
    }

        public boolean existsByEmail(String email) {
        return utenteRepository.existsByEmailIgnoreCase(email);
    }

    public boolean existsByNomeAndCognome(String nome, String cognome) {
        return utenteRepository.existsByNomeAndCognomeIgnoreCase(nome, cognome);
    }

        /* ------------------------------------------------------------
                                SCRITTURA
       ------------------------------------------------------------ */
    
    @Transactional
    public Utente salvaSeNonEsiste(Utente utente) {
        return utenteRepository.findById(utente.getCodiceFiscale())
                .orElseGet(() -> utenteRepository.save(utente));
    }
    @Transactional
    public Utente salva(Utente utente) {
        return utenteRepository.save(utente);
    }
}
