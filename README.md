# Prepasterous

**PRE**vents**PASTE** events, uhm, which-would-otherwise-be-disast**ROUS**?

## The problem

![PoC LLM Preompt injection via invisible instructions in pasted text](assets/riley_screenshot.png)

Credit: [@goodside](https://twitter.com/goodside/status/1745511940351287394)

## The solution

Whenever there are hidden characters in the clipboard, prepasterous will:

1. Show a warning dialog with the hidden characters made visible;
2. Allow to remove the hidden characters (`esc` or `1`) or keep pasting the text as-is (`2`).

Here's how it looks.

https://github.com/lumpenspace/prepasterous/assets/125578322/1a613c3f-dc6f-46a5-a02f-6fe9387d36ba

## Get it

You'll havre to download the thing, and then load the [/dist](https://github.com/lumpenspace/prepasterous/tree/main/dist) directory in [chrome://extensions](chrome://extensions) under "Load unpacked", like so:

<img width="953" alt="adobe-dingboard" src="https://github.com/lumpenspace/prepasterous/assets/125578322/fe0a0cee-7cb6-45a4-b512-13697864c3e3">
