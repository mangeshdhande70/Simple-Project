package com.demo.controller;

import com.demo.entity.Demo;
import com.demo.repo.DemoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/app")
public class DemoController {

    @Autowired
    private DemoRepo repo;

    @GetMapping(value = "/get")
    public List<Demo> get(){
       return repo.findAll();
    }

    @PostMapping(value = "/post")
    public Demo get(@RequestBody Demo demo){
        return repo.save(demo);
    }

}
