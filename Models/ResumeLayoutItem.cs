namespace CareerForgeAI.Resume.Models
{
    public class ResumeLayoutItem
    {
        public string Id { get; set; } = "";
        public string Title { get; set; } = "";

        // Example: "header", "summary", "experience"
        public string Section { get; set; } = "";

        // Page number
        public int Page { get; set; } = 1;

        // left / right
        public string Column { get; set; } = "left";

        // Ordering inside column
        public int Order { get; set; }

        // Header shouldn't be draggable
        public bool Locked { get; set; } = false;

        // Optional short label
        public string? ShortTitle { get; set; }
    }
}