# Deep Storm ML

Deep Storm ML is a Next.js application integrated with Vercel AI chatbot, AWS S3, and PostgreSQL. This project aims to provide a seamless experience for users to interact with AI and manage data efficiently.

## Features

- **Next.js**: A React framework for server-side rendering and static site generation.
- **Vercel AI Chatbot**: An AI-powered chatbot for enhanced user interaction.
- **AWS S3**: Integration with Amazon S3 for scalable storage solutions.
- **PostgreSQL**: A powerful, open-source relational database system.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- AWS account
- PostgreSQL database

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/jahid-git/deepstormml.git
    cd deepstormml/client
    ```

2. Install dependencies:

    ```bash
    pnpm i
    ```

3. Set up environment variables:

    Create a `.env.local` file in the root directory and add the following:

    ```env
    OPENAI_API_KEY=your-openai-api-key
    FIREWORKS_API_KEY=your-fireworks-api-key
    BLOB_READ_WRITE_TOKEN=your-blob-read-write-token
    POSTGRES_URL=your-postgresql-database-url
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    GITHUB_CLIENT_ID=your-github-client-id
    GITHUB_CLIENT_SECRET=your-github-client-secret
    AUTH_SECRET=your-auth-secret
    AUTH_GOOGLE_ID=your-auth-google-id
    AUTH_GOOGLE_SECRET=your-auth-google-secret
    AUTH_GITHUB_ID=your-auth-github-id
    AUTH_GITHUB_SECRET=your-auth-github-secret
    AWS_ACCESS_KEY_ID=your-aws-access-key-id
    AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
    AWS_REGION=your-aws-region
    AWS_S3_BUCKET_NAME=your-s3-bucket-name
    ```

### Running the Application

1. Start the development server:

    ```bash
    pnpm dev
    ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please contact [jahidsite0@gmail.com](mailto:jahidsite0@gmail.com).

---

# Deep Storm ML Backend

Deep Storm ML Backend is a Python Flask application integrated with Agno for AI capabilities, AWS S3 for storage, and PostgreSQL for database management. This backend service supports the Deep Storm ML frontend application.

## Features

- **Flask**: A lightweight WSGI web application framework in Python.
- **Agno**: AI integration for enhanced backend capabilities.
- **AWS S3**: Integration with Amazon S3 for scalable storage solutions.
- **PostgreSQL**: A powerful, open-source relational database system.

## Getting Started

### Prerequisites

- Python 3.8+
- pip
- AWS account
- PostgreSQL database

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/jahid-git/deepstormml.git
    cd deepstormml/server
    ```

2. Create a virtual environment and activate it:

    ```bash
    python -m venv venv
    source venv/bin/activate
    ```

3. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Set up environment variables:

    Create a `.env` file in the root directory and add the following:

           ```env
        OPENAI_API_KEY=your-openai-api-key
        GEMINI_API_KEY=your-gemini-api-key
        FIREWORKS_API_KEY=your-aws-access-key-id
        GROQ_API_KEY=your-groq-api-key
        ```

### Running the Application

1. Start the Flask development server:

    ```bash
    python run.py
    ```

2. The backend server will be running at [http://localhost:5000](http://localhost:5000).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please contact [jahidsite0@gmail.com](