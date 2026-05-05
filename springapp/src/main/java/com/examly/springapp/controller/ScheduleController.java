package com.examly.springapp.controller;

import com.examly.springapp.model.ScheduleEntry;
import com.examly.springapp.service.ScheduleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

// @CrossOrigin(origins = "http://localhost:8081", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @PostMapping("/add")
    public ResponseEntity<ScheduleEntry> addSchedule(@RequestBody ScheduleEntry scheduleEntry) {
        ScheduleEntry saved = scheduleService.createSchedule(scheduleEntry);
        return new ResponseEntity<>(saved, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<Page<ScheduleEntry>> getAllSchedules(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<ScheduleEntry> schedulePage = scheduleService.getAllSchedules(pageable);
        return new ResponseEntity<>(schedulePage, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScheduleEntry> getScheduleById(@PathVariable Long id) {
        ScheduleEntry schedule = scheduleService.getScheduleById(id);
        return new ResponseEntity<>(schedule, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ScheduleEntry> updateSchedule(@PathVariable Long id, @RequestBody ScheduleEntry updatedSchedule) {
        ScheduleEntry schedule = scheduleService.updateSchedule(id, updatedSchedule);
        return new ResponseEntity<>(schedule, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}