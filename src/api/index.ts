import axios, { AxiosError } from 'axios';
import fs from 'fs';
import { MMFile } from './types';

const baseUrl = 'https://app.metamaze.eu/gql/api';

/**
 * Upload files to Metamaze. You can choose whether you want
 * to upload files to production or in training.
 *
 * @param folderPath Path to the folder where the files are located that should be processed.
 * @param projectId Id of your project.
 * @param organisationId Id of your organisation.
 * @param token Input API token of your project.
 * @param pipelineType Whether you want to upload your files in training or in production.
 */
export const uploadFilesInFolder = async (
  folderPath: string,
  projectId: string,
  organisationId: string,
  token: string,
  pipelineType: 'TRAINING' | 'PRODUCTION' = 'PRODUCTION'
) => {
  const folder = fs.readdirSync(folderPath, { withFileTypes: true });
  const files: MMFile[] = [];
  for (const file of folder) {
    if (!file.isDirectory()) {
      const filePath = `${folderPath}/${file.name}`;
      const fileBuffer = fs.readFileSync(filePath);

      files.push({
        id: file.name,
        name: file.name,
        file: fileBuffer.toString('base64'),
      });
    }
  }
  
  if (files.length) {
    const url = `${baseUrl}/organisations/${organisationId}/projects/${projectId}/${pipelineType === 'TRAINING' ? 'upload' : 'process'
      }`;
    try {
      for (const file of files) {
        console.log(`Uploading ${file.name} files to Metamaze.`);
        const result = await axios.post(
          url,
          { options: { eachFileIsADocument: true }, files: [file] },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'content-type': 'application/json',
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
          }
        );
        console.log('Upload has been successful.');
        console.log(`Response: ${JSON.stringify(result.data, null, 2)}`);
      }
    } catch (e) {
      console.log('Something failed with uploading files to Metamaze.');
      if (e instanceof AxiosError) {
        console.log(e.response.status);
        console.log(e.response.data);
      } else {
        console.log(e);
      }
    }
  }
};

/**
 * Get payload of an upload from Metamaze.
 * @param uploadId Id of upload.
 * @param projectId Id of project.
 * @param organisationId Id of organisation.
 * @param token Input API token of your project.
 */
export const getUploadById = async (
  uploadId: string,
  projectId: string,
  organisationId: string,
  token: string
) => {
  const url = `${baseUrl}/organisations/${organisationId}/projects/${projectId}/process/${uploadId}`;

  try {
    console.log(`Fetching upload from Metamaze.`);
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
    console.log(`Response: ${JSON.stringify(result.data, null, 2)}`);
  } catch (e) {
    console.log('Something failed with uploading files to Metamaze.');
    if (e instanceof AxiosError) {
      console.log(e.response.status);
      console.log(e.response.data);
    } else {
      console.log(e);
    }
  }
};
