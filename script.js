/* EJERCICIOS DESCONOCIDOS — PROPUESTA 02
   Una sola imagen de fondo por sección. Tres capas independientes
   se hacen transparentes para revelar distintas zonas de esa imagen.
*/
const modalContent = {
  exhibicion: {title:'EXHIBICIÓN',text:'El cine como lugar de encuentro. Espacio para la programación de muestras, proyecciones, circulación audiovisual y actividades con las comunidades.'},
  formacion: {title:'FORMACIÓN',text:'Experiencias pedagógicas, talleres y laboratorios de creación audiovisual. Aquí se incorporarán los programas y las actividades de formación.'},
  produccion: {title:'PRODUCCIÓN',text:'Historias, películas y procesos cinematográficos. Aquí se incorporarán las fichas de cada producción, fotografías y enlaces a los tráileres.'},
  servicios: {title:'OTROS SERVICIOS',text:'Espacio para describir los servicios reales de Ejercicios Desconocidos y presentar proyectos de colaboración.'}
};
const people = [
  {title:'JONAS RADZIUNAS',text:'Nacido en Yopal, Casanare. Estudió comunicación con énfasis audiovisual en la Pontificia Universidad Javeriana.'},
  {title:'JULIANA SARAY',text:'Bogotana, (1998). Es profesional en Estudios y Gestión Cultural de la Universidad EAN y productora audiovisual independiente.'},
  {title:'DANIEL TAMAYO',text:'Biografía pendiente. Es gestor cultural, curador, crítico de cine, director y comunicador social.'}
];
const dialog = document.getElementById('info-dialog');
const dialogTitle = document.getElementById('dialog-title');
const dialogDescription = document.getElementById('dialog-description');
function showInfo(info){dialogTitle.textContent=info.title;dialogDescription.textContent=info.text;dialog.showModal();}
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});

for(const section of document.querySelectorAll('.reveal-page')){
  const panels=[...section.querySelectorAll('.reveal-panel')];
  const defaultOpen=Number(section.dataset.defaultOpen);
  const setOpen=index=>panels.forEach((panel,i)=>{
    panel.classList.toggle('is-open',i===index);
    panel.setAttribute('aria-label',`${panel.querySelector('.panel-label').textContent}: ${i===index?'fotografía visible':'panel informativo'}. Haz clic para explorar.`);
  });
  setOpen(defaultOpen);
  panels.forEach((panel,index)=>{
    panel.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch')setOpen(index);});
    panel.addEventListener('focus',()=>setOpen(index));
    panel.addEventListener('click',event=>{
      if(window.matchMedia('(hover: none)').matches && !panel.classList.contains('is-open')){
        setOpen(index);return; // primer toque revela; segundo toque abre ficha
      }
      showInfo(modalContent[panel.dataset.modal]);
    });
  });
  section.querySelector('.reveal-columns').addEventListener('pointerleave',event=>{
    if(event.pointerType!=='touch')setOpen(defaultOpen);
  });
}
document.querySelectorAll('[data-modal]:not(.reveal-panel)').forEach(button=>{
  button.addEventListener('click',()=>showInfo(modalContent[button.dataset.modal]));
});
document.querySelectorAll('[data-person]').forEach(button=>{
  button.addEventListener('click',()=>showInfo(people[Number(button.dataset.person)]));
});
