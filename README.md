# Resume Submission Form with Next.js, MongoDB, Mongoose, and Cloudinary

![](/public/kudosware-hr-app.png)

This project is a web application built using **Next.js**, **MongoDB**, and **Mongoose**. It allows users to submit their name, email, phone number, and resume via a form. The resume is validated to be a PDF, uploaded to a temporary server folder, then uploaded to Cloudinary, and finally, the user's details and the Cloudinary URL are saved in a MongoDB database.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Architecture Overview](#architecture-overview)
  - [File Upload Process](#file-upload-process)
  - [Database Integration](#database-integration)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
  - [Form Validation](#form-validation)
  - [File Handling](#file-handling)
  - [Cloudinary Integration](#cloudinary-integration)
  - [Database Operations](#database-operations)
- [Error Handling](#error-handling)
- [Conclusion](#conclusion)

## Project Overview

This application is designed for accepting resume submissions via a web form. Users must provide:
- **Name**
- **Email** (must be unique)
- **Phone Number** (must be unique and 10 digits)
- **Resume** (PDF format only)

The project flow is as follows:
1. User submits the form.
2. The server validates the form data.
3. The resume is temporarily stored on the server.
4. The resume is uploaded to Cloudinary.
5. The user's details, along with the Cloudinary URL, are saved to MongoDB.

## Technologies Used

- **Next.js**: For server-side rendering and React-based frontend.
- **MongoDB**: A NoSQL database for storing user information.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB.
- **Cloudinary**: A cloud-based service for storing and serving media files.

## Architecture Overview

### File Upload Process

The file upload process involves several key steps:

1. **Form Submission**: The user submits their details and resume via the form.
   
2. **Validation**:
   - The server checks if the resume is a valid PDF.
   - Email and phone number uniqueness are validated against the database.

3. **Temporary Storage**: The resume is first stored temporarily on the server in the `public/temp` folder.

4. **Upload to Cloudinary**:
   - The file from the temporary folder is uploaded to Cloudinary.
   - The resume file is removed from the server once uploaded to Cloudinary.

5. **Save to Database**: The user's details and the Cloudinary URL of the resume are saved to MongoDB.

### Diagram of File Upload
Below is a flow diagram illustrating the file upload process:

```
[User Form Submission] --> [Server Validation] --> [Temporary Storage] --> [Upload to Cloudinary] --> [Get link from Cloudinary] --> [Save to MongoDB]
```

*(Insert an actual diagram image here)*

### Database Integration

- **MongoDB** is used to store user details, including the resume's Cloudinary URL.
- **Mongoose** provides a schema-based solution to model your application data, ensuring proper validation and relationships.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file and add the following variables:
   ```bash
   MONGODB_URI=<your-mongodb-uri>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## How It Works

### Form Validation

- The form requires the user to provide a name, email, phone number, and a PDF resume.
- The email and phone number fields are validated for uniqueness against the database.
- The phone number must be exactly 10 digits.

### File Handling

- **Multer** middleware is used for handling file uploads.
- The resume is first stored in the `public/temp` folder.

### Cloudinary Integration

- The resume is uploaded to Cloudinary using the Cloudinary API.
- After a successful upload, the local temporary file is deleted.
- The Cloudinary URL is stored in MongoDB.

### Database Operations

- **Mongoose** schemas define the structure of the user data.
- The email and phone fields are indexed for uniqueness.
- Upon successful validation and upload, the user’s data is saved in MongoDB.

## Error Handling

- **Validation Errors**: If any form fields fail validation, an appropriate error message is displayed.
- **File Upload Errors**: If the file upload fails, the user is alerted and the temporary file is deleted.
- **Database Errors**: If there’s an issue saving the data, the user is notified.

## Conclusion

This project demonstrates a full-stack implementation of a resume submission form using Next.js, MongoDB, Mongoose, and Cloudinary. The architecture ensures that the user data is validated, files are securely handled, and all information is stored reliably.
