package com.g5.talentportal.entities;
 
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
 
import java.time.Instant;
 
@Entity
@Table(name = "activity_logs")
@Getter
@Setter
public class ActivityLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
 
    @Column(length = 100, nullable = false)
    private String actionType;
 
    @Column(length = 100)
    private String targetEntity;
 
    private Long targetId;
 
    @Lob
    private String details;
 
    @CreationTimestamp
    @Column(name = "timestamp")
    private Instant timestamp;
}
 