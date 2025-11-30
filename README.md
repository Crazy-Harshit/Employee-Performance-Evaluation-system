 Employee Performance Evaluation System — Full Stack Project

A full-stack system for managing employee performance, evaluations, goals, and feedback.
The platform is designed for Managers, Employees, and Admins.

✔ Backend: Spring Boot (Java + JPA)
✔ Frontend: React + Vite
✔ Database: MySQL / PostgreSQL

 Features
 Manager Features

Create employee evaluations

Add comments & feedback

Assign & track goals

View performance reports

 Employee Features

View evaluations

Track assigned goals

View manager feedback

 Admin Features

Manage users

Monitor system analytics

Generate reports

📂 Project Structure
Employee-Performance-Evaluation-System/
│
├── Backend/ (Spring Boot)
│   ├── src/main/java/com/example/performance/
│   │   ├── controller/
│   │   │   ├── ManagerController.java
│   │   │   ├── EmployeeController.java
│   │   ├── service/
│   │   │   ├── ManagerService.java
│   │   │   ├── EmployeeService.java
│   │   ├── model/
│   │   │   ├── Employee.java
│   │   │   ├── Evaluation.java
│   │   │   ├── Goal.java
│   │   │   ├── Feedback.java
│   │   ├── repository/
│   │   │   ├── EmployeeRepository.java
│   │   │   ├── EvaluationRepository.java
│   │   │   ├── GoalRepository.java
│   │   │   ├── FeedbackRepository.java
│   ├── application.properties
│   ├── PerformanceSystemApplication.java
│
├── Frontend/ (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   ├── public/
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│
└── README.md  (this file)
