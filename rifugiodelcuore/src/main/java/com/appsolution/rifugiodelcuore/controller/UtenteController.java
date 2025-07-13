package com.appsolution.rifugiodelcuore.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appsolution.rifugiodelcuore.model.Utente;
import com.appsolution.rifugiodelcuore.service.UtenteService;

@RestController
@RequestMapping("/utenti")
public class UtenteController {

    @Autowired
    private UtenteService utenteService;

    @PostMapping
    public Utente creaUtente(@RequestBody Utente utente) {
        return utenteService.salvaSeNonEsiste(utente);
    }

    @GetMapping("/{cf}")
    public Optional<Utente> getUtente(@PathVariable String cf) {
        return utenteService.findByCodiceFiscale(cf);
    }
}
