const searchBtn = document.getElementById('searchBtn') as HTMLButtonElement;
const lyricsResult = document.getElementById('lyricsResult') as HTMLElement;
const songInfoResult = document.getElementById('songInfoResult') as HTMLElement;  // For Song Info
const toggleBtn = document.getElementById('toggleMode') as HTMLButtonElement;

const youtubeAPIKey = 'AIzaSyAoKrt41ppFxbsuc0ExfCM5q4y32GDrCGw'; // Replace with your YouTube API key

const getYouTubeSongInfo = async (artist: string, title: string) => {
    try {
      const searchQuery = `${artist} - ${title}`; // Combine artist and title for better matching
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&key=${youtubeAPIKey}`);
      const data = await response.json();
  
      if (data.items && data.items.length > 0) {
        const video = data.items[0];  // Get the first video result
  
        // Display song info (YouTube video)
        songInfoResult.innerHTML = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${video.snippet.title}</h5>
              <p class="card-text">${video.snippet.description}</p>
              <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank" class="btn btn-primary">Watch on YouTube</a>
            </div>
          </div>
        `;
      } else {
        songInfoResult.innerHTML = `<div class="alert alert-warning">No YouTube video found for this song. Try searching for a different song or check spelling.</div>`;
      }
    } catch (error) {
      songInfoResult.innerHTML = `<div class="alert alert-danger">Failed to retrieve song info from YouTube. Please try again later.</div>`;
      console.error(error);
    }
  };
  

// Function to get lyrics from Lyrics API
const getLyrics = async (artist: string, title: string) => {
  try {
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    const data = await response.json();

    if (data.lyrics) {
      lyricsResult.innerHTML = `
        <h5 class="mt-4">${title} - ${artist}</h5>
        <pre>${data.lyrics}</pre>
      `;
    } else {
      lyricsResult.innerHTML = `<div class="alert alert-danger">Lyrics not found.</div>`;
    }
  } catch (error) {
    lyricsResult.innerHTML = `<div class="alert alert-danger">Something went wrong. Please try again.</div>`;
    console.error(error);
  }
};

searchBtn.addEventListener('click', async () => {
  const artistInput = (document.getElementById('artist') as HTMLInputElement).value.trim();
  const titleInput = (document.getElementById('title') as HTMLInputElement).value.trim();

  if (!artistInput || !titleInput) {
    lyricsResult.innerHTML = `<div class="alert alert-warning">Please enter both artist and song title.</div>`;
    return;
  }

  lyricsResult.innerHTML = `<div class="text-center"><div class="spinner-border"></div></div>`;
  songInfoResult.innerHTML = ''; // Clear song info before fetching new one

  // Get lyrics
  await getLyrics(artistInput, titleInput);

  // Get song info from YouTube
  await getYouTubeSongInfo(artistInput, titleInput);
});

// Toggle Dark Mode
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});


// const searchBtn = document.getElementById('searchBtn') as HTMLButtonElement;
// const lyricsResult = document.getElementById('lyricsResult') as HTMLElement;
// const songInfoResult = document.getElementById('songInfoResult') as HTMLElement;  // For Song Info
// const toggleBtn = document.getElementById('toggleMode') as HTMLButtonElement;

// const youtubeAPIKey = 'AIzaSyAoKrt41ppFxbsuc0ExfCM5q4y32GDrCGw'; // Replace with your YouTube API key

// const getYouTubeSongInfo = async (artist: string, title: string) => {
//     try {
//       const searchQuery = `${artist} - ${title}`; // Combine artist and title for better matching
//       const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&key=${youtubeAPIKey}`);
//       const data = await response.json();
  
//       if (data.items && data.items.length > 0) {
//         const video = data.items[0];  // Get the first video result
  
//         // Display song info (YouTube video)
//         songInfoResult.innerHTML = `
//           <div class="card">
//             <div class="card-body">
//               <h5 class="card-title">${video.snippet.title}</h5>
//               <p class="card-text">${video.snippet.description}</p>
//               <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank" class="btn btn-primary">Watch on YouTube</a>
//             </div>
//           </div>
//         `;
//       } else {
//         songInfoResult.innerHTML = `<div class="alert alert-warning">No YouTube video found for this song. Try searching for a different song or check spelling.</div>`;
//       }
//     } catch (error) {
//       songInfoResult.innerHTML = `<div class="alert alert-danger">Failed to retrieve song info from YouTube. Please try again later.</div>`;
//       console.error(error);
//     }
//   };
  

// // Function to get lyrics from Lyrics API
// const getLyrics = async (artist: string, title: string) => {
//   try {
//     const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
//     const data = await response.json();

//     if (data.lyrics) {
//       lyricsResult.innerHTML = `
//         <h5 class="mt-4">${title} - ${artist}</h5>
//         <pre>${data.lyrics}</pre>
//       `;
//     } else {
//       lyricsResult.innerHTML = `<div class="alert alert-danger">Lyrics not found.</div>`;
//     }
//   } catch (error) {
//     lyricsResult.innerHTML = `<div class="alert alert-danger">Something went wrong. Please try again.</div>`;
//     console.error(error);
//   }
// };

// searchBtn.addEventListener('click', async () => {
//   const artistInput = (document.getElementById('artist') as HTMLInputElement).value.trim();
//   const titleInput = (document.getElementById('title') as HTMLInputElement).value.trim();

//   if (!artistInput || !titleInput) {
//     lyricsResult.innerHTML = `<div class="alert alert-warning">Please enter both artist and song title.</div>`;
//     return;
//   }

//   lyricsResult.innerHTML = `<div class="text-center"><div class="spinner-border"></div></div>`;
//   songInfoResult.innerHTML = ''; // Clear song info before fetching new one

//   // Get lyrics
//   await getLyrics(artistInput, titleInput);

//   // Get song info from YouTube
//   await getYouTubeSongInfo(artistInput, titleInput);
// });

// // Toggle Dark Mode
// toggleBtn.addEventListener('click', () => {
//   document.body.classList.toggle('dark-mode');
// });
