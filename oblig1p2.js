const url = 'https://jsonplaceholder.typicode.com/posts';
const postContainer = document.getElementById('posts');
let sCounter = 1;
let eCounter = sCounter + 3 * 4 - 1;
let die = false;

function getPosts() {
    while (sCounter <= eCounter) {
        if (die) {
            return;
        }
        fetch(`${url}/${sCounter}`)
            .then(response => response.json())
            .then(post => {
                if (Object.keys(post).length === 0) {
                    die = true;
                    return;
                }
                postContainer.innerHTML += `
                <div>
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                </div>
                `;
            })
            .catch(error => {
                postContainer.innerHTML = '<p>Faild to fetch the post</p>';
                console.error(error);
            });
        sCounter++;
    }
    eCounter = sCounter + (3 * 4 - 1) / 2;
}

getPosts();

const footer = document.getElementById('footer');
window.onscroll = function () {
    if (checkVisible(footer)) {
        getPosts();
    }
};

// https://stackoverflow.com/questions/5353934/check-if-element-is-visible-on-screen/5354536#5354536
function checkVisible(elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}
