window.onload=function(){
    const form = document.querySelector('.searchForm');
    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
    event.preventDefault();
    const input = document.querySelector('.searchForm-input').value;
    const searchQuery = input.trim();
    fetchResults(searchQuery);
    }

    function fetchResults(query) {
    const endpoint = `search/${query}`;
    fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        const results = data.searchResults;
        displayResults(results);
    });
    }

    function displayResults(results) {
    const searchResultsDIV = document.querySelector('.searchResults');
    searchResultsDIV.innerHTML = '';
    console.log(results);
    results.forEach(result => {
        const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);

        searchResultsDIV.insertAdjacentHTML('beforeend',
            `<div class="resultItem">
        <h3 class="resultItem-title">
          <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
        </h3>
        <span class="resultItem-snippet">${result.snippet}</span><br>
        <a href="${url}" class="resultItem-link" target="_blank" rel="noopener">${url}</a>
      </div>`
        );
    });
    }
}