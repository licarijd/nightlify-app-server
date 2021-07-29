import express from 'express'
import { addJobToQueue } from './send'
import { uploadToS3 } from './upload'
import cors from 'cors'
import multer from 'multer'
import { upload } from './fileUtils'

const app = express()
const port = 8081

app.use(cors())

app.post('/upload', async (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log(err)
            return res.status(500).json(err)
        } else if (err) {
            console.log(err)
            return res.status(500).json(err)
        }
   return res.status(200).send(req.file)

 })
    //console.log(req.file)
    /*const { user, fileName } = req.body
    const file = files[fileName]
    const s3Response = await uploadToS3(user, file)
    const { bucket, key, location } = s3Response

    addJobToQueue(bucket, key, location, res)*/
    //return res.status(200).send(req.file)
  })
 
app.get('/', (req, res) => {
    res.send('Hello World')
})
 
app.listen(port, () => {
    console.log(`🌎 App listening at http://localhost:${port}`)
})