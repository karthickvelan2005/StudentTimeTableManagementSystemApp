package com.examly.springapp.model;

import javax.persistence.*;
@Entity
@Table(name="schedule")
public class ScheduleEntry {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) 
  @Column(name = "id")
  private Long id;

  @Column(name = "class_name", nullable = false)
  private String className;

  @Column(name = "subject", nullable = false)
  private String subject;

  @Column(name = "teacher_name")
  private String teacherName;

  @Column(name = "day_of_week")
  private String dayOfWeek;

  @Column(name = "start_time")
  private String startTime;

  @Column(name = "end_time")
  private String endTime;

  @Column(name = "attendance_note")
  private String attendanceNote;
  public ScheduleEntry() {
  }
  public ScheduleEntry(Long id, String className, String subject, String teacherName, 
             String dayOfWeek, String startTime, String endTime, String attendanceNote) {
    this.id = id;
    this.className = className;
    this.subject = subject;
    this.teacherName = teacherName;
    this.dayOfWeek = dayOfWeek;
    this.startTime = startTime;
    this.endTime = endTime;
    this.attendanceNote = attendanceNote;
  }
  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }

  public String getClassName() {
    return className;
  }
  public void setClassName(String className) {
    this.className = className;
  }

  public String getSubject() {
    return subject;
  }
  public void setSubject(String subject) {
    this.subject = subject;
  }

  public String getTeacherName() {
    return teacherName;
  }
  public void setTeacherName(String teacherName) {
    this.teacherName = teacherName;
  }

  public String getDayOfWeek() {
    return dayOfWeek;
  }
  public void setDayOfWeek(String dayOfWeek) {
    this.dayOfWeek = dayOfWeek;
  }

  public String getStartTime() {
    return startTime;
  }
  public void setStartTime(String startTime) {
    this.startTime = startTime;
  }

  public String getEndTime() {
    return endTime;
  }
  public void setEndTime(String endTime) {
    this.endTime = endTime;
  }

  public String getAttendanceNote() {
    return attendanceNote;
  }
  public void setAttendanceNote(String attendanceNote) {
    this.attendanceNote = attendanceNote;
  }
}

