using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;
using System.Text.Json;
using ProvWebApi.Dtos;
using System.Text.RegularExpressions;

namespace ProvWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public partial class ItemsController : ControllerBase
    {
   
        [HttpGet]
        public IEnumerable<ItemDto> Get()
        {
            var repository = new ItemsRepository();
            return repository.Get();
        }

        [HttpPost]
        public async Task<ApiResponse> AddItems([FromBody] IEnumerable<ItemDto> items)
        {
            //inject rep in the constructorn
            var repository = new ItemsRepository();
            repository.Add(items);
            return new ApiResponse { IsSuccessful = true };
        }

       
        [HttpPost("JsonFile/Parse")]
        public async Task<ApiResponse<IEnumerable<ItemDto>>> ParseItems([FromForm] IFormFile file)
        {

            var result = Services.DeserializeJsonFileToObject(file);
            if (result == null)
            {
                return new ApiResponse<IEnumerable<ItemDto>> { IsSuccessful = false, Message = "Something wentr wrong, please check that you are sending data in json format." };
            }
            return new ApiResponse<IEnumerable<ItemDto>> { IsSuccessful = true, Data = result.Items };

        }



        
        
        
        
        
        /// <summary>
        /// TESTING
        /// </summary>
        /// <returns></returns>
        
        
        //Testing sql bulk insert 
        [HttpGet("AddItemsToDatabase")]
        public async Task<ApiResponse<IEnumerable<ItemDto>>> CheckIfItemsAreAddedToDatabase()
        {
            var repository = new ItemsRepository();
            repository.Add(new List<ItemDto> { new ItemDto { Name = "John", Age = 5, Hobby = "Do something", Image = "ddd" }, new ItemDto { Name = "Lucy", Age = 5, Hobby = "Do something", Image = "ddd" } });
            return new ApiResponse<IEnumerable<ItemDto>> { IsSuccessful = true, Message = "yes it worked" };
        }

        //Testing if json was recieved 
        [HttpPost("UploadFile")]
        public ApiResponse  CheckIfFileIsRecieved([FromForm] IFormFile file)
        {
            if (file == null)
            {
                return new ApiResponse { IsSuccessful = false, Message = "No file was recieved." };
            }
            return new ApiResponse { IsSuccessful = true, Message = "The file was recieved!" };
        }

        
    }
}
