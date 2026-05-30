import imagekit from "imagekit";


const StorageInstance = new imagekit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
});

//Image Uploading function// 
export const Upload_files = async (file, fileName) => {
  const option = {
    file,
    fileName,
  };
  return await StorageInstance.upload(option);
};

//Image deleting function//
export const Delete_file = async (fileId) => {
  try {
    return await StorageInstance.deleteFile(fileId);
  } catch (error) {
    console.error("ImageKit Delete Error:", error);
  }
};