const themeSwitcher = document.querySelector('.mode-switch')

themeSwitcher.addEventListener('click', () => {
    const main = document.querySelector('.dm-main');
    if (main.classList.contains("dark")) {
        main.classList.remove("dark");
        main.classList.add("light");
    } else {
        main.classList.remove("light");
        main.classList.add("dark");
    }
})

let dropDown = document.querySelector(".select-region")

let dropButton = document.querySelector(".filter")

// dropButton.addEventListener("click", () => {
//     dropDown.toggleAttribute("hidden")
// })

const prepareURL = (origin, countryName) => {
    const url = new URL("./info.html", origin);
    url.searchParams.set("country", countryName);
    return url.toString();
  };


const countryRequest = async (name) => {
    let response = name ? 
                await fetch(`https://restcountries.com/v3.1/name/${name}`) :
                await fetch("https://restcountries.com/v3.1/all");

    return response.json();
}


  const containerBody = async (name) => {
    const countryMain = document.querySelector('.bottom-main');
    const countries = await countryRequest(name);

    if(countries.length > 1)
        for (const country of countries) {
        const hyperLink = document.createElement('a');
        hyperLink.setAttribute('href', prepareURL(window.location.href, country.name.common))
        const article = document.createElement('article')
        article.setAttribute('class', 'recent-countries')

        const firstDiv = document.createElement('div')
        firstDiv.setAttribute('class', 'flag')
        const img = document.createElement('img')
        img.setAttribute('src', country.flags.png)
        img.setAttribute('alt', country.flags.alt)
        firstDiv.appendChild(img);

        article.appendChild(firstDiv);

        const secondDiv = document.createElement('div')
        secondDiv.setAttribute('class', 'info')

        secondDiv.innerHTML = `
        <h4>${country.name.common}</h4>
        <p>Population: <span>${country.population}</span></p>
        <p>Region: <span>${country.region}</span></p>
        <p>Capital: <span>${country.capital}</span></p>
        `;
        article.appendChild(secondDiv)
        hyperLink.appendChild(article)
        countryMain.appendChild(hyperLink)
    }else{
        const country = countries[0];

        console.log(country);

        const image = document.createElement('img')
        image.setAttribute('src', country.flags.png)
        image.setAttribute('alt', country.flags.alt)
        document.querySelector('.big-flag').appendChild(image);

        const topDiv = document.querySelector('.mcd-heading')
        const name = document.createElement('h2')
        name.innerHTML = country.name.common;
        topDiv.appendChild(name);        

        const leftDiv = document.querySelector('.left-mcd-texts')
        leftDiv.innerHTML = `
                                <p>native name: <span>${country.name.nativeName.eng.official}</span></p>
                                <p>population: <span>${country.name.common}</span></p>
                                <p>region: <span>${country.name.common}</span></p>
                                <p>sub region: <span>${country.name.common}</span></p>
                                <p>capital: <span>${country.name.common}</span></p>`

        const rightDiv = document.querySelector('.right-mcd-texts')
        rightDiv.innerHTML = `
                                <p>top level domain: <span>${country.name.common}</span></p>
                                <p>currencies: <span>${country.currencies.USD.name}</span></p>
                                <p>languages: <span>${country.languages}</span></p>
                            `
    }

}

const searchParams = new URLSearchParams(window.location.search);

window.onload = containerBody(searchParams.get('country'));
