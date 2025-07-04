package com.appsolution.rifugiodelcuore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminControllerMVC {
    
    @GetMapping("/admin")
    public String mostraPaginaAdmin() {
        return "admin";
    }
}