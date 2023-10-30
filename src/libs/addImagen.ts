import {
  UploadedFile
} from 'express-fileupload'
import {
  postImageBlobStorage
} from '../service/azureBlob'
 
export async function addProductImg(tmpPath: UploadedFile, nameFile: string):Promise<Error | void> {
  try {
    const extension = tmpPath.name.split('.');
    const validarExtensiones = ['png', 'jpg', 'jpeg'];
    if (!validarExtensiones.includes(extension[1])) {
      throw new Error('file is not image')
    }
     await postImageBlobStorage(`${nameFile}.${extension[1]}`,tmpPath.tempFilePath);
  } catch (error) {
    console.log(error);
    throw new Error('Has is error')
  }
}