import S3 from 'aws-s3';
import config from '../s3.config'

export const uploadToS3 = async (user, fileName) => {
    const S3Client = new S3(config)
    const newFileName = `user-${user}-file-${fileName}`

    return await S3Client
        .uploadFile(file, newFileName)
        .then(data => {
            console.log(data)
            return data
        })
        .catch(err => {
            console.error(err)
            return err
        })
    
    /**
     * {
     *   Response: {
     *     bucket: "your-bucket-name",
     *     key: "photos/image.jpg",
     *     location: "https://your-bucket.s3.amazonaws.com/photos/image.jpg"
     *   }
     * }
     */
}