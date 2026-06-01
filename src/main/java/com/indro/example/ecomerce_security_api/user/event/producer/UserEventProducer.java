package com.indro.example.ecomerce_security_api.user.event.producer;


import com.indro.example.ecomerce_security_api.user.event.UserCreatedEvent;

import com.indro.example.ecomerce_security_api.user.event.topic.KafkaTopics;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserEventProducer {

    private final KafkaTemplate<String, UserCreatedEvent> kafkaTemplate;

    public void publishUserCreatedEvent(UserCreatedEvent event) {

        log.info(
                "Publishing USER_CREATED event for userId={}",
                event.getUserId()
        );

        kafkaTemplate.send(
                KafkaTopics.USER_CREATED,
                event.getUserId(),
                event
        );
    }
}