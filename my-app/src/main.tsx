import "/src/style.scss";


const searchBtn = document.getElementById('searchBtn') as HTMLButtonElement;
const lyricsResult = document.getElementById('lyricsResult') as HTMLElement;
const songInfoResult = document.getElementById('songInfoResult') as HTMLElement;

const lightModeBtn = document.getElementById('lightModeBtn') as HTMLButtonElement;
const darkModeBtn = document.getElementById('darkModeBtn') as HTMLButtonElement;

const youtubeAPIKey = 'AIzaSyAoKrt41ppFxbsuc0ExfCM5q4y32GDrCGw';

// Utility to clear HTML content
const clearElement = (element: HTMLElement) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

// Bootstrap alert creator
const createAlert = (message: string, type: 'danger' | 'warning') => {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  return alert;
};

// YouTube song info fetcher
const getYouTubeSongInfo = async (artist: string, title: string) => {
  try {
    const searchQuery = `${artist} - ${title}`;
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&key=${youtubeAPIKey}`);
    const data = await response.json();

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
      link.style.backgroundColor = "#8776a7";
      link.style.borderColor = "#8776a7";

      link.addEventListener('mouseover', () => {
        link.style.backgroundColor = "#6f6292";  
        link.style.borderColor = "#6f6292";
      });

      link.addEventListener('mouseout', () => {
        link.style.backgroundColor = "#8776a7";
        link.style.borderColor = "#8776a7";
      });

      cardBody.appendChild(titleEl);
      cardBody.appendChild(descEl);
      cardBody.appendChild(link);
      card.appendChild(cardBody);
      songInfoResult.appendChild(card);
    } else {
      songInfoResult.appendChild(createAlert('No YouTube video found for this song.', 'warning'));
    }
  } catch (error) {
    clearElement(songInfoResult);
    songInfoResult.appendChild(createAlert('Error getting YouTube video.', 'danger'));
    console.error(error);
  }
};

// Lyrics fetcher
const getLyrics = async (artist: string, title: string) => {
  try {
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    const data = await response.json();

    clearElement(lyricsResult);

    if (data.lyrics) {
      const card = document.createElement('div');
      card.className = 'card';

      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      const header = document.createElement('h5');
      header.className = 'card-title';
      header.textContent = `${title} - ${artist}`;

      const pre = document.createElement('pre');
      pre.className = 'card-text';
      pre.textContent = data.lyrics;

      cardBody.appendChild(header);
      cardBody.appendChild(pre);
      card.appendChild(cardBody);

      lyricsResult.appendChild(card);
    } else {
      lyricsResult.appendChild(createAlert('Lyrics not found.', 'danger'));
    }
  } catch (error) {
    clearElement(lyricsResult);
    lyricsResult.appendChild(createAlert('Something went wrong. Please try again.', 'danger'));
    console.error(error);
  }
};

// Search button handler
searchBtn.addEventListener('click', async () => {
  const artistInput = (document.getElementById('artist') as HTMLInputElement).value.trim();
  const titleInput = (document.getElementById('title') as HTMLInputElement).value.trim();

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

  await getLyrics(artistInput, titleInput);
  await getYouTubeSongInfo(artistInput, titleInput);
});

// Light / Dark mode togglers
lightModeBtn.addEventListener('click', () => {
  document.body.classList.remove('dark-mode');
  document.body.classList.add('light-mode');
  document.body.style.backgroundImage = "url('/media/background2.jpg')";
  lightModeBtn.classList.add('active');
  darkModeBtn.classList.remove('active');
});

darkModeBtn.addEventListener('click', () => {
  document.body.classList.add('dark-mode');
  document.body.classList.remove('light-mode');
  document.body.style.backgroundImage = "url('/media/background1.jpg')";
  darkModeBtn.classList.add('active');
  lightModeBtn.classList.remove('active');
});

// Keyboard support for search
const handleKeyboardInput = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    searchBtn?.click();
  }
};

const artistInput = document.getElementById('artist') as HTMLInputElement;
const titleInput = document.getElementById('title') as HTMLInputElement;

console.log('artistInput:', artistInput, 'titleInput:', titleInput);

artistInput.addEventListener('keypress', handleKeyboardInput);
titleInput.addEventListener('keypress', handleKeyboardInput);

