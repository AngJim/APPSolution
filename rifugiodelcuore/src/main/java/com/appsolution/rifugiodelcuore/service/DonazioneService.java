package com.appsolution.rifugiodelcuore.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appsolution.rifugiodelcuore.model.Donazione;
import com.appsolution.rifugiodelcuore.repository.DonazioneRepository;

@Service
public class DonazioneService {
	@Autowired
	private final DonazioneRepository donazioneRepository;
	
	public DonazioneService(DonazioneRepository donazioneRepository) {
        this.donazioneRepository = donazioneRepository;
    }
	
	public List<Donazione> getAllDonazioni(){
		return donazioneRepository.findAll();
	}
	
	public Optional<Donazione> getDonazioneById(Long id){
		return donazioneRepository.findById(id);
	}
	
	public Donazione saveDonazione(Donazione donazione) {
		return donazioneRepository.save(donazione);
	}
	
	public void deleteAdozione(Long id) {
		donazioneRepository.deleteById(id);
	}
	
	public Optional<Donazione> updateDonazione(Donazione updatedDonazione, Long id){
		return donazioneRepository.findById(id).map( donazione -> {
			donazione.setNomeDonatore(updatedDonazione.getNomeDonatore());
			donazione.setImporto(updatedDonazione.getImporto());
			donazione.setMetodoPagamento(updatedDonazione.getMetodoPagamento());
			donazione.setDataDonazione(updatedDonazione.getDataDonazione());
			donazione.setNoteAggiuntive(updatedDonazione.getNoteAggiuntive());
			return donazioneRepository.save(donazione);
		});
	}

	public List<Donazione> filtra(String nomeDonatore, String metodoPagamento, String data) {
    return donazioneRepository.findAll().stream()
        .filter(v -> nomeDonatore == null || nomeDonatore.isEmpty() || v.getNomeDonatore().contains(nomeDonatore))
        .filter(v -> metodoPagamento == null || metodoPagamento.isEmpty() || v.getMetodoPagamento().contains(metodoPagamento))
        .filter(v -> data == null || data.isEmpty() || v.getDataDonazione().toString().equals(data))
        .toList();
    }

}
