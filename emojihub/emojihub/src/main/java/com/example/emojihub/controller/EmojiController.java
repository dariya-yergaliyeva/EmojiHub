package com.example.emojihub.controller;

import com.example.emojihub.model.Emoji;
import com.example.emojihub.service.EmojiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")  // чтобы frontend мог подключиться
public class EmojiController {

    @Autowired
    private EmojiService emojiService;

    @GetMapping("/api/emojis")
    public List<Emoji> getEmojis(@RequestParam(required = false) String search) {
        List<Emoji> all = emojiService.fetchEmojis();
        if (search != null && !search.isEmpty()) {
            return all.stream()
                    .filter(e -> e.getName().toLowerCase().contains(search.toLowerCase()))
                    .collect(Collectors.toList());
        }
        return all;
    }
}
