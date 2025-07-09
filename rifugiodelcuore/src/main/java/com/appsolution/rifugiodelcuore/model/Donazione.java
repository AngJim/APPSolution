package com.appsolution.rifugiodelcuore.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "donazioni")
public class Donazione {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idDonazione;
	
	@Column(name = "nome_donatore")
	private String nomeDonatore;
	private double importo;
	
	@Column(name = "metodo_pagamento")
	private String metodoPagamento;
	
	@Column(name = "data_donazione")
	private String dataDonazione;
	
	@Column(name = "note")
	private String noteAggiuntive;

	public Long getIdDonazione() {
		return idDonazione;
	}

	public void setIdDonazione(Long idDonazione) {
		this.idDonazione = idDonazione;
	}

	public String getNomeDonatore() {
		return nomeDonatore;
	}

	public void setNomeDonatore(String nomeDonatore) {
		this.nomeDonatore = nomeDonatore;
	}

	public double getImporto() {
		return importo;
	}

	public void setImporto(double importo) {
		this.importo = importo;
	}

	public String getMetodoPagamento() {
		return metodoPagamento;
	}

	public void setMetodoPagamento(String metodoPagamento) {
		this.metodoPagamento = metodoPagamento;
	}

	public String getDataDonazione() {
		return dataDonazione;
	}

	public void setDataDonazione(String dataDonazione) {
		this.dataDonazione = dataDonazione;
	}

	public String getNoteAggiuntive() {
		return noteAggiuntive;
	}

	public void setNoteAggiuntive(String noteAggiuntive) {
		this.noteAggiuntive = noteAggiuntive;
	}
	
	

}
