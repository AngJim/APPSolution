package com.appsolution.rifugio_del_cuore.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;


@Entity
@Table(name = "animali")
public class Animale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Il nome dell'animale non può essere vuoto")
    private String nome;

    @NotBlank(message = "La specie dell'animale non può essere vuota")
    private String specie;

    @NotBlank(message = "La razza dell'animale non può essere vuota")
    private String razza;

    @Min(value = 0, message = "L'età dell'animale deve essere un numero positivo")
    private int eta;

    @Min(value = 0, message = "Il mese deve essere compreso tra 1 e 12")
    @Max(value = 12, message = "Il mese deve essere compreso tra 1 e 12")
    private int mese;

    @NotBlank(message = "Il genere dell'animale non può essere vuoto")
    private String genere;

    @NotBlank(message = "La taglia dell'animale non può essere vuota")
    private String taglia;

    @NotBlank(message = "Lo stato dell'animale non può essere vuoto")
    private String stato;

    @Lob
    private String descrizione;

    // Getter e Setter
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
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
    public int getEta() {
        return eta;
    }
    public void setEta(int eta) {
        this.eta = eta;
    }
    public int getMese() {
        return mese;
    }
    public void setMese(int mese) {
        this.mese = mese;
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
    public String getStato() {
        return stato;
    }
    public void setStato(String stato) {
        this.stato = stato;
    }
    public String getDescrizione() {
        return descrizione;
    }
    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }
}
