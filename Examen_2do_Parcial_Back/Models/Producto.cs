using System;
using System.Collections.Generic;

namespace Examen_2do_Parcial_Back.Models;

public partial class Producto
{
    public int IdProducto { get; set; }

    public int? IdCaterogia { get; set; }

    public string Nombre { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public decimal? Precio { get; set; }

    public byte[]? Imagen { get; set; }


    public virtual Categorium? IdCaterogiaNavigation { get; set; }
}
