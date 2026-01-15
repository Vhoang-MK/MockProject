package com.g5.talentportal.entities;
 
import com.g5.talentportal.enums.EvaluationSessionStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
 
import java.time.Instant;
import java.util.Date;
import java.util.Set;
 
@Entity
@Table(name = "evaluation_sessions")
@Getter
@Setter
public class EvaluationSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @Column(nullable = false)
    private String name;
 
    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date startDate;
 
    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date endDate;
 
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EvaluationSessionStatus status = EvaluationSessionStatus.PENDING;
 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;
 
    @CreationTimestamp
    private Instant createdAt;
 
    @ManyToMany
    @JoinTable(
            name = "session_criteria",
            joinColumns = @JoinColumn(name = "session_id"),
            inverseJoinColumns = @JoinColumn(name = "criteria_id")
    )
    private Set<EvaluationCriteria> criteria;
}
 