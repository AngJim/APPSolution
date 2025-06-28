package com.appsolution.rifugiodelcuore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class VisiteControllerMVC {
    
    @GetMapping("/visite")
    public String mostraPaginaVisite() {
        return "visite"; // cerca visite.html in templates/
    }
}
