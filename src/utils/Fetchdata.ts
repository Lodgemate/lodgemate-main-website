export async function fetchData(endpoint: any) {
    try {

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  }


  let debounceTimeoutId :any;

export const debounceFetch = (url : string, options = {}, delay = 1000) => {
  // Clear the previous timeout if it exists
  clearTimeout(debounceTimeoutId);

  // Return a new promise for the debounced fetch operation
  return new Promise((resolve, reject) => {
    debounceTimeoutId = setTimeout(() => {
      fetch(url, options)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    }, delay);
  });
};
export const FetchApi = (url : string, options = {}, ) => {
  console.log(options)
  return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(response => {
          if (!response.ok) {
          return response.json();

            throw new Error('Network response was not ok');
          }
          return response.json();

        })
        .then(data => resolve(data))
        .catch(error => reject(error));
  });
};
