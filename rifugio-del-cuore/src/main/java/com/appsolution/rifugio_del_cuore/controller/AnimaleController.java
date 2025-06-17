package com.appsolution.rifugio_del_cuore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.appsolution.rifugio_del_cuore.model.Animale;
import com.appsolution.rifugio_del_cuore.repository.AnimaleRepository;

@Controller
public class AnimaleController {

    @Autowired
    private AnimaleRepository animaleRepository;

    @GetMapping("/animali")
    public String animale(
        @RequestParam(required = false) String nome,
        @RequestParam(required = false) String genere,
        @RequestParam(required = false) String stato,

        Model model
    ) {
        List<Animale> animali = animaleRepository.findByFiltri(
            nome != null ? nome : "",
            genere != null ? genere : "",
            stato != null ? stato : ""
        );

        model.addAttribute("animali", animali);
        return "animali";
    }

    @PostMapping("/animali/elimina/{id}")
    public String eliminaAnimale(@PathVariable Integer id) {
        animaleRepository.deleteById(id);
        return "redirect:/animali";
    }
}
