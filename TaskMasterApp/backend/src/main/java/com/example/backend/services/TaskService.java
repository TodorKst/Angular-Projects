package com.example.backend.services;

import com.example.backend.models.Task;
import com.example.backend.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    public List<Task> getTaskForUser(Long userId) {
        try {
            return taskRepository.findTasksByUserId(userId);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public List<Task> getTaskForUserAndStatus(Long userId, String status) {
        if (status == null) {
            return getTaskForUser(userId);
        }
        try {
            return taskRepository.findTasksByUserIdAndStatus(userId, status);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTaskStatus(Long taskId) {
        Task taskToUpdate = taskRepository.findById(taskId).orElse(null);
        if (taskToUpdate == null) {
            throw new RuntimeException("Task not found");
        }
        if (taskToUpdate.getStatus().equals("Open")) {
            taskToUpdate.setStatus("In Progress");
        } else if (taskToUpdate.getStatus().equals("In Progress")) {
            taskToUpdate.setStatus("Completed");
        }
        return taskRepository.save(taskToUpdate);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }


}
