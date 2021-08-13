This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## **Installation and running this solution (ensure Docker is installed on your machine):** 

Run the following commands in your terminal:

1) Build the project with "npm run build".

1) cd .. and make sure nightlify-app-server is in the current directory.

2) docker build -t nightlify-app-server nightlify-app-server

3) docker run -p 8081:8081 -d nightlify-app-server

Open your browser to http://localhost:8081/ (takes a few seconds to start)