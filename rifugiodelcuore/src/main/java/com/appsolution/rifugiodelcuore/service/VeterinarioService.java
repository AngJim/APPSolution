package com.appsolution.rifugiodelcuore.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.appsolution.rifugiodelcuore.dto.VeterinarioDTO;
import com.appsolution.rifugiodelcuore.model.Utente;
import com.appsolution.rifugiodelcuore.model.Veterinario;
import com.appsolution.rifugiodelcuore.model.TipoContratto;
import com.appsolution.rifugiodelcuore.repository.VeterinarioRepository;

@Service
public class VeterinarioService {

    public final VeterinarioRepository veterinarioRepository;
    private final UtenteService utenteService;

    public VeterinarioService(VeterinarioRepository veterinarioRepository, UtenteService utenteService) {
        this.veterinarioRepository = veterinarioRepository;
        this.utenteService = utenteService;
    }

    // Restituisce tutti i veterinari
    public List<Veterinario> getAllVeterinari() {
        return veterinarioRepository.findAll();
    }

    // Restituisce un veterinario per ID
    public Veterinario getVeterinarioById(int id) {
        return veterinarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Veterinario non trovato: " + id));
    }

    // Elimina un veterinario per ID
    public void deleteVeterinario(int id) {
        veterinarioRepository.deleteById(id);
    }

    //Aggiorna un veterinario, inclusi i dati anagrafici (utente)
    public Veterinario updateVeterinario(int id, Veterinario updatedVeterinario) {
        Veterinario existing = veterinarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Veterinario non trovato: " + id));

        // Aggiorna dati anagrafici dell'utente collegato
        Utente u = existing.getUtente();
        Utente nuovoUtente = updatedVeterinario.getUtente();

        u.setNome(nuovoUtente.getNome());
        u.setCognome(nuovoUtente.getCognome());
        u.setTelefono(nuovoUtente.getTelefono());
        u.setEmail(nuovoUtente.getEmail());
        u.setCodiceFiscale(nuovoUtente.getCodiceFiscale());
        u.setDataNascita(nuovoUtente.getDataNascita());
        utenteService.salva(u);

        // Aggiorna dati veterinario
        existing.setClinica(updatedVeterinario.getClinica());
        existing.setSpecializzazione(updatedVeterinario.getSpecializzazione());
        existing.setTipoContratto(updatedVeterinario.getTipoContratto());

        return veterinarioRepository.save(existing);
    }
    
    //Ricerca per nome e cognome
public List<Veterinario> searchVeterinari(String cf, String nome, String cognome) {

    /* ❶ Se il CF è presente, ignoro gli altri e cerco solo per CF */
    if (cf != null && !cf.isBlank()) {
        return veterinarioRepository.findByUtente_CodiceFiscaleIgnoreCase(cf.trim())
                                    .map(List::of)
                                    .orElse(List.of());
    }

    /* ❷ Altrimenti filtro per nome e/o cognome (anche uno solo) */
    String n  = (nome    == null || nome.isBlank())    ? null : nome.trim();
    String cn = (cognome == null || cognome.isBlank()) ? null : cognome.trim();

    if (n == null && cn == null)                       // nessun criterio ⇒ niente risultati
        return List.of();                              // oppure findAll()

    return veterinarioRepository.searchByNomeECognome(n, cn);
}

    public Veterinario salvaVeterinarioConUtente(VeterinarioDTO request) {

        /* 1 ─ validazioni su CF ed e-mail ----------------------------- */

        // Validazione codice fiscale
        String cf = request.getCodiceFiscale().toUpperCase();
        if (!cf.matches("^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$")) {
            throw new IllegalArgumentException("Codice fiscale non valido.");
        }

        // Validazione email
        if (request.getEmail() != null && !request.getEmail().isBlank()) {
            if (!request.getEmail().matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"))
                throw new IllegalArgumentException("Email non valida.");

            if (utenteService.existsByEmail(request.getEmail()))
                throw new IllegalArgumentException("Email già registrata.");
}

        /* 2 ─ controlli duplicato su utente --------------------------- */

        if (utenteService.existsByEmail(request.getEmail()))
            throw new IllegalArgumentException("Email già registrata.");

        if (utenteService.existsByNomeAndCognome(request.getNome(), request.getCognome()))
            throw new IllegalArgumentException("Nome e cognome già presenti.");

        /* 3 ─ trova-o-crea l'utente ---------------------------------- */

        Utente utente = utenteService.findByCodiceFiscale(cf)
                .orElseGet(() -> {
                    Utente nuovo = new Utente();
                    nuovo.setCodiceFiscale(cf);
                    nuovo.setNome(request.getNome());
                    nuovo.setCognome(request.getCognome());
                    nuovo.setTelefono(request.getTelefono());
                    nuovo.setEmail(request.getEmail());
                    nuovo.setDataNascita(request.getDataNascita());
                    return utenteService.salva(nuovo);
                });

        // Controllo se è già veterinario
        Optional<Veterinario> esistente = veterinarioRepository.findByUtente(utente);
        if (esistente.isPresent()) {
            throw new IllegalArgumentException("Questo utente è già registrato come veterinario.");
        }

        // Creo e salvo il nuovo veterinario
        Veterinario v = new Veterinario();
        v.setUtente(utente);
        v.setClinica(request.getClinica());
        v.setSpecializzazione(request.getSpecializzazione());

        try {
            v.setTipoContratto(TipoContratto.valueOf(request.getTipoContratto().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Tipo di contratto non valido.");
        }

        return veterinarioRepository.save(v);
    }
}
