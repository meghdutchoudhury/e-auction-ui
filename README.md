# E-Auction Application

## System Overview

E-Auction Application is a microservice based Cloud Native Application that facilitates the sale, purchase, and bidding for products by customers. The core modules of the E-Auction app are:

- Put a new product on auction with starting bid price.
- Bid for the product.
- Update the bid price.
- Listing of bids placed on any product.

## Design Considerations

### 2.1 Assumptions

To simplify the CQRS implementation, the application has been configured on a singular database instance instead of provisioning separate write instances and read replicas.

### 2.2 Risks & Mitigation

No security risks to highlight with the current implementation. The API is backed by a JWT-based authentication mechanism and can protect against XSS attacks as well.

### 2.3 Dependencies

The application is dependent on the availability of a persistent store (MongoDB) and a message queue (RabbitMQ) service to retrieve and save updates to application data. Any outages to these services may result in application downtime. To mitigate the impact, all traffic to these services may be routed via a load balancer to allow redirection to an alternative failover cluster if the primary nodes are down.

### 2.4 Design Metrics

#### 2.4.1 Security

The application is backed by a JWT authorization token to ensure the legitimacy of all incoming requests. There is also XSS protection to guard against Cross-Site Scripting (XSS) Attacks.

#### 2.4.2 Scalability

The application uses a CQRS design pattern with separate microservices for commands (writes) and queries (reads). The implementation is backed by an event store (MongoDB using Axon) and a message store (RabbitMQ). Due to this, the application can be scaled efficiently based on application usage density (reads vs writes).

#### 2.4.3 Availability

The application follows a microservice design pattern that can be run on independent primary compute nodes behind a load balancer. Downtime on a few instances will not bring down the application since the load balancer will redirect traffic to the healthy nodes. For large scale failures on the primary cluster, a failover cluster may be brought up immediately, and traffic can be re-routed to the latter cluster to immediately restore services to the application user.

#### 2.4.4 Performance

Since the application follows the CQRS design pattern, for write-heavy workloads in a given time, the command microservices can be scaled up accordingly. This gives us fine control over the application performance by allowing us to dynamically scale our cluster up or down depending on temporal application usage patterns.

#### 2.4.5 Resilience

The application is resilient against catastrophic system failures due to the persistent event store backed by MongoDB (using Axon framework) and message store by RabbitMQ. No transactional data will be lost on a system outage since the queued events will be able to continue processing on service restoration. To provide even better tolerance against failures, we may define a failover cluster that will be brought up if the failures on the primary cluster cross a certain threshold as per defined metrics.

## Technologies

### 3.1 Microservices

The design pattern being used is CQRS. The application uses Eureka service for discovery, Spring Cloud API Gateway to serve as the composite/front for all API operations, a Command layer to process write operations, and a Query layer to handle read requests to the application data.

![CleanShot 2023-07-31 at 11 30 28](https://github.com/meghdutchoudhury/e-auction-api/assets/29727402/9059b30b-4647-48ac-9f39-71ab8d180898)

### 3.2 Database

The database provider is MongoDB with a singular database named "e-auction" and collections "products" and "bids." The database will be deployed on a single node. Even though the microservices follow a CQRS design pattern, no read replicas are being provisioned to simplify the implementation and constrain the design to the given requirements only. Both Command and Query services will interact with the singular database instance.

### 3.3 Message Broker

The message broker being used is RabbitMQ. Additionally, to support the CQRS pattern, the application uses the Axon framework leveraging MongoDB as an event store. Only the bid posting and listing have been designed to follow the gateway-handler design as per the requirements.

### 3.4 Design Patterns

The creational design pattern used for composing the model object in the show bids response is the Builder pattern. This pattern has been chosen due to the large number of object properties, which would make the process of constructing an object using constructors or setters too verbose, cumbersome, and inefficient in terms of performance.

### 3.5 Testing

The controller and service classes in Command and Query API containing business logic have been tested with JUnit 5 test suite, using Mockito to stub dependencies. All scenarios, including context load and exception cases, have been tested.

Code coverage has been generated using JaCoCo – Java Code Coverage tool. The report can be directly downloaded as a Gitlab job artifact.

CI/CD has been configured for the API project with stages: build & test. The runner being used is a gitlab-runner docker instance configured to run on the VDI itself.

A performance test suite has been developed using Apache JMeter for login, getting products, and getting bids for product functionality since these are the endpoints that may see the highest traffic.

### 3.6 Others

- The application uses Java Collections and Streams as per their best usage policies.
- Spring Actuator has been used for monitoring and health reporting of API instances.
- The fetch bids API has support for filtering, sorting, and pagination.
- The REST endpoints are documented by Open API and are consolidated under the Cloud API Gateway.
- No inter-microservice calls were required.
- Service discovery has been achieved by Eureka, and Circuit Breaker has been applied only at Cloud API Gateway level by using Hystrix.
- The 2 security OWASP recommendations implemented are:
  - Prevention of Cross-site Scripting (XSS) using Spring Security
  - Strict access control through authenticated access to application data using JSON Web Token (JWT)

## User Interface

### 4.1 Design

- The UI has been developed using Angular 13 in the Typescript language. The UI elements and styles are backed by Bootstrap 5.
- The gang of four design pattern "builder pattern" has been used for composing data using Typescript before presenting it on the UI. SOLID principles have been followed as per guidelines.
- The approach for client-side optimization of Bootstrap that has been done is minification of styles and scripts during deployment to minimize the page resource size as well as the number of network calls made to initialize and render the pages.
- To improve UI performance, Ahead-of-Time (AOT) compilation has been enabled as is the default for the Angular 13 framework. This will improve the runtime performance by compiling everything ahead of time.
- Prevention of XSS attacks is taken care of by Angular implicitly by sanitizing and escaping untrusted values, thereby preventing potential injection and execution of a malicious script.

### 4.2 Testing

- The application testing framework used consists of Jasmine, Karma, and Protractor. Unit, integration, and end-to-end tests have been written, including exception cases.
- Code coverage is also being reported. Both test case results and coverage percentages are directly integrated and viewable under the CI/CD > Jobs section of Gitlab.
- ELK Stack has been deployed using the public docker image sebp/elk. The application has been integrated with the Elasticsearch service running at port 9200, to connect and upload the protractor e2e test results using the Winston library, and the same is viewable on the Kibana Web Interface.

## Architecture

### 5.1 Cloud Infrastructure

The below AWS technologies have been used in the design of this application on the cloud side. The deployment and design have been depicted in the given diagrams.

- Elastic Container Registry
- Elastic Container Service
- Elastic Beanstalk
- EC2, ASG & ELB
- Lambda Functions
- Step Functions
- API Gateway
- Cognito
- Amazon MQ
- Document DB
- CloudTrail
- CloudWatch
- Virtual Private Cloud
- SNS, SQS, SES

![CleanShot 2023-07-31 at 11 29 47](https://github.com/meghdutchoudhury/e-auction-api/assets/29727402/4987b9ff-c374-4d48-9243-0da75c1dfa17)

### 5.2 API Architecture

![CleanShot 2023-07-31 at 11 28 49](https://github.com/meghdutchoudhury/e-auction-api/assets/29727402/dd0bab13-2f61-4507-86ce-f208223e6bba)

