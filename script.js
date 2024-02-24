// Function to make API request and populate result
function getAndPopulateTimezone(data) {
    const resultContainer = document.querySelector('.result');

    // Populate timezone data
    if (data.features && data.features.length > 0) {
        const feature = data.features[0];
        const properties = feature.properties;
        const timezone = properties.timezone;

        resultContainer.innerHTML = `
            <p>Name of Time Zone: ${timezone.name}</p>
            <br>
            <p><span class="label">Lat:</span> ${properties.lat}</p>
            <p><span class="label">Long:</span> ${properties.lon}</p>
            <br>
            <p>Offset STD: ${timezone.offset_STD}</p>
            <br>
            <p>Offset STD Seconds: ${timezone.offset_STD_seconds}</p>
            <br>
            <p>Offset DST: ${timezone.offset_DST}</p>
            <br>
            <p>Offset DST Seconds: ${timezone.offset_DST_seconds}</p>
            <br>
            <p>Country: ${properties.country}</p>
            <br>
            <p>Postcode: ${properties.postcode}</p>
            <br>
            <p>City: ${properties.city}</p>
            <br>
        `;
    } else {
        resultContainer.innerHTML = "<p>No timezone data found</p>";
    }
}

// Fetch data when clicking the submit button
document.getElementById('btn').addEventListener('click', function() {
    const addressInput = document.getElementById('Address');
    const address = addressInput.value.trim(); // Trim whitespace from the input

    // Check if address is empty
    if (address === '') {
        // Display error message
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Please enter an address!';
        errorMessage.style.color = 'red';

        // Check if error message already exists
        const existingErrorMessage = document.querySelector('.errorMessage');
        if (!existingErrorMessage) {
            // Append error message to headContainer
            const headContainer = document.querySelector('.headContainer');
            headContainer.appendChild(errorMessage);
            errorMessage.classList.add('errorMessage');
        }

        // Clear previous result
        const resultContainer = document.querySelector('.result');
        resultContainer.innerHTML = '';

        // Stop further execution
        return;
    }

    // If address is not empty, proceed with geocoding and API request
    var requestOptions = {
        method: 'GET',
    };

    fetch(`https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=8170e9fbfac242f2b47ac4da60a7262b`, requestOptions)
        .then(response => response.json())
        .then(result => {
            getAndPopulateTimezone(result);
        })
        .catch(error => {
            console.error('Error fetching geocoding data:', error);
        });
});
