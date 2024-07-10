using System.Threading;
using Examen_2do_Parcial_Back.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Examen_2do_Parcial_Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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

        //Método GET ListaCategorias que devuelve la lista de todas las tareas en la BD
        [HttpGet]
        [Route("ListaCategorias")]
        public async Task<IActionResult> ListaC()
        {
            var listaCategorias = await _baseDatos.Categoria.ToListAsync();
            return Ok(listaCategorias);
        }

        [HttpGet]
        [Route("BuscarProductoPorNombre/{nombre}")]
        public async Task<IActionResult> BuscarPorNombre(string nombre)
        {
            var productos = await _baseDatos.Productos
                                             .Where(p => p.Nombre.Contains(nombre))
                                             .ToListAsync();

            if (productos == null || !productos.Any())
            {
                return NotFound("No se encontraron productos con ese nombre");
            }

            return Ok(productos);
        }

        [HttpGet]
        [Route("BuscarProductoPorCategoria/{idCategoria:int}")]
        public async Task<IActionResult> BuscarPorCategoria(int idCategoria)
        {
            var productos = await _baseDatos.Productos
                                .Where(p => p.IdCaterogia == idCategoria)
                                .ToListAsync();
            return Ok(productos);
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
