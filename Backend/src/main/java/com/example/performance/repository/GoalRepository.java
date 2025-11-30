package com.example.performance.repository;

import com.example.performance.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
    // Custom query: find goals by employee
    List<Goal> findByEmployeeId(Long employeeId);
}