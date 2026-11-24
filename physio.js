/**
 * PlaySafe Recovery Hub - Ask the Physio
 * js/physio.js
 *
 * Handles:
 * 1. Quick-question copy to clipboard with instant visual feedback.
 * 2. Monitoring Botpress webchat load state and displaying a friendly
 *    fallback message if the widget fails to load or the network is offline.
 */

(function () {
  'use strict';

  // Flag to ensure fallback UI is triggered only once
  var fallbackDisplayed = false;

  /**
   * Display the friendly fallback message banner if the chatbot fails
   */
  function showChatbotFallback() {
    if (fallbackDisplayed) return;
    fallbackDisplayed = true;

    var fallbackEl = document.getElementById('chatbot-fallback');
    if (fallbackEl) {
      fallbackEl.style.display = 'flex';
      // Ensure assistive tech announces the status update
      fallbackEl.setAttribute('aria-live', 'assertive');
    }
  }

  /**
   * Monitor error events during resource loading (catches script/css failures)
   */
  window.addEventListener(
    'error',
    function (event) {
      if (!event) return;
      var target = event.target;
      if (target && (target.tagName === 'SCRIPT' || target.tagName === 'LINK')) {
        var src = target.src || target.href || '';
        if (src.indexOf('botpress') !== -1 || src.indexOf('vdk-viber-runtime') !== -1) {
          console.warn('[PlaySafe Physio] Botpress resource failed to load:', src);
          showChatbotFallback();
        }
      }
    },
    true // Capture phase to intercept element errors
  );

  /**
   * Intercept unhandled promise rejections (catches Botpress fetch rejection)
   */
  window.addEventListener('unhandledrejection', function (event) {
    var reason = event.reason ? String(event.reason) : '';
    console.warn('[PlaySafe Physio] Caught unhandled rejection:', reason);
    if (
      reason.indexOf('botpress') !== -1 ||
      reason.indexOf('vdk-viber') !== -1 ||
      reason.indexOf('Failed to fetch') !== -1 ||
      reason.indexOf('NetworkError') !== -1 ||
      reason.indexOf('Load failed') !== -1
    ) {
      showChatbotFallback();
    }
  });

  /**
   * Timeout watchdog: Check if Botpress bubble or instance mounted within 7.5s
   */
  setTimeout(function () {
    if (fallbackDisplayed) return;

    var hasWidget = document.querySelector(
      '[class*="bp-"], [id*="bp-"], [class*="vdk-"], iframe[src*="botpress"], .bpw-widget-btn, [data-testid="chat-bubble"]'
    );

    // If neither window.VdkEdgeWebchat is mounted nor any widget element exists in DOM
    if (!hasWidget && typeof window.VdkEdgeWebchat === 'undefined') {
      console.warn('[PlaySafe Physio] Botpress mount timeout reached.');
      showChatbotFallback();
    }
  }, 7500);

  /**
   * Copy text to clipboard with legacy fallback
   */
  function copyTextToClipboard(text, onSuccess, onError) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(function () {
          onSuccess();
        })
        .catch(function () {
          fallbackClipboardCopy(text, onSuccess, onError);
        });
    } else {
      fallbackClipboardCopy(text, onSuccess, onError);
    }
  }

  /**
   * Legacy textarea execCommand copy fallback
   */
  function fallbackClipboardCopy(text, onSuccess, onError) {
    try {
      var textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '-9999px';
      textArea.style.opacity = '0';
      textArea.setAttribute('readonly', '');
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      var successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (successful) {
        onSuccess();
      } else if (onError) {
        onError();
      }
    } catch (err) {
      console.error('[PlaySafe Physio] Copy error:', err);
      if (onError) onError(err);
    }
  }

  /**
   * Initialize Quick-Question Copy Buttons
   */
  function initCopyButtons() {
    var copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var question = button.getAttribute('data-question') || '';
        if (!question) return;

        var textSpan = button.querySelector('.copy-btn-text');
        var originalText = textSpan ? textSpan.textContent : button.textContent;
        var originalHtml = button.innerHTML;

        // Perform clipboard copy
        copyTextToClipboard(
          question,
          function () {
            // Visual feedback: green styling and "Copied! ✓" label
            button.classList.add('copied');
            button.innerHTML =
              '<span aria-hidden="true" style="font-weight: 700;">✓</span> <span class="copy-btn-text">Copied!</span>';
            button.setAttribute('aria-label', 'Question copied to clipboard');

            // Revert after 2 seconds
            setTimeout(function () {
              button.classList.remove('copied');
              button.innerHTML = originalHtml;
              button.setAttribute('aria-label', "Copy '" + question + "' to clipboard");
            }, 2000);
          },
          function () {
            // Error visual indicator
            button.textContent = 'Press Ctrl+C';
            setTimeout(function () {
              button.innerHTML = originalHtml;
            }, 2000);
          }
        );
      });
    });
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCopyButtons);
  } else {
    initCopyButtons();
  }
})();
