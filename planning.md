# Basic game idea
Cat that grows longer for each thing it eats

Basically snake but with cat

# My needs

I need a x position, y position
A function to move in x and y depending on the input of keys

I need something to handel the inputs

I need a class for game, input handler, basic gameObject that all following classes can follow: player, item

I think depending on if you want to or not, you can have a main class that handles drawing out all of the frames, and keeping track of which frame your at.


# Classes
## GameObject

The game object is a class that all other objects in the game inherit variables from. ALL objects IN the game. Then I need:

- reference to the game class that handles the game
- x- and y-postion
- width and height

In the classes the only thing I need to know is if the player and an item is intersecting with eachother in any way.

## Game

The game class is more abstract, but from my common knowledge the game class should handle all objects, decide on the games resolution and decide where everything should go. Basicallly it holds all information of what the game is supposed to be like. This is also where the game is updated and drawn


# Other useful things
## Main/DrawingBoard

I think I'll choose to call main my DrawingBoard since it is where the canvas is painted, so we can see the things being drawn.