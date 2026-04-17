package com.indro.example.ecomerce_security_api;

import com.indro.example.ecomerce_security_api.role.Role;
import com.indro.example.ecomerce_security_api.role.RoleRepository;
import com.indro.example.ecomerce_security_api.user.User;
import com.indro.example.ecomerce_security_api.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@SpringBootApplication
public class EcomerceSecurityUiApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcomerceSecurityUiApplication.class, args);
	}

	/*@Bean
	public CommandLineRunner runner(RoleRepository roleRepository) {
		return args -> {
			if (roleRepository.findByName("USER").isEmpty()) {
				roleRepository.save(Role.builder().name("USER").build());
			}
		};
	}*/

	@Bean
	public CommandLineRunner seedUser(
			UserRepository userRepository,
			RoleRepository roleRepository,
			PasswordEncoder passwordEncoder
	) {
		return args -> {

			// ✅ Ensure roles exist
			Role customerRole = roleRepository.findByName("ROLE_CUSTOMER")
					.orElseGet(() ->
							roleRepository.save(
									Role.builder().name("ROLE_CUSTOMER").build()
							)
					);

			Role adminRole = roleRepository.findByName("ROLE_ADMIN")
					.orElseGet(() ->
							roleRepository.save(
									Role.builder().name("ROLE_ADMIN").build()
							)
					);

			// ✅ Admin user (optional, keep if needed)
			if (userRepository.findByEmail("admin@test.com").isEmpty()) {

				User admin = User.builder()
						.firstname("Admin")
						.lastname("User")
						.email("admin@test.com")
						.password(passwordEncoder.encode("password123"))
						.enabled(true)
						.accountLocked(false)
						.roles(List.of(adminRole))
						.build();

				userRepository.save(admin);
			}

			// ✅ Customer user (UPDATED)
			if (userRepository.findByEmail("chakraborty.indranil@gmail.com").isEmpty()) {

				User customer = User.builder()
						.firstname("Indranil")
						.lastname("Chakraborty")
						.email("chakraborty.indranil@gmail.com")
						.password(passwordEncoder.encode("darga@786")) // 🔐 encoded
						.enabled(true)
						.accountLocked(false)
						.roles(List.of(customerRole))
						.build();

				userRepository.save(customer);
			}
		};
	}

}
