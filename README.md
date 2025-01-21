# DataTalk a React, Node.js, and PostgreSQL Chatbot

This is a chatbot application built using React, Node.js, and Supabase. The chatbot interacts with a PostgreSQL database to fetch product details based on user prompts.

![datatalker-prev](/public/datatalker-prev.png)

## Features

- Users can retrieve product information with natural-language commands.

- The chatbot supports commands such as:
    - `Show all products`
    - `Search product [name]` or `Find product [name]`
    - `Help`
- Backend powered by **Express** and **Supabase**.
- Data fetched from a **PostgreSQL** database hosted on **Supabase**.

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** Supabase (PostgreSQL)

## Database Schema

The chatbot interacts with a `products` table in the Supabase database:

| Column       | Type         | Description                                |
|--------------|--------------|--------------------------------------------|
| `id`         | `uuid`       | Unique identifier for the product          |
| `created_at` | `timestamptz`| Timestamp when the product was created     |
| `name`       | `text`       | Name of the product                       |
| `description`| `text`       | Detailed description of the product       |
| `price`      | `numeric`    | Price of the product                      |

## Setup Instructions

### Prerequisites

1. Install Node.js.
2. Create a Supabase project and set up a `products` table.

### Backend Setup

1. Clone the repository and navigate to the backend folder:

```bash
git clone https://github.com/anuragkainth/data-talker-chatbot.git
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `backend` directory and add your Supabase credentials:

```bash
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Start the server:

```bash
npm run dev
```
The server will run on `http://localhost:8000` by default.

### Frontend Setup

1. Navigate to the `root` folder and install dependencies:

```bash
npm install
```

2. Start the React app:

```bash
npm start
```

The app will run on `http://localhost:3000` by default.

## Live Demo

You can run the deployed version of this chatbot here: [datatalker-chatbot.netlify.app](https://datatalker-chatbot.netlify.app/)


The backend of this chatbot is deployed on Render. 

Please note that the backend instance may spin down due to inactivity, which can cause delays in processing requests by approximately **50 seconds or more**.
