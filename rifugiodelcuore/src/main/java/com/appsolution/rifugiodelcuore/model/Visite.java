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
    
    private Long idAnimale;
    private Long idVeterinario;
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
    public Long getIdAnimale() {
        return idAnimale;
    }
    public void setIdAnimale(Long idAnimale) {
        this.idAnimale = idAnimale;
    }
    public Long getIdVeterinario() {
        return idVeterinario;
    }
    public void setIdVeterinario(Long idVeterinario) {
        this.idVeterinario = idVeterinario;
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