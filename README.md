# Hoopoe E-Bikes - Cloud Deployment Guide

## Overview
This Spring Boot application serves the Hoopoe E-Bikes website with contact forms, preorder functionality, and email notifications.

## Local Development
```bash
mvn spring-boot:run
```
Access at: http://localhost:8080

## Cloud Deployment Options

### 1. Render (Recommended)
1. Push code to GitHub repository
2. Connect Render to your GitHub repo
3. Use the included `render.yaml` configuration
4. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `MAIL_PASSWORD`: Your Gmail app password

### 2. Railway
1. Push code to GitHub
2. Connect Railway to your repo
3. Railway will auto-detect the `railway.json` config
4. Set environment variables in Railway dashboard

### 3. Heroku
```bash
# Install Heroku CLI, then:
heroku create hoopoe-ebikes
heroku config:set MONGODB_URI="your-mongodb-atlas-uri"
heroku config:set MAIL_PASSWORD="your-gmail-app-password"
git push heroku main
```

## Required Environment Variables
- `MONGODB_URI`: MongoDB connection string (use MongoDB Atlas for cloud)
- `MAIL_PASSWORD`: Gmail app password for email functionality
- `MAIL_USERNAME`: Gmail address (defaults to hoopoebikes@gmail.com)

## Database Setup
For cloud deployment, use MongoDB Atlas:
1. Create free cluster at https://cloud.mongodb.com
2. Get connection string
3. Set as `MONGODB_URI` environment variable

## Features
- ✅ Contact form with email notifications
- ✅ E-bike preorder system
- ✅ Responsive green-themed UI
- ✅ MongoDB data persistence
- ✅ Email integration with Gmail SMTP

## Tech Stack
- Spring Boot 3.2.5
- Java 21
- Thymeleaf templates
- MongoDB
- Gmail SMTP
- Maven build system
