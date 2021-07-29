
import multer from 'multer'
import multerS3 from 'multer-s3'
import S3 from 'aws-sdk/clients/s3'
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY } from '../awsAccessKeys.config'

const s3 = new S3({
    bucketName: 'original-uploaded-images-dev',
    region: 'ca-central-1',
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY
})

export const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'original-uploaded-images-dev',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
}).single('file')

// Saves images into the /public directory
/*const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

export const upload = multer({ storage }).single('file')*/