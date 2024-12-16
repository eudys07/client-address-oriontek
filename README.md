# Client Address Management

This project is a full-stack client management system with a React frontend and three backend APIs built with Node.js (Express) and Python (Django). The system also integrates Kafka for event-driven communication between services. Docker is used to containerize the application for easy deployment and setup.

## 🗂️ Project Structure
```
client-address-oriontek/
│── infra
│── services
│───│── client-fe/              # React Frontend
│───│── client-api/             # Node.js Express API with SQLite
│───│── address-api/            # Node.js Express API with MongoDB
│───│── clientrepot/            # Python Django API for reports
```


## 🚀 Getting Started
#### 1. Prerequisites :
  Make sure you have the following installed:
  
  Docker\
  Docker Compose

#### 2. Clone the Repository
  git clone <repository-url>\
  cd project-root


#### 3. Run the Application
  To build and start all the services, run the following command in the project root:

  docker-compose up --build

  This will build and start all the containers:

  React Frontend (client-app)\
  Client API (client-api) – Node.js with SQLite\
  Address API (address-api) – Node.js with MongoDB\
  Report API (report-api) – Python Django\
  The services will be available at the following URLs:
  
  React Frontend: http://localhost:3000 \
  Client API: http://localhost:3001/api/clients \
  Address API: http://localhost:3002/api/addresses \
  Report API: http://localhost:8000/api/reports



### Future Improvements
  Complete the Report Module:\
  Finish the implementation of the report module in the Django API to aggregate and display data.
  
  Add Authentication:\
  Implement user authentication and authorization for secure access.
  
  Add Unit and Integration Tests:\
  Ensure the reliability of the application with comprehensive tests.
