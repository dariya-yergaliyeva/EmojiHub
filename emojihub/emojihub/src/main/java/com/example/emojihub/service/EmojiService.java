package com.example.emojihub.service;

import com.example.emojihub.model.Emoji;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class EmojiService {
    private final String API_URL = "https://emojihub.yurace.pro/api/all";

    public List<Emoji> fetchEmojis() {
        RestTemplate restTemplate = new RestTemplate();
        Emoji[] response = restTemplate.getForObject(API_URL, Emoji[].class);
        return Arrays.asList(response);
    }
}
