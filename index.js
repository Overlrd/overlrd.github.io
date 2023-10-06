// Function to fetch GitHub repo data
async function getGithubApiData(sort) {
  const url = `https://api.github.com/users/overlrd/repos?sort=${sort}&per_page=10`;
  
  // Check if data exists in local storage
  const cachedData = localStorage.getItem(url);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  try {
    const response = await fetch(url);
    const jsonData = await response.json();

    // Store data in local storage
    localStorage.setItem(url, JSON.stringify(jsonData));

    return jsonData;
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return [];
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const projectList = document.getElementById('projects');
  projectList.innerHTML = '';

  try {
    const githubData = await getGithubApiData('updated');
    
    for (const repo of githubData) {
      const { name: repoName, description: repoDescription, language: repoLanguage, html_url: htmlLink } = repo;

      const listItem = document.createElement('li');
      const link = document.createElement('a');
      const paragraph = document.createElement('p');

      link.href = htmlLink;
      link.innerText = repoName;
      const langText = repoLanguage ? `language: ${repoLanguage}` : '';
      paragraph.innerText = `${repoDescription} - ${langText}`;

      listItem.appendChild(link);
      listItem.appendChild(paragraph);
      projectList.appendChild(listItem);
    }
  } catch (error) {
    console.error('Error rendering GitHub data:', error);
  }
});
