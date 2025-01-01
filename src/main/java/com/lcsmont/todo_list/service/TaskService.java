package com.lcsmont.todo_list.service;

import com.lcsmont.todo_list.model.Task;
import com.lcsmont.todo_list.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // Method to find all tasks
    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    // Method to find a task by Id
    public Task findById(Long id) {
        Optional<Task> task = taskRepository.findById(id);
        return task.orElse(null);
    }

    // Method to add a new task
    public Task insert(Task task) {
        return taskRepository.save(task);
    }

    // Method to edit a task
    public Task update(Long id, Task task) {
        Task taskEntity = taskRepository.getReferenceById(id);
        updateData(taskEntity, task);
        return taskRepository.save(taskEntity);
    }

    // Method to delete a task
    public void delete(Long id) {
        taskRepository.deleteById(id);
    }

    // Method to Mark a task as complete/incomplete
    public void toggleTaskCompletion(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        task.setDone(!task.isDone());
        taskRepository.save(task);
    }

    // Aux method to update a Task
    public void updateData(Task entity, Task task) {
        entity.setTitle(task.getTitle());
        entity.setDescription(task.getDescription());
    }
}
