package com.appsolution.rifugiodelcuore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AnimaleControllerMVC {
    
    @GetMapping("/animali")
    public String mostraPaginaAnimali() {
        return "animali";
    }
}
