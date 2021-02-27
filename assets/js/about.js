export default function render_about(data){
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

