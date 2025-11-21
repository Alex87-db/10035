using Api.Data;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContactosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContactos([FromQuery] string? search)
        {
            IQueryable<Contact> query = _context.Contactos;

            if (!string.IsNullOrWhiteSpace(search))
            {
                string filtro = search.Trim();
                query = query.Where(c => c.Nombre.Contains(filtro));
            }

            var resultados = await query.OrderBy(c => c.Nombre).ToListAsync();

            return Ok(resultados);
        }

        [HttpPost]
        public async Task<ActionResult<Contact>> CrearContacto([FromBody] Contact nuevo)
        {
            if (string.IsNullOrWhiteSpace(nuevo.Nombre))
            {
                return BadRequest("El nombre es obligatorio.");
            }

            if (string.IsNullOrWhiteSpace(nuevo.Telefono))
            {
                return BadRequest("El teléfono es obligatorio.");
            }

            _context.Contactos.Add(nuevo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetContactos), new { id = nuevo.Id }, nuevo);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> EliminarContacto(int id)
        {
            var contacto = await _context.Contactos.FindAsync(id);

            if (contacto == null)
            {
                return NotFound();
            }

            _context.Contactos.Remove(contacto);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
