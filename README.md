<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# AI Learning Platform API

A NestJS-based backend service that provides AI-powered learning content and interactive questions.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- A valid OpenAI API key
- A valid Gemini API key

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
GEMINI_ENGINE=your_gemini_engine
PORT=3000
```

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run start:dev

# Start production server
npm run start:prod
```

## API Documentation

### 1. Generate Playground Question
Generate an age-appropriate question based on specified topics and difficulty level.

**Endpoint:** `POST /api/v1/ai/playground`

**Request Body:**
```json
{
    "topics": "JavaScript",
    "level": 2,
    "age": 25
}
```

**Response:**
```json
{
    "text": "In modern JavaScript frameworks like React and Vue.js, how is 'undefined' increasingly being handled to prevent common errors related to missing data in components?",
    "options": [
        "Through the use of optional chaining and nullish coalescing operators for safer property access.",
        "By globally replacing all 'undefined' values with a default placeholder value using a build-time script.",
        "By throwing exceptions when 'undefined' values are encountered to force explicit handling.",
        "By automatically converting 'undefined' values to empty strings during component rendering."
    ],
    "correctAnswer": 0,
    "explanation": {
        "correct": "Optional chaining and nullish coalescing allow safer access to nested properties, preventing errors.",
        "key_point": "Safer property access."
    },
    "difficulty": 2,
    "topic": "JavaScript",
    "subtopic": "Undefined Handling",
    "questionType": "Conceptual",
    "ageGroup": "25"
}
```

### 2. Explore Content
Generate exploratory content with related topics and follow-up questions.

**Endpoint:** `POST /api/v1/ai/explore`

**Request Body:**
```json
{
    "query": "What is the Internet?",
    "age": 25
}
```

**Response:**
```json
{
    "text": "The Internet is basically a massive network connecting billions of devices globally...",
    "topics": [
        {
            "topic": "TCP/IP protocol",
            "type": "prerequisite",
            "reason": "Communication basis"
        },
        // ... more topics
    ],
    "questions": [
        {
            "question": "How does the Internet physically exist under the ocean floor?",
            "type": "curiosity",
            "context": "Physicality"
        },
        // ... more questions
    ]
}
```

## Rate Limiting
The API implements the following rate limits per IP address:
- 15 requests per minute
- 250 requests per hour
- 500 requests per day

## Error Handling
The API returns standard HTTP status codes:
- 200: Success
- 400: Bad Request
- 429: Too Many Requests
- 500: Internal Server Error

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
