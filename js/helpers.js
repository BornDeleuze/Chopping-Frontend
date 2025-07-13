export async function fetchWithRetry(url, options = {}, retries = 5, delay = 1000) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    return await res.json();
  } catch (err) {
    if (retries > 0) {
      console.warn(`Retrying ${url}... (${retries} left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 1.5);
    } else {
      console.error("Request failed after retries:", url);
      throw err;
    }
  }
}