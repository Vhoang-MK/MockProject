package com.g5.talentportal.services;

import com.g5.talentportal.dtos.CreateProjectRequest;
import com.g5.talentportal.dtos.ProjectResponse;
import com.g5.talentportal.entities.Project;
import com.g5.talentportal.enums.ProjectStatus;
import com.g5.talentportal.repositories.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;
import java.util.Date;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    public ProjectResponse createProject(CreateProjectRequest request) {

        Project project = new Project();
        project.setName(request.getName());
        project.setDescription(request.getDescription());

        // Convert LocalDate -> Date (startDate)
        if (request.getStartDate() != null) {
            project.setStartDate(
                Date.from(
                    request.getStartDate()
                        .atStartOfDay(ZoneId.systemDefault())
                        .toInstant()
                )
            );
        }

        // Convert LocalDate -> Date (endDate)
        if (request.getEndDate() != null) {
            project.setEndDate(
                Date.from(
                    request.getEndDate()
                        .atStartOfDay(ZoneId.systemDefault())
                        .toInstant()
                )
            );
        }

        // Set default status if null
        project.setStatus(
            request.getStatus() != null
                ? request.getStatus()
                : ProjectStatus.ACTIVE
        );

        Project savedProject = projectRepository.save(project);
        return mapToResponse(savedProject);
    }

    private ProjectResponse mapToResponse(Project project) {
        ProjectResponse response = new ProjectResponse();
        response.setId(project.getId());
        response.setName(project.getName());
        response.setDescription(project.getDescription());
        response.setStartDate(
            project.getStartDate() != null
                ? project.getStartDate()
                    .toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate()
                : null
        );
        response.setEndDate(
            project.getEndDate() != null
                ? project.getEndDate()
                    .toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate()
                : null
        );
        response.setStatus(project.getStatus());
        response.setCreatedAt(project.getCreatedAt());
        response.setUpdatedAt(project.getUpdatedAt());
        return response;
    }
}
