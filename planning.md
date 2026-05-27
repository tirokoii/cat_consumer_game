# Basic game idea
Cat that grows longer for each thing it eats

Basically snake but with cat

# My needs

I need a x position, y position
A function to move in x and y depending on the input of keys

I need something to handel the inputs.

I need a class for game, input handler, basic gameObject that all following classes can follow: player, item I also need another class called PlayerPart for the extentions of the player.

I need something that can keep track of time elapsed and a menu that you can interact with, could probably use game-game-game code as base for both things. Time elapsed should probably be in the game class.

I think depending on if you want to or not, you can have a main class that handles drawing out all of the frames, and keeping track of which frame your at.


# Classes
## GameObject

The game object is a class that all other objects in the game inherit variables from. ALL objects IN the game. Then I need:

- reference to the game class that handles the game
- x- and y-postion
- width and height

In the classes the only thing I need to know is if the player and an item is intersecting with eachother in any way.

## Game

The game class is more abstract, but from my common knowledge the game class should handle all objects, decide on the games resolution and decide where everything should go. Basicallly it holds all information of what the game is supposed to be like. This is also where the game is updated and drawn.

I wonder if I can make the game be cut into equally sized pieces so that I can pin the player to a path, so that it can only go into specifc groves. 
Like this:
| | | | 
| | | | 
| | | | 
NOPE!

The game should handle if player goes outside of the screen and "respawn" it on the other side.

The game should also handle placing out the items and keeping track of how many there are, + spawn new ones. I somehow need to make it so that items cannot spawn outside or right on the egde of the screenbounds. Maybe just making the value I put into randSpawner (-) minus the items width and height, then it can work?

## Player

I need to make it so that the player moves one "tile" on the board per input, I also need to make it so that the player can only move in one direction per tile, they shouldn't be able to go vertically. I think what I have to do is just not change the velocity since the cat snake is never supposed to stop moving, and I just change the x and y direction depending on the input.
(The cat can go in vertical anyways... bother changing it...)

I want the player to snatch onto one of the placed out invisible tiles in the board. How to do that. Maybe I should make a list with the possible board positions? Mayhaps
NOPE!

How do I snap the player too the board tiles while still moving it forwards smoothly? Do I need to save the lastX and lastY to snap player?
NOPE!

Maybe I should just leave it be... Focus on the playerParts instead, probably...

Hmm, I think by having a list or a number that increases for each thing that you eat could work, then draw out each extension of the cat snake. How am I supposed to make it so that the cat snakes body parts move in the same path as the cat? Big brain big bro, make it so that the part coming after the always needs to follow the part that comes before, so when the head turns the part after gets the same direction as it's "parent", so it sort of like a parent child relationship.

For the player I also need to control when it reaches the edge of the game and which edge it has reached to then send it to the other side of the canvas. I think I can reuse some of the logic that game-game-game had for handling when something intersects.

For now it only needs a basic square color, but later I really wanna add a sprite for the cat centipied and a cool background.

But what are the basics I need:

- SPEED
- velocityX, velocityY
- directionX
- directionY
- catLength

## PlayerPart

The player part is the extension of the player, the so called lengths och part. It should have the same color, width and height as the main part of the player, but only be an extentsion. I want the player part to adapt to the piece coming before it by taking on its direction.
Can I first loop through the catParts so that I can fetch the parent to the child and then according to its index update the piece coming after it?
By then adding in a variable parentDirection into the update function i can update it with parent position in mind.

In game I need to tell player that they should add a cat legth.
So the basics that I can for the moment get is:



- SPEED
- directionX
- directionY
- inheritedDirection

## items

I want the player to eat/pick up items to grow longer to do that I want to be able to spawn items and generate them randomly within the "game field".
For the item I need them to be able to spawn randomly and delete them. (maybe I should make the game handle that?)

So what variables I need:

- spawnpoint (which is randmoized)
- color
- SPEED

# Other useful things
## Main

Where the canvas is cleared and deltatime is counted
