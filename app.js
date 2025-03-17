// Initial greeting
window.onload = function() {
    document.getElementById('greeting').textContent = 'Hello, World!';
};

// Function to change greeting when button is clicked
function changeGreeting() {
    const greetings = [
        'Hello, World!',
        'Bonjour, le monde!',
        'Hola, Mundo!',
        '你好，世界！',
        'こんにちは、世界！'
    ];
    
    const currentGreeting = document.getElementById('greeting').textContent;
    const currentIndex = greetings.indexOf(currentGreeting);
    const nextIndex = (currentIndex + 1) % greetings.length;
    
    document.getElementById('greeting').textContent = greetings[nextIndex];
}