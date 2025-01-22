package com.example.backend.controllers;

import com.example.backend.dtos.UserDto;
import com.example.backend.models.Task;
import com.example.backend.models.User;
import com.example.backend.services.TaskService;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final TaskService taskService;

    @Autowired
    public UserController(UserService userService,
                          TaskService taskService) {
        this.userService = userService;
        this.taskService = taskService;
    }

    @GetMapping()
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping()
    public User createUser(@RequestBody UserDto userDto) {
        String name = userDto.getName();
        return userService.createUser(name);
    }

    @GetMapping("/{userId}/tasks")
    List<Task> getTaskForUser(@PathVariable Long userId, @RequestParam(required = false) String filter) {
        return taskService.getTaskForUserAndStatus(userId, filter);
    }
}
