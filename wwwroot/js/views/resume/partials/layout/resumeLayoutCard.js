import ResumeState from "../../state.js";

/* =========================================================
   STATE
========================================================= */

let modal = null;
let closeBtn = null;
let cancelBtn = null;
let saveBtn = null;
let layoutJson = null;
let status = null;

let draggedCard = null;
let originalLayout = null;


/* =========================================================
   INITIALIZE DOM REFERENCES
========================================================= */

const initElements = () => {
    modal = document.getElementById("rearrangeModal");
    closeBtn = document.getElementById("closeRearrangeModal");
    cancelBtn = document.getElementById("cancelRearrange");
    saveBtn = document.getElementById("saveRearrange");
    layoutJson = document.getElementById("resumeLayoutJson");
    status = document.getElementById("layoutStatus");
};


/* =========================================================
   OPEN MODAL
========================================================= */

export const openRearrangeModal = () => {
    if (!modal) return;

    originalLayout = getLayout();

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    document.body.classList.add("overflow-hidden");
};


/* =========================================================
   CLOSE MODAL
========================================================= */

export const closeRearrangeModal = () => {
    if (!modal) return;
    ResumeState.setActiveTool(null); 
};


/* =========================================================
   CANCEL REARRANGE
========================================================= */

export const cancelRearrange = () => {
    closeRearrangeModal();
};


/* =========================================================
   DRAG START
========================================================= */

const handleDragStart = (event) => {
    const card = event.target.closest(".layout-card");

    if (!card) return;

    if (card.getAttribute("draggable") !== "true") {
        event.preventDefault();
        return;
    }

    draggedCard = card;

    card.classList.add(
        "opacity-40",
        "scale-[0.98]"
    );

    event.dataTransfer.effectAllowed = "move";

    event.dataTransfer.setData(
        "text/plain",
        card.dataset.id
    );
};


/* =========================================================
   DRAG END
========================================================= */

const handleDragEnd = (event) => {
    const card = event.target.closest(".layout-card");

    if (!card) return;

    card.classList.remove(
        "opacity-40",
        "scale-[0.98]"
    );

    draggedCard = null;

    clearDropStates();
};


/* =========================================================
   DRAG OVER
========================================================= */

const handleDragOver = (event) => {
    const column = event.target.closest(".layout-column");

    if (!column || !draggedCard) return;

    event.preventDefault();

    event.dataTransfer.dropEffect = "move";

    column.classList.add(
        "bg-violet-50/60",
        "rounded-lg"
    );
};


/* =========================================================
   DRAG LEAVE
========================================================= */

const handleDragLeave = (event) => {
    const column = event.target.closest(".layout-column");

    if (!column) return;

    if (!column.contains(event.relatedTarget)) {
        column.classList.remove(
            "bg-violet-50/60",
            "rounded-lg"
        );
    }
};


/* =========================================================
   DROP
========================================================= */

const handleDrop = (event) => {
    const column = event.target.closest(".layout-column");

    if (!column || !draggedCard) return;

    event.preventDefault();

    const targetCard =
        event.target.closest(".layout-card");

    /*
     * Prevent dropping onto itself
     */
    if (targetCard === draggedCard) {
        clearDropStates();
        return;
    }

    /*
     * Drop before/after target card
     */
    if (
        targetCard &&
        targetCard.parentElement === column
    ) {
        moveCardAroundTarget(
            column,
            targetCard,
            event
        );
    } else {
        /*
         * Drop at end of column
         */
        moveCardToEnd(
            column,
            draggedCard
        );
    }

    clearDropStates();

    updateStatus(
        "Layout changed. Click Save layout to apply."
    );

    updateLayoutJson();
};


/* =========================================================
   MOVE CARD AROUND TARGET
========================================================= */

const moveCardAroundTarget = (
    column,
    targetCard,
    event
) => {
    const rect =
        targetCard.getBoundingClientRect();

    const insertBefore =
        event.clientY <
        rect.top + rect.height / 2;

    if (insertBefore) {
        column.insertBefore(
            draggedCard,
            targetCard
        );

        return;
    }

    column.insertBefore(
        draggedCard,
        targetCard.nextSibling
    );
};


/* =========================================================
   MOVE CARD TO END
========================================================= */

const moveCardToEnd = (
    column,
    card
) => {
    column.appendChild(card);
};


/* =========================================================
   CLEAR DROP STATES
========================================================= */

const clearDropStates = () => {
    document
        .querySelectorAll(".layout-column")
        .forEach((column) => {
            column.classList.remove(
                "bg-violet-50/60",
                "rounded-lg"
            );
        });
};


/* =========================================================
   GET CURRENT LAYOUT
========================================================= */

export const getLayout = () => {
    const layout = [];

    document
        .querySelectorAll(".layout-page")
        .forEach((page) => {

            const pageNumber =
                Number(page.dataset.page);

            page
                .querySelectorAll(".layout-column")
                .forEach((column) => {

                    const columnName =
                        column.dataset.column;

                    column
                        .querySelectorAll(".layout-card")
                        .forEach((card, index) => {

                            layout.push({
                                id: card.dataset.id,
                                section: card.dataset.section,
                                title: card.dataset.title,
                                page: pageNumber,
                                column: columnName,
                                order: index
                            });

                        });
                });
        });

    return layout;
};


/* =========================================================
   UPDATE LAYOUT JSON
========================================================= */

const updateLayoutJson = () => {
    if (!layoutJson) return;

    const layout = getLayout();

    layoutJson.value =
        JSON.stringify(layout);
};


/* =========================================================
   UPDATE STATUS
========================================================= */

const updateStatus = (message) => {
    if (!status) return;

    status.textContent = message;
};


/* =========================================================
   SAVE LAYOUT
========================================================= */

const saveLayout = async () => {
    const layout = getLayout();

    if (layoutJson) {
        layoutJson.value =
            JSON.stringify(layout);
    }

    console.log(
        "FINAL RESUME LAYOUT:",
        layout
    );

    /*
     * Send this to ASP.NET when ready:
     *
     * await fetch('/Resume/SaveLayout', {
     *     method: 'POST',
     *     headers: {
     *         'Content-Type': 'application/json'
     *     },
     *     body: JSON.stringify(layout)
     * });
     */

    updateStatus("Layout saved.");

    setTimeout(() => {
        closeRearrangeModal();
    }, 400);
};


/* =========================================================
   SETUP MODAL EVENTS
========================================================= */

const setupModalEvents = () => {
    closeBtn?.addEventListener(
        "click",
        closeRearrangeModal
    );

    cancelBtn?.addEventListener(
        "click",
        cancelRearrange
    );

    saveBtn?.addEventListener(
        "click",
        saveLayout
    );
};


/* =========================================================
   SETUP DRAG EVENTS
========================================================= */

const setupDragEvents = () => {
    document.addEventListener(
        "dragstart",
        handleDragStart
    );

    document.addEventListener(
        "dragend",
        handleDragEnd
    );

    document.addEventListener(
        "dragover",
        handleDragOver
    );

    document.addEventListener(
        "dragleave",
        handleDragLeave
    );

    document.addEventListener(
        "drop",
        handleDrop
    );
};


/* =========================================================
   SETUP GLOBAL API
========================================================= */

const setupGlobalApi = () => {
    window.getResumeLayout = getLayout;
};


/* =========================================================
   INITIALIZE
========================================================= */

const init = () => {
    initElements();

    setupModalEvents();

    setupDragEvents();

    setupGlobalApi();
};


/* =========================================================
   DOM READY
========================================================= */

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        init,
        { once: true }
    );
} else {
    init();
}
