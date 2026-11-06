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
