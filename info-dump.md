What does "private": true do?
What does "preview": "vite perview" do?

The way that making a game with vite and js works:

GameObject (base that all objects in game inherit) -> Player + item (creates a player and item + their spawnpoints depending on info) -> Game (Controls all the objects in the game and save their info + send info into ctx function via the objetcs own draw function) -> main (creates a set up function and sets a deltatime, clears the canvas for the next frame and creates a game loop.) 