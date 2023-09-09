const stringSimilarity = require('string-similarity');

const handleSimilarityScores =  (attendeeRoster, participants) => {
  const maxSimilarityScores = [];
  let count = 0;

  attendeeRoster.forEach(attendee => {
    let maxSimilarity = 0;
    let matchName = "";
    count++;

    participants.forEach(participant => {
      const similarity = stringSimilarity.compareTwoStrings(String(attendee.screenName.toLowerCase()), String(participant.screenName.toLowerCase()));
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        matchName = participant.screenName;
      }
    });

    maxSimilarityScores.push({ index: count, attendeeName: attendee.screenName, participantId: attendee.participantId, matchName: matchName, maxSimilarity });

    
  });

  return maxSimilarityScores;
};

module.exports = {
  handleSimilarityScores,
}