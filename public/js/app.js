let form = document.querySelector("form");
form.addEventListener("submit", HandleSubmit);

async function HandleSubmit(e) {
    e.preventDefault()
    // La valeur saisie
    let input = document.querySelector('#input').value;

    //  Enlever les espacement avant et apres le mot
    let QuerySearch = input.trim();
    try {
        await fetchResultat(QuerySearch)
    } catch(error) {
        console.log(error)
    }
}



async function fetchResultat(QuerySearch)  {
    let apiWikipedia = `https://fr.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${QuerySearch}`
    let response = await fetch(apiWikipedia)
    let responseJson = await response.json()
    let resultats = responseJson["query"]["search"];
    displayResultat(resultats)
    console.log(resultats)
}

function displayResultat(resultats) {
    let resultatSection = document.querySelector('#resultatSection');
    resultatSection.innerHTML = '';

    resultats.forEach(result => {
        let endpoint = encodeURI(`https://fr.wikipedia.org/wiki/${result["title"]}`);

        resultatSection.insertAdjacentHTML('beforeend',
          `
          <div class="col-sm-6 col-lg-3 mb-3">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">
                  <a href="${endpoint}" target="_blank" rel="noopener"
                    >${result.title}</a
                  >
                </h4>
                <p class="text-dark">${result.snippet}</p>
                <a href="${endpoint}" class="nav-link" target="_blank">${endpoint}</a>
              </div>
            </div>  
          </div>`
        );
    })
}