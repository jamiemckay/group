  var firstName;
  var lastName;
  var age;
  function screenStart(){
    document.getElementById("end-screen").style.display = "none";
    document.getElementById("won-screen").style.display = "none";
    document.getElementById("signUp-section").style.display = "block";
    document.getElementById("story-screen").style.display = "none";

  }
  window.onload = screenStart;
  function signUp(event) {

    event.preventDefault();
    

    firstName = document.forms["playerForm"]["firstName"].value;
    lastName = document.forms["playerForm"]["lastName"].value;
    age = document.forms["playerForm"]["age"].value;

    if (firstName == "") {
        alert("First name must be filled out");
        return false;
    };

    if (lastName == "") {
        alert("Second name must be filled out");
        return false;
    };

    if (age == "" || isNaN(age)) {
        alert("Age must be a number");
        return false;
    } else if(age<13){
        alert("You must be 13 or over")
        return false;
    };

    startGame();

  };

let story;
let attempts=0;
let numClicks=0;

fetch('https://raw.githubusercontent.com/jamiemckay/group/main/GROUP_TEST/story.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        story = data;
      });

fetch('http://andymcdowell.hosting.hal.davecutting.uk/1030_APIs/diceroll.php')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        chestRNG = data;
      });

fetch('http://andymcdowell.hosting.hal.davecutting.uk/1030_APIs/coinFlip.php')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        flippedCoin = data;
        console.log(flippedCoin);
      });

      
    
  function startGame(){
  
      
      document.getElementById("background-music").play();
      document.getElementById("signUp-section").style.display = "none";
      document.getElementById("story-screen").style.display = "block";
      document.getElementById("end-screen").style.display = "none";
      document.getElementById("won-screen").style.display = "none";


      let time = 30;
      const timer = setInterval(() => {
            time--;
            document.getElementById("timer").textContent = `Time: ${time}s`;
            if (time === 0) {
                clearInterval(timer);
                document.getElementById("story-screen").style.display = "none";
                document.getElementById("end-screen").style.display = "block";
                document.getElementById("end-reason").innerHTML = "You ran out of time!";
            }
            }, 1000);

      function Adventure1(currentLocation){
        
         
          document.getElementById("end-screen").style.display = "none";
          document.getElementById("won-screen").style.display = "none";
          document.getElementById("story-screen").style.display = "block";
          console.log(currentLocation);

          const option1Btn = document.getElementById("option1");
          const option2Btn = document.getElementById("option2");

          document.getElementById("option1").innerHTML=story[currentLocation].option1.option;
          document.getElementById("option2").innerHTML=story[currentLocation].option2.option;
          document.getElementById("quest").innerHTML=story[currentLocation].story;
          document.getElementById("quest").innerHTML = story[currentLocation].story.replace("{name}", firstName);
          document.getElementById("story-image").src=story[currentLocation].story_img;

        

          function end(){
            time = 30; // Add this line to reset the timer
            document.getElementById("story-screen").style.display = "none";
            document.getElementById("end-screen").style.display = "block";
            //add json file make reason accessable without knowing the button number
            document.getElementById("end-reason").innerHTML = story[currentLocation].reason;
            console.log(story[currentLocation].reason);
            const againBtn = document.getElementById("try-again-button");
            againBtn.addEventListener("click", function(){
                  Adventure1("start");
            });

          };

          function won(){
                  document.getElementById("story-screen").style.display = "none";
                  document.getElementById("won-screen").style.display = "block";
                  document.getElementById("num-clicks").innerHTML = numClicks;
                  document.getElementById("num-attempts").innerHTML = attempts;
                  document.getElementById("time-taken").innerHTML =30-time;
                  clearInterval(timer);

          };


//THERE IS DEFINATELY A WAY TO CONDENSE THIS CODE, USING A FUNTION PASS THROUGH THEN USE THAT PARAM 
          console.log(attempts);
          console.log(numClicks);

          option1Btn.addEventListener("click",  function() {
              
              numClicks++;

              if(currentLocation==="coinToss"){
                 if(story[currentLocation].option1.option===flippedCoin.coinFlip){
                      won();
                    //  WILL RUN BATTLE FUNCTION
                 }
                 else{
                      end();
                 }
              }
              else if(story[currentLocation].option1.location=="end"){
                  end();

              }
              else if(story[currentLocation].option1.location=="won"){
                  won();

              }else{
                  Adventure1(story[currentLocation].option1.location);
              }
          });

          option2Btn.addEventListener("click", function() {
                numClicks++;

                if(currentLocation==="coinToss"){
                    if(story[currentLocation].option1.option===flippedCoin.coinFlip){
                        won();
                    //  WILL RUN BATTLE FUNCTION
                    }
                    else{
                        end();
                    }
                }
                else if(story[currentLocation].option2.location=="end"){
                     end();
                      
                }else if(story[currentLocation].option2.location=="won"){
                     won();

                }else{
                     Adventure1(story[currentLocation].option2.location);
                }
              
          });




      }
      
      Adventure1("start");          

}
