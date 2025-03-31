document.getElementById('hoursForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form elements
    const submitBtn = document.getElementById('submitBtn');
    const spinner = document.getElementById('spinner');
    const status = document.getElementById('status');

    // Show loading spinner and disable button
    submitBtn.disabled = true;
    spinner.style.display = 'inline-block';
    status.textContent = '';

    // Get form values
    const date = document.getElementById('date').value;
    const hoursWorked = document.getElementById('hoursWorked').value;
    const tasksCompleted = document.getElementById('tasksCompleted').value;
    const notes = document.getElementById('notes').value;

    // Prepare data for Google Sheets
    const data = {
        date: date,
        hoursWorked: hoursWorked,
        tasksCompleted: tasksCompleted,
        notes: notes
    };

    // Your Web App URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz-1dSWzryXjP4imwKqCb3tLC-IQSjWC33yZnKDhXuokUHcgOe8UlVCXDJnd0Y6EIC5Hw/exec';

    // Send data to Google Sheets
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        // Success: Hide spinner, reset form, show message
        submitBtn.disabled = false;
        spinner.style.display = 'none';
        status.textContent = 'Entry added successfully!';
        status.classList.remove('error');
        setTimeout(() => status.textContent = '', 3000);
        document.getElementById('hoursForm').reset();
    })
    .catch(error => {
        // Error: Hide spinner, show error message
        submitBtn.disabled = false;
        spinner.style.display = 'none';
        status.textContent = 'Error: Could not connect to Google Sheets.';
        status.classList.add('error');
        console.error('Fetch Error:', error);
    });
});