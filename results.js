/**
 * PlaySafe Recovery Hub - Results Page Controller (results.js)
 * Features:
 * - Loads injuryData from sessionStorage
 * - Maps body region to injuriesData using regionToInjury
 * - Handles unmapped regions (head, neck, abdomen) with a friendly clinical message
 * - Top Red-Flag Emergency Banner (pain >= 8 or severe symptoms) with seeDoctorIf list
 * - Summary section with quote box and youth/prior injury personalization
 * - Recovery exercises with 3 phase tabs, auto-highlighted based on injury timing
 * - Interactive Return-to-Play checklist with real-time progress bar
 * - Sport tips card populated from sportTips (hidden if sport is Other or missing)
 * - Accordion behavior for phone screens
 * - PDF print support and reset/navigation handlers
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initResultsPage);

  function initResultsPage() {
    let injuryData = null;

    try {
      const stored = sessionStorage.getItem('injuryData');
      if (stored) {
        injuryData = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Unable to parse injuryData from sessionStorage:', e);
    }

    // Fallback sample data if accessed directly without completing triage
    if (!injuryData) {
      injuryData = {
        region: { id: 'left_knee_front', name: 'Front of Left Knee', bonesOrJoint: 'Patella, Patellofemoral joint' },
        howItHappened: 'Twisted or landed badly',
        otherDescription: '',
        painLevel: 5,
        whenHappened: 'Today',
        symptoms: ['Swelling', 'Clicking or popping sound'],
        sport: 'Volleyball',
        sportOther: '',
        injuredBefore: 'No',
        ageGroup: '18-30'
      };
    }

    // Determine mapped injury
    const regionId = injuryData.region ? injuryData.region.id : null;
    let injuryKey = null;
    let injury = null;

    if (typeof regionToInjury !== 'undefined' && regionId) {
      injuryKey = regionToInjury[regionId];
    }
    if (injuryKey && typeof injuriesData !== 'undefined') {
      injury = injuriesData[injuryKey];
    }

    // 1. Render Top Red-Flag or Mild Banner
    renderTriageBanner(injuryData, injury);

    // 2. Render Section 1: Summary
    renderSummarySection(injuryData);

    // 3. Check if mapped vs unmapped region
    if (!injury) {
      handleUnmappedRegion();
    } else {
      renderClinicalGuide(injury, injuryData);
    }

    // 4. Render Section 8: Sport Tips
    renderSportTipsSection(injuryData);

    // 5. Setup Interactive Controls (Exercise tabs, Accordion, RTP Checklist, Print/Start Over)
    setupInteractiveFeatures(injuryData);
  }

  /**
   * Top Red-Flag Banner (Most Important)
   * Triggers if:
   * - painLevel >= 8
   * - OR symptoms include "Can't put weight on it", "Numbness or tingling", or "Looks deformed"
   */
  function renderTriageBanner(data, injury) {
    const banner = document.getElementById('triage-status-banner');
    const titleEl = document.getElementById('triage-banner-title');
    const subEl = document.getElementById('triage-banner-sub');
    const iconEl = document.getElementById('triage-banner-icon');
    const severeWrapper = document.getElementById('banner-severe-warning-wrapper');
    const warningItemsList = document.getElementById('banner-warning-items');

    if (!banner || !titleEl) return;

    const pain = data.painLevel || 0;
    const symptoms = data.symptoms || [];

    const hasHighPain = pain >= 8;
    const hasWeightBearing = symptoms.some((s) => s.toLowerCase().includes('weight'));
    const hasNumbness = symptoms.some((s) => s.toLowerCase().includes('numbness'));
    const hasDeformity = symptoms.some((s) => s.toLowerCase().includes('deformed'));

    const isSevere = hasHighPain || hasWeightBearing || hasNumbness || hasDeformity;

    if (isSevere) {
      banner.className = 'triage-banner banner-danger';
      iconEl.textContent = '🚨';
      titleEl.textContent = 'See a doctor immediately. Your answers show signs of a possibly serious injury.';
      subEl.textContent = 'Severe pain or mechanical compromise requires formal diagnostic examination and imaging.';

      if (severeWrapper && warningItemsList) {
        severeWrapper.style.display = 'block';

        // Extract doctor warning items from injury data or general defaults
        let warningList = [];
        if (injury && Array.isArray(injury.seeDoctorIf)) {
          warningList = injury.seeDoctorIf;
        } else {
          warningList = [
            "Inability to bear weight on the injured limb",
            "Joint deformity, dislocation, or unnatural angle",
            "Pins, needles, numbness, or loss of skin sensation",
            "Rapid joint ballooning or severe unmanageable pain"
          ];
        }

        warningItemsList.innerHTML = warningList
          .map((item) => `<li>${escapeHtml(item)}</li>`)
          .join('');
      }
    } else {
      banner.className = 'triage-banner banner-mild';
      iconEl.textContent = '✓';
      titleEl.textContent = "Your answers don't show urgent warning signs, but see a doctor if things get worse.";
      subEl.textContent = 'Follow the conservative recovery pathway below and allow tissues adequate time to remodel.';

      if (severeWrapper) {
        severeWrapper.style.display = 'none';
      }
    }
  }

  /**
   * Section 1: Your Summary & Personalisation
   */
  function renderSummarySection(data) {
    const bodyPartEl = document.getElementById('res-body-part');
    const sportEl = document.getElementById('res-sport');
    const howEl = document.getElementById('res-how-happened');
    const painTimingEl = document.getElementById('res-pain-timing');
    const quoteWrapper = document.getElementById('res-other-quote-wrapper');
    const quoteEl = document.getElementById('res-other-quote');
    const personalContainer = document.getElementById('personalization-container');

    if (bodyPartEl) {
      bodyPartEl.textContent = data.region ? data.region.name : 'Selected Area';
    }

    if (sportEl) {
      let sportDisplay = data.sport || 'Not specified';
      if (data.sport === 'Other' && data.sportOther) {
        sportDisplay = `Other (${data.sportOther})`;
      }
      sportEl.textContent = sportDisplay;
    }

    if (howEl) {
      howEl.textContent = data.howItHappened || 'Not specified';
    }

    if (painTimingEl) {
      painTimingEl.textContent = `Pain: ${data.painLevel}/10 • Occurred: ${data.whenHappened || 'Recently'}`;
    }

    // Show "Other" description quote box if user entered one
    if (quoteWrapper && quoteEl) {
      if (data.howItHappened === 'Other' && data.otherDescription && data.otherDescription.trim() !== '') {
        quoteEl.textContent = `"${data.otherDescription.trim()}"`;
        quoteWrapper.style.display = 'block';
      } else {
        quoteWrapper.style.display = 'none';
      }
    }

    // Extra Personalisation callouts
    if (personalContainer) {
      let calloutsHtml = '';

      // 1. Youth Athlete check
      const age = data.ageGroup || '';
      if (age === 'Under 12' || age === '12-17') {
        calloutsHtml += `
          <div class="personalization-callout youth">
            <span aria-hidden="true">👨‍👩‍👧</span>
            <span>Tell a parent, coach or guardian about this injury. Growing bones and growth plates need adult supervision.</span>
          </div>
        `;
      }

      // 2. Prior Injury check
      if (data.injuredBefore === 'Yes') {
        calloutsHtml += `
          <div class="personalization-callout repeat">
            <span aria-hidden="true">🔄</span>
            <span>Repeated injuries in the same spot are worth getting checked by a physio to address underlying imbalances.</span>
          </div>
        `;
      }

      personalContainer.innerHTML = calloutsHtml;
    }
  }

  /**
   * Handle unmapped regions (head, neck, abdomen)
   */
  function handleUnmappedRegion() {
    const unmappedCard = document.getElementById('unmapped-region-card');
    const clinicalWrapper = document.getElementById('clinical-sections-wrapper');
    const sidebarGuideItems = document.querySelectorAll('.sidebar-guide-item');

    if (unmappedCard) unmappedCard.style.display = 'flex';
    if (clinicalWrapper) clinicalWrapper.style.display = 'none';

    // Hide specific clinical section jump links in desktop sidebar
    sidebarGuideItems.forEach((item) => {
      item.style.display = 'none';
    });
  }

  /**
   * Render Clinical Guide Sections (2 to 7, 9, 10)
   */
  function renderClinicalGuide(injury, data) {
    const clinicalWrapper = document.getElementById('clinical-sections-wrapper');
    if (clinicalWrapper) clinicalWrapper.style.display = 'block';

    // Section 2: What This May Be
    const titleEl = document.getElementById('res-injury-title');
    const causeEl = document.getElementById('res-likely-cause');
    if (titleEl) titleEl.textContent = injury.title;
    if (causeEl) causeEl.textContent = injury.likelyCause;

    // Section 3: First Aid Now (PEACE & LOVE)
    const firstAidList = document.getElementById('res-first-aid-list');
    if (firstAidList && Array.isArray(injury.firstAid)) {
      firstAidList.innerHTML = injury.firstAid
        .map((step, idx) => {
          const parts = step.split(':');
          const boldText = parts[0] ? `<strong>${escapeHtml(parts[0])}:</strong>` : '';
          const restText = parts.slice(1).join(':');
          return `
            <li class="first-aid-step-item">
              <span class="first-aid-step-num">${idx + 1}</span>
              <div>${boldText} ${escapeHtml(restText)}</div>
            </li>
          `;
        })
        .join('');
    }

    // Section 4: Recovery Exercises
    renderExercisePanes(injury.exercises, data.whenHappened);

    // Section 5: Taping Guide
    const tapingList = document.getElementById('res-taping-steps');
    const tapingNote = document.getElementById('res-taping-note');
    if (tapingList && Array.isArray(injury.tapingGuide)) {
      tapingList.innerHTML = injury.tapingGuide
        .filter((step) => !step.toLowerCase().startsWith('note:'))
        .map((step, idx) => `
          <li class="first-aid-step-item">
            <span class="first-aid-step-num">${idx + 1}</span>
            <div>${escapeHtml(step.replace(/^\d+\.\s*/, ''))}</div>
          </li>
        `)
        .join('');
    }
    if (tapingNote) {
      tapingNote.textContent = 'Learn the technique from a physio or a trusted video before trying it.';
    }

    // Section 6: Medicine Information
    const medText = document.getElementById('res-medicine-text');
    if (medText) {
      medText.textContent = injury.medicineInfo;
    }

    // Section 7: Rest Time & Return to Play
    renderRestAndChecklist(injury);

    // Section 9: Mistakes to Avoid
    const mistakesList = document.getElementById('res-mistakes-list');
    if (mistakesList && Array.isArray(injury.mistakesToAvoid)) {
      mistakesList.innerHTML = injury.mistakesToAvoid
        .map((item) => `
          <li class="first-aid-step-item">
            <span style="color: var(--color-danger); font-size: 1.1rem; flex-shrink: 0;" aria-hidden="true">✕</span>
            <div>${escapeHtml(item)}</div>
          </li>
        `)
        .join('');
    }

    // Section 10: See a Doctor If
    const warningsList = document.getElementById('res-warnings-list');
    if (warningsList && Array.isArray(injury.seeDoctorIf)) {
      warningsList.innerHTML = injury.seeDoctorIf
        .map((warn) => `
          <li class="first-aid-step-item" style="border-left: 3px solid var(--color-danger); background: #fffafa;">
            <span style="color: var(--color-danger); font-size: 1.1rem; flex-shrink: 0;" aria-hidden="true">🚨</span>
            <div style="font-weight: 600; color: #991b1b;">${escapeHtml(warn)}</div>
          </li>
        `)
        .join('');
    }
  }

  /**
   * Section 4: Render Exercise Panes & Auto-Highlight Phase
   * - "Just now" or "Today" => "Day 1-3"
   * - "2-3 days ago" or "About a week ago" => "Week 1"
   * - "More than 2 weeks ago" => "Week 2 and beyond"
   */
  function renderExercisePanes(exercises, timing) {
    const panesContainer = document.getElementById('exercise-panes-container');
    if (!panesContainer || !exercises) return;

    // Determine target phase
    let autoPhase = 'Day 1-3';
    if (timing === '2-3 days ago' || timing === 'About a week ago') {
      autoPhase = 'Week 1';
    } else if (timing === 'More than 2 weeks ago') {
      autoPhase = 'Week 2 and beyond';
    }

    const phases = ['Day 1-3', 'Week 1', 'Week 2 and beyond'];

    panesContainer.innerHTML = phases
      .map((phase) => {
        const list = exercises[phase] || [];
        const isActive = phase === autoPhase;
        const cardsHtml = list
          .map((ex) => `
            <div class="exercise-mini-card">
              <div class="exercise-name-row">
                <span class="exercise-name">${escapeHtml(ex.name)}</span>
                <span class="exercise-dose">${escapeHtml(ex.sets)} • ${escapeHtml(ex.reps)}</span>
              </div>
              <p class="exercise-how-to">${escapeHtml(ex.howTo)}</p>
            </div>
          `)
          .join('');

        return `
          <div class="exercise-phase-pane ${isActive ? 'is-active' : ''}" id="pane-${phaseToId(phase)}" data-phase-title="Phase: ${escapeHtml(phase)}" style="${isActive ? 'display: block;' : 'display: none;'}">
            <div class="exercise-cards-grid">
              ${cardsHtml}
            </div>
          </div>
        `;
      })
      .join('');

    // Update tab button active states & badges
    const tabBtns = document.querySelectorAll('.exercise-tab-btn');
    tabBtns.forEach((btn) => {
      const phase = btn.getAttribute('data-phase');
      const isAuto = phase === autoPhase;
      const badge = btn.querySelector('.tab-auto-badge');

      if (isAuto) {
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        if (badge) badge.style.display = 'inline-block';
      } else {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-selected', 'false');
        if (badge) badge.style.display = 'none';
      }

      btn.onclick = function () {
        tabBtns.forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        const allPanes = panesContainer.querySelectorAll('.exercise-phase-pane');
        allPanes.forEach((pane) => (pane.style.display = 'none'));

        const targetPane = document.getElementById(`pane-${phaseToId(phase)}`);
        if (targetPane) targetPane.style.display = 'block';
      };
    });
  }

  function phaseToId(phase) {
    return phase.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  /**
   * Section 7: Rest Time & Return to Play Interactive Checklist
   */
  function renderRestAndChecklist(injury) {
    const restTiers = document.getElementById('res-rest-tiers');
    if (restTiers && injury.restDuration) {
      restTiers.innerHTML = `
        <div class="rest-tier-box">
          <div class="rest-tier-label mild">Mild Case</div>
          <div class="rest-tier-text">${escapeHtml(injury.restDuration.mild)}</div>
        </div>
        <div class="rest-tier-box">
          <div class="rest-tier-label moderate">Moderate Case</div>
          <div class="rest-tier-text">${escapeHtml(injury.restDuration.moderate)}</div>
        </div>
        <div class="rest-tier-box">
          <div class="rest-tier-label severe">Severe Case</div>
          <div class="rest-tier-text">${escapeHtml(injury.restDuration.severe)}</div>
        </div>
      `;
    }

    const checklistUl = document.getElementById('res-rtp-checklist');
    const counterText = document.getElementById('rtp-counter-text');
    const progressFill = document.getElementById('rtp-progress-fill');
    const statusNote = document.getElementById('rtp-status-note');

    if (!checklistUl || !Array.isArray(injury.returnToPlayChecklist)) return;

    const items = injury.returnToPlayChecklist;
    const totalItems = items.length;

    checklistUl.innerHTML = items
      .map((item, idx) => `
        <li class="checklist-interactive-item" data-index="${idx}" tabindex="0" role="checkbox" aria-checked="false">
          <span class="checklist-box" aria-hidden="true"></span>
          <span class="checklist-text">${escapeHtml(item)}</span>
        </li>
      `)
      .join('');

    const checkItems = checklistUl.querySelectorAll('.checklist-interactive-item');

    function updateChecklistProgress() {
      let ticked = 0;
      checkItems.forEach((li) => {
        if (li.classList.contains('is-ticked')) ticked++;
      });

      const pct = totalItems > 0 ? (ticked / totalItems) * 100 : 0;
      if (progressFill) progressFill.style.width = `${pct}%`;
      if (counterText) counterText.textContent = `${ticked} of ${totalItems} Completed`;

      if (statusNote) {
        if (ticked === totalItems && totalItems > 0) {
          statusNote.className = 'rtp-status-note all-complete';
          statusNote.textContent = '✓ Ready for return-to-play progression! All criteria ticked.';
        } else {
          statusNote.className = 'rtp-status-note';
          statusNote.textContent = 'Ready to return only when ALL items are ticked.';
        }
      }
    }

    checkItems.forEach((li) => {
      li.addEventListener('click', function () {
        const isTicked = li.classList.toggle('is-ticked');
        li.setAttribute('aria-checked', isTicked ? 'true' : 'false');
        updateChecklistProgress();
      });

      li.addEventListener('keydown', function (e) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          li.click();
        }
      });
    });

    updateChecklistProgress();
  }

  /**
   * Section 8: Tips for your sport
   * If sport is "Other" or missing, hide card
   */
  function renderSportTipsSection(data) {
    const cardEl = document.getElementById('sec-sporttips');
    const sidebarSportLink = document.getElementById('sidebar-sport-link');
    if (!cardEl) return;

    const sport = data.sport;

    if (!sport || sport === 'Other' || typeof sportTips === 'undefined' || !sportTips[sport]) {
      cardEl.style.display = 'none';
      if (sidebarSportLink) sidebarSportLink.style.display = 'none';
      return;
    }

    const tips = sportTips[sport];
    cardEl.style.display = 'block';
    if (sidebarSportLink) sidebarSportLink.style.display = 'block';

    const tipEl = document.getElementById('res-sport-tip');
    const retEl = document.getElementById('res-sport-return');
    const injUl = document.getElementById('res-sport-injuries');

    if (tipEl) tipEl.textContent = tips.tip;
    if (retEl) retEl.textContent = tips.returnNote;

    if (injUl && Array.isArray(tips.commonInjuries)) {
      injUl.innerHTML = tips.commonInjuries
        .map((inj) => `
          <li style="display: flex; align-items: flex-start; gap: 0.5rem; font-size: var(--font-size-sm); color: var(--color-text-muted); line-height: 1.5;">
            <span style="color: var(--color-accent); font-size: 0.85rem;" aria-hidden="true">⚠️</span>
            <span>${escapeHtml(inj)}</span>
          </li>
        `)
        .join('');
    }
  }

  /**
   * Setup Interactive Controls
   * - Mobile Accordion Toggle
   * - PDF Print Button
   * - Start Over Button
   * - Desktop Sidebar Jump Active Highlighting
   */
  function setupInteractiveFeatures(data) {
    // 1. Mobile Accordion Toggle
    const headers = document.querySelectorAll('.card-accordion-header');
    headers.forEach((header) => {
      header.addEventListener('click', function () {
        if (window.innerWidth <= 600) {
          const card = header.closest('.section-card');
          if (card) {
            const isCollapsed = card.classList.toggle('is-collapsed');
            header.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
          }
        }
      });
    });

    // 2. "Save as PDF / Print"
    const printBtn = document.getElementById('btn-print-action');
    const sidebarPrintBtn = document.getElementById('btn-sidebar-print');

    function handlePrint() {
      window.print();
    }

    if (printBtn) printBtn.addEventListener('click', handlePrint);
    if (sidebarPrintBtn) sidebarPrintBtn.addEventListener('click', handlePrint);

    // 3. "Start Over" (Clears sessionStorage and returns to Injury Finder)
    const startOverBtn = document.getElementById('btn-start-over-action');
    if (startOverBtn) {
      startOverBtn.addEventListener('click', function () {
        try {
          sessionStorage.removeItem('injuryData');
          sessionStorage.removeItem('selectedRegion');
        } catch (e) {
          console.warn('SessionStorage clear error:', e);
        }
        window.location.href = 'injury-finder.html';
      });
    }

    // 4. Desktop Sidebar Jump Highlighting on Scroll
    if (window.innerWidth >= 1025) {
      const navLinks = document.querySelectorAll('.sidebar-nav-link');
      const sections = document.querySelectorAll('.section-card');

      window.addEventListener('scroll', function () {
        let currentId = '';
        sections.forEach((sec) => {
          const top = sec.offsetTop - 120;
          if (window.scrollY >= top) {
            currentId = sec.getAttribute('id');
          }
        });

        if (currentId) {
          navLinks.forEach((link) => {
            const href = link.getAttribute('href').replace('#', '');
            if (href === currentId) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          });
        }
      });
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
