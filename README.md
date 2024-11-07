# Gerald's Website

Built w/ Next.js 14.

## Features

- **Next.js 14**: Utilizes the latest features of Next.js for fast rendering and efficient SEO optimization.
- **Notion API**: Integrates Notion as a headless CMS to manage and retrieve blog content dynamically.
- **Responsive Bento Design**: Adopts the aesthetic and functional principles of Bento design, customized for a unique look and feel.
- **OpenAI Integration**: Adopts the power of OpenAI for fun interactions.
- **EMAIL Integration**: With Email.js the website can send emails to you if someone submit the webform.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16.x or later recommended)
- pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/itsEricWu/ericwu.me.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```plaintext
    OPENAI_API_KEY=exampleAPIKey
    NEXT_PUBLIC_MAPBOX_TOKEN=exampleAPIKey
    NEXT_PUBLIC_FIREBASE_API_KEY=exampleAPIKey
   ```

### Running the project

To run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

