### [![Netlify Status](https://api.netlify.com/api/v1/badges/157f9f59-0d3b-4b6f-92a9-07ef9b2401a2/deploy-status)](https://app.netlify.com/sites/cobra-tube/deploys)

<div align="center">

<img alt="logo" src="public\images\logo.png" />

# [CobraTube](https://cobra-tube.netlify.app/)

## CobraTube is an video streaming platform for book lovers.

![](./showcase.gif)

</div>

---

## 📕 Table of Contents

- ### [Tech Stack](#-tech-stack)
- ### [Features](#-features)
- ### [Instructions to run the app locally](#-instructions-to-run-the-app-locally)

---

## 👨🏻‍💻 Tech Stack

### Frontend

- [Cobra UI](https://cobra-ui.netlify.app/)
- [React JS](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

### Backend

- [MockBee](https://mockbee.netlify.app/)

---

## 🚀 Features

- Home page
- Video listing page
- Single video page
- User profile page
- **Filter** Videos based on _categories_
- **Sort** videos based on _date uploaded_
- **Search** for a video from search bar
- **Like** videos
- Add/Remove videos to **watch later**
- Add/Remove videos to **playlist**
- **History** of watched videos
  - Delete a watched video from history
  - Clear the whole watch history
- Authentication
- Loading & alerts
- Infinite Scroll on single video page
- Fully Responsive

---

## 🔌 Instructions to run the app locally

- clone the repository on your local machine with the command below in your terminal, and cd into the folder

```
git clone https://github.com/sudipkundu999/CobraTube.git

cd CobraTube
```

- install dependencies

```
npm install
```

- create a `.env` file in root directory and create a variable like mentioned below

```
REACT_APP_JWT_SECRET = <JWT_SECRET_KEY_OF_YOUR_CHOICE>
```

- start the server

```
npm start
```

---

Learning and growing with [@neogcamp](https://github.com/neogcamp)
