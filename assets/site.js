const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.menu-text').textContent = open ? 'Close' : 'Menu';
  });
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelector('.menu-text').textContent = 'Menu';
    });
  });
}
const year = document.getElementById('year');
if(year) year.textContent = new Date().getFullYear();

// When the publicly readable Ghost RSS feed has been synchronized at build
// time, display real titles, dates and URLs; otherwise keep the HTML fallback.
(async()=>{
  const list=document.getElementById('post-list');
  if(!list) return;
  try {
    const response=await fetch('assets/posts.json',{cache:'no-store'});
    if(!response.ok) return;
    const posts=await response.json();
    if(!Array.isArray(posts)||posts.length===0) return;
    list.replaceChildren();
    for(const post of posts){
      if(!post.title||!post.url) continue;
      const a=document.createElement('a'); a.className='post-row'; a.href=post.url;
      a.target='_blank';a.rel='noopener noreferrer';
      const date=document.createElement('span');date.className='post-date';
      if(post.published_at){
        const d=new Date(post.published_at);
        date.textContent=Number.isNaN(d.valueOf())?'':new Intl.DateTimeFormat('en-US',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(d);
      }else{date.textContent='';}
      const title=document.createElement('span');title.className='post-name';title.textContent=post.title;
      const arrow=document.createElement('span');arrow.setAttribute('aria-hidden','true');arrow.textContent='↗';
      a.append(date,title,arrow); list.appendChild(a);
    }
  } catch(e){ /* static fallback remains */ }
})();


// Keep the site useful if the third-party contribution SVG is unavailable.
const contributionChart = document.getElementById('github-contribution-chart');
if (contributionChart) {
  const showContributionFallback = () => {
    const wrap = contributionChart.closest('.contribution-image-wrap');
    const fallback = document.getElementById('contribution-chart-fallback');
    if (wrap) wrap.hidden = true;
    if (fallback) fallback.hidden = false;
  };
  contributionChart.addEventListener('error', showContributionFallback);
  if (contributionChart.complete && contributionChart.naturalWidth === 0) {
    showContributionFallback();
  }
}
