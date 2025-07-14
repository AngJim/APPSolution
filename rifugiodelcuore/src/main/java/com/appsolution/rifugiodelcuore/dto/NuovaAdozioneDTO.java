package com.appsolution.rifugiodelcuore.dto;

import java.time.LocalDate;

public class NuovaAdozioneDTO {

    private String microchip;
    private LocalDate data;
    private String note;

    private String codiceFiscaleUtente;  // usato se utente già esistente

    private String nome;
    private String cognome;
    private String email;
    private String telefono;
    
    public String getMicrochip() {
        return microchip;
    }
    public void setMicrochip(String microchip) {
        this.microchip = microchip;
    }
    public LocalDate getData() {
        return data;
    }
    public void setData(LocalDate data) {
        this.data = data;
    }
    public String getNote() {
        return note;
    }
    public void setNote(String note) {
        this.note = note;
    }
    public String getCodiceFiscaleUtente() {
        return codiceFiscaleUtente;
    }
    public void setCodiceFiscaleUtente(String codiceFiscaleUtente) {
        this.codiceFiscaleUtente = codiceFiscaleUtente;
    }
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
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getTelefono() {
        return telefono;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    
}