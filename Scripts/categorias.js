// AGREGANDO CLASE ACTIVE AL PRIMER ENLACE ====================
$('.categorias-list .category-item[category="all"]').addClass("ct-active");

// FILTRANDO PRODUCTOS  ============================================

$(".category-item").click(function () {
  let catProyect = $(this).attr("category");
  console.log(catProyect);

  // AGREGANDO CLASE ACTIVE AL ENLACE SELECCIONADO
  $(".category-item").removeClass("ct-active");
  $(this).addClass("ct-active");

  // OCULTANDO PRODUCTOS =========================
  $(".col-md-4").hide();

  // MOSTRANDO PRODUCTOS =========================
  $('.col-md-4[category="' + catProyect + '"]').show();
});

// MOSTRANDO TODOS LOS PRODUCTOS =======================

$('.category-item[category="all"]').click(function () {
  $(".col-md-4").show();
});
