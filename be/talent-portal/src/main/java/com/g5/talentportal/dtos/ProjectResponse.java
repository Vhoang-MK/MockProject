package com.g5.talentportal.dtos;

import java.time.Instant;
import java.time.LocalDate;

import com.g5.talentportal.enums.ProjectStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectResponse {

    private Long id;

    private String name;

    private String description;

    private LocalDate startDate;

    private LocalDate endDate;

    private ProjectStatus status;

    private Instant createdAt;

    private Instant updatedAt;
}
