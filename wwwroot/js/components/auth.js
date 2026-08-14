document.addEventListener("DOMContentLoaded", () => {
    const authModal = document.getElementById("authModal");
    const authBackdrop = document.getElementById("authBackdrop");
    const authDialog = document.getElementById("authDialog");
    const authClose = document.getElementById("authClose");

    const authSwitch = document.getElementById("authSwitch");
    const authForm = document.getElementById("authForm");

    const authTitle = document.getElementById("authTitle");
    const authSubtitle = document.getElementById("authSubtitle");

    const nameField = document.getElementById("nameField");
    const authName = document.getElementById("authName");

    const forgotPassword = document.getElementById("forgotPassword");

    const authSubmit = document.getElementById("authSubmit");
    const submitText = document.getElementById("submitText");
    const submitLoader = document.getElementById("submitLoader");

    const switchText = document.getElementById("switchText");
    const termsText = document.getElementById("termsText");

    const passwordInput = document.getElementById("authPassword");
    const togglePassword = document.getElementById("togglePassword");

    const passwordStrength = document.getElementById("passwordStrength");
    const strengthText = document.getElementById("strengthText");

    if (!authModal) {
        console.error("Auth modal not found.");
        return;
    }

    let authMode = "login";


    // ================================
    // OPEN MODAL
    // ================================

    function openAuthModal(mode = "login") {
        authMode = mode;

        updateAuthMode();

        authModal.classList.remove("hidden");
        authModal.setAttribute("aria-hidden", "false");

        document.body.classList.add("overflow-hidden");

        setTimeout(() => {
            if (authMode === "login") {
                document.getElementById("authEmail")?.focus();
            } else {
                authName?.focus();
            }
        }, 50);
    }


    // ================================
    // CLOSE MODAL
    // ================================

    function closeAuthModal() {
        authModal.classList.add("hidden");
        authModal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("overflow-hidden");
    }


    // ================================
    // UPDATE LOGIN / REGISTER UI
    // ================================

    function updateAuthMode() {

        if (authMode === "login") {

            authTitle.textContent = "Welcome back";

            authSubtitle.textContent =
                "Sign in to continue to CareerForge AI.";

            nameField?.classList.add("hidden");

            if (authName) {
                authName.required = false;
            }

            submitText.textContent = "Sign in";

            switchText.textContent =
                "Don't have an account?";

            authSwitch.textContent =
                "Create account";

            forgotPassword?.classList.remove("hidden");

            passwordInput?.setAttribute(
                "autocomplete",
                "current-password"
            );

            passwordStrength?.classList.add("hidden");

            termsText?.classList.remove("hidden");

        } else {

            authTitle.textContent = "Create your account";

            authSubtitle.textContent =
                "Start building your career with CareerForge AI.";

            nameField?.classList.remove("hidden");

            if (authName) {
                authName.required = true;
            }

            submitText.textContent = "Create account";

            switchText.textContent =
                "Already have an account?";

            authSwitch.textContent =
                "Sign in";

            forgotPassword?.classList.add("hidden");

            passwordInput?.setAttribute(
                "autocomplete",
                "new-password"
            );

            passwordStrength?.classList.remove("hidden");

            termsText?.classList.remove("hidden");
        }
    }


    // ================================
    // HEADER AUTH BUTTONS
    // ================================

    document.querySelectorAll("[data-auth-open]").forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const mode =
                button.getAttribute("data-auth-open") || "login";

            console.log("Opening auth modal:", mode);

            openAuthModal(mode);
        });

    });


    // ================================
    // CLOSE BUTTON
    // ================================

    authClose?.addEventListener("click", closeAuthModal);


    // ================================
    // BACKDROP
    // ================================

    authBackdrop?.addEventListener("click", closeAuthModal);


    // ================================
    // ESC KEY
    // ================================

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            !authModal.classList.contains("hidden")
        ) {
            closeAuthModal();
        }

    });


    // ================================
    // LOGIN <-> REGISTER
    // ================================

    authSwitch?.addEventListener("click", () => {

        authMode =
            authMode === "login"
                ? "register"
                : "login";

        updateAuthMode();

    });


    // ================================
    // PASSWORD VISIBILITY
    // ================================

    togglePassword?.addEventListener("click", () => {

        if (!passwordInput) return;

        const isPassword =
            passwordInput.type === "password";

        passwordInput.type =
            isPassword ? "text" : "password";

    });


    // ================================
    // PASSWORD STRENGTH
    // ================================

    passwordInput?.addEventListener("input", () => {

        if (authMode !== "register") {
            return;
        }

        const password = passwordInput.value;

        const bars =
            document.querySelectorAll(".strength-bar");

        let strength = 0;

        if (password.length >= 8) {
            strength++;
        }

        if (/[A-Z]/.test(password)) {
            strength++;
        }

        if (/[0-9]/.test(password)) {
            strength++;
        }

        if (/[^A-Za-z0-9]/.test(password)) {
            strength++;
        }

        bars.forEach((bar, index) => {

            bar.classList.toggle(
                "active",
                index < strength
            );

        });


        const messages = [
            "",
            "Weak password",
            "Fair password",
            "Good password",
            "Strong password"
        ];

        strengthText.textContent =
            messages[strength] || "";

    });


    // ================================
    // FORM SUBMIT
    // ================================

    authForm?.addEventListener("submit", async event => {

        event.preventDefault();

        submitText.classList.add("hidden");
        submitLoader.classList.remove("hidden");

        authSubmit.disabled = true;

        try {

            // Temporary demo delay
            await new Promise(resolve =>
                setTimeout(resolve, 1000)
            );

            if (authMode === "login") {

                console.log("Login submitted");

            } else {

                console.log("Registration submitted");

            }

        } finally {

            submitText.classList.remove("hidden");
            submitLoader.classList.add("hidden");

            authSubmit.disabled = false;

        }

    });


    // ================================
    // FORGOT PASSWORD
    // ================================

    forgotPassword?.addEventListener("click", () => {

        console.log("Forgot password clicked");

        // Later:
        // openAuthModal("forgot-password");

    });

});