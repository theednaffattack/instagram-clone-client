export const dataUriToBlob = dataURI => {
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

  //Old Code
  //write the ArrayBuffer to a blob, and you're done
  //var bb = new BlobBuilder();
  //bb.append(ab);
  //return bb.getBlob(mimeString);

  //New Code
  let newBlob = new Blob([ab], { type: mimeString });
  let newObj = URL.createObjectURL(newBlob);
  log("view state files and names".toUpperCase());
  log(this.state.files);
  log(this.state.fileNames);

  const finalFile = new File([newBlob], this.state.files[0], {
    type: "image/png"
  });

  log("newBlob");
  log(URL.createObjectURL(newBlob));

  log("finalFile");
  log(URL.createObjectURL(finalFile));

  return finalFile;
};
