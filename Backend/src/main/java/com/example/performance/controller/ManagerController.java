package com.example.performance.controller;

import com.example.performance.model.*;
import com.example.performance.service.ManagerService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ManagerController {
    private final ManagerService managerService;

    public ManagerController(ManagerService managerService) { this.managerService = managerService; }

    @PostMapping("/manager/evaluate")
    public Evaluation evaluateEmployee(@RequestBody Evaluation evaluation) {
        return managerService.saveEvaluation(evaluation);
    }

    @GetMapping("/manager/evaluations")
    public List<Evaluation> getEvaluations() { return managerService.getAllEvaluations(); }

    @PostMapping("/evaluations")
    public Evaluation createEvaluation(@RequestBody Evaluation evaluation) { return managerService.saveEvaluation(evaluation); }

    @GetMapping("/evaluations")
    public List<Evaluation> listEvaluations() { return managerService.getAllEvaluations(); }

    @GetMapping("/evaluations/employee/{id}")
    public List<Evaluation> listByEmployee(@PathVariable Long id) { return managerService.getEvaluationsForEmployee(id); }

    @PostMapping("/manager/goal")
    public Goal setGoal(@RequestBody Goal goal) { return managerService.saveGoal(goal); }

    @GetMapping("/manager/goals")
    public List<Goal> getGoals() { return managerService.getAllGoals(); }

    @PostMapping("/goals")
    public Goal createGoal(@RequestBody Goal goal) { return managerService.saveGoal(goal); }

    @GetMapping("/goals")
    public List<Goal> listGoals() { return managerService.getAllGoals(); }

    @PostMapping("/manager/feedback")
    public Feedback giveFeedback(@RequestBody Feedback feedback) { return managerService.saveFeedback(feedback); }

    @GetMapping("/manager/feedbacks")
    public List<Feedback> getFeedbacks() { return managerService.getAllFeedback(); }

    @PostMapping("/feedbacks")
    public Feedback createFeedback(@RequestBody Feedback feedback) { return managerService.saveFeedback(feedback); }

    @GetMapping("/feedbacks")
    public List<Feedback> listFeedbacks() { return managerService.getAllFeedback(); }
}