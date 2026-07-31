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

  /* ---- Load more: reveal the next hidden batch, then drop the button ---- */
  var loadMores = document.querySelectorAll(".load-more");

  for (var m = 0; m < loadMores.length; m++) {
    setupLoadMore(loadMores[m]);
  }

  function setupLoadMore(section) {
    var button = section.querySelector(".load-more-button");
    if (!button) return;

    button.addEventListener("click", function () {
      var items = section.querySelectorAll(".load-more-item");
      for (var n = 0; n < items.length; n++) {
        items[n].classList.remove("md:hidden");
      }
      button.remove();
    });
  }

  /* ---- Show more: measure real text, clip to N lines, "Show More" inline -
     3 lines on mobile, 2 lines on desktop (md: 768px), per the Figma spec. */
  var showMoreDesktopQuery = window.matchMedia("(min-width: 768px)");
  var showMoreTexts = document.querySelectorAll(".show-more-text");

  for (var q = 0; q < showMoreTexts.length; q++) {
    setupShowMoreText(showMoreTexts[q]);
  }

  function setupShowMoreText(el) {
    var fullText = el.textContent.trim();

    var textSpan = document.createElement("span");
    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "show-more-toggle ml-1 whitespace-nowrap font-body font-bold text-inv-primary-text";
    toggle.textContent = "Show More";

    el.textContent = "";
    el.appendChild(textSpan);
    el.appendChild(toggle);

    var expanded = false;

    function fits(words) {
      textSpan.textContent = words.length === wordList.length ? fullText : words.join(" ") + "…";
      return el.scrollHeight <= maxHeight + 1;
    }

    var wordList = fullText.split(" ");
    var maxHeight = 0;

    function collapse() {
      var lines = showMoreDesktopQuery.matches ? 2 : 3;
      maxHeight = (parseFloat(getComputedStyle(el).lineHeight) || 24) * lines;
      textSpan.textContent = fullText;

      if (el.scrollHeight <= maxHeight + 1) {
        toggle.remove();
        return;
      }

      if (!toggle.parentNode) el.appendChild(toggle);

      var low = 0;
      var high = wordList.length;

      while (low < high) {
        var mid = Math.ceil((low + high) / 2);
        if (fits(wordList.slice(0, mid))) {
          low = mid;
        } else {
          high = mid - 1;
        }
      }

      textSpan.textContent = wordList.slice(0, low).join(" ") + "…";
      toggle.textContent = "Show More";
    }

    function expand() {
      textSpan.textContent = fullText;
      toggle.textContent = "Show Less";
    }

    toggle.addEventListener("click", function () {
      expanded = !expanded;
      if (expanded) {
        expand();
      } else {
        collapse();
      }
    });

    collapse();

    window.addEventListener("resize", function () {
      if (!expanded) collapse();
    });
  }

  /* ---- Share: dropdown with Facebook / X / Copy Link -------------------- */
  var shares = document.querySelectorAll(".share");

  for (var p = 0; p < shares.length; p++) {
    setupShare(shares[p]);
  }

  function setupShare(share) {
    var toggle = share.querySelector(".share-toggle");
    var menu = share.querySelector(".share-menu");
    if (!toggle || !menu) return;

    function close() {
      menu.classList.add("hidden");
      toggle.setAttribute("aria-expanded", "false");
    }

    function open() {
      menu.classList.remove("hidden");
      toggle.setAttribute("aria-expanded", "true");
    }

    toggle.addEventListener("click", function (event) {
      event.stopPropagation();
      if (menu.classList.contains("hidden")) {
        open();
      } else {
        close();
      }
    });

    document.addEventListener("click", function (event) {
      if (!share.contains(event.target)) close();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") close();
    });

    var facebookButton = share.querySelector(".share-facebook");
    if (facebookButton) {
      facebookButton.addEventListener("click", function () {
        var url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location.href);
        window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
        close();
      });
    }

    var xButton = share.querySelector(".share-x");
    if (xButton) {
      xButton.addEventListener("click", function () {
        var url = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(window.location.href);
        window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
        close();
      });
    }

    var copyButton = share.querySelector(".share-copy");
    if (copyButton) {
      copyButton.addEventListener("click", function () {
        var label = copyButton.querySelector("span:last-child");
        var original = label ? label.textContent : "";

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(window.location.href);
        }

        if (label) {
          label.textContent = "Link Copied!";
          setTimeout(function () {
            label.textContent = original;
          }, 1500);
        }

        close();
      });
    }
  }
});
