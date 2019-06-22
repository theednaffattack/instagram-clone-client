from: https://stackoverflow.com/questions/6850276/how-to-convert-dataurl-to-file-object-in-javascript

```javascript
  dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    //I should maybe grab the metdata and append
    // it here?
    let newBlob = new Blob([ab], { type: mimeString });
    // this is where it becomes a file again.
    let newObj = URL.createObjectURL(newBlob);

    const finalFile = new File([newBlob], this.state.fileNames[0].name, {
      type: "image/png"
    });

    log("newBlob");
    log(URL.createObjectURL(newBlob));

    return finalFile;
  }
```
