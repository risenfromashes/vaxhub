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
To deploy the application using Docker and Kubernetes, follow these steps:

1. Build the Docker image:

bash
docker build -t your-image-name .

2. Push the Docker image to a container registry of your choice:

bash
docker push your-registry/your-image-name:tag

3. Deploy the application on Kubernetes:

bash
kubectl apply -f deployment.yaml

Ensure that you have a valid deployment.yaml file with the necessary Kubernetes deployment configuration.

## Frontend

The frontend of this project is built using [Svelte](https://svelte.dev/). Svelte is a modern JavaScript framework that compiles your code to highly efficient JavaScript code during the build process. The frontend code is located in the frontend directory.

To develop the frontend, follow these steps:

1. Navigate to the frontend directory:

bash
cd frontend

2. Install the frontend dependencies:

bash
npm install

3. Run the frontend development server:

bash
npm run dev

The frontend server will be accessible at http://localhost:5000.

## Database

This project uses [PostgreSQL](https://www.postgresql.org/) as the database. To set up the database, follow these steps:

1. Install PostgreSQL on your local machine or use a hosted PostgreSQL service.

2. Create a new database.

3. Configure the database connection in your project's configuration file.

bash
# Example configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=your-username
DB_PASSWORD=your-password
DB_DATABASE=your-database

Ensure that you replace the placeholder values (localhost, your-username, your-password, your-database) with your actual database details.

## Continuous Monitoring

This project utilizes [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/) for continuous monitoring. Prometheus is a monitoring and alerting toolkit, while Grafana is a visualization tool for analyzing and monitoring metrics.

To set up continuous monitoring, follow these steps:

1. Install and configure Prometheus for scraping and storing metrics.

2. Set up Grafana and configure it to connect to Prometheus as a data source.

3. Import predefined dashboards or create custom dashboards in Grafana to visualize the metrics collected by Prometheus.

By setting up continuous monitoring with Prometheus and Grafana, you can monitor the performance, health, and other metrics of your application in real-time.

## Autoscaling with Kubernetes on Linode

To handle autoscaling, this project utilizes Kubernetes on Linode. Kubernetes provides a robust container orchestration platform, and Linode offers a scalable infrastructure to host your Kubernetes cluster.

To set up autoscaling, follow these steps:

1. Create a Linode Kubernetes cluster.

2. Configure the autoscaling parameters such as minimum and maximum replica counts, target CPU or memory utilization, and scaling policies.

3. Deploy your application to the Kubernetes cluster and configure the autoscaling rules based on your application's performance metrics.

Kubernetes will automatically adjust the number of replicas based on the defined autoscaling rules, allowing your application to scale up or down based on demand.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License
Apache 2.0
