import { graphql } from "https://cdn.skypack.dev/@octokit/graphql";
import sum from "../test.js";

const repoLayout = document.querySelector("#repo-base");
const fullName = document.querySelector("#name");
const userName = document.querySelector("#username");
const bio = document.querySelector("#bio");
const repoCount = document.querySelector("#badge-count");
const personalMail = document.querySelector("#person-mail");
let avatarImage = document.querySelector(".person-image");
let avatarBimage = document.querySelector(".person-b-image");
const starRepo = document.querySelector("#star-repo");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");


const getReposQuery = ` query { user(login: "odomfavour") { name login bio avatarUrl email followers{ totalCount } following { totalCount } starredRepositories{ totalCount } repositories(first:20) { totalCount edges {node { name description updatedAt openGraphImageUrl primaryLanguage{ name} parent { name owner { login }}}  } } } }`;

const auth = {
  headers: {
    authorization: "token " + sum,
  },
};

// async function makeRequest(getReposQuery, auth) {
//     return await graphql(getReposQuery, auth)
// }
// You can use ES6 syntax to make it semantic and in one-line!
const niceRequest = (q, a) => graphql(q, a);

/* STEP 4: USE THE FUNCTION */
// This will resolve the promise and print it to console.
// You can expand the objects and subobjects to see data.
console.log(niceRequest(getReposQuery, auth));
niceRequest(getReposQuery, auth)
  .then((res) => {
    fullName.textContent = res.user.name;
    userName.textContent = res.user.login;
    bio.textContent = res.user.bio;
    repoCount.textContent = res.user.repositories.totalCount;
    avatarImage.src = res.user?.avatarUrl;
    avatarBimage.src = res.user?.avatarUrl;
    personalMail.textContent = res.user.email;
    followers.textContent = res.user.followers.totalCount;
    following.textContent = res.user.following.totalCount;
    starRepo.textContent = res.user.starredRepositories.totalCount;

    let ball = document.querySelectorAll(".ball");

    let html = "";
    res.user.repositories.edges.forEach((e) => {
      let extension_color = {
        JavaScript: '#f1e05a',
        HTML: '#e34c26',
        CSS: '#563d7c',
        Vue: '#2c3e50',
        default: '',
      }
      let extension = e.node?.primaryLanguage?.name ?? '';
      html += `
    <li class="repo-box">
      <div class="d-flex">
          <div class="right-side">
              <h3>
                  <a href="#">
                      ${e.node.name}
                  </a>
               </h3> 
               <div>${
                 e.node.parent !== null
                   ? `<span class="description">Forked from ${e.node.parent.owner.login}/${e.node.parent.name}`
                   : `<div></div>`
               }</div>  
                  <p class="description right-side" >${
                    e.node.description !== null
                      ? e.node.description
                      : `<div></div>`
                  }</p>
                  <div class="repo-lower-info d-flex">
                  ${
                        e.node.primaryLanguage !== null
                          ? Object.keys(extension_color)
                            .includes(extension) ? `<div style="background-color: ${extension_color[extension]}" class="ball mr-8"></div>` :
                            `<div style="background-color: ${extension_color['default']}" class="ball mr-8"></div>`
                          : ""
                      }
        
                      <span class="mr-8">${
                        e.node.primaryLanguage !== null
                          ? e.node.primaryLanguage?.name
                          : ""
                      }</span>
                      <span class="mr-8">Updated</span>
                      <span>${formatDate(e.node.updatedAt)}</span>
                  </div>
            </div>
          <div class="left-side">
              <div class="text-right">
                  <button>
                      <div class="d-flex align-items-center">
                          <svg class="octicon octicon-star mr-3" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
                              <path fill-rule="evenodd"
                                  d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                              </path>
                          </svg>
                          Star
                      </div>
                      
                  </button>
              </div>
              <div class="text-right">
                  <svg width="100" height="30" class="d-none">
                      <defs>
                          <linearGradient id="gradient-368352072" x1="0" x2="0" y1="1" y2="0">
                              <stop offset="10%" stop-color="#9be9a8"></stop>
                              <stop offset="33%" stop-color="#40c463"></stop>
                              <stop offset="66%" stop-color="#30a14e"></stop>
                              <stop offset="90%" stop-color="#216e39"></stop>
                          </linearGradient>
                          <mask id="sparkline-368352072" x="0" y="0" width="155" height="28">
                              <polyline transform="translate(0, 28) scale(1,-1)"
                                  points="0,1 3,1 6,1 9,1 12,1 15,1 18,1 21,1 24,1 27,1 30,1 33,1 36,1 39,1 42,1 45,1 48,1 51,1 54,1 57,1 60,1 63,1 66,1 69,1 72,1 75,1 78,1 81,1 84,1 87,1 90,1 93,1 96,1 99,1 102,1 105,1 108,1 111,1 114,1 117,1 120,1 123,1 126,1 129,1 132,1 135,1 138,1 141,1 144,1 147,1 150,1 153,3 "
                                  fill="transparent" stroke="#8cc665" stroke-width="2">
                              </polyline>
                          </mask>
                      </defs>
                  
                      <g transform="translate(0, -11)">
                          <rect x="0" y="-2" width="155" height="30"
                              style="stroke: none;fill: url(#gradient-368352072);mask: url(#sparkline-368352072);"></rect>
                      </g>
                  </svg>
              </div>
          </div>
      </div>
  </li>

    `;
      // console.log(e);
    });

    repoLayout.innerHTML = html;
    // console.log(res.user.repositories.edges);
  })
  .catch((err) => console.log(err));

/**
 * Gets a datetime, extracts the date section and formats it in a human-readable way
 * @param {string|number} _date The datetime to be formatted
 * @returns {string} The formatted date
 */
const formatDate = (_date) => {
  const d = new Date(_date);

  const day = d.getDate();
  const weekDay = d.getDay();
  const month = d.getMonth();
  const year = d.getFullYear();

  const days = {
    "0": "Sunday",
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday",
  };

  const months = {
    "0": "Jan",
    "1": "Feb",
    "2": "Mar",
    "3": "Apr",
    "4": "May",
    "5": "Jun",
    "6": "Jul",
    "7": "Aug",
    "8": "Sep",
    "9": "Oct",
    "10": "Nov",
    "11": "Dec",
  };


  const dString = `${months[month.toString()]} ${day.toString()}, ${year}`;


  return dString;
};


