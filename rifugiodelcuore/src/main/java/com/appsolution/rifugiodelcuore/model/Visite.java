package com.appsolution.rifugiodelcuore.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table(name = "visite")
public class Visite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVisita;
    
    private String microchipAnimale;
    private String codiceFiscaleVeterinario;
    private String dataVisita;
    private String orarioVisita;
    private String tipoVisita;
    private String urgenza;
    private String noteAggiuntive;
    public Long getIdVisita() {
        return idVisita;
    }
    public void setIdVisita(Long idVisita) {
        this.idVisita = idVisita;
    }
    public String getMicrochipAnimale() {
        return microchipAnimale;
    }
    public void setMicrochipAnimale(String microchipAnimale) {
        this.microchipAnimale = microchipAnimale;
    }
    public String getCodiceFiscaleVeterinario() {
        return codiceFiscaleVeterinario;
    }
    public void setCodiceFiscaleVeterinario(String codiceFiscaleVeterinario) {
        this.codiceFiscaleVeterinario = codiceFiscaleVeterinario;
    }
    public String getDataVisita() {
        return dataVisita;
    }
    public void setDataVisita(String dataVisita) {
        this.dataVisita = dataVisita;
    }
    public String getOrarioVisita() {
        return orarioVisita;
    }
    public void setOrarioVisita(String orarioVisita) {
        this.orarioVisita = orarioVisita;
    }
    public String getTipoVisita() {
        return tipoVisita;
    }
    public void setTipoVisita(String tipoVisita) {
        this.tipoVisita = tipoVisita;
    }
    public String getUrgenza() {
        return urgenza;
    }
    public void setUrgenza(String urgenza) {
        this.urgenza = urgenza;
    }
    public String getNoteAggiuntive() {
        return noteAggiuntive;
    }
    public void setNoteAggiuntive(String noteAggiuntive) {
        this.noteAggiuntive = noteAggiuntive;
    }
    
    



    
    
    
}