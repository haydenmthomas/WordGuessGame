//CLASSES
//Initializes the person class
class Person{
    firstName = "";
    lastName = "";
    age = 0;

    constructor(fName, lName){
        this.firstName = fName;
        this.lastName = lName;
    }
}

//Initializes the contestant class
class Contestant extends Person{
    numberOfGamesPlayed;
    totalNumberOfGuesses;
    gamesPlayed = [];
    
    constructor(fName, lName, age){
        super(fName, lName, age);
        this.numberOfGamesPlayed = 0;
        this.totalNumberOfGuesses = 0;
    }

    //Checks to see if the game is finished and returns a statment if the game is finished or not
    showResults(){
        if (this.gamesPlayed[this.gamesPlayed.length - 1].finishedGame === true){
        return ("<strong>" + this.getFullName() + " has made " + this.totalNumberOfGuesses + " guesses." + "</strong>");
    }
    else{
        return ("<strong>" + this.getFullName() + " has not finished a game." + "</strong>");
    }
    }

    //Returns the contestant's full name
    getFullName(){
        return this.firstName + " " + this.lastName;
    }

    //Adds to the total number of guesses
    addTotalGuesses(numGuesses){
        this.totalNumberOfGuesses += numGuesses;
    }

    //Calculates the number of games played
    calcGamesPlayed(){
        this.numberOfGamesPlayed = this.gamesPlayed.length();
    }

    //Gets the total number of guesses
    getTotalGuesses(){
        return this.totalNumberOfGuesses;
    }
}

//Creates the games played class
class GamesPlayed{
    guessCount;
    finishedGame;

    constructor(){
        this.guessCount = 0;
        this.finishedGame = false;
    }

    //Adds guesses for each game
    addGuess(numGuesses){
        this.guessCount += numGuesses;
    }

    //Gets the guesses for each game
    getGuesses(){
        return this.guessCount;
    }

    //Sets games to finished
    setFinished(){
        this.finishedGame = true;
    }
}

//GLOBAL VARIABLES
// This array contains the songs with spaces removed
let asSongs = ["rocklobster", "peoplearepeople", "onceinalifetime", "sweetdreams", "missionaryman", "safetydance", "onlyalad", "whipit", "99redballoons"];
let aoContestants = [];
const sOriginalChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
let sAvailableChar = sOriginalChar;
let sUsedChar = "";
let iContestantCounter = -1;
let iGameCounter;
let iGuessCounter = 0;

//FUNCTIONS
function ResetMe(){

    //Resets local storage, contestants, display characters, and used characters
    localStorage.clear();
    aoContestants = [];
    sAvailableChar = sOriginalChar;
    sUsedChar = "";

    //Resets everything to the opening page
    document.getElementById("btnPlayGame").style.display = "inline";
    document.getElementById("btnPlayAgainSame").style.display = "none";
    document.getElementById("btnPlayAgainDiff").style.display = "none";
    document.getElementById("displayTitleName").style.display = "none";
    document.getElementById("titleNote").style.display = "none";
    document.getElementById("fsAvailable").style.display = "none";
    document.getElementById("fsUsed").style.display = "none";
    document.getElementById("fsPlay").style.display = "none";
    document.getElementById("nameTitle").innerHTML = "";
    document.getElementById("winLoseStatement").innerHTML = "";
    document.getElementById("content").style.border = "";
    document.getElementById("topbuttons").style.height = "";

    return;
}

function playGame(){

    //playGame() variables
    let sFirstName = "";
    let sLastName = "";
    let oContestant = new Contestant;
    let oGame = new GamesPlayed;
    let sDisplay = "";
    let sNameStatement = "";

    //Sets game counter to negative 1 for index purposes
    iGameCounter = -1;

    //Prompts to ask for first and last name
    sFirstName = prompt("First Name: ");
    if (sFirstName === ""){
        while (sFirstName === ""){
            sFirstName = prompt("First Name: ");
        }
    }

    sLastName = prompt("Last Name: ");
    if (sLastName === ""){
        while (sLastName === ""){
            sLastName = prompt("Last Name: ");
        }
    }

    if (sFirstName === "" | sLastName === ""){
        ResetMe();
        return;
    }

    //Sets name variables for contestants and adds it to the array of contestants
    oContestant.firstName = sFirstName;
    oContestant.lastName = sLastName;
    aoContestants.push(oContestant);

    //Increases game counter
    iContestantCounter++;
    iGameCounter++;

    //Puses game object to games object based on specific contestant
    aoContestants[iContestantCounter].gamesPlayed.push(oGame);

    //Hides unneeded buttons and displays needed buttons
    document.getElementById("btnPlayAgainSame").style.display = "none";
    document.getElementById("btnPlayAgainDiff").style.display = "none";
    document.getElementById("btnPlayGame").style.display = "none";
    document.getElementById("displayTitleName").style.display = "block";
    document.getElementById("titleNote").style.display = "inline";
    document.getElementById("fsAvailable").style.display = "inline";
    document.getElementById("fsUsed").style.display = "inline";
    document.getElementById("fsPlay").style.display = "inline";
    document.getElementById("content").style.border = "5px solid #420039";
    document.getElementById("nameTitle").innerHTML = "";
    document.getElementById("winLoseStatement").innerHTML = "";
    document.getElementById("finalGuess").value = "";

    //Shows the available characters
    document.getElementById("availableChars").innerHTML = sAvailableChar;

    //Picks a random song title
    iSong = Math.floor(Math.random() * (asSongs.length + 1));
    let sSong = asSongs[iSong];

    //Sets the song name to local storage for safety purposes
    localStorage.setItem("song", sSong);

    //Sets the display to the number of characters in the song title
    for (let iCount = 0; iCount < sSong.length; iCount++){
        sDisplay = sDisplay + "_";
    }

    sNameStatement = "Welcome " + aoContestants[iContestantCounter].firstName;

    //Displays the spaces for which the user is to guess
    document.getElementById("displayTitleName").innerHTML = sDisplay;
    document.getElementById("inputLetter").focus();
    document.getElementById("nameTitle").innerHTML = sNameStatement;
    document.getElementById("topbuttons").style.height = 0;
}

