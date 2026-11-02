// ThindTech Labs — model index + dataset showcase

/* ---------------- Model catalog ---------------- */
const models = [
  { name: 'Tikka-3B', category: 'text', icon: '◌', version: 'v1.2 · 3B params', description: 'A compact instruction model for everyday reasoning, extraction, multilingual chat, and local assistant workflows.', tags: ['Text', 'Chat', 'GGUF'], link: 'https://huggingface.co/ThindTechLabs/tikka-3b', featured: true },
  { name: 'Rangrez-XL', category: 'image-gen', icon: '✦', version: 'v0.8 · image model', description: 'An image generation model for bold visual studies, concept work, and fast creative iteration from a short prompt.', tags: ['Image Gen', 'Diffusion'], link: 'https://huggingface.co/ThindTechLabs/rangrez-xl' },
  { name: 'Drishti-VL', category: 'vision', icon: '◉', version: 'v0.9 · 7B params', description: 'Vision-language understanding for screenshots, documents, charts, and visual question answering.', tags: ['Vision', 'VQA'], link: 'https://huggingface.co/ThindTechLabs/drishti-vl' },
  { name: 'Khet-Embed', category: 'text', icon: '✳', version: 'v1.1 · 110M params', description: 'Semantic embeddings for search, clustering, retrieval, and grounded question-answering at a friendly footprint.', tags: ['Text', 'Embeddings'], link: 'https://huggingface.co/ThindTechLabs/khet-embed' },
  { name: 'Nazar-Det', category: 'vision', icon: '⌾', version: 'v0.4 · 28M params', description: 'A lightweight object detector for edge devices, real-time camera feeds, and practical visual automation.', tags: ['Vision', 'Edge'], link: 'https://huggingface.co/ThindTechLabs/nazar-det' },
  { name: 'Mitti-Edit', category: 'image-gen', icon: '◇', version: 'v0.5 · image model', description: 'An image editing model for controlled variations, object cleanup, and direction-aware visual changes.', tags: ['Image Gen', 'Editing'], link: 'https://huggingface.co/ThindTechLabs/mitti-edit' }
];

const grid = document.querySelector('#model-grid');
const emptyState = document.querySelector('#empty-state');
const search = document.querySelector('#search');
const filterButtons = [...document.querySelectorAll('.filter')];
let activeFilter = 'all';

function cardTemplate(model) {
  return `<article class="model-card ${model.featured ? 'featured' : ''}">
    <div class="card-top"><span class="category">${model.category.replace('-', ' ')}</span><span class="version">${model.version}</span></div>
    <div class="model-icon" aria-hidden="true">${model.icon}</div>
    <h3>${model.name}</h3>
    <p>${model.description}</p>
    <div class="card-footer"><div class="tags">${model.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div><a class="card-link" href="${model.link}" target="_blank" rel="noreferrer">Open Hugging Face ↗</a></div>
  </article>`;
}

function render() {
  const term = search.value.trim().toLowerCase();
  const visible = models.filter(model => {
    const matchesFilter = activeFilter === 'all' || model.category === activeFilter;
    const haystack = [model.name, model.category, model.description, ...model.tags].join(' ').toLowerCase();
    return matchesFilter && haystack.includes(term);
  });
  grid.innerHTML = visible.map(cardTemplate).join('');
  emptyState.hidden = visible.length !== 0;
}

filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  activeFilter = button.dataset.filter;
  render();
}));
search.addEventListener('input', render);
render();

/* ---------------- Dataset interactions ---------------- */

// Reveal the dataset card as it scrolls into view
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Animate the task-mix bars when they enter the viewport
const barsWrap = document.querySelector('#task-bars');
if (barsWrap) {
  const barsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      barsWrap.querySelectorAll('.bar-row').forEach((row, i) => {
        const share = parseFloat(row.dataset.share);
        if (share >= 50) row.classList.add('leader');
        const fill = row.querySelector('.bar-fill');
        setTimeout(() => { fill.style.width = Math.max(share, 1.4) + '%'; }, 120 + i * 90);
      });
      barsObserver.unobserve(barsWrap);
    });
  }, { threshold: 0.3 });
  barsObserver.observe(barsWrap);
}

// Copy button for the usage snippet
const copyButton = document.querySelector('#copy-usage');
if (copyButton) {
  copyButton.addEventListener('click', async () => {
    const snippet = document.querySelector('#usage-snippet').innerText;
    try {
      await navigator.clipboard.writeText(snippet);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(document.querySelector('#usage-snippet'));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
      selection.removeAllRanges();
    }
    copyButton.textContent = 'Copied ✓';
    copyButton.classList.add('copied');
    setTimeout(() => {
      copyButton.textContent = 'Copy';
      copyButton.classList.remove('copied');
    }, 1800);
  });
}