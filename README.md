# Prepasterous

**PRE**vents**PASTE** events, uhm, which-would-otherwise-be-disast**ROUS**?

## The problem

![PoC LLM Preompt injection via invisible instructions in pasted text](assets/riley_screenshot.png)

Credit: [@goodside](https://twitter.com/goodside/status/1745511940351287394)

## The solution

Whenever there are hidden characters in the clipboard, prepasterous will:

1. Show a warning dialog with the hidden characters made visible;
2. Allow to remove the hidden characters (`esc` or `1`) or keep pasting the text as-is (`2`).

Click + save as: [Package](https://github.com/lumpenspace/prepasterous/raw/main/dist.crx)
