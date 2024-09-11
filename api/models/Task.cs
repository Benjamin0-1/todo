using System;

namespace api.Models
{
    public class ModelTask
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } 
        public string Description { get; set; } 
        public bool IsCompleted { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; 
    }
}
