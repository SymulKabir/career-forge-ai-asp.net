document.addEventListener("DOMContentLoaded", () => {
  // ================================
  // ELEMENTS
  // ================================

  const authModal = document.getElementById("authModal");
  const authBackdrop = document.getElementById("authBackdrop");
  const authClose = document.getElementById("authClose");

  const authSwitch = document.getElementById("authSwitch");
  const authForm = document.getElementById("authForm");

  const authTitle = document.getElementById("authTitle");
  const authSubtitle = document.getElementById("authSubtitle");

  const nameField = document.getElementById("nameField");
  const authName = document.getElementById("authName");

  const emailInput = document.getElementById("authEmail");

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
  const strengthScore = document.getElementById("strengthScore");

  const confirmPasswordField = document.getElementById(
    "confirmPasswordField",
  );

  const confirmPasswordInput = document.getElementById(
    "authConfirmPassword",
  );

  const toggleConfirmPassword = document.getElementById(
    "toggleConfirmPassword",
  );

  const confirmPasswordError = document.getElementById(
    "confirmPasswordError",
  );

  const passwordError = document.getElementById("passwordError");
  const emailError = document.getElementById("emailError");
  const nameError = document.getElementById("nameError");

  // Password requirements
  const requirementLength = document.getElementById("requirementLength");
  const requirementUpper = document.getElementById("requirementUpper");
  const requirementNumber = document.getElementById("requirementNumber");
  const requirementSpecial = document.getElementById("requirementSpecial");

  const bars = document.querySelectorAll(".strength-bar");

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
    updateSubmitButton();

    authModal.classList.remove("hidden");
    authModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("overflow-hidden");

    setTimeout(() => {
      if (authMode === "login") {
        emailInput?.focus();
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

      confirmPasswordField?.classList.add("hidden");

      passwordStrength?.classList.add("hidden");

      if (authName) {
        authName.required = false;
      }

      if (confirmPasswordInput) {
        confirmPasswordInput.required = false;
      }

      if (emailInput) {
        emailInput.required = true;
      }

      if (passwordInput) {
        passwordInput.required = true;
        passwordInput.setAttribute(
          "autocomplete",
          "current-password",
        );
      }

      submitText.textContent = "Sign in";

      switchText.textContent = "Don't have an account?";

      authSwitch.textContent = "Create account";

      forgotPassword?.classList.remove("hidden");

      termsText?.classList.remove("hidden");
    } else {
      authTitle.textContent = "Create your account";

      authSubtitle.textContent =
        "Start building your career with CareerForge AI.";

      nameField?.classList.remove("hidden");

      confirmPasswordField?.classList.remove("hidden");

      passwordStrength?.classList.remove("hidden");

      if (authName) {
        authName.required = true;
      }

      if (emailInput) {
        emailInput.required = true;
      }

      if (passwordInput) {
        passwordInput.required = true;
        passwordInput.setAttribute(
          "autocomplete",
          "new-password",
        );
      }

      if (confirmPasswordInput) {
        confirmPasswordInput.required = true;
      }

      submitText.textContent = "Create account";

      switchText.textContent = "Already have an account?";

      authSwitch.textContent = "Sign in";

      forgotPassword?.classList.add("hidden");

      termsText?.classList.remove("hidden");
    }

    updateSubmitButton();
  }

  // ================================
  // HEADER AUTH BUTTONS
  // ================================

  document.querySelectorAll("[data-auth-open]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const mode =
        button.getAttribute("data-auth-open") || "login";

      openAuthModal(mode);
    });
  });

  // ================================
  // CLOSE
  // ================================

  authClose?.addEventListener("click", closeAuthModal);

  authBackdrop?.addEventListener("click", closeAuthModal);

  document.addEventListener("keydown", (event) => {
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
  // CONFIRM PASSWORD VISIBILITY
  // ================================

  toggleConfirmPassword?.addEventListener("click", () => {
    if (!confirmPasswordInput) return;

    const isPassword =
      confirmPasswordInput.type === "password";

    confirmPasswordInput.type =
      isPassword ? "text" : "password";
  });

  // ================================
  // PASSWORD STRENGTH
  // ================================

  function calculatePasswordStrength(password) {
    let strength = 0;

    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

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

  // ================================
  // REQUIREMENT UI
  // ================================

  function updateRequirement(element, valid) {
    if (!element) return;

    const icon =
      element.querySelector(".requirement-icon");

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

  // ================================
  // UPDATE PASSWORD STRENGTH UI
  // ================================

  function updatePasswordStrength() {
    if (!passwordInput) return;

    const password = passwordInput.value;

    const result =
      calculatePasswordStrength(password);

    const {
      strength,
      hasLength,
      hasUppercase,
      hasNumber,
      hasSpecial,
    } = result;

    // Requirements
    updateRequirement(
      requirementLength,
      hasLength,
    );

    updateRequirement(
      requirementUpper,
      hasUppercase,
    );

    updateRequirement(
      requirementNumber,
      hasNumber,
    );

    updateRequirement(
      requirementSpecial,
      hasSpecial,
    );

    // Reset bars
    bars.forEach((bar) => {
      bar.classList.remove(
        "bg-red-400",
        "bg-orange-400",
        "bg-yellow-400",
        "bg-emerald-500",
      );

      bar.classList.add("bg-slate-200");
    });

    // Empty password
    if (!password) {
      strengthText.textContent =
        "Enter a password";

      strengthText.className =
        "text-[11px] font-medium text-slate-400 transition-colors";

      strengthScore.textContent = "";

      return;
    }

    // Weak
    if (strength === 1) {
      bars[0]?.classList.remove("bg-slate-200");
      bars[0]?.classList.add("bg-red-400");

      strengthText.textContent =
        "Weak password";

      strengthText.className =
        "text-[11px] font-medium text-red-500 transition-colors";
    }

    // Fair
    else if (strength === 2) {
      for (let i = 0; i < 2; i++) {
        bars[i]?.classList.remove("bg-slate-200");
        bars[i]?.classList.add("bg-orange-400");
      }

      strengthText.textContent =
        "Fair password";

      strengthText.className =
        "text-[11px] font-medium text-orange-500 transition-colors";
    }

    // Good
    else if (strength === 3) {
      for (let i = 0; i < 3; i++) {
        bars[i]?.classList.remove("bg-slate-200");
        bars[i]?.classList.add("bg-yellow-400");
      }

      strengthText.textContent =
        "Good password";

      strengthText.className =
        "text-[11px] font-medium text-yellow-600 transition-colors";
    }

    // Strong
    else if (strength === 4) {
      bars.forEach((bar) => {
        bar.classList.remove("bg-slate-200");
        bar.classList.add("bg-emerald-500");
      });

      strengthText.textContent =
        "Strong password";

      strengthText.className =
        "text-[11px] font-medium text-emerald-600 transition-colors";
    }

    strengthScore.textContent =
      `${strength}/4`;
  }

  passwordInput?.addEventListener(
    "input",
    () => {
      if (authMode === "register") {
        updatePasswordStrength();
      }

      updateConfirmPasswordValidation();
      updateSubmitButton();
    },
  );

  // ================================
  // CONFIRM PASSWORD VALIDATION
  // ================================

  function updateConfirmPasswordValidation() {
    if (
      authMode !== "register" ||
      !confirmPasswordInput
    ) {
      return true;
    }

    const password =
      passwordInput?.value || "";

    const confirmPassword =
      confirmPasswordInput.value;

    // Empty confirm password
    if (!confirmPassword) {
      confirmPasswordError?.classList.add(
        "hidden",
      );

      confirmPasswordInput.classList.remove(
        "auth-input-error",
      );

      return false;
    }

    // Passwords don't match
    if (password !== confirmPassword) {
      if (confirmPasswordError) {
        confirmPasswordError.textContent =
          "Passwords do not match.";

        confirmPasswordError.classList.remove(
          "hidden",
        );
      }

      confirmPasswordInput.classList.add(
        "auth-input-error",
      );

      return false;
    }

    // Match
    confirmPasswordError?.classList.add(
      "hidden",
    );

    confirmPasswordInput.classList.remove(
      "auth-input-error",
    );

    return true;
  }

  confirmPasswordInput?.addEventListener(
    "input",
    () => {
      updateConfirmPasswordValidation();
      updateSubmitButton();
    },
  );

  // ================================
  // FORM VALIDATION
  // ================================

  function isRegisterFormValid() {
    const name =
      authName?.value.trim() || "";

    const email =
      emailInput?.value.trim() || "";

    const password =
      passwordInput?.value || "";

    const confirmPassword =
      confirmPasswordInput?.value || "";

    // Only check if fields are filled.
    // No name format validation.
    // No email format validation.
    // No password strength requirement.

    if (!name) {
      return false;
    }

    if (!email) {
      return false;
    }

    if (!password) {
      return false;
    }

    if (!confirmPassword) {
      return false;
    }

    if (password !== confirmPassword) {
      return false;
    }

    return true;
  }

  // ================================
  // LOGIN VALIDATION
  // ================================

  function isLoginFormValid() {
    const email =
      emailInput?.value.trim() || "";

    const password =
      passwordInput?.value || "";

    // Only check empty.
    // Do NOT validate email format.

    return Boolean(
      email && password
    );
  }

  // ================================
  // UPDATE SUBMIT BUTTON
  // ================================

  function updateSubmitButton() {
    if (!authSubmit) return;

    let valid = false;

    if (authMode === "register") {
      valid = isRegisterFormValid();
    } else {
      valid = isLoginFormValid();
    }

    authSubmit.disabled = !valid;
  }

  // ================================
  // INPUT LISTENERS
  // ================================

  authName?.addEventListener(
    "input",
    () => {
      updateSubmitButton();
    },
  );

  emailInput?.addEventListener(
    "input",
    () => {
      updateSubmitButton();
    },
  );

  // ================================
  // ERROR CLEAR HANDLE
  // ================================

  function clearValidationErrors() {
    const errorElements =
      authForm.querySelectorAll(
        '[id$="Error"]',
      );

    errorElements.forEach((element) => {
      element.textContent = "";
      element.classList.add("hidden");
    });

    const inputs =
      authForm.querySelectorAll(
        ".auth-input",
      );

    inputs.forEach((input) => {
      input.classList.remove(
        "auth-input-error",
      );
    });
  }

  // ================================
  // VALIDATION ERROR HANDLE
  // ================================

  function showValidationErrors(errors) {
    clearValidationErrors();

    if (!errors) return;

    Object.entries(errors).forEach(
      ([field, messages]) => {
        const fieldName =
          field.toLowerCase();

        const errorElement =
          document.getElementById(
            `${fieldName}Error`,
          );

        const inputElement =
          document.querySelector(
            `[name="${field}"]`,
          );

        if (!errorElement) return;

        const message =
          Array.isArray(messages)
            ? messages[0]
            : messages;

        errorElement.textContent =
          message;

        errorElement.classList.remove(
          "hidden",
        );

        inputElement?.classList.add(
          "auth-input-error",
        );
      },
    );
  }

  // ================================
  // REGISTRATION API
  // ================================

  async function handleRegistration() {
    try {
      const formData =
        new FormData(authForm);

      const response = await fetch(
        authForm.action,
        {
          method: "POST",
          body: formData,
        },
      );

      const result =
        await response.json();

      if (!response.ok) {
        showValidationErrors(
          result.errors,
        );

        return false;
      }

      if (result.success) {
        console.log(
          result.message,
        );

        return true;
      }

      return false;
    } catch (error) {
      console.error(
        "Registration error:",
        error,
      );

      return false;
    }
  }

  // ================================
  // FORM SUBMIT
  // ================================

  authForm?.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();

      // Final client-side check
      updateSubmitButton();

      if (authSubmit.disabled) {
        return;
      }

      submitText.classList.add(
        "hidden",
      );

      submitLoader.classList.remove(
        "hidden",
      );

      authSubmit.disabled = true;

      try {
        if (authMode === "login") {
          console.log(
            "Login submitted",
          );

          // Login API later
        } else {
          console.log(
            "Registration submitted",
          );

          await handleRegistration();
        }
      } finally {
        submitText.classList.remove(
          "hidden",
        );

        submitLoader.classList.add(
          "hidden",
        );

        // Recalculate instead of always enabling
        updateSubmitButton();
      }
    },
  );

  // ================================
  // FORGOT PASSWORD
  // ================================

  forgotPassword?.addEventListener(
    "click",
    () => {
      console.log(
        "Forgot password clicked",
      );
    },
  );

  // ================================
  // INITIAL STATE
  // ================================

  updateAuthMode();

  updatePasswordStrength();

  updateSubmitButton();
});