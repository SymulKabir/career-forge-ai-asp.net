(function (window, document) {
  "use strict";

  /* =========================================================
     CAREERFORGE AI — GLOBAL TOAST SYSTEM
     ========================================================= */

  const TOAST_CONTAINER_PREFIX = "global-toast-container";

  let toastCounter = 0;

  /* =========================================================
     POSITIONS
     ========================================================= */

  const DEFAULT_POSITION = "top-right";

  const POSITIONS = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ];

  /* =========================================================
     NORMALIZE POSITION
     ========================================================= */

  function normalizePosition(position) {
    return POSITIONS.includes(position)
      ? position
      : DEFAULT_POSITION;
  }

  /* =========================================================
     GET CONTAINER ID
     ========================================================= */

  function getContainerId(position) {
    return `${TOAST_CONTAINER_PREFIX}-${position}`;
  }

  /* =========================================================
     CREATE / GET CONTAINER
     ========================================================= */

  function getContainer(position = DEFAULT_POSITION) {
    const normalizedPosition =
      normalizePosition(position);

    const containerId =
      getContainerId(normalizedPosition);

    let container =
      document.getElementById(containerId);

    if (!container) {
      container =
        document.createElement("div");

      container.id = containerId;

      container.className =
        `cf-toast-container cf-toast-${normalizedPosition}`;

      container.dataset.position =
        normalizedPosition;

      document.body.appendChild(container);
    }

    return container;
  }

  /* =========================================================
     ICONS
     ========================================================= */

  const icons = {
    success: `
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          class="cf-toast-check-path"
          d="M5 12.5L9.5 17L19 7"
        />
      </svg>
    `,

    error: `
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M7 7L17 17" />
        <path d="M17 7L7 17" />
      </svg>
    `,

    warning: `
      <span class="cf-toast-warning-icon">
        !
      </span>
    `,

    info: `
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
        />

        <path d="M12 10.5V16" />

        <path d="M12 7.5H12.01" />
      </svg>
    `,

    progress: `
      <div class="cf-toast-spinner"></div>
    `,
  };

  /* =========================================================
     CLOSE ICON
     ========================================================= */

  const closeIcon = `
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M6 6L18 18" />
      <path d="M18 6L6 18" />
    </svg>
  `;

  /* =========================================================
     NORMALIZE TYPE
     ========================================================= */

  function normalizeType(type) {
    const allowedTypes = [
      "success",
      "error",
      "warning",
      "info",
      "progress",
    ];

    return allowedTypes.includes(type)
      ? type
      : "success";
  }

  /* =========================================================
     CREATE TOAST
     ========================================================= */

  function createToast(options = {}) {
    const {
      message = "",
      type = "success",
      description = "",
      duration = 4000,
      close = true,
      progress = true,
      autoClose = true,
      position = DEFAULT_POSITION,
    } = options;

    const normalizedType =
      normalizeType(type);

    const normalizedPosition =
      normalizePosition(position);

    const container =
      getContainer(normalizedPosition);

    const toastId =
      `cf-toast-${++toastCounter}`;

    /* =======================================================
       TOAST
       ======================================================= */

    const toast =
      document.createElement("div");

    toast.id = toastId;

    toast.className =
      `cf-toast cf-toast-${normalizedType}`;

    toast.dataset.position =
      normalizedPosition;

    /* =======================================================
       ICON
       ======================================================= */

    const icon =
      document.createElement("div");

    icon.className =
      "cf-toast-icon";

    icon.innerHTML =
      icons[normalizedType];

    /* =======================================================
       CONTENT
       ======================================================= */

    const content =
      document.createElement("div");

    content.className =
      "cf-toast-content";

    /* =======================================================
       MESSAGE
       ======================================================= */

    const messageElement =
      document.createElement("div");

    messageElement.className =
      "cf-toast-message";

    messageElement.textContent =
      message;

    content.appendChild(
      messageElement
    );

    /* =======================================================
       DESCRIPTION
       ======================================================= */

    if (description) {
      const descriptionElement =
        document.createElement("div");

      descriptionElement.className =
        "cf-toast-description";

      descriptionElement.textContent =
        description;

      content.appendChild(
        descriptionElement
      );
    }

    /* =======================================================
       CLOSE BUTTON
       ======================================================= */

    let closeButton = null;

    if (close) {
      closeButton =
        document.createElement("button");

      closeButton.type = "button";

      closeButton.className =
        "cf-toast-close";

      closeButton.setAttribute(
        "aria-label",
        "Close notification"
      );

      closeButton.innerHTML =
        closeIcon;

      closeButton.addEventListener(
        "click",
        () => {
          removeToast(toast);
        }
      );
    }

    /* =======================================================
       BUILD
       ======================================================= */

    toast.appendChild(icon);

    toast.appendChild(content);

    if (closeButton) {
      toast.appendChild(closeButton);
    }

    /* =======================================================
       PROGRESS BAR
       ======================================================= */

    let progressBar = null;

    if (
      progress &&
      autoClose &&
      normalizedType !== "progress"
    ) {
      progressBar =
        document.createElement("div");

      progressBar.className =
        "cf-toast-progress-bar";

      const progressFill =
        document.createElement("div");

      progressFill.className =
        "cf-toast-progress-fill";

      progressBar.appendChild(
        progressFill
      );

      toast.appendChild(
        progressBar
      );

      progressFill.style.animationDuration =
        `${duration}ms`;

      progressFill.classList.add(
        "cf-toast-auto-progress"
      );
    }

    /* =======================================================
       APPEND
       
       IMPORTANT:
       Always append the newest toast.

       Top container:
         DOM: old -> new
         CSS column
         Visual: new is at bottom normally.

       We therefore use CSS column-reverse for TOP.

       Bottom container:
         CSS column
         Visual: new is at bottom.
       ======================================================= */

    container.appendChild(toast);

    /* =======================================================
       AUTO CLOSE
       ======================================================= */

    let timer = null;

    if (
      autoClose &&
      normalizedType !== "progress" &&
      duration > 0
    ) {
      timer = setTimeout(() => {
        removeToast(toast);
      }, duration);
    }

    /* =======================================================
       PAUSE ON MOUSE ENTER
       ======================================================= */

    let remainingTime = duration;

    let startTime = Date.now();

    toast.addEventListener(
      "mouseenter",
      () => {
        if (!timer) {
          return;
        }

        clearTimeout(timer);

        timer = null;

        remainingTime -=
          Date.now() - startTime;

        if (progressBar) {
          const fill =
            progressBar.querySelector(
              ".cf-toast-progress-fill"
            );

          if (fill) {
            const percentage =
              Math.max(
                0,
                remainingTime / duration
              );

            fill.style.animationPlayState =
              "paused";

            fill.style.transform =
              `scaleX(${percentage})`;
          }
        }
      }
    );

    /* =======================================================
       RESUME ON MOUSE LEAVE
       ======================================================= */

    toast.addEventListener(
      "mouseleave",
      () => {
        if (
          timer ||
          !autoClose ||
          normalizedType === "progress"
        ) {
          return;
        }

        startTime =
          Date.now();

        timer =
          setTimeout(() => {
            removeToast(toast);
          }, remainingTime);

        if (progressBar) {
          const fill =
            progressBar.querySelector(
              ".cf-toast-progress-fill"
            );

          if (fill) {
            fill.style.animationPlayState =
              "running";
          }
        }
      }
    );

    /* =======================================================
       RETURN INSTANCE
       ======================================================= */

    return {
      id: toastId,

      element: toast,

      close: () => {
        removeToast(toast);
      },

      update: (
        newMessage,
        newDescription
      ) => {
        messageElement.textContent =
          newMessage;

        if (
          newDescription !== undefined
        ) {
          let descriptionElement =
            content.querySelector(
              ".cf-toast-description"
            );

          if (!descriptionElement) {
            descriptionElement =
              document.createElement("div");

            descriptionElement.className =
              "cf-toast-description";

            content.appendChild(
              descriptionElement
            );
          }

          descriptionElement.textContent =
            newDescription;
        }
      },
    };
  }

  /* =========================================================
     REMOVE TOAST
     ========================================================= */

  function removeToast(toast) {
    if (
      !toast ||
      !toast.isConnected ||
      toast.classList.contains(
        "cf-toast-exit"
      )
    ) {
      return;
    }

    toast.classList.add(
      "cf-toast-exit"
    );

    setTimeout(() => {
      if (toast.isConnected) {
        toast.remove();
      }
    }, 260);
  }

  /* =========================================================
     SHOW TOAST
     ========================================================= */

  function showToast(
    message,
    type = "success",
    options = {}
  ) {
    return createToast({
      ...options,
      message,
      type,
    });
  }

  /* =========================================================
     SUCCESS
     ========================================================= */

  function showSuccess(
    message,
    options = {}
  ) {
    return showToast(
      message,
      "success",
      options
    );
  }

  /* =========================================================
     ERROR
     ========================================================= */

  function showError(
    message,
    options = {}
  ) {
    return showToast(
      message,
      "error",
      options
    );
  }

  /* =========================================================
     WARNING
     ========================================================= */

  function showWarning(
    message,
    options = {}
  ) {
    return showToast(
      message,
      "warning",
      options
    );
  }

  /* =========================================================
     INFO
     ========================================================= */

  function showInfo(
    message,
    options = {}
  ) {
    return showToast(
      message,
      "info",
      options
    );
  }

  /* =========================================================
     PROGRESS TOAST
     ========================================================= */

  function showProgressToast(
    message = "Processing...",
    options = {}
  ) {
    const {
      description = "",
      close = true,
      position = DEFAULT_POSITION,
    } = options;

    return createToast({
      message,
      description,
      type: "progress",
      close,
      progress: false,
      autoClose: false,
      position,
    });
  }

  /* =========================================================
     UPDATE PROGRESS TOAST
     ========================================================= */

  function updateProgressToast(
    toastInstance,
    progress,
    message,
    description
  ) {
    if (
      !toastInstance ||
      !toastInstance.element
    ) {
      return;
    }

    const toast =
      toastInstance.element;

    /* =======================================================
       MESSAGE
       ======================================================= */

    if (message !== undefined) {
      const messageElement =
        toast.querySelector(
          ".cf-toast-message"
        );

      if (messageElement) {
        messageElement.textContent =
          message;
      }
    }

    /* =======================================================
       DESCRIPTION
       ======================================================= */

    if (
      description !== undefined
    ) {
      let descriptionElement =
        toast.querySelector(
          ".cf-toast-description"
        );

      if (!descriptionElement) {
        const content =
          toast.querySelector(
            ".cf-toast-content"
          );

        if (content) {
          descriptionElement =
            document.createElement("div");

          descriptionElement.className =
            "cf-toast-description";

          content.appendChild(
            descriptionElement
          );
        }
      }

      if (descriptionElement) {
        descriptionElement.textContent =
          description;
      }
    }

    /* =======================================================
       PROGRESS
       ======================================================= */

    const percentage =
      Math.min(
        100,
        Math.max(
          0,
          Number(progress) || 0
        )
      );

    let progressBar =
      toast.querySelector(
        ".cf-toast-progress-bar"
      );

    if (!progressBar) {
      progressBar =
        document.createElement("div");

      progressBar.className =
        "cf-toast-progress-bar";

      const fill =
        document.createElement("div");

      fill.className =
        "cf-toast-progress-fill";

      progressBar.appendChild(
        fill
      );

      toast.appendChild(
        progressBar
      );
    }

    const fill =
      progressBar.querySelector(
        ".cf-toast-progress-fill"
      );

    if (fill) {
      fill.style.animation =
        "none";

      fill.style.width =
        `${percentage}%`;

      fill.style.transform =
        "none";
    }

    /* =======================================================
       COMPLETE
       ======================================================= */

    if (percentage >= 100) {
      toast.classList.remove(
        "cf-toast-progress"
      );

      toast.classList.add(
        "cf-toast-success"
      );

      const icon =
        toast.querySelector(
          ".cf-toast-icon"
        );

      if (icon) {
        icon.innerHTML =
          icons.success;
      }

      setTimeout(() => {
        removeToast(toast);
      }, 900);
    }
  }

  /* =========================================================
     DISMISS
     ========================================================= */

  function dismissToast(
    toastInstance
  ) {
    if (
      toastInstance &&
      toastInstance.element
    ) {
      removeToast(
        toastInstance.element
      );
    }
  }

  /* =========================================================
     DISMISS ALL
     ========================================================= */

  function dismissAllToasts() {
    POSITIONS.forEach(
      (position) => {
        const container =
          document.getElementById(
            getContainerId(position)
          );

        if (!container) {
          return;
        }

        const toasts =
          container.querySelectorAll(
            ".cf-toast"
          );

        toasts.forEach(
          (toast) => {
            removeToast(toast);
          }
        );
      }
    );
  }

  /* =========================================================
     GLOBAL API
     ========================================================= */

  window.showToast =
    showToast;

  window.showSuccess =
    showSuccess;

  window.showError =
    showError;

  window.showWarning =
    showWarning;

  window.showInfo =
    showInfo;

  window.showProgressToast =
    showProgressToast;

  window.updateProgressToast =
    updateProgressToast;

  window.dismissToast =
    dismissToast;

  window.dismissAllToasts =
    dismissAllToasts;

})(window, document);