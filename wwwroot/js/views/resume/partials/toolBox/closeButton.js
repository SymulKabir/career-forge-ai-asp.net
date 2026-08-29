const initCloseButton = () => {
  const closeToolBox = document.getElementById("closeToolBox");
  const toolBox = document.getElementById("toolBox");
  const toolbar = document.querySelector("#resumeToolbar");

  if (!closeToolBox || !toolBox) {
    return;
  }
  console.log("toolbar --->>>", toolbar)
  if (toolbar) {
    toolbar
      .querySelectorAll("button.toolbar-btn-active")
      .forEach((activeBtn) => {
        activeBtn.classList.remove("toolbar-btn-active");
      });
  }
  closeToolBox.addEventListener("click", () => {
    const childDivs = toolBox.querySelectorAll(":scope > div > div");
    childDivs.forEach((element) => {
      element.classList.add("hidden");
    });
    closeToolBox.classList.remove("right-[-35px]");
    toolBox.classList.remove("left-[0px]");
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCloseButton, {
    once: true,
  });
} else {
  initCloseButton();
}
