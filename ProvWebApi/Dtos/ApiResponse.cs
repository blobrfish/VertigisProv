namespace ProvWebApi.Dtos
{
 
        public class ApiResponse
        {
            public string Message { get; set; }
            public bool IsSuccessful { get; set; }
        }

        public class ApiResponse<T> : ApiResponse
        {
            public T Data  {get;set;}
        }
    
}
