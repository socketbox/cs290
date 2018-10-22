var Timothy = { name: "Timothy Leary" };

//function speak(dialog)
Timothy.speak = function(dialog) {
  console.log( this.name + ' says "' + dialog + '"');
}

Timothy.speak("This is Acid.");

