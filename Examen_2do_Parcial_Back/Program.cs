using Examen_2do_Parcial_Back.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Obtenemos la cadena de conexión
var connectionString = builder.Configuration.GetConnectionString("cadenaSQL");

//Agregamos la configuración para SQLServer
builder.Services.AddDbContext<Examen2doParcialContext>(options => options.UseSqlServer(connectionString));

//Definimos la nueva política Cross-Origin Resource Sharing (CORS o Uso compartido de recurso entre orígenes) para que la API sea accesible para cualquier aplicación
builder.Services.AddCors(options =>
{
    options.AddPolicy("NuevaPolitica", app =>
    {
        app.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Activamos la nueva política
app.UseCors("NuevaPolitica");

app.UseAuthorization();

app.MapControllers();

app.Run();
