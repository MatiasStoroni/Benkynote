package com.benkynote.benkynote;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.benkynote.benkynote.repositories")
public class BenkynoteApplication {
	public static void main(String[] args) {
		SpringApplication.run(BenkynoteApplication.class, args);
	}

}


