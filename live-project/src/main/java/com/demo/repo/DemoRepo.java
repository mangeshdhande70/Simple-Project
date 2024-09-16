package com.demo.repo;

import com.demo.entity.Demo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DemoRepo extends JpaRepository<Demo, Long> {
}
