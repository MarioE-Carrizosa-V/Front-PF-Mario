/**
 * Checks if a subscription is valid based on the payment date.
 * Valid for 30 days from purchase.
 * @param {Object} user - The user object from localStorage/state 
 * @returns {boolean} - True if subscription is active
 */
export const isSubscriptionValid = (user) => {
  if (!user || (!user.email && !user.id)) return false;

  // Try to get from user object first
  let isPremium = user.isPremium;
  let subscriptionDate = user.subscriptionDate;

  // Fallback to persistent storage if not in user object
  const email = user.email || user.id;
  if (!isPremium && email) {
    const persistentData = getPersistentSubscription(email);
    if (persistentData) {
      isPremium = persistentData.isPremium;
      subscriptionDate = persistentData.subscriptionDate;
    }
  }

  if (!isPremium || !subscriptionDate) return false;

  const paymentDate = new Date(subscriptionDate);
  const currentDate = new Date();
  
  const diffTime = Math.abs(currentDate - paymentDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays <= 30;
};

/**
 * Persists subscription status in a separate localStorage key.
 * This allows subscriptions to survive logouts.
 */
export const savePersistentSubscription = (email, status) => {
  if (!email) return;
  const subscriptions = JSON.parse(localStorage.getItem("animeZone_subscriptions")) || {};
  subscriptions[email] = {
    isPremium: status,
    subscriptionDate: status ? new Date().toISOString() : null
  };
  localStorage.setItem("animeZone_subscriptions", JSON.stringify(subscriptions));
};

/**
 * Retrieves persistent subscription status for an email.
 */
export const getPersistentSubscription = (email) => {
  if (!email) return null;
  const subscriptions = JSON.parse(localStorage.getItem("animeZone_subscriptions")) || {};
  return subscriptions[email] || null;
};

/**
 * Calculates the expiration date (30 days after payment).
 * @param {string} startDate - ISO date string
 * @returns {Date}
 */
export const getSubscriptionEndDate = (startDate) => {
  if (!startDate) return null;
  const date = new Date(startDate);
  date.setDate(date.getDate() + 30);
  return date;
};

/**
 * Formats a date to locale string.
 * @param {string|Date} date 
 * @returns {string}
 */
export const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
