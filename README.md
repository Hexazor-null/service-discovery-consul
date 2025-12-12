# Service Discovery with Consul, Node.js, and Docker Compose

This project demonstrates a simple microservices architecture using:

- **Consul** → Service discovery & health checking  
- **Node.js (Express)** → Dummy services (A, B, C)  
- **API Gateway** → Dynamic routing via Consul  
- **Docker Compose** → Multi-container orchestration  

The goal is to understand how services can discover each other dynamically without hardcoded IPs.

---

## 🚀 Features

### ✔ Automatic Service Registration  
Each service registers itself to Consul using:  
```
PUT /v1/agent/service/register
```

### ✔ Health Checks  
Consul verifies service status using:  
```
HTTP: http://<service>:<port>/info
Interval: 5s
```

### ✔ Dynamic Routing via API Gateway  
The gateway queries Consul’s catalog:  
```
/v1/catalog/service/<service-name>
```

### ✔ Fully Dockerized  
All services run in a shared network using `docker-compose`.

---

## 📂 Project Structure

```
service-discovery-consul/
│── docker-compose.yml
│
├── server-a/
│   ├── index.js
│   └── Dockerfile
│
├── server-b/
│   ├── index.js
│   └── Dockerfile
│
├── server-c/
│   ├── index.js
│   └── Dockerfile
│
└── api-gateway/
    ├── index.js
    └── Dockerfile
```

---

## 🐳 Running the Project

Make sure **Docker** & **Docker Compose** are installed.

Start all services:

```bash
docker compose down
docker compose up --build
```

Services will run:

| Service        | Port |
|----------------|------|
| Consul UI      | http://localhost:8500 |
| API Gateway    | http://localhost:8080 |
| Server A       | internal |
| Server B       | internal |
| Server C       | internal |

---

## 🧪 Testing

### 🔎 Check Consul UI  
```
http://localhost:8500/ui
```

### 🌐 Test via API Gateway  
```
http://localhost:8080/server-a
http://localhost:8080/server-b
http://localhost:8080/server-c
```

Example output:
```json
{
  "service": "Server A",
  "timestamp": 1733955359893
}
```

---

## 🧱 Tech Stack

- Node.js (Express)
- Consul
- Docker
- Docker Compose

---

## 🔧 How It Works

```
Client → API Gateway → Consul Lookup → Microservice → Response
```

No hardcoded IPs.  
Dynamic discovery.  
Consistent with microservice architecture.

---

## 📌 Possible Enhancements

- Load balancing  
- Failover if service unhealthy  
- Structured logs  
- JWT authentication at gateway  
- Service deregistration on shutdown  

---

## 📄 License

This project is released under the **MIT License**.
