package com.appsolution.rifugiodelcuore.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "adozioni")
public class Adozione {

    @ManyToOne
    private Animale animale;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAdozione;
    
    @Column(name = "id_animale")
    private Long idAnimale;

    @Column(name = "nome_adottante")
    private String nomeAdottante;

    @Column(name = "cognome_adottante")
    private String cognomeAdottante;
    
    private String email;

    private String telefono;

    @Column(name = "data_adozione")
    private String dataAdozione;

    @Column(name = "note_aggiuntive")
    private String noteAggiuntive;

    public Animale getAnimale() {
        return animale;
    }
    public void setAnimale(Animale animale) {
        this.animale = animale;
    }
    public Long getIdAdozione() {
        return idAdozione;
    }
    public void setIdAdozione(Long idAdozione) {
        this.idAdozione = idAdozione;
    }
    public Long getIdAnimale() {
        return idAnimale;
    }
    public void setIdAnimale(Long idAnimale) {
        this.idAnimale = idAnimale;
    }
    public String getNomeAdottante() {
        return nomeAdottante;
    }
    public void setNomeAdottante(String nomeAdottante) {
        this.nomeAdottante = nomeAdottante;
    }
    public String getCognomeAdottante() {
        return cognomeAdottante;
    }
    public void setCognomeAdottante(String cognomeAdottante) {
        this.cognomeAdottante = cognomeAdottante;
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
    public String getDataAdozione() {
        return dataAdozione;
    }
    public void setDataAdozione(String dataAdozione) {
        this.dataAdozione = dataAdozione;
    }
    public String getNoteAggiuntive() {
        return noteAggiuntive;
    }
    public void setNoteAggiuntive(String noteAggiuntive) {
        this.noteAggiuntive = noteAggiuntive;
    }

    
}
