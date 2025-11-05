import { TIME_OF_DAY, MESSAGE_TYPES } from './constants';

/**
 * Welcome Messages Utility
 * Generates dynamic welcome messages based on time and randomness
 */

/**
 * Get time-based greeting
 * @param {number} hour - Current hour (0-23)
 * @returns {string} - Greeting message
 */
export const getTimeBasedGreeting = (hour) => {
  if (hour >= 5 && hour < 12) {
    return 'Good morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good afternoon';
  } else if (hour >= 17 && hour < 22) {
    return 'Good evening';
  } else {
    return 'Good night';
  }
};

/**
 * Get time of day category
 * @param {number} hour - Current hour (0-23)
 * @returns {string} - Time category
 */
export const getTimeOfDay = (hour) => {
  if (hour >= 5 && hour < 12) {
    return TIME_OF_DAY.MORNING;
  } else if (hour >= 12 && hour < 17) {
    return TIME_OF_DAY.AFTERNOON;
  } else if (hour >= 17 && hour < 22) {
    return TIME_OF_DAY.EVENING;
  } else {
    return TIME_OF_DAY.NIGHT;
  }
};

/**
 * Funny pun messages
 */
const FUNNY_MESSAGES = [
  "Let's debug some code and squash those bugs! 🐛",
  "Time to turn coffee into code! ☕",
  "Ready to make some magic happen? ✨",
  "Let's write code that even compilers will admire! 💻",
  "Warning: Excessive coding may lead to genius! 🧠",
  "Syntax errors are just code's way of keeping you humble! 😄",
  "Let's make the IDE jealous of our skills! 🔥",
  "Code is poetry, and you're the poet! 📝",
  "Time to teach machines who's boss! 🤖",
  "Let's create something the internet will remember! 🌟",
  "Debugging: Being a detective in a crime movie where you're also the murderer! 🔍",
  "It's not a bug, it's an undocumented feature! 🎭",
  "Real programmers count from 0! 0️⃣",
  "Keep calm and code on! 🧘",
  "sudo make me a sandwich... of code! 🥪",
];

/**
 * Professional messages
 */
const PROFESSIONAL_MESSAGES = [
  "Ready to visualize and trace your next breakthrough?",
  "Your workspace is ready for innovation.",
  "Let's transform ideas into executable solutions.",
  "Time to build something remarkable.",
  "Your coding environment awaits.",
  "Let's architect something exceptional today.",
  "Ready to bring your algorithms to life?",
  "Your projects are eager for your attention.",
  "Let's turn complexity into clarity.",
  "Welcome to your development sanctuary.",
  "Time to optimize, visualize, and execute.",
  "Let's make code comprehension effortless.",
  "Your tools are primed for productivity.",
  "Ready to decode complexity?",
  "Let's illuminate the path through your code.",
];

/**
 * Motivational messages
 */
const MOTIVATIONAL_MESSAGES = [
  "Every great project starts with a single line of code.",
  "You're one compilation away from success!",
  "Today's code is tomorrow's innovation.",
  "Believe in your debugging skills!",
  "Your potential is limitless, just like recursion without a base case!",
  "Small steps in code lead to giant leaps in results.",
  "The only bad code is unwritten code.",
  "Your next breakthrough is just a function call away!",
  "Code with confidence, debug with patience.",
  "Turn obstacles into opportunities for better algorithms!",
  "Your creativity is your strongest programming language.",
  "Every error message is a learning opportunity.",
  "You're building the future, one line at a time.",
  "Great developers aren't born, they're compiled!",
  "Your code has the power to change the world.",
];

/**
 * Time-specific messages
 */
