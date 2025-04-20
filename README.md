# Anime Spotlight

## Overview

[**Anime Spotlight**](https://anime-spotlight.vercel.app/) is a full-stack web application for anime enthusiasts to explore, manage, and contribute to a curated list of anime series. Built with **React and Next.js** on the frontend and **Node.js with Express** on the backend, it supports detailed series pages, editing, and new entry submissions, with **server-side rendering** for enhanced performance. It connects to the [**anime-spotlight-api**](https://github.com/plhsu19/anime-spotlight-api) for robust backend data handling.

## App Preview

### Home Page

![homepage.png](/public/images/homepage.png)

### Detailed Anime View

![anime-details.png](/public/images/anime-details.png)

### Add Anime Page

![add-anime.png](/public/images/add-anime.png)

### Detailed & Edit Anime Views (Mobile)

<p>
  <img src="/public/images/anime-details-mobile.png" width="250" />
  <img src="/public/images/anime-edit-mobile.png" width="250" />
</p>

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

## **Getting Started**

Before you begin, ensure you have [Node.js](https://nodejs.org/) and npm (comes with Node.js) installed on your system.

### **Clone the repository and install dependencies:**

```bash
git clone https://github.com/plhsu19/anime-spotlight-ui.git
cd anime-spotlight-ui
npm install
```

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

## Pages

### Home Page (`index.tsx`)

- Acts as the primary entry point, showcasing a collection of anime series in a responsive card layout, with immediate edit and delete options for enhanced user convenience.
- Utilizes server-side rendering for efficient data fetching from **`anime-spotlight-api`** endpoint.

### Anime Page (`[id].tsx`)

- **View Mode**: Displays detailed information and images of an anime series, employing server-side rendering to fetch anime data efficiently.
- **Edit Mode**: Provides a pre-filled form for updating anime details, using the reusable **`AnimeForm`** component, similar to the Add New Anime page.
- Delivers interaction feedback via snackbars for user actions, including loading, successful updates or deletions, and explanations for errors.

### Add New Anime (`new-anime.tsx`)

- Utilizes the reusable **`AnimeForm`** component, allowing users to add new anime series entries.
- Implements real-time validation that highlights input fields in red and provides error messages for immediate correction, ensuring accurate data entry.

## Reusable Components

### **AnimeForm (`anime-form.tsx`)**

- A shared form component utilized for creating and editing anime entries throughout the application.
- Employs Joi for thorough on-the-fly form validation and dynamic error highlighting.
- Provides detailed error messages to assist users in correcting input mistakes.

### **Layout (`layout.tsx`)**

- Serves as the global layout wrapper, ensuring a consistent appearance across various pages.
- Includes a navigation bar and footer with links to main sections, enhancing user navigation.
- Manages active state indication for navigation links, reflecting the currently active page.

### **Card (`card.tsx`)**

- A versatile card component that succinctly presents anime information in an engaging visual layout.
- Features interactive elements such as delete and edit options, allowing direct management of anime entries from the card itself.

## State Management

The application's global state is managed using **`anime-context.tsx`** and **`anime-reducer.ts`**, which provide a centralized solution for:

1. Managing the global UI status, including loading indicators, error messages, and informational prompts, accessible and modifiable from different components within the application.
2. Facilitating add, update, and delete operations for anime series by interfacing with the **`anime-api-service.ts`**, ensuring coherent backend communication and state synchronization.

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

## Disclaimer

"Anime Spotlight" is a demonstration web app for anime fans, designed for easy access and management of anime information. All anime content and images are sourced from the internet, mainly from [Kitsu.io](http://kitsu.io/)—a social platform for anime enthusiasts—and are not intended for commercial use.