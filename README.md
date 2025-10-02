# WhatsApp AI Bot

A Node.js application that connects to WhatsApp using QR code authentication and responds to messages as a playful, sexy girl character using OpenAI's GPT. Perfect for automated WhatsApp conversations with AI personality.

## Features

- 🔐 **QR Code Authentication**: Secure WhatsApp account linking via QR code
- 💻 **Terminal Interface**: QR code display in terminal for quick setup
- 🔄 **Session Persistence**: Automatically saves authentication session
- 🤖 **AI-Powered Responses**: Uses OpenAI GPT for intelligent, playful responses
- 💕 **Character Personality**: Responds as a playful, flirty, and sexy girl
- 📱 **Real-time Messaging**: Automatic replies to incoming messages

## Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- WhatsApp mobile app installed on your phone
- OpenAI API key (get from [OpenAI Platform](https://platform.openai.com/api-keys))

## Installation

1. **Clone or download this project**
   ```bash
   # If you have git installed
   git clone <repository-url>
   cd whatsapp-qr-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up OpenAI API key**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env file and add your OpenAI API key
   # OPENAI_API_KEY=your_actual_api_key_here
   ```

4. **Start the application**
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## Usage

1. **Start the application:**
   ```bash
   npm start
   ```

2. **Scan the QR code:**
   - The QR code will be displayed directly in your terminal
   - On your mobile device:
     - Open WhatsApp
     - Tap the three dots menu (⋮) in the top right
     - Select "Linked Devices" or "WhatsApp Web"
     - Tap "Link a Device"
     - Scan the QR code displayed in the terminal

3. **AI Bot is ready:**
   - Once connected, the AI bot will automatically respond to incoming messages
   - Messages will show sender name, phone number, message content, and timestamp
   - The bot will generate playful, flirty responses as a sexy girl character
   - Responses are short, fun, and slightly teasing

## Configuration

### AI Character Customization

You can customize the AI character's personality by modifying the system prompt in `index.js`:

```javascript
// Function to generate AI response
async function generateAIResponse(userMessage, senderName) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a playful, flirty, and sexy girl chatting on WhatsApp. Keep responses short (1-2 sentences max), fun, and slightly teasing. Use emojis occasionally. Be confident and charming. Don't be overly explicit, just playful and flirty.`
                },
                {
                    role: "user",
                    content: `${senderName} says: "${userMessage}"`
                }
            ],
            max_tokens: 100,
            temperature: 0.8,
        });

        return completion.choices[0].message.content.trim();
    } catch (error) {
        console.error('❌ OpenAI API Error:', error.message);
        return "Hey there! 😘 Something went wrong with my brain, but I'm still here for you! 💕";
    }
}
```

### Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)

## Project Structure

```
whatsapp-ai-bot/
├── package.json          # Dependencies and scripts
├── index.js             # Main application file
├── .env.example         # Environment variables template
├── .env                 # Your environment variables (create this)
├── .wwebjs_auth/        # Authentication session (auto-generated)
└── README.md           # This file
```

## Troubleshooting

### Common Issues

1. **QR Code not appearing**
   - Make sure all dependencies are installed: `npm install`
   - Check the terminal output for any error messages

2. **Authentication fails**
   - Make sure you're scanning the QR code with the correct WhatsApp account
   - Try generating a new QR code by restarting the application
   - Clear the session data by deleting the `.wwebjs_auth` folder

3. **AI responses not working**
   - Check if the OpenAI API key is correctly set in `.env` file
   - Verify you have sufficient OpenAI API credits
   - Check the console for OpenAI API error messages
   - Ensure the WhatsApp client is connected (look for "✅ WhatsApp client is ready!" message)

4. **Application crashes**
   - Ensure Node.js version 14 or higher is installed
   - Check if all dependencies are properly installed
   - Verify your OpenAI API key is valid
   - Review the console output for specific error messages

### Session Management

The application automatically saves your WhatsApp session in the `.wwebjs_auth` folder. This means you won't need to scan the QR code every time you restart the application, unless:

- You log out from WhatsApp Web on your phone
- You delete the `.wwebjs_auth` folder
- The session expires (rare)

## Security Notes

- Never share your QR code with others
- The session data is stored locally and should be kept secure
- This bot runs on your local machine and connects to your WhatsApp account

## Dependencies

- **whatsapp-web.js**: WhatsApp Web API wrapper
- **qrcode-terminal**: Terminal QR code generation
- **openai**: OpenAI API client for AI responses
- **dotenv**: Environment variables management
- **nodemon**: Development auto-restart (dev dependency)

## Contributing

Feel free to customize and extend this application for your specific needs. Some ideas:

- Customize the AI character personality and responses
- Add message filtering based on sender or content
- Implement conversation memory/context
- Add support for media messages (images, videos, etc.)
- Create different AI personalities for different contacts
- Add message logging and analytics

## License

MIT License - feel free to use this code for your projects.

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the console output for error messages
3. Ensure all dependencies are properly installed
4. Verify your WhatsApp mobile app is up to date

---

**Happy AI Chatting! 🤖💕**
