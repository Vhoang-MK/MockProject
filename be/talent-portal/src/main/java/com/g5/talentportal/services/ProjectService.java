package com.g5.talentportal.services;

import com.g5.talentportal.dtos.CreateProjectRequest;
import com.g5.talentportal.dtos.ProjectResponse;

public interface ProjectService {

    ProjectResponse createProject(CreateProjectRequest request);
}
