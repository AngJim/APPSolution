package com.appsolution.rifugiodelcuore.model;

import java.time.LocalDate;

import org.springframework.cglib.core.Local;

public class VeterinarioDTO {
    
    // Dati anagrafici dell'utente
    private String nome;
    private String cognome;
    private String telefono;
    private String email;
    private String codiceFiscale;
    private LocalDate dataNascita;

    // Dati specifici del veterinario
    private String clinica;
    private String specializzazione;
    private String tipoContratto;

    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getCognome() {
        return cognome;
    }
    public void setCognome(String cognome) {
        this.cognome = cognome;
    }
    public String getTelefono() {
        return telefono;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getCodiceFiscale() {
        return codiceFiscale;
    }
    public void setCodiceFiscale(String codiceFiscale) {
        this.codiceFiscale = codiceFiscale;
    }
    public LocalDate getDataNascita() {
        return dataNascita;
    }
    public void setDataNascita(LocalDate dataNascita) {
        this.dataNascita = dataNascita;
    }
    public String getClinica() {
        return clinica;
    }
    public void setClinica(String clinica) {
        this.clinica = clinica;
    }
    public String getSpecializzazione() {
        return specializzazione;
    }
    public void setSpecializzazione(String specializzazione) {
        this.specializzazione = specializzazione;
    }
    public String getTipoContratto() {
        return tipoContratto;
    }
    public void setTipoContratto(String tipoContratto) {
        this.tipoContratto = tipoContratto;
    }
}
