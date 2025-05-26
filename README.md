# CORE Admin

Built with the MERN stack (MongoDB, Express, React and NodeJS).
![image](https://github.com/brainx-technologies/construction-pro-admin-frontend/assets/126351839/948ec3e3-f5ff-438e-9942-e41ebbb22357)

## CORE

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Files and Folder Structure](#file-and-folder)
- [Technologies used](#technologies-used)
  - [Client](#client)
  - [Server](#server)
  - [Database](#database)
- [Configuration and Setup](#configuration-and-setup)
- [Deployment](#deployment)

## Introduction

Summary:
The goal of this project is to develop a dashboard for Admins, supervisors and accountant where the admin can manage users, jobs, daily reports, teams, vehicles, time & attendance and payroll management. Admin is authorized to all key features while supervisor and accountant has some limitation. Meanwhile sub users can also be managed and each role have profile and settings..

## Key Features

- The admin will be able to login into the system by entering their credentials
- The Admin will be able to resett the forget password.

  #### Dashboard.

  - he admin will be able to view the Total Jobs, Total Teams,Total users and Total due amount.
  - The admin will also be able to view the graphs of Total time tracked, Payroll status, Payout Amount.

  #### Jobs Management:

  - The admin will be able to see the listing of jobs from this screen having search and filter functionality.
  - The admin will be able to perform Edit, Delete(soft delete), Search Job and Filter
  - The admin can view job details and can create new job

  #### Users Management:

  - The admin will be able view the list of all users Union ID, Name/ title.
  - The admin will be able to view the details of each user on a screen having Union ID, Name, Title, Email, Phone, Hourly Rate, Weekly Hours limit.
  - The admin will be able to delete a job (Soft Delete) as well. They will be asked for confirmation before deleting.
  - The admin can search and download certificate.
  - Filter: The admin will be able to filter the records by applying date filter for issued and validity dates.
  - The admin will be able to add a new user by providing the information about the user.

  #### Teams Management:

  - The admin will be able to view a list of all teams here having the Team ID, Team Name, Team leaders, Workers, Time Tracking Permission.
  - Edit The admin will be able to edit the team details:
  - Add Team: The admin will be able to create new teams by providing the Team Name, Team Leaders, Assign workers
  - Only Workers that are not part of any team can be added.
  - View Team Details: The admin will be able be able to view the details of each team.
  - Search, filter functionality also achieved.

  ### Time & Attendance:

  - The admin will be able to select a team from the drop down list. The list will have names of all teams in the system.
  - The admin will be able to search a record by the name of the user or job name.
  - The admin will be able to export the records in CSV
  - The admin will be able to filter records by date range filter.

  ### Payroll Management:

  - This screen will have two tab: Paid Payroll & Unpaid payroll
  - The admin will be able to select a team from the drop down list. The list will have names of all team members in the system. Team members didn’t have any team assigned, will be shown under “Workers without team”.
  - The data shown will be for the last week & earlier.
  - The admin can update the status of dues
  - The admin can search and delete record.
  - Expand: The admin will be able to view a detailed breakdown of time tracked by the worker by clicking on the expand button in the actions menu.
  - Payment Rule Configuration: The admin will be able to configure payment rules for all workers in the system from here.

  ### Daily Report:

  - The admin will be able to view the daily logs of all teams here.
  - Daily Log detail screen.
  - Edit the time track can be done.
  - The admin is be able to approve the daily log sheet.
  - The admin will be able to search and filter records.
  - View history: The admin will be able to view previous daily logs for any team.
  - Vehicle Tab: This section contain vehicles on each job and team and their status that could be approved or rejected.
  - There is also history tab for materials also.

  ### Manage Certificates:

  - The admin will be able to view the list of all certificates here.
  - They will be able to view which users are assigned a specific certificate by clicking on the eye icon.
  - Assign Certificates: The admin will be able to assign certificates to the workers and other users.
  - Create Certificates: The admin will be able to create new certificates by clicking on the create new button.
  - The admin will be able to search, edit and disable certificate.

  ### Manage Sub Users:

  - The admin will be able to manage the admin panel users from here.
  - Site Supervisor: By default a site supervisor will only be able to view and access the following sections:
    - Jobs Management
    - User Management (without the option of being able to configure payment rules)
    - Teams Management
    - Time and Attendance
    - Accountant & Admins

  ### Notifications:

  - The admin will be notified when the user’s certificate is expired.

  ### Edit Profile:

  - The admin will be able to change or remove their photo.
  - The admin will be able to change their name.

  ### Settings:

  - The admin will be able to change their password from here.
  - They will have to provide their current password.
  - They will have to add a new password and then confirm it again.

  ### Vehicles Management:

  - Admin should be able to add/edit/delete any vehicle in this section:
  - Vehicle Listing of all vehicles with search and filters.

  ### Safety Forms:

  - All the forms submitted by workers/team leads after using the vehicle will be displayed here, under the section Operator’s Daily Logbook.
  - Admin should be able to view the form in PDF and the form should also be downloadable.

- Authentication using jsonwebtoken (jwt) and Google auth

## Files and Folder Structure

```
├── public
├── README.md
└── src
    ├── App.js
    ├── assets
    │   ├── css             # Global css files used by project
    │   ├── fonts           # Different Fonts used by project
    │   ├── icons           # Containing all the icons used by project
    │   ├── images          # Images used by project
    ├── components          # Containing all the Argon components
    │   ├── ArgonAlert
    │   │   ├── ArgonAlertCloseIcon.js
    │   │   ├── ArgonAlertRoot.js
    │   │   └── index.js
    │   ├── ArgonAvatar
    │   │   ├── ArgonAvatarRoot.js
    │   │   └── index.js
    ├── examples            # Contains layouts, charts, resuable templates, list and Data tables
    │   ├── Breadcrumbs
    │   ├── Calendar
    │   │   └── index.js
    │   ├── Charts
    │   ├── Footer
    │   │   └── index.js
    │   ├── Items
    │   │   ├── DefaultItem
    │   │   │   ├── index.js
    │   │   └── NotificationItem
    │   │       ├── index.js
    │   ├── LayoutContainers
    │   │   ├── DashboardLayout
    │   │   │   └── index.js
    │   │   └── PageLayout
    │   │       └── index.js
    │   ├── Lists
    │   │   ├── CategoriesList
    │   │   │   └── index.js
    │   │   ├── ProfilesList
    │   │   │   └── index.js
    │   ├── MultiDropdown
    │   │   ├── MultiDropdown.css
    │   │   └── MultiDropdown.jsx
    │   ├── Tables
    │   │   ├── DataTable
    │   │   │   └── index.js
    ├── index.js
    ├── layouts                 # Contains all the custom-built components
    │   ├── authentication
    │   │       └── index.js
    │   ├── certificates
    │   │       └── index.js
    │   ├── Jobs
    │   │       └── index.js
    ├── page.routes.js
    ├── routes.js               # Routes of project
    ├── services                # Contains all the API services
    │   ├── CertificateService.js
    │   ├── JobService.js
    │   ├── authService.js
    └── socket.js
```

## Technologies used

This project was created using the following technologies.

#### Client

- React JS
- React-router-dom (To handle routing)
- Axios (for making api calls)
- Material UI & CSS Module (for User Interface)
- Apex Charts (to display payment history)
- Google Map
- Argon Dashboard Components

#### Server

- Express
- Mongoose
- JWT (For authentication)
- bcryptjs (for data encryption)
- Nodemailer (for sending invoice via email)
- html-pdf (for generating invoice PDFs)

#### Database

MongoDB (MongoDB Atlas)

## Configuration and Setup

In order to run this project locally, clone the repository.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)

In the terminal first go to cloned project folder.

```
cd construction-pro-admin-frontend
```

- create a .env file in the root of your project directory.
- Supply the following credentials

```
REACT_APP_BACKEND_URL= " "  //your backend url
REACT_APP_MAP_API_KEY=" "  // Google Map API
```

- Install require packages

```
npm install
npm start
```

## Deployment

- #### Prerequisites
- An AWS account
- Basic knowledge of AWS services like EC2, S3, and IAM
- Git installed on your local machine
- ### Deployment Steps

1. Prepare your frontend code, Ensure your frontend code is production-ready by running a build command. For example, if you're using React.js, run:

```
npm run build
```

2.  Create an AWS EC2 instance
    - Log in to your AWS Management Console.
    - Navigate to the EC2 service.
    - Launch an EC2 instance with the desired specifications (e.g., Ubuntu Server).
    - Configure security groups to allow inbound traffic on ports 80 and 443 (HTTP and HTTPS).
3.  SSH into your EC2 instance

```
ssh -i your-key.pem ec2-user@your-ec2-public-ip
```

4. Install necessary software on your EC2 instance, Update package lists:

```
sudo apt update
```

5.  Install Node.js, npm,mongoose, express and other dependencies required to run your frontend:

```
sudo apt install nodejs npm mongoose express cors body-parser
```

6.  Copy your frontend code to the EC2 instance
    You can use SCP or SFTP to transfer your frontend code to the EC2 instance or clone git repo by:

```
git clone https://github.com/brainx-technologies/construction-pro-admin-frontend.git
```

7. Go to project directory and install npm packages

```
npm install
```

8. Serve your frontend using a web server like Nginx

```
sudo apt install nginx
```

9. Configure Nginx to serve your frontend:

```
sudo nano /etc/nginx/sites-available/default
```

- Add the following content

```
server {
        root /var/www/core-admin/build;
        index index.html index.htm index.nginx-debian.html;
        server_name admin admin.coreapp.ca;
        location / {
                try_files $uri /index.html;
        }
	     underscores_in_headers on;

}
```

```
sudo service nginx restart
```

10. Access your deployed frontend
    Navigate to your EC2 instance's public IP address in a web browser to access your deployed frontend.

- Domain Name: Optionally, you can associate a domain name with your EC2 instance using Route 53 or another domain registrar.
- HTTPS: Set up SSL/TLS certificates using ACM or Let's Encrypt for secure communication.
- Automation: Consider automating deployment using tools like AWS CodeDeploy or setting up CI/CD pipelines with AWS CodePipeline.
