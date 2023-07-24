# [Please read this section to properly run the application](#about-environmental-variables)

<br />

<div align="center">
  <h3 align="center">SkyLending FrontEnd</h3>
  <p align="center">
    Welcome to the Sky Lending FrontEnd codebase.
  </p>
</div>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#about-environmental-variables">Environmental Variables</a></li>
        <li><a href="#about-admin-accounts">Admin Accounts</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

## About The Project

This project is a frontend User managing tool, it integrates with a server developed on ExpressJS w/ Typescript and MongoDB. Authentication is solved as well, having protected routes for any role related action. Available roles are `admin` and `user`, admin accounts cannot be created through the application logic, those are created directly on the database.

Users have the capability to create an account, logIn, update and retrieve their personal information.

Admins, in the other hand, have the capability to retrieve information on every user in the database.

### Built With

This repository was made using the following technology stack:

- NextJS
- Redux Toolkit
- Typescript
- ESLint w/Prettier
- Axios
- YUP
- React Hook Form

## Getting Started

### About environmental variables

No env variable is needed to be able to run this application.

### About Admin Accounts

Admin accounts can not be created through an endpoint, those are created modifying directly the database. An already created admin account is,

```json
{
  "username": "admin",
  "password": "Admin1234"
}
```

### Installation

Use the package manager [yarn](https://yarnpkg.com/) to install SkyLending Server.

1. Clone the repo
   ```
   git clone https://github.com/martinraveglia/sky-lending-backend.git
   ```
2. Install NPM packages
   ```
   yarn install
   ```
3. Run the development server:
   ```bash
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

<p align="right"><a href="#please-read-this-section-to-properly-run-the-application">🔼 Back to top</a></p>
