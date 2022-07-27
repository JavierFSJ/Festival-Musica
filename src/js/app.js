document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  navegacionFija();
  crearGaleria();
  scrollNav();
}

function navegacionFija(){
  const barra = document.querySelector('.header');
  const sobreFestival = document.querySelector('.sobre-festival');

  const body = document.querySelector('body');

  window.addEventListener('scroll' , function(){
    /* Ya pasamos el elemento */
    if( sobreFestival.getBoundingClientRect().bottom <0 ){
      barra.classList.add('fijo');
      body.classList.add('body-scroll');
      
    }
    else{
      barra.classList.remove('fijo');
      body.classList.remove('body-scroll');
    }

  });
}

function scrollNav() {
  const enlaces = document.querySelectorAll(".navegacion-principal a");
  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault();
      const seccionScroll = e.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);
      seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("picture");
    imagen.innerHTML = `
        <source
        sizes="1920w, 1280w, 640w"
        srcset="
          build/img/thumb/${i}.avif,
          build/img/thumb/${i}-1280.avif 1280w,
          build/img/thumb/${i}-640.avif   640w
        "
        type="image/avif"
      />
      <source
        sizes="1920w, 1280w, 640w"
        srcset="
          build/img/thumb/${i}.webp,
          build/img/thumb/${i}-1280.webp 1280w,
          build/img/thumb/${i}-640.webp   640w
        "
        type="image/webp"
      />
      <source
        sizes="1920w, 1280w, 640w"
        srcset="
          build/img/thumb/${i}.jpg,
          build/img/thumb/${i}-1280.jpg 1280w,
          build/img/thumb/${i}-640.jpg   640w
        "
        type="image/jpeg"
      />
      <img
        loading="lazy"
        decoding="async"
        src="build/img/thumb/${i}.jpg"
        lazyalt="imagen"
        width="200"
        height="300"
        alt="imagen galeria"
      />
    `;

    imagen.onclick = function () {
      mostrarImagen(i);
    };
    galeria.append(imagen);
  }
}

function mostrarImagen(id) {
  const imagen = document.createElement("picture");

  imagen.innerHTML = `
    <source
    sizes="1920w, 1280w, 640w"
    srcset="
      build/img/grande/${id}.avif,
      build/img/grande/${id}-1280.avif 1280w,
      build/img/grande/${id}-640.avif   640w
    "
    type="image/avif"
  />
  <source
    sizes="1920w, 1280w, 640w"
    srcset="
      build/img/grande/${id}.webp,
      build/img/grande/${id}-1280.webp 1280w,
      build/img/grande/${id}-640.webp   640w
    "
    type="image/webp"
  />
  <source
    sizes="1920w, 1280w, 640w"
    srcset="
      build/img/grande/${id}.jpg,
      build/img/grande/${id}-1280.jpg 1280w,
      build/img/grande/${id}-640.jpg   640w
    "
    type="image/jpeg"
  />
  <img
    loading="lazy"
    decoding="async"
    src="build/img/grande/${id}.jpg"
    lazyalt="imagen"
    width="200"
    height="300"
    alt="imagen galeria"
  />
  `;

  //Crear overlay
  const overlay = document.createElement("div");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");

  overlay.onclick = function () {
    overlay.remove();
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
  };

  //Boton
  const cerrarModal = document.createElement("p");
  cerrarModal.textContent = "x";
  cerrarModal.classList.add("btn-cerrar");
  cerrarModal.onclick = function () {
    overlay.remove();
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
  };

  overlay.appendChild(cerrarModal);

  //Añadir
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fijar-body");
}
