// Function to save workout data locally
function saveWorkoutLocally(workoutData) {
    if (typeof Storage !== "undefined") {
        let savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts')) || [];
        savedWorkouts.push(workoutData);
        localStorage.setItem('savedWorkouts', JSON.stringify(savedWorkouts));
        alert('Workout saved successfully!');
    } else {
        console.error('Local storage is not supported.');
    }
}

// Function to display saved workouts on the tracking page
function displaySavedWorkouts() {
    const savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts')) || [];
    const workoutList = document.getElementById('workout-list');
    workoutList.innerHTML = '';

    if (savedWorkouts.length === 0) {
        workoutList.innerHTML = '<p>No workouts saved yet.</p>';
    } else {
        savedWorkouts.forEach(workout => {
            const li = document.createElement('li');
            const date = workout.date ? new Date(workout.date).toLocaleDateString() : 'Date not available';
            li.textContent = `Date: ${date}, Exercise: ${workout.exerciseName}, Sets: ${workout.sets}, Reps: ${workout.reps}, Weight: ${workout.weight} lbs `;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', function() {
                deleteWorkout(workout);
            });
            li.appendChild(deleteBtn);
            workoutList.appendChild(li);
        });
    }
}

// Function to delete a workout from the tracking log
function deleteWorkout(workout) {
    let savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts')) || [];
    savedWorkouts = savedWorkouts.filter(item => {
        return item.date !== workout.date ||
               item.exerciseName !== workout.exerciseName ||
               item.sets !== workout.sets ||
               item.reps !== workout.reps ||
               item.weight !== workout.weight;
    });
    localStorage.setItem('savedWorkouts', JSON.stringify(savedWorkouts));
    displaySavedWorkouts();
}


// Function to fetch exercises from the API based on user input
function fetchExercises(muscle) {
    const apiKey = 'RAYDfmgXl35+MVDnH8wD+g==BV5cFx2rj70Hp7yF';
    const apiUrl = `https://api-ninjas.com/api/exercises?muscle=${muscle}`;

    fetch(apiUrl, {
        headers: {
            'X-Api-Key': apiKey
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        displaySearchResults(data);
    })
    .catch(error => {
        console.error('Error fetching exercises:', error);
    });
}

// Function to display search results
function displaySearchResults(data) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    if (data && data.length > 0) {
        data.forEach(exercise => {
            const exerciseDiv = document.createElement('div');
            exerciseDiv.innerHTML = `<strong>Name:</strong> ${exercise.name}, <strong>Type:</strong> ${exercise.type}, <strong>Muscle:</strong> ${exercise.muscle}, <strong>Difficulty:</strong> ${exercise.difficulty}`;
            searchResults.appendChild(exerciseDiv);
        });
    } else {
        searchResults.innerHTML = '<p>No exercises found.</p>';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    displaySavedWorkouts();

    document.getElementById('workout-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const exerciseName = document.getElementById('exercise-name').value.trim();
        const sets = parseInt(document.getElementById('sets').value.trim());
        const reps = parseInt(document.getElementById('reps').value.trim());
        const weight = parseInt(document.getElementById('weight').value.trim());
        const date = new Date().toLocaleDateString(); // Get the current date

        const workoutData = {
            date,
            exerciseName,
            sets,
            reps,
            weight
        };
        saveWorkoutLocally(workoutData);
        displaySavedWorkouts();
        this.reset();
    });

    document.getElementById('exercise-search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const muscle = document.getElementById('muscle').value.trim();
        fetchExercises(muscle);
    });
});
// Function to save cached workout data for the tracking page
function saveCachedWorkout(workoutData) {
    localStorage.setItem('cachedWorkout', JSON.stringify(workoutData));
}

// Function to retrieve cached workout data for the tracking page
function getCachedWorkout() {
    return JSON.parse(localStorage.getItem('cachedWorkout')) || {};
}

// Function to display cached workout data on the tracking page
function displayCachedWorkout() {
    const cachedWorkout = getCachedWorkout();
    document.getElementById('cached-workout').textContent = `Cached Workout: ${JSON.stringify(cachedWorkout)}`;
}

// Event listener for caching workout data
document.getElementById('cache-workout-btn').addEventListener('click', function() {
    const exerciseName = document.getElementById('exercise-name').value.trim();
    const sets = parseInt(document.getElementById('sets').value.trim());
    const reps = parseInt(document.getElementById('reps').value.trim());
    const weight = parseInt(document.getElementById('weight').value.trim());

    const workoutData = {
        exerciseName,
        sets,
        reps,
        weight
    };

    saveCachedWorkout(workoutData);
    displayCachedWorkout();
});
