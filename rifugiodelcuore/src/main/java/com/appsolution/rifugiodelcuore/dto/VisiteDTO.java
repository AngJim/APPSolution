package com.appsolution.rifugiodelcuore.dto;

public class VisiteDTO {

    // campi che arrivano dal form HTML
    private String microchipAnimale;
    private String codiceFiscaleVeterinario;

    private String dataVisita;       // ISO-8601 “2025-07-14”
    private String orarioVisita;     // “10:30”
    private String tipoVisita;
    private String urgenza;
    private String noteAggiuntive;

    public VisiteDTO() {}  // costruttore vuoto

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
