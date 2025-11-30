package com.example.performance.repository;

import com.example.performance.model.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    // Custom query: find evaluations by employee
    List<Evaluation> findByEmployeeId(Long employeeId);
}