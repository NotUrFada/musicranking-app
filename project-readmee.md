# Music Genre Ranking App 🎵

A dynamic web application that lets users compare and rank new music releases across different genres. Features a tournament-style voting system and integrates with the Spotify API for real-time music data.

## 🌟 Features

- Browse music by genre
- Head-to-head song comparisons
- Monthly winners tracking
- Dark mode interface
- Spotify API integration
- Responsive design

## 🚀 Live Demo

[View Live Demo](https://your-vercel-url-here.vercel.app)

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Spotify Web API
- Vercel (Deployment)

## ⚙️ Prerequisites

- Node.js (v14 or higher)
- Spotify Developer Account
- Vercel Account (for deployment)

## 📥 Installation

1. Clone the repository:
```bash
git clone git@github.com:your-username/music-ranking-app.git
cd music-ranking-app
```

2. Create a Spotify Developer Application:
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new application
   - Note down your Client ID and Client Secret
   - Add `http://localhost:3000` to your Redirect URIs for local development

3. Update Spotify credentials:
   - Open `js/spotify-auth.js`
   - Replace `YOUR_CLIENT_ID` and `YOUR_CLIENT_SECRET` with your actual credentials

4. For local development:
   - Install a local server (e.g., using npm):
     ```bash
     npm install -g http-server
     http-server
     ```
   - Visit `http://localhost:8080` in your browser

## 🚀 Deploying to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy the project:
```bash
vercel
```

4. Configure environment variables in Vercel:
   - Go to your project settings in Vercel dashboard
   - Add the following environment variables:
     - `SPOTIFY_CLIENT_ID`
     - `SPOTIFY_CLIENT_SECRET`
   - Redeploy if necessary

5. Update Spotify Redirect URIs:
   - Add your Vercel deployment URL to the Redirect URIs in your Spotify Developer Dashboard
   - Format: `https://your-project.vercel.app`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:
```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

### Spotify API Configuration

Update the redirect URI in `spotify-auth.js`:
```javascript
this.redirectUri = 'https://your-project.vercel.app'; // Replace with your Vercel URL
```

## 📁 Project Structure

```
music-ranking-app/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Styles and dark mode theme
├── js/
│   ├── app.js          # Main application logic
│   └── spotify-auth.js # Spotify authentication handling
└── README.md          # Documentation
```

## 🎮 Usage

1. Visit the deployed application
2. Log in with your Spotify account
3. Browse different genres using the navigation arrows
4. Vote for your preferred songs in head-to-head comparisons
5. View monthly winners for each genre

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch:
```bash
git checkout -b feature/YourFeature
```
3. Commit your changes:
```bash
git commit -m 'Add some feature'
```
4. Push to the branch:
```bash
git push origin feature/YourFeature
```
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Spotify Web API
- Vercel for hosting
- [Font Awesome](https://fontawesome.com) for icons

## 📧 Contact

Your Name - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/your-username/music-ranking-app](https://github.com/your-username/music-ranking-app)
