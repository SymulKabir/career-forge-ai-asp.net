import ResumeState from "../state.js";

const initToolBarScroll = () => {
  const toolbar = document.getElementById("resumeToolbar");
  const leftBtn = document.getElementById("toolbarScrollLeft");
  const rightBtn = document.getElementById("toolbarScrollRight");
  const fadeLeft = document.getElementById("toolbarFadeLeft");
  const fadeRight = document.getElementById("toolbarFadeRight");

  if (!toolbar) return;

  /* =========================================================
           UPDATE SCROLL STATE
        ========================================================= */

  function updateToolbar() {
    const maxScroll = Math.max(0, toolbar.scrollWidth - toolbar.clientWidth);

    const currentScroll = toolbar.scrollLeft;

    const canScrollLeft = currentScroll > 5;

    const canScrollRight = currentScroll < maxScroll - 5;

    /* LEFT FADE */

    if (fadeLeft) {
      fadeLeft.classList.toggle("opacity-0", !canScrollLeft);

      fadeLeft.classList.toggle("opacity-100", canScrollLeft);
    }

    /* RIGHT FADE */

    if (fadeRight) {
      fadeRight.classList.toggle("opacity-0", !canScrollRight);

      fadeRight.classList.toggle("opacity-100", canScrollRight);
    }

    /* LEFT BUTTON */

    if (leftBtn) {
      leftBtn.classList.toggle("opacity-0", !canScrollLeft);

      leftBtn.classList.toggle("pointer-events-none", !canScrollLeft);

      leftBtn.classList.toggle("opacity-100", canScrollLeft);

      leftBtn.classList.toggle("pointer-events-auto", canScrollLeft);
    }

    /* RIGHT BUTTON */

    if (rightBtn) {
      rightBtn.classList.toggle("opacity-0", !canScrollRight);

      rightBtn.classList.toggle("pointer-events-none", !canScrollRight);

      rightBtn.classList.toggle("opacity-100", canScrollRight);

      rightBtn.classList.toggle("pointer-events-auto", canScrollRight);
    }
  }

  /* =========================================================
           BUTTON SCROLL
        ========================================================= */

  function scrollToolbar(amount) {
    toolbar.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  }

  if (leftBtn) {
    leftBtn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      scrollToolbar(-250);
    });
  }

  if (rightBtn) {
    rightBtn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      scrollToolbar(250);
    });
  }

  /* =========================================================
           MOUSE WHEEL → HORIZONTAL
        ========================================================= */

  toolbar.addEventListener(
    "wheel",
    function (event) {
      /*
       * If vertical wheel is larger,
       * convert it to horizontal scrolling.
       */

      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();

        toolbar.scrollLeft += event.deltaY;
      } else {
        /*
         * Trackpad native horizontal scrolling
         */

        toolbar.scrollLeft += event.deltaX;
      }
    },
    {
      passive: false,
    },
  );

  /* =========================================================
           SHIFT + WHEEL
        ========================================================= */

  toolbar.addEventListener(
    "wheel",
    function (event) {
      if (event.shiftKey) {
        event.preventDefault();

        toolbar.scrollLeft += event.deltaY || event.deltaX;
      }
    },
    {
      passive: false,
    },
  );

  /* =========================================================
           MOUSE DRAG SCROLL
        ========================================================= */

  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;

  toolbar.addEventListener("mousedown", function (event) {
    /*
     * Only left mouse button
     */

    if (event.button !== 0) return;

    isDragging = true;

    startX = event.pageX;

    startScrollLeft = toolbar.scrollLeft;

    toolbar.classList.add("dragging");
  });

  document.addEventListener("mousemove", function (event) {
    if (!isDragging) return;

    event.preventDefault();

    const distance = event.pageX - startX;

    toolbar.scrollLeft = startScrollLeft - distance;
  });

  document.addEventListener("mouseup", function () {
    if (!isDragging) return;

    isDragging = false;

    toolbar.classList.remove("dragging");
  });

  /* =========================================================
           TOUCH SUPPORT
        ========================================================= */

  let touchStartX = 0;
  let touchStartScroll = 0;

  toolbar.addEventListener(
    "touchstart",
    function (event) {
      if (!event.touches.length) return;

      touchStartX = event.touches[0].pageX;

      touchStartScroll = toolbar.scrollLeft;
    },
    {
      passive: true,
    },
  );

  toolbar.addEventListener(
    "touchmove",
    function (event) {
      if (!event.touches.length) return;

      const currentX = event.touches[0].pageX;

      const distance = currentX - touchStartX;

      toolbar.scrollLeft = touchStartScroll - distance;
    },
    {
      passive: true,
    },
  );

  /* =========================================================
           SCROLL EVENT
        ========================================================= */

  toolbar.addEventListener("scroll", updateToolbar, {
    passive: true,
  });

  /* =========================================================
           RESIZE
        ========================================================= */

  window.addEventListener("resize", updateToolbar);

  /* =========================================================
           INITIAL UPDATE
        ========================================================= */

  requestAnimationFrame(function () {
    updateToolbar();
  });

  /*
   * Sometimes fonts/icons load after DOMContentLoaded.
   * Update again after everything is loaded.
   */

  window.addEventListener("load", updateToolbar);
};

