document.addEventListener("DOMContentLoaded", function () {
    // Check for the elements to avoid null errors
    const partToggleBtn = document.getElementById("partToggleBtn");
    const serviceToggleBtn = document.getElementById("serviceToggleBtn");
    const partFieldset = document.getElementById("partFieldset");
    const serviceFieldset = document.getElementById("serviceFieldset");
    const partSearchBtn = document.getElementById("partSearchBtn");
    const serviceSearchBtn = document.getElementById("serviceSearchBtn");
    const makeSelect = document.getElementById("makeSelect");
    const modelSelect = document.getElementById("modelSelect");
    const yearSelect = document.getElementById("yearSelect");

    // Check if necessary elements exist before proceeding
    if (!partToggleBtn || !serviceToggleBtn || !partFieldset || !serviceFieldset || !partSearchBtn || !serviceSearchBtn || !makeSelect || !modelSelect || !yearSelect) {
        console.error('Some elements are missing in the HTML.');
        return;
    }

    // Add a title above the toggle buttons
    const container = document.querySelector('.container');
    // const title = document.createElement('h2');
    // title.textContent = 'All your car needs in one click';
    // title.classList.add('mb-4'); // Adding Bootstrap margin for spacing
    // container.insertBefore(title, container.firstChild);

    // Populate the year dropdown (from 2025 to 1950)
    for (let year = 2025; year >= 1950; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    // Toggle logic: Enable and disable the fieldsets
    function toggleEnquiry(type) {
        if (type === 'part') {
            partToggleBtn.classList.add('active');
            serviceToggleBtn.classList.remove('active');
            partFieldset.removeAttribute('disabled');
            serviceFieldset.setAttribute('disabled', 'true');
        } else if (type === 'service') {
            partToggleBtn.classList.remove('active');
            serviceToggleBtn.classList.add('active');
            partFieldset.setAttribute('disabled', 'true');
            serviceFieldset.removeAttribute('disabled');
        }
    }

    // Event listeners for toggles
    partToggleBtn.addEventListener('click', function () {
        toggleEnquiry('part');
    });

    serviceToggleBtn.addEventListener('click', function () {
        toggleEnquiry('service');
    });

    // Fetch car makes from the local server
    fetch('https://localhost:5001/api/cars/makes')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(make => {
                const option = document.createElement('option');
                option.value = make;
                option.textContent = make;
                makeSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching car makes:', error));

    // Fetch car models based on make selection
    makeSelect.addEventListener('change', function () {
        const selectedMake = this.value;
        modelSelect.innerHTML = '<option value="">Select Model</option>';
        modelSelect.disabled = true;

        if (selectedMake) {
            fetch(`https://localhost:5001/api/cars/models/${encodeURIComponent(selectedMake)}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    data.forEach(model => {
                        const option = document.createElement('option');
                        option.value = model;
                        option.textContent = model;
                        modelSelect.appendChild(option);
                    });
                    modelSelect.disabled = false;
                })
                .catch(error => console.error('Error fetching car models:', error));
        }
    });

    // Search button functionality for Car Parts
    partSearchBtn.addEventListener('click', function () {
        const make = makeSelect.value;
        const model = modelSelect.value;
        const year = yearSelect.value;
        const condition = document.querySelector('input[name="condition"]:checked')?.value || '';

        const apiUrl = 'https://localhost:5001/api/garages';
        const queryParams = new URLSearchParams({
            type: 'part',
            make,
            model,
            year,
            condition
        }).toString();

        fetch(`${apiUrl}?${queryParams}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const resultsList = document.getElementById("resultsList");
                resultsList.innerHTML = ''; // Clear previous results
                data.forEach(result => {
                    const div = document.createElement('div');
                    div.textContent = JSON.stringify(result);
                    resultsList.appendChild(div);
                });
            })
            .catch(error => console.error('Error fetching search results:', error));
    });

    // Search button functionality for Car Services
    serviceSearchBtn.addEventListener('click', function () {
        const serviceType = document.getElementById("serviceTypeSelect").value;
        const serviceDetails = document.getElementById("serviceDetails").value;

        const apiUrl = 'https://localhost:5001/api/garages';
        const queryParams = new URLSearchParams({
            type: 'service',
            serviceType,
            serviceDetails
        }).toString();

        fetch(`${apiUrl}?${queryParams}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const resultsList = document.getElementById("resultsList");
                resultsList.innerHTML = ''; // Clear previous results
                data.forEach(result => {
                    const div = document.createElement('div');
                    div.textContent = JSON.stringify(result);
                    resultsList.appendChild(div);
                });
            })
            .catch(error => console.error('Error fetching search results:', error));
    });

    // Initialize with part options as active
    toggleEnquiry('part');
});
