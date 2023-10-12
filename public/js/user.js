function b64toBlob(base64, mimeType) {
    const sliceSize = 1024;
    const byteCharacters = atob(base64);
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        
        for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    
    const blob = new Blob(byteArrays, { type: mimeType });
    return blob;
}

function BlobToBase64Content(ImageData)
{
    var str = "";
    new Uint8Array(ImageData).forEach((el)=>{
        str += String.fromCharCode(el);
    });
    
    return btoa(str);
}

function BlobToInputFileList(blob, NomeImagem, mimeType)
{
    const file = new File([blob], NomeImagem, { type: mimeType });

    let list  = new DataTransfer();
    
    list.items.add(file);
    return list.files;
}


function LoadImage() {
    Imgcard.src = "/imgs/naruto-ramen.jpg";
}


   


