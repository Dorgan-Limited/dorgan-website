(function(){
  var btn=document.querySelector('.menu-btn'),nav=document.getElementById('nav');
  if(!btn||!nav)return;
  var behind=[document.getElementById('main'),document.querySelector('.ftr'),document.querySelector('.sticky-cta'),document.querySelector('.skip')];
  var desktop=window.matchMedia('(min-width:960px)');
  function setOpen(open,returnFocus){
    document.body.classList.toggle('menu-open',open);
    btn.setAttribute('aria-expanded',open);
    btn.setAttribute('aria-label',open?'Close menu':'Open menu');
    behind.forEach(function(el){if(el)el.inert=open;});
    if(open){var first=nav.querySelector('a');if(first)first.focus();}
    else if(returnFocus)btn.focus();
  }
  btn.addEventListener('click',function(){setOpen(!document.body.classList.contains('menu-open'),true);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&document.body.classList.contains('menu-open'))setOpen(false,true);});
  desktop.addEventListener('change',function(e){if(e.matches)setOpen(false,false);});
})();
(function(){
  var form=document.querySelector('form[name="contact"]');if(!form)return;
  var rules=[
    {el:form.querySelector('#f-name'),msg:function(v){return v?'':'Please enter your name.';}},
    {el:form.querySelector('#f-email'),msg:function(v){if(!v)return'Please enter your email address.';return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)?'':'Please enter a valid email address, like name@company.co.uk.';}},
    {el:form.querySelector('#f-msg'),msg:function(v){return v?'':'Please tell us briefly what you would like help with.';}}
  ];
  function check(r){var m=r.msg(r.el.value.trim()),e=document.getElementById(r.el.id+'-err');e.textContent=m;e.hidden=!m;if(m)r.el.setAttribute('aria-invalid','true');else r.el.removeAttribute('aria-invalid');return !m;}
  form.addEventListener('submit',function(ev){var first=null;rules.forEach(function(r){if(!check(r)&&!first)first=r.el;});if(first){ev.preventDefault();first.focus();}});
  rules.forEach(function(r){r.el.addEventListener('blur',function(){if(r.el.hasAttribute('aria-invalid'))check(r);});r.el.addEventListener('input',function(){if(r.el.hasAttribute('aria-invalid'))check(r);});});
})();
