<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1ZyQ_X5yauVIQJ3fO2KRL8K2p5B-aw4vG

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. For Pinata integration, set the `VITE_PINATA_JWT` and `VITE_PINATA_GATEWAY` in [.env.local](.env.local)
4. Run the app:
   `npm run dev`

## Pinata Integration

This project includes integration with Pinata.cloud for IPFS file storage. See [PINATA_INTEGRATION.md](PINATA_INTEGRATION.md) for detailed setup instructions.