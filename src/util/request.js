/**
 * Util function to get questions
 */
export const getQuestion = async () => {
  try {
    const res = await fetch('./questions.json');
    return await res.json();
  }
  catch (err) {
    return console.log('Failed to parse: ', JSON.stringify(err));
  }
}
