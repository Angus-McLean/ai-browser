
# AI Browser
> Surfin' the Interwebs with voice and trainable AI

![](/public/img/ai.gif)

##Sale Pitch
- Perform basic browser navigation actions
- Interact with each website a little differently
- Is the AI missing something? Teach it your self!
- Tell it what you want to do and then demonstrate how to do it!

## Try it out!
- git clone the repo
- bower install
- Chrome > Settings > Extensions > Developer Mode
- Load unpacked extension
- Happy Browsing :)

## App Structure
- Background script listens to audio and recognizes text
- The text is taken and then sent to Mix.nlu for interpretation
- Interpretation is done on a number of models simultaneously
