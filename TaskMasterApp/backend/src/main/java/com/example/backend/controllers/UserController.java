package com.example.backend.controllers;

import com.example.backend.dtos.UserDto;
import com.example.backend.models.User;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping()
    public User createUser(@RequestBody UserDto userDto) {
        String name = userDto.getName();
        System.out.println(name);
        return userService.createUser(name);
    }
}
