const searchBtn = document.querySelector(".search-btn");
const searchBar = document.querySelector(".search_input");
const searchResult = document.querySelector(".search-result");

//when search bar clicked remove single-result,search_not_find,wrong_search element
searchBar.addEventListener("click", () => {
  let searchResult = document.querySelectorAll(".single-result");
  let searchNotFind = document.querySelectorAll(".search_not_find");
  let wrong_search = document.querySelectorAll(".wrong_search");
  let lyric = document.querySelectorAll(".lyric");
  removeItem(searchResult);
  removeItem(lyric);
  removeItem(wrong_search);
  removeItem(searchNotFind);
});

//function for remove item
function removeItem(selectElement) {
  selectElement.forEach((item) => {
    item.remove();
  });
}

//when searchBtn cicked it will show 10 search result only
searchBtn.addEventListener("click", () => {
  let nameOfArtistOrSong = searchBar.value;

  if (searchBar.value.length < 1) {
    searchResult.innerHTML = `<h1 class= "text-danger text-center search_not_find">Sorry, You haven't type any song name.</h1>`;
  } else {
    const singleResult = document.querySelectorAll(".single-result");
    //when searchBtn clicked only show 10 result that's why this if statment
    if (singleResult.length > 5) {
      for (let i = 10; i < 10; i++) {
        singleResult[i].remove();
      }
    } else {
      callApiForSearch(nameOfArtistOrSong);
    }
  }
});

// calling api for search by song name and artist
function callApiForSearch(nameOfArtistOrSong) {
  apiUrl = `https://api.lyrics.ovh/suggest/${nameOfArtistOrSong}`;
  fetch(apiUrl)
    .then((response) => {
      let nameOfArtistOrSong = response.json();
      return nameOfArtistOrSong;
    })
    .then((nameOfArtistOrSong) => {
      if (nameOfArtistOrSong.data.length === 0) {
        searchResult.innerHTML = `<h1 class="text-danger text-center wrong_search">No search Result. Please type the right song name.</h1>`;
      } else {
        for (let i = 0; i < 10; i++) {
          let albumImg = nameOfArtistOrSong.data[i].album.cover_medium;
          let albumTitle = nameOfArtistOrSong.data[i].title;
          let artistName = nameOfArtistOrSong.data[i].artist.name;
          let songPreview = nameOfArtistOrSong.data[i].preview;

          lyricsApiUrl = `https://api.lyrics.ovh/v1/${artistName}/${albumTitle}`;
          fetch(lyricsApiUrl)
            .then((response) => {
              let data = response.json();
              return data;
            })
            .then((data) => {
              let lyrics = data.lyrics;
              if (lyrics !== undefined) {
                searchResult.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                              <div class="music_img col-md-3 col-sm-12 text-center">
                                                  <img class="img-fluid" src=${albumImg} alt="album img" />
                                              </div>
                                              <div class="col-md-6 col-sm-12 text-center">
                                                  <h3 class="lyrics-name">${albumTitle}</h3>
                                                  <p class="author lead">Album by <span>${artistName}</span></p>
                                                  <audio controls controlsList="nodownload">
                                                      <source src=${songPreview} type="audio/mpeg" />
                                                  </audio>
                                              </div>
                                              <div class="col-md-3 col-sm-12 text-md-right text-sm-center text-center">
                                                  <button class="btn btn-success get_lyrics_btn">Get Lyrics</button>
                                              </div>
                                          </div>
                                          <div class = "lyric lyric_remove">
                                            <h2 class="text-success text-center mb-4">${albumTitle}</h2>
                                            <pre class="text-white text-center">${lyrics}</pre>
                                          </div>`;
              } else if (lyrics === undefined) {
                // let notifyNoLyris = document.querySelector(".single-lyrics div");
                searchResult.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                              <div class="music_img col-md-3 col-sm-12 text-center">
                                                  <img class="img-fluid" src=${albumImg} alt="album img" />
                                              </div>
                                              <div class="col-md-6 col-sm-12 text-center">
                                                  <h3 class="lyrics-name">${albumTitle}</h3>
                                                  <p class="author lead">Album by <span>${artistName}</span></p>
                                                  <audio controls controlsList="nodownload">
                                                      <source src=${songPreview} type="audio/mpeg" />
                                                  </audio>
                                              </div>
                                              <div class="col-md-3 col-sm-12 text-md-right text-sm-center text-center">
                                                  <button class="btn btn-success get_lyrics_btn">Get Lyrics</button>
                                              </div>
                                          </div>
                                          <div class = "lyric lyric_remove">
                                            <h2 class="text-success text-center mb-4">${albumTitle}</h2>
                                            <h4 class="text-danger text-center">No lyric found at this time.</h4>
                                          </div>`;
                showLyricByClick();
              }
            });
        }
      }
    });
}

//function for show lyric by click
function showLyricByClick() {
  const getLyricsBtn = document.querySelectorAll(".get_lyrics_btn");
  for (let i = 0; i < getLyricsBtn.length; i++) {
    getLyricsBtn[i].addEventListener("click", () => {
      let lyric = document.querySelectorAll(".lyric");
      lyric[i].classList.toggle("lyric_remove");
    });
  }
}
