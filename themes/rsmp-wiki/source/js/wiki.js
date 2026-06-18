(function () {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
  }

  const toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', () => {
      toTop.classList.toggle('show', window.scrollY > 500);
    });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const input = document.getElementById('wikiSearch');
  const results = document.getElementById('searchResults');
  if (!input || !results) return;

  let index = null;
  const root = document.querySelector('meta[name="hexo-root"]')?.content || window.location.pathname.split('/')[1];
  const base = window.location.pathname.includes('/rsmp-s2-wiki/') ? '/rsmp-s2-wiki/' : '/';

  async function loadIndex() {
    if (index) return index;
    try {
      const res = await fetch(base + 'search.json');
      index = await res.json();
      return index;
    } catch (err) {
      index = [];
      return index;
    }
  }

  function strip(html) {
    return String(html || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  }

  input.addEventListener('input', async () => {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      results.classList.remove('active');
      results.innerHTML = '';
      return;
    }
    const data = await loadIndex();
    const hits = data.filter(item => {
      const text = `${item.title || ''} ${item.content || ''}`.toLowerCase();
      return text.includes(q);
    }).slice(0, 8);

    results.innerHTML = hits.length ? hits.map(item => {
      const title = item.title || '未命名页面';
      const url = item.url || item.path || '#';
      const snippet = strip(item.content).slice(0, 100);
      return `<a href="${url}"><strong>${title}</strong><p>${snippet}</p></a>`;
    }).join('') : '<a href="#"><strong>没有找到结果</strong><p>换个关键词试试，比如：技能、复活、配方、命令。</p></a>';
    results.classList.add('active');
  });

  document.addEventListener('click', (e) => {
    if (!results.contains(e.target) && e.target !== input) {
      results.classList.remove('active');
    }
  });
})();
