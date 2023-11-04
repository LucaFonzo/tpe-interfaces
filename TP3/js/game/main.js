document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
    const radiosType = document.querySelectorAll(".start .radio");
    radiosType.forEach((radio) => {
        radio.addEventListener("click", (e) => {
            radiosType.forEach((radio) => {
                radio.classList.remove("checked");
            });
            radio.classList.add("checked");
        });
    });

    const backgrounds = document.querySelectorAll(".start .settings #background img");
    backgrounds.forEach((background) => {
        background.addEventListener("click", (e) => {
            backgrounds.forEach((background) => {
                background.classList.remove("selected");
            });
            background.classList.add("selected");
        });
    });

    const colorsP1 = document.querySelectorAll(".start .p1 .color-select span");
    colorsP1.forEach((color) => {
        color.addEventListener("click", (e) => {
            if(color.classList.contains("disabled")) return;

            colorsP1.forEach((color1) => {
                color1.classList.remove("selected");
            });

            color.classList.add("selected");

            colorsP2.forEach((color2) => {
                color2.classList.remove("disabled");
                if(color2.getAttribute('value') == color.getAttribute('value')) {
                    color2.classList.add("disabled");
                }
            });

            charsP1.forEach((char1) => {
                char1.setAttribute('value', color.getAttribute('value'));
            });
        });
    });

    const colorsP2 = document.querySelectorAll(".start .p2 .color-select span");
    colorsP2.forEach((color) => {
        color.addEventListener("click", (e) => {
            if(color.classList.contains("disabled")) return;

            colorsP2.forEach((color2) => {
                color2.classList.remove("selected");
            });

            color.classList.add("selected");

            colorsP1.forEach((color1) => {
                color1.classList.remove("disabled");
                if(color1.getAttribute('value') == color.getAttribute('value')) {
                    color1.classList.add("disabled");
                }
            });

            charsP2.forEach((char2) => {
                char2.setAttribute('value', color.getAttribute('value'));
            });
        });
    });

    const charsP1 = document.querySelectorAll(".start .p1 .char-select span");
    charsP1.forEach((char) => {
        char.addEventListener("click", (e) => {
            if(char.classList.contains("disabled")) return;

            charsP1.forEach((char1) => {
                char1.classList.remove("selected");
            });

            char.classList.add("selected");

            charsP2.forEach((char2) => {
                char2.classList.remove("disabled");
                if(char2.getAttribute('character') == char.getAttribute('character')) {
                    char2.classList.add("disabled");
                }
            });
        });
    });

    const charsP2 = document.querySelectorAll(".start .p2 .char-select span");
    charsP2.forEach((char) => {
        char.addEventListener("click", (e) => {
            if(char.classList.contains("disabled")) return;

            charsP2.forEach((char2) => {
                char2.classList.remove("selected");
            });

            char.classList.add("selected");

            charsP1.forEach((char1) => {
                char1.classList.remove("disabled");
                if(char1.getAttribute('character') == char.getAttribute('character')) {
                    char1.classList.add("disabled");
                }
            });
        });
    });
}