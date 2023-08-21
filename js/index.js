/*
Listen Nepal , i love you !
*/

const color_map = {
        "Jupyter Notebook": "#da5c1d",
        "Python": "#3572a5",
        "JavaScript": "#f1e05a",
        "Java": "#b07219",
        "C#": "#178600",
        "PHP": "#4F5D95",
        "Ruby": "#CC342D",
        "C++": "#f34b7d",
        "TypeScript": "#2b7489",
        "Swift": "#ffac45",
        "HTML": "#e34c26",
        "C": "#555555",
        "Kotlin": "#7F52FF",
        "Default": "#D5590B"
};

async function getGithubApiData(sort) {
        const response = await fetch(`https://api.github.com/users/overlrd/repos?sort=${sort}`);
        const jsonData = await response.json();
        return jsonData
      }

const RepoIcon = new Image
RepoIcon.src = './assets/icons8-repository-24.png'

function buildCard(name, description, language, html_link){

        const project = document.createElement('div')
        project.className= 'project';
        
        const link = document.createElement('a')
        link.href = html_link;

        const title = document.createElement('p')
        title.className = 'title'
        title.innerHTML += `<span><img style="background: #bf91f3;" src="./assets/icons8-repository-24.png"></span> ${name}`
        
        const descript = document.createElement('small')
        descript.className = "description"
        descript.textContent = description 

        const lang = document.createElement('div')
        const dot_color = color_map[language] || color_map["Default"];
        lang.innerHTML = `<span class="dot" style="color: ${dot_color}">&#11044;</span> <small>${language}</small>`

        link.append(title)

        project.appendChild(link)
        project.appendChild(descript)
        project.appendChild(lang)
        return project
}


document.addEventListener('DOMContentLoaded', () => {
        const ProjectList = document.getElementById('projectlist');
        const SelectSort = document.getElementById('sort_by');
      
        function updateProjectList(sortBy) {
          ProjectList.innerHTML = '';
          getGithubApiData(sortBy).then((github_data) => {
            for (const repo of github_data) {
              const { name: repo_name, description: repo_description, language: repo_language, html_url: html_link } = repo;
              const repo_card = buildCard(repo_name, repo_description, repo_language, html_link);
              ProjectList.appendChild(repo_card);
            }
          });
        }
      
        // Initial update
        updateProjectList('updated');
      
        SelectSort.addEventListener('change', () => {
          const value = SelectSort.value;
          console.log(value, 'clicked !');
          updateProjectList(value);
        });
      });
      