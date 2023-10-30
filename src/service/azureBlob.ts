import {BlobServiceClient,StorageSharedKeyCredential} from '@azure/storage-blob'

const urlBlob = process.env.HOST_COUNT_STORAGE || '';
const keyBlob = process.env.KEY_COUNT_STORAGE || '';
const nameBlob = process.env.NAME_COUNT_STORAGE || '';

const storage = new StorageSharedKeyCredential(nameBlob,keyBlob)
const blobService = new BlobServiceClient(urlBlob,storage);

export const postImageBlobStorage = async ( fileName: string, filePath: string) => {
  try {
    const containerClient = blobService.getContainerClient('libros');
    await containerClient.getBlockBlobClient(fileName).uploadFile(filePath);
    return 'Image uploaded successfully';
  } catch (error) {
    throw new Error(`Error uploading image: ${error}`);
  }
};

export const getFileUrlFromBlobStorage = ( fileName: string) => {
  const containerClient = blobService.getContainerClient('libros');
  const url = containerClient.getBlockBlobClient(fileName).url;
  return url;
};

export const deleteBlob = async (containerName: string, fileName: string) => {
  try {
    const containerClient = blobService.getContainerClient(containerName);
    await containerClient.deleteBlob(fileName);
    return 'Image deleted successfully';
  } catch (error) {
    throw new Error(`Error deleting image: ${error}`);
  }
};