function checkGuess(){

    //checkGuess() variables
    let sSong;
    let iCount;
    let iLetterIndex;
    let sDisplaySong = document.getElementById("displayTitleName").innerHTML;
    let sGuess = document.getElementById("inputLetter").value;
    let oGame = aoContestants[iContestantCounter].gamesPlayed[iGameCounter];

    //Checks to see if the the contestants guess is in the available characters
    if (document.getElementById('availableChars').innerHTML.includes(sGuess.toUpperCase())){
        sSong = localStorage.getItem("song");

        //Checks to see if the the contestants guess is in the song name
        if (sSong.includes(sGuess.toLowerCase())){
            iLetterIndex = [];

            //Iterates to get the index of letters
            for (iCount = 0; iCount < sSong.length; iCount++){
                if (sSong[iCount] == sGuess.toLowerCase()){
                    iLetterIndex.push(iCount);
                }
            }

            //Iterates through each index to fill in the letter/number for each position
            for (iCount = 0; iCount < iLetterIndex.length; iCount++){
                iIndex = iLetterIndex[iCount];
                sDisplaySong = sDisplaySong.substring(0, iIndex) + sGuess.toUpperCase() + sDisplaySong.substring(iIndex + 1);
            }

            //Display that letter
            document.getElementById("displayTitleName").innerHTML = sDisplaySong;
        }

        //Updates available characters for the available and used characters
        sAvailableChar = sAvailableChar.toString().replace(sGuess.toUpperCase(), "");
        document.getElementById("availableChars").innerHTML = sAvailableChar + "<br>";
        sUsedChar += sGuess.toUpperCase();
        document.getElementById("usedChars").innerHTML = sUsedChar + "<br>";

        //Addes guess to the game object
        oGame.addGuess(1);
    }
    //If the letter is used lets you know
    else if (sOriginalChar.toString().includes(sGuess.toUpperCase())){
        alert("This letter was used.");
    }
    //If the letter is not vaild, lets you know
    else{
        alert("Not a valid input.");
    }

    //Brings focus on the input letter section
    document.getElementById("inputLetter").select();

    checkWin();
}

function checkWin(){

//At the end of Check win add to iGameCount
    let oGame = aoContestants[iContestantCounter].gamesPlayed[iGameCounter];
    let oContestant = aoContestants[iContestantCounter];
    let sDisplaySong = document.getElementById("displayTitleName").innerHTML;
    let sUsedChars = document.getElementById("usedChars").innerHTML;
    let sWinLoseStatement;

    //Checks to see if there are any blanks and used characters to check if you win
    if (sDisplaySong.includes("_") == false && sUsedChars.length < 26){
        sWinLoseStatement = "You solved it with " + oGame.getGuesses() + " of guesses!"
        alert(sWinLoseStatement);
        document.getElementById("winLoseStatement").innerHTML = sWinLoseStatement;

        oGame.setFinished();
        oContestant.addTotalGuesses(oGame.getGuesses());

        sAvailableChar = sOriginalChar;
        sUsedChar = "";

        //Clears the screen and shows the play again buttons
        document.getElementById("availableChars").innerHTML = sAvailableChar;
        document.getElementById("usedChars").innerHTML = sUsedChar;
        document.getElementById("fsAvailable").style.display = "none";
        document.getElementById("fsUsed").style.display = "none";
        document.getElementById("fsPlay").style.display = "none";
        document.getElementById("btnPlayAgainSame").style.display = "inline";
        document.getElementById("btnPlayAgainDiff").style.display = "inline";
    }
    //If the number of used characters is over 26
    else if (sUsedChar.length >= 26){
        sWinLoseStatement = "You took too many guesses."
        alert(sWinLoseStatement);
        document.getElementById("winLoseStatement").innerHTML = sWinLoseStatement;

        oGame.setFinished();
        oContestant.addTotalGuesses(oGame.getGuesses());

        sAvailableChar = sOriginalChar;
        sUsedChar = "";

        //Clears the screen and shows the play again buttons
        document.getElementById("availableChars").innerHTML = sAvailableChar;
        document.getElementById("usedChars").innerHTML = sUsedChar;
        document.getElementById("fsAvailable").style.display = "none";
        document.getElementById("fsUsed").style.display = "none";
        document.getElementById("fsPlay").style.display = "none";
        document.getElementById("btnPlayAgainSame").style.display = "inline";
        document.getElementById("btnPlayAgainDiff").style.display = "inline";
    }
    //If there is anything else that happens, it just ends
    else{
        document.getElementById("inputLetter").value = "";
        document.getElementById("inputLetter").focus();
        return;
    }

    sUsedChars = "";
    document.getElementById("inputLetter").value = "";
    document.getElementById("inputLetter").focus();
    document.getElementById("topbuttons").style.height = "";
}

