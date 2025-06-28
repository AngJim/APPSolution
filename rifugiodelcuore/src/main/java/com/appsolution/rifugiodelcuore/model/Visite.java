package com.appsolution.rifugiodelcuore.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table(name = "visite")
public class Visite {

    @Id
    public Integer id_Visita;

    public Integer id_Animale;
    public Integer id_Veterinario;
    public String data_Visita;
    public String orario_Visita;
    public String tipo_Visita;
    public String urgenza;  
    public String note_Aggiuntive;
    public Integer getId_Visita() {
        return id_Visita;
    }
    public void setId_Visita(Integer id_Visita) {
        this.id_Visita = id_Visita;
    }
    public Integer getId_Animale() {
        return id_Animale;
    }
    public void setId_Animale(Integer id_Animale) {
        this.id_Animale = id_Animale;
    }
    public Integer getId_Veterinario() {
        return id_Veterinario;
    }
    public void setId_Veterinario(Integer id_Veterinario) {
        this.id_Veterinario = id_Veterinario;
    }
    public String getData_Visita() {
        return data_Visita;
    }
    public void setData_Visita(String data_Visita) {
        this.data_Visita = data_Visita;
    }
    public String getOrario_Visita() {
        return orario_Visita;
    }
    public void setOrario_Visita(String orario_Visita) {
        this.orario_Visita = orario_Visita;
    }
    public String getTipo_Visita() {
        return tipo_Visita;
    }
    public void setTipo_Visita(String tipo_Visita) {
        this.tipo_Visita = tipo_Visita;
    }
    public String getUrgenza() {
        return urgenza;
    }
    public void setUrgenza(String urgenza) {
        this.urgenza = urgenza;
    }
    public String getNote_Aggiuntive() {
        return note_Aggiuntive;
    }
    public void setNote_Aggiuntive(String note_Aggiuntive) {
        this.note_Aggiuntive = note_Aggiuntive;
    }


   
    
    
}