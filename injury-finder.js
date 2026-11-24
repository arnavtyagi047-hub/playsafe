/**
 * PlaySafe Recovery Hub - Injury Finder Page Controller
 * Connects 3D Body Engine (Three.js), Anatomical Knowledge Base (BODY_PARTS_DATA),
 * Interactive Info Panel, Mobile Bottom Sheet, and 2D Region Fallback.
 */

(function () {
  'use strict';

  // Global selection variable as requested
  window.selectedRegion = null;

  let bodyEngine = null;

  document.addEventListener('DOMContentLoaded', initInjuryFinder);

  function initInjuryFinder() {
    // Check if Three.js & OrbitControls are loaded
    if (typeof THREE === 'undefined' || typeof THREE.OrbitControls === 'undefined') {
      console.warn('Three.js or OrbitControls not detected. Activating 2D selector mode.');
      activate2DFallbackOnly();
      return;
    }

    // Initialize 3D Engine
    setup3DEngine();

    // Setup UI Controls (Gender, Camera Views, Rotation Toggle, 2D Selector)
    setupControlButtons();

    // Setup Info Card & Sheet Handlers
    setupInfoCardHandlers();

    // Setup 2D Fallback Modal/Drawer
    setup2DFallbackSelector();
  }

  function setup3DEngine() {
    const tooltipEl = document.getElementById('hover-tooltip');

    bodyEngine = new Body3DEngine('canvas-container', {
      onSelect: function (selection) {
        handleRegionSelected(selection.regionId, selection.isBack);
      },
      onHover: function (hoverData) {
        if (!tooltipEl) return;

        if (hoverData) {
          const part = resolveBodyPart(hoverData.regionId, hoverData.isBack);
          if (part) {
            tooltipEl.textContent = part.name;
            tooltipEl.style.left = `${hoverData.screenX}px`;
            tooltipEl.style.top = `${hoverData.screenY}px`;
            tooltipEl.style.display = 'block';
            return;
          }
        }
        tooltipEl.style.display = 'none';
      }
    });
  }

  function setupControlButtons() {
    // 1. Gender Toggle (Male / Female)
    const btnMale = document.getElementById('btn-gender-male');
    const btnFemale = document.getElementById('btn-gender-female');

    if (btnMale && btnFemale) {
      btnMale.addEventListener('click', function () {
        btnMale.classList.add('active');
        btnFemale.classList.remove('active');
        btnMale.setAttribute('aria-pressed', 'true');
        btnFemale.setAttribute('aria-pressed', 'false');
        if (bodyEngine) bodyEngine.setGender('male');
      });

      btnFemale.addEventListener('click', function () {
        btnFemale.classList.add('active');
        btnMale.classList.remove('active');
        btnFemale.setAttribute('aria-pressed', 'true');
        btnMale.setAttribute('aria-pressed', 'false');
        if (bodyEngine) bodyEngine.setGender('female');
      });
    }

    // 2. Camera View Angle Presets (Front, Back, Left, Right)
    const viewButtons = document.querySelectorAll('.btn-view-preset');
    viewButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        viewButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const view = btn.getAttribute('data-view');
        if (bodyEngine) bodyEngine.setCameraPreset(view);
      });
    });

    // 3. Play / Pause Rotation Toggle
    const btnRotate = document.getElementById('btn-toggle-rotate');
    if (btnRotate) {
      btnRotate.addEventListener('click', function () {
        if (!bodyEngine) return;
        const isRotating = bodyEngine.toggleAutoRotate();
        const icon = btnRotate.querySelector('.control-icon');
        const text = btnRotate.querySelector('.control-text');

        if (isRotating) {
          btnRotate.classList.remove('paused');
          if (icon) icon.textContent = '⏸';
          if (text) text.textContent = 'Pause';
          btnRotate.setAttribute('aria-label', 'Pause 360 rotation');
        } else {
          btnRotate.classList.add('paused');
          if (icon) icon.textContent = '▶';
          if (text) text.textContent = 'Rotate';
          btnRotate.setAttribute('aria-label', 'Resume 360 rotation');
        }
      });
    }

    // 4. 2D List Fallback Toggle
    const btnOpen2D = document.getElementById('btn-open-2d');
    const modal2D = document.getElementById('modal-2d-selector');
    const btnClose2D = document.getElementById('btn-close-2d');

    if (btnOpen2D && modal2D) {
      btnOpen2D.addEventListener('click', function () {
        modal2D.classList.add('is-open');
        modal2D.setAttribute('aria-hidden', 'false');
      });
    }
    if (btnClose2D && modal2D) {
      btnClose2D.addEventListener('click', function () {
        modal2D.classList.remove('is-open');
        modal2D.setAttribute('aria-hidden', 'true');
      });
    }
  }

  /**
   * Called when a body region is tapped in 3D or clicked in 2D list
   */
  function handleRegionSelected(regionId, isBack = false) {
    const part = resolveBodyPart(regionId, isBack);
    if (!part) return;

    renderInfoCard(part, isBack);

    // Open bottom sheet if on mobile viewport
    if (window.innerWidth < 1025) {
      openMobileBottomSheet();
    }
  }

  /**
   * Renders anatomical and sports injury data into the Info Panel / Card
   */
  function renderInfoCard(part, isBack) {
    const container = document.getElementById('info-card-content');
    if (!container) return;

    const orientationBadge = isBack
      ? '<span class="part-badge badge-posterior">Back / Posterior View</span>'
      : '<span class="part-badge badge-anterior">Front / Anterior View</span>';

    const musclesListHtml = (part.mainMuscles || [])
      .map((m) => `<li class="muscle-item"><span class="bullet-dot"></span>${escapeHtml(m)}</li>`)
      .join('');

    const injuriesListHtml = (part.commonSportsInjuries || [])
      .map((inj) => `<li class="injury-item"><span class="injury-icon">⚠️</span><span>${escapeHtml(inj)}</span></li>`)
      .join('');

    container.innerHTML = `
      <div class="active-region-card">
        <header class="region-header">
          ${orientationBadge}
          <h2 class="region-name">${escapeHtml(part.name)}</h2>
          <div class="region-meta-item">
            <span class="meta-label">Bones &amp; Joints:</span>
            <span class="meta-value">${escapeHtml(part.bonesOrJoint)}</span>
          </div>
          <div class="region-meta-item">
            <span class="meta-label">Main Nerve:</span>
            <span class="meta-value nerve-highlight">⚡ ${escapeHtml(part.mainNerve)}</span>
          </div>
        </header>

        <section class="region-detail-section">
          <h3 class="detail-title">Key Muscles Involved</h3>
          <ul class="muscles-list">
            ${musclesListHtml}
          </ul>
        </section>

        <section class="region-detail-section">
          <h3 class="detail-title">Common Sports Injuries</h3>
          <ul class="injuries-list">
            ${injuriesListHtml}
          </ul>
        </section>

        <div id="selection-feedback" class="selection-feedback" style="display: none;"></div>

        <div class="card-action-buttons">
          <button id="btn-use-spot" class="btn btn-primary btn-block">
            <span>Use this spot</span>
            <span aria-hidden="true">✓</span>
          </button>
          <button id="btn-choose-again" class="btn btn-outline btn-block">
            <span>Choose again</span>
            <span aria-hidden="true">↺</span>
          </button>
        </div>
      </div>
    `;

    // Wire up "Use this spot" and "Choose again" buttons
    const btnUseSpot = document.getElementById('btn-use-spot');
    const btnChooseAgain = document.getElementById('btn-choose-again');

    if (btnUseSpot) {
      btnUseSpot.addEventListener('click', function () {
        handleUseSpot(part);
      });
    }

    if (btnChooseAgain) {
      btnChooseAgain.addEventListener('click', function () {
        handleChooseAgain();
      });
    }
  }

  /**
   * "Use this spot" saves region ID in variable selectedRegion,
   * stores to window.sessionStorage, and starts the step-by-step questionnaire.
   */
  function handleUseSpot(part) {
    // 1. Save in variable selectedRegion
    window.selectedRegion = part.id;

    // 2. Save in window.sessionStorage as selectedRegion
    try {
      window.sessionStorage.setItem('selectedRegion', JSON.stringify({
        id: part.id,
        name: part.name,
        bonesOrJoint: part.bonesOrJoint,
        mainNerve: part.mainNerve,
        timestamp: new Date().toISOString()
      }));
    } catch (e) {
      console.warn('SessionStorage unavailable:', e);
    }

    // 3. Close mobile bottom sheet if open
    closeMobileBottomSheet();

    // 4. Transition to Questionnaire on the same page (no reload)
    if (typeof window.startQuestionnaire === 'function') {
      window.startQuestionnaire(part);
    } else {
      // Fallback display
      const feedbackEl = document.getElementById('selection-feedback');
      if (feedbackEl) {
        feedbackEl.style.display = 'block';
        feedbackEl.innerHTML = `
          <div class="feedback-box success">
            <div class="feedback-title">✓ Spot Saved: ${escapeHtml(part.name)}</div>
            <p class="feedback-text">
              Your injured region is selected. You can now consult the interactive triage or start symptom checks.
            </p>
            <a href="ask-physio.html" class="btn btn-secondary btn-block" style="margin-top: 0.75rem;">
              <span>Proceed to Ask the Physio</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        `;
        feedbackEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }

  /**
   * "Choose again" clears pin, un-highlights 3D mesh, resets panel to hint
   */
  function handleChooseAgain() {
    window.selectedRegion = null;

    if (bodyEngine) {
      bodyEngine.clearSelection();
    }

    resetInfoCardToHint();

    if (window.innerWidth < 1025) {
      closeMobileBottomSheet();
    }
  }

  function resetInfoCardToHint() {
    const container = document.getElementById('info-card-content');
    if (!container) return;

    container.innerHTML = `
      <div class="info-card-hint">
        <div class="hint-icon" aria-hidden="true">🎯</div>
        <h2 class="hint-title">Identify Your Injury Spot</h2>
        <p class="hint-text">
          Tap or click anywhere on the 3D body to pinpoint where it hurts.
        </p>
        <div class="hint-tips">
          <div class="hint-tip-row">
            <span class="tip-symbol">🖱️</span>
            <span><strong>Rotate:</strong> Drag mouse or swipe with one finger</span>
          </div>
          <div class="hint-tip-row">
            <span class="tip-symbol">🔍</span>
            <span><strong>Zoom:</strong> Mouse wheel or two-finger pinch</span>
          </div>
          <div class="hint-tip-row">
            <span class="tip-symbol">🔄</span>
            <span><strong>Views:</strong> Use the angle buttons below the body</span>
          </div>
        </div>
      </div>
    `;
  }

  function setupInfoCardHandlers() {
    const sheetCloseBtn = document.getElementById('sheet-close-btn');
    const sheetBackdrop = document.getElementById('sheet-backdrop');

    if (sheetCloseBtn) {
      sheetCloseBtn.addEventListener('click', closeMobileBottomSheet);
    }
    if (sheetBackdrop) {
      sheetBackdrop.addEventListener('click', closeMobileBottomSheet);
    }
  }

  function openMobileBottomSheet() {
    const panel = document.getElementById('info-panel');
    const backdrop = document.getElementById('sheet-backdrop');
    if (panel) {
      panel.classList.add('sheet-open');
    }
    if (backdrop) {
      backdrop.classList.add('is-visible');
    }
  }

  function closeMobileBottomSheet() {
    const panel = document.getElementById('info-panel');
    const backdrop = document.getElementById('sheet-backdrop');
    if (panel) {
      panel.classList.remove('sheet-open');
    }
    if (backdrop) {
      backdrop.classList.remove('is-visible');
    }
  }

  /**
   * 2D Region List Fallback for accessibility and non-WebGL environments
   */
  function setup2DFallbackSelector() {
    const listContainer = document.getElementById('list-2d-items');
    if (!listContainer || typeof BODY_PARTS_DATA === 'undefined') return;

    let itemsHtml = '';
    const sortedKeys = Object.keys(BODY_PARTS_DATA);

    sortedKeys.forEach(function (key) {
      const part = BODY_PARTS_DATA[key];
      itemsHtml += `
        <button type="button" class="fallback-region-btn" data-region-id="${part.id}">
          <span class="fallback-region-name">${escapeHtml(part.name)}</span>
          <span class="fallback-region-sub">${escapeHtml(part.bonesOrJoint)}</span>
        </button>
      `;
    });

    listContainer.innerHTML = itemsHtml;

    // Attach click listeners to 2D list items
    const buttons = listContainer.querySelectorAll('.fallback-region-btn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const regionId = btn.getAttribute('data-region-id');
        const modal2D = document.getElementById('modal-2d-selector');
        if (modal2D) {
          modal2D.classList.remove('is-open');
          modal2D.setAttribute('aria-hidden', 'true');
        }

        // Check if isBack
        const isBack = regionId.includes('_back') || regionId.includes('calf') || regionId.includes('hamstring');
        handleRegionSelected(regionId, isBack);

        // Adjust 3D camera if back
        if (bodyEngine) {
          if (isBack) {
            bodyEngine.setCameraPreset('back');
          } else {
            bodyEngine.setCameraPreset('front');
          }
        }
      });
    });
  }

  function activate2DFallbackOnly() {
    const container = document.getElementById('canvas-container');
    if (container) {
      container.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: var(--color-text-muted);">
          <h3>2D Selection Mode</h3>
          <p>3D WebGL renderer is unavailable. Please select your injury region using the 2D list below.</p>
          <button id="btn-open-2d-direct" class="btn btn-primary" style="margin-top: 1rem;">Browse Body Regions</button>
        </div>
      `;
      const btnDirect = document.getElementById('btn-open-2d-direct');
      if (btnDirect) {
        btnDirect.addEventListener('click', function () {
          const modal = document.getElementById('modal-2d-selector');
          if (modal) modal.classList.add('is-open');
        });
      }
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
})();
