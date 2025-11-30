package com.example.performance.service;

import com.example.performance.model.*;
import com.example.performance.repository.*;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ManagerService {
    private final EvaluationRepository evaluationRepo;
    private final GoalRepository goalRepo;
    private final FeedbackRepository feedbackRepo;

    public ManagerService(EvaluationRepository evaluationRepo, GoalRepository goalRepo, FeedbackRepository feedbackRepo) {
        this.evaluationRepo = evaluationRepo;
        this.goalRepo = goalRepo;
        this.feedbackRepo = feedbackRepo;
    }

    public Evaluation saveEvaluation(Evaluation evaluation) { return evaluationRepo.save(evaluation); }
    public List<Evaluation> getAllEvaluations() { return evaluationRepo.findAll(); }
    public List<Evaluation> getEvaluationsForEmployee(Long employeeId) { return evaluationRepo.findByEmployeeId(employeeId); }

    public Goal saveGoal(Goal goal) { return goalRepo.save(goal); }
    public List<Goal> getAllGoals() { return goalRepo.findAll(); }

    public Feedback saveFeedback(Feedback feedback) { return feedbackRepo.save(feedback); }
    public List<Feedback> getAllFeedback() { return feedbackRepo.findAll(); }
}