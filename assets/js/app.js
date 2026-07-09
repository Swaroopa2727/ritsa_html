
// ---- Responsive panel toggling ----
const rail = document.getElementById('rail');
const mastersPanel = document.getElementById('mastersPanel');
const backdrop = document.getElementById('backdrop');
const panelTitle = document.getElementById('panelTitle');
const isMobile = () => window.innerWidth < 992;
const isTablet = () => window.innerWidth < 1200;

function openMastersOnly(){
  mastersPanel.classList.add('show');
  backdrop.classList.add('show');
}
function closeAll(){
  mastersPanel.classList.remove('show');
  rail.classList.remove('show');
  backdrop.classList.remove('show');
}

document.getElementById('mobileToggleBtn').addEventListener('click', ()=>{
  rail.classList.add('show');
  mastersPanel.classList.add('show');
  backdrop.classList.add('show');
});
document.getElementById('railToggleBtn').addEventListener('click', ()=>{
  if(isTablet()){
    mastersPanel.classList.toggle('show');
    backdrop.classList.toggle('show', mastersPanel.classList.contains('show'));
  }
});
document.getElementById('mastersCloseBtn').addEventListener('click', closeAll);
backdrop.addEventListener('click', closeAll);

// ---- Masters submenu toggling ----
document.querySelectorAll('.master-item > .m-row').forEach(row=>{
  row.addEventListener('click', ()=>{
    const item = row.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.master-item.open').forEach(el=>el.classList.remove('open'));
    if(!wasOpen){
      item.classList.add('open');
    }
  });
});
document.querySelectorAll('.m-sub li').forEach(sub=>{
  sub.addEventListener('click', (e)=>{
    e.stopPropagation();
    document.querySelectorAll('.m-sub li.active-sub').forEach(el=>el.classList.remove('active-sub'));
    sub.classList.add('active-sub');
  });
});

const userMenuBtn = document.getElementById('userMenuBtn');
if(userMenuBtn){
  userMenuBtn.addEventListener('click', (e)=>{
    e.stopPropagation();
    userMenuBtn.classList.toggle('open');
  });
  document.addEventListener('click', ()=>{
    userMenuBtn.classList.remove('open');
  });
}

function showMenuList(menuName){
  document.querySelectorAll('.masters-list').forEach(list=>{
    list.style.display = list.getAttribute('data-menu') === menuName ? 'block' : 'none';
  });
  if(panelTitle){
    panelTitle.textContent = menuName;
  }
}

// function hideMenuList(){
//   document.querySelectorAll('.masters-list').forEach(list=>{
//     list.style.display = 'none';
//   });
//   if(panelTitle){
//     panelTitle.textContent = 'Menu';
//   }
// }

document.querySelectorAll('.rail-link').forEach(link=>{
  link.addEventListener('click', ()=>{
    const menuName = link.getAttribute('data-menu');
    const isAlreadyActive = link.classList.contains('active');

    document.querySelectorAll('.rail-link').forEach(l=>l.classList.remove('active'));

    if(!isAlreadyActive && menuName){
      link.classList.add('active');
      showMenuList(menuName);
      if(isTablet()){
        mastersPanel.classList.add('show');
        backdrop.classList.add('show');
      }
    } 
  });
});

// init state on load based on width
function initLayout(){
  if(isTablet()){
    mastersPanel.classList.remove('show');
    rail.classList.remove('show');
  } else {
    mastersPanel.classList.add('show');
  }
  backdrop.classList.remove('show');
  showMenuList('Dashboard');
}
window.addEventListener('resize', initLayout);
initLayout();

// ---- Charts ----
// Charts are rendered with native HTML/CSS in the markup so they remain visible without external libraries.
