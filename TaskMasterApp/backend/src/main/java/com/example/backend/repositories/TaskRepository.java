package com.example.backend.repositories;

import com.example.backend.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findTasksByUserId(Long userId);

    List<Task> findTasksByUserIdAndStatus(Long userId, String status);

}
