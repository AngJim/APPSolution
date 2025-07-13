package com.appsolution.rifugiodelcuore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PaginaVeterinariController {

    /** restituisce il template "veterinari.html" */
    @GetMapping("/veterinari")
    public String showVeterinariPage() {
        return "veterinari";   // senza .html
    }
}