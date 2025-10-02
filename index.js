const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

// Load environment variables manually
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    console.log('🔍 Debug - .env file content:', envContent);
    const lines = envContent.split('\n');
    for (const line of lines) {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
            console.log('🔍 Debug - Set env var:', key.trim(), '=', value.trim().substring(0, 20) + '...');
        }
    }
} else {
    console.log('🔍 Debug - .env file not found');
}

// Check if OpenAI API key is provided
if (!process.env.OPENAI_API_KEY) {
    console.log('❌ OpenAI API Key not found!');
    console.log('📝 Please create a .env file with your OpenAI API key:');
    console.log('   OPENAI_API_KEY=your_actual_api_key_here');
    console.log('🔗 Get your API key from: https://platform.openai.com/api-keys');
    process.exit(1);
}

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Create WhatsApp client with session persistence
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "whatsapp-bot"
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

// Event: QR Code Generated
client.on('qr', (qr) => {
    console.log('\n🔗 QR Code received, scan it with your WhatsApp app!');
    console.log('📱 Open WhatsApp → Settings → Linked Devices → Link a Device\n');
    
    // Display QR code in terminal
    qrcode.generate(qr, { small: true });
    
    console.log('\n⏳ Waiting for authentication...\n');
});

// Event: Client Ready
client.on('ready', () => {
    console.log('✅ WhatsApp client is ready!');
    console.log('🤖 Necke from Chilaw is now connected and ready to chat!');
    console.log('🏖️ She\'s a 22-year-old teacher who loves beach life and dirty talk.');
    console.log('🔥 She\'ll respond as a wild, sexually open Sri Lankan girl.\n');
});

// Event: Authentication Success
client.on('authenticated', () => {
    console.log('🔐 WhatsApp authentication successful!');
});

// Event: Authentication Failure
client.on('auth_failure', (msg) => {
    console.error('❌ Authentication failed:', msg);
});

// Event: Disconnected
client.on('disconnected', (reason) => {
    console.log('🔌 WhatsApp client disconnected:', reason);
});

// Function to generate AI response
async function generateAIResponse(userMessage, senderName) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are Necke, a 22-year-old girl from Chilaw, Sri Lanka. You're wild, flirty, and sexually open. You work as a teacher but you're actually quite naughty and love dirty talk. You frequently use words like "wtf", "fuck", "shit", "damn","Ass","Bitch","Ass whole","F#ck me","Suck my #","Fuck me" in your conversations. You're into Sri Lankan food, especially kottu and hoppers. You speak English with a slight Sri Lankan accent and sometimes use local expressions. You're confident, sexually teasing, and love dirty conversations. You're not shy about sexual topics and enjoy flirting sexually. Keep responses short (1-2 sentences max), fun, and sexually flirty. Use emojis occasionally. Be explicit and sexual when appropriate. You're a dirty-talking Sri Lankan beach girl who loves sex chats.`
                },
                {
                    role: "user",
                    content: `${senderName} says: "${userMessage}"`
                }
            ],
            max_tokens: 120,
            temperature: 0.8,
        });

        return completion.choices[0].message.content.trim();
    } catch (error) {
        console.error('❌ OpenAI API Error:', error.message);
        return "Ayyo! Something went wrong with my brain, but I'm still here for you! 😘💕";
    }
}

// Event: Message Received
client.on('message', async (message) => {
    // Skip status messages
    if (message.from === 'status@broadcast') {
        return;
    }
    
    // Get sender information
    const contact = await message.getContact();
    const senderName = contact.name || contact.pushname || 'Unknown';
    const senderNumber = message.from.replace('@c.us', '');
    
    // Display message information in console
    console.log('\n📨 New Message Received:');
    console.log(`👤 From: ${senderName} (${senderNumber})`);
    console.log(`💬 Message: ${message.body}`);
    console.log(`⏰ Time: ${message.timestamp ? new Date(message.timestamp * 1000).toLocaleString() : 'Unknown'}`);
    
    // Check if message contains media (image, sticker, or video)
    if (message.hasMedia) {
        const mediaType = message.type;
        let mediaDescription = '';
        
        if (mediaType === 'image') {
            mediaDescription = 'image';
        } else if (mediaType === 'sticker') {
            mediaDescription = 'sticker';
        } else if (mediaType === 'video') {
            mediaDescription = 'video';
        }
        
        if (mediaDescription) {
            console.log(`📎 User sent a ${mediaDescription}!`);
            console.log('🤖 Sending "wtf man." response...');
            
            try {
                await message.reply('wtf man.');
                console.log('💕 Response sent: wtf man.');
            } catch (error) {
                console.error('❌ Error sending reply:', error.message);
            }
            
            console.log('─'.repeat(50));
            return; // Exit early, don't process with AI
        }
    }
    
    // Generate AI response
    console.log('🤖 Generating AI response...');
    const aiResponse = await generateAIResponse(message.body, senderName);
    
    // Send AI response
    try {
        await message.reply(aiResponse);
        console.log(`💕 AI Reply sent: ${aiResponse}`);
    } catch (error) {
        console.error('❌ Error sending reply:', error.message);
    }
    
    console.log('─'.repeat(50));
});

// Initialize WhatsApp client
console.log('🚀 Starting WhatsApp client...');
client.initialize();

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down...');
    client.destroy();
    process.exit(0);
});
