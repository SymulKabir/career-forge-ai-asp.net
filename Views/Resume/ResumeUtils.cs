using CareerForgeAI.Resume.Models;

namespace CareerForgeAI.Resume
{
    public static class ResumeUtils
    {
        public const string HeaderHeight = "65px";
        public const string HeaderHeight2 = "605px";
        public const string ToolBarHeight = "45px";

        public static class EditorShell
        {
            public const string LeftSectionWidth = "350px";
            public const string MiddleSectionWidth = "900px";
        }
        public static readonly List<Dictionary<string, string>> ToolItems = new()
        {
            new()
            {
                ["Title"] = "AI Assistant",
                ["IconClass"] = "bg-white/15",
                ["ButtonClass"] = "text-slate-600 hover:bg-slate-50 hover:text-violet-600",
                ["ActionGroup"] = "ToolBox",
                ["ChildId"] = "aiAssistant",
                ["Badge"] = "",
                ["Icon"] = """
                    <svg class="h-3 w-3 sm:h-3.5 sm:w-3.5"
                         fill="none"
                         stroke="currentColor"
                         stroke-width="1.8"
                         viewBox="0 0 24 24">
                        <path stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                        <circle cx="12" cy="12" r="4" />
                    </svg>
                """
            },

            new()
            {
                ["Title"] = "Fix Resume",
                ["IconClass"] = "bg-emerald-50 text-emerald-600",
                ["ButtonClass"] = "text-slate-600 hover:bg-slate-50 hover:text-violet-600",
                ["ActionGroup"] = "ToolBox",
                ["ChildId"] = "fixResumePanel",
                ["Badge"] = "B-",
                ["Icon"] = """
                    <svg class="h-3 w-3 sm:h-3.5 sm:w-3.5"
                         fill="none"
                         stroke="currentColor"
                         stroke-width="1.8"
                         viewBox="0 0 24 24">
                        <path stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m5 12 4 4L19 6" />
                    </svg>
                """
            },

            new()
            {
                ["Title"] = "Check & Tailor",
                ["IconClass"] = "bg-blue-50 text-blue-600",
                ["ButtonClass"] = "text-slate-600 hover:bg-slate-50 hover:text-violet-600",
                ["ActionGroup"] = "ToolBox",
                ["ChildId"] = "checkTailorPanel",
                ["Badge"] = "",
                ["Icon"] = """
                    <svg class="h-3 w-3 sm:h-3.5 sm:w-3.5"
                         fill="none"
                         stroke="currentColor"
                         stroke-width="1.8"
                         viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="6" />
                        <path stroke-linecap="round" d="m16 16 4 4" />
                        <path stroke-linecap="round" d="M8.5 11h5M11 8.5v5" />
                    </svg>
                """
            },

            new()
            {
                ["Title"] = "Rearrange",
                ["IconClass"] = "bg-orange-50 text-orange-500",
                ["ButtonClass"] = "text-slate-600 hover:bg-slate-50 hover:text-violet-600",
                ["ActionGroup"] = "Rearrange",
                ["ChildId"] = "",
                ["Badge"] = "",
                ["Icon"] = """
                    <svg class="h-3 w-3 sm:h-3.5 sm:w-3.5"
                         fill="none"
                         stroke="currentColor"
                         stroke-width="1.8"
                         viewBox="0 0 24 24">
                        <path stroke-linecap="round"
                              d="M8 7h12M4 7h.01M4 12h.01M8 12h12M4 17h.01M8 17h12" />
                    </svg>
                """
            },

            new()
            {
                ["Title"] = "Templates",
                ["IconClass"] = "bg-pink-50 text-pink-500",
                ["ButtonClass"] = "text-slate-600 hover:bg-slate-50 hover:text-violet-600",
                ["ActionGroup"] = "ToolBox",
                ["ChildId"] = "templatesView",
                ["Badge"] = "",
                ["Icon"] = """
                    <svg class="h-3 w-3 sm:h-3.5 sm:w-3.5"
                         fill="none"
                         stroke="currentColor"
                         stroke-width="1.8"
                         viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <path stroke-linecap="round" d="M8 4v16M8 9h13" />
                    </svg>
                """
            },

            new()
            {
                ["Title"] = "Design & Font",
                ["IconClass"] = "bg-indigo-50 text-indigo-600",
                ["ButtonClass"] = "text-slate-600 hover:bg-slate-50 hover:text-violet-600",
                ["ActionGroup"] = "ToolBox",
                ["ChildId"] = "designFontPanel",
                ["Badge"] = "",
                ["Icon"] = """
                    <svg class="h-3 w-3 sm:h-3.5 sm:w-3.5"
                         fill="none"
                         stroke="currentColor"
                         stroke-width="1.8"
                         viewBox="0 0 24 24">
                        <path stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M4 20h16" />
                        <path stroke-linecap="round"
                              d="m6 16 9.5-9.5a2.12 2.12 0 0 1 3 3L9 19H6v-3Z" />
                        <path stroke-linecap="round" d="M14 8l2 2" />
                    </svg>
                """
            }
        };
        public static List<ResumeLayoutItem> DefaultResumeLayout => new()
        {
            // =========================
            // PAGE 1
            // =========================

            new()
            {
                Id = "header",
                Title = "Header",
                Section = "personal",
                Page = 1,
                Column = "full",
                Order = 0,
                Locked = true
            },

            new()
            {
                Id = "summary",
                Title = "Summary",
                Section = "summary",
                Page = 1,
                Column = "left",
                Order = 0
            },

            new()
            {
                Id = "experience",
                Title = "Experience",
                Section = "experience",
                Page = 1,
                Column = "left",
                Order = 1
            },

            new()
            {
                Id = "projects",
                Title = "Projects",
                Section = "projects",
                Page = 1,
                Column = "left",
                Order = 2
            },

            new()
            {
                Id = "skills",
                Title = "Skills",
                Section = "skills",
                Page = 1,
                Column = "right",
                Order = 0
            },

            new()
            {
                Id = "achievements",
                Title = "Key Achievements",
                Section = "achievements",
                Page = 1,
                Column = "right",
                Order = 1,
                ShortTitle = "Key Achievements"
            },

            // =========================
            // PAGE 2
            // =========================

            new()
            {
                Id = "projects-2",
                Title = "Projects",
                Section = "projects",
                Page = 2,
                Column = "left",
                Order = 0
            },

            new()
            {
                Id = "achievements-2",
                Title = "Key Achievements",
                Section = "achievements",
                Page = 2,
                Column = "right",
                Order = 0,
                ShortTitle = "Key Achievements"
            },

            new()
            {
                Id = "education",
                Title = "Education",
                Section = "education",
                Page = 2,
                Column = "right",
                Order = 1
            },

            new()
            {
                Id = "training",
                Title = "Training / Courses",
                Section = "training",
                Page = 2,
                Column = "right",
                Order = 2,
                ShortTitle = "Training / Courses"
            },

            new()
            {
                Id = "languages",
                Title = "Languages",
                Section = "languages",
                Page = 2,
                Column = "right",
                Order = 3
            },

            new()
            {
                Id = "strengths",
                Title = "Strengths",
                Section = "strengths",
                Page = 2,
                Column = "right",
                Order = 4
            },

            new()
            {
                Id = "online",
                Title = "Find Me Online",
                Section = "online",
                Page = 2,
                Column = "right",
                Order = 5
            }
        };

    }
}