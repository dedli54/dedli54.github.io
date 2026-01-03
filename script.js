document.addEventListener('DOMContentLoaded', function() {
    if (window.AOS && typeof AOS.init === 'function'){
        AOS.init({
            duration: 1000,
            once: true
        });
    }
    initSkillFilters();
});

// Default projects (fallback if JSON fetch fails)
const defaultProjects = [
    {
        id: 'fapsi',
        title: 'FAPSI — Control de acceso para modelos IA',
        desc: 'Panel admin en React + API REST en Node.js con autenticación JWT y RBAC. Rol: Desarrollador principal.',
        tech: ['React','Node.js','Prisma','JWT','RBAC','IBM Cloud'],
        image: 'images/fapsi.svg',
        repo: '#'
    },
    {
        id: 'chisme',
        title: 'ChismeExpress',
        desc: 'Chat en tiempo real con mensajería y videollamadas.',
        tech: ['React','Node.js','Docker'],
        image: 'images/project2.svg',
        repo: '#'
    },
    {
        id: 'prisma-api',
        title: 'API RESTful con Prisma',
        desc: 'Arquitectura y desarrollo de API con Node.js y Prisma ORM.',
        tech: ['Node.js','Prisma'],
        image: 'images/project3.svg',
        repo: '#'
    },
    {
        id: 'portfolio',
        title: 'Portfolio Personal',
        desc: 'Rediseño del portafolio personal con foco en presentaciones y UX.',
        tech: ['HTML','CSS','JavaScript'],
        image: 'images/project3.svg',
        repo: '#'
    },
    {
        id: 'automation',
        title: 'Automatización de Servidor Linux',
        desc: 'Scripts y tareas automáticas para respaldos y actualizaciones.',
        tech: ['Linux','SSH','Bash','Docker'],
        image: 'images/project2.svg',
        repo: '#'
    }
];

function renderProjects(list){
    const featuredWrap = document.getElementById('featured-projects');
    const wrap = document.getElementById('projects-list');
    if(!wrap) return;

    const featured = list.slice(0,3);
    const rest = list.slice(3);

    if(featuredWrap){
        featuredWrap.innerHTML = featured.map(p => `
            <div class="col-12 col-lg-4">
                <div class="card featured-card shadow-sm" data-skills="${p.tech.join(',')}">
                    <img src="${p.image}" class="card-img-top" alt="${p.title}">
                    <div class="card-body">
                        <h5>${p.title}</h5>
                        <p class="text-muted small">${p.desc}</p>
                        <div class="mt-3">
                            <a href="${p.repo}" class="btn btn-sm btn-primary" target="_blank">Ver repositorio</a>
                        </div>
                    </div>
                </div>
            </div>`).join('');
    }

    wrap.innerHTML = rest.map(p => `
        <div class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm" data-skills="${p.tech.join(',')}">
                <img src="${p.image}" class="card-img-top" alt="${p.title}">
                <div class="card-body">
                    <h5>${p.title}</h5>
                    <p class="text-muted small">${p.desc}</p>
                    <div class="mt-3">
                        <a href="${p.repo}" class="btn btn-sm btn-primary" target="_blank">Ver repositorio</a>
                    </div>
                </div>
            </div>
        </div>`).join('');
}

