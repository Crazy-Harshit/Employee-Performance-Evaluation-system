package com.example.performance.repository;

import com.example.performance.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    // Custom query: find feedback by employee
    List<Feedback> findByEmployeeId(Long employeeId);
}