/* Game rules and state. No network requests or external APIs. */
window.MysteryGame = (() => {
  const STORAGE_KEY = "mysterybox.case001.progress.v1";
  let state = freshState();

  function freshState() {
    return {
      screen: "home",
      reviewedClues: [],
      accusation: null,
      result: null
    };
  }

  function load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return state;
      const parsed = JSON.parse(saved);
      if (!parsed || typeof parsed !== "object") return state;
      state = {
        ...freshState(),
        reviewedClues: Array.isArray(parsed.reviewedClues)
          ? parsed.reviewedClues.filter(id => window.MYSTERY_CASE.clues.some(clue => clue.id === id))
          : [],
        accusation: parsed.accusation || null,
        result: parsed.result || null,
        screen: ["home", "briefing", "investigation", "accusation", "results"].includes(parsed.screen)
          ? parsed.screen : "home"
      };
      if (state.result && state.accusation) state.screen = "results";
    } catch (error) {
      state = freshState();
    }
    return state;
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      // The game remains playable even if browser storage is unavailable.
    }
  }

  function getState() {
    return JSON.parse(JSON.stringify(state));
  }

  function setScreen(screen) {
    const allowed = ["home", "briefing", "investigation", "accusation", "results"];
    if (!allowed.includes(screen)) return;
    state.screen = screen;
    save();
  }

  function markClueReviewed(clueId) {
    if (!window.MYSTERY_CASE.clues.some(clue => clue.id === clueId)) return;
    if (!state.reviewedClues.includes(clueId)) state.reviewedClues.push(clueId);
    save();
  }

  function scoreAccusation(accusation) {
    const answer = window.MYSTERY_CASE.answer;
    const parts = [
      { id: "culprit", label: "Correct culprit", detail: "Who was responsible?", points: 40, correct: accusation.culprit === answer.culprit },
      { id: "motive", label: "Correct motive", detail: "Why the trophy was hidden", points: 20, correct: accusation.motive === answer.motive },
      { id: "clue", label: "Decisive evidence", detail: "The clue linking trophy and hiding place", points: 20, correct: accusation.clue === answer.clue },
      { id: "timeline", label: "Timeline logic", detail: "What the receipt does and doesn't prove", points: 20, correct: accusation.timeline === answer.timeline }
    ];
    const total = parts.reduce((sum, part) => sum + (part.correct ? part.points : 0), 0);
    let rank = "ROOKIE DETECTIVE";
    if (total >= 90) rank = "MASTER SLEUTH";
    else if (total >= 70) rank = "SHARP INVESTIGATOR";
    else if (total >= 50) rank = "PROMISING DETECTIVE";
    return { total, rank, parts };
  }

  function submitAccusation(accusation) {
    const caseData = window.MYSTERY_CASE;
    const valid = caseData.suspects.some(s => s.id === accusation.culprit)
      && caseData.motives.some(m => m.id === accusation.motive)
      && caseData.clues.some(c => c.id === accusation.clue)
      && caseData.timelines.some(t => t.id === accusation.timeline);
    if (!valid) return { ok: false, message: "Choose an answer for each part of your deduction." };
    const result = scoreAccusation(accusation);
    state.accusation = accusation;
    state.result = result;
    state.screen = "results";
    save();
    return { ok: true, result };
  }

  function reset() {
    state = freshState();
    save();
    return getState();
  }

  function resumeScreen() {
    if (state.result) return "results";
    if (state.reviewedClues.length) return "investigation";
    return state.screen || "home";
  }

  return { load, save, getState, setScreen, markClueReviewed, submitAccusation, reset, resumeScreen };
})();
