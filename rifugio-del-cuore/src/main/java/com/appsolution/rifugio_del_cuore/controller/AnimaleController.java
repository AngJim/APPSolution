package com.appsolution.rifugio_del_cuore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.appsolution.rifugio_del_cuore.model.Animale;
import com.appsolution.rifugio_del_cuore.repository.AnimaleRepository;
import org.springframework.ui.Model;


import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class AnimaleController {
    
    @Autowired
    private AnimaleRepository animaleRepository;

    @GetMapping("/animali")
    public String animale(Model model) {
        List<Animale> animali = animaleRepository.findAll();
        model.addAttribute("animali", animali);
        return "animali";
    }
    
}
