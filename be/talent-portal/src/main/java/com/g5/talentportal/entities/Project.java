package com.g5.talentportal.entities;
 
import java.time.Instant;
import java.util.Date;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.g5.talentportal.enums.ProjectStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;
 
@Entity
@Table(name = "projects")
@Getter
@Setter
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @Column(length = 150, nullable = false)
    private String name;
 
    @Lob
    private String description;
 
    @Temporal(TemporalType.DATE)
    private Date startDate;
 
    @Temporal(TemporalType.DATE)
    private Date endDate;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectStatus status;

 
    @CreationTimestamp
    private Instant createdAt;
 
    @UpdateTimestamp
    private Instant updatedAt;
 
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProjectMember> members;
}
 