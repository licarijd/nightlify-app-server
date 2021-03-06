import express from 'express'
import { addJobToQueue } from './send'
import cors from 'cors'
import { upload } from './fileUtils'
import { DEV_S3_BUCKET_NAME, PROD_S3_BUCKET_NAME } from './constants'

const app = express()
const port = 8081
const bucketName = process.env.NODE_ENV == 'production' ? PROD_S3_BUCKET_NAME : DEV_S3_BUCKET_NAME

app.use(cors())
app.use(express.urlencoded());
app.use(express.json());

app.post('/upload', async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(err)
            return res.status(500).json(err)
        }

        const { email, watermark } = req.body
        
        try { 
            addJobToQueue(bucketName, email, watermark, req.file.originalname, res)
                .then(() => {
                    return res.status(200).send(req.file)
                }).catch(err => {
                    console.log(err)
                    return res.status(500).json(err)
                })
            
        } catch (err) {
            console.error(err)
            return res.status(500).json(err)
        }
    })
})
 
app.get('/', (req, res) => {
    res.send('Hello World')
})
 
app.listen(port, () => {
    console.log(`🌎 App listening at http://localhost:${port}`)
})