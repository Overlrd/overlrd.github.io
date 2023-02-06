import { GetWolfs } from "./firebase.js";
//const getwolfs = getDocs(collection(db, 'infos'))

window.addEventListener('load', () => {
  const loader = document.querySelector('.loading')
  loader.className = "loading-hidden"
  loader.addEventListener('transitionend', () => {
    document.body.removeChild('loading')
  })

})

document.addEventListener('DOMContentLoaded', async(e) => {
    let Infoarr = [] 
    const QuerySnapshot = await GetWolfs();
    QuerySnapshot.forEach((doc) => {
        console.log(doc.data());
        Infoarr.push({...doc.data()})
        
    })

    const project_view = document.querySelector('.project_item')
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
      github_link.innerHTML = `<a href='${item['github']}'> <img class='project_github_logo' src='https://i.imgur.com/t8MV9gw.png' /> </a>`
      header.append(github_link)


      let img = new Image()
      img.src = item['image']
      new_article.append(header)
      new_article.append(img)
      new_article.append(footer)

      project_view.append(new_article)
    }
})




const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });