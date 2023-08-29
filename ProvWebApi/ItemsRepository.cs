using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using ProvWebApi;
using System.Data;


namespace ProvWebApi
{

    public class ItemsRepository 
    {
    
        public IEnumerable<Item> Get()
        {

            var result = new List<Item>();

            System.Text.StringBuilder sql = new System.Text.StringBuilder();

             sql.AppendLine(@"
			select Items.Id,  Items.Name, Items.Age, Items.Hobby, Items.Image
			from Items");


            using (SqlConnection cnn = new SqlConnection(@"Server=tcp:nizams1.database.windows.net,1433;Initial Catalog=blobrfishData;Persist Security Info=False;User ID=NizamArif;Password=NewPassword123***;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"))
            {
                using (SqlCommand cmd = new SqlCommand(sql.ToString(), cnn))
                {
                    cnn.Open();
                    using (SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection))
                    {
                        while (dr.Read())
                        {
                            result.Add(new Item
                            {
                                Id = dr.GetFieldValue<int>(dr.GetOrdinal("Id")),
                                Name = dr.GetFieldValue<string>(dr.GetOrdinal("Name")),
                                Age = dr.GetFieldValue<int>(dr.GetOrdinal("Age")),
                                Hobby = dr.GetFieldValue<string>(dr.GetOrdinal("Hobby")),
                                Image = dr.IsDBNull(dr.GetOrdinal("Image")) ? null : Services.ImageToString((byte[])dr["Image"]),
                            });

                        }

                    }

                }

            }

            return result;
        }


        //    private static DataTable MakeTable()
        //    // Create a new DataTable named NewProducts.
        //    {
        //        DataTable newProducts = new DataTable("Items");

        //        // Add three column objects to the table.
        //        DataColumn productID = new DataColumn();
        //        productID.DataType = System.Type.GetType("System.Int32");
        //        productID.ColumnName = "ProductID";
        //        productID.AutoIncrement = true;
        //        newProducts.Columns.Add(productID);

        //        DataColumn productName = new DataColumn();
        //        productName.DataType = System.Type.GetType("System.String");
        //        productName.ColumnName = "Name";
        //        newProducts.Columns.Add(productName);

        //        DataColumn productNumber = new DataColumn();
        //        productNumber.DataType = System.Type.GetType("System.String");
        //        productNumber.ColumnName = "ProductNumber";
        //        newProducts.Columns.Add(productNumber);

        //        // Create an array for DataColumn objects.
        //        DataColumn[] keys = new DataColumn[1];
        //        keys[0] = productID;
        //        newProducts.PrimaryKey = keys;

        //        // Add some new rows to the collection.
        //        DataRow row = newProducts.NewRow();
        //        row["Name"] = "CC-101-WH";
        //        row["ProductNumber"] = "Cyclocomputer - White";

        //        newProducts.Rows.Add(row);
        //        row = newProducts.NewRow();
        //        row["Name"] = "CC-101-BK";
        //        row["ProductNumber"] = "Cyclocomputer - Black";

        //        newProducts.Rows.Add(row);
        //        row = newProducts.NewRow();
        //        row["Name"] = "CC-101-ST";
        //        row["ProductNumber"] = "Cyclocomputer - Stainless";
        //        newProducts.Rows.Add(row);
        //        newProducts.AcceptChanges();

        //        // Return the new DataTable.
        //        return newProducts;
        //    }
        //    private static string GetConnectionString()
        //    // To avoid storing the connection string in your code,
        //    // you can retrieve it from a configuration file.
        //    {
        //        return "Data Source=(local); " +
        //            " Integrated Security=true;" +
        //            "Initial Catalog=AdventureWorks;";
        //    }
        //}

        public static byte[] ConvertImageToBytes(string picture)
        {
            return picture != null ? System.Text.Encoding.ASCII.GetBytes(picture) : null;
        }

        public void Add(IEnumerable<Item1> items)
        {
            Random random = new Random();
            DataTable dt = new DataTable();  //s_EmptyUploadTable.Copy();
            dt.Columns.Add("Id", typeof(int));
            dt.Columns.Add("Name", typeof(string));
            dt.Columns.Add("Age", typeof(int));
            dt.Columns.Add("Hobby", typeof(string));
            dt.Columns.Add("Image", typeof(byte[]));
            foreach (var itm in items)
            {
                DataRow row = dt.NewRow();
                row["Id"] = random.Next(0, 1000000); ;
                row["Name"] = itm.Name;
                row["Age"] = itm.Age;
                row["Hobby"] = itm.Hobby;
                row["Image"] = ConvertImageToBytes(itm.Image); 
                dt.Rows.Add(row);
            }
            using (SqlConnection cn = new SqlConnection(@"Server=tcp:nizams1.database.windows.net,1433;Initial Catalog=blobrfishData;Persist Security Info=False;User ID=NizamArif;Password=NewPassword123***;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"))
            {
                cn.Open();
                using (SqlBulkCopy bulkCopy = new SqlBulkCopy(cn))
                {
                    bulkCopy.DestinationTableName = "dbo.Items";
                    bulkCopy.WriteToServer(dt);
                }
                cn.Close();
            }






            //         var result = new List<Item>();

            //         System.Text.StringBuilder sql = new System.Text.StringBuilder();

            //         sql.AppendLine(@"
            //select Items.Id,  Items.Name, Items.Age, Items.Hobby, Items.Image
            //from Items");


            //         using (SqlConnection cnn = new SqlConnection(@"Server=tcp:nizams1.database.windows.net,1433;Initial Catalog=blobrfishData;Persist Security Info=False;User ID=NizamArif;Password=NewPassword123***;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"))
            //         {
            //             using (SqlCommand cmd = new SqlCommand(sql.ToString(), cnn))
            //             {
            //                 cnn.Open();
            //                 using (SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection))
            //                 {
            //                     while (dr.Read())
            //                     {
            //                         result.Add(new Item
            //                         {
            //                             Id = dr.GetFieldValue<int>(dr.GetOrdinal("Id")),
            //                             Name = dr.GetFieldValue<string>(dr.GetOrdinal("Name")),
            //                             Age = dr.GetFieldValue<int>(dr.GetOrdinal("Age")),
            //                             Hobby = dr.GetFieldValue<string>(dr.GetOrdinal("Hobby")),
            //                             Image = dr.IsDBNull(dr.GetOrdinal("Image")) ? null : Services.ImageToString((byte[])dr["Image"]),
            //                         });

            //                     }

            //                 }

            //             }

            //         }

            //         return result;




        }
    }
}
