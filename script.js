
const searchBox = document.querySelector("#search-box");
const searchBtn = document.querySelector("#search-btn");
const showMore = document.querySelector("#show-more");
const output = document.querySelector("#output");

let keyword = '';
let page = 1;

async function Search() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=DWqFlKPKx2uFIKmSSfmM4XMILA-9Gf8jfNC_gkEV_Qo&per_page=${Math.random()*100}`;
    const response = await fetch(url);
    const data = await response.json();
    if(page===1){
        output.innerHTML = "";
    }
    const results = data.results;
    if (results.length === 0) {
        output.innerHTML = "<p>No images found.</p>";
        showMore.style.display = "None"
        return;
    }
    // Clear previous results
    showMore.style.display = "block"

    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.style.objectFit = "cover";

        // Create link
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        output.appendChild(imageLink);
    });
}

// Listen to button click instead of submit
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    page = 1;
    Search();
});
showMore.addEventListener("click" , ()=>{
    page++;
    Search();
})
// let menuIcon = document.querySelector(".menu-icon");
// let menu = document.querySelector(".menu");
// menuIcon.addEventListener("click",()=>{
//     console.log("clhewguih")
//     menu.classList.toggle("open");
//     console.log(menu.classList)
// })

let line1 = document.getElementsByClassName("line")[0];
let line2 = document.getElementsByClassName("line")[1];
let line3 = document.getElementsByClassName("line")[2];

document.addEventListener("DOMContentLoaded", () => {
    let menuIcon = document.querySelector(".menu-icon");
    let menu = document.querySelector(".menu");

   
    menuIcon.addEventListener("click", (event) => {
        menu.classList.toggle("open");
        line1.classList.toggle("black-bg")
        line2.classList.toggle("black-bg")
        line3.classList.toggle("black-bg")
        event.stopPropagation(); 
    });

    // Close the menu when clicking anywhere outside the menu
    document.addEventListener("dblclick", (event) => {
        if (menu.classList.contains("open") && !menu.contains(event.target) && !menuIcon.contains(event.target)) {
            menu.classList.remove("open"); // Close the menu if it's open and the click is outside
            line1.classList.toggle("white-bg")
            line2.classList.toggle("white-bg")
            line3.classList.toggle("white-bg")
        }
    });
});
