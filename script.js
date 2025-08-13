// Mikhael Aquarium Script
const rupiah = (n)=> n.toLocaleString('id-ID',{style:'currency',currency:'IDR'});

// Slider
const slider = document.getElementById('slider');
const slides = Array.from(slider.querySelectorAll('.slide'));
const prev = document.getElementById('prevSlide');
const next = document.getElementById('nextSlide');
const dots = document.getElementById('dots');
let idx = 0; let autoPlay;

function renderDots(){
  dots.innerHTML='';
  slides.forEach((_,i)=>{
    const b=document.createElement('button');
    b.className = i===idx?'active':'';
    b.addEventListener('click',()=>show(i));
    dots.appendChild(b);
  });
}
function show(i){
  slides[idx].classList.remove('current');
  idx = (i+slides.length)%slides.length;
  slides[idx].classList.add('current');
  renderDots();
}
prev.addEventListener('click',()=>{show(idx-1); restart();});
next.addEventListener('click',()=>{show(idx+1); restart();});
function start(){autoPlay=setInterval(()=>show(idx+1), 5000);}
function restart(){clearInterval(autoPlay); start();}
renderDots(); start();

// Parallax
document.addEventListener('mousemove',(e)=>{
  document.querySelectorAll('[data-parallax]').forEach(el=>{
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.x+r.width/2))/r.width;
    const y = (e.clientY - (r.y+r.height/2))/r.height;
    el.style.transform = `translate(${x*-10}px, ${y*-6}px)`;
  });
});

// Products
const products = [
  {id:'p1',name:'Nemo Ocellaris',price:85000,cat:'laut',tags:['ikan laut','pemula'], svg:'fish'},
  {id:'p2',name:'Cupang Halfmoon',price:35000,cat:'laut',tags:['ikan tawar','warna'], svg:'betta'},
  {id:'p3',name:'Kura Sulcata (baby)',price:950000,cat:'darat',tags:['reptil','daratan'], svg:'tortoise'},
  {id:'p4',name:'Iguana Hijau',price:1750000,cat:'darat',tags:['reptil','eksotis'], svg:'iguana'},
  {id:'p5',name:'Filter Canister 1200L',price:650000,cat:'aksesoris',tags:['filter','aquarium'], svg:'filter'},
  {id:'p6',name:'Lampu LED Aquascape',price:280000,cat:'aksesoris',tags:['pencahayaan'], svg:'lamp'},
  {id:'p7',name:'Udang Red Cherry (10ekor)',price:60000,cat:'laut',tags:['cleaner','aquascape'], svg:'shrimp'},
  {id:'p8',name:'Pakan Pelet Premium',price:45000,cat:'aksesoris',tags:['pakan'], svg:'food'}
];

const grid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortBy = document.getElementById('sortBy');

function iconSVG(kind){
  const svgs = {
    fish:`<svg viewBox="0 0 120 80"><path d="M10 40c20-20 50-25 70-10l20-10-10 20 10 20-20-10c-20 15-50 10-70-10z" fill="#58b6ff"/><circle cx="46" cy="38" r="4" fill="#0b3d2e"/></svg>`,
    betta:`<svg viewBox="0 0 120 80"><path d="M20 40c25-30 60-20 80 0-20 20-55 30-80 0z" fill="#58b6ff"/><path d="M15 30c10 10 10 20 0 30" stroke="#0b3d2e" stroke-width="6" fill="none"/></svg>`,
    tortoise:`<svg viewBox="0 0 120 80"><rect x="20" y="30" width="60" height="30" rx="14" fill="#1f6b52"/><circle cx="80" cy="44" r="10" fill="#1f6b52"/><rect x="12" y="38" width="12" height="12" rx="3" fill="#1f6b52"/></svg>`,
    iguana:`<svg viewBox="0 0 120 80"><path d="M15 55h90v8H15z" fill="#1f6b52"/><path d="M20 55c20-20 40-20 70 0" stroke="#58b6ff" stroke-width="6" fill="none"/></svg>`,
    filter:`<svg viewBox="0 0 120 80"><rect x="30" y="18" width="40" height="44" rx="8" fill="#58b6ff"/><rect x="70" y="22" width="12" height="36" rx="4" fill="#0b3d2e"/></svg>`,
    lamp:`<svg viewBox="0 0 120 80"><rect x="20" y="22" width="80" height="10" rx="5" fill="#58b6ff"/><rect x="20" y="40" width="80" height="6" rx="3" fill="#aee4ff"/></svg>`,
    shrimp:`<svg viewBox="0 0 120 80"><circle cx="40" cy="40" r="14" fill="#58b6ff"/><rect x="52" y="34" width="28" height="12" rx="6" fill="#58b6ff"/></svg>`,
    food:`<svg viewBox="0 0 120 80"><rect x="36" y="18" width="48" height="44" rx="10" fill="#58b6ff"/><circle cx="60" cy="40" r="8" fill="#0b3d2e"/></svg>`,
  };
  return svgs[kind]||svgs.fish;
}

