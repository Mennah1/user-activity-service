This project implements a scalable, event-driven microservice designed to process and store user activity logs in real-time. 
Built with Node.js, Apache Kafka, and MongoDB, the service handles high-throughput data ingestion by decoupling the API response from the database write operations. 
It supports a RESTful interface for submitting logs and retrieving processed data with pagination and filtering capabilities.
_________________________________________________________________________________________________________________________________________________________________________________________________
1.Architecture and Design :
The application follows "Domain-Driven Design (DDD)" principles to ensure a strict separation of concerns and maintainability. 
The codebase is organized into four distinct layers:
1. the "Domain layer" defines the business entities and database schemas;
2. the "Infrastructure layer" manages external dependencies such as the Kafka Producer, Kafka Consumer, and MongoDB connection; 
3. the "Application layer" orchestrates the data flow between the interface and infrastructure;
4. the "Interfaces layer: handles the HTTP request-response cycle.
________________________________________________________________________________________________________________________________________________________________________________________________
An Event-Driven Architecture : is utilized to ensure low latency. 
-When a log is submitted via the API, the service publishes the event to a Kafka topic and immediately responds to the client. 
-A separate Consumer process asynchronously reads the message from the queue and persists it to the MongoDB database. This approach prevents blocking operations during high-traffic periods.
_______________________________________________________________________________________________________________________________________________________________________________________________
Technology Stack :
The system is built using Node.js and Express for the application runtime. 
1.Apache Kafka(managed via Zookeeper)serves as the message broker for asynchronous event handling. 
2.MongoDB is used as the persistent storage layer for the log data, modeled using Mongoose. 
3.Docker and Docker Compose are employed to containerize the application and its infrastructure dependencies, ensuring a consistent deployment environment.
_________________________________________________________________________________________________________________________________________________________________________________________________
Project Structure:
The directory structure reflects the DDD layers:
1."src/domain":Contains the Mongoose data models.
2."src/infrastructure":Contains the Kafka client, producer/consumer logic, and database repositories.
3."src/application":Contains the event service logic.
4."src/interfaces":Contains the HTTP controllers and route definitions.
5."docker-compose.yml":Orchestrates the Kafka, Zookeeper, and MongoDB containers.
________________________________________________________________________________________________________________________________________________________________________________________________
Setup and Installation :
To run this project locally, Docker and Docker Compose are required. The infrastructure configuration maps specific ports to avoid conflicts with other local services (Kafka: 'write your port', Zookeeper: 'write your port').
1.  Start Infrastructure:
    Run the following command to initialize the Zookeeper, Kafka, and MongoDB containers in detached mode.
    ```bash
    docker-compose up -d
    ```

2.  Install Dependencies:
    Install the necessary Node.js packages.
    ```bash
    npm install
    ```

3.  Run Application:
    Start the development server. The service connects to the running Docker containers automatically.
    ```bash
    npm run dev
    ```
    ____________________________________________________________________________________________________________________________________________________________________________________________________________________________
    API Usage:
    1.Submit Activity Log
    """"POST"""""" `/api/logs`
Accepts a JSON object containing the user ID, action, and optional metadata. The request is processed asynchronously.


for the request body :

{
  "userId": "101",
  "action": "login_attempt",
  "metadata": { "ip": "192.168.1.1" }
}
