/* ==========================================================================
   Small UI bits: collapse the live chat, open/close accordions, dismiss the
   fixed mobile bars. Each one is a click handler and a "hidden" class toggle.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  /* ---- Live chat: header chevron hides the chat body -------------------- */
  var chats = document.querySelectorAll(".chat");

  for (var i = 0; i < chats.length; i++) {
    setupChat(chats[i]);
  }

  function setupChat(chat) {
    var button = chat.querySelector(".chat-toggle");
    var body = chat.querySelector(".chat-body");
    var icon = chat.querySelector(".chat-icon");

    if (!button || !body) return;

    button.addEventListener("click", function () {
      var collapsed = body.classList.toggle("hidden");
      if (icon) icon.classList.toggle("rotate-180", collapsed);
      button.setAttribute("aria-expanded", collapsed ? "false" : "true");
    });
  }

  /* ---- Accordions: click the row to show/hide its body ------------------ */
  var accordions = document.querySelectorAll(".accordion");

  for (var j = 0; j < accordions.length; j++) {
    setupAccordion(accordions[j]);
  }

  function setupAccordion(item) {
    var button = item.querySelector(".accordion-toggle");
    var body = item.querySelector(".accordion-body");
    var icon = item.querySelector(".accordion-icon");

    if (!button || !body) return;

    button.addEventListener("click", function () {
      var open = !body.classList.toggle("hidden");
      if (icon) icon.classList.toggle("rotate-180", open);
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---- Close buttons: remove the closest .closable bar ------------------ */
  var closeButtons = document.querySelectorAll(".close-button");

  for (var k = 0; k < closeButtons.length; k++) {
    closeButtons[k].addEventListener("click", function () {
      var bar = this.closest(".closable");
      if (bar) bar.remove();
    });
  }
});