const resetAllUi = ({ closeToolBox, toolBox, rearrangeModal, toolbar }) => {
  if (closeToolBox) {
    closeToolBox.classList.remove("right-[-35px]");
  }
  if (toolbar) {
    toolbar
      .querySelectorAll("button.toolbar-btn-active")
      .forEach((activeBtn) => {
        activeBtn.classList.remove("toolbar-btn-active");
      });
  }
  if (toolBox) {
    const childDivs = toolBox.querySelectorAll(":scope > div > div");

    childDivs.forEach((element) => {
      element.classList.add("hidden");
    });
    toolBox.classList.remove("left-[0px]");
  }
  if (rearrangeModal) {
    rearrangeModal.classList.add("hidden");
  }
};
const toolBoxToggle = ({ toolBox, childId }) => {
  if (toolBox) {
    toolBox.classList.toggle("left-[0px]");
    const childElement = document.getElementById(childId);
    if (childElement) {
      childElement.classList.toggle("hidden");
    }
  }
};
const rearrangeModalToggle = (rearrangeModal) => {
  if (rearrangeModal) {
    rearrangeModal.classList.toggle("hidden");
  }
};
const setupResumeToolbar = () => {
  const closeToolBox = document.getElementById("closeToolBox");
  const toolbar = document.querySelector("#resumeToolbar");
  const toolBox = document.querySelector("#toolBox");
  const rearrangeModal = document.querySelector("#rearrangeModal");

  if (!toolbar) return;

  const toolBarItems = toolbar.querySelectorAll("button");

  toolBarItems.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();

      const actionGroup = btn.getAttribute("action-group");
      const childId = btn.getAttribute("child-id");

      resetAllUi({ toolBox, rearrangeModal, closeToolBox, toolbar });
      btn.classList.add("toolbar-btn-active");
      console.log("Before:", ResumeState.activeTool);

      ResumeState.setActiveTool(childId);

      console.log("After:", ResumeState.activeTool);
      setTimeout(() => {
        if (actionGroup === "ToolBox") {
          closeToolBox.classList.add("right-[-35px]");

          toolBoxToggle({ toolBox, childId });
        } else if (actionGroup === "Rearrange") {
          rearrangeModalToggle(rearrangeModal);
        }
      }, 300);
    });
  });
};

const setupResumeState = () => {
  ResumeState.subscribe((state, previousState) => {
    console.log("🔥 SUBSCRIBER FIRED");

    if (state.activeTool === previousState.activeTool) {
      return;
    }

    console.log("Active tool changed");
  });
};

const init = () => {
  setupResumeState();
  initToolBarScroll();
  setupResumeToolbar();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
