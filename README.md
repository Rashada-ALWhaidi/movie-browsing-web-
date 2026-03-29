🎬 movie-browsing-web
A RESTful HTTP server for browsing and managing movies, built with Node.js built-in modules only — no frameworks, no libraries.

🚀 Getting Started
Prerequisites
Node.js 
# Installation
git clone https://github.com/your-username/movie-browsing-web-.git
cd movie-browsing-web-
npm install

# Run the Server
node main.js

📁 Project Structure
movie-browsing-web-/
├── data/
│   └── movies-db.json
├── modules/
│   ├── movies.router.js
│   ├── movies.controller.js
│   └── movies.service.js
├── main.js
├── .gitignore
├── movies.postman_collection.json
└── package.json


🔌 API Endpoints
Get All Movies
GET /movies
Response 200 OK
json[
  {
    "id": 27205,
    "title": "Inception",
    "rating": 8.364,
    "year": "7/15/2010",
    "description": "Cobb, a skilled thief..."
  }
]

Get One Movie
GET /movies/:id
Response 200 OK
json{
  "id": 27205,
  "title": "Inception",
  "rating": 8.364,
  "year": "7/15/2010",
  "description": "Cobb, a skilled thief..."
}
Error 404 Not Found
json{ "error": "Movie not found" }

Add a Movie
POST /movies
Request Body
json{
  "title": "The Dark Knight",
  "year": 2008,
  "rating": 9.0,
  "description": "Batman faces the Joker."
}

title is required. year and rating must be numbers if provided.

Response 201 Created
json{
  "id": 1,
  "title": "The Dark Knight",
  "year": 2008,
  "rating": 9.0,
  "description": "Batman faces the Joker."
}

Update a Movie
PATCH /movies/:id
Request Body — send only the fields you want to update
json{
  "rating": 9.5
}
Response 200 OK
json{
  "id": 1,
  "title": "The Dark Knight",
  "rating": 9.5
}

Delete a Movie
DELETE /movies/:id
Response 200 OK
json{ "message": "Movie deleted successfully" }

✅ Validation Rules
FieldRuletitleRequired on POSTyearMust be a number if providedratingMust be a number if provided

📬 Testing with Postman
Import movies.postman_collection.json into Postman to test all endpoints.
Download Postman: https://www.postman.com/downloads/


🛠 Tech Stack

Runtime: Node.js v22
Modules: ES Modules (ESM)
Data: JSON file (no database)
Frameworks: None
