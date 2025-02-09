class MusicRankingApp {
    constructor() {
        this.genres = ['Pop', 'Hip-Hop', 'Rock', 'Electronic', 'R&B'];
        this.currentGenreIndex = 0;
        this.songs = [];
        this.comparingPair = [];
        this.rankings = {};
        this.monthlyWinners = {};
        
        this.spotifyApi = new SpotifyWebApi();
        this.spotifyApi.setAccessToken(localStorage.getItem('spotify_access_token'));
        
        this.initializeElements();
        this.addEventListeners();
        this.loadGenre();
    }

    initializeElements() {
        this.elements = {
            prevGenre: document.getElementById('prevGenre'),
            nextGenre: document.getElementById('nextGenre'),
            currentGenre: document.getElementById('currentGenre'),
            comparisonContainer: document.getElementById('comparison-container'),
            winnerSection: document.getElementById('winner-section'),
            startComparisonBtn: document.getElementById('start-comparison'),
            loading: document.getElementById('loading'),
            errorMessage: document.getElementById('error-message')
        };
    }

    addEventListeners() {
        this.elements.prevGenre.addEventListener('click', () => this.changeGenre(-1));
        this.elements.nextGenre.addEventListener('click', () => this.changeGenre(1));
        this.elements.startComparisonBtn.addEventListener('click', () => this.startNewComparison());
    }

    async loadGenre() {
        try {
            this.showLoading();
            this.elements.currentGenre.textContent = this.genres[this.currentGenreIndex];
            
            // Get new releases for the current genre
            const response = await this.spotifyApi.getNewReleases({
                limit: 10,
                offset: 0,
                country: 'US'
            });

            // Filter by genre (note: you might need to implement more sophisticated genre filtering)
            this.songs = response.albums.items.map(album => ({
                id: album.id,
                title: album.name,
                artist: album.artists[0].name,
                plays: Math.floor(Math.random() * 1000000) // Mock data since Spotify doesn't provide play counts
            }));

            this.hideLoading();
            this.startNewComparison();
        } catch (error) {
            console.error('Error loading genre:', error);
            this.showError('Failed to load songs. Please try again.');
            this.hideLoading();
        }
    }

    changeGenre(direction) {
        this.currentGenreIndex = (this.currentGenreIndex + direction + this.genres.length) % this.genres.length;
        this.loadGenre();
    }

    startNewComparison() {
        if (this.songs.length < 2) {
            this.showError('Not enough songs available for comparison');
            return;
        }

        this.comparingPair = [this.songs[0], this.songs[1]];
        this.renderComparison();
    }

    renderComparison() {
        const songCardsContainer = document.querySelector('.song-cards');
        songCardsContainer.innerHTML = this.comparingPair.map(song => `
            <div class="song-card" onclick="app.handleVote('${song.id}')">
                <h3 class="song-title">${song.title}</h3>
                <p class="song-artist">${song.artist}</p>
                <div class="song-stats">
                    <span>👥 ${this.formatNumber(song.plays)} plays</span>
                </div>
            </div>
        `).join('');
    }

    handleVote(winnerId) {
        const currentGenre = this.genres[this.currentGenreIndex];
        
        if (!this.rankings[currentGenre]) {
            this.rankings[currentGenre] = {};
        }
        
        this.rankings[currentGenre][winnerId] = (this.rankings[currentGenre][winnerId] || 0) + 1;

        // Get next pair or end comparison
        const remainingSongs = this.songs.filter(song => 
            !this.comparingPair.map(s => s.id).includes(song.id) || song.id === winnerId
        );

        if (remainingSongs.length >= 2) {
            this.comparingPair = [remainingSongs[0], remainingSongs[1]];
            this.renderComparison();
        } else {
            this.determineWinner(currentGenre);
        }
    }

    determineWinner(genre) {
        const genreRankings = this.rankings[genre];
        const winnerId = Object.entries(genreRankings).reduce((a, b) => 
            genreRankings[a[0]] > genreRankings[b[0]] ? a : b
        )[0];

        this.monthlyWinners[genre] = winnerId;
        this.renderWinner(winnerId);
    }

    renderWinner(winnerId) {
        const winner = this.songs.find(song => song.id === winnerId);
        this.elements.winnerSection.classList.remove('hidden');
        
        document.getElementById('winner-card').innerHTML = `
            <h3 class="song-title">${winner.title}</h3>
            <p class="song-artist">${winner.artist}</p>
            <div class="song-stats">
                <span>👑 Monthly Winner</span>