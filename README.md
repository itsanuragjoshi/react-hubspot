# HubSpot CRM Integration Project

Welcome to the HubSpot CRM Integration Project! This app provides an intuitive interface to view, manage, and organize contacts, companies, and tickets from HubSpot's CRM.

## Features
- **View Contacts and Companies:** Easily see lists of contacts with their details and look up company information.
- **Add New Contacts:** Quickly add new contacts to the CRM with an easy-to-use form.
- **Pagination for Large Data Sets:** Navigate large lists of contacts and companies, with options to select the number of results displayed per page.
- **Ticket Status Tracking:** View and track the status of support tickets within your HubSpot CRM.

## Prerequisites
To set up and run this project, you need:
- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)

## Installation and Setup

### 1. Download the Project
- Download the ZIP of the project from GitHub.
- Unzip the file and navigate to the main project folder.

### 2. Frontend Setup
1. Navigate to the frontend folder: ```cd frontend```
2. Install the necessary packages: ```npm install```
3. Start the frontend development server: ```npm run dev```

### 3. Backend Setup
1. Navigate to the backend folder: ```cd backend```
2. Install the necessary packages: ```npm install```
3. Start the frontend development server: ```npm run dev```

### 4. Environment Variables
To connect with the HubSpot API, you'll need to create an .env file in the backend folder. This file should store the HubSpot API key and other necessary environment variables.
Here's an example of what your .env file might look like:
```
HUBSPOT_API_ACCESS_TOKEN=pyour_hubspot_api_key_here
HUBSPOT_API_CONTACTS=https://api.hubapi.com/crm/v3/objects/contacts
HUBSPOT_API_COMPANIES=https://api.hubapi.com/crm/v3/objects/companies
HUBSPOT_API_TICKETS=https://api.hubapi.com/crm/v3/objects/tickets
```
Replace ```your_hubspot_api_key_here``` with your actual HubSpot API key.

### 5. Accessing the Project
- Once both servers are running, you can access the frontend at http://localhost:5173 (or as configured for Vite).
- Ensure the backend is running on at http://localhost:3000 for API calls.
