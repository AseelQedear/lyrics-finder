"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const searchBtn = document.getElementById('searchBtn');
const lyricsResult = document.getElementById('lyricsResult');
const songInfoResult = document.getElementById('songInfoResult');
const toggleBtn = document.getElementById('toggleMode');
const youtubeAPIKey = 'AIzaSyAoKrt41ppFxbsuc0ExfCM5q4y32GDrCGw';
const getYouTubeSongInfo = (artist, title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = `${artist} - ${title}`;
        const response = yield fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&key=${youtubeAPIKey}`);
        const data = yield response.json();
        if (data.items && data.items.length > 0) {
            const video = data.items[0];
            songInfoResult.innerHTML = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${video.snippet.title}</h5>
              <p class="card-text">${video.snippet.description}</p>
              <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank" class="btn btn-primary">Watch on YouTube</a>
            </div>
          </div>
        `;
        }
        else {
            songInfoResult.innerHTML = `<div class="alert alert-warning">No YouTube video found for this song. Try searching for a different song or check spelling.</div>`;
        }
    }
    catch (error) {
        songInfoResult.innerHTML = `<div class="alert alert-danger">Failed to retrieve song info from YouTube. Please try again later.</div>`;
        console.error(error);
    }
});
const getLyrics = (artist, title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
        const data = yield response.json();
        if (data.lyrics) {
            lyricsResult.innerHTML = `
        <h5 class="mt-4">${title} - ${artist}</h5>
        <pre>${data.lyrics}</pre>
      `;
        }
        else {
            lyricsResult.innerHTML = `<div class="alert alert-danger">Lyrics not found.</div>`;
        }
    }
    catch (error) {
        lyricsResult.innerHTML = `<div class="alert alert-danger">Something went wrong. Please try again.</div>`;
        console.error(error);
    }
});
searchBtn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const artistInput = document.getElementById('artist').value.trim();
    const titleInput = document.getElementById('title').value.trim();
    if (!artistInput || !titleInput) {
        lyricsResult.innerHTML = `<div class="alert alert-warning">Please enter both artist and song title.</div>`;
        return;
    }
    lyricsResult.innerHTML = `<div class="text-center"><div class="spinner-border"></div></div>`;
    songInfoResult.innerHTML = '';
    yield getLyrics(artistInput, titleInput);
    yield getYouTubeSongInfo(artistInput, titleInput);
}));
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
//# sourceMappingURL=main.js.map