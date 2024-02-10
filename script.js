// Your JavaScript code goes here

// Function to handle login form submission
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Placeholder code for handling login logic
    if (email === 'user@example.com' && password === 'password') {
        alert('Login successful!');
        // Redirect to another page or perform additional actions
    } else {
        alert('Invalid email or password. Please try again.');
    }
}

// Function to fetch and display workout plans
function fetchWorkoutPlans() {
    // Placeholder code for fetching workout plans from an API
    // Update the URL with the actual endpoint
    fetch('https://api.example.com/workout-plans')
        .then(response => response.json())
        .then(data => {
            // Placeholder code for displaying workout plans
            console.log('Workout plans:', data);
        })
        .catch(error => console.error('Error fetching workout plans:', error));
}

// Event listener for login form submission
document.getElementById('login-form').addEventListener('submit', handleLogin);

// Fetch workout plans when the page loads
fetchWorkoutPlans();
