function showLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function displayLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Make a request to a reverse geocoding API
    // to get the city and country information
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const city = data.city;
            const countryCode = data.countryCode;
            // const flag = countryCode ? String.fromCodePoint(parseInt(countryCode, 16) + 127397) : '';
            // let flag = '';

            // if (countryCode) {
            //     for (const char of countryCode) {
            //         flag += String.fromCodePoint(char.charCodeAt(0) + 127397);
            //     }
            // }
            let flagClass = '';

            if (countryCode) {
                flagClass = `flag-icon flag-icon-${countryCode.toLowerCase()}`;
            }
            const locationElement = document.getElementById('location');
            // locationElement.textContent = `I am living in ${city} ${flag}`;
            locationElement.innerHTML = `I am living in ${city}, <span class="${flagClass}"></span>`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}