function renderProducts(list){
  grid.innerHTML = '';
  list.forEach(p=>{
    const el = document.createElement('article');
    el.className = 'product';
    el.innerHTML = `
      <div class="thumb">${iconSVG(p.svg)}</div>
      <div class="meta">
        <h4>${p.name}</h4>
        <div class="price">${rupiah(p.price)}</div>
        <div class="tags">${p.tags.map(t=>`<span class="tag">#${t}</span>`).join('')}</div>
      </div>
      <div class="actions">
        <button class="btn ghost" data-id="${p.id}" data-act="wish">❤ Wishlist</button>
        <button class="btn" data-id="${p.id}" data-act="add">Tambah</button>
      </div>
    `;
    grid.appendChild(el);
  });
}
function applyFilters(){
  const q = (searchInput.value||'').toLowerCase();
  const cat = categoryFilter.value;
  let list = products.filter(p=> p.name.toLowerCase().includes(q) || p.tags.join(' ').toLowerCase().includes(q));
  if(cat!=='all') list = list.filter(p=> p.cat===cat);
  switch(sortBy.value){
    case 'price-asc': list.sort((a,b)=>a.price-b.price); break;
    case 'price-desc': list.sort((a,b)=>b.price-a.price); break;
    case 'name-asc': list.sort((a,b)=>a.name.localeCompare(b.name)); break;
    case 'name-desc': list.sort((a,b)=>b.name.localeCompare(a.name)); break;
  }
  renderProducts(list);
}
[searchInput,categoryFilter,sortBy].forEach(el=>el.addEventListener('input',applyFilters));
applyFilters();

// Cart
const cartBtn = document.getElementById('cartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const orderReview = document.getElementById('orderReview');

let cart = JSON.parse(localStorage.getItem('mk_cart')||'[]');

function saveCart(){ localStorage.setItem('mk_cart', JSON.stringify(cart)); }
function openCart(){ cartDrawer.classList.add('open'); cartDrawer.setAttribute('aria-hidden','false'); }
function closeCartFn(){ cartDrawer.classList.remove('open'); cartDrawer.setAttribute('aria-hidden','true'); }

document.body.addEventListener('click',(e)=>{
  const btn = e.target.closest('button');
  if(!btn) return;
  if(btn.dataset.act==='add'){
    const p = products.find(x=>x.id===btn.dataset.id);
    const found = cart.find(x=>x.id===p.id);
    if(found) found.qty++; else cart.push({id:p.id,name:p.name,price:p.price,qty:1});
    updateCart();
    openCart();
  }
  if(btn.dataset.act==='wish'){
    btn.textContent='✓ Tersimpan';
    btn.disabled=true;
  }
});

cartBtn.addEventListener('click',openCart);
closeCart.addEventListener('click',closeCartFn);

function updateCart(){
  cartItems.innerHTML = '';
  cart.forEach(item=>{
    const row = document.createElement('div');
    row.className='cart-item';
    row.innerHTML = `
      <div class="thumb">${iconSVG(products.find(p=>p.id===item.id).svg)}</div>
      <div>
        <div><strong>${item.name}</strong></div>
        <div class="price">${rupiah(item.price)}</div>
      </div>
      <div class="qty">
        <button data-id="${item.id}" data-qty="-1">-</button>
        <span>${item.qty}</span>
        <button data-id="${item.id}" data-qty="1">+</button>
        <button data-id="${item.id}" data-remove="1" title="Hapus">🗑</button>
      </div>
    `;
    cartItems.appendChild(row);
  });
  const subtotal = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const ship = cart.length?20000:0;
  cartSubtotal.textContent = rupiah(subtotal);
  cartTotal.textContent = rupiah(subtotal+ship);
  cartCount.textContent = cart.reduce((s,i)=>s+i.qty,0);
  saveCart();
}
cartItems.addEventListener('click',(e)=>{
  const b = e.target.closest('button'); if(!b) return;
  const id = b.dataset.id;
  if(b.dataset.remove){ cart=cart.filter(i=>i.id!==id); }
  else{
    const q = Number(b.dataset.qty);
    const it = cart.find(i=>i.id===id); if(!it) return;
    it.qty += q; if(it.qty<=0) cart = cart.filter(i=>i.id!==id);
  }
  updateCart();
});
updateCart();

// Checkout
checkoutBtn.addEventListener('click',()=>{
  if(!cart.length){ alert('Keranjang masih kosong.'); return; }
  const list = cart.map(i=>`• ${i.name} × ${i.qty} — ${rupiah(i.price*i.qty)}`).join('\n');
  orderReview.textContent = list || '-';
  checkoutModal.showModal();
});

document.getElementById('placeOrder').addEventListener('click',(e)=>{
  e.preventDefault();
  const name = document.getElementById('coName').value.trim();
  const phone = document.getElementById('coPhone').value.trim();
  const addr = document.getElementById('coAddr').value.trim();
  if(!name||!phone||!addr){ alert('Lengkapi data terlebih dahulu.'); return; }
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0)+20000;
  const invoice = 'MK' + Date.now().toString().slice(-6);
  const text = encodeURIComponent(
    `Halo Mikhael Aquarium!\n\nSaya ingin pesan:\n${cart.map(i=>`- ${i.name} x${i.qty}`).join('\n')}\n\nTotal: ${rupiah(total)}\nNama: ${name}\nHP: ${phone}\nAlamat: ${addr}\nMetode: ${document.getElementById('coPay').value}\nKode Invoice: ${invoice}`
  );
  // Open WhatsApp (user can edit number later)
  window.open('https://wa.me/?text='+text,'_blank');
  cart = []; updateCart(); checkoutModal.close();
});

// Contact form fake submit
document.getElementById('contactForm').addEventListener('submit',(e)=>{
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  msg.textContent = 'Terima kasih! Pesan kamu sudah terkirim.';
  setTimeout(()=>msg.textContent='',3000);
});

// Theme toggle
document.getElementById('themeToggle').addEventListener('click',()=>{
  document.body.classList.toggle('light');
});
