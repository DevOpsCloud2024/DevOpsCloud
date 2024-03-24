# StudentShare - The online platform

## Table of contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Register and log in](#register-and-log-in)
5. [Uploading](#uploading)
6. [Rating](#rating)
7. [Editing and deletion](#editing-and-deletion)
8. [Course enrollment](#course-enrollment)
9. [Filter](#filter)
10. [Adding types or labels](#adding-types-or-labels)
11. [Adding courses](#adding-courses)

## Introduction
This repository contains the code needed for our project for DevOps @ UvA. The project is a web application that allows students to share documents with each other. The documents can be rated on relevance and filtered on type, label, and course. Users can also enroll in courses and receive emails when new documents are posted related to that course. Admins can add types, labels, and courses. They can also delete posts and receive notifications when a post has a low rating.

## Installation
To locally run the application, you need to have Docker installed. You can download Docker [here](https://docs.docker.com/get-docker/). After installing Docker, you can simply clone the repistory and run the following command in the root directory of the project:
```bash
docker compose up --build nginx -d
```

This will build the containers needed for the application and run them. The application will be available at `localhost:8000`.

After building the containers, several initializations are needed. The following commands need to be be run:
```bash
# Install the backend dependencies
docker compose run --rm composer install
# Install the frontend dependencies
docker compose run --rm npm i
# Generate the key for the application
docker compose run --rm artisan key:generate
# Migrate the database
docker compose run --rm laravel-migrate-seed
```

To ensure the application builds correctly, an `.env` file needs to be created in the root directory of the project. The example file
`.env.example` from the `src/` directory can be copied and renamed to `.env`. The following variables need to be changed:
```bash
DB_HOST=mysql
DB_PASSWORD=laravel
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
REDIS_HOST=redis
```

## Usage

To start using the application, the front-end assets need to be compiled through Vite. For production, the following command builds the assets:
```bash
docker compose run --rm --service-ports npm run build
```
However, for development it is recommended to build in development mode, to
allow hot reloading:
```bash
docker compose run --rm --service-ports npm run dev
```

To install new packages, run migrations, or run any other artisan command, you can use the following commands:
```bash
# Install a new backend package
docker compose run --rm composer require vendor/package
# Run a migration
docker compose run --rm laravel-migrate-seed
# Run any artisan command
docker compose run --rm artisan command
# Format the backend code
docker compose run --rm pint .
```

## Register and log in

The first step is to create an account and to log in. User who already have an account can log in immediately.
![login2](https://github.com/DevOpsCloud2024/DevOpsCloud/assets/79517447/8bfb1341-e854-4958-b8bd-27625eff1565)
![register2](https://github.com/DevOpsCloud2024/DevOpsCloud/assets/79517447/cdbf9bcd-6cab-487d-95e5-e1957995297a)


## Uploading

Documents must be posted with their relevant information. Only types and labels can be left blank, all others must be filled in.

![upload2](https://github.com/DevOpsCloud2024/DevOpsCloud/assets/79517447/c3a979af-5d13-4857-9b85-91afc85b4538)

## Rating

Posts of other users can be rated on relevance. It is not possible to rate your own posts. Posts can be rated from 1 to 5 and the average rating of each document is shown.

![rate2](https://github.com/DevOpsCloud2024/DevOpsCloud/assets/79517447/f379d272-a4d5-489b-abd9-b58959bfb39c)


## Editing and deletion

You can edit or delete your post. Edit allows you to change the text while delete will remove the posts. Admins can also remove posts. Admins get a notification if the rating drops below a certain threshold and has enough ratings. They can then look at the post and decide whether to delete it.
![edit2](https://github.com/DevOpsCloud2024/DevOpsCloud/assets/79517447/d0f35714-67fc-4fd6-971a-57ff18f7063e)

## Course enrollment
Students can enroll into courses. They will then receive an email to verify their choice. After the verification, they will get emails when new documents are posted related to that course.
![enroll2](https://github.com/DevOpsCloud2024/DevOpsCloud/assets/79517447/cbf3a731-3355-451a-a761-154bdf0b4edb)


## Filter
Users can filter on type, label, and course to find the desired documents. The filter will show posts that have at least one of the the requested types, labels, and courses.
The following example will search for all posts with type "Summary" and label "Math".
![filter2](https://github.com/DevOpsCloud2024/DevOpsCloud/assets/79517447/c2303d49-38e6-4067-af8a-317ec87318db)


In case both "Summary" and "Exam" are selected as types, all posts with either "Summary" or "Exam" are shown.


## Adding types or labels
Admins can add types or labels. They must be unique, two types named "Exam" is not allowed.
![new_type2](https://github.com/DevOpsCloud2024/DevOpsCloud/assets/79517447/e2b28f38-838d-4861-ba2d-e85649e21668)

## Adding courses
Admins can also add courses.

![new_course2](https://github.com/DevOpsCloud2024/DevOpsCloud/assets/79517447/5719891d-f04b-4701-91fb-b92ef55b874c)



