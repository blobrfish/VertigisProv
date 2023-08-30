using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

using ProvWebApi.Dtos;

namespace ProvWebApi
{
    public static class Services
    {
        public static string ConvertFromByteArrayToString(byte[] image)
        {
            return image != null ? Encoding.ASCII.GetString(image) : null;
        }

        public static byte[] ConvertImageToBytes(string iamge)
        {
            return iamge != null ? Encoding.ASCII.GetBytes(iamge) : null;
        }

        public static JsonFileObject DeserializeJsonFileToObject(IFormFile file)
        {
            if(file == null)
            {
                return null;
            }
            string fileContent = null;
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                fileContent = reader.ReadToEnd();
            }
            var cleanContent = Regex.Unescape(fileContent);
            try
            {
                var result = JsonConvert.DeserializeObject<JsonFileObject>(cleanContent);
                return result; //new ApiResponse<IEnumerable<ItemDto>> { IsSuccessful = true, Data = result.Items };
            }
            catch (Exception e)
            {
                return null; //new ApiResponse<IEnumerable<ItemDto>> { IsSuccessful = false, Message = "Something wentr wrong, please check that you are sending data in json format." };

            }
        }
    }
}
