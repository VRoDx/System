/*
 * Eyad's system
 * Property of Eyad
 */
const { Database } = require("st.db");
const giveawayDB = new Database("/Json-db/Bots/giveawayDB.json");

const giveawayLocks = {};

async function updateGiveawayAtomic(guildId, messageId, updateFn) {
  const lockKey = `${guildId}_${messageId}`;
  while (giveawayLocks[lockKey]) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  giveawayLocks[lockKey] = true;
  try {
    const giveaways = giveawayDB.get(`giveaways_${guildId}`) || [];
    const giveaway = giveaways.find(g => g.messageid === messageId);
    if (giveaway) {
      const result = updateFn(giveaway);
      await giveawayDB.set(`giveaways_${guildId}`, giveaways);
      return result;
    }
    return null;
  } finally {
    delete giveawayLocks[lockKey];
  }
}

module.exports = { updateGiveawayAtomic };
