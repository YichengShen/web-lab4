import render_material_icon from './material_icon.js';
import utils from './utils.js';

export default function render_publications(data) {
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
                                ${render_material_icon(m.type)} ${utils.cap_first_letter(m.type)}
                            </a>
                        </span>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}