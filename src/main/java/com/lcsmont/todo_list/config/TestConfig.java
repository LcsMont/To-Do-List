package com.lcsmont.todo_list.config;

import com.lcsmont.todo_list.model.Task;
import com.lcsmont.todo_list.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class TestConfig implements CommandLineRunner {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public void run(String... args) throws Exception {

        taskRepository.deleteAll();

        Task t1 = new Task(null, "Read a book", "Try to read at least 5 pages in a book", false);
        Task t2 = new Task(null, "Run", "Run 5 km in one hour", false);
        Task t3 = new Task(null, "Study for Math test", "Review and do exercises", false);

        taskRepository.saveAll(Arrays.asList(t1, t2, t3));

    }
}
