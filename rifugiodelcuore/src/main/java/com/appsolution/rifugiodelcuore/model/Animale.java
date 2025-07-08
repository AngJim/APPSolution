package com.appsolution.rifugiodelcuore.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "animali")
public class Animale {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String specie;
    private String razza;
    private String genere;
    private String taglia;
    private Integer eta;
    private String microchipAnimale;
    private String statoAnimale;
    
    public String getMicrochipAnimale() {
        return microchipAnimale;
    }
    public void setMicrochipAnimale(String microchipAnimale) {
        this.microchipAnimale = microchipAnimale;
    }
    public String getStatoAnimale() {
        return statoAnimale;
    }
    public void setStatoAnimale(String statoAnimale) {
        this.statoAnimale = statoAnimale;
    }
    private String descrizione;

    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getSpecie() {
        return specie;
    }
    public void setSpecie(String specie) {
        this.specie = specie;
    }
    public String getRazza() {
        return razza;
    }
    public void setRazza(String razza) {
        this.razza = razza;
    }
    public String getGenere() {
        return genere;
    }
    public void setGenere(String genere) {
        this.genere = genere;
    }
    public String getTaglia() {
        return taglia;
    }
    public void setTaglia(String taglia) {
        this.taglia = taglia;
    }
    public Integer getEta() {
        return eta;
    }
    public void setEta(Integer eta) {
        this.eta = eta;
    }
    
    public String getDescrizione() {
        return descrizione;
    }
    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

}
