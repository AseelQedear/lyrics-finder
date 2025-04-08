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
const lightModeBtn = document.getElementById('lightModeBtn');
const darkModeBtn = document.getElementById('darkModeBtn');
const youtubeAPIKey = 'AIzaSyAoKrt41ppFxbsuc0ExfCM5q4y32GDrCGw';
const clearElement = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
};
const createAlert = (message, type) => {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    return alert;
};
const getYouTubeSongInfo = (artist, title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = `${artist} - ${title}`;
        const response = yield fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&key=${youtubeAPIKey}`);
        const data = yield response.json();
        clearElement(songInfoResult);
        if (data.items && data.items.length > 0) {
            const video = data.items[0];
            const card = document.createElement('div');
            card.className = 'card';
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            const titleEl = document.createElement('h5');
            titleEl.className = 'card-title';
            titleEl.textContent = video.snippet.title;
            const descEl = document.createElement('p');
            descEl.className = 'card-text';
            descEl.textContent = video.snippet.description;
            const link = document.createElement('a');
            link.className = 'btn btn-primary';
            link.href = `https://www.youtube.com/watch?v=${video.id.videoId}`;
            link.target = '_blank';
            link.textContent = 'Watch on YouTube';
            cardBody.appendChild(titleEl);
            cardBody.appendChild(descEl);
            cardBody.appendChild(link);
            card.appendChild(cardBody);
            songInfoResult.appendChild(card);
        }
        else {
            songInfoResult.appendChild(createAlert('No YouTube video found for this song.', 'warning'));
        }
    }
    catch (error) {
        clearElement(songInfoResult);
        songInfoResult.appendChild(createAlert('Error getting YouTube video.', 'danger'));
        console.error(error);
    }
});
const getLyrics = (artist, title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
        const data = yield response.json();
        clearElement(lyricsResult);
        if (data.lyrics) {
            const header = document.createElement('h5');
            header.className = 'mt-4';
            header.textContent = `${title} - ${artist}`;
            const pre = document.createElement('pre');
            pre.textContent = data.lyrics;
            lyricsResult.appendChild(header);
            lyricsResult.appendChild(pre);
        }
        else {
            lyricsResult.appendChild(createAlert('Lyrics not found.', 'danger'));
        }
    }
    catch (error) {
        clearElement(lyricsResult);
        lyricsResult.appendChild(createAlert('Something went wrong. Please try again.', 'danger'));
        console.error(error);
    }
});
searchBtn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const artistInput = document.getElementById('artist').value.trim();
    const titleInput = document.getElementById('title').value.trim();
    clearElement(lyricsResult);
    clearElement(songInfoResult);
    if (!artistInput || !titleInput) {
        lyricsResult.appendChild(createAlert('Please enter both artist and song title.', 'warning'));
        return;
    }
    const spinner = document.createElement('div');
    spinner.className = 'text-center';
    spinner.innerHTML = `<div class="spinner-border"></div>`;
    lyricsResult.appendChild(spinner);
    yield getLyrics(artistInput, titleInput);
    yield getYouTubeSongInfo(artistInput, titleInput);
}));
lightModeBtn.addEventListener('click', () => {
    document.body.classList.remove('dark-mode');
    document.body.style.backgroundImage = "url('media/background2.jpg')";
    lightModeBtn.classList.add('active');
    darkModeBtn.classList.remove('active');
});
darkModeBtn.addEventListener('click', () => {
    document.body.classList.add('dark-mode');
    document.body.style.backgroundImage = "url('media/background1.jpg')";
    darkModeBtn.classList.add('active');
    lightModeBtn.classList.remove('active');
});
//# sourceMappingURL=main.js.map