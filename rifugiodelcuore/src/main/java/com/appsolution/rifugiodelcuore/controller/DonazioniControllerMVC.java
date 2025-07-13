package com.appsolution.rifugiodelcuore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DonazioniControllerMVC {

	@GetMapping("/donazioni")
	public String mostraDonazioni() {
		return "donazioni";
	}
}
