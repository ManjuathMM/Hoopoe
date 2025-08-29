package com.example.demo;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    

    // Home page
    @GetMapping("/")
    public String showHomePage(HttpSession session, Model model) {
        model.addAttribute("user", session.getAttribute("user")); // Pass user to index.html
        return "index";
    }

    
    // Urban Model Page
    @GetMapping("/model-urban")
    public String modelUrban() {
        return "model-urban";
    }

    // Performance Model Page
    @GetMapping("/model-performance")
    public String modelPerformance() {
        return "model-performance";
    }

    // Explorer Model Page
    @GetMapping("/model-explorer")
    public String modelExplorer() {
        return "model-explorer";
    }

    // Preorder Page
    @GetMapping("/preorder")
    public String preorder(String model, String price, Model modelMap) {
        modelMap.addAttribute("selectedModel", model);
        modelMap.addAttribute("selectedPrice", price);
        return "preorder";
    }
}
