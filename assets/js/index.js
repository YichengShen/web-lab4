// import render_main_page from './main_page.js';

// Path of JSON data
const path_json = 'assets/json/data.json'

// Parse URL parameters 
const query_string = window.location.search;
console.log(query_string);
const url_params = new URLSearchParams(query_string);

const project_id = url_params.get("project");

// Load Data
fetch(path_json)
.then(response => {
    return response.json();
})
.then(data => {
    // if URL contains project ID
    // show project page
    if (project_id) {
        const project = data.projects.find(d=>d.id===project_id)
        render_project_page(project);
        
    } else { // else, show main page
        render_main_page(data);
}
});

function render_main_page(data) {
    document.body.innerHTML = `
        ${render_header()}
        ${render_main_navbar()}
        <div class="container">
            <div class="row">
                <div class="col-10 mx-auto">
                    ${render_about(data.about)}
                    ${render_publications(data.publications)}
                    <section>
                        <div class="row">
                            ${render_projects(data.projects)}
                            ${render_news(data.news)}
                        </div>
                    </section>
                </div>
            </div>
        </div>
        ${render_footer()}
    `;

    // Add interactions
    add_interactions(data);
}

function add_interactions(data) {
    add_search_news(data.news);
    add_filter_projects(data.projects);
}

function render_header() {
    return `
    <header class="name-header text-white text-decoration-none">
        <div class="container text-center">
        <h1 class="fw-bolder animate__animated animate__heartBeat animate__delay-1s animate__slow">Yicheng Shen</h1>
        </div>
    </header>
    `;
}

function render_main_navbar() {
    return `
    <nav class="sticky-top">
        <ul class="nav nav-fill nav-menu">
            <a class="nav-link href-item center-underline" href="#about">About</a>
            <a class="nav-link href-item center-underline" href="#publications">Publications</a>
            <a class="nav-link href-item center-underline" href="#projects">Projects</a>
            <a class="nav-link href-item center-underline" href="#news">News</a>
        </ul>
    </nav>
    `
}

function render_about(data){
    return `
    <section id="about" class="anchor">
        <div class="row">
            <div class="col-sm-8">
                <header>About</header>
                <p class="fw-normal">${data.description}</p>
                <a href="${data.github}" class="fs-3 href-item" target="_blank"><i class="fab fa-github"></i></a> 
                <span class="fs-3"> | </span>
                <a href="${data.linkedin}" class="fs-3 href-item" target="_blank"><i class="fab fa-linkedin"></i></a>
                <span class="fs-3"> | </span>
                <a href="${data.twitter}" class="fs-3 href-item" target="_blank"><i class="fab fa-twitter"></i></a>
            </div>
        
            <div class="col-sm-4">
                <img src="${data.photo}" class="my-img mx-auto d-block" alt="alternatetext">
            </div>
        </div>
    </section>
    `;
}

function render_publications(data) {
    return `
    <section id="publications" class="anchor">
        <header>Publications</header>
        ${render_pub_items(data)}
    </section>
    `;
}

function render_pub_items(data) {
    return data.map(d => `
        <div class="row sub-item">
            <div class="col">
                <h5 class="fw-bold">${d.title}</h5>
                ${d.tags.map(t => `
                    <span class="badge bg-primary bg-custom bg-${t}">${t}</span>
                `).join('')}
                <p class="fw-light">Authors: ${d.authors}</p>
                <p class="fw-light">Conference: ${d.conference}</p>
                <div class="material-custom">
                    ${d.materials.map(m => `
                        <span>
                            <a href="${m.link}" class="href-item text-decoration-none center-underline me-3" target="_blank">
                                ${render_material_icon(m.type)} ${cap_first_letter(m.type)}
                            </a>
                        </span>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function render_material_icon(type) {
    switch (type){
        case 'paper':
            return '<i class="fas fa-file-alt"></i>';
        case 'video':
            return '<i class="fas fa-video"></i>';
        case 'documentation':
            return '<i class="fas fa-book"></i>';
    }
}

function render_projects(data) {
    return `
    <div id="projects" class="col-sm-8 anchor">
        <header>Projects</header>

        <span class="btn-group mb-3" role="group" aria-label="Basic radio toggle button group">

            <input type="radio" class="btn-check" name="category" id="All" value="all" autocomplete="off" checked>
            <label class="btn btn-outline-dark" for="All">All</label>

            <input type="radio" class="btn-check" name="category" id="Software" value="software" autocomplete="off">
            <label class="btn btn-outline-dark" for="Software">Software</label>

            <input type="radio" class="btn-check" name="category" id="ML" value="ml" autocomplete="off">
            <label class="btn btn-outline-dark" for="ML">ML</label>

            <input type="radio" class="btn-check" name="category" id="NLP" value="nlp" autocomplete="off">
            <label class="btn btn-outline-dark" for="NLP">NLP</label>
        </span>

        <span class="project-list">
            ${render_project_items(data)}
        <span>
    </div>
    `;
}

function render_project_items(data) {
    return data.map(d => `
        <div class="sub-item">
            <h5 class="fw-bold">
                <a href="?project=${d.id}" class="href-item text-decoration-none center-underline">${d.title}</a>
            </h5>
            <p class="fw-lighter">${d.date}</p>
            <p class="fw-light">${d.abstract}</p>
            ${d.documents.map(m => `
                <span>
                    <a href="${m.link}" class="href-item text-decoration-none center-underline" target="_blank">
                    ${render_material_icon(m.type)} ${cap_first_letter(m.type)}
                    </a>
                </span>
            `).join('')}
        </div>
    `).join('');
}

function add_filter_projects(projects) {
    let buttons = document.querySelectorAll('input[name="category"]');
    buttons.forEach(cond => cond.addEventListener('change', function(event){
        keyword = event.target.value;
        let projects_filtered;
        if (keyword === 'all') {
            projects_filtered = projects;
        } else {
            projects_filtered = projects.filter(p => {
                return p.category.includes(keyword)
            });
        }
        document.querySelector('.project-list').innerHTML = render_project_items(projects_filtered);
    }));
}


function render_news(data) {
    return `
    <div id="news" class="col-sm-4 anchor">
        <header>News</header>
        <input class="form-control form-control-sm rounded-pill border-custom mb-3" type="search" name='news' placeholder="Search News...">
        <div class="news-list">
            ${render_news_items(data)}
        <div>
    </div>
    `;
}

function render_news_items(data) {
    return data.slice(0,5).map(d => `
        <div class="sub-item">
            <p class="fw-light lh-sm">${d.title}</p>
            <p class="fw-lighter lh-sm">${d.date}</p>
        </div>
    `).join('');
}

function add_search_news(news) {
    search_box = document.querySelector('input[name="news"]');
    search_box.addEventListener('input', (event)=>{
        const keyword = event.target.value;
        const news_filtered = news.filter(news=>{
            return news.title.toLowerCase().includes(keyword.toLowerCase()) ||
                   news.date.toLowerCase().includes(keyword.toLowerCase())
        });
        document.querySelector('.news-list').innerHTML = render_news_items(news_filtered);
    });
}

function render_footer() {
    return `
    <footer class="py-3 bg-dark">
        <div class="container">
            <p class="m-0 text-center text-white">Copyright &copy; Yicheng Shen 2021</p>
        </div>
    </footer>
    `;
}

function cap_first_letter(s) {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}