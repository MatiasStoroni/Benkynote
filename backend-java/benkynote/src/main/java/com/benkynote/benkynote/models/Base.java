package com.benkynote.benkynote.models;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Base implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY )
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column( updatable = false)
    private Date fechaAlta;

    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaBaja;

    @PrePersist
    public void onCreate() {
        fechaAlta = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        // Si deseas actualizar la fecha de alta o realizar alguna lógica al actualizar
    }

    public void markAsDeleted() {
        this.fechaBaja = new Date();
    }

}