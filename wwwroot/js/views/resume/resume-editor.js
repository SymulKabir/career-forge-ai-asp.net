document.addEventListener("DOMContentLoaded", () => {

    const paper = document.getElementById("resumePaper");
    const paperWrap = document.getElementById("paperWrap");

    const zoomInBtn = document.getElementById("zoomIn");
    const zoomOutBtn = document.getElementById("zoomOut");
    const zoomLabel = document.getElementById("zoomLabel");

    const addSectionBtn = document.getElementById("addSectionBtn");

    const sectionEditor = document.getElementById("sectionEditor");
    const sectionEditorContent =
        document.getElementById("sectionEditorContent");

    const closeSectionEditor =
        document.getElementById("closeSectionEditor");


    /*
     * ---------------------------------------------------------
     * STATE
     * ---------------------------------------------------------
     */

    const state = structuredClone(window.ResumeEditorData);

    let selectedSectionId = null;

    let history = [];
    let historyIndex = -1;


    /*
     * ---------------------------------------------------------
     * HELPERS
     * ---------------------------------------------------------
     */

    const escapeHtml = value => {

        if (value === null || value === undefined)
            return "";

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    };


    const getSection = id =>
        state.sections.find(section => section.id === id);


    const snapshot = () =>
        JSON.stringify(state);


    function saveHistory() {

        history = history.slice(0, historyIndex + 1);

        history.push(snapshot());

        historyIndex++;

        if (history.length > 50) {
            history.shift();
            historyIndex--;
        }
    }


    function restoreHistory(index) {

        if (index < 0 || index >= history.length)
            return;

        Object.assign(
            state,
            JSON.parse(history[index])
        );

        render();
    }


    /*
     * ---------------------------------------------------------
     * RENDER
     * ---------------------------------------------------------
     */

    function render() {

        paper.innerHTML = "";

        applySettings();

        renderHeader();

        state.sections
            .filter(section => section.visible !== false)
            .forEach(section => {
                paper.appendChild(
                    renderSection(section)
                );
            });

        attachInteractions();

        updateZoom();

        saveToStorage();
    }


    /*
     * ---------------------------------------------------------
     * SETTINGS
     * ---------------------------------------------------------
     */

    function applySettings() {

        paper.style.setProperty(
            "--accent",
            state.settings.accent
        );

        paper.style.fontFamily =
            state.settings.fontFamily;

        paper.style.setProperty(
            "--cv-font-size",
            `${state.settings.fontSize}px`
        );

        paper.style.setProperty(
            "--cv-line-height",
            state.settings.lineHeight
        );

        paper.dataset.template =
            state.meta.template;
    }


    /*
     * ---------------------------------------------------------
     * HEADER
     * ---------------------------------------------------------
     */

    function renderHeader() {

        const header = document.createElement("header");

        header.className =
            "resume-header px-10 pt-10 pb-5";

        header.dataset.area = "header";

        const contact = state.personal.contact;

        const contacts = [
            contact.email,
            contact.phone,
            contact.location,
            contact.linkedin,
            contact.website,
            contact.github
        ]
            .filter(Boolean)
            .map(escapeHtml)
            .join("<br>");

        header.innerHTML = `

            <div class="flex items-start justify-between gap-5">

                <div>

                    <h1
                        class="resume-editable text-[32px]
                               font-extrabold tracking-tight"
                        contenteditable="true"
                        data-path="personal.name">

                        ${escapeHtml(state.personal.name)}

                    </h1>

                    <p
                        class="resume-editable mt-1 text-sm
                               font-semibold"
                        style="color:var(--accent)"
                        contenteditable="true"
                        data-path="personal.role">

                        ${escapeHtml(state.personal.role)}

                    </p>

                </div>

                <div
                    class="contact-light max-w-[220px]
                           text-right text-[10px]
                           leading-5 text-slate-500">

                    ${contacts}

                </div>

            </div>

            <div
                class="mt-5 h-1 rounded-full"
                style="background:var(--accent)">
            </div>
        `;

        paper.appendChild(header);
    }


    /*
     * ---------------------------------------------------------
     * SECTION RENDERER
     * ---------------------------------------------------------
     */

    function renderSection(section) {

        const wrapper = document.createElement("section");

        wrapper.className =
            "resume-section cv-section relative px-10 mt-7";

        wrapper.dataset.sectionId = section.id;

        wrapper.draggable = !section.locked;


        wrapper.innerHTML = `

            <div class="section-controls">

                <button
                    type="button"
                    class="section-edit"
                    data-action="edit-section"
                    title="Edit section">

                    ✎

                </button>

                <button
                    type="button"
                    class="section-drag"
                    title="Drag section">

                    ⠿

                </button>

                <button
                    type="button"
                    class="section-delete"
                    data-action="delete-section"
                    title="Delete section">

                    ×

                </button>

            </div>

            <div class="flex items-center justify-between">

                <h3
                    class="section-title text-[11px]
                           font-extrabold uppercase
                           tracking-[.16em]">

                    ${escapeHtml(section.title)}

                </h3>

            </div>

            <div class="section-content mt-3"></div>
        `;


        const content =
            wrapper.querySelector(".section-content");


        switch (section.type) {

            case "summary":
                renderSummary(content, section);
                break;

            case "experience":
                renderExperience(content, section);
                break;

            case "education":
                renderEducation(content, section);
                break;

            case "skills":
                renderSkills(content, section);
                break;

            case "projects":
                renderProjects(content, section);
                break;

            case "custom":
                renderCustom(content, section);
                break;

            default:
                renderCustom(content, section);
        }


        return wrapper;
    }


    /*
     * ---------------------------------------------------------
     * SUMMARY
     * ---------------------------------------------------------
     */

    function renderSummary(container, section) {

        container.innerHTML = `

            <p
                class="resume-editable text-[10.5px]
                       leading-5 text-slate-600"
                contenteditable="true"
                data-section-id="${section.id}"
                data-field="text">

                ${escapeHtml(section.content?.text || "")}

            </p>
        `;
    }


    /*
     * ---------------------------------------------------------
     * EXPERIENCE
     * ---------------------------------------------------------
     */

    function renderExperience(container, section) {

        container.className =
            "section-content mt-3 space-y-4";

        section.items.forEach(item => {

            const element =
                document.createElement("div");

            element.className =
                "cv-item resume-item relative";

            element.dataset.itemId = item.id;

            element.innerHTML = `

                <div class="flex justify-between gap-4">

                    <div>

                        <div
                            class="resume-editable text-[11px]
                                   font-bold"
                            contenteditable="true"
                            data-section-id="${section.id}"
                            data-item-id="${item.id}"
                            data-field="position">

                            ${escapeHtml(item.position)}

                        </div>

                        <div
                            class="resume-editable text-[9px]
                                   text-slate-500"
                            contenteditable="true"
                            data-section-id="${section.id}"
                            data-item-id="${item.id}"
                            data-field="company">

                            ${escapeHtml(item.company)}
                            ${item.location ? " · " + escapeHtml(item.location) : ""}

                        </div>

                    </div>

                    <div
                        class="resume-editable text-[9px]
                               text-slate-400"
                        contenteditable="true"
                        data-section-id="${section.id}"
                        data-item-id="${item.id}"
                        data-field="dates">

                        ${escapeHtml(item.startDate)}
                        — ${escapeHtml(item.endDate)}

                    </div>

                </div>

                <ul
                    class="mt-2 list-disc space-y-1
                           pl-4 text-[9.5px]
                           leading-4 text-slate-600">

                    ${item.description.map((description, index) => `

                        <li
                            class="resume-editable"
                            contenteditable="true"
                            data-section-id="${section.id}"
                            data-item-id="${item.id}"
                            data-field="description"
                            data-index="${index}">

                            ${escapeHtml(description)}

                        </li>

                    `).join("")}

                </ul>

            `;

            container.appendChild(element);
        });


        const addButton =
            createAddItemButton(section.id);

        container.appendChild(addButton);
    }


    /*
     * ---------------------------------------------------------
     * EDUCATION
     * ---------------------------------------------------------
     */

    function renderEducation(container, section) {

        container.className =
            "section-content mt-3 space-y-4";

        section.items.forEach(item => {

            const element =
                document.createElement("div");

            element.className =
                "resume-item";

            element.innerHTML = `

                <div class="flex justify-between gap-4">

                    <div>

                        <div
                            class="resume-editable text-[11px]
                                   font-bold"
                            contenteditable="true"
                            data-section-id="${section.id}"
                            data-item-id="${item.id}"
                            data-field="degree">

                            ${escapeHtml(item.degree)}

                        </div>

                        <div
                            class="resume-editable text-[9px]
                                   text-slate-500"
                            contenteditable="true"
                            data-section-id="${section.id}"
                            data-item-id="${item.id}"
                            data-field="institution">

                            ${escapeHtml(item.institution)}

                        </div>

                    </div>

                    <div
                        class="resume-editable text-[9px]
                               text-slate-400"
                        contenteditable="true"
                        data-section-id="${section.id}"
                        data-item-id="${item.id}"
                        data-field="dates">

                        ${escapeHtml(item.startDate)}
                        — ${escapeHtml(item.endDate)}

                    </div>

                </div>
            `;

            container.appendChild(element);
        });

        container.appendChild(
            createAddItemButton(section.id)
        );
    }


    /*
     * ---------------------------------------------------------
     * SKILLS
     * ---------------------------------------------------------
     */

    function renderSkills(container, section) {

        container.className =
            "section-content mt-3 flex flex-wrap gap-1.5";

        section.items.forEach((skill, index) => {

            const span =
                document.createElement("span");

            span.className =
                "resume-skill rounded bg-violet-50 px-2 py-1 " +
                "text-[8.5px] font-semibold";

            span.style.color =
                "var(--accent)";

            span.contentEditable = true;

            span.dataset.sectionId =
                section.id;

            span.dataset.index =
                index;

            span.textContent =
                skill;

            container.appendChild(span);
        });


        container.appendChild(
            createAddItemButton(section.id)
        );
    }


    /*
     * ---------------------------------------------------------
     * PROJECTS
     * ---------------------------------------------------------
     */

    function renderProjects(container, section) {

        container.className =
            "section-content mt-3 space-y-3";

        section.items.forEach(item => {

            const element =
                document.createElement("div");

            element.innerHTML = `

                <div
                    class="resume-editable text-[10px]
                           font-bold"
                    contenteditable="true"
                    data-section-id="${section.id}"
                    data-item-id="${item.id}"
                    data-field="name">

                    ${escapeHtml(item.name)}

                </div>

                <p
                    class="resume-editable text-[9px]
                           leading-4 text-slate-600"
                    contenteditable="true"
                    data-section-id="${section.id}"
                    data-item-id="${item.id}"
                    data-field="description">

                    ${escapeHtml(item.description)}

                </p>

            `;

            container.appendChild(element);
        });

        container.appendChild(
            createAddItemButton(section.id)
        );
    }


    /*
     * ---------------------------------------------------------
     * CUSTOM
     * ---------------------------------------------------------
     */

    function renderCustom(container, section) {

        container.innerHTML = `

            <div
                class="resume-editable text-[10px]
                       leading-5 text-slate-600"
                contenteditable="true"
                data-section-id="${section.id}"
                data-field="text">

                ${escapeHtml(section.content?.text || "")}

            </div>

        `;
    }


    /*
     * ---------------------------------------------------------
     * ADD ITEM
     * ---------------------------------------------------------
     */

    function createAddItemButton(sectionId) {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "add-item mt-2 rounded-md border " +
            "border-dashed border-slate-300 px-2 py-1 " +
            "text-[9px] text-slate-400 " +
            "hover:border-violet-400 hover:text-violet-600";

        button.textContent =
            "+ Add";

        button.dataset.sectionId =
            sectionId;

        return button;
    }


    /*
     * ---------------------------------------------------------
     * INLINE EDITING
     * ---------------------------------------------------------
     */

    function attachInteractions() {

        paper.querySelectorAll(
            "[contenteditable='true']"
        ).forEach(element => {

            element.addEventListener(
                "focus",
                () => {
                    element.classList.add(
                        "resume-editing"
                    );
                }
            );


            element.addEventListener(
                "blur",
                () => {

                    element.classList.remove(
                        "resume-editing"
                    );

                    updateFromElement(element);

                }
            );


            element.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter" &&
                        !event.shiftKey
                    ) {

                        if (
                            element.tagName !== "LI"
                        ) {
                            event.preventDefault();
                            element.blur();
                        }
                    }
                }
            );
        });


        /*
         * Section controls
         */

        paper.querySelectorAll(
            "[data-action='edit-section']"
        ).forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    openSectionEditor(
                        button.closest(".resume-section")
                    );
                }
            );
        });


        paper.querySelectorAll(
            "[data-action='delete-section']"
        ).forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    deleteSection(
                        button.closest(".resume-section")
                            .dataset.sectionId
                    );
                }
            );
        });


        /*
         * Add item
         */

        paper.querySelectorAll(
            ".add-item"
        ).forEach(button => {

            button.addEventListener(
                "click",
                () => addItem(button.dataset.sectionId)
            );
        });


        /*
         * Drag/drop
         */

        attachDragDrop();
    }


    /*
     * ---------------------------------------------------------
     * UPDATE DATA FROM INLINE EDITOR
     * ---------------------------------------------------------
     */

    function updateFromElement(element) {

        const sectionId =
            element.dataset.sectionId;

        const itemId =
            element.dataset.itemId;

        const field =
            element.dataset.field;

        const path =
            element.dataset.path;

        const value =
            element.innerText.trim();


        saveHistory();


        /*
         * Personal data
         */

        if (path) {

            if (path === "personal.name") {
                state.personal.name = value;
            }

            if (path === "personal.role") {
                state.personal.role = value;
            }

            render();

            return;
        }


        /*
         * Section
         */

        if (!sectionId)
            return;

        const section =
            getSection(sectionId);

        if (!section)
            return;


        /*
         * Skills
         */

        if (
            section.type === "skills" &&
            element.dataset.index !== undefined
        ) {

            section.items[
                Number(element.dataset.index)
            ] = value;

            return;
        }


        /*
         * Section content
         */

        if (!itemId) {

            if (!section.content)
                section.content = {};

            section.content[field] =
                value;

            return;
        }


        /*
         * Item
         */

        const item =
            section.items.find(
                x => x.id === itemId
            );

        if (!item)
            return;


        if (field === "description") {

            item.description[
                Number(element.dataset.index)
            ] = value;

        } else if (field === "dates") {

            const parts =
                value.split("—");

            item.startDate =
                parts[0]?.trim() || "";

            item.endDate =
                parts[1]?.trim() || "";

        } else {

            item[field] = value;
        }
    }


    /*
     * ---------------------------------------------------------
     * DRAG & DROP
     * ---------------------------------------------------------
     */

    function attachDragDrop() {

        let draggedId = null;

        paper.querySelectorAll(
            ".resume-section"
        ).forEach(section => {

            section.addEventListener(
                "dragstart",
                event => {

                    draggedId =
                        section.dataset.sectionId;

                    section.classList.add(
                        "dragging"
                    );

                    event.dataTransfer.effectAllowed =
                        "move";
                }
            );


            section.addEventListener(
                "dragend",
                () => {

                    section.classList.remove(
                        "dragging"
                    );

                    draggedId = null;
                }
            );


            section.addEventListener(
                "dragover",
                event => {

                    event.preventDefault();

                    section.classList.add(
                        "drag-over"
                    );
                }
            );


            section.addEventListener(
                "dragleave",
                () => {

                    section.classList.remove(
                        "drag-over"
                    );
                }
            );


            section.addEventListener(
                "drop",
                event => {

                    event.preventDefault();

                    section.classList.remove(
                        "drag-over"
                    );

                    if (!draggedId)
                        return;

                    if (
                        draggedId ===
                        section.dataset.sectionId
                    )
                        return;


                    reorderSections(
                        draggedId,
                        section.dataset.sectionId
                    );
                }
            );
        });
    }


    function reorderSections(
        draggedId,
        targetId
    ) {

        saveHistory();

        const fromIndex =
            state.sections.findIndex(
                x => x.id === draggedId
            );

        const toIndex =
            state.sections.findIndex(
                x => x.id === targetId
            );

        if (
            fromIndex === -1 ||
            toIndex === -1
        )
            return;


        const [section] =
            state.sections.splice(
                fromIndex,
                1
            );

        state.sections.splice(
            toIndex,
            0,
            section
        );

        render();
    }


    /*
     * ---------------------------------------------------------
     * DELETE SECTION
     * ---------------------------------------------------------
     */

    function deleteSection(id) {

        const section =
            getSection(id);

        if (!section || section.locked)
            return;

        if (
            !confirm(
                `Delete "${section.title}" section?`
            )
        )
            return;

        saveHistory();

        state.sections =
            state.sections.filter(
                x => x.id !== id
            );

        render();
    }


    /*
     * ---------------------------------------------------------
     * ADD SECTION
     * ---------------------------------------------------------
     */

    function addSection() {

        const section = {

            id:
                `custom-${Date.now()}`,

            type:
                "custom",

            title:
                "New Section",

            visible:
                true,

            locked:
                false,

            content: {
                text:
                    "Click here to edit this section."
            }
        };


        saveHistory();

        state.sections.push(section);

        render();


        setTimeout(() => {

            openSectionEditor(
                paper.querySelector(
                    `[data-section-id="${section.id}"]`
                )
            );

        }, 50);
    }


    addSectionBtn.addEventListener(
        "click",
        addSection
    );


    /*
     * ---------------------------------------------------------
     * ADD ITEM
     * ---------------------------------------------------------
     */

    function addItem(sectionId) {

        const section =
            getSection(sectionId);

        if (!section)
            return;

        saveHistory();


        if (section.type === "experience") {

            section.items.push({

                id:
                    `exp-${Date.now()}`,

                position:
                    "New Position",

                company:
                    "Company",

                location:
                    "",

                startDate:
                    "2026",

                endDate:
                    "Present",

                description: [
                    "Describe your achievement."
                ]
            });
        }


        else if (section.type === "education") {

            section.items.push({

                id:
                    `edu-${Date.now()}`,

                degree:
                    "Degree",

                institution:
                    "Institution",

                location:
                    "",

                startDate:
                    "2022",

                endDate:
                    "2026"
            });
        }


        else if (section.type === "skills") {

            section.items.push(
                "New Skill"
            );
        }


        else if (section.type === "projects") {

            section.items.push({

                id:
                    `project-${Date.now()}`,

                name:
                    "New Project",

                description:
                    "Project description."
            });
        }


        render();
    }


    /*
     * ---------------------------------------------------------
     * SECTION EDITOR
     * ---------------------------------------------------------
     */

    function openSectionEditor(element) {

        if (!element)
            return;

        selectedSectionId =
            element.dataset.sectionId;

        const section =
            getSection(selectedSectionId);

        if (!section)
            return;


        sectionEditorContent.innerHTML = `

            <div class="space-y-4">

                <div>

                    <label
                        class="mb-1 block text-xs
                               font-semibold text-slate-600">

                        Section title

                    </label>

                    <input
                        id="sectionTitleInput"
                        value="${escapeHtml(section.title)}"
                        class="w-full rounded-lg border
                               border-slate-200 px-3 py-2
                               text-sm outline-none
                               focus:border-violet-500"
                    />

                </div>


                <div>

                    <label
                        class="mb-1 block text-xs
                               font-semibold text-slate-600">

                        Section type

                    </label>

                    <select
                        id="sectionTypeInput"
                        class="w-full rounded-lg border
                               border-slate-200 px-3 py-2
                               text-sm">

                        <option value="summary"
                            ${section.type === "summary" ? "selected" : ""}>
                            Summary
                        </option>

                        <option value="experience"
                            ${section.type === "experience" ? "selected" : ""}>
                            Experience
                        </option>

                        <option value="education"
                            ${section.type === "education" ? "selected" : ""}>
                            Education
                        </option>

                        <option value="skills"
                            ${section.type === "skills" ? "selected" : ""}>
                            Skills
                        </option>

                        <option value="projects"
                            ${section.type === "projects" ? "selected" : ""}>
                            Projects
                        </option>

                        <option value="custom"
                            ${section.type === "custom" ? "selected" : ""}>
                            Custom
                        </option>

                    </select>

                </div>


                <label
                    class="flex items-center gap-2
                           text-xs text-slate-600">

                    <input
                        id="sectionVisibleInput"
                        type="checkbox"
                        ${section.visible ? "checked" : ""}>

                    Show section

                </label>


                <button
                    id="saveSectionBtn"
                    type="button"
                    class="w-full rounded-lg
                           bg-violet-600 px-4 py-2
                           text-sm font-bold text-white
                           hover:bg-violet-700">

                    Save Section

                </button>

            </div>
        `;


        sectionEditor.classList.remove(
            "hidden"
        );


        document
            .getElementById("saveSectionBtn")
            .addEventListener(
                "click",
                saveSectionEditor
            );
    }


    function saveSectionEditor() {

        const section =
            getSection(selectedSectionId);

        if (!section)
            return;


        saveHistory();


        section.title =
            document
                .getElementById("sectionTitleInput")
                .value
                .trim();


        section.type =
            document
                .getElementById("sectionTypeInput")
                .value;


        section.visible =
            document
                .getElementById("sectionVisibleInput")
                .checked;


        sectionEditor.classList.add(
            "hidden"
        );

        render();
    }


    closeSectionEditor.addEventListener(
        "click",
        () => {
            sectionEditor.classList.add(
                "hidden"
            );
        }
    );


    /*
     * ---------------------------------------------------------
     * ZOOM
     * ---------------------------------------------------------
     */

    function updateZoom() {

        const zoom =
            state.meta.zoom;

        const scale =
            zoom / 100;

        paperWrap.style.transform =
            `scale(${scale})`;

        paperWrap.style.transformOrigin =
            "top center";

        zoomLabel.textContent =
            `${zoom}%`;
    }


    zoomInBtn.addEventListener(
        "click",
        () => {

            state.meta.zoom =
                Math.min(
                    150,
                    state.meta.zoom + 5
                );

            updateZoom();
        }
    );


    zoomOutBtn.addEventListener(
        "click",
        () => {

            state.meta.zoom =
                Math.max(
                    40,
                    state.meta.zoom - 5
                );

            updateZoom();
        }
    );


    /*
     * ---------------------------------------------------------
     * LOCAL STORAGE
     * ---------------------------------------------------------
     */

    function saveToStorage() {

        localStorage.setItem(
            "careerforge-resume",
            JSON.stringify(state)
        );
    }


    function loadFromStorage() {

        const saved =
            localStorage.getItem(
                "careerforge-resume"
            );

        if (!saved)
            return;

        try {

            const data =
                JSON.parse(saved);

            Object.assign(
                state,
                data
            );

        } catch (error) {

            console.error(
                "Failed to load resume",
                error
            );
        }
    }


    /*
     * ---------------------------------------------------------
     * KEYBOARD SHORTCUTS
     * ---------------------------------------------------------
     */

    document.addEventListener(
        "keydown",
        event => {

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "z"
            ) {

                event.preventDefault();

                if (historyIndex > 0) {

                    historyIndex--;

                    restoreHistory(
                        historyIndex
                    );
                }
            }


            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "y"
            ) {

                event.preventDefault();

                if (
                    historyIndex <
                    history.length - 1
                ) {

                    historyIndex++;

                    restoreHistory(
                        historyIndex
                    );
                }
            }
        }
    );


    /*
     * ---------------------------------------------------------
     * INITIALIZE
     * ---------------------------------------------------------
     */

    loadFromStorage();

    saveHistory();

    render();


    /*
     * Public API
     */

    window.ResumeEditor = {

        getData() {
            return structuredClone(state);
        },

        setData(data) {

            Object.assign(
                state,
                structuredClone(data)
            );

            render();
        },

        save() {

            return JSON.stringify(
                state
            );
        },

        render
    };

});