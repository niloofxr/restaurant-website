const $ = (s) => document.querySelector(s);
let cart = JSON.parse(localStorage.getItem('orbital-cart') || '{}');
let ratings = JSON.parse(localStorage.getItem('orbital-ratings') || '{}');
let bookings = JSON.parse(localStorage.getItem('orbital-bookings') || '[]');
const money = n => `${n} GC`;

function renderMenu(){
  if(!$('#menuGrid')) return;
  $('#menuGrid').innerHTML = MENU.map(d => { const rating=ratings[d.id]||0; return `<article class="dish"><div class="dish-top"><div><h3>${d.name}</h3><p>${d.description}</p></div><span class="dish-price">${money(d.price)}</span></div><div class="dish-actions"><span class="dish-tag">${d.tag} · ${d.category}</span><div><div class="stars" aria-label="Rate ${d.name}">${[1,2,3,4,5].map(n=>`<button class="${n<=rating?'active':''}" data-dish="${d.id}" data-rate="${n}">★</button>`).join('')}</div><button class="add" type="button" data-add="${d.id}" onclick="addToTray('${d.id}')">+ Add to tray</button></div></div></article>`}).join('');
  document.querySelectorAll('[data-rate]').forEach(b=>b.onclick=()=>{ratings[b.dataset.dish]=+b.dataset.rate;localStorage.setItem('orbital-ratings',JSON.stringify(ratings));renderMenu();renderRating()});
}
function saveCart(){localStorage.setItem('orbital-cart',JSON.stringify(cart))}
function addToTray(dishId){
  const dish=MENU.find(item=>item.id===dishId);
  if(!dish) return;
  cart[dishId]=(cart[dishId]||0)+1;
  saveCart();
  renderCart();
  openTray();
  const trayItems=$('#cartItems');
  if(trayItems){
    const confirmation=document.createElement('p');
    confirmation.className='tray-confirmation';
    confirmation.textContent=`${dish.name} added to your tray · ${money(dish.price)}`;
    trayItems.prepend(confirmation);
  }
}
window.addToTray=addToTray;
function renderCart(){if(!$('#cartItems'))return;let items=Object.entries(cart).filter(([,q])=>q);let subtotal=items.reduce((s,[id,q])=>s+MENU.find(d=>d.id===id).price*q,0);$('#cartCount').textContent=items.reduce((s,[,q])=>s+q,0);let lines=items.map(([id,q])=>{let d=MENU.find(x=>x.id===id);return `<div class="cart-line"><div><h4>${d.name}</h4><span class="dish-price">${money(d.price*q)}</span></div><div class="qty"><button data-minus="${id}">−</button>${q}<button data-plus="${id}">+</button></div></div>`}).join('');if(subtotal>=50)lines+=`<div class="cart-line"><div><h4>Eclipse <small>(complimentary)</small></h4><span class="dish-price">FREE</span></div><span>✦</span></div>`;$('#cartItems').innerHTML=lines||'<p style="color:var(--muted)">Your tray is empty. Add a few strange and wonderful things.</p>';let discount=subtotal>80?subtotal*.1:0;$('#subtotal').textContent=money(subtotal);$('#discount').textContent=`− ${money(discount)}`;$('#total').textContent=money(subtotal-discount);$('#freebieStatus').textContent=subtotal>=50?'UNLOCKED':'LOCKED';document.querySelectorAll('[data-minus]').forEach(b=>b.onclick=()=>change(b.dataset.minus,-1));document.querySelectorAll('[data-plus]').forEach(b=>b.onclick=()=>change(b.dataset.plus,1))}
function change(id,n){cart[id]=(cart[id]||0)+n;if(cart[id]<=0)delete cart[id];saveCart();renderCart()}
function renderRating(){if(!$('#averageRating'))return;let vals=Object.values(ratings);let avg=(4.8*128+vals.reduce((a,b)=>a+b,0))/(128+vals.length);$('#averageRating').textContent=avg.toFixed(1);$('#homeStars').textContent='★★★★★';$('#ratingCount').textContent=`Based on ${128+vals.length} transmissions`}
function openTray(){ $('#tray').classList.add('open');$('#overlay').classList.add('show') } function closeTray(){ $('#tray').classList.remove('open');$('#overlay').classList.remove('show') }
if($('#cartTrigger'))$('#cartTrigger').onclick=openTray;if($('#closeTray'))$('#closeTray').onclick=closeTray;if($('#overlay'))$('#overlay').onclick=closeTray;if($('#checkout'))$('#checkout').onclick=()=>{if(Object.keys(cart).length){alert('Transmission received. The kitchen is preparing your orbit.');let score=prompt('How would you rate your experience on the Orbital website? Enter 1–5.');if(score)localStorage.setItem('orbital-site-rating',score);cart={};saveCart();renderCart();closeTray()}};
const times=['18:00','18:30','19:00','19:30','20:00','20:30','21:00'];if($('#bookingTime')){$('#bookingTime').innerHTML=times.map(t=>`<option value="${t}">${t}</option>`).join('');$('#bookingDate').min=new Date().toISOString().split('T')[0]}
const bookingForm=$('#bookingForm');if(bookingForm)bookingForm.onsubmit=e=>{e.preventDefault();let date=$('#bookingDate').value,time=$('#bookingTime').value,key=date+' '+time;if(bookings.includes(key)){ $('#bookingMessage').textContent='That window is already occupied. Please choose another.';return}bookings.push(key);localStorage.setItem('orbital-bookings',JSON.stringify(bookings));$('#bookingMessage').textContent=`Window secured for ${$('#guestName').value}. See you at ${time}.`;e.target.reset()};
const siteNav=document.querySelector('.site-header nav');
if(siteNav) siteNav.innerHTML='<a href="index.html">Home</a><a href="menu.html">Menu</a><a href="reservation.html">Book a Table</a>';
renderMenu();renderCart();renderRating();
