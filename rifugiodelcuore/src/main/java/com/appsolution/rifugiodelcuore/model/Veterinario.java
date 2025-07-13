package com.appsolution.rifugiodelcuore.model;
import com.appsolution.rifugiodelcuore.model.TipoContratto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "veterinari")
public class Veterinario {
    
    @Id
    @Column(name = "id_veterinario")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idVeterinario;

    @OneToOne
    @JoinColumn(name = "codice_fiscale", referencedColumnName = "codiceFiscale")
    private Utente utente;

    private String clinica;
    private String specializzazione;

    @Enumerated(EnumType.STRING)
    private TipoContratto tipoContratto;
    
    public int getIdVeterinario() {
        return idVeterinario;
    }
    public void setIdVeterinario(int idVeterinario) {
        this.idVeterinario = idVeterinario;
    }
    public Utente getUtente() {
        return utente;
    }
    public void setUtente(Utente utente) {
        this.utente = utente;
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
    public TipoContratto getTipoContratto() {
        return tipoContratto;
    }
    public void setTipoContratto(TipoContratto tipoContratto) {
        this.tipoContratto = tipoContratto;
    }

    
}
