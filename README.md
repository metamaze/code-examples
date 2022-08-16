This repository will illustrate how you can receive messages from and communicate with Metamaze. 

## Install dependencies

Install all dependencies by executing:
`yarn install`

## Communicating with Metamaze

Have a look at [the API implementations](/src/api/index.ts) if you want to see the implementation of the following functions.


### Uploading files to Metamaze
#### Upload in a script
You can use the function `uploadFilesInFolder` to upload files to Metamaze in a script.
It requires the following parameters:
| Parameter      | Type                       | Description                                                       |
| -------------- | -------------------------- | ----------------------------------------------------------------- |
| folderPath     | string                     | Path to folder where the files are located                        |
| projectId      | string                     | Id of project                                                     |
| organisationId | string                     | Id of organisation                                                |
| token          | string                     | Input API token of your project                                   |
| pipelineType   | "TRAINING" or "PRODUCTION" | Whether you want to upload to the training or production pipeline |

#### Upload once
To upload all files in a folder one time, create a simple script `upload.ts` with contents
```
import { uploadFilesInFolder } from 'api/index';
 
uploadFilesInFolder("<folderPath>", 
    "<projectId>",
    "<organisationId>", 
    "<token>",
    "PRODUCTION")

```
and run `ts-node upload.ts`.

### Retrieve upload from Metamaze

You can use the function `getUploadById` to retrieve an upload from Metamaze.
It requires the following parameters:
| Parameter      | Type   | Description                        |
| -------------- | ------ | ---------------------------------- |
| uploadId       | string | Id of the upload you want to fetch |
| projectId      | string | Id of project                      |
| organisationId | string | Id of organisation                 |
| token          | string | Input API token of your project    |

### Where can I find all these parameters?
* `projectId` and `organisationId`: 
 Browse in Metamaze to your project and look at the url. It will look like this: `https://app.metamaze.eu/5ccad715074ce2b850f6dddd/projects/5d6f52abbc1d177120addddd/production/uploads`.
In this example the `organisationId = 5ccad715074ce2b850f6dddd` and `projectId = 5d6f52abbc1d177120addddd`.
The structure of the url is as follows: `https://app.metamaze.eu/<organisationId>/projects/<projectId>/production/uploads`.
* `uploadId`:
Similar to projectId and organisationId. Again look at the url: `https://app.metamaze.eu/5ccad715074ce2b850f6dddd/projects/5d6f52abbc1d177120addddd/production/uploads?uploadId=62d013cb5bd54e4b309f4ddd`. In this example the `uploadId = 62d013cb5bd54e4b309f4ddd`.
* `token`: 
You can create/find a token in the `project settings > Input > REST API`. Select `API` as authentication protocol and generate a `bearer token`. This bearer token you need to use in the authentication headers.

## Receiving messages from Metamaze

Once all dependencies are installed correctly, you can start the server by executing:
`yarn server`

This will spin up an Express server that listens to `http://localhost:4000/metamaze-output`.

If you have deployed this Express server on your server and you have configured the project settings correctly, you should receive output messages from Metamaze in this function. See [Express server](/src/server/index.ts).


## Get help

For any questions, feel free to open an issue here on GitHub or contact the Metamaze team at support@metamaze.eu.
