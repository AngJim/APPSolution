package com.appsolution.rifugiodelcuore.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appsolution.rifugiodelcuore.model.Donazione;
import com.appsolution.rifugiodelcuore.service.DonazioneService;

@RestController
@RequestMapping("/api/donazioni")
public class DonazioniController {
	
	private final DonazioneService donazioneService;
	
	public DonazioniController(DonazioneService donazioneService) {
		this.donazioneService = donazioneService;
	}
	
	@GetMapping
	public List<Donazione> getAll(){
		return donazioneService.getAllDonazioni();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Donazione> getById(@PathVariable Long id){
		return donazioneService.getDonazioneById(id)
							.map(ResponseEntity::ok)
							.orElse(ResponseEntity.notFound().build());
	}
	
	@PostMapping
	public Donazione create(@RequestBody Donazione donazione) {
		return donazioneService.saveDonazione(donazione);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Donazione> update(@PathVariable Long id,@RequestBody Donazione nuovaDonazione){
		return donazioneService.updateDonazione(nuovaDonazione, id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id){
		donazioneService.deleteAdozione(id);
		return ResponseEntity.noContent().build();
	}
	
	
	

}
