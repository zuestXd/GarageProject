document.addEventListener("DOMContentLoaded", function () {
    const phoneModal = document.getElementById("phoneModal");
    const phoneNumberInput = document.getElementById("phoneNumber");
    const submitBtn = document.getElementById("submitBtn");
    const validationMessage = document.getElementById("validationMessage");

    function isValidQatarPhoneNumber(number) {
        // Qatar phone numbers: +974 followed by 8 digits
        const qatarPhoneRegex = /^\+974\d{8}$/;
        return qatarPhoneRegex.test(number);
    }

    function validatePhoneNumber() {
        const phoneNumber = phoneNumberInput.value.trim();
        if (isValidQatarPhoneNumber(phoneNumber)) {
            // If valid, close the modal (or redirect to another page)
            window.location.href = 'results.html'; // Change to desired URL or action
        } else {
            validationMessage.style.display = 'block';
        }
    }

    submitBtn.addEventListener('click', function () {
        validatePhoneNumber();
    });

    // Ensure the modal cannot be closed until valid input is provided
    phoneModal.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            event.preventDefault();
        }
    });
});
