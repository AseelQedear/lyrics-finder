const searchBtn = document.getElementById('searchBtn') as HTMLButtonElement;
const lyricsResult = document.getElementById('lyricsResult') as HTMLElement;
const songInfoResult = document.getElementById('songInfoResult') as HTMLElement;

const lightModeBtn = document.getElementById('lightModeBtn') as HTMLButtonElement;
const darkModeBtn = document.getElementById('darkModeBtn') as HTMLButtonElement;

const youtubeAPIKey = 'AIzaSyAoKrt41ppFxbsuc0ExfCM5q4y32GDrCGw';

// This clears all child elements inside a given HTML container.
const clearElement = (element: HTMLElement) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

// Creates a Bootstrap-style alert message and returns it.
const createAlert = (message: string, type: 'danger' | 'warning') => {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  return alert;
};

/* This function:
1-Searches YouTube using artist + song title.
2-Fetches results using the YouTube Data API.
Displays the first video result inside a Bootstrap card:
  - Video title
  - Description
  - A button linking to the video on YouTube
If no results found or an error happens, it shows an appropriate alert.
*/
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

/*
This function:
- Fetches lyrics from the lyrics.ovh API.
- If lyrics are found, displays them in a styled <pre> block inside a Bootstrap card.
- If not found or API fails, shows an alert.
*/
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

/*
This Function:
- Triggered when the user clicks Search.
- Gets input values for artist and title.
- Clears any previous results.
- Validates if both fields are filled.
- Shows a loading spinner.
- Calls getLyrics() and getYouTubeSongInfo() with the inputs.
*/
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

/*
This function:
- Adds/removes the dark-mode or light-mode class from the body.
- Switches background image depending on mode.
- Toggles the active button style.
*/
lightModeBtn.addEventListener('click', () => {
  document.body.classList.remove('dark-mode');
  document.body.classList.add('light-mode');
  document.body.style.backgroundImage = "url('media/background2.jpg')"; 
  lightModeBtn.classList.add('active');
  darkModeBtn.classList.remove('active');
});

darkModeBtn.addEventListener('click', () => {
  document.body.classList.add('dark-mode');
  document.body.classList.remove('light-mode');
  document.body.style.backgroundImage = "url('media/background1.jpg')"; 
  darkModeBtn.classList.add('active');
  lightModeBtn.classList.remove('active');
});

// Keyboard Support: Add keyboard event listeners to trigger search on 'Enter'
const handleKeyboardInput = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    console.log('Enter key pressed');
    if (searchBtn) {
      searchBtn.click();  
    }
  }
};

// Ensure artist and title input fields are available
const artistInput = document.getElementById('artist') as HTMLInputElement;
const titleInput = document.getElementById('title') as HTMLInputElement;

// Debug log to confirm that input elements exist
console.log('artistInput:', artistInput, 'titleInput:', titleInput);

// Add event listeners for both inputs
artistInput.addEventListener('keypress', handleKeyboardInput);
titleInput.addEventListener('keypress', handleKeyboardInput);
