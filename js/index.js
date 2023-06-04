/*
<a href="https://www.flaticon.com/free-icons/menu" title="menu icons">Menu icons created by Febrian Hidayat - Flaticon</a>
*/

/*
<img src="https://github-readme-stats.vercel.app/api?username=Overlrd&show_icons=true&theme=tokyonight&rank_icon=github" />
<img src="https://github-readme-stats.vercel.app/api/pin/?username=Overlrd&repo=trefle&theme=tokyonight" alt="" srcset="">
<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=overlrd&size_weight=0.5&count_weight=0.5&layout=donut&theme=tokyonight" alt="" srcset="">
http://api.github.com/users/overlrd/repos?sort=updated
*/

async function getGithubApiData(sort) {
        const response = await fetch(`http://api.github.com/users/overlrd/repos?sort=${sort}`);
        const jsonData = await response.json();
        return jsonData
      }
      
async function buildRepoCard(repo, theme, width, height){
        const Card = new Image(width,height)
        Card.src = `https://github-readme-stats.vercel.app/api/pin/?username=Overlrd&repo=${repo}&theme=${theme}`
        return Card
}
const RepoIcon = new Image
RepoIcon.src = './assets/icons8-repository-24.png'
/*
<div class="project" style="background: #1a1b27; margin:1rem">
<p class="title"> 
        <span>
        <img style="background: #bf91f3;" src="./assets/icons8-repository-24.png" alt="" srcset="">
        </span>
        Lorem is totam aperiam!</p>
<small class="description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus architecto aperiam cupiditate molestiae rem officia, voluptatem consectetur reprehenderit repellat autem velit, culpa temporibus, ut quaerat perferendis dolore sed a? Maiores. </small>
<div><span class="dot">&#11044;</span> language icon</div>
</div>
*/
function buildCard(name, description, language, html_link){
        const link = document.createElement('a')
        link.href = html_link;
        link.className = 'project-link';
        const project = document.createElement('div')
        project.className= 'project';
        
        const title = document.createElement('p')
        title.className = 'title'
        title.innerHTML += `<span><img style="background: #bf91f3;" src="./assets/icons8-repository-24.png" alt="" srcset=""></span> ${name}`
        
        const descript = document.createElement('small')
        descript.className = "description"
        descript.textContent = description 

        const lang = document.createElement('div')
        lang.innerHTML = `<span class="dot">&#11044;</span> ${language}`

        project.appendChild(title)
        project.appendChild(descript)
        project.appendChild(lang)
        link.append(project)
        return link
}

const color_map = {"Jupyter Notebook":"#da5c1d", "Python":"#3572a5",
"HTML":"#e34c26", "JavaScipt":"#f1e05a"}

document.addEventListener('DOMContentLoaded', ()=>{
        const ProjectList = document.getElementById('projectlist')
        ProjectList.innerHTML = '';
        const SelectSort = document.getElementById('sort_by')
        getGithubApiData('updated').then((github_data) => {
                for (const repo of github_data) {
                        const repo_name = repo['name']
                        const repo_description = repo['description']
                        const repo_language = repo['language']
                        const html_link = repo['html_url']
                        const repo_card = buildCard(repo_name,repo_description, repo_language, html_link)
                        ProjectList.appendChild(repo_card)
        }}
        )

        SelectSort.addEventListener('change', ()=>{
                const value = SelectSort.value
                console.log(value, 'clicked !')
                ProjectList.innerHTML = '';
                getGithubApiData(value).then((github_data) => {
                        for (const repo of github_data) {
                                const repo_name = repo['name']
                                const repo_description = repo['description']
                                const repo_language = repo['language']
                                const html_link = repo['html_url']
                                const repo_card = buildCard(repo_name,repo_description, repo_language, html_link)
                                ProjectList.appendChild(repo_card)
                                console.log('new item added')
                }
                })
        })
}
)
