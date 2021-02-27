import render_footer from './footer.js';
import render_material_icon from './material_icon.js';
import utils from './utils.js';

export default function render_project_page(data) {
    document.body.innerHTML = `
        ${render_project_header(data)}
        ${render_project_navbar()}
        ${render_project_details(data)}
        ${render_footer()}
    `;
}

function render_project_header(data) {
    return `
        <header class="name-header text-white text-decoration-none">
            <div class="container text-center">
                <h1>${data.title}</h1>
            </div>
        </header>
    `;
}

function render_project_navbar() {
    return `
    <nav class="sticky-top mb-2">
        <ul class="nav nav-fill nav-menu">
            <a class="nav-link href-item center-underline" href="index.html">Return to main page</a>
        </ul>
    </nav>
    `;
}

function render_project_details(data) {
    return `
    <div class="container">
        <div class="row">
            <div class="col-sm-10 mx-auto" id="content-col">
                <h5><u>Time</u></h5>
                <p class="fw-light">${data.date}</p>
                <h5><u>Description</u></h5>
                <p class="fw-light">${data.details}</p>

                ${data.documents.map(d => `
                    <span>
                        <a href="${d.link}" class="href-item text-decoration-none center-underline" target="_blank">
                        ${render_material_icon(d.type)} ${utils.cap_first_letter(d.type)}
                        </a>
                    </span>
                `).join('')}

                <div class="mt-3">
                    ${render_project_images(data.images)}
                </div>
            </div>
        </div>
    </div>
    `
}

function render_project_images(images) {
    return images.map(d => `
        <div class="mt-2">
            <h5><u>${d.img_name}<u></h5>
            <img src="${d.img}" class="img-fluid mb-4 mx-auto d-block" alt="login">
        </div>
    `).join('');
}
