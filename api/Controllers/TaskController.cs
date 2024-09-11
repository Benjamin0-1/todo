using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.JsonPatch;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TaskController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ModelTask>>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ModelTask>> GetTask(Guid id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound(new { message = "Task not found" });
            }

            return task;
        }




        [HttpPost]
        public async Task<ActionResult<ModelTask>> PostTask(ModelTask task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTask", new { id = task.Id }, task);
        }







        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(Guid id, ModelTask updatedTask)
        {
            if (id != updatedTask.Id)
            {
                return BadRequest(new { message = "ID in URL does not match ID in body" });
            }

            var existingTask = await _context.Tasks.FindAsync(id);
            if (existingTask == null)
            {
                return NotFound(new { message = "Task not found" });
            }

            existingTask.Title = updatedTask.Title ?? existingTask.Title;
            existingTask.Description = updatedTask.Description ?? existingTask.Description;
            existingTask.IsCompleted = updatedTask.IsCompleted; 
            existingTask.CreatedAt = updatedTask.CreatedAt != default ? updatedTask.CreatedAt : existingTask.CreatedAt;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Tasks.Any(e => e.Id == id))
                {
                    return NotFound(new { message = "Task not found" });
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound(new { message = "Task not found" });
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
