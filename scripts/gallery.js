document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".category-btn");
    const groups = document.querySelectorAll(".image-group");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            buttons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            groups.forEach(group => group.classList.remove("active"));
            document.querySelector(`.${this.dataset.category}`).classList.add("active");
        });
    });
});