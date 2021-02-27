export default function render_material_icon(type) {
    switch (type){
        case 'paper':
            return '<i class="fas fa-file-alt"></i>';
        case 'video':
            return '<i class="fas fa-video"></i>';
        case 'documentation':
            return '<i class="fas fa-book"></i>';
    }
}