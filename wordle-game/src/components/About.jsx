import React from 'react';

const About = () => {
  return (
    <div >
      <h1>About Wordle Game</h1>
      <p className='about'>
        Welcome to my wordle game. This is an school assignment where we are suppose to make a game in fullstack.<br/><br/>
        In my game you can make guesses from 3 to 10 letters. You can also set if you want to allow repeating letters. <br/><br/>
        When you finish the game you can submit your score to the highscores. <br/><br/>
        Redirect yourself to the highscores page to see where in the list you are.<br/><br/>
        Here you can see your name,  the score, which is how many guesses you made it in, how long time it took, <br/><br/>
        what kind of words you guessed, how many letters you choose to use and if you allow repetition.<br/><br/>
      </p>
    </div>
  );
};

export default About;