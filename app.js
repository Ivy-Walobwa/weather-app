window.addEventListener('load', () => {
    let long;
    let lat;
    let tempDescription = document.querySelector('.temperature-description');
    let tempDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/f709ac2821d036d53d52b3e404accc40/${lat},${long}`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    tempDegree.textContent = temperature;
                    tempDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone
                    setIcons(icon, document.querySelector(".icon"))
                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});