window.addEventListener('load',  async(e) =>  {
  const loader = document.querySelector('.loading')
  const project_view = document.querySelector('.project_item')
  const links_view = document.querySelector('profile_socials')
  const certs_view = document.getElementById('certifications_grid')


  let Infoarr = [] 

  let certarr = [] 

  // FireServer Hrer //

  const res_cert = await fetch('https://fire-server.vercel.app/certification', {
    method: "GET"
  });
  
  if (res_cert.ok) {
    const data = await res_cert.json();
    data.forEach((doc) =>{
      certarr.push({...doc})
    } )
  
  } else {
    console.error('Error:', res_cert.status);
  }
  

  const res_projects = await fetch('https://fire-server.vercel.app/projects', {
    method: "GET"
  });
  
  if (res_projects.ok) {
    const data = await res_projects.json();
    data.forEach((doc) =>{
      Infoarr.push({...doc})
    } )
  
  } else {
    console.error('Error:', res_projects.status);
  }
  
// feed projects 
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

  // feed Certs
  certs_view.innerHTML = ''
  for (const cert_item of certarr) {
    // create a new cert div
    let new_div = document.createElement('kbd')
    new_div.className += "certification"

    // load image
    let img = new Image()
    img.src = cert_item['avatar'] // i dont know why i choose this name XD
    
    // load cert name
    let name = document.createElement('kbd')
    name.className+= "certification_click"
    let name_with_link = `<a target="_blank" href="${cert_item['review']}" >${cert_item['name']}</a>`
    name.innerHTML = name_with_link

    // add all this stuff 
    new_div.append(name)
    new_div.append(img)


    for( const skill of cert_item['skills_learned']){
      let description = document.createElement('div')
      description.className = "cert_description"
      description.innerHTML = skill
      new_div.append(description)

    }

    certs_view.append(new_div)

  } 
// log it
console.log("  dP88    dP88    dP88          88b 88 88   88 88 888888 .dP\"Y8 ");
console.log(" dP 88   dP 88   dP 88          88Yb88 88   88 88   88   `Ybo.\" ");
console.log("d888888 d888888 d888888         88 Y88 Y8   8P 88   88     `Y8b ");
console.log("    88      88      88          88  Y8 `YbodP' 88   88   8bodP' ");



  // Typing animation for my name
  var txt =  document.querySelector(".infos_name").dataset.content
  var i = 0
  var speed = 100
  function typeWriter() {
    if (i < txt.length) {
      document.querySelector(".infos_name").innerHTML += `${txt.charAt(i)}`;
      i++;
      setTimeout(typeWriter, speed);
      if (i == txt.length){
        document.querySelector(".infos_name").innerHTML += `&nbsp; <span class='blinker'>&#32;</span>`
      }
    }
  }

  typeWriter()
  loader.className = "loading-hidden"
  loader.addEventListener('transitionend', () => {
    document.body.removeChild('loading')
  })
})

document.addEventListener("DOMContentLoaded", function () {
  //
  let trigger = document.getElementById('audio_trigger')
  let audio = document.getElementById('easter_egg')

  let clickCount = 0;
  trigger.addEventListener('click', function(){
    clickCount++;
    if(clickCount === 4){
      audio.style.display = "block"
      audio.currentTime = 0;
      audio.play()
    }

  })
})