const TIME_SPECIFIC_MESSAGES = {
  [TIME_OF_DAY.MORNING]: [
    "Rise and code! The best algorithms are written in the morning.",
    "Fresh mind, fresh code! Let's make today productive.",
    "Morning is the perfect time for clean, crisp code.",
    "Start your day with logic and end with success!",
    "The early coder catches the bug!",
  ],
  [TIME_OF_DAY.AFTERNOON]: [
    "Afternoon coding session? Let's make it count!",
    "Midday is perfect for tackling complex algorithms.",
    "Keep the momentum going! Your afternoon breakthrough awaits.",
    "Post-lunch coding: Where good code becomes great.",
    "The afternoon is yours to dominate!",
  ],
  [TIME_OF_DAY.EVENING]: [
    "Evening coding sessions hit different! Let's create magic.",
    "The calm of evening brings clarity to code.",
    "Perfect time to visualize complex solutions.",
    "Evening energy is creative energy!",
    "Code by twilight, debug by moonlight!",
  ],
  [TIME_OF_DAY.NIGHT]: [
    "Night owl? Best code is written after sunset! 🦉",
    "The night is young, and so is your code!",
    "Burning the midnight oil? You're in good company!",
    "Night coding: When the world sleeps, developers create.",
    "Late night, bright ideas!",
  ],
};

/**
 * Get random message based on type
 * @param {string} type - Message type (funny/professional/motivational)
 * @returns {string} - Random message
 */
const getRandomMessageByType = (type) => {
  let messages;
  
  switch (type) {
    case MESSAGE_TYPES.FUNNY:
      messages = FUNNY_MESSAGES;
      break;
    case MESSAGE_TYPES.PROFESSIONAL:
      messages = PROFESSIONAL_MESSAGES;
      break;
    case MESSAGE_TYPES.MOTIVATIONAL:
      messages = MOTIVATIONAL_MESSAGES;
      break;
    default:
      messages = PROFESSIONAL_MESSAGES;
  }
  
  return messages[Math.floor(Math.random() * messages.length)];
};

/**
 * Get random time-specific message
 * @param {string} timeOfDay - Time category
 * @returns {string} - Random time-specific message
 */
const getTimeSpecificMessage = (timeOfDay) => {
  const messages = TIME_SPECIFIC_MESSAGES[timeOfDay] || PROFESSIONAL_MESSAGES;
  return messages[Math.floor(Math.random() * messages.length)];
};

/**
 * Get random message (combines all types)
 * @param {number} hour - Current hour
 * @returns {string} - Random message
 */
export const getRandomMessage = (hour) => {
  const timeOfDay = getTimeOfDay(hour);
  const randomChoice = Math.random();
  
  // 30% chance for time-specific
  if (randomChoice < 0.3) {
    return getTimeSpecificMessage(timeOfDay);
  }
  
  // 30% chance for funny
  if (randomChoice < 0.6) {
    return getRandomMessageByType(MESSAGE_TYPES.FUNNY);
  }
  
  // 20% chance for motivational
  if (randomChoice < 0.8) {
    return getRandomMessageByType(MESSAGE_TYPES.MOTIVATIONAL);
  }
  
  // 20% chance for professional
  return getRandomMessageByType(MESSAGE_TYPES.PROFESSIONAL);
};

/**
 * Get greeting emoji based on time
 * @param {number} hour - Current hour (0-23)
 * @returns {string} - Emoji
 */
export const getGreetingEmoji = (hour) => {
  const timeOfDay = getTimeOfDay(hour);
  
  const emojiMap = {
    [TIME_OF_DAY.MORNING]: '🌅',
    [TIME_OF_DAY.AFTERNOON]: '☀️',
    [TIME_OF_DAY.EVENING]: '🌆',
    [TIME_OF_DAY.NIGHT]: '🌙',
  };
  
  return emojiMap[timeOfDay] || '👋';
};

/**
 * Get full welcome data
 * @param {number} hour - Current hour
 * @param {string} username - User's name
 * @returns {Object} - Welcome data object
 */
export const getWelcomeData = (hour, username = 'Developer') => {
  return {
    greeting: getTimeBasedGreeting(hour),
    message: getRandomMessage(hour),
    emoji: getGreetingEmoji(hour),
    username,
    timeOfDay: getTimeOfDay(hour),
  };
};

export default {
  getTimeBasedGreeting,
  getTimeOfDay,
  getRandomMessage,
  getGreetingEmoji,
  getWelcomeData,
};
