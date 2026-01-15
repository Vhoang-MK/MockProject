package com.g5.talentportal.entities;
 
import com.g5.talentportal.enums.ReportStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
 
import java.time.Instant;
import java.util.Date;
import java.util.Set;
 
@Entity
@Table(name = "daily_reports", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "reportDate", "project_id"})
})
@Getter
@Setter
public class DailyReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;
 
    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date reportDate;
 
    @Lob
    private String content;
 
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReportStatus status = ReportStatus.DRAFT;
 
    @CreationTimestamp
    private Instant createdAt;
 
    @ManyToMany
    @JoinTable(
            name = "report_tasks",
            joinColumns = @JoinColumn(name = "report_id"),
            inverseJoinColumns = @JoinColumn(name = "task_id")
    )
    private Set<Task> tasks;
}
 