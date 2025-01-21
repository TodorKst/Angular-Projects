package com.example.backend.dtos;

public class UserDto {

    private String name;

    public UserDto() {
    }

    public UserDto(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
