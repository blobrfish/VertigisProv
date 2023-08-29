using System;
using System.Collections.Generic;
namespace ProvWebApi
{
    public class Item
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Age { get; set; }

        public string Hobby { get; set; }

        public string Image { get; set; }
    }

    public class Item1
    {
        //public int Id { get; set; }

        public string Name { get; set; }

        public int Age { get; set; }

        public string Hobby { get; set; }

        public string Image { get; set; }
    }

    public class DataItems
    {
        public IEnumerable<Item1> Items { get; set; }

       
    }
}
