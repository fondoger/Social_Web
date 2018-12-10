import React, { Component } from 'react';
import EmojiConvertor from 'emoji-js';
import "../lib/emoji-js.css";

const emoji = new EmojiConvertor();
emoji.img_sets.apple.sheet = 'http://asserts.fondoger.cn/other/emoji_sheet_64.png';
emoji.use_sheet = true;

const EmojiSpan = ({text, ...props}) => {
    const strElement = emoji.replace_unified(text);
    return <span {...props} dangerouslySetInnerHTML={{__html: strElement}} />;
};

export default EmojiSpan;