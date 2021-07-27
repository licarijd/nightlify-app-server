import amqp from 'amqplib/callback_api'

const RABBITMQ_URL = 'amqp://localhost'
const RABBITMQ_QUEUE = 'image-conversion-job-broker'

export const addJobToQueue = (bucket, key, location, res) => {
    amqp.connect(RABBITMQ_URL, (connectError, connection) => {
        if (connectError) {
            throw connectError;
        }
        connection.createChannel((channelError, channel) => {
            if (channelError) {
                throw channelError;
            }
      
            const msg = JSON.stringify({ bucket, key, location });
      
            channel.assertQueue(RABBITMQ_QUEUE, {
                durable: false
            });
      
            channel.sendToQueue(RABBITMQ_QUEUE, Buffer.from(msg));
            
            res.send(" [x] Sent %s", msg);
        });
    });
}