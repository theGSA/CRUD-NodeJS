function BlobToBase64Content(ImageData)
{
    var str = "";
    new Uint8Array(ImageData).forEach((el)=>{
        str += String.fromCharCode(el);
    });

    return btoa(str);
}

module.exports = BlobToBase64Content;