package com.example.performance.controller;

import com.example.performance.model.*;
import com.example.performance.repository.EmployeeRepository;
import com.example.performance.service.EmployeeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "*")
public class EmployeeController {
    private final EmployeeService employeeService;
    private final EmployeeRepository employeeRepository;

    public EmployeeController(EmployeeService employeeService, EmployeeRepository employeeRepository) { this.employeeService = employeeService; this.employeeRepository = employeeRepository; }

    @GetMapping("/{id}/evaluations")
    public List<Evaluation> getEvaluations(@PathVariable Long id) { return employeeService.getEvaluations(id); }

    @GetMapping("/{id}/goals")
    public List<Goal> getGoals(@PathVariable Long id) { return employeeService.getGoals(id); }

    @GetMapping("/{id}/feedbacks")
    public List<Feedback> getFeedbacks(@PathVariable Long id) { return employeeService.getFeedback(id); }

    @GetMapping
    public List<Employee> listAll() { return employeeRepository.findAll(); }

    @PostMapping
    public Employee create(@RequestBody Employee employee) { return employeeRepository.save(employee); }

    @PutMapping("/{id}/role")
    public Employee updateRole(@PathVariable Long id, @RequestBody String role) {
        return employeeRepository.findById(id).map(e -> { e.setRole(role); return employeeRepository.save(e); }).orElse(null);
    }
}
