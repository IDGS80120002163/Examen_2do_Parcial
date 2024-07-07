﻿using System;
using System.Collections.Generic;

namespace Examen_2do_Parcial_Back.Models;

public partial class Categorium
{
    public int IdCategoria { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();
}
