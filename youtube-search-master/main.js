window.onload = () => {
  const resultList = document.querySelector("#result-list");
  const btnSearch = document.querySelector(".btn.btn-primary");
  const input = document.querySelector("#keyword");
  btnSearch.addEventListener("click", () => {
    event.preventDefault();
    const keyword = input.value;
    if (!keyword) {
      document.querySelector("#keyword").style.borderColor = "red";
    } else {
      resultList.innerHTML = "";
      document.querySelector("#keyword").style.borderColor = "initial";
      fetchData(keyword, resultList)
    }
  });
  input.addEventListener("keyup", debounce(() => {
    const keyword = input.value;
    fetchData(keyword, resultList);
  }, 1000))
};

function addResultIntoList(dataItem, resultList) {
  const videoId = dataItem.id.videoId;
  const imgId = dataItem.snippet.thumbnails.medium.url;
  const videoTitle = dataItem.snippet.title;
  const videoDescription = dataItem.snippet.description;
  const resultLink = `
    <a class='result col-md-12' href="https://www.youtube.com/watch?v=${videoId}" target='_blank'>
      <div class='row'>
        <div class='col-4'>
          <img src='${imgId}' />
        </div>
        <div class='col-8'>
          <div class='video-info'>
            <h2 class='title'>${videoTitle}</h2>
            <p class='description'>${videoDescription}</p>
            <span>View >></span>
          </div>
        </div>
      </div>
    </a>
  `;
  const resultLinkDiv = document.createElement("div");
  resultLinkDiv.classList.add("result-link");
  resultLinkDiv.innerHTML = resultLink;
  resultList.appendChild(resultLinkDiv);
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

function fetchData(keyword, resultList) {
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      for (let i = 0; i < data.items.length; i++) {
        addResultIntoList(data.items[i], resultList);
      }
      let isScrolled = false;
      window.addEventListener("scroll", function () {
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight &&
          !isScrolled
        ) {
          isScrolled = true;
          fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${data.nextPageToken}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
            .then(res => {
              return res.json();
            })
            .then(data => {
              for (let i = 0; i < data.items.length; i++) {
                addResultIntoList(data.items[i], resultList);
              }
            })
            .then(() => {
              isScrolled = false;
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    });
}