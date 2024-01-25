document.addEventListener('keydown', function(event) {
    const keyDisplay = document.getElementById('screen');
    keyDisplay.textContent = `You pressed: ${event.key}`;
  });