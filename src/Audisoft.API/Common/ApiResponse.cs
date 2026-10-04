namespace Audisoft.API.Common;

public class ApiResponse<T>
{
    public bool success { get; set; }
    public T? data { get; set; }
    public string message { get; set; } = string.Empty;
    public List<string> errors { get; set; } = new();

    public static ApiResponse<T> Ok(T data, string message = "Operación completada exitosamente")
        => new() { success = true, data = data, message = message };

    public static ApiResponse<T> Created(T data, string message = "Recurso creado exitosamente")
        => new() { success = true, data = data, message = message };

    public static ApiResponse<T> Fail(string message, List<string>? errors = null)
        => new() { success = false, message = message, errors = errors ?? new List<string>() };
}

public class ApiResponse : ApiResponse<object>
{
    public static ApiResponse Ok(object? data, string message = "Operación completada exitosamente")
        => new() { success = true, data = data, message = message };

    public static ApiResponse Ok(string message = "Operación completada exitosamente")
        => new() { success = true, data = null, message = message };

    public static new ApiResponse Created(object data, string message = "Recurso creado exitosamente")
        => new() { success = true, data = data, message = message };

    public static new ApiResponse Fail(string message, List<string>? errors = null)
        => new() { success = false, message = message, errors = errors ?? new List<string>() };
}