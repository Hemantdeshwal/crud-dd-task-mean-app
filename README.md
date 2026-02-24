MEAN Stack CRUD Tutorials App
This project is a full‑stack CRUD application built with the MEAN stack:

MongoDB – data store for tutorials

Express + Node.js – REST API backend

Angular 15 – frontend UI using HttpClient

Docker + GitHub Actions – containerization and CI/CD

The app manages a collection of tutorials, each with:

id

title

description

published (boolean)

Users can create, list, search, update, publish/unpublish, and delete tutorials.

1. Local Development Setup
1.1 Backend (Node.js + Express)
bash
cd backend
npm install
Configuration:

MongoDB connection is configured in backend/app/config/db.config.js.

Default URL (used in Docker and local dev):
mongodb://localhost:27017/dd_db (or as set in MONGODB_URL).

Run backend:

bash
cd backend
node server.js
Backend will start on:

http://localhost:8080

Test it:

bash
curl http://localhost:8080/api/tutorials   # should return []
1.2 Frontend (Angular 15)
bash
cd frontend
npm install
Adjust backend URL if needed:

frontend/src/app/services/tutorial.service.ts defines:

ts
const baseUrl = 'http://localhost:8080/api/tutorials';
Run Angular dev server:

bash
cd frontend
npx ng serve --port 8081
Open in browser:

http://localhost:8081/

You should be able to:

Go to Add → create a tutorial.

See it in Tutorials list.

Edit, publish/unpublish, and delete.

2. Run with Docker (Local or VM)
From repo root:

bash
docker-compose up -d --build
This starts:

MongoDB container (mongo)

Backend container (backend) on port 8080

Frontend container (frontend) serving Angular on port 8081 (or 4200 depending on your compose config)

Default URLs:

Backend: http://localhost:8080/api/tutorials

Frontend: http://localhost:8081/ (or http://<vm-ip>:4200/ on Azure VM)

Environment:

MONGODB_URL is set in docker-compose.yml and consumed by backend/app/config/db.config.js:

mongodb://mongo:27017/dd_db

To stop:

bash
docker-compose down
3. CI/CD (GitHub Actions)
This repo includes a GitHub Actions workflow (.github/workflows/cicd.yml) that runs on pushes to main. The pipeline performs:

Backend
bash
cd backend
npm install
npm test     # currently prints "no tests" and exits 0
Frontend
bash
cd frontend
npm install
npm run test:ci   # ng test --no-watch --no-progress --browsers=ChromeHeadless
npm run build     # ng build --configuration production
A successful workflow guarantees:

Backend dependencies install successfully.

Angular unit tests (8 specs) pass in ChromeHeadless.

The Angular app builds in production mode without TypeScript/template errors.

You can view runs and logs under the Actions tab in GitHub.

4. Deployment on Azure VM (Overview)
The app is deployed on an Azure Linux VM using Docker:

SSH into VM

bash
ssh azureuser@<vm-public-ip>
cd ~/mean-app
Pull latest code / images

If using git:

bash
git pull origin main
To build or pull images (example):

bash
docker-compose pull
# or
docker-compose up -d --build
Start stack

bash
docker-compose up -d
Access endpoints from your machine

Frontend: http://<vm-public-ip>:4200 or http://<vm-public-ip>:8081

Backend: http://<vm-public-ip>:8080/api/tutorials

Make sure Azure Network Security Group (NSG) rules allow inbound TCP on the frontend and backend ports (4200/8081 and 8080).

5. Project Structure
text
.
├─ backend/                 # Node.js + Express API
│  ├─ app/
│  │  ├─ controllers/       # Tutorial controller
│  │  ├─ models/            # Tutorial Mongoose model
│  │  └─ routes/            # /api/tutorials routes
│  ├─ config/               # db.config.js (Mongo URL)
│  └─ server.js             # Express app entrypoint
├─ frontend/                # Angular 15 client
│  ├─ src/app/
│  │  ├─ components/
│  │  │  ├─ add-tutorial/
│  │  │  ├─ tutorial-details/
│  │  │  └─ tutorials-list/
│  │  ├─ services/          # tutorial.service.ts (HTTP calls)
│  │  └─ models/            # tutorial.model.ts
│  └─ angular.json, etc.
├─ docker-compose.yml       # Mongo + backend + frontend stack
└─ README.md
