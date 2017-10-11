$(() => {

  let $userArray = [];
  let $squareSequence = [];
  let delay = 100;
  let pattern = 3;
  const $level = $('.level');
  let level = 0;
  let score = 0;
  const $score = $('.score');
  const $matchStatus = $('.matchStatus');
  const $square = $('.square');
  const $lis = $('li');
  const $button = $('button');
  let colors = [ '#9C89B8', '#F0A6CA','#EFC3E6', '#F0E6EF', '#B8BEDD'];
  const originColor = '#FE938C';
  let randomColor = [];

  $button.on('click', play);

  function play(){
    console.log('squaresequence just clicked on play',  $squareSequence);
    $matchStatus.css('display', 'block').text('Play!');
    setTimeout(()=>{
      $matchStatus.css('display', 'none');
    },500);
    setTimeout(()=>{
      computerPlay();
      $button.css('display', 'none');
    }, 500);
  }

  function computerPlay(){
    console.log('squaresequence computerplay has been called',  $squareSequence);
    function shuffleLis(){
      console.log('am I not being called???');
      for (let i = 0; i < pattern; i++){
        $squareSequence.push(Math.floor(Math.random()* 8)+1);
      }
    }
    shuffleLis();
    console.log('squaresequence now should be full riiiight???',  $squareSequence);
    for (var j = 0; j < pattern; j++) {
      const newRandom = Math.floor(Math.random() * colors.length);
      randomColor.push(colors[newRandom]);
      colors.splice(newRandom, 1);
    }
    colors = ['#899D78', '#F0BCD4','#DA4167', '#8A1C7C', '#1F0322'];
    for (var i = 0; i < $squareSequence.length; i++) {
      const colorToAssign = randomColor[i];
      const singleSquare =$lis[$squareSequence[i]];
      setTimeout(() => {
        $(singleSquare).css('background-color', `${colorToAssign}`).fadeIn(100).fadeOut(100).fadeIn(100);
      }, delay);
      delay += 500;
    } clearDisplay();
  }


  function clearDisplay(){
    for (var i = 0; i < $lis.length; i++) {
      const singleSquare = $lis[i];
      setTimeout(() => {
        $(singleSquare).css('background-color', `${originColor}`);
      },  2000);
    }
  }

  userPlay();

  function userPlay(){
    $square.off('click');
    $square.on('click', function(){
      $(this).css('background-color','#9C89B8').fadeIn(500).fadeOut(500).fadeIn(200);
      console.log(this);
      $userArray.push(parseInt($(this).attr('id')));
      if($userArray.length === pattern){
        console.log($userArray);
        comparison();
      } else{
        console.log('keep clicking!');
      }
    });
  }

  function comparison(){
    const arr1 = $userArray.toString();
    const arr2 = $squareSequence.toString();
    if (arr1 === arr2){
      setTimeout(() => {
        $matchStatus.css('display', 'block').text('IT\'S A MATCH!');
        $score.text(`${score += 1}`);
      }, 1000);
      setTimeout(()=> {
        $matchStatus.css('display', 'none');
        clearDisplay();
        reset();
      }, 2000);
      setTimeout(()=>{
        play();
      },4000);
    } else {
      $matchStatus.css('display', 'block').text('GAME OVER');
      setTimeout(()=>{
        $matchStatus.css('display', 'none');
        gameReset();
      }, 2000);
    }
  }



  function reset (){
    if (score % 4 === 0 ){
      pattern += 1;
      level+=1;
      $matchStatus.text('');
      delay = 0;
      $level.text(`${level}`);
      $userArray = [];
      $squareSequence =[];
      randomColor = [];
    }else {
      $matchStatus.text('');
      delay = 0;
      $level.text(`${level}`);
      $userArray = [];
      $squareSequence =[];
      randomColor = [];
    }
  }
  function gameReset(){
    console.log('game over - reset game');
    console.log('squaresequence just after reset',  $squareSequence);
    clearDisplay();
    $score.text('0');
    $level.text('0');
    $matchStatus.text('Try Again!');
    score = 0;
    level = 0;
    pattern = 3;
    delay = 0;
    $userArray =[];
    $squareSequence =[];
    console.log('squaresequence now I emptied it',  $squareSequence);
    randomColor=[];
    $button.css('display', 'block');

  }


});
