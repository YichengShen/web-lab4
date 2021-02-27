import render_main_page from './main_page.js';
import render_project_page from './project_page.js'

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