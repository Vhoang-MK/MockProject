package com.g5.talentportal.entities;
 
import com.g5.talentportal.enums.EvaluationParticipantStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;
 
@Entity
@Table(name = "evaluation_participants", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"session_id", "evaluatee_id"})
})
@Getter
@Setter
public class EvaluationParticipant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private EvaluationSession session;
 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "evaluatee_id", nullable = false)
    private User evaluatee; // User being evaluated
 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "evaluator_id", nullable = false)
    private User evaluator; // User doing the evaluation
 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "delegated_to_user_id")
    private User delegatedToUser; // User to whom evaluation is delegated
 
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EvaluationParticipantStatus status = EvaluationParticipantStatus.PENDING;
}
 