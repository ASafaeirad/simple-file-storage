# Simple File Storage: Amazon S3 Bucket Alternative

A lightweight and easy-to-use file storage for local development and testing environments.

## Usage

1. **Clone the Repository:**
   Clone this repository to your local machine.

2. **Start the Application:**
   - Using PNPM:
     ```bash
     pnpm start
     ```
   - Using Docker:
     ```bash
     docker-compose up
     ```
     *Note: You can change the local storage location by editing the `docker-compose.yml` file. By default, files are stored in the `./storage` directory at the project root.*

## Configuration

To modify default settings like `PORT` (default: 9009), create a `.env` file in the project's root. Use `.env.example` as a reference for setting environment variables.

## API

### Upload a file

- **Endpoint:** `POST /`
- **Request Type:** `multipart/form-data`
- **Request Body:**
  - `file`: The file blob to be uploaded.
- **Success Response:**
  ```typescript
  type File = {
    id: string;       // Unique id generated by nanoid for retrieval
    name: string;     // Original filename (sanitized and trimmed)
    mimeType: string; // Media type of the file, e.g., `image/png`
    size: number;     // File size in bytes
  }
  ```

### Get a file

- **Endpoint:** `GET /:id`
- **Success Response:**
  A blob with Content-Type set to the file's MIME type.
  Includes Content-Disposition for the id

### Get all files

- **Endpoint:** `GET /`
- **Success Response:**
  ```typescript
  type FilesEntity = {
    files: File[]
  }
  ```

### Delete a file

- **Endpoint:** `DELETE /:id`
- **Success Response:**
  204 Http code
