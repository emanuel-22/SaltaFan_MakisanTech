package com.makisanTech.saltaFan.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message, Long id) {
        super(message + id);
    }

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
