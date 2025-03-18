# 🌱 AI-Grow

> **Cultivating Intelligence, Growing Sustainability**

AI-Grow transforms your gardening experience by harnessing the power of artificial intelligence to provide personalized plant recommendations perfectly suited to your unique environmental conditions and diagnose plant diseases with precision.

## ✨ What Makes AI-Grow Special

AI-Grow bridges the gap between technology and agriculture, making expert-level gardening knowledge accessible to everyone. Whether you're a novice home gardener or an experienced farmer, our application delivers precise recommendations tailored to your specific needs and local environment.

## 🚀 Key Features

- **🤖 Intelligent Plant Matching** - Our AI analyzes soil type, sunlight exposure, and watering capabilities to suggest plants that will thrive in your specific conditions  
- **🔍 Plant Disease Detection** - Identify plant diseases using our advanced machine learning model that analyzes plant images  
- **🌍 Climate-Aware Recommendations** - Location-based analysis considers local weather patterns and seasonal changes  
- **📏 Space Optimization** - Customized suggestions based on your garden size and layout  
- **💧 Water Conservation Guidance** - Smart recommendations that help conserve water while maintaining healthy plants  
- **💊 Treatment Recommendations** - Get specific supplement and treatment advice for identified plant diseases  
- **🔒 Secure Profile Management** - Firebase-powered authentication keeps your garden data safe and accessible across devices  

## 🛠️ Technology Stack

- **Frontend**: React Native with Expo for a seamless cross-platform experience  
- **AI Engine**: Google Generative AI (Gemini 1.5 Flash) for intelligent plant analysis  
- **Disease Detection**: Custom PyTorch model for accurate plant disease identification  
- **Data Storage**: Firebase Firestore for real-time data synchronization  
- **Geolocation**: LocationIQ API for precise location-based climate data  

## 🏁 Getting Started

### Client Installation

1. Clone your green companion  
   ```bash
   git clone https://github.com/gshreyasshetty/AI-Grow.git
   cd AI-Grow/Client
   ```

2. Plant the dependencies  
   ```bash
   npm install
   ```

3. Add your API seeds (`.env` file)  
   ```
   GOOGLE_API_KEY=your_google_api_key
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   FIREBASE_APP_ID=your_firebase_app_id
   FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   LOCATION_IQ_ACCESS_TOKEN=your_location_iq_access_token
   ```

### Server Setup (Disease Detection)

1. Navigate to the server directory  
   ```bash
   cd ../Server
   ```

2. Create and activate a Python virtual environment  
   ```bash
   python -m venv myenv
   myenv\Scripts\activate  # Windows  
   source myenv/bin/activate  # Linux/Mac  
   ```

3. Start the server  
   ```bash
   python app.py
   ```

### Running the Application

1. Start the frontend  
   ```bash
   cd ../Client
   npm expo start
   ```

2. Ensure the Python server is running for plant disease detection functionality  

## 🌟 How It Works

1. **Tell Us About Your Space** - Input details about your garden's size, soil type, and sunlight exposure  
2. **Share Your Location** - Allow AI-Grow to analyze your local climate conditions  
3. **Receive Smart Recommendations** - Get a personalized list of plants perfect for your unique environment  
4. **Monitor Plant Health** - Upload images of your plants to detect diseases and receive treatment advice  
5. **Track and Improve** - Monitor your garden's progress and receive ongoing care tips  

## 🔮 Coming Soon

- Community garden sharing and social features  
- Seasonal planting reminders and harvest tracking  
- Integration with smart garden sensors for automated data collection  
- Expanded disease detection database with more plant varieties  

## Contributing 🤝

Contributions are welcome! Feel free to open an issue or submit a pull request.  

## Contact 📩

For any queries or collaborations, reach out at: gshreyasshetty@gmail.com  

---

_"If agriculture goes wrong, nothing else will have a chance to go right."_ 🌿
