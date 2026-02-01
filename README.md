# Skience - A Modern Science Notes App

This is a Next.js application designed to help students study biology topics.

## Getting Started

Follow these instructions to get the project running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm (Node Package Manager) installed on your computer. You can download them from [nodejs.org](https://nodejs.org/).

### Installation

1.  **Clone the repository (if you haven't already):**
    If you have the project files, you can skip this step. Otherwise, clone the repository to your local machine.

2.  **Install dependencies:**
    Open a terminal in the project's root directory and run the following command to install all the necessary packages:
    ```bash
    npm install
    ```

### Environment Variables

The application uses Genkit for its AI features, which requires an API key for the Google AI (Gemini) models.

1.  **Create an environment file:**
    In the root of your project, create a file named `.env.local` by making a copy of the existing `.env` file.

2.  **Add your API key:**
    Open the `.env.local` file and add your Google AI API key like this:
    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```
    You can get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Development Server

Once the dependencies are installed and the environment variables are set up, you can start the local development server.

1.  **Run the `dev` script:**
    ```bash
    npm run dev
    ```

2.  **Open the application:**
    The server will start, typically on port 9002. Open your web browser and go to:
    [http://localhost:9002](http://localhost:9002)

You should now see the application running locally! Any changes you make to the source code will automatically be reflected in your browser.
