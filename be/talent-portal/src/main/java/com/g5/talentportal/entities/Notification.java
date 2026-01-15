package com.g5.talentportal.entities;
 
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
 
import java.time.Instant;
 
@Entity
@Table(name = "notifications")
@Getter
@Setter
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipient_id", nullable = false)
    private User recipient;
 
    @Column(nullable = false)
    private String content;
 
    private boolean isRead = false;
 
    private String linkToResource;
 
    @CreationTimestamp
    private Instant createdAt;
}
 