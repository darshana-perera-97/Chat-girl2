const fs = require('fs');
const path = require('path');

console.log('🚀 WhatsApp AI Bot Setup');
console.log('========================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    console.log('✅ .env file already exists');
    const envContent = fs.readFileSync(envPath, 'utf8');
    if (envContent.includes('your_openai_api_key_here')) {
        console.log('⚠️  Please update your OpenAI API key in the .env file');
    } else {
        console.log('✅ OpenAI API key appears to be set');
    }
} else {
    console.log('📝 Creating .env file...');
    const envContent = `# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Instructions:
# 1. Replace 'your_openai_api_key_here' with your actual OpenAI API key
# 2. Get your API key from: https://platform.openai.com/api-keys
# 3. Make sure you have credits in your OpenAI account
`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
}

console.log('\n📋 Next Steps:');
console.log('1. Get your OpenAI API key from: https://platform.openai.com/api-keys');
console.log('2. Edit the .env file and replace "your_openai_api_key_here" with your actual key');
console.log('3. Run: npm start');
console.log('\n💡 Example .env content:');
console.log('   OPENAI_API_KEY=sk-1234567890abcdef...');
