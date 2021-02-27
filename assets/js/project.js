import utils from './utils.js';
import render_material_icon from './material_icon.js';

export default function render_projects(data) {
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
                    ${render_material_icon(m.type)} ${utils.cap_first_letter(m.type)}
                    </a>
                </span>
            `).join('')}
        </div>
    `).join('');
}

export function add_filter_projects(projects) {
    let buttons = document.querySelectorAll('input[name="category"]');
    buttons.forEach(cond => cond.addEventListener('change', function(event){
        let keyword = event.target.value;
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