/* UI rendering and interactions for MysteryBox. */
(() => {
  "use strict";
  const caseData = window.MYSTERY_CASE;
  const game = window.MysteryGame;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => Array.from(document.querySelectorAll(selector));
  let activeClueId = null;
  let activeSuspectId = null;
  let toastTimer = null;

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[char]));
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function showScreen(name) {
    $$(".screen").forEach(screen => screen.classList.remove("active"));
    const target = $("#screen-" + name);
    if (target) target.classList.add("active");
    game.setScreen(name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function populateSelect(select, items, placeholder, labelKey = "label") {
    select.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>` +
      items.map(item => `<option value="${escapeHtml(item.id)}">${escapeHtml(item[labelKey])}</option>`).join("");
  }

  function renderEvidence() {
    const state = game.getState();
    $("#evidence-grid").innerHTML = caseData.clues.map((clue, index) => {
      const reviewed = state.reviewedClues.includes(clue.id);
      return `<button class="evidence-card ${reviewed ? "reviewed" : ""}" type="button" data-clue="${escapeHtml(clue.id)}" aria-label="Inspect ${escapeHtml(clue.title)}">
        <span class="evidence-number">${escapeHtml(clue.number)}</span>
        <span class="evidence-icon" aria-hidden="true">${escapeHtml(clue.icon)}</span>
        <strong>${escapeHtml(clue.title)}</strong>
        <small>${escapeHtml(clue.teaser)}</small>
      </button>`;
    }).join("");
    const count = state.reviewedClues.length;
    $("#evidence-count").textContent = `${count}/${caseData.clues.length}`;
    $("#evidence-progress").style.width = `${(count / caseData.clues.length) * 100}%`;
    $("#accusation-help").textContent = count === caseData.clues.length
      ? "All files reviewed. Ready to make your deduction."
      : `${caseData.clues.length - count} file(s) remain unopened. You can still make an accusation.`;
  }

  function renderSuspects() {
    $("#suspect-list").innerHTML = caseData.suspects.map(suspect =>
      `<button class="suspect-row" type="button" data-suspect="${escapeHtml(suspect.id)}">
        <span class="suspect-avatar" aria-hidden="true">${escapeHtml(suspect.initial)}</span>
        <span><strong>${escapeHtml(suspect.name)}</strong><small>${escapeHtml(suspect.role)}</small></span>
        <span class="row-arrow" aria-hidden="true">↗</span>
      </button>`
    ).join("");
  }

  function openClue(clueId) {
    const clue = caseData.clues.find(item => item.id === clueId);
    if (!clue) return;
    activeClueId = clueId;
    $("#clue-modal-eyebrow").textContent = clue.number;
    $("#clue-detail-icon").textContent = clue.icon;
    $("#clue-modal-title").textContent = clue.title;
    $("#clue-modal-description").textContent = clue.description;
    $("#clue-modal-meaning").textContent = clue.meaning;
    $("#clue-modal-number").textContent = clue.number;
    $("#mark-clue-read-button").innerHTML = game.getState().reviewedClues.includes(clueId)
      ? 'File reviewed <span>✓</span>' : 'Mark file reviewed <span>✓</span>';
    $$(".screen").forEach(screen => screen.classList.remove("active"));
    $("#screen-clue-modal").classList.add("active");
  }

  function closeClue(markReviewed = false) {
    if (markReviewed && activeClueId) {
      game.markClueReviewed(activeClueId);
      renderEvidence();
    }
    activeClueId = null;
    const state = game.getState();
    showScreen(state.result ? "results" : "investigation");
  }

  function openSuspect(suspectId) {
    const suspect = caseData.suspects.find(item => item.id === suspectId);
    if (!suspect) return;
    activeSuspectId = suspectId;
    $("#suspect-monogram").textContent = suspect.initial;
    $("#suspect-modal-title").textContent = suspect.name;
    $("#suspect-modal-role").textContent = suspect.role.toUpperCase();
    $("#suspect-modal-statement").textContent = `“${suspect.statement}”`;
    $("#suspect-modal-note").textContent = suspect.note;
    $$(".screen").forEach(screen => screen.classList.remove("active"));
    $("#screen-suspect-modal").classList.add("active");
  }

  function closeSuspect() {
    activeSuspectId = null;
    showScreen("investigation");
  }

  function renderResults(result, accusation) {
    const state = game.getState();
    const finalResult = result || state.result;
    const finalAccusation = accusation || state.accusation;
    if (!finalResult || !finalAccusation) return;
    $("#final-score").textContent = finalResult.total;
    $("#rank-label").textContent = finalResult.rank;
    $("#result-subtitle").textContent = finalResult.total === 100
      ? "A flawless deduction. Every piece fits."
      : finalResult.total >= 70
        ? "Good work. Review the details you missed."
        : "The case is closed. Study the evidence and sharpen your next deduction.";
    $("#solution-title").textContent = caseData.solution.title;
    $("#solution-text").textContent = caseData.solution.text;
    $("#solution-checks").innerHTML = caseData.solution.checks.map(text =>
      `<div class="solution-check"><span>✦</span><span>${escapeHtml(text)}</span></div>`
    ).join("");
    $("#score-breakdown-results").innerHTML = finalResult.parts.map(part =>
      `<div class="score-result-row">
        <div>${escapeHtml(part.label)}<small>${escapeHtml(part.detail)}</small></div>
        <strong class="${part.correct ? "earned" : ""}">${part.correct ? part.points : 0} / ${part.points}</strong>
      </div>`
    ).join("");
    const missed = finalResult.parts.filter(part => !part.correct).map(part => part.label.toLowerCase());
    $("#score-advice").textContent = missed.length
      ? `For your next investigation, revisit: ${missed.join(", ")}. You can restart the case and try a different theory.`
      : "Every part of your deduction was correct. You connected the physical evidence, motive, and timeline.";
  }

  function startAccusation() {
    const state = game.getState();
    $("#culprit-select").value = state.accusation?.culprit || "";
    $("#motive-select").value = state.accusation?.motive || "";
    $("#clue-select").value = state.accusation?.clue || "";
    $("#timeline-select").value = state.accusation?.timeline || "";
    showScreen("accusation");
  }

  function resetGame() {
    const confirmed = window.confirm("Restart Case 001? Your reviewed clues and previous score will be cleared.");
    if (!confirmed) return;
    game.reset();
    renderEvidence();
    $("#accusation-form").reset();
    showScreen("home");
    showToast("Case file reset. Start a fresh investigation.");
  }

  function initialize() {
    $("#year").textContent = new Date().getFullYear();
    populateSelect($("#culprit-select"), caseData.suspects.map(s => ({ id: s.id, label: `${s.name} — ${s.role}` })), "Choose a suspect…");
    populateSelect($("#motive-select"), caseData.motives, "Choose a motive…");
    populateSelect($("#clue-select"), caseData.clues.map(c => ({ id: c.id, label: `${c.number} — ${c.title}` })), "Choose a clue…");
    populateSelect($("#timeline-select"), caseData.timelines, "Choose an explanation…");
    renderEvidence();
    renderSuspects();

    $("#brand-home").addEventListener("click", event => { event.preventDefault(); showScreen("home"); });
    $("#start-button").addEventListener("click", () => showScreen("briefing"));
    $("#to-investigation-button").addEventListener("click", () => showScreen("investigation"));
    $("#to-accusation-button").addEventListener("click", startAccusation);
    $("#back-to-evidence-button").addEventListener("click", () => showScreen("investigation"));
    $("#reset-button").addEventListener("click", resetGame);
    $("#play-again-button").addEventListener("click", resetGame);
    $("#home-button").addEventListener("click", () => showScreen("home"));

    $("#evidence-grid").addEventListener("click", event => {
      const button = event.target.closest("[data-clue]");
      if (button) openClue(button.dataset.clue);
    });
    $("#suspect-list").addEventListener("click", event => {
      const button = event.target.closest("[data-suspect]");
      if (button) openSuspect(button.dataset.suspect);
    });

    $("#mark-clue-read-button").addEventListener("click", () => closeClue(true));
    $("#close-clue-button").addEventListener("click", () => closeClue(false));
    $("#modal-backdrop").addEventListener("click", () => closeClue(false));
    $("#close-suspect-button").addEventListener("click", closeSuspect);
    $("#close-suspect-detail-button").addEventListener("click", closeSuspect);
    $("#suspect-modal-backdrop").addEventListener("click", closeSuspect);
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        if ($("#screen-clue-modal").classList.contains("active")) closeClue(false);
        else if ($("#screen-suspect-modal").classList.contains("active")) closeSuspect();
      }
    });

    $("#accusation-form").addEventListener("submit", event => {
      event.preventDefault();
      const accusation = {
        culprit: $("#culprit-select").value,
        motive: $("#motive-select").value,
        clue: $("#clue-select").value,
        timeline: $("#timeline-select").value
      };
      const response = game.submitAccusation(accusation);
      if (!response.ok) { showToast(response.message); return; }
      renderResults(response.result, accusation);
      showScreen("results");
    });

    const state = game.load();
    renderEvidence();
    if (state.result && state.accusation) {
      renderResults(state.result, state.accusation);
      showScreen("results");
    } else if (state.reviewedClues.length) {
      showScreen("investigation");
    } else {
      showScreen("home");
    }
  }

  document.addEventListener("DOMContentLoaded", initialize);
})();
