package com.example.performance.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;
    private String employeeName;
    private Long managerId;
    private String managerName;

    private String period;
    private int quality;
    private int productivity;
    private int teamwork;
    private String comments;
    private LocalDateTime timestamp = LocalDateTime.now();

    public Evaluation() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
    public String getEmployeeName() { return employeeName; }
    public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }
    public Long getManagerId() { return managerId; }
    public void setManagerId(Long managerId) { this.managerId = managerId; }
    public String getManagerName() { return managerName; }
    public void setManagerName(String managerName) { this.managerName = managerName; }
    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }
    public int getQuality() { return quality; }
    public void setQuality(int quality) { this.quality = quality; }
    public int getProductivity() { return productivity; }
    public void setProductivity(int productivity) { this.productivity = productivity; }
    public int getTeamwork() { return teamwork; }
    public void setTeamwork(int teamwork) { this.teamwork = teamwork; }
    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
package com.example.performance.model;

import jakarta.persistence.*;

@Entity
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long employeeId;
        private String employeeName;
        private Long managerId;
        private String managerName;
        private String period;
        private int quality;
        private int productivity;
        private int teamwork;
        private String comments;
        private LocalDateTime timestamp = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

        public Evaluation(){}

        // Basic getters and setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Long getEmployeeId() { return employeeId; }
        public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
        public String getEmployeeName() { return employeeName; }
        public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }
        public Long getManagerId() { return managerId; }
        public void setManagerId(Long managerId) { this.managerId = managerId; }
        public String getManagerName() { return managerName; }
        public void setManagerName(String managerName) { this.managerName = managerName; }
        public String getPeriod() { return period; }
        public void setPeriod(String period) { this.period = period; }
        public int getQuality() { return quality; }
        public void setQuality(int quality) { this.quality = quality; }
        public int getProductivity() { return productivity; }
        public void setProductivity(int productivity) { this.productivity = productivity; }
        public int getTeamwork() { return teamwork; }
        public void setTeamwork(int teamwork) { this.teamwork = teamwork; }
        public String getComments() { return comments; }
        public void setComments(String comments) { this.comments = comments; }
        public LocalDateTime getTimestamp() { return timestamp; }
        public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}