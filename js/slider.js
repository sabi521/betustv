/* ==========================================================================
   Sliders — click prev/next to scroll a row of cards.

   Markup it looks for:

     <div class="slider">
       <button class="slider-prev">...</button>
       <button class="slider-next">...</button>

       <div class="slider-track ... overflow-x-auto">
         <article>card</article>
         <article>card</article>
       </div>
     </div>

   The track scrolls horizontally on its own (overflow-x-auto), so touch swipe
   already works with no JS. This file only makes the buttons do the same thing
   and greys them out at each end.

   The buttons can be anywhere inside .slider — the track does not have to be
   their sibling.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  var sliders = document.querySelectorAll(".slider");

  for (var i = 0; i < sliders.length; i++) {
    setupSlider(sliders[i]);
  }

  function setupSlider(slider) {
    var track = slider.querySelector(".slider-track");
    var prev = slider.querySelector(".slider-prev");
    var next = slider.querySelector(".slider-next");

    if (!track) return;

    // How far one click moves: 80% of what you can see, minimum 200px.
    function step() {
      return Math.max(200, track.clientWidth * 0.8);
    }

    // Grey out a button when there is nothing left to scroll that way.
    function updateButtons() {
      var maxScroll = track.scrollWidth - track.clientWidth - 1;
      if (prev) prev.disabled = track.scrollLeft <= 0;
      if (next) next.disabled = track.scrollLeft >= maxScroll;
    }

    if (prev) {
      prev.addEventListener("click", function () {
        track.scrollBy({ left: -step(), behavior: "smooth" });
      });
    }

    if (next) {
      next.addEventListener("click", function () {
        track.scrollBy({ left: step(), behavior: "smooth" });
      });
    }

    track.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);
    updateButtons();
  }
});
