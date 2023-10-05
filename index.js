async function getGithubApiData(sort) {
        const response = await fetch(`https://api.github.com/users/overlrd/repos?sort=${sort}&per_page=10`
);
        const jsonData = await response.json();
        return jsonData
      }

document.addEventListener('DOMContentLoaded', () => {
  const ProjectList = document.getElementById('projects');
  ProjectList.innerHTML = ''

  getGithubApiData("updated").then((github_data) => {
    for (const repo of github_data) {
      const { name: repo_name,
        description: repo_description,
        language: repo_language,
        html_url: html_link } = repo;
        
        let new_item = document.createElement('li')
        let new_link = document.createElement('a')
        let new_p = document.createElement('p')

        new_link.href = html_link
        new_link.innerText = `${repo_name}`
        let lang_text = `language: ${repo_language}`
        new_p.innerText = `${repo_description} - ${repo_language !== null ? lang_text : ''}`

        new_item.appendChild(new_link)
        new_item.appendChild(new_p)
        ProjectList.appendChild(new_item)
    }
  })
})
