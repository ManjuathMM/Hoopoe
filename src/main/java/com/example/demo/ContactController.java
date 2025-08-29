package com.example.demo;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class ContactController {

    @Autowired
    private ContactRepository contactRepo;

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/contact")
    public String handleContactForm(@RequestParam String name,
                                    @RequestParam String email,
                                    @RequestParam String subject,
                                    @RequestParam String message,
                                    RedirectAttributes redirectAttributes) {
        // Save to MongoDB
        Contact contact = new Contact(name, email, subject, message);
        contactRepo.save(contact);

        // Send email to admin
        try {
            MimeMessage mail = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mail, true);

            helper.setTo("hoopoebikes@gmail.com");
            helper.setFrom("hoopoebikes@gmail.com");
            helper.setSubject("New Contact Form Submission");
            helper.setText(
                "<h3>New Inquiry Received</h3>" +
                "<div style='background: #f8f9fa; padding: 20px; border-radius: 8px; font-family: Arial, sans-serif;'>" +
                "<p><strong>Name:</strong> " + name + "</p>" +
                "<p><strong>Email:</strong> " + email + "</p>" +
                "<p><strong>Subject:</strong> " + subject + "</p>" +
                "<p><strong>Message:</strong><br>" + message + "</p>" +
                "</div>",
                true
            );

            mailSender.send(mail);
            redirectAttributes.addFlashAttribute("message", "Your message has been sent successfully!");
        } catch (Exception e) {
            System.err.println("Email sending failed: " + e.getMessage());
            e.printStackTrace();
            redirectAttributes.addFlashAttribute("message", "Your message has been saved! We'll get back to you soon.");
        }

        return "redirect:/#contact";
    }
}
