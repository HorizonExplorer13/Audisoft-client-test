namespace Audisoft.API.Common;

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public T? Data { get; set; }
    public string Message { get; set; } = string.Empty;
    public List<string> Errors { get; set; } = new();

    public static ApiResponse<T> Ok(T data, string message = "Operation completed successfully")
        => new() { Success = true, Data = data, Message = message };

    public static ApiResponse<T> Created(T data, string message = "Resource created successfully")
        => new() { Success = true, Data = data, Message = message };

    public static ApiResponse<T> Fail(string message, List<string>? errors = null)
        => new() { Success = false, Message = message, Errors = errors ?? new List<string>() };
}

public class ApiResponse : ApiResponse<object>
{
    public static ApiResponse Ok(object? data, string message = "Operation completed successfully")
        => new() { Success = true, Data = data, Message = message };

    public static ApiResponse Ok(string message = "Operation completed successfully")
        => new() { Success = true, Data = null, Message = message };

    public static new ApiResponse Created(object data, string message = "Resource created successfully")
        => new() { Success = true, Data = data, Message = message };

    public static new ApiResponse Fail(string message, List<string>? errors = null)
        => new() { Success = false, Message = message, Errors = errors ?? new List<string>() };
}