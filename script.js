const userData = document.getElementById("userdata");

const fetchDemoProfile = async () => {
  const url = "https://ybiapi.fresh-app.com/api/demo_profile";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    domData(data);
    // const { name, age, email } = data;
  } catch (error) {
    console.error(`Error occurred: ${error}`);
    return null;
  }
};
fetchDemoProfile();

const domData = (data) => {
  const devContaner = document.createElement("div");
  devContaner.className = "devContaner";
  const userNameH2 = document.createElement("h2");
  userNameH2.textContent = data.name;
  userNameH2.className = "userName";
  const jobTitle = document.createElement("p");
  jobTitle.textContent = "web developer";

  const location = document.createElement("div");
  const locationPara = document.createElement("p");
  locationPara.textContent = "Gaza ,Palestine";
  locationPara.className = "locationPara";
  location.className = "location";
  // Create SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList = "svg";
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("id", "Filled");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "20");
  svg.setAttribute("height", "20");

  // Create path element
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M12,.042a9.992,9.992,0,0,0-9.981,9.98c0,2.57,1.99,6.592,5.915,11.954a5.034,5.034,0,0,0,8.132,0c3.925-5.362,5.915-9.384,5.915-11.954A9.992,9.992,0,0,0,12,.042ZM12,14a4,4,0,1,1,4-4A4,4,0,0,1,12,14Z"
  );

  // Append path to SVG
  svg.appendChild(path);
  location.appendChild(svg);
  location.appendChild(locationPara);

const follow =document.createElement("div");
follow.className="follow";

const followersDiv = document.createElement("div");
const followersNum = document.createElement("p");
const followers = document.createElement("p");
followersDiv.className="status";
followersNum.textContent=data.followers;
followers.textContent="Followers";
followersNum.className="statusNum";
followersDiv.appendChild(followersNum);
followersDiv.appendChild(followers);


const followingDiv = document.createElement("div");
const followingNum = document.createElement("p");
const following = document.createElement("p");
followingDiv.className="status";
followingNum.textContent=data.follow;
following.textContent="Following";
followingNum.className="statusNum";
followingDiv.appendChild(followingNum);
followingDiv.appendChild(following);


const likesDiv = document.createElement("div");
const likesNum = document.createElement("p");
const likes = document.createElement("p");
likesDiv.className="status";
likesNum.textContent=`${data.likes}K`;
likesNum.className="statusNum";
likes.textContent="likes";
likesDiv.appendChild(likesNum);
likesDiv.appendChild(likes);


follow.appendChild(followersDiv);
follow.appendChild(followingDiv);
follow.appendChild(likesDiv);

  devContaner.appendChild(userNameH2);
  devContaner.appendChild(jobTitle);
  devContaner.appendChild(location);
  devContaner.appendChild(follow);

  userData.appendChild(devContaner);
  renderPhotos(data.images_list);
};




// Function to create photo elements
function createPhotoElement(photo) {
  const photoElement = document.createElement("div");
  photoElement.innerHTML = `
    <img src="${photo}" alt="photo" class="arrayImage">
  `;
  return photoElement;
}

// Function to render photos
function renderPhotos(data) {
  const photosTab = document.getElementById("photosTab");
  photosTab.innerHTML = ""; // Clear previous content

  data.forEach((photo) => {
    const photoElement = createPhotoElement(photo);
    photosTab.appendChild(photoElement);
  });
}

// Function to render likes
function renderLikes(data) {
  const likesTab = document.getElementById("likesTab");
  likesTab.innerHTML = ""; // Clear previous content

  data.forEach((photo) => {
    const likesElement = document.createElement("p");
    likesElement.textContent = `${photo} - Likes: ${photo}`;
    likesTab.appendChild(likesElement);
  });
}

// Tab buttons click event handling
const tabButtons = document.querySelectorAll(".tab-btn");
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all tabs and buttons
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((tab) => {
      tab.classList.remove("active");
    });

    // Add active class to the clicked tab and button
    const tabId = button.getAttribute("data-tab");
    const tabContent = document.getElementById(tabId);
    button.classList.add("active");
    tabContent.classList.add("active");

    // Render content based on the active tab
    if (tabId === "photosTab") {
      renderPhotos();
    } else if (tabId === "likesTab") {
      renderLikes();
    }
  });
});

