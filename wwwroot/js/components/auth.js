document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // =====================================================
  // MODAL ELEMENTS
  // =====================================================

  const authModal = document.getElementById("authModal");
  const authBackdrop = document.getElementById("authBackdrop");
  const authClose = document.getElementById("authClose");

  const authSwitch = document.getElementById("authSwitch");
  const authTitle = document.getElementById("authTitle");
  const authSubtitle = document.getElementById("authSubtitle");
  const switchText = document.getElementById("switchText");

  const registrationAuthForm = document.getElementById("registrationAuthForm");

  const signInAuthForm = document.getElementById("signInAuthForm");

  if (!authModal) {
    console.error("[AUTH] #authModal not found.");
    return;
  }

  // =====================================================
  // REGISTER ELEMENTS
  // =====================================================

  const authName = document.getElementById("authName");
  const registerEmail = document.getElementById("registerEmail");
  const authPassword = document.getElementById("authPassword");

  const registerConfirmPassword = document.getElementById(
    "registerConfirmPassword",
  );

  const toggleRegisterPassword = document.getElementById(
    "toggleRegisterPassword",
  );

  const toggleRegisterConfirmPassword = document.getElementById(
    "toggleRegisterConfirmPassword",
  );

  const registerSubmit = document.getElementById("registerSubmit");
  const registerSubmitText = document.getElementById("registerSubmitText");
  const registerSubmitLoader = document.getElementById("registerSubmitLoader");

  const registerConfirmPasswordError = document.getElementById(
    "registerConfirmPasswordError",
  );

  // =====================================================
  // LOGIN ELEMENTS
  // =====================================================

  const signInEmail = document.getElementById("signInEmail");
  const signInPassword = document.getElementById("signInPassword");

  const toggleSignInPassword = document.getElementById("toggleSignInPassword");

  const signInSubmit = document.getElementById("signInSubmit");
  const signInSubmitText = document.getElementById("signInSubmitText");
  const signInSubmitLoader = document.getElementById("signInSubmitLoader");

  // =====================================================
  // PASSWORD STRENGTH ELEMENTS
  // =====================================================

  const strengthText = document.getElementById("strengthText");
  const strengthScore = document.getElementById("strengthScore");

  const requirementLength = document.getElementById("requirementLength");
  const requirementUpper = document.getElementById("requirementUpper");
  const requirementNumber = document.getElementById("requirementNumber");
  const requirementSpecial = document.getElementById("requirementSpecial");

  const strengthBars = document.querySelectorAll(".strength-bar");

  // =====================================================
  // DEBUG
  // =====================================================

  

  // =====================================================
  // MODE
  // =====================================================

  let authMode = "login";

  // =====================================================
  // OPEN MODAL
  // =====================================================

  function openAuthModal(mode = "login") {
    authMode = mode === "register" ? "register" : "login";

    updateAuthMode();

    authModal.classList.remove("hidden");
    authModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("overflow-hidden");

    setTimeout(() => {
      if (authMode === "register") {
        authName?.focus();
      } else {
        signInEmail?.focus();
      }
    }, 50);
  }

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  function closeAuthModal() {
    authModal.classList.add("hidden");
    authModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("overflow-hidden");
  }

  // =====================================================
  // REGISTER MODE
  // =====================================================

  function showRegistrationForm() {
    authMode = "register";

    registrationAuthForm?.classList.remove("hidden");
    signInAuthForm?.classList.add("hidden");

    if (authTitle) {
      authTitle.textContent = "Create your account";
    }

    if (authSubtitle) {
      authSubtitle.textContent =
        "Start building your career with CareerForge AI.";
    }

    if (switchText) {
      switchText.textContent = "Already have an account?";
    }

    if (authSwitch) {
      authSwitch.textContent = "Sign in";
    }

    updatePasswordStrength();
    updateRegisterSubmitButton();
  }

  // =====================================================
  // LOGIN MODE
  // =====================================================

  function showLoginForm() {
    authMode = "login";

    registrationAuthForm?.classList.add("hidden");
    signInAuthForm?.classList.remove("hidden");

    if (authTitle) {
      authTitle.textContent = "Welcome back";
    }

    if (authSubtitle) {
      authSubtitle.textContent = "Sign in to continue to CareerForge AI.";
    }

    if (switchText) {
      switchText.textContent = "Don't have an account?";
    }

    if (authSwitch) {
      authSwitch.textContent = "Create account";
    }

    updateLoginSubmitButton();
  }

  // =====================================================
  // UPDATE MODE
  // =====================================================

  function updateAuthMode() {
    if (authMode === "register") {
      showRegistrationForm();
    } else {
      showLoginForm();
    }
  }

  // =====================================================
  // SWITCH
  // =====================================================

  authSwitch?.addEventListener("click", (event) => {
    event.preventDefault();

    if (authMode === "register") {
      showLoginForm();
    } else {
      showRegistrationForm();
    }
  });

  // =====================================================
  // EXTERNAL OPEN BUTTONS
  // =====================================================

  document.querySelectorAll("[data-auth-open]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const mode = button.getAttribute("data-auth-open") || "login";

      openAuthModal(mode);
    });
  });

  // =====================================================
  // CLOSE
  // =====================================================

  authClose?.addEventListener("click", closeAuthModal);

  authBackdrop?.addEventListener("click", closeAuthModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !authModal.classList.contains("hidden")) {
      closeAuthModal();
    }
  });

  // =====================================================
  // PASSWORD VISIBILITY
  // =====================================================

  function togglePasswordVisibility(input, button) {
    if (!input || !button) {
      return;
    }

    const eyeIcon = button.querySelector(".password-eye-icon");
    const eyeOffIcon = button.querySelector(".password-eye-off-icon");

    const isCurrentlyHidden = input.type === "password";

    // Change input type
    input.type = isCurrentlyHidden ? "text" : "password";

    // Change icon
    if (eyeIcon) {
      eyeIcon.classList.toggle("hidden", isCurrentlyHidden);
      eyeIcon.classList.toggle("block", !isCurrentlyHidden);
    }

    if (eyeOffIcon) {
      eyeOffIcon.classList.toggle("hidden", !isCurrentlyHidden);
      eyeOffIcon.classList.toggle("block", isCurrentlyHidden);
    }

    // Accessibility
    button.setAttribute(
      "aria-label",
      isCurrentlyHidden ? "Hide password" : "Show password",
    );

    button.setAttribute("aria-pressed", isCurrentlyHidden ? "true" : "false");

    // Keep cursor/focus in input
    input.focus();

    // Keep cursor at the end
    try {
      const length = input.value.length;

      input.setSelectionRange(length, length);
    } catch (error) {
      // Ignore selection errors for unsupported input types/browsers.
    }
  }

  // =====================================================
  // REGISTER PASSWORD SHOW / HIDE
  // =====================================================

  toggleRegisterPassword?.addEventListener("click", (event) => {
    event.preventDefault();

    togglePasswordVisibility(authPassword, toggleRegisterPassword);
  });

  // =====================================================
  // REGISTER CONFIRM PASSWORD SHOW / HIDE
  // =====================================================

  toggleRegisterConfirmPassword?.addEventListener("click", (event) => {
    event.preventDefault();

    togglePasswordVisibility(
      registerConfirmPassword,
      toggleRegisterConfirmPassword,
    );
  });

  // =====================================================
  // LOGIN PASSWORD SHOW / HIDE
  // =====================================================

  toggleSignInPassword?.addEventListener("click", (event) => {
    event.preventDefault();

    togglePasswordVisibility(signInPassword, toggleSignInPassword);
  });

  // =====================================================
  // PASSWORD STRENGTH CALCULATION
  // =====================================================

  function calculatePasswordStrength(password) {
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    let strength = 0;

    if (hasLength) strength++;
    if (hasUppercase) strength++;
    if (hasNumber) strength++;
    if (hasSpecial) strength++;

    return {
      strength,
      hasLength,
      hasUppercase,
      hasNumber,
      hasSpecial,
    };
  }

  // =====================================================
  // REQUIREMENT UI
  // =====================================================

  function updateRequirement(element, valid) {
    if (!element) return;

    const icon = element.querySelector(".requirement-icon");

    if (valid) {
      element.classList.remove("text-slate-400");
      element.classList.add("text-emerald-600");

      if (icon) {
        icon.textContent = "✓";
      }
    } else {
      element.classList.remove("text-emerald-600");
      element.classList.add("text-slate-400");

      if (icon) {
        icon.textContent = "○";
      }
    }
  }

  // =====================================================
  // PASSWORD STRENGTH UI
  // =====================================================

  function updatePasswordStrength() {
    if (!authPassword) return;

    const password = authPassword.value;

    const result = calculatePasswordStrength(password);

    updateRequirement(requirementLength, result.hasLength);
    updateRequirement(requirementUpper, result.hasUppercase);
    updateRequirement(requirementNumber, result.hasNumber);
    updateRequirement(requirementSpecial, result.hasSpecial);

    strengthBars.forEach((bar) => {
      bar.classList.remove(
        "bg-red-400",
        "bg-orange-400",
        "bg-yellow-400",
        "bg-emerald-500",
      );

      bar.classList.add("bg-slate-200");
    });

    if (!password) {
      if (strengthText) {
        strengthText.textContent = "Enter a password";
        strengthText.className = "text-[11px] font-medium text-slate-400";
      }

      if (strengthScore) {
        strengthScore.textContent = "";
      }

      return;
    }

    const strength = result.strength;

    if (strength === 1) {
      strengthBars[0]?.classList.remove("bg-slate-200");
      strengthBars[0]?.classList.add("bg-red-400");

      strengthText.textContent = "Weak password";
      strengthText.className = "text-[11px] font-medium text-red-500";
    } else if (strength === 2) {
      for (let i = 0; i < 2; i++) {
        strengthBars[i]?.classList.remove("bg-slate-200");
        strengthBars[i]?.classList.add("bg-orange-400");
      }

      strengthText.textContent = "Fair password";
      strengthText.className = "text-[11px] font-medium text-orange-500";
    } else if (strength === 3) {
      for (let i = 0; i < 3; i++) {
        strengthBars[i]?.classList.remove("bg-slate-200");
        strengthBars[i]?.classList.add("bg-yellow-400");
      }

      strengthText.textContent = "Good password";
      strengthText.className = "text-[11px] font-medium text-yellow-600";
    } else if (strength === 4) {
      strengthBars.forEach((bar) => {
        bar.classList.remove("bg-slate-200");
        bar.classList.add("bg-emerald-500");
      });

      strengthText.textContent = "Strong password";
      strengthText.className = "text-[11px] font-medium text-emerald-600";
    }

    if (strengthScore) {
      strengthScore.textContent = `${strength}/4`;
    }
  }

  // =====================================================
  // CONFIRM PASSWORD VALIDATION
  // =====================================================

  function isConfirmPasswordValid() {
    const password = authPassword?.value || "";
    const confirmPassword = registerConfirmPassword?.value || "";

    if (!confirmPassword) {
      registerConfirmPasswordError?.classList.add("hidden");

      registerConfirmPassword?.classList.remove("auth-input-error");

      return false;
    }

    if (password !== confirmPassword) {
      if (registerConfirmPasswordError) {
        registerConfirmPasswordError.textContent = "Passwords do not match.";

        registerConfirmPasswordError.classList.remove("hidden");
      }

      registerConfirmPassword?.classList.add("auth-input-error");

      return false;
    }

    registerConfirmPasswordError?.classList.add("hidden");

    registerConfirmPassword?.classList.remove("auth-input-error");

    return true;
  }

  // =====================================================
  // REGISTER VALIDATION
  // =====================================================

  function isRegistrationFormValid() {
    const name = authName?.value.trim() || "";
    const email = registerEmail?.value.trim() || "";
    const password = authPassword?.value || "";
    const confirmPassword = registerConfirmPassword?.value || "";

    return (
      name.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword
    );
  }

  // =====================================================
  // RESET AUTH FORMS
  // =====================================================

  function resetAuthForms() {
    // Reset registration form
    if (registrationAuthForm) {
      registrationAuthForm.reset();
    }

    // Reset login form
    if (signInAuthForm) {
      signInAuthForm.reset();
    }

    // Remove input error styles
    [
      authName,
      registerEmail,
      authPassword,
      registerConfirmPassword,
      signInEmail,
      signInPassword,
    ].forEach((input) => {
      input?.classList.remove("auth-input-error");
    });

    // Clear validation messages
    clearValidationErrors();

    // Reset password strength
    updatePasswordStrength();

    // Reset buttons
    updateRegisterSubmitButton();
    updateLoginSubmitButton();
  }

  // =====================================================
  // LOGIN VALIDATION
  // =====================================================

  function isLoginFormValid() {
    const email = signInEmail?.value.trim() || "";
    const password = signInPassword?.value || "";

    return email.length > 0 && password.length > 0;
  }

  // =====================================================
  // REGISTER BUTTON
  // =====================================================

  function updateRegisterSubmitButton() {
    if (!registerSubmit) return;

    const valid = isRegistrationFormValid();

    registerSubmit.disabled = !valid;
  }

  // =====================================================
  // LOGIN BUTTON
  // =====================================================

  function updateLoginSubmitButton() {
    if (!signInSubmit) return;

    const valid = isLoginFormValid();

    signInSubmit.disabled = !valid;
  }

  // =====================================================
  // REGISTER INPUT EVENTS
  // =====================================================

  authName?.addEventListener("input", () => {
    updateRegisterSubmitButton();
  });

  registerEmail?.addEventListener("input", () => {
    updateRegisterSubmitButton();
  });

  authPassword?.addEventListener("input", () => {
    updatePasswordStrength();
    isConfirmPasswordValid();
    updateRegisterSubmitButton();
  });

  registerConfirmPassword?.addEventListener("input", () => {
    isConfirmPasswordValid();
    updateRegisterSubmitButton();
  });

  // =====================================================
  // LOGIN INPUT EVENTS
  // =====================================================

  signInEmail?.addEventListener("input", () => {
    updateLoginSubmitButton();
  });

  signInPassword?.addEventListener("input", () => {
    updateLoginSubmitButton();
  });

  // =====================================================
  // REGISTRATION REQUEST
  // =====================================================

  // =====================================================
  // REGISTRATION REQUEST
  // =====================================================

  async function handleRegistration() {
    clearValidationErrors();

    if (!registrationAuthForm) {
      showToast("Registration form could not be found.", "error");
      return false;
    }

    try {
      const formData = new FormData(registrationAuthForm);

      const response = await fetch(registrationAuthForm.action, {
        method: "POST",
        body: formData,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      });

      const contentType = response.headers.get("content-type") || "";

      // -------------------------------------------------
      // SERVER DID NOT RETURN JSON
      // -------------------------------------------------

      if (!contentType.includes("application/json")) {
        console.error("[AUTH] Register response was not JSON.");

        showToast("Something went wrong while creating your account.", "error");

        return false;
      }

      const result = await response.json();

      // -------------------------------------------------
      // SERVER VALIDATION ERROR
      // -------------------------------------------------

      if (!response.ok) {
        showValidationErrors(result.errors);

        showToast(
          "Please correct the highlighted fields and try again.",
          "error",
        );

        return false;
      }

      // -------------------------------------------------
      // REGISTRATION SUCCESS
      // -------------------------------------------------

      if (result.success) {

        // Show success toast
        showToast(result.message || "Signup successful!", "success");

        // Reset forms
        resetAuthForms();

        // Close modal
        closeAuthModal();

        return true;
      }

      // -------------------------------------------------
      // UNKNOWN RESPONSE
      // -------------------------------------------------

      showToast(
        result.message || "Registration failed. Please try again.",
        "error",
      );

      return false;
    } catch (error) {
      console.error("[AUTH] Registration error:", error);

      showToast("Unable to connect to the server. Please try again.", "error");

      return false;
    }
  }

  // =====================================================
  // LOGIN REQUEST
  // =====================================================

  // =====================================================
  // LOGIN REQUEST
  // =====================================================

  async function handleLogin() {
    clearValidationErrors();

    if (!signInAuthForm) {
      showToast("Login form could not be found.", "error");
      return false;
    }

    try {
      const formData = new FormData(signInAuthForm);

      const response = await fetch(signInAuthForm.action, {
        method: "POST",
        body: formData,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      });

      const contentType = response.headers.get("content-type") || "";

      // -------------------------------------------------
      // SERVER DID NOT RETURN JSON
      // -------------------------------------------------

      if (!contentType.includes("application/json")) {
        console.error("[AUTH] Login response was not JSON.");

        showToast("Something went wrong while signing you in.", "error");

        return false;
      }

      const result = await response.json();

      // -------------------------------------------------
      // LOGIN ERROR
      // -------------------------------------------------

      if (!response.ok) {
        showValidationErrors(result.errors);

        showToast(result.message || "Invalid email or password.", "error");

        return false;
      }

      // -------------------------------------------------
      // LOGIN SUCCESS
      // -------------------------------------------------

      if (result.success) {

        // Show success toast
        showToast(result.message || "Welcome back!", "success");

        // Reset forms
        resetAuthForms();

        // Close modal
        closeAuthModal();

        return true;
      }

      // -------------------------------------------------
      // UNKNOWN RESPONSE
      // -------------------------------------------------

      showToast(result.message || "Login failed. Please try again.", "error");

      return false;
    } catch (error) {
      console.error("[AUTH] Login error:", error);

      showToast("Unable to connect to the server. Please try again.", "error");

      return false;
    }
  }

  // =====================================================
  // REGISTER SUBMIT
  // =====================================================

  registrationAuthForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    updateRegisterSubmitButton();

    if (registerSubmit?.disabled) {
      return;
    }

    registerSubmitText?.classList.add("hidden");
    registerSubmitLoader?.classList.remove("hidden");

    registerSubmit.disabled = true;

    try {
      await handleRegistration();
    } finally {
      registerSubmitText?.classList.remove("hidden");
      registerSubmitLoader?.classList.add("hidden");

      updateRegisterSubmitButton();
    }
  });

  // =====================================================
  // LOGIN SUBMIT
  // =====================================================

  signInAuthForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    updateLoginSubmitButton();

    if (signInSubmit?.disabled) {
      return;
    }

    signInSubmitText?.classList.add("hidden");
    signInSubmitLoader?.classList.remove("hidden");

    signInSubmit.disabled = true;

    try {
      await handleLogin();
    } finally {
      signInSubmitText?.classList.remove("hidden");
      signInSubmitLoader?.classList.add("hidden");

      updateLoginSubmitButton();
    }
  });

  // =====================================================
  // CLEAR VALIDATION ERRORS
  // =====================================================
  function clearValidationErrors() {
    const errorElements = [
      document.getElementById("nameError"),
      document.getElementById("registerEmailError"),
      document.getElementById("registerPasswordError"),
      document.getElementById("registerConfirmPasswordError"),
    ];

    const inputElements = [
      authName,
      registerEmail,
      authPassword,
      registerConfirmPassword,
    ];

    errorElements.forEach((element) => {
      if (!element) return;

      element.textContent = "";
      element.classList.add("hidden");
    });

    const generalError = document.getElementById("registerGeneralError");

    generalError?.classList.add("hidden");

    inputElements.forEach((input) => {
      input?.classList.remove("auth-input-error");
    });
  }

  // =====================================================
  // VALIDATION ERRORS
  // =====================================================

  function showValidationErrors(errors) {
    if (!errors) {
      return;
    }


    Object.entries(errors).forEach(([field, messages]) => {
      if (!messages) {
        return;
      }

      // ASP.NET can return either an array or a string
      const messageArray = Array.isArray(messages) ? messages : [messages];

      const message = messageArray.join(" ");

      const normalizedField = field.toLowerCase();

      let errorElement = null;
      let inputElement = null;

      // =====================================================
      // NAME
      // =====================================================

      if (normalizedField === "name") {
        errorElement = document.getElementById("nameError");
        inputElement = authName;
      }

      // =====================================================
      // EMAIL
      // =====================================================
      else if (
        normalizedField === "email" ||
        normalizedField === "registeremail"
      ) {
        errorElement = document.getElementById("registerEmailError");

        inputElement = registerEmail;
      }

      // =====================================================
      // PASSWORD
      // =====================================================
      else if (normalizedField === "password") {
        errorElement = document.getElementById("registerPasswordError");

        inputElement = authPassword;
      }

      // =====================================================
      // CONFIRM PASSWORD
      // =====================================================
      else if (
        normalizedField === "confirmpassword" ||
        normalizedField === "confirmPassword".toLowerCase()
      ) {
        errorElement = document.getElementById("registerConfirmPasswordError");

        inputElement = registerConfirmPassword;
      }

      // =====================================================
      // GENERAL / UNKNOWN FIELD
      // =====================================================
      else {
        console.warn(
          `[AUTH] No frontend error element found for field: ${field}`,
        );
        showToast(message, "error");

        return;
      }

      // =====================================================
      // SHOW ERROR
      // =====================================================

      if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove("hidden");
      }

      if (inputElement) {
        inputElement.classList.add("auth-input-error");
      }
    });
  }

  // =====================================================
  // INITIAL STATE
  // =====================================================

  showLoginForm();

  updatePasswordStrength();
  updateRegisterSubmitButton();
  updateLoginSubmitButton();
});
