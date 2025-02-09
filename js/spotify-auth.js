class SpotifyAuth {
    constructor() {
        this.clientId = 'c59488b72649421aa125bed35f8fed60'; // Replace with your Spotify Client ID
        
        // Determine the environment and set the redirect URI accordingly
        this.redirectUri = musicranking-app-nkhx.vercel.app
        
        // Remove any trailing slashes
        this.redirectUri = this.redirectUri.replace(/\/$/, '');
        
        console.log('Redirect URI:', this.redirectUri); // For debugging
        
        this.scope = 'user-read-private user-read-email';
    }

    async init() {
        try {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');
            const error = params.get('error');

            if (error) {
                console.error('Auth error:', error);
                this.showError('Authentication failed: ' + error);
                return;
            }

            if (code) {
                await this.getAccessToken(code);
            } else if (!localStorage.getItem('spotify_access_token')) {
                this.redirectToSpotifyAuth();
            }
        } catch (error) {
            console.error('Init error:', error);
            this.showError('Initialization failed');
        }
    }

    redirectToSpotifyAuth() {
        const authUrl = new URL('https://accounts.spotify.com/authorize');
        authUrl.searchParams.append('client_id', this.clientId);
        authUrl.searchParams.append('response_type', 'code');
        authUrl.searchParams.append('redirect_uri', this.redirectUri);
        authUrl.searchParams.append('scope', this.scope);
        authUrl.searchParams.append('show_dialog', 'true');

        console.log('Auth URL:', authUrl.toString()); // For debugging
        window.location.href = authUrl.toString();
    }

    async getAccessToken(code) {
        try {
            const tokenUrl = 'https://accounts.spotify.com/api/token';
            const body = new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: this.redirectUri,
                client_id: this.clientId,
                client_secret: '458350db97d74b51bb52d92b4243f651' // Replace with your Client Secret
            });

            const response = await fetch(tokenUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: body
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error_description || 'Token request failed');
            }

            const data = await response.json();
            localStorage.setItem('spotify_access_token', data.access_token);
            localStorage.setItem('spotify_refresh_token', data.refresh_token);
            
            // Clean up the URL
            window.history.replaceState({}, document.title, this.redirectUri);
        } catch (error) {
            console.error('Token error:', error);
            this.showError('Failed to get access token: ' + error.message);
        }
    }

    showError(message) {
        const errorElement = document.getElementById('error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        }
        console.error(message);
    }
}

// Initialize auth
const spotifyAuth = new SpotifyAuth();
spotifyAuth.init().catch(console.error);
