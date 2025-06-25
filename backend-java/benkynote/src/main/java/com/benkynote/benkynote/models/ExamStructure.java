package com.benkynote.benkynote.models;

import java.util.List;

import org.springframework.data.relational.core.mapping.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JacksonStdImpl;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ExamStructure")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ExamStructure extends Base{
    @Column(nullable = false)
    private String nombreEstructuraExamen;

    @OneToMany(mappedBy = "estructura",cascade = CascadeType.ALL)
    @JsonManagedReference("modifications-structure")
    private List<ExamModification> structureModifications;
}
