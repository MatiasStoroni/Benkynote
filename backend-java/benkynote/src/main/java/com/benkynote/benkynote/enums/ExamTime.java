package com.benkynote.benkynote.enums;

public enum ExamTime {
    FIFTEEN(15),
    THIRTY(30),
    FORTY_FIVE(45),
    SIXTY(60);

    private final int value;

    ExamTime(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
