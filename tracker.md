Now I know that the browser works and that vite is responding correctly, I have tested this by passing the previous code for the player from the game-game-game project to make it possible to tell. I have also copy and pasted the code for gameObject, game and main to spare myself the hassel of writing it myself.

I need to fix the bug where wen the player goes verticaly into a corner so that both x and y is registered.

New bug, when player goes into corner, if the player isn't fully in the corner it first sends it to the other side and then it makes the player move so that it extends in both x and y, which then makes the player reach the other end of the screen bounds. (this is now a feature)
