import express from 'express'
import { addJobToQueue } from './send'
import { uploadToS3 } from './upload'

const app = express()
const port = 3000

app.post('/upload', async (req, res) => {
    const { user, fileName } = req.body
    const file = files[fileName]
    const s3Response = await uploadToS3(user, file)
    const { bucket, key, location } = s3Response

    addJobToQueue(bucket, key, location, res)
  })
 
app.get('/', (req, res) => {
    res.send('Hello World')
})
 
app.listen(port, () => {
    console.log(`🌎 App listening at http://localhost:${port}`)
})