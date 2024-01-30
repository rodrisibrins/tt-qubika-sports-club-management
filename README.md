# Qubika
Qubika Sports Club Management

## Introduction
The purpose of this repository is to fulfill the objective of the technical test by creating an e2e that validate a new user can be created through API and that this user can create a new category.

## Playwright
Playwright offers a robust and versatile framework for web applications, providing numerous benefits to developers and QA engineers. With its cross-browser compatibility, Playwright allows for seamless testing across different browser environments, ensuring consistent performance and behavior. It's ability to automate tasks such as form submissions, interactions, and navigation streamlines the testing process, saving valuable time and resources.

## Steps to run the test
1. First you gonna need to clone the repository:

> git clone https://github.com/rodrisibrins/tt-qubika-sports-club-management

2. Then, you'll need to install the dependencies:

> npm install

3. After that, you will be ready to run the test:

>npx playwright test --ui

If you want to run the test headless just type:
>npx playwright test

## Solution
Setting up the framework was fast, easy, and intuitive.
I started working on user creation via the API, first by reading the Swagger documentation to understand its functionality. Once the user was created, I proceeded with the login, validating that certain elements on the screen were displayed correctly. After logging in, the main challenge was finding selectors that weren't flaky on the categories screen. Since I needed to locate the last entered category in the table, I had to find the arrow that leads to the last page of the table. After a few tries with different types of selectors I managed to create one that was quite useful.
Once the end-to-end test passed successfully several times, I proceeded to improve the code and implement the Page Object Model (POM), following the best practices outlined in the Playwright documentation.

## Next Steps
- For mostly security reasons, it's advisable to implement environment variables in end-to-end (e2e) tests, especially when dealing with user creation via API.
- The test suite could be configured to run in pipelines.

## QA
**Rodrigo Gonzalez Sibrins**

**Email:** rodrigosib2017@gmail.com