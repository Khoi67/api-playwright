# Playwright API Automation – Booking Service

- This project is an **API automation testing framework** built with **Playwright Test and TypeScript** to validate the **Restful Booker API**.  
- It covers a full **CRUD flow** and follows real-world API automation best practices.
- [API Demo Website](https://restful-booker.herokuapp.com/apidoc/index.html)


## Tech Stack
- Playwright Test  
- TypeScript  
- Node.js  
- RESTful API Testing  



## Test Coverage

| No | Endpoint | Method | Description |
|----|----------|--------|-------------|
| 1 | `/auth` | POST | Generate authentication token |
| 2 | `/booking` | GET | Get all booking IDs |
| 3 | `/booking` | POST | Create a new booking |
| 4 | `/booking/{id}` | GET | Get booking details by ID |
| 5 | `/booking/{id}` | PUT | Update booking information |
| 6 | `/booking/{id}` | PATCH | Partial update booking |
| 7 | `/booking/{id}` | DELETE | Delete booking |



## How to Run Tests

### 1. Install dependencies
```bash
npm install
```
### 2. Run test
```bash
npx playwright test
