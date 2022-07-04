window.addEventListener("load",() => {

    const comments = document.querySelectorAll(".subtext > a:not(.hnuser, .clicky)");

    const commentContainer = document.createElement("div");
    const p = document.createElement('p');
    commentContainer.appendChild(p);

    const body = document.body;
    body.appendChild(commentContainer);

    async function firstCommentIdRequester(url) {
        let firstCommentId = '';
        await fetch(url)
            .then(response => {
                return response.json();
            })
            .then(post => {
                firstCommentId = post.kids[0]
            });
        return firstCommentId;
    }

    async function commentRequester(id) {
        const commentUrl = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
        let firstComment = '';
        await fetch(commentUrl)
            .then(response => {
                return response.json();
            })
            .then(comment => {
                firstComment = comment;
            });
        return firstComment;
    }

    comments.forEach((a) => {
        a.addEventListener('mouseover', async () => {
            if (a.textContent === 'discuss') {
                return
            }
            const rawUrl = a.href;
            const commentId = rawUrl.slice(37);
            const commentIdUrl = `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`;

            const firstCommentId = await firstCommentIdRequester(commentIdUrl);
            const firstComment = await commentRequester(firstCommentId);
            const text = firstComment.text;
            // p.insertAdjacentText("beforeend", text);
            p.textContent = text;
            commentContainer.classList.toggle("isDisplayed");
        });
        a.addEventListener('mouseout', () => {
            if (a.textContent === 'discuss') {
                return
            }
            p.textContent = '';
            commentContainer.classList.toggle("isDisplayed");
        })
    });


});