import { Injectable, Logger } from '@nestjs/common';
import * as Aws from 'aws-sdk';
import { DeleteObjectsRequest } from 'aws-sdk/clients/s3';
import {
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  AWS_S3_REGION,
  AWS_S3_BUCKET,
} from '../../environment';

@Injectable()
export class S3Service {
  private readonly s3: Aws.S3;
  constructor() {
    Aws.config.update({
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET_KEY,
      region: AWS_S3_REGION,
    });
    this.s3 = new Aws.S3();
  }

  async getPresignedURL(fileName: string) {
    try {
      return await this.s3.getSignedUrl('getObject', {
        Bucket: AWS_S3_BUCKET,
        Key: fileName,
        Expires: 60 * 60 * 4,
      });
    } catch (error) {
      Logger.log(error);
    }
  }

  async uploadFile(fileContent: any, fileName: string, contentType: string) {
    const params = {
      Body: fileContent,
      Bucket: AWS_S3_BUCKET,
      Key: `YOUR_DESIGRED_VALUE/${fileName}`,
      ContentType: contentType,
    };
    try {
      const data = await this.s3.upload(params).promise();
      return { path: data.Key };
    } catch (error) {
      Logger.log(error);
    }
  }

  async getMultiPresignedURL(fileNames: string[]) {
    return fileNames.map(async fileName => {
      return this.s3.getSignedUrl('getObject', {
        Bucket: AWS_S3_BUCKET,
        Key: fileName,
        Expires: 60 * 60 * 4,
      });
    });
  }

  async deleteAssets(bucket: string, keys: string[]) {
    const param: DeleteObjectsRequest = {
      Bucket: bucket,
      Delete: {
        Objects: keys.map(key => {
          return { Key: key };
        }),
      },
    };

    return this.s3
      .deleteObjects(param, function(err, data) {
        if (err) {
          Logger.log(err, err.stack);
        } else {
          Logger.log(data);
        }
      })
      .promise();
  }
}
