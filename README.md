# AI-Case-Study-Summariser for Lumin Studio

## Introduction
An AI tool that condenses lengthy case studies into clear, structured, presentation-ready summaries for **Lumin Studio**.

## Project Structure

```
ai-case-study-summariser/
│── backend/
│   ├── index.js        
│   ├── package.json
│   ├── .env.example
│   │── .gitignore
│
│── frontend/
│── src/
│   ├── App.css     
│   ├── App.js
│   ├── index.js
│
│── README.md
│── .gitignore

```

## Tech Stack
- **Frontend**: React + Tailwind CSS  
- **Backend**: Node.js (Express)  
- **AI Engine**: Hugging Face transformer (bart-large-cnn). 
- **Deployment**: Vercel (frontend) + Render (backend)  
- **Version Control**: Git + GitHub  

## Project Setup
- Clone the repository.

```
git clone https://github.com/your-username/ai-summariser-app.git
cd ai-summariser-app
```
- Create Directory and Install Dependencies

```
mkdir backend && cd backend
npm init -y
npm install express cors dotenv node-fetch
```

- Create a .env file for your HF API key:

```
HF_API_KEY=your_hf_api_key_here
PORT=5000
```
- Create backend server and React components
- Run the Server

```
npm run dev
```
-  Run the frontend

```
npm start
```
- Test with Postman
 - For Backend

```
http://localhost:5000/summarise
```
 - For Frontend

```
http://localhost:3000
```
## API Endpoints
| Method | Endpoint     | Description                          |
| ------ | ------------ | ------------------------------------ |
| POST   | `/summarise` | Accepts raw text, returns AI summary |