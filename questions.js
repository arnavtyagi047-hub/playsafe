/**
 * PlaySafe Recovery Hub - Step-by-Step Questionnaire Engine (questions.js)
 * Manages:
 * - 3-step triage questionnaire + Review screen
 * - Live validation for Back/Next navigation
 * - Dynamic 1-10 pain slider with green/orange/red thresholds
 * - Red-flag clinical safety alert detection
 * - State synchronization in window.injuryData and window.sessionStorage
 */

(function () {
  'use strict';

  // Global injuryData object as required
  window.injuryData = {
    region: null,             // Selected body region details
    howItHappened: null,      // Step 1 option string
    otherDescription: '',     // Step 1 other text
    painLevel: 5,             // Step 2 slider (1 to 10)
    whenHappened: '',         // Step 2 timing dropdown
    symptoms: [],             // Step 2 checked symptoms array
    sport: '',                // Step 3 sport dropdown
    sportOther: '',           // Step 3 text if sport is Other (max 40 chars)
    injuredBefore: null,      // Step 3 Yes/No string
    ageGroup: ''              // Step 3 age group dropdown
  };

  let currentStep = 1;
  const totalSteps = 3;

  document.addEventListener('DOMContentLoaded', initQuestionnaire);

  function initQuestionnaire() {
    setupStep1Handlers();
    setupStep2Handlers();
    setupStep3Handlers();
    setupActionBarHandlers();
    setupSummaryBarHandlers();
    setupReviewScreenHandlers();
  }

  /**
   * Called to launch the questionnaire for a selected body part
   */
  window.startQuestionnaire = function (regionDetails) {
    if (regionDetails) {
      window.injuryData.region = regionDetails;
    } else {
      // Fallback check from sessionStorage
      try {
        const stored = sessionStorage.getItem('selectedRegion');
        if (stored) {
          window.injuryData.region = JSON.parse(stored);
        }
      } catch (e) {
        console.warn('SessionStorage parse error:', e);
      }
    }

    // Default label if missing
    if (!window.injuryData.region) {
      window.injuryData.region = { id: 'generic_spot', name: 'Selected Spot' };
    }

    // Update body part summary text at the top
    updateSummaryBarText();

    // Hide 3D body viewer and show questionnaire card
    const bodySection = document.getElementById('body-view-section');
    const qSection = document.getElementById('questionnaire-section');

    if (bodySection) bodySection.style.display = 'none';
    if (qSection) {
      qSection.classList.add('is-active');
      qSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Switch to step 1
    goToStep(1);
    saveData();
  };

  /**
   * Update header banner showing selected body region
   */
  function updateSummaryBarText() {
    const summaryEl = document.getElementById('summary-part-name');
    if (summaryEl && window.injuryData.region) {
      summaryEl.textContent = window.injuryData.region.name || 'Selected Spot';
    }
  }

  /**
   * Step 1: Mechanism ("How did it happen?")
   */
  function setupStep1Handlers() {
    const optionCards = document.querySelectorAll('.mechanism-option');
    const otherWrapper = document.getElementById('other-textbox-wrapper');
    const otherTextarea = document.getElementById('other-description');
    const charCounter = document.getElementById('char-count');

    optionCards.forEach(function (card) {
      card.addEventListener('click', function () {
        optionCards.forEach((c) => c.classList.remove('is-selected'));
        card.classList.add('is-selected');

        const val = card.getAttribute('data-value');
        window.injuryData.howItHappened = val;

        if (val === 'Other') {
          if (otherWrapper) otherWrapper.classList.add('is-visible');
          if (otherTextarea) otherTextarea.focus();
        } else {
          if (otherWrapper) otherWrapper.classList.remove('is-visible');
          window.injuryData.otherDescription = '';
        }

        validateCurrentStep();
        saveData();
      });
    });

    if (otherTextarea) {
      otherTextarea.addEventListener('input', function () {
        const text = otherTextarea.value;
        window.injuryData.otherDescription = text;

        if (charCounter) {
          charCounter.textContent = `${text.length} / 500 characters`;
        }

        validateCurrentStep();
        saveData();
      });
    }
  }

  /**
   * Step 2: Symptoms & Pain Slider
   */
  function setupStep2Handlers() {
    const painSlider = document.getElementById('pain-range');
    const painNumberBadge = document.getElementById('pain-number-badge');
    const painDescLabel = document.getElementById('pain-desc-label');
    const whenSelect = document.getElementById('when-happened-select');
    const symptomCards = document.querySelectorAll('.symptom-checkbox-card');

    // Pain Slider updates
    if (painSlider) {
      painSlider.addEventListener('input', function () {
        const val = parseInt(painSlider.value, 10);
        window.injuryData.painLevel = val;

        if (painNumberBadge) {
          painNumberBadge.textContent = val;
          // Color changes: green (1-3), orange (4-7), red (8-10)
          if (val <= 3) {
            painNumberBadge.style.backgroundColor = '#10b981'; // Green
            if (painDescLabel) painDescLabel.textContent = 'Mild Discomfort';
          } else if (val <= 7) {
            painNumberBadge.style.backgroundColor = '#f59e0b'; // Orange
            if (painDescLabel) painDescLabel.textContent = 'Moderate Pain';
          } else {
            painNumberBadge.style.backgroundColor = '#dc2626'; // Red
            if (painDescLabel) painDescLabel.textContent = 'Severe / Intense Pain';
          }
        }

        checkRedFlags();
        validateCurrentStep();
        saveData();
      });
    }

    // "When did it happen?" dropdown
    if (whenSelect) {
      whenSelect.addEventListener('change', function () {
        window.injuryData.whenHappened = whenSelect.value;
        validateCurrentStep();
        saveData();
      });
    }

    // Checkbox cards
    symptomCards.forEach(function (card) {
      card.addEventListener('click', function () {
        card.classList.toggle('is-checked');
        const symptomName = card.getAttribute('data-symptom');

        if (card.classList.contains('is-checked')) {
          if (!window.injuryData.symptoms.includes(symptomName)) {
            window.injuryData.symptoms.push(symptomName);
          }
        } else {
          window.injuryData.symptoms = window.injuryData.symptoms.filter((s) => s !== symptomName);
        }

        checkRedFlags();
        validateCurrentStep();
        saveData();
      });
    });
  }

  /**
   * Red-Flag Clinical Safety Check
   */
  function checkRedFlags() {
    const redFlagBox = document.getElementById('step2-red-flag');
    if (!redFlagBox) return;

    const hasHighPain = window.injuryData.painLevel >= 8;
    const hasWeightBearing = window.injuryData.symptoms.some((s) => s.toLowerCase().includes('weight'));
    const hasNumbness = window.injuryData.symptoms.some((s) => s.toLowerCase().includes('numbness'));
    const hasDeformity = window.injuryData.symptoms.some((s) => s.toLowerCase().includes('deformed'));

    const isTriggered = hasHighPain || hasWeightBearing || hasNumbness || hasDeformity;

    if (isTriggered) {
      redFlagBox.classList.add('is-visible');
    } else {
      redFlagBox.classList.remove('is-visible');
    }

    return isTriggered;
  }

  /**
   * Step 3: Sport & Background
   */
  function setupStep3Handlers() {
    const sportSelect = document.getElementById('sport-select');
    const sportOtherWrapper = document.getElementById('sport-other-wrapper');
    const sportOtherInput = document.getElementById('sport-other-input');
    const ageSelect = document.getElementById('age-group-select');
    const yesBtn = document.getElementById('injured-before-yes');
    const noBtn = document.getElementById('injured-before-no');

    if (sportSelect) {
      sportSelect.addEventListener('change', function () {
        window.injuryData.sport = sportSelect.value;

        // If "Other" is chosen, show "Which sport?" input (max 40 chars)
        if (sportSelect.value === 'Other') {
          if (sportOtherWrapper) sportOtherWrapper.style.display = 'block';
          if (sportOtherInput) sportOtherInput.focus();
        } else {
          if (sportOtherWrapper) sportOtherWrapper.style.display = 'none';
          window.injuryData.sportOther = '';
          if (sportOtherInput) sportOtherInput.value = '';
        }

        validateCurrentStep();
        saveData();
      });
    }

    if (sportOtherInput) {
      sportOtherInput.addEventListener('input', function () {
        window.injuryData.sportOther = sportOtherInput.value.slice(0, 40);
        validateCurrentStep();
        saveData();
      });
    }

    if (ageSelect) {
      ageSelect.addEventListener('change', function () {
        window.injuryData.ageGroup = ageSelect.value;
        validateCurrentStep();
        saveData();
      });
    }

    if (yesBtn && noBtn) {
      yesBtn.addEventListener('click', function () {
        yesBtn.classList.add('is-active');
        noBtn.classList.remove('is-active');
        window.injuryData.injuredBefore = 'Yes';
        validateCurrentStep();
        saveData();
      });

      noBtn.addEventListener('click', function () {
        noBtn.classList.add('is-active');
        yesBtn.classList.remove('is-active');
        window.injuryData.injuredBefore = 'No';
        validateCurrentStep();
        saveData();
      });
    }
  }

  /**
   * Action Bar (Back / Next navigation)
   */
  function setupActionBarHandlers() {
    const btnBack = document.getElementById('q-btn-back');
    const btnNext = document.getElementById('q-btn-next');

    if (btnBack) {
      btnBack.addEventListener('click', function () {
        if (currentStep === 1) {
          returnTo3DBody();
        } else if (currentStep <= 3) {
          goToStep(currentStep - 1);
        } else if (currentStep === 4) {
          // Coming back from Review screen
          goToStep(3);
        }
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', function () {
        if (currentStep < 3) {
          goToStep(currentStep + 1);
        } else if (currentStep === 3) {
          goToStep(4); // Go to Review
        }
      });
    }
  }

  /**
   * Header Summary Bar (Change body part button)
   */
  function setupSummaryBarHandlers() {
    const btnChangePart = document.getElementById('btn-change-part');
    if (btnChangePart) {
      btnChangePart.addEventListener('click', returnTo3DBody);
    }
  }

  /**
   * Switch between steps 1, 2, 3 and 4 (Review)
   */
  function goToStep(step) {
    currentStep = step;

    // Update Progress bar & texts
    const stepTextEl = document.getElementById('q-step-text');
    const progressBar = document.getElementById('q-progress-bar');
    const btnBack = document.getElementById('q-btn-back');
    const btnNext = document.getElementById('q-btn-next');
    const actionBar = document.getElementById('q-action-bar');

    // Hide all step sections
    for (let i = 1; i <= 4; i++) {
      const el = document.getElementById(`q-step-${i}`);
      if (el) el.classList.remove('is-active');
    }

    const currentEl = document.getElementById(`q-step-${step}`);
    if (currentEl) currentEl.classList.add('is-active');

    // Configure navigation bar state
    if (step <= 3) {
      if (actionBar) actionBar.style.display = 'flex';
      if (stepTextEl) stepTextEl.textContent = `Step ${step} of ${totalSteps}`;
      if (progressBar) progressBar.style.width = `${(step / totalSteps) * 100}%`;
      if (btnBack) btnBack.innerHTML = step === 1 ? '← Back to 3D Body' : '← Back';
      if (btnNext) {
        btnNext.style.display = 'inline-flex';
        btnNext.innerHTML = step === 3 ? 'Review Answers →' : 'Next Step →';
      }
      validateCurrentStep();
    } else {
      // Step 4: Review screen
      if (actionBar) actionBar.style.display = 'none';
      if (stepTextEl) stepTextEl.textContent = 'Review & Confirmation';
      if (progressBar) progressBar.style.width = '100%';
      renderReviewScreen();
    }

    // Scroll to top of card smoothly
    const card = document.querySelector('.questionnaire-card');
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /**
   * Step validation logic
   */
  function validateCurrentStep() {
    const btnNext = document.getElementById('q-btn-next');
    if (!btnNext) return;

    let isValid = false;

    if (currentStep === 1) {
      if (window.injuryData.howItHappened) {
        if (window.injuryData.howItHappened === 'Other') {
          // Other requires at least 10 characters
          isValid = (window.injuryData.otherDescription || '').trim().length >= 10;
        } else {
          isValid = true;
        }
      }
    } else if (currentStep === 2) {
      // Step 2 requires "When did it happen?" to be chosen
      isValid = Boolean(window.injuryData.whenHappened && window.injuryData.whenHappened.trim() !== '');
    } else if (currentStep === 3) {
      // Step 3 requires sport (plus sportOther if Other chosen), injuredBefore, and ageGroup
      const hasSport = Boolean(window.injuryData.sport && window.injuryData.sport.trim() !== '');
      let sportValid = hasSport;
      if (window.injuryData.sport === 'Other') {
        sportValid = Boolean(window.injuryData.sportOther && window.injuryData.sportOther.trim().length > 0);
      }
      const hasInjuredBefore = Boolean(window.injuryData.injuredBefore);
      const hasAge = Boolean(window.injuryData.ageGroup && window.injuryData.ageGroup.trim() !== '');
      isValid = sportValid && hasInjuredBefore && hasAge;
    }

    btnNext.disabled = !isValid;
  }

  /**
   * Render Review Screen
   */
  function renderReviewScreen() {
    const container = document.getElementById('review-content-list');
    if (!container) return;

    const data = window.injuryData;
    const regionName = data.region ? data.region.name : 'Unknown Spot';

    const howText = data.howItHappened === 'Other'
      ? `Other: "${data.otherDescription}"`
      : (data.howItHappened || 'Not specified');

    const symptomsText = data.symptoms && data.symptoms.length > 0
      ? data.symptoms.join(', ')
      : 'None reported';

    // Format sport display name
    let sportDisplayName = data.sport || 'Not specified';
    if (data.sport === 'Other' && data.sportOther) {
      sportDisplayName = `Other (${data.sportOther})`;
    }

    const isRedFlag = checkRedFlags();

    container.innerHTML = `
      <div class="review-section-card">
        <div class="review-info-group">
          <span class="review-category-title">1. Selected Region</span>
          <div class="review-main-value">${escapeHtml(regionName)}</div>
          <div class="review-sub-value">${escapeHtml(data.region && data.region.bonesOrJoint ? data.region.bonesOrJoint : '')}</div>
        </div>
        <button type="button" class="btn-edit-step" data-target="body">
          <span>Edit</span>
          <span aria-hidden="true">✎</span>
        </button>
      </div>

      <div class="review-section-card">
        <div class="review-info-group">
          <span class="review-category-title">2. How It Happened</span>
          <div class="review-main-value">${escapeHtml(howText)}</div>
        </div>
        <button type="button" class="btn-edit-step" data-target="1">
          <span>Edit</span>
          <span aria-hidden="true">✎</span>
        </button>
      </div>

      <div class="review-section-card">
        <div class="review-info-group">
          <span class="review-category-title">3. Symptoms &amp; Pain</span>
          <div class="review-main-value">Pain Level: <strong>${data.painLevel} / 10</strong> &bull; Occurred: <strong>${escapeHtml(data.whenHappened)}</strong></div>
          <div class="review-sub-value">Reported Symptoms: ${escapeHtml(symptomsText)}</div>
        </div>
        <button type="button" class="btn-edit-step" data-target="2">
          <span>Edit</span>
          <span aria-hidden="true">✎</span>
        </button>
      </div>

      <div class="review-section-card">
        <div class="review-info-group">
          <span class="review-category-title">4. Sport &amp; Background</span>
          <div class="review-main-value">Sport: <strong>${escapeHtml(sportDisplayName)}</strong> &bull; Age Group: <strong>${escapeHtml(data.ageGroup)}</strong></div>
          <div class="review-sub-value">Prior Injury to Spot: <strong>${escapeHtml(data.injuredBefore || 'No')}</strong></div>
        </div>
        <button type="button" class="btn-edit-step" data-target="3">
          <span>Edit</span>
          <span aria-hidden="true">✎</span>
        </button>
      </div>

      ${
        isRedFlag
          ? `
        <div class="red-flag-warning is-visible" style="margin-top: 1rem;">
          <span class="warning-icon-large" aria-hidden="true">🚨</span>
          <div class="warning-content">
            <div class="warning-title">Urgent Clinical Precaution</div>
            <p class="warning-desc">
              Your reported symptoms or pain level (Score: ${data.painLevel}/10) include red-flag warning signs. Please visit a sports doctor, orthopedic clinic, or emergency department for an in-person diagnostic evaluation.
            </p>
          </div>
        </div>
      `
          : ''
      }
    `;

    // Connect Edit buttons
    const editBtns = container.querySelectorAll('.btn-edit-step');
    editBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const target = btn.getAttribute('data-target');
        if (target === 'body') {
          returnTo3DBody();
        } else {
          goToStep(parseInt(target, 10));
        }
      });
    });
  }

  function setupReviewScreenHandlers() {
    const btnGetPlan = document.getElementById('btn-get-plan');
    const btnReviewBack = document.getElementById('btn-review-back');

    if (btnReviewBack) {
      btnReviewBack.addEventListener('click', function () {
        goToStep(3);
      });
    }

    if (btnGetPlan) {
      btnGetPlan.addEventListener('click', function () {
        // Validate everything before proceeding
        if (!window.injuryData.region || !window.injuryData.howItHappened || !window.injuryData.whenHappened || !window.injuryData.sport) {
          alert('Please complete all questionnaire steps before proceeding.');
          return;
        }

        saveData();

        // Navigate to the results page
        window.location.href = 'results.html';
      });
    }
  }

  /**
   * Return back to 3D body view
   */
  function returnTo3DBody() {
    const bodySection = document.getElementById('body-view-section');
    const qSection = document.getElementById('questionnaire-section');

    if (qSection) qSection.classList.remove('is-active');
    if (bodySection) {
      bodySection.style.display = 'block';
      bodySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Trigger 3D engine resize to ensure correct canvas projection
    window.dispatchEvent(new Event('resize'));
  }

  /**
   * Save current injuryData to sessionStorage
   */
  function saveData() {
    try {
      sessionStorage.setItem('injuryData', JSON.stringify(window.injuryData));
    } catch (e) {
      console.warn('SessionStorage save error:', e);
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
