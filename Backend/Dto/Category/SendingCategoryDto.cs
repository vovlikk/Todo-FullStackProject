namespace TodoList_Fullstack.Dto.Category
{
    public class SendingCategoryDto
    {
        
        public int Id { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public string? UserId { get; set; }
    }
}
