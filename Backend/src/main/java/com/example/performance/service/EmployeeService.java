package com.example.performance.service;

import com.example.performance.model.*;
import com.example.performance.repository.*;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeeService {
    private final EvaluationRepository evaluationRepo;
    private final GoalRepository goalRepo;
    private final FeedbackRepository feedbackRepo;

    public EmployeeService(EvaluationRepository evaluationRepo, GoalRepository goalRepo, FeedbackRepository feedbackRepo) {
        this.evaluationRepo = evaluationRepo;
        this.goalRepo = goalRepo;
        this.feedbackRepo = feedbackRepo;
    }

    public List<Evaluation> getEvaluations(Long employeeId) { return evaluationRepo.findByEmployeeId(employeeId); }
    public List<Goal> getGoals(Long employeeId) { return goalRepo.findByEmployeeId(employeeId); }
    public List<Feedback> getFeedback(Long employeeId) { return feedbackRepo.findByEmployeeId(employeeId); }
}