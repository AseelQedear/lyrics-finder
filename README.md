# Lyrics Finder Web App - README

## Project Overview

The **Lyrics Finder Web App** allows users to search for song lyrics and find relevant YouTube videos. The app provides a user-friendly interface to input artist names and song titles, retrieves lyrics from the **Lyrics.ovh API**, and displays related YouTube videos using the **YouTube Data API**.

### Features:
- **Lyrics Search**: Users can search for song lyrics by entering an artist name and song title.
- **YouTube Integration**: Displays a relevant YouTube video based on the song and artist input.
- **Light & Dark Mode**: Toggle between light and dark themes for better readability.
- **Responsive Design**: The app is fully responsive, ensuring a smooth experience on mobile and desktop devices.

---

## Tech Stack

- **HTML5**: Structure of the web page.
- **CSS (Sass)**: Styling the app, including responsive design, and light/dark mode functionality.
- **Bootstrap 5**: Provides pre-built UI components like buttons, cards, and alerts for an intuitive design.
- **JavaScript (TypeScript)**: Used to handle the app logic, interact with APIs, and update the DOM dynamically.
- **YouTube Data API**: For fetching YouTube video information.
- **Lyrics.ovh API**: For fetching song lyrics.

---

## Installation

1. **Clone the Repository**:
   - Clone the project from GitHub to your local machine using the following command:
     ```bash
     git clone <repository-url>
     ```

2. **Open in Visual Studio Code**:
   - Navigate to the project folder and open it in Visual Studio Code:
     ```bash
     code <project-folder>
     ```

3. **Install Dependencies**:
   - The project doesn't require additional dependencies, but you can install any necessary ones using **npm** or **yarn** if needed (e.g., for building Sass files).

---

## Usage

1. **Open `index.html`**:
   - Open `index.html` in your browser to run the app locally. Alternatively, you can use a local development server to host the files.

2. **Search for Lyrics**:
   - Enter the artist's name and the song title in the corresponding fields.
   - Click the "Find Lyrics" button to search for the lyrics and watch the song on YouTube.

3. **Toggle Dark/Light Mode**:
   - Use the **☀️** (light mode) and **🌙** (dark mode) buttons to switch between themes.

---

## Code Structure

### 1. **HTML (index.html)**
   - Contains the basic structure of the app: search form, results area, and dark/light mode toggle buttons.

### 2. **CSS (style.css)**
   - Styles the app using Sass variables for colors, typography, and layout. Includes rules for both light and dark modes, along with responsive design for different screen sizes.

### 3. **JavaScript (main.ts)**
   - Handles the logic for searching lyrics and YouTube videos. Uses `fetch` to interact with external APIs and updates the DOM with results.

### 4. **Sass Variables**:
   - Defined at the top of `style.css`, the Sass variables make it easier to manage and modify the app's design system, such as colors, font families, and transition timings.

---

## API Keys

- **YouTube Data API Key**:
  - You will need a valid **YouTube Data API key** to fetch YouTube video information. You can get your key from the Google Cloud Console and replace it in the code.

  ```typescript
  const youtubeAPIKey = 'YOUR_YOUTUBE_API_KEY';
  ```

- **Lyrics API**:
  - The app uses the **Lyrics.ovh API** which doesn’t require an API key for basic usage.

---

## Additional Features

- **Keyboard Support**: Press **Enter** after filling in the artist and song title fields to trigger the search.
- **Loading Spinner**: A spinner is shown while the app fetches the lyrics and YouTube data.
- **Responsive Design**: The app adjusts its layout depending on the screen size, providing a seamless experience on mobile, tablet, and desktop devices.

---

## Known Issues

- **API Limits**: The YouTube API may have rate limits depending on the API key usage.
- **No Results**: If no video or lyrics are found, appropriate messages will be displayed.
