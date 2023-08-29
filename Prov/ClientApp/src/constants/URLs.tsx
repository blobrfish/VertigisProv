export const URLs = {
    HOME: "/",
    UPLOAD_ITEMS: "/UploadItems",
     
    ITEM: (itemId?: string) =>
        `/Items/${itemId ? itemId : ":id"}`,
   
};
