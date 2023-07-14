# VaxHub

## Project Overview

VaxHub is an online vaccination system where people can register using their name, address and NID. People can register for vaccination where they will get a vaccination date and they will go get a vaccine on that date. After getting the vaccination the user can apply for certificate and download it from the site.

This project utilizes Jest, Github Actions, Docker and Kubernetes for test automation, continuous integration and deployment.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Continuous Integration and Deployment](#continuous-integration-and-deployment)
- [Frontend](#frontend)
- [Database](#database)
- [Continuous Monitoring](#continuous-monitoring)
- [Autoscaling with Kubernetes on Linode](#autoscaling-with-kubernetes-on-linode)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before getting started, ensure you have the following installed:

- Node.js
- Docker
- Kubernetes (for deployment)

## Installation

To install the project locally, follow these steps:

1. Clone the repository:

bash
git clone https://github.com/your-username/repository.git
cd repository

2. Install the dependencies:

bash
npm install

## Usage

To run the project locally, execute the following command:

bash
npm run dev

This will start the application and make it accessible at http://localhost:3001.


## Testing

This project uses [Jest](https://jestjs.io/) as the testing framework and [Supertest](https://www.npmjs.com/package/supertest) for making HTTP requests to test the API endpoints. The test code is located in the tests directory.

To run the tests, use the following command:

bash
npm test

The test suite includes the following API endpoint tests:

1. GET /api/hello: This test verifies that the /api/hello endpoint returns a successful response with a status code of 200.

javascript
it('should return "Hello, World!" for GET /api/hello', async () => {
  const response = await request(app).get('/api/hello');
  expect(response.statusCode).toBe(200);
});

The test sends a GET request to the /api/hello endpoint and checks if the response status code is 200.

2. POST /login: This test ensures that the /login endpoint returns a failure message when invalid login form data is submitted.

javascript
it('should return a failure message for POST /login', async () => {
  const response = await request(app)
    .post('/login')
    .send({ nid: '0' });
  expect(response.statusCode).toBe(400);
});

The test sends a POST request to the /login endpoint with invalid login form data and expects the response status code to be 400.

3. POST /register: This test validates the /register endpoint by submitting a registration form and expecting a successful response.

javascript
it('should return a success message for POST /register', async () => {
  const formData = {
    name: 'John et Doe',
    address: '123 Main St',
    nid: '0',
  };
  const response = await request(app)
    .post('/register')
    .send(formData);
  expect(response.status).toBe(200);
});

The test sends a POST request to the /register endpoint with a sample registration form data and checks if the response status is 200.

You can add more tests for other API endpoints following a similar structure.

## Continuous Integration and Deployment

### GitHub Actions

This project utilizes [GitHub Actions](https://github.com/features/actions) for automating the CI/CD pipeline. The workflow files are located in the .github/workflows directory.

The CI/CD pipeline includes the following steps:

1. Linting and Code Quality Check: This step ensures that the code adheres to the predefined standards and best practices.

2. Unit Testing: The unit tests are executed using Jest to verify the correctness of the code.

3. Build and Package: The application is built and packaged into a Docker image.

4. Containerization: The Docker image is pushed to the container registry to be deployed on Kubernetes.

### Docker Deployment
