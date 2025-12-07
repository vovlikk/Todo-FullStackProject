using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using TodoList_Fullstack.Data;
using TodoList_Fullstack.Interface.Category;
using TodoList_Fullstack.Interface.Notification;
using TodoList_Fullstack.Interface.Support;
using TodoList_Fullstack.Interface.ToDo;
using TodoList_Fullstack.Service.Categories;
using TodoList_Fullstack.Service.Notification;
using TodoList_Fullstack.Service.Support;
using TodoList_Fullstack.Service.ToDo;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddDbContext<TodoListDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

        builder.Services.AddScoped<ISupportInterface, SupportService>();
        builder.Services.AddScoped<IToDoInterface, ToDoService>();
        builder.Services.AddScoped<ICategoryInterface, CategoryService>();
        builder.Services.AddScoped<INotificInterface, NotificationService>();

        builder.Services.AddIdentity<IdentityUser, IdentityRole>(option =>
        {
            option.Password.RequireDigit = true;
            option.Password.RequiredLength = 6;
            option.Password.RequireLowercase = true;
            option.Password.RequireUppercase = true;
            option.Password.RequireNonAlphanumeric = false;
        })
            
            .AddEntityFrameworkStores<TodoListDbContext>()
            .AddDefaultTokenProviders();

        builder.Services.AddCors(policy =>
        {
            policy.AddDefaultPolicy(builder =>
            {
                builder.WithOrigins("http://localhost:3000", "https://1024b7c59d72.ngrok-free.app")
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
        });

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Key"]));

        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey = key
    };
});

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }
        app.UseCors();


        

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}