// package com.examly.springapp.service;

// import com.examly.springapp.model.ScheduleEntry;
// import com.examly.springapp.repository.ScheduleRepository;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.stereotype.Service;
// import org.springframework.web.server.ResponseStatusException;

// import java.util.List;

// @Service
// public class ScheduleService {

//     @Autowired
//     private ScheduleRepository scheduleRepository;

//     // Create a new schedule
//     public ScheduleEntry createSchedule(ScheduleEntry entry) {
//         return scheduleRepository.save(entry);
//     }

//     // Get all schedules
//     public List<ScheduleEntry> getAllSchedules() {
//         return scheduleRepository.findAll();
//     }
//     public ScheduleEntry getScheduleById(Long id) {
//         return scheduleRepository.findById(id)
//                 .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Schedule not found"));
//     }
//     public ScheduleEntry updateSchedule(Long id, ScheduleEntry entry) {
//         return scheduleRepository.findById(id).map(existing -> {
//             existing.setClassName(entry.getClassName());
//             existing.setSubject(entry.getSubject());
//             existing.setTeacherName(entry.getTeacherName());
//             existing.setDayOfWeek(entry.getDayOfWeek());
//             existing.setStartTime(entry.getStartTime());
//             existing.setEndTime(entry.getEndTime());
//             existing.setAttendanceNote(entry.getAttendanceNote());
//             return scheduleRepository.save(existing);
//         }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Schedule not found"));
//     }

//     // Delete schedule by ID
//     public void deleteSchedule(Long id) {
//         if (!scheduleRepository.existsById(id)) {
//             throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Schedule not found");
//         }
//         scheduleRepository.deleteById(id);
//     }
// }


package com.examly.springapp.service;

import com.examly.springapp.model.ScheduleEntry;
import com.examly.springapp.repository.ScheduleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    public ScheduleEntry createSchedule(ScheduleEntry entry) {
        return scheduleRepository.save(entry);
    }

    public List<ScheduleEntry> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    public Page<ScheduleEntry> getAllSchedules(Pageable pageable) {
        return scheduleRepository.findAll(pageable);
    }

    public ScheduleEntry getScheduleById(Long id) {
        return scheduleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Schedule not found"));
    }

    public ScheduleEntry updateSchedule(Long id, ScheduleEntry entry) {
        return scheduleRepository.findById(id).map(existing -> {
            existing.setClassName(entry.getClassName());
            existing.setSubject(entry.getSubject());
            existing.setTeacherName(entry.getTeacherName());
            existing.setDayOfWeek(entry.getDayOfWeek());
            existing.setStartTime(entry.getStartTime());
            existing.setEndTime(entry.getEndTime());
            existing.setAttendanceNote(entry.getAttendanceNote());
            return scheduleRepository.save(existing);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Schedule not found"));
    }

    public void deleteSchedule(Long id) {
        if (!scheduleRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Schedule not found");
        }
        scheduleRepository.deleteById(id);
    }
}