
import multer from 'multer'
import multerS3 from 'multer-s3'
import S3 from 'aws-sdk/clients/s3'
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY } from './awsAccessKeys.config'
import { DEV_S3_BUCKET_NAME, PROD_S3_BUCKET_NAME } from './constants'

const bucketName = process.env.NODE_ENV == 'production' ? PROD_S3_BUCKET_NAME : DEV_S3_BUCKET_NAME

const IMAGE_FILENAME = 'file'
const S3_REGION = 'ca-central-1'
const s3 = new S3({
    bucketName,
    region: S3_REGION,
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY
})

export const upload = multer({
    storage: multerS3({
        s3,
        bucket,
        metadata: function (_, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (_, file, cb) {
            cb(null, file.originalname)
        }
    })
}).single(IMAGE_FILENAME)