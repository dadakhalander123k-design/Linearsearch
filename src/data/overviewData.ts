export const OVERVIEW_DATA = {
  hero: {
    category: "THEORY CURRICULUM • MODULE 01 • CHAPTER 01",
    titleLine1: "Linear Search",
    titleLine2: "Fundamentals",
    description: "Learn how linear search works by checking each element one by one until the target is found or the list ends.",
    array: [
      { value: 12, index: 0 },
      { value: 7, index: 1 },
      { value: 23, index: 2 },
      { value: 9, index: 3, isTarget: true },
      { value: 16, index: 4 },
      { value: 4, index: 5 },
    ],
    features: [
      {
        id: "core-idea",
        title: "Core Idea",
        description: "Check each element sequentially until the target is found.",
        iconType: "target"
      },
      {
        id: "key-formula",
        title: "Key Formula",
        description: "Compare each element with target in order.",
        iconType: "formula"
      },
      {
        id: "main-challenge",
        title: "Main Challenge",
        description: "Linear time complexity for large datasets.",
        iconType: "challenge"
      }
    ]
  },
  mainIdea: {
    title: "1. The Main Idea",
    question: "How does linear search work?",
    description: "We start from the first element and compare each item with the target until we find a match or reach the end.",
    steps: [
      {
        id: "start",
        title: "Start",
        description: "Begin from the first element",
        iconType: "key"
      },
      {
        id: "compare",
        title: "Compare",
        description: "Check current element",
        iconType: "compare"
      },
      {
        id: "match",
        title: "Match?",
        description: "Is element equal to target?",
        iconType: "match"
      },
      {
        id: "result",
        title: "Result",
        description: "Found = return index, else -1",
        iconType: "result"
      }
    ]
  },
  roadmap: {
    title: "2. Concept Roadmap",
    steps: [
      {
        id: "01",
        number: "01",
        title: "What is Linear Search?",
        iconType: "search"
      },
      {
        id: "02",
        number: "02",
        title: "Search Algorithm",
        iconType: "algorithm"
      },
      {
        id: "03",
        number: "03",
        title: "Time Complexity",
        iconType: "time"
      },
      {
        id: "04",
        number: "04",
        title: "Best, Worst & Average Case",
        iconType: "cases"
      },
      {
        id: "05",
        number: "05",
        title: "Implementation Examples",
        iconType: "code"
      }
    ]
  },
  whyItMatters: {
    title: "3. Why This Topic Matters",
    cards: [
      {
        id: "simple-easy",
        title: "Simple & Easy",
        description: "Easy to understand and implement for small datasets.",
        type: "purple"
      },
      {
        id: "no-extra-space",
        title: "No Extra Space",
        description: "Does not require any additional memory or data structures.",
        type: "green"
      },
      {
        id: "real-world-use",
        title: "Real-World Use",
        description: "Used in small lists, unsorted data, and quick lookups.",
        type: "blue"
      }
    ]
  },
  readyToStart: {
    title: "4. Ready to Start?",
    description: "Begin with the fundamental idea behind linear search: checking elements one by one.",
    buttonText: "Start Learning"
  }
};