function finalGuess(){

    //finalGuess() variables
    let sFinalGuess = document.getElementById("finalGuess").value;
    let sSong = localStorage.getItem("song");
    let oGame = aoContestants[iContestantCounter].gamesPlayed[iGameCounter];

    //Changes to string and to uppercase
    sFinalGuess = sFinalGuess.toString().toUpperCase();
    sSong = sSong.toString().toUpperCase();

    //If the guess is the same as the song, changes the display title and adds one guess
    if (sFinalGuess === sSong){
        document.getElementById("displayTitleName").innerHTML = sSong;
        oGame.addGuess(1);
    }
    //If not, alets you and adds 26 to guess count
    else{
        alert("That is incorrect!")
        oGame.addGuess(26);
    }

    //Sets game object as finished
    oGame.setFinished();

    checkWin();
}

function playAgain(){

    //playAgain() variables
    let sDisplay = "";
    let iSong;
    let sNameStatement = "";

    //Increases game counter for contestant and sets used characters
    iGameCounter++;
    sUsedChar = "";

    //Hides unneeded buttons and displays needed buttons
    document.getElementById("btnPlayAgainSame").style.display = "none";
    document.getElementById("btnPlayAgainDiff").style.display = "none";
    document.getElementById("btnPlayGame").style.display = "none";
    document.getElementById("displayTitleName").style.display = "block";
    document.getElementById("titleNote").style.display = "inline";
    document.getElementById("fsAvailable").style.display = "inline";
    document.getElementById("fsUsed").style.display = "inline";
    document.getElementById("fsPlay").style.display = "inline";

    //Shows the available characters
    document.getElementById("availableChars").innerHTML = sAvailableChar;

    //Picks a random song title
    iSong = Math.floor(Math.random() * (asSongs.length + 1));
    let sSong = asSongs[iSong];

    //Saves sSong to local storage
    localStorage.setItem("song", sSong);

    //Sets the display to the number of characters in the song title
    for (let iCount = 0; iCount < sSong.length; iCount++){
        sDisplay = sDisplay + "_";
    }

    sNameStatement = "Welcome " + aoContestants[iContestantCounter].firstName;

    //Displays the spaces for which the user is to guess
    document.getElementById("displayTitleName").innerHTML = sDisplay;
    document.getElementById("inputLetter").focus();
    document.getElementById("nameTitle").innerHTML = sNameStatement;
    document.getElementById("topbuttons").style.height = 0;
}

function showGames(){

    //showGames() variables
    let iHoldPlace;
    let iOutCount;
    let iInCount;
    let sOut = "";

    //Bubble sorts all the games by guesses
    for (iOutCount = 0; iOutCount < aoContestants.length; iOutCount++){
        for (iInCount = iOutCount + 1; iInCount < aoContestants.length; iInCount++){
            if (aoContestants[iOutCount].getTotalGuesses() < aoContestants[iInCount].getTotalGuesses()){
                iHoldPlace = aoContestants[iInCount];
                aoContestants[iInCount] = aoContestants[iOutCount];
                aoContestants[iOutCount] = iHoldPlace;
            }
        }
    }

    //Creates output statement
    for (let iCount = 0; iCount < aoContestants.length; iCount++){
        sOut += aoContestants[iCount].getFullName() + " " + aoContestants[iCount].totalNumberOfGuesses + " guesses." + "<br>";
    }

    //Saves output statement to local storage
    localStorage.setItem("output", sOut);

    //opens a new window
    window.open("gameOutput.html");

    return;
}