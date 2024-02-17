# Anime Spotlight

## Overview

"Anime Spotlight" is a responsive web application designed for anime fans to explore, manage, and contribute to a curated anime series list. Developed with React.js and Next.js, it offers detailed series information, editing capabilities, and new entry addition, enhanced by server-side rendering for better performance. It integrates with [anime-spotlight-api](https://github.com/plhsu19/anime-spotlight-api) for robust backend data handling.

## Features

### Product

- **Anime Listing**: Displays a list of anime with essential details like title, episode count, and user ratings.
- **Detailed Insights**: Offers a dedicated page for each anime series, providing comprehensive information and visual media.
- **Editing Mode**: Allows users to update anime information through a detailed form with robust field validation.
- **New Anime Addition**: Users can contribute new anime series to the list, enriching the community's experience.
- **Responsive Design**: Optimized for various screen sizes, ensuring a seamless experience across devices.
- **Server-Side Rendering (SSR):** Enhances performance and SEO by pre-rendering pages on the server, ensuring faster load times and improved visibility on search engines.

### Technical

- **Reusable Components**: Leverages reusable components to streamline development and maintain consistency across the application.
- **State Management**: Employs React Context and Reducer for global state management, enhancing data consistency and component interaction for a cohesive UI.

## Pages

### Home Page (`index.tsx`)

- Serves as the main entry point, showcasing a collection of anime series in a responsive card layout.
- Implements server-side rendering to fetch anime data from `anime-spotlight-api` for optimal performance.
- Features quick edit and delete options for each anime directly from the card for user convenience.

### Anime Page (`[id].tsx`)

- View Mode: Presents all details of an anime series, including poster and cover images.
- Edit Mode: Provides a pre-filled form for updating anime information.
- Uses shared component `anime-form.tsx` for editing.

### Add New Anime (`new-anime.tsx`)

- Uses shared `anime-form.tsx` component for users to add new anime series.
- Includes form validation and error handling for seamless user input.

## Reusable Components

### AnimeForm

- Shared form component used across the application for creating and editing anime entries.
- Leverages Joi for comprehensive form validation and error highlighting on the fly.
- Detailed error messages guide users through the correction process.

### Layout

- Acts as the global layout wrapper for the application, providing a consistent look across different pages.
- Contains the navigation bar and footer, which include links to the main sections of the application.
- Manages the selected state for navigation links to indicate the current active page.

### Card

- A reusable card component that displays anime information succinctly in a visually appealing format.
- Includes interactive elements like edit and delete options, enabling users to manage anime entries directly from the card.

## **State Management**

The application's state is managed using **`AnimeContext`** combined with an **`animeReducer`**, orchestrating the state flow and interaction with the **`AnimeApiService`** for backend communication.

## **Installation and Setup**

Before you begin, ensure you have [Node.js](https://nodejs.org/) and npm (comes with Node.js) installed on your system.

### **Clone the Repository**

```bash
git clone https://github.com/plhsu19/anime-spotlight-ui.git
cd anime-spotlight-ui
```

### **Install Dependencies**

```bash
npm install
```

This will install all the necessary dependencies listed in **`package.json`**, including React, Next.js, and Material-UI libraries.

### **Running the Server**

To get the development server running:

```bash
npm run dev
```

This command will start a local development server at **`http://localhost:3000`**. The app will automatically reload if you make changes to the code.

For a production build:

```bash
npm run build
npm run start
```

After building the project, **`npm run start`** will run the application in production mode.

### **Linting**

To ensure your code conforms to the project's coding standards, run the linter:

```bash
npm run lint
```

## Technologies

- **Next.js**: A React framework for server-side rendering and static site generation.
- **Material-UI**: A React component library for implementing Google's Material Design.
- **Joi**: A powerful schema description language and validator for JavaScript objects.

## Contributions

Contributions are welcome! If you'd like to contribute, please:

1. **Fork** the repository.
2. **Create a new branch** for your changes.
3. **Open a pull request** against the main branch when you're ready to submit your changes, and ask for a review.

## License

This project is open source - see the [License](notion://www.notion.so/LICENSE) file for details.

## Feedback and Support

For feedback, issues, or support, please open an issue on the GitHub repository, and I’ll get back to you promptly.