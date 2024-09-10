# Death Star Data - iOS App

## Overview

**Death Star Data** is an iOS mobile application built with React Native, acting as a data request system for the Death Star. The app interacts with AWS services like API Gateway, Lambda, and Amazon Verified Permissions (AVP) to provide fine-grained authorization based on user roles (e.g., User, Manager, Admin). Each user role has specific permissions that dictate what data can be accessed or queried.

The app enables users to make various data requests (e.g., searching for planets or people) based on their roles. The permissions for these requests are evaluated by Amazon Verified Permissions, which ensures that users can only access features they are authorized for.

### Key Features:
- Role-based access control (User, Manager, Admin)
- Integration with AWS API Gateway and Lambda
- Fine-grained authorization using Amazon Verified Permissions
- Search functionality for people and planets

---

## Architecture

1. **React Native Frontend**: 
   - Users log in by selecting their role, which determines what actions they can perform (e.g., `SearchPerson`, `SearchPlanets`, `ListPeople`).
   - The app makes requests to AWS API Gateway to retrieve data based on permissions.

2. **AWS API Gateway**:
   - Acts as a gateway for the app’s requests, routing them to AWS Lambda.

3. **AWS Lambda**:
   - Processes incoming requests and interacts with Amazon Verified Permissions to evaluate user permissions.

4. **Amazon Verified Permissions (AVP)**:
   - Evaluates policies based on user roles and attributes to allow or deny access to specific actions.
5. **Star Wars API**:
   - Third-party API that the application fetches data from regarding to Star Wars
---

## How It Works

1. **User Login**: Users select their role (User, Manager, or Admin) from the app UI.
2. **Query Submission**: Users make data requests (e.g., search for planets or people). The app sends these requests to API Gateway.
3. **Permission Check**: Lambda functions connected to API Gateway use Amazon Verified Permissions to determine if the user has the required permissions to execute the request.
4. **Result Display**: The app displays the result fetched from the Star Wars API (https://swapi.dev/api) based on the permissions evaluated and data retrieved.

---

## Running the Project

### Prerequisites

- **Node.js**
- **React Native CLI**
- **Xcode** for iOS development
- **AWS Account** with API Gateway, Lambda, and Verified Permissions setup

### Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/death-star-data.git
   cd death-star-data
2. **Install Dependencies**:
   npm install
3. **Run the App**
   - Open the project in Xcode:
      open ios/randallProject.xcworkspace
   - Alternatively, run the app using React Native CLI:
      npx react-native run-ios