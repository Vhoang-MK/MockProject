package com.g5.talentportal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g5.talentportal.entities.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
}
