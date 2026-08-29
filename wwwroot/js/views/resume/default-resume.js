window.ResumeEditorData = {
    meta: {
        id: null,
        template: "modern",
        region: "global",
        zoom: 80
    },

    settings: {
        accent: "#7c3aed",
        fontFamily: "Inter",
        fontSize: 10,
        lineHeight: 1.5,
        pageWidth: 794,
        pageHeight: 1123,
        showPageShadow: true
    },

    personal: {
        name: "Alex Morgan",
        role: "Senior Software Engineer",

        contact: {
            email: "alex@email.com",
            phone: "+1 234 567 890",
            location: "New York, USA",
            linkedin: "linkedin.com/in/alexmorgan",
            website: "",
            github: ""
        }
    },

    sections: [
        {
            id: "summary",
            type: "summary",
            title: "Profile",
            visible: true,
            locked: false,

            content: {
                text:
                    "Product-minded software engineer with 6+ years of experience building scalable web applications, APIs and AI-powered products. Strong background in React, Node.js, Python and cloud infrastructure."
            }
        },

        {
            id: "experience",
            type: "experience",
            title: "Experience",
            visible: true,
            locked: false,

            items: [
                {
                    id: "exp-1",
                    position: "Senior Software Engineer",
                    company: "Tech Company",
                    location: "New York",
                    startDate: "2022",
                    endDate: "Present",

                    description: [
                        "Led development of scalable customer-facing web applications.",
                        "Improved API performance and reduced infrastructure cost by 28%."
                    ]
                },

                {
                    id: "exp-2",
                    position: "Software Engineer",
                    company: "Digital Studio",
                    location: "Remote",
                    startDate: "2019",
                    endDate: "2022",

                    description: [
                        "Built full-stack products using React, Node.js and PostgreSQL.",
                        "Collaborated with designers and product teams to ship features."
                    ]
                }
            ]
        },

        {
            id: "education",
            type: "education",
            title: "Education",
            visible: true,
            locked: false,

            items: [
                {
                    id: "edu-1",
                    degree: "B.Sc. in Computer Science",
                    institution: "University of Technology",
                    location: "",
                    startDate: "2015",
                    endDate: "2019"
                }
            ]
        },

        {
            id: "skills",
            type: "skills",
            title: "Skills",
            visible: true,
            locked: false,

            items: [
                "React",
                "Next.js",
                "Node.js",
                "Python",
                "PostgreSQL",
                "Docker"
            ]
        },

        {
            id: "projects",
            type: "projects",
            title: "Projects",
            visible: true,
            locked: false,

            items: [
                {
                    id: "project-1",
                    name: "AI Career Platform",
                    description:
                        "Built an AI-assisted resume and job matching platform with semantic search and automated tailoring."
                }
            ]
        }
    ]
};