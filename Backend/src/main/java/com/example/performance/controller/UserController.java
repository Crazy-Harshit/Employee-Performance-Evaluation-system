package com.example.performance.controller;

import com.example.performance.model.Employee;
import com.example.performance.repository.EmployeeRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    private final EmployeeRepository repo;
    public UserController(EmployeeRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Employee> list() { return repo.findAll(); }

    @PostMapping
    public Employee create(@RequestBody Employee e) { return repo.save(e); }

    @PutMapping("/{id}/role")
    public Employee assignRole(@PathVariable Long id, @RequestBody String role) {
        return repo.findById(id).map(u -> { u.setRole(role); return repo.save(u); }).orElse(null);
    }
}
