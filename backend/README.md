# HUMAIRE Backend

Human-first Ethical AI Platform backend (Express + MongoDB)

Quick start:

1. Copy `.env.sample` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies: `npm install`
3. Run in dev: `npm run dev` (requires `nodemon`) or `npm start`.

API endpoints:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- POST /api/ai/query
- GET /api/ai/history
- GET /api/admin/users (admin only)
- GET /api/admin/logs (admin only)

Notes:
- AI service is simulated in `services/aiService.js` and moderation in `services/moderationService.js`.
- Uses JWT for auth and bcryptjs for password hashing.
AI Recruitment Backend
This is the backend for the AI-powered recruitment system.

Setup
Install Dependencies:

npm install
Environment Variables: Ensure your .env file is configured with:

PORT
MONGO_URI
GEMINI_API_KEY
FINDWORK_API_TOKEN
JOB_API_URL
Run Application:

Dev: npm run dev
Start: npm start
API Endpoints
Base URL: http://localhost:5000

1. Job Management
Fetch Jobs (Trigger)
Fetches job offers from an external API (Findwork.dev) and stores them in the database.

Method: POST
Endpoint: /api/jobs/fetch
Body: None
Response (200 OK):
{
  "message": "Jobs fetched successfully",
  "count": 50
}
List All Jobs
Retrieves all job offers stored in the database.

Method: GET
Endpoint: /api/jobs
Response (200 OK):
[
  {
    "_id": "651b...",
    "title": "Software Engineer",
    "company": "Tech Corp",
    "location": "Remote",
    "description": "...",
    "createdAt": "2024-01-01T10:00:00Z"
  }
]
2. CV Management
Upload CV
Uploads a user's CV (PDF or DOCX), parses the text content, and saves it.

Method: POST
Endpoint: /api/cvs
Content-Type: multipart/form-data
Body:
file: The CV document (File)
Response (201 Created):
{
  "message": "CV uploaded and processed successfully",
  "cv": {
    "_id": "651a...",
    "filename": "173...-resume.pdf",
    "originalName": "resume.pdf",
    "extractedText": "User's CV text content..."
  }
}
3. Analysis Service
Analyze CV against a Job
Compares a specific CV with a specific Job using Gemini AI.

Method: POST
Endpoint: /api/analyze/cv-job
Content-Type: application/json
Body:
{
  "cvId": "651a...", 
  "jobId": "651b..."
}
Response (200 OK):
{
  "_id": "651c...",
  "cv": "651a...",
  "job": "651b...",
  "compatibility_score": 85,
  "strengths": ["React experience", "Node.js proficiency"],
  "weaknesses": ["Lack of Python knowledge"],
  "missing_skills": ["AWS", "Docker"],
  "improvement_suggestions": ["Learn basic containerization concepts"]
}
Analyze CV against All Jobs
Compares a CV against all available jobs and returns a ranked list of matches.

Method: POST
Endpoint: /api/analyze/cv-all-jobs
Content-Type: application/json
Body:
{
  "cvId": "651a..."
}
Response (200 OK):
[
  {
    "compatibility_score": 95,
    "job": {
      "_id": "651b...",
      "title": "Frontend Developer",
      ...
    },
    "strengths": [...],
    "weaknesses": [...]
  },
  ...
]
Error Handling
Standard error responses:

400 Bad Request: Missing required fields or invalid input.
{ "message": "cvId and jobId are required" }
404 Not Found: Resource (CV or Job) not found.
{ "message": "Job not found" }
500 Internal Server Error: Server-side processing error (e.g., Gemini API failure).
{ "message": "Internal Server Error", "stack": "..." }