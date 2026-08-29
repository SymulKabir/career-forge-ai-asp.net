const state = {
  activeTool: null,
};

const listeners = new Set();

const ResumeState = {
  get activeTool() {
    return state.activeTool;
  },

  setActiveTool(tool) {
    // if (state.activeTool === tool) {
    //   return;
    // }

    const previousState = { ...state };

    state.activeTool = tool;
    console.log("listeners before -->>", listeners);
    listeners.forEach((listener) => {
      listener({ ...state }, previousState);
    });
    console.log("listeners after -->>", listeners);
  },

  subscribe(listener) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  },
};

export default ResumeState;
