
---

# Resource Server

Resource Server is a powerful server developed using the [NestJS framework](https://nestjs.com/), [Nginx](https://nginx.com/), [Docker](https://www.docker.com/). It's designed for serving images, videos, voices, and documents.
The Image API stands out with features such as rotation, resizing, cropping, format conversion, and grayscale application.

The Voice API ...

The Video API ...

The Document API ...

Furthermore, the project is containerized using Docker, making it modular and easy to run as a microservice.

## Table of Contents

- [Installation](#installation)
- [Running the Server](#running-the-server)
- [Folder Structure](#folder-structure)
- [Features](#features)
    - [Image API](#image-api)
- [Docker Integration](#docker-integration)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/thejramon/resource-server.git
    ```

2. Navigate to the project directory:
    ```bash
    cd resource-server
    ```

3. Install the necessary dependencies:
    ```bash
    npm install
    ```

## Running the Server

To run the server in a development environment:

```bash
npm run start:dev
```

For production:

```bash
npm run start:prod
```

The server should be running at `http://localhost:YOUR_PORT`.

## Folder Structure

```
resource-server/
|-- controller/         # Where controllers like the Resource API reside.
|-- service/            # Services that the controllers use, e.g., ImageService.
|-- dto/              
|-- middleware/             
|-- scheduler/               
|-- guard/              
|-- ...                  # Other directories and configurations.
```

## Features

### Image API

The Image API offers various utilities for serving images:

- **Rotation**: Rotate an image using the `rotate` query parameter.
- **Resizing**: Resize an image by setting `resize` to true and specifying `resizeWidth` and `resizeHeight`.
- **Cropping**: Crop an image by setting `crop` to true and providing dimensions (`cropWidth`, `cropHeight`) and the position (`cropLeft`, `cropTop`).
- **Format Conversion**: Convert the image format using the `toFormat` query.
- **Grayscale**: Make an image grayscale by setting the `gray` query to true.

Example usage:

```
http://localhost:YOUR_PORT/image?name=example&format=jpg&rotate=90&resize=true&resizeWidth=500&resizeHeight=500
```

## Docker Integration

This project is integrated with Docker and Docker Compose, making it easy to run as a microservice:

1. Build the Docker image:
    ```bash
    docker build -t resource-server .
    ```

2. If using Docker Compose, ensure the `docker-compose.yml` file is in place and run:
    ```bash
    docker-compose up
    ```


## Contributing


## License


---
