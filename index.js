import { GetWolfs, GetGoose } from "./firebase.js";
//const getwolfs = getDocs(collection(db, 'infos'))

window.addEventListener('load',  async(e) =>  {
  const loader = document.querySelector('.loading')
  const project_view = document.querySelector('.project_item')
  const links_view = document.querySelector('profile_socials')


  let Infoarr = [] 
  const QuerySnapshot = await GetWolfs();
  QuerySnapshot.forEach((doc) => {
      //console.log(doc.data());
      Infoarr.push({...doc.data()})
      
  })

  let certarr = [] 
  const QuerySnapshot_again = await GetGoose();
  QuerySnapshot_again.forEach((doc) => {
      console.log(doc.data());
      certarr.push({...doc.data()})
      
  })

  project_view.innerHTML = ''

  for (const item of Infoarr) {
    let new_article = document.createElement('article')
    new_article.className += "project_article"

    let footer = document.createElement('footer')
    footer.className += "project_article_footer"
    footer.innerHTML = `${item['description']}`

    let header = document.createElement('header')
    header.className += "project_article_header"
    header.innerHTML = `${item['title']}`

    let github_link = document.createElement('div')
    github_link.className += "project_github_link"
    github_link.innerHTML = `<a target="_blank" href='${item['github']}'> <img class='project_github_logo' src='https://i.imgur.com/t8MV9gw.png' /> </a>`
    header.append(github_link)


    let img = new Image()
    img.src = item['image']
    new_article.append(header)
    new_article.append(img)
    new_article.append(footer)

    project_view.append(new_article)
    project_view.classList.add("slided")
  }

  // Typing animation for my name
  var txt =  document.getElementById("infos_name").dataset.content
  var i = 0
  var speed = 100
  function typeWriter() {
    if (i < txt.length) {
      document.getElementById("infos_name").innerHTML += `${txt.charAt(i)}`;
      i++;
      setTimeout(typeWriter, speed);
      if (i == txt.length){
        document.getElementById("infos_name").innerHTML += `&nbsp; <span class='blinker'>&#32;</span>`
      }
    }
  }

  typeWriter()
  loader.className = "loading-hidden"
  loader.addEventListener('transitionend', () => {
    document.body.removeChild('loading')
  })
})