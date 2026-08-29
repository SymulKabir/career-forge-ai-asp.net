import ResumeState from "../../state.js";
const initCloseButton = () => {
  const closeToolBox = document.getElementById("closeToolBox");
  closeToolBox.addEventListener("click", () => {
    ResumeState.setActiveTool(null);
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCloseButton, {
    once: true,
  });
} else {
  initCloseButton();
}
