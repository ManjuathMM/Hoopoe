package com.example.demo;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.Map;

@Controller
public class PreorderController {

    @Autowired
    private PreorderRepository preorderRepo;

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/preorder")
    @ResponseBody
    public ResponseEntity<Map<String, String>> handlePreorderForm(@RequestBody Map<String, Object> payload) {
        try {
            // Extract data from payload
            String name = (String) payload.get("name");
            String phone = (String) payload.get("phone");
            String email = (String) payload.get("email");
            String address = (String) payload.get("city");
            String model = (String) payload.get("model");
            Double amount = payload.get("amount") != null ? 
                Double.valueOf(payload.get("amount").toString()) : 500.0;

            // Save to MongoDB
            Preorder preorder = new Preorder(name, phone, email, address, model, amount);
            preorderRepo.save(preorder);

            // Send email to admin
            try {
                MimeMessage mail = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mail, true);

                helper.setTo("hoopoebikes@gmail.com");
                helper.setFrom("hoopoebikes@gmail.com");
                helper.setSubject("New Preorder Submission - " + model);
                helper.setText(
                    "<h3>New Preorder Received</h3>" +
                    "<div style='background: #f8f9fa; padding: 20px; border-radius: 8px; font-family: Arial, sans-serif;'>" +
                    "<h4 style='color: #2563eb; margin-bottom: 15px;'>Customer Details:</h4>" +
                    "<p><strong>Name:</strong> " + name + "</p>" +
                    "<p><strong>Phone:</strong> " + phone + "</p>" +
                    "<p><strong>Email:</strong> " + email + "</p>" +
                    "<p><strong>Address:</strong> " + address + "</p>" +
                    "<p><strong>Model Selected:</strong> " + model + "</p>" +
                    "<p><strong>Preorder Amount:</strong> ₹" + amount + "</p>" +
                    "<p><strong>Submitted At:</strong> " + preorder.getCreatedAt() + "</p>" +
                    "</div>" +
                    "<br><p style='color: #666;'>Please follow up with the customer for payment processing.</p>",
                    true
                );

                mailSender.send(mail);
                
                return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "Preorder submitted successfully! We'll contact you soon."
                ));
                
            } catch (Exception e) {
                System.err.println("Email sending failed: " + e.getMessage());
                e.printStackTrace();
                return ResponseEntity.ok(Map.of(
                    "status", "partial_success",
                    "message", "Preorder saved! We'll contact you soon."
                ));
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(
                    "status", "error",
                    "message", "Failed to process preorder. Please try again."
                ));
        }
    }
}
