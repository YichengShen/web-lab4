import render_main_header from './main_header.js';
import render_main_navbar from './main_navbar.js';
import render_about from './about.js';
import render_publications from './publication.js';
import render_projects, {add_filter_projects} from './project.js';
import render_news, {add_search_news} from './news.js';
import render_footer from './footer.js';

export default function render_main_page(data) {
    document.body.innerHTML = `
        ${render_main_header()}
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