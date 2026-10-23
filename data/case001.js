/* Original fictional case data for MysteryBox Case 001. */
window.MYSTERY_CASE = {
  id: "case001",
  title: "The Missing Trophy",
  location: "Crescent College",
  suspects: [
    {
      id: "anika",
      name: "Anika",
      role: "Event coordinator",
      initial: "A",
      statement: "I was in the auditorium arranging the front-row name cards from 7:00 until after 7:20. I never went near the storage room.",
      note: "Anika had a disagreement with the principal about last-minute ceremony changes. That gives her a possible grievance, but no evidence places her at the hiding place."
    },
    {
      id: "rohan",
      name: "Rohan",
      role: "AV volunteer",
      initial: "R",
      statement: "I shut down the projector equipment at 7:12. After that I went straight to the main gate. I didn't touch the trophy.",
      note: "Rohan had access to the adjacent equipment room. The shutdown log supports the first part of his statement, but access alone does not connect him to the trophy."
    },
    {
      id: "kabir",
      name: "Kabir",
      role: "Sports team captain",
      initial: "K",
      statement: "I was checking the team kit in the sports store. I left the building before 7:20 and bought a drink at the cafeteria at 7:24. I didn't move the trophy.",
      note: "Kabir was unhappy about an engraving error. His receipt confirms a purchase at 7:24, not his location during the earlier part of the evening."
    },
    {
      id: "leela",
      name: "Leela",
      role: "Photography club member",
      initial: "L",
      statement: "I took photographs near the east courtyard. My camera shows me outside at 7:16. I left campus shortly after that.",
      note: "Leela's timestamped images support her being in the courtyard at 7:16. They do not establish where she was for the entire evening, but none of the evidence links her to the trophy."
    }
  ],
  clues: [
    {
      id: "stand",
      number: "EXHIBIT 01",
      icon: "⌑",
      title: "The empty stand",
      teaser: "The display case is intact.",
      description: "The glass display case is locked and undamaged. A clean outline in the dust on the velvet stand shows that the trophy was lifted out rather than the case being smashed.",
      meaning: "The trophy was removed deliberately, and whoever moved it likely had time and access. This clue establishes how it was taken, not who took it."
    },
    {
      id: "fragment",
      number: "EXHIBIT 02",
      icon: "✧",
      title: "The metal fragment",
      teaser: "A small piece near the stand.",
      description: "A small curved metal fragment lies on the floor beside the display. The trophy's base has a matching fresh chip. The damage likely happened while the trophy was being handled.",
      meaning: "The trophy was damaged during the incident. It supports the later explanation that someone tried to inspect or move it carelessly, but it does not identify the person on its own."
    },
    {
      id: "log",
      number: "EXHIBIT 03",
      icon: "▤",
      title: "Equipment shutdown log",
      teaser: "The projector was powered down.",
      description: "The equipment log records the projector being shut down at 7:12 PM. Rohan's statement says he shut it down at that time and then left for the main gate.",
      meaning: "This independently supports one part of Rohan's account. It does not prove where he went afterward, but there is no direct evidence placing him at the sports store or with the trophy."
    },
    {
      id: "trunk",
      number: "EXHIBIT 04",
      icon: "▣",
      title: "The storage photograph",
      teaser: "A distinctive sports trunk.",
      description: "A photo taken by the event team at 6:55 PM shows a blue-marked sports equipment trunk in the sports store. A second photo taken by Leela at 7:18 PM shows the same trunk in the corridor outside the store, with its lid not fully closed. At the edge of the image, a hand gripping the handle wears a red captain's armband, matching the one Kabir says he wore all evening. The trophy's fresh blue paint smear matches a chipped section on this trunk's handle.",
      meaning: "This is the decisive evidence: the blue paint smear connects the trophy to the marked trunk, and the red captain's armband in the 7:18 photo links Kabir to the trunk while it was in the corridor. Neither detail alone tells the whole story, but together they connect the trophy, hiding place, and suspect."
    },
    {
      id: "receipt",
      number: "EXHIBIT 05",
      icon: "▧",
      title: "The cafeteria receipt",
      teaser: "A purchase at 7:24 PM.",
      description: "A receipt printed at 7:24 PM records Kabir buying a drink. The cashier confirms the transaction, but the receipt contains no information about where Kabir was before he arrived at the counter.",
      meaning: "The receipt confirms Kabir was at the cafeteria at 7:24 PM. It is not a complete alibi for the period when the trunk was moved."
    },
    {
      id: "camera",
      number: "EXHIBIT 06",
      icon: "▧",
      title: "Leela's camera timestamps",
      teaser: "Two photos establish a timeline.",
      description: "Leela's camera contains a courtyard photo timestamped 7:16 PM and a corridor photo timestamped 7:18 PM. In the corridor photo, the blue-marked sports trunk is visible. Leela appears in the courtyard image's reflection in a glass door, consistent with her statement that she was outside at 7:16.",
      meaning: "The photographs narrow the timeline and independently place the trunk in the corridor at 7:18. They support Leela's account at that moment, but the decisive clue is the physical match between the trophy's paint smear and the trunk handle."
    }
  ],
  motives: [
    { id: "coverup", label: "Hide accidental damage before the ceremony" },
    { id: "revenge", label: "Take revenge on the principal" },
    { id: "prank", label: "Play a harmless prank on the college" },
    { id: "theft", label: "Sell the trophy for money" }
  ],
  timelines: [
    { id: "kabir-window", label: "Kabir's 7:24 receipt proves only where he was then, not before the trunk was moved." },
    { id: "rohan-alibi", label: "Rohan's 7:12 shutdown log proves he stayed by the equipment all evening." },
    { id: "leela-proof", label: "Leela's 7:16 photo proves she could not have been near the building at any earlier time." },
    { id: "anika-proof", label: "Anika's event duties prove she could not have left the auditorium." }
  ],
  answer: {
    culprit: "kabir",
    motive: "coverup",
    clue: "trunk",
    timeline: "kabir-window"
  },
  solution: {
    title: "The trophy was hidden in the sports trunk.",
    text: "Kabir is responsible. He took the trophy to inspect its loose base after noticing the engraving problem. While handling it, he chipped the base. Afraid the damage would embarrass his team before the ceremony, he hid it in the blue-marked sports trunk, intending to repair it and return it before morning. The matching blue paint smear connects the trophy to the trunk. Leela's 7:18 photo places that trunk in the corridor, while Kabir's 7:24 receipt proves only that he was at the cafeteria at that later time. His statement about leaving before 7:20 is therefore unreliable. The evidence supports a cover-up of accidental damage, not a planned theft for profit.",
    checks: [
      "The display case was intact, so the trophy was deliberately removed.",
      "The fresh chip and metal fragment show that the trophy was damaged while being handled.",
      "The blue paint smear on the trophy matches the chipped handle of the sports trunk, and the 7:18 photo shows a hand wearing Kabir's red captain's armband on that trunk.",
      "The trunk was photographed in the corridor at 7:18 PM.",
      "Kabir's 7:24 receipt does not account for his earlier movements.",
      "The evidence supports hiding the trophy to conceal accidental damage, not selling it."
    ]
  }
};
