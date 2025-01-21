package com.example.backend.controllers;

import com.example.backend.dtos.TaskDto;
import com.example.backend.models.Task;
import com.example.backend.models.User;
import com.example.backend.services.TaskService;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;

    @Autowired
    public TaskController(TaskService taskService,
                          UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    @GetMapping()
    List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    Task getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @PostMapping()
    Task createTask(@RequestBody TaskDto taskDto) {
        User user = userService.getUserById(taskDto.getUserId());
        Task task = new Task();
        task.setUser(user);
        task.setDescription(taskDto.getDescription());
        task.setDueDate(taskDto.getDueDate());
        task.setStatus("Open");
        task.setTitle(taskDto.getTitle());

        return taskService.createTask(task);
    }

    @PutMapping()
    Task updateTask(Task task) {
        return taskService.updateTask(task);
    }

    @DeleteMapping("/{id}")
    void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

}
