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
  {title:'JONAS RADZIUNAS',text:'Nacido en Yopal, Casanare. Estudió comunicación con énfasis audiovisual en la Pontificia Universidad Javeriana. Actualmente es consejero de cinematografía en Casanare y cofundador de la corporación de cine Ejercicios Desconocidos. Sus cortometrajes reflejan su interés por el cine posnarrativo, el inconsciente y los imaginarios culturales. Sus obras han sido seleccionadas y premiadas en países cómo Colombia, Alemania, Argentina, España, México. Ha sido tallerista de escritura creativa en espacios como la Cinemateca, MinTic, O1ab; además fue jurado de festivales como Bogoshorts, Moriche de oro y Ficuc. Es director de Cartografías Sensoriales, una muestra de cine colombiano y latinoamericano en Yopal, Casanare. Ha sido seleccionado como curador, programador y gestor cultural en espacios como Locarno Academy, Nodo Sur, Encuentros Dacmi y Cinemateca de Bogotá.
'},
  {title:'JULIANA SARAY',text:'Bogotana, (1998). Es profesional en Estudios y Gestión Cultural de la Universidad EAN y productora audiovisual independiente. Actualmente vive entre Colombia y Argentina, pues cursa su segunda carrera en Diseño de Imagen y Sonido en la Universidad Nacional de Buenos Aires. 

Tiene siete años de experiencia en producción y producción ejecutiva audiovisual. Es cofundadora y productora del colectivo de creación cinematográfica Ejercicios Desconocidos. Cuenta con dos cortometrajes estrenados, ‘Intentos por dejarse caer dentro’ (2021) y ‘Cuando la llanura encuentra el piedemonte’ (2023), —obra ganadora del estímulo Relatos Regionales FDC 2020—, ambos del director Jonas Radžiūnas. Es coproductora del largometraje, ‘El Vaquero’ (2024) de la directora australiana Emma Rozanski.

En el presente, lleva la producción del cortometraje ‘La digresión del ahora’ que se encuentra en fase de posproducción y es una obra beneficiaria del estímulo Relatos Regionales del FDC (2023), y es la productora del largometraje ‘Fragmentos de un cauce herido’ que se encuentra en fase de desarrollo; ambas obras de escritas y dirigidas por Jonas Radžiūnas. Además es también productora general del cortometraje ‘La tonada del Alcaraván’ que se encuentra en fase de distribución, y es escrito y dirigido por Alejandro Rebolledo. 
'},
  {title:'DANIEL TAMAYO',text:'Es gestor cultural, curador, crítico de cine, director y comunicador social. Fue seleccionado en el Talents Buenos Aires (2023), participó del Encuentro Nacional de Crítica (2024) y del Encuentro Nacional de Circulación (2026) y ejerció como jurado en el BIFF (2024), FICCALI (2024) y el Festival Lima Alterna (2025). Trabaja con la Corporación Ejercicios Desconocidos (Yopal, Casanare) en creación, exhibición y formación en cine y audiovisuales. Ha publicado sus textos en espacios como Canaguaro, revista de cine colombiano, Desistfilm, Bogoshorts Magazine, Oropel y Estudios artísticos. Fue productor de “Intentos por dejarse caer dentro” (2021), dirigió “En escucha de aves” (2024), “Coro de un dolor” (2025) y "Pasillo (una danza de opuestos)" (2025) y es el montajista del corto “La digresión del ahora” (en postproducción). Actualmente trabaja en su primer largometraje, un documental de música. Desde estos diferentes frentes busca explorar y desarrollar las potencias del cine y el audiovisual en relación con la existencia humana y no humana, intentando encontrar un mejor vivir.
.'}
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
