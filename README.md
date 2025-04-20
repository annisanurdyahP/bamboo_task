
---
## 🧪 1. UI Automation with Cypress
This repository contains UI automation tests using **Cypress** for the Magento demo website:  
[https://magento.softwaretestingboard.com](https://magento.softwaretestingboard.com)

The project covers key user flows such as:
- Test Case (A): Registra4on flow with login valida4on
- Test Case (B): Place order with mul4ple products (apply price calcula4on checks)
- Test Case (C): Add products in Wishlist and checkout from wishlist
- Test Case (D): Search and validate results


The tests are built using the **Page Object Model (POM)** approach for clean structure and scalability.
/bamboo_cypress
├── cypress
│   ├── e2e
│   │   ├── filterProduct.cy.js
│   │   ├── multipleOrder.cy.js
│   │   ├── purchase.cy.js
│   │   └── register.cy.js
│   ├── fixtures
│   │   ├── registerUser.json
│   │   └── loginUser.json
│   ├── support
│   │   ├── commands.js
│   │   ├── e2e.js
│   │   └── pageObject
│   │       ├── registerPage.js
│   │       └── loginPage.js
├── cypress.config.js
└── README.md

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/bamboo_cypress.git
cd bamboo_cypress
npm install
npx cypress open -> to run and open cypress GUI
npx cypress run

## 📦 2. API Automation with Postman

- The Postman collection is located in the `/Postman-Collection` folder.
- It includes automated tests for:
  - `POST` request to add new pet data (using Swagger Petstore API as an example)
  - `GET` request to retrieve pet by ID
  - Dynamic data generation
  - Response validation with assertions

### ✅ How to Use

1. Open the bamboo_postman folder.
2. Import the file bamboo_cards.postman_collection.json into Postman.
3. Once the import is successful, open the collection and prepare to run the automation.
4. Select the data file to be used:
     - Use valid_data.json for valid test cases.
     - Use invalid_data.json for negative test scenarios.
6. Run the collection using Collection Runner.

---

## 📋 3. Manual Test Case Creation

- Located in the `Test Case Bamboo Card.xlsx` file.
- Files provided:
  - `Test-Cases.xlsx` – structured format of test cases (ID, steps,priority, expected results,status).

---

## 🎯 4. Performance Testing Focus

- located in the `/Performance Test Task.docx` file
As part of the task, the checkout and payment area was chosen for performance testing based on real-world experience during traffic spikes (e.g. promotions or academic season rush from previous work at Ruangguru).

Testing approaches considered:
- Load Testing
- Stress Testing
- Compatibility Testing
- Response time and system stability monitoring

---

## 💡 Notes

- All test scenarios are based on the assumption of a demo Magento e-commerce flow.
- Postman API tests use Swagger Petstore as the mock API (for demonstration purposes).

---

## 📎 Author

Anisa Nurdyah  
QA Engineer Candidate  
