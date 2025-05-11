package com.example.emojihub.model;

public class Emoji {
    private String name;
    private String category;
    private String[] htmlCode;

    // Геттеры и сеттеры
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String[] getHtmlCode() {
        return htmlCode;
    }

    public void setHtmlCode(String[] htmlCode) {
        this.htmlCode = htmlCode;
    }
}
