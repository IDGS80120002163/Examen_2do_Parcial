using System.Threading;
using Examen_2do_Parcial_Back.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Examen_2do_Parcial_Back.Controllers
{
    public class ProductosController : ControllerBase
    {
        //Creando la variable de context de BD
        private readonly Examen2doParcialContext _baseDatos;

        public ProductosController(Examen2doParcialContext baseDatos)
        {
            _baseDatos = baseDatos;
        }

        //Método GET ListaProductos que devuelve la lista de todas las tareas en la BD
        [HttpGet]
        [Route("ListaProductos")]
        public async Task<IActionResult> Lista()
        {
            var listaProductos = await _baseDatos.Productos.ToListAsync();
            return Ok(listaProductos);
        }

        [HttpPost]
        [Route("AgregarProducto")]
        public async Task<IActionResult> Agregar([FromBody] Producto request)
        {
            await _baseDatos.Productos.AddAsync(request);
            await _baseDatos.SaveChangesAsync();
            return Ok(request);
        }

        [HttpPut]
        [Route("ModificarProducto/{id:int}")]
        public async Task<IActionResult> Modificar(int id, [FromBody] Producto request)
        {
            var productoModificar = await _baseDatos.Productos.FindAsync(id);

            if (productoModificar == null)
            {
                return BadRequest("No existe el producto");
            }

            productoModificar.Nombre = request.Nombre;

            try
            {
                await _baseDatos.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpDelete]
        [Route("EliminarProducto/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var productoEliminar = await _baseDatos.Productos.FindAsync(id);

            if (productoEliminar == null)
            {
                return BadRequest("No existe la tarea");
            }

            _baseDatos.Productos.Remove(productoEliminar);
            await _baseDatos.SaveChangesAsync();

            return Ok();
        }
    }
}