function renderSkillsFromProjects(list){
    // collect skills with counts
    const counts = {};
    list.forEach(p => p.tech.forEach(t => counts[t] = (counts[t] || 0) + 1));
    // sort by popularity desc then name
    const skills = Object.keys(counts).sort((a,b) => counts[b] - counts[a] || a.localeCompare(b));
    const wrap = document.getElementById('skills-list');
    if(!wrap) return;
    const topN = 8; // show only the most important skills for cleaner UX
    const top = skills.slice(0, topN);
    const rest = skills.slice(topN);

    // icon map (font-awesome classes) - fallback to code/database icons
    const iconMap = {
        'react': 'fab fa-react',
        'node.js': 'fab fa-node-js',
        'node': 'fab fa-node-js',
        'javascript': 'fab fa-js',
        'html5': 'fab fa-html5',
        'css3': 'fab fa-css3-alt',
        'bootstrap': 'fab fa-bootstrap',
        'docker': 'fab fa-docker',
        'github': 'fab fa-github',
        'firebase': 'fas fa-fire',
        'postgresql': 'fas fa-database',
        'postgres': 'fas fa-database',
        'mysql': 'fas fa-database',
        'kotlin': 'fas fa-mobile-alt',
        'android': 'fab fa-android',
        'c#': 'fas fa-code',
        'c++': 'fas fa-code',
        'three.js': 'fas fa-cubes',
        'hlsl': 'fas fa-shapes',
        'directx 11': 'fas fa-gamepad',
        'prisma': 'fas fa-database',
        'express': 'fas fa-server',
        'jwt': 'fas fa-user-shield',
        'supabase': 'fas fa-cloud',
        'emgu.cv': 'fas fa-image',
        'opencv': 'fas fa-image',
        'aiframe': 'fas fa-robot'
    };

    function iconFor(skill){
        const key = skill.toLowerCase();
        if(iconMap[key]) return `<i class="${iconMap[key]} skill-icon-fa"></i>`;
        for(const k in iconMap){ if(key.includes(k)) return `<i class="${iconMap[k]} skill-icon-fa"></i>`; }
        return `<i class="fas fa-code skill-icon-fa"></i>`;
    }

    const topHtml = top.map(s => `
        <div class="col-12 col-md-6">
            <div class="skill-badges list-unstyled">
                <li class="skill-badge" data-skill="${s}" title="Filtrar por ${s}">
                    <div class="d-flex align-items-center gap-3">
                        ${iconFor(s)}
                        <div>
                            <strong>${s}</strong>
                            <div class="meta">Proyectos: ${counts[s]}</div>
                        </div>
                    </div>
                </li>
            </div>
        </div>
    `).join('');

    // Provide a compact "Ver todas" button that opens a modal with the full list
    let viewAllHtml = '';
    if(rest.length > 0){
        viewAllHtml = `
        <div class="col-12">
            <div class="skill-badges list-unstyled">
                <button id="view-all-skills" class="btn btn-link p-0">Ver todas las habilidades (${skills.length})</button>
            </div>
        </div>`;
    }

    wrap.innerHTML = topHtml + viewAllHtml;

    // when user requests the full list, populate the modal body and show it
    const viewBtn = document.getElementById('view-all-skills');
    if(viewBtn){
        viewBtn.addEventListener('click', ()=>{
            const modalBody = document.getElementById('skillsModalBody');
            if(!modalBody) return;
            const allHtml = skills.map(s => `
                <div class="row mb-2">
                    <div class="col-12">
                        <li class="skill-badge" data-skill="${s}" title="Filtrar por ${s}">
                            <div class="d-flex align-items-center gap-3">
                                ${iconFor(s)}
                                <div>
                                    <strong>${s}</strong>
                                    <div class="meta">Proyectos: ${counts[s]}</div>
                                </div>
                            </div>
                        </li>
                    </div>
                </div>
            `).join('');
            modalBody.innerHTML = `<div class="list-unstyled">${allHtml}</div>`;
            // attach handlers to the newly-created badges inside modal
            initSkillFilters();
            const skillsModalEl = document.getElementById('skillsModal');
            if(skillsModalEl && window.bootstrap && typeof bootstrap.Modal === 'function'){
                const skillsModal = new bootstrap.Modal(skillsModalEl);
                skillsModal.show();
                // focus search input and wire live filtering inside modal
                const search = document.getElementById('skillsSearch');
                if(search){
                    search.value = '';
                    setTimeout(()=> search.focus(), 200);
                    search.addEventListener('input', ()=>{
                        const q = (search.value || '').trim().toLowerCase();
                        const badgesInModal = Array.from(modalBody.querySelectorAll('.skill-badge'));
                        badgesInModal.forEach(b => {
                            const text = (b.textContent || '').toLowerCase();
                            const row = b.closest('.row') || b.parentElement;
                            if(!row) return;
                            row.style.display = q === '' || text.includes(q) ? '' : 'none';
                        });
                    });
                }
            }
        });
    }
}

// render on load then attach filters (try JSON first, fallback to default)
document.addEventListener('DOMContentLoaded', function(){
    fetch('data/projects.json').then(r=>{
        if(!r.ok) throw new Error('fetch failed');
        return r.json();
    }).then(data=>{
        renderProjects(data);
        renderSkillsFromProjects(data);
        initSkillFilters();
    }).catch(err=>{
        // fallback to embedded default
        renderProjects(defaultProjects);
        renderSkillsFromProjects(defaultProjects);
        initSkillFilters();
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', function() {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        let top = window.scrollY;
        let offset = section.offsetTop - 150;
        let height = section.offsetHeight;
        let id = section.getAttribute('id');
        
        if(top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if(link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
});

function initSkillFilters(){
    let badges = Array.from(document.querySelectorAll('.skill-badge'));
    const cards = Array.from(document.querySelectorAll('.card[data-skills]'));
    if(!badges.length || !cards.length) return;

    // remove previously attached listeners by replacing each badge with a clone
    badges = badges.map(b => {
        const clone = b.cloneNode(true);
        b.parentNode.replaceChild(clone, b);
        return clone;
    });

    badges.forEach(b=>{
        b.addEventListener('click', ()=>{
            const skill = (b.dataset.skill || '').toLowerCase();
            const already = b.classList.contains('active');
            // clear all badge active states
            const allBadges = Array.from(document.querySelectorAll('.skill-badge'));
            allBadges.forEach(x=>x.classList.remove('active'));
            if(already){
                // clear filter -> show all
                cards.forEach(card => {
                    const col = card.parentElement;
                    if(col) col.style.display = '';
                });
            } else {
                b.classList.add('active');
                cards.forEach(card => {
                    const skills = (card.dataset.skills || '').toLowerCase();
                    const match = skills.split(',').map(s=>s.trim()).includes(skill);
                    const col = card.parentElement;
                    if(col) col.style.display = match ? '' : 'none';
                });
            }
        });
    });
}