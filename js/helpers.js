export function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
  const errorDiv = document.getElementById("error-message");

  if (errorDiv) {
    errorDiv.style.display = "block";
    errorDiv.textContent = "The backend spins down at inactivity... check back in a minute and it should be spun up and ready for fun.";
  }

  const attemptFetch = (n) =>
    fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // Hide error message if successful
        if (errorDiv) errorDiv.style.display = "none";
        return data;
      })
      .catch((err) => {
        if (n <= 1) throw err;
        return new Promise((resolve) => setTimeout(resolve, delay)).then(() =>
          attemptFetch(n - 1)
        );
      });

  return attemptFetch(retries);
}