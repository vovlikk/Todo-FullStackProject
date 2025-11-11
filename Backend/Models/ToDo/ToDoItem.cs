namespace TodoList_Fullstack.Models.ToDo
{
    public class ToDoItem
    {
        public int Id { get; set; } 

        public string Category { get; set; } = string.Empty;
        public string Header { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public bool IsCompleted { get; set; } = false;

        public DateTime AtCreated { get; set; } = DateTime.UtcNow;

        public DateTime Deadline { get; set; }         
        public DateTime? CompletedAt { get; set; }


    }
}
