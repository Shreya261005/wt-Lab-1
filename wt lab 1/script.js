document.addEventListener('DOMContentLoaded', function() {
    // Check if the form element exists on the page (it only exists on registration.html)
    const registrationForm = document.getElementById('studentRegistrationForm');

    if (!registrationForm) {
        // Stop execution if we are on index.html where this script is not needed
        return; 
    }

    // Utility function to clear/display error messages and style the input
    function displayError(fieldId, message) {
        const errorElement = document.getElementById('error-' + fieldId);
        const inputElement = document.getElementById(fieldId);

        if (errorElement) {
            errorElement.textContent = message;
        }

        if (inputElement) {
            if (message) {
                // Add the error class (defined in the HTML <style> block)
                inputElement.classList.add('input-error');
            } else {
                // Remove the error class
                inputElement.classList.remove('input-error');
            }
        }
    }

    // Add an event listener for the form submission
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default submission
        
        let isValid = true;
        
        // Collect and trim field values
        const formFields = {
            fullName: document.getElementById('fullName').value.trim(),
            regNo: document.getElementById('regNo').value.trim(),
            email: document.getElementById('email').value.trim(),
            mobileNo: document.getElementById('mobileNo').value.trim()
        };

        // Clear all previous errors
        Object.keys(formFields).forEach(key => displayError(key, ''));

        // --- Check for Empty Fields (Required Check) ---
        for (const key in formFields) {
            if (formFields[key].length === 0) {
                displayError(key, 'This field is required.');
                isValid = false;
            }
        }

        // --- Detailed Validation (Only runs if fields are not empty) ---
        if (isValid) {
            // 1. Full Name Validation: At least 3 letters 
            if (formFields.fullName.length < 3) {
                displayError('fullName', 'Full Name must be at least 3 characters long.');
                isValid = false;
            }

            // 2. Registration Number Validation: Exactly 9 characters
            if (formFields.regNo.length !== 9) {
                displayError('regNo', 'Registration Number must be exactly 9 characters.');
                isValid = false;
            }
            
            // 3. Email Validation: Standard regex for validity
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailPattern.test(formFields.email)) {
                displayError('email', 'Please enter a valid email address (e.g., user@domain.com).');
                isValid = false;
            }
            
            // 4. Mobile Number Validation: Exactly 10 digits
            const mobilePattern = /^\d{10}$/; 
            
            if (!mobilePattern.test(formFields.mobileNo)) {
                 displayError('mobileNo', 'Mobile Number must be exactly 10 digits.');
                 isValid = false;
            }
        }
        
        // --- Final Submission ---
        if (isValid) {
            // Success alert
            alert('Validation Successful! Data is ready to be sent to the server.');
            
            // Reset the form for demonstration
            registrationForm.reset();
        }
    });
});