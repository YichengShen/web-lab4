export default function render_news(data) {
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

export function add_search_news(news) {
    const search_box = document.querySelector('input[name="news"]');
    search_box.addEventListener('input', (event)=>{
        const keyword = event.target.value;
        const news_filtered = news.filter(news=>{
            return news.title.toLowerCase().includes(keyword.toLowerCase()) ||
                   news.date.toLowerCase().includes(keyword.toLowerCase())
        });
        document.querySelector('.news-list').innerHTML = render_news_items(news_filtered);
    });
}