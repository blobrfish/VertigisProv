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
using System.Text.RegularExpressions;

namespace ProvWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemsController : ControllerBase
    {
   
        [HttpGet]
        public IEnumerable<Item> Get()
        {
            var repository = new ItemsRepository();
            return repository.Get();
        }

        [HttpPost]
        public async Task<ApiResponse> AddItems([FromBody] IEnumerable<Item1> items)
        {
            var repository = new ItemsRepository();

            repository.Add(items);
            return new ApiResponse { IsSuccessful = true };
        }

        public class ApiResponse
        {
            public string Message { get; set; }
            public bool IsSuccessful { get; set; }
        }

        public class ApiResponse<T> : ApiResponse
        {
            public T Data  {get;set;}
        }


     
        [HttpPost("JsonFile/Parse")]
        public async Task<ApiResponse<IEnumerable<Item1>>> ParseItems([FromForm] IFormFile file)
        {
            string fileContent = null;
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                fileContent = reader.ReadToEnd();
            }
            var cleanContent =  Regex.Unescape(fileContent);
            try
            {
                var result = JsonConvert.DeserializeObject<DataItems>(cleanContent);
                return new ApiResponse<IEnumerable<Item1>> { IsSuccessful = true, Data = result.Items };
            }
            catch (Exception e)
            {
                return new ApiResponse<IEnumerable<Item1>> { IsSuccessful = false, Message = "Something wentr wrong, please check that you are sending data in json format." };

            }
        }


        public async Task<ApiResponse<IEnumerable<Item1>>> ConvertFromBase64ToString([FromForm] IFormFile file)
        {
            string fileContent = null;
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                fileContent = reader.ReadToEnd();
            }
            var cleanContent = Regex.Unescape(fileContent);
            try
            {
                var result = JsonConvert.DeserializeObject<DataItems>(cleanContent);
                RemovePrefixFromBase64Strings(result.Items);
                return new ApiResponse<IEnumerable<Item1>> { IsSuccessful = true, Data = result.Items };
            }
            catch (Exception e)
            {
                return new ApiResponse<IEnumerable<Item1>> { IsSuccessful = false, Message = "Something wentr wrong, please check that you are sending data in json format." };

            }
        }

        //byte[] data = Convert.FromBase64String(encodedString);
        //string decodedString = System.Text.Encoding.UTF8.GetString(data);


        public static void DecodeBase64ImagesToString(IEnumerable<Item1> items)
        {
            foreach(Item1 i in items)
            {
                i.Image = DecodeBase64StringToString(i.Image);
            }
        }


        public static void RemovePrefixFromBase64Strings(IEnumerable<Item1> items)
        {
            foreach (Item1 i in items)
            {
                i.Image = RemovePrefixFromBase64String(i.Image);
            }
        }

        public static string RemovePrefixFromBase64String(string encodedString)
        {
            Regex regex = new Regex(@"^[\w/\:.-]+;base64,");
            var encodedStringWithoutPrefix = regex.Replace(encodedString, string.Empty);
            return encodedStringWithoutPrefix;
            //var data = Convert.FromBase64String(encodedStringWithoutPrefix);
            //string decodedString = System.Text.Encoding.UTF8.GetString(data);
            //return decodedString;
        }

        public static string DecodeBase64StringToString(string encodedString)
        {
            Regex regex = new Regex(@"^[\w/\:.-]+;base64,");
            var encodedStringWithoutPrefix = regex.Replace(encodedString, string.Empty);
            var data =  Convert.FromBase64String(encodedStringWithoutPrefix);
            string decodedString = System.Text.Encoding.UTF8.GetString(data);
            return decodedString;
        }


        public static string PictureToString(byte[] picture)
        {
            return picture != null ? System.Text.Encoding.ASCII.GetString(picture) : null;
        }

        //public static string PictureToString(byte[] picture)
        //{
        //    return picture != null ? System.Text.Encoding.ASCII.GetString(picture) : null;
        //}




        //public static void ConvertImagesToBytes(IEnumerable<Item1> items)
        //{
        //    foreach (Item1 i in items)
        //    {
        //        i.Image = ConvertImageToBytes(i.Image);
        //    }
        //}

        public static byte[] ConvertImageToBytes(string picture)
        {
            return picture != null ? System.Text.Encoding.ASCII.GetBytes(picture) : null;
        }









        // Testing

        [HttpGet("AddItemsToDatabase")]
        public async Task<ApiResponse<IEnumerable<Item1>>> AddItemsToDatabase()
        {
            var repository = new ItemsRepository();
            repository.Add(new List<Item1> { new Item1 { Name = "Name1", Age = 5, Hobby = "Do something", Image = "ddd" } });
            return new ApiResponse<IEnumerable<Item1>> { IsSuccessful = true, Message= "yes it worked" };
         
        }
    }
}
