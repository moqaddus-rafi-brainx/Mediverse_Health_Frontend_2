import { authorizedPostCall } from './APIsService';
import axios from 'axios';
import { base64ToBlob, generateFileName } from './utilities';

export const uploadFile = async (file, key) => {
  try {
    const url = await authorizedPostCall('/aws/get-url', { key });
    await axios.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
    return url.split('?')[0];
  } catch (err) {
    console.log(err);
  }
};

export const uploadFiles = async (files, path) => {
  try {
    const keys = files.map((file) =>
      generateFileName(path, file?.name, file?.ext)
    );
    const urls = await authorizedPostCall('/aws/get-url', { keys });
    await Promise.all(
      files.map((file, index) =>
        axios.put(
          urls[index],
          base64ToBlob(file?.previewed ? file?.preview : file?.data),
          {
            headers: {
              'Content-Type': file.type,
            },
          }
        )
      )
    );
    return urls.map((url, index) => {
      return {
        url: url.split('?')[0],
        size: files[index].size,
        mimeType: files[index].type,
      };
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};
