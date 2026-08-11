// =========================================================
// CareerForge AI — Home Header JavaScript
// =========================================================

document.addEventListener("DOMContentLoaded", function () {


const mobileMenuBtn =
    document.getElementById("homeMobileMenuBtn");

const mobileMenu =
    document.getElementById("homeMobileMenu");

if (!mobileMenuBtn || !mobileMenu) {
    return;
}

// Toggle mobile menu
mobileMenuBtn.addEventListener("click", function () {

    mobileMenu.classList.toggle("active");

});

// Close mobile menu after clicking navigation link
const mobileLinks =
    mobileMenu.querySelectorAll("a");

mobileLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        mobileMenu.classList.remove("active");

    });

});

// Close mobile menu when clicking outside
document.addEventListener("click", function (event) {

    const clickedInsideMenu =
        mobileMenu.contains(event.target);

    const clickedButton =
        mobileMenuBtn.contains(event.target);

    if (!clickedInsideMenu && !clickedButton) {

        mobileMenu.classList.remove("active");

    }

});


});
