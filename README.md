# SupportAI: AI Chat Support for Websites

SupportAI lets a business add an AI-powered customer support chatbot to any website with a single `<script>` tag. The owner signs in, enters their business details and knowledge base in a dashboard, and copies an embed snippet. Visitors can then ask questions and get answers based on that business's own information.

**Live demo:** https://ai-chat-support-psi.vercel.app

## Features

- **One-line embed:** paste a script tag before `</body>` on any website
- **Per-business knowledge base:** each owner configures their business name, support email, and knowledge
- **AI answers powered by Google Gemini**, restricted to the owner's information (no invented prices or policies)
- **Secure owner login** with Scalekit authentication
- **Dashboard** to manage chatbot settings
- **Live preview** of the widget on the embed page
- **Cross-origin support (CORS)** so the widget works on any customer website

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js (App Router) + TypeScript |
| Authentication | Scalekit |
| Database | MongoDB (Mongoose) |
| AI | Google Gemini (`@google/genai`) |
| Widget | Vanilla JavaScript (`public/chatBot.js`) |
| Hosting | Vercel |

## How It Works

1. The owner logs in through Scalekit and opens the dashboard.
2. They save their business name, support email, and knowledge base.
3. On the **Embed** page they copy a snippet like this:

   ```html
   <script
     src="https://your-domain.vercel.app/chatBot.js"
     data-owner-id="usr_xxxxxxxxxxxx">
   </script>
   ```

4. When the script loads on a customer's site, it renders a chat widget.
5. Each visitor message is sent to `POST /api/chat` with the `ownerId`.
6. The API loads that owner's settings from MongoDB, builds a system prompt from them, asks Gemini for a reply, and returns it to the widget.

## Project Structure

```
src/
  app/
    api/
      auth/            # Scalekit login and callback routes
      chat/route.ts    # Public chat endpoint (CORS enabled)
    dashboard/         # Owner dashboard
    embed/page.tsx     # Embed code + live preview
  components/          # HomeClient, EmbedClient, etc.
  lib/
    db.ts              # MongoDB connection
    getSession.ts      # Reads the session from cookies
    scalekit.ts        # Scalekit client
  model/
    settings.model.ts  # Business settings schema
  proxy.ts             # Route protection
public/
  chatBot.js           # The embeddable widget
```

## Getting Started

### Prerequisites

- Node.js 20 or later
- A MongoDB database (for example MongoDB Atlas)
- A [Scalekit](https://www.scalekit.com) account
- A [Google AI Studio](https://aistudio.google.com) API key for Gemini

### Installation

```bash
git clone https://github.com/<your-username>/AI-Chat-Support.git
cd AI-Chat-Support
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Scalekit
SCALEKIT_ENVIRONMENT_URL=https://your-env.scalekit.dev
SCALEKIT_CLIENT_ID=your_client_id
SCALEKIT_CLIENT_SECRET=your_client_secret
SCALEKIT_REDIRECT_URI=http://localhost:3000/api/auth/callback

# Gemini
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

> **Note:** Use values without a trailing slash. A trailing `/` in a base URL creates `//api/...` paths that break OAuth redirects and CORS preflight requests.

Never commit `.env` files. Make sure they are listed in `.gitignore`.

### Scalekit Setup

In the Scalekit dashboard, go to **Authentication > Redirect URLs > Allowed callback URLs** and add:

- `http://localhost:3000/api/auth/callback` (local development)
- `https://your-domain.vercel.app/api/auth/callback` (production)

The URL must match what your app sends exactly, including `https`, the path, and the absence of a trailing slash.

### Run Locally

```bash
npm run dev
```

Open http://localhost:3000.

## Embedding the Chatbot

1. Log in and open the **Embed** page.
2. Copy the script snippet.
3. Paste it before the closing `</body>` tag of any website.
4. Reload the site. The chat button appears in the bottom-right corner.

## API

### `POST /api/chat`

Public endpoint used by the widget.

**Request body**

```json
{
  "message": "What are your delivery times?",
  "ownerId": "usr_xxxxxxxxxxxx"
}
```

**Response:** the AI reply as a JSON string.

**Errors**

| Status | Meaning |
| --- | --- |
| 400 | `message` or `ownerId` is missing, or the chatbot is not configured yet |
| 500 | Server or AI error |

CORS headers are returned on every response, and `OPTIONS` preflight requests return `204`.

## Deployment (Vercel)

1. Push the repository to GitHub and import it into Vercel.
2. Add all environment variables under **Settings > Environment Variables**, enabled for Production, Preview, and Development.
3. Set `SCALEKIT_REDIRECT_URI` to `https://<your-stable-domain>/api/auth/callback`.
4. Redeploy. Environment variable changes apply only to new deployments.
5. Use your stable production domain (not per-deployment hash URLs) in the embed snippet and Scalekit redirect URLs.
6. If other sites cannot load `chatBot.js`, check that Vercel **Deployment Protection** is off for production and that `proxy.ts` does not block `/chatBot.js` or `/api/chat`.

## Troubleshooting

| Problem | Likely cause and fix |
| --- | --- |
| `redirect_uri is missing in the client configuration` | The redirect URI sent by the app does not exactly match one registered in Scalekit. Check for hash URLs, trailing slashes, and `//`. |
| 500 on `/api/auth/callback` | The token exchange failed. Check env vars on Vercel and that login and callback use the same redirect URI. |
| CORS error: "Redirect is not allowed for a preflight request" | The widget is calling a URL with `//api/chat`. Remove the trailing slash from the base URL. |
| `process is not defined` in `chatBot.js` | `public/` scripts are not bundled. Do not use `process.env` in the widget. Read the API origin from the script tag instead. |
| `ERR_CONNECTION_REFUSED` on `localhost:3000` | The widget is hardcoded to localhost, or the backend is not running. |
| Widget does not appear on another site | Open the `chatBot.js` URL directly and check the Console and Network tabs on the embedding site. |

## Roadmap

- Conversation history so the bot remembers earlier messages
- Rate limiting on `/api/chat`
- Widget colors and greeting customization
- Chat analytics and a conversation log in the dashboard

## License

Add your license here (for example MIT).

## Author

Built by Maryam Mansoor.