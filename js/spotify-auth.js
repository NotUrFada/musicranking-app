// Spotify Authentication Handler
class SpotifyAuth {
    constructor() {
        this.clientId = 'c59488b72649421aa125bed35f8fed60'; // Replace with your Spotify Client ID
        this.redirectUri = window.location.origin;
        this.scope = 'user-read-private user-read-email';
    }

    async init() {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
            await this.getAccessToken(code);
        } else if (!localStorage.getItem('spotify_access_token')) {
            this.redirectToSpotifyAuth();
        }
    }

    redirectToSpotifyAuth() {
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${encodeURIComponent(this.scope)}`;
        window.location.href = authUrl;
    }

    async getAccessToken(code) {
        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: this.redirectUri,
                    client_id: this.clientId,
                    client_secret: '458350db97d74b51bb52d92b4243f651', // Replace with your Spotify Client Secret
                }),
            });

            const data = await response.json();
            localStorage.setItem('spotify_access_token', data.access_token);
            localStorage.setItem('spotify_refresh_token', data.refresh_token);
            window.history.replaceState({}, document.title, '/');
        } catch (error) {
            console.error('Error getting access token:', error);
            this.showError('Authentication failed. Please try again.');
        }
    }

    showError(message) {
        const errorElement = document.getElementById('error-message');
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
}

const spotifyAuth = new SpotifyAuth();
spotifyAuth.init();
