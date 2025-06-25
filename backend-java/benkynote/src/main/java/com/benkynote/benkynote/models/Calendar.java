package com.benkynote.benkynote.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Calendar")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Calendar extends Base {

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Event> events = new ArrayList<>();

    

}