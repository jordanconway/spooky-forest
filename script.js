// script.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Data ---
    // An array of objects, where each object represents an animal.
    // This makes the app scalable. Just add a new object to add a new animal!
    const animals = [
        {
            name: 'Red Fox',
            image: 'cute-fox.jpg',
            sound: 'fox-call.mp3',
            description: "The spooky 'scream' you sometimes hear at night is often a Red Fox's call. They are common in forests across Quebec and Ontario."
        },
        {
            name: 'Barred Owl',
            image: 'barred-owl.jpg',
            sound: 'barred-owl.mp3',
            description: "The 'who cooks for you, who cooks for you all' call of the Barred Owl can sound ghostly in the dead of night."
        },
        {
            name: 'Porcupine',
            image: 'porcupine.jpg',
            sound: 'porcupine.mp3',
            description: "A porcupine's mix of grunts, whines, and teeth-chattering can be surprisingly unsettling when you don't know what it is."
        },
        {
            name: 'Canada Lynx',
            image: 'lynx.jpg',
            sound: 'lynx.mp3',
            description: "The scream of a lynx is hair-raising and one of the most startling sounds you can hear in the northern woods."
        },
        {
            name: 'Common Loon',
            image: 'loon.jpg',
            sound: 'loon.mp3',
            description: "The haunting, wailing cry of the loon is an iconic sound of Canadian lakes, beautiful but eerie in the quiet of the evening."
        },
        {
            name: 'Raccoon',
            image: 'raccoon.jpg',
            sound: 'raccoon.mp3',
            description: "The chittering, purrs, and growls of a raccoon can sound quite strange coming from the darkness just outside your tent."
        },
        {
            name: 'Coyote',
            image: 'coyote.jpg',
            sound: 'coyote.mp3',
            description: "The eerie chorus of yips, barks, and mournful howls from a coyote pack can echo through the dark woods, sending a chill down your spine."
        }
    ];

    let currentAnimalSound = null;

    // Get references to all the interactive elements
    const listenButton = document.getElementById('listenButton');
    const restartButton = document.getElementById('restartButton');
    const revealButton = document.getElementById('revealButton');
    const revealDiv = document.getElementById('reveal');
    const introContainer = document.querySelector('.intro-container'); // This is inside <main>
    const mainContainer = document.querySelector('.container'); // The <main> element
    const animalNameEl = document.getElementById('animalName');
    const animalImageEl = document.getElementById('animalImage');
    const animalDescriptionEl = document.getElementById('animalDescription');

    // Elements for the new summary page
    const showAllButton = document.getElementById('showAllButton');
    const summaryContainer = document.getElementById('summaryContainer');
    const animalGrid = document.getElementById('animalGrid');
    const backButton = document.getElementById('backButton');

    // --- Functions and Event Listeners ---

    // When the user clicks the initial "Listen" button
    listenButton.addEventListener('click', () => {
        // First, stop any sound that might already be playing from a previous click.
        if (currentAnimalSound) {
            currentAnimalSound.pause();
            currentAnimalSound.currentTime = 0;
        }

        const randomIndex = Math.floor(Math.random() * animals.length);
        const selectedAnimal = animals[randomIndex];

        currentAnimalSound = new Audio(selectedAnimal.sound);
        currentAnimalSound.play();

        // Hide the listen button and show the reveal button
        listenButton.classList.add('hidden');
        revealButton.classList.remove('hidden');

        // Set up the click listener for the reveal button.
        // Using { once: true } is a best practice here to ensure this listener
        // only runs once and doesn't stack up if the user clicks multiple times.
        revealButton.addEventListener('click', () => {
            animalNameEl.textContent = `It's just a ${selectedAnimal.name}!`;
            animalImageEl.src = selectedAnimal.image;
            animalImageEl.alt = `A cute ${selectedAnimal.name}`;
            animalDescriptionEl.textContent = selectedAnimal.description;

            introContainer.classList.add('hidden');
            revealDiv.classList.remove('hidden');
            revealDiv.classList.add('fade-in');
        }, { once: true }); // Use { once: true } so this only fires for the current animal
    });

    // --- Summary Page Logic ---

    const populateSummaryPage = () => {
        animalGrid.innerHTML = ''; // Clear previous entries
        animals.forEach(animal => {
            const card = document.createElement('div');
            card.className = 'animal-card';
            card.innerHTML = `
                <img src="${animal.image}" alt="${animal.name}">
                <p>${animal.name}</p>
            `;
            card.addEventListener('click', () => {
                // Stop any other sound before playing a new one
                if (currentAnimalSound) {
                    currentAnimalSound.pause();
                    currentAnimalSound.currentTime = 0;
                }
                currentAnimalSound = new Audio(animal.sound);
                currentAnimalSound.play();
            });
            animalGrid.appendChild(card);
        });
    };

    showAllButton.addEventListener('click', () => {
        mainContainer.classList.add('hidden');
        summaryContainer.classList.remove('hidden');
        resetApp(); // Stop any sounds from the main game
    });

    backButton.addEventListener('click', () => {
        summaryContainer.classList.add('hidden');
        mainContainer.classList.remove('hidden');
        // Stop any sound from the summary page
        resetApp();
    });

    const resetApp = () => {
        // Stop any currently playing sound and reset it
        if (currentAnimalSound) {
            currentAnimalSound.pause();
            currentAnimalSound.currentTime = 0;
        }

        // Hide the reveal section and the reveal button
        revealDiv.classList.add('hidden');
        revealDiv.classList.remove('fade-in'); // Prepare for next time

        // Show the intro section
        introContainer.classList.remove('hidden');

        // Reset the main listen button
        listenButton.classList.remove('hidden');
        listenButton.textContent = "Listen... if you dare.";

        revealButton.classList.add('hidden');
    };

    restartButton.addEventListener('click', () => {
        resetApp();
    });

    // Initial setup
    populateSummaryPage();
});
