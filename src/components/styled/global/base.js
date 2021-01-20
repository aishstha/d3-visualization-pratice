import { css } from "styled-components";
import { colors, shades } from "utils";
import defaults from "utils/theme";
import { images } from "config/index";
import { media } from "./../utils/index";

const { primary, sec } = colors;
const { dark } = shades;
const { fontSize, fontFamily, fontWeight } = defaults;

const base = css`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans:400,700|Work+Sans:400,700&subset=devanagari');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    &:focus {
      outline: 0;
    }
  }

  body {    
    background-color: #091929;
    font: 12px/1.5 'Work Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  p {
    font-size: 16px;
    margin-bottom: 10px;
  }

  a {
    color: #014983;
  }

  button {
    cursor: pointer;
    &:focus {
      outline: 0;
    }
  }

  strong {
    font-weight: ${fontWeight.bold};
  }

  .wrapper {
    color: #fff;
    padding-bottom: 86px;
    ${media.tablet`    
    padding: 0;
    `};
    flex-direction: column;
    ${media.tabletWide`
      flex-direction: row;
    `};
    > div:first-of-type {
      min-height: 100vh;
      width: 100%;  
      ${media.tabletWide`width:60%`}
    }
    > div:last-of-type {
      background-color: ${primary.darkGrey};      
       width: 100%;
      ${media.tabletWide`width:40%; min-height: 100vh;`}
    }
    > div:only-of-type {
      background-color: ${primary.dark};
      width: 100%;
    }
  }

  .container--left {
    padding: 24px 20px 30px;
    ${media.tabletWide`padding: 28px 40px 35px;`};
    .content ul {
    li {
      margin-bottom: 4px;
      position: relative;
      &:before {
        content: '';
        background-color: ${primary.pissYellow};
        border-radius: 50%;
        display: inline-block;
        height: 6px;
        margin-top: 10px;
        margin-right: 10px;
        vertical-align: top;
        width: 6px;
      }
      span {
        display: inline-block;
        width: calc(100% - 18px);
      }
      a {
        color: ${primary.pissYellow};
        text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
      }
    }
  }
  }

  .btn-grey, .selection-wrap {
    background-color: ${primary.darkGrey};
    border-radius: 20px;
    color: ${primary.white};
    margin-left: 5px;
    padding: 7px 30px 7px 10px;
    position: relative;
    &:after {
      border-top: 4px solid ${dark.slateGrey};
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      content: '';
      position: absolute;
      right: 14px;
      top: 13px;
    }
  }

  .selection-wrap {
    display: inline-block;
    padding: 0;
    &:after {
      display: none;
    }
  }
  
  #selection {
    background: transparent;
    border: 0;
    color: ${primary.white};
    font: ${fontWeight.bold} ${fontSize.sm}px ${fontFamily.sansSerif};
    padding: 7px 28px 7px 10px;
    text-transform: uppercase;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  .btn--ghost {
    background-color: transparent;
    border: 1px solid ${primary.pissYellow};
    color: ${primary.white};
    font: ${fontSize.md}px ${fontFamily.sansSerif};
    height: 45px;
    min-width: 142px;
    padding: 10px;
    transition: background-color 0.3s ease-in;
    &:hover {
      background-color: ${primary.pissYellow};
      color: ${primary.darkGrey};
    }
  }

  .charts-block {
    border-bottom: 1px solid ${dark.charcoalGrey};
    padding: 25px 20px 20px;
    ${media.tabletWide`padding: 25px 38px 20px`};
    &:last-child {
      border-bottom: 0;
    }
    h2 {
      margin-bottom: 20px;
    }
  }

  .count {
    display: block;
    font: ${fontWeight.bold} ${fontSize.hg}px ${fontFamily.sansSerif};
    /* margin-top: 12px; */
  }

  text {
    font-family: ${fontFamily.sansSerif};
  }

  // Area Gradient
  .area {
    /* fill: url(#area-gradient) */
  }

  .rectOverlayLineChart {
    fill: rgba(255,255,255,0.3);
  }

  .timeline-svg {
    /* margin: -70px 0 30px; */
  }

  .tooltip {
    background-color: ${primary.pissYellow};
    border-radius: 4px;
    box-shadow: 0 2px 10px 0 #252e3b;
    color: ${primary.darkGrey};
    font-size: ${fontSize.md}px;
    padding: 8px 15px;
    position: relative;
    text-align: center;
    z-index: 10;
    .total-count {
      display: block;
      font-size: 18px;
      font-weight: bold;
      line-height: normal;
    }
  }

  .tooltip-arrow {
      height: 10px;
      left: 50%;
      overflow: hidden;
      position: absolute;
      top: -8px;
      text-indent: -9999px;
      transform: translateX(-50%);
      width: 14px;
      &:before {
        background-color: ${primary.pissYellow};
        content: "";
        position: absolute;
        width: 12px;
        height: 12px;
        transform: translateX(-50%) translateY(-50%) rotate(45deg);
        top: 10px;
        left: 50%;
        box-shadow: 0 2px 6px 0 #252e3b;
    }
    &.right {    
      top: auto;
      bottom: 15%;
      right: -10px!important;
      transform: rotate(-90deg);
      &:before {
        top: auto;
      }
    }
    &.bottom {
      top: calc(100% - 1px);
      bottom: auto;
      transform: translateX(-50%) rotate(180deg);
    }
  }

  #dot-tooltip {
    line-height: 18px;
  }

  #tooltip-map, #tooltip-map-detail {
    .tooltip > div {
      display: flex;
      align-items: baseline;
      text-align: left;
    }
  }

  #tooltip-dashboard-barchart {
    z-index: 1;
  }

  .project-title {
    position: relative;
    &:hover .tooltip {
      display: block;
    }
  }

  .tooltip-dot {
    position: absolute;
    bottom: 0;
    left: 0;
    .tooltip {
      display: none;
    }
  }

  .main-title {
    clear: both;
    font: ${fontWeight.bold} 32px/40px ${fontFamily.sansSerif};
    margin: 20px 0 14px;
   ${media.tabletWide`margin-top: 0; clear: none;`};
  }

  .content {
    font-size: 16px;
    padding: 0;
    ${media.tabletWide`padding: 0 60px 40px 0`};
    p,ol,ul {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 30px;
      }
      p:first-of-type{                 
          font-size: 24px;
          margin: 30px 0 50px;
        }
      }
      ol {
      /* list-style-type: decimal;
      margin-left: 18px; */
      li {
        margin-bottom: 8px;
      }
    }
    /* a {
      color: ${(props) => props.theme.primary.pissYellow};
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    } */
  }

  .about-screenshot {
    background-color: ${primary.dark};
    height: 100%;
    padding-bottom: 30px;
    ${media.tabletWide`padding-top: 100px;`};
    img {
      width: 100%;
    }
  }

  .tags-wrap {
    /* margin: -8px 0 20px; */
    margin: 10px 0 14px;
    overflow: hidden;
  }

  .tags {
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    padding: 2px 10px;
    display: flex;
    float: left;
    margin-right: 9px;
    border-radius: 10px;
    font-size: 11px;
    justify-content: space-between;
    button {
      margin-left: 4px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      padding: 0;
      line-height: 0;
    }
  }

  .remove-keyword {
    position: relative;
    float: right;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.15s ease-in-out;
    margin-left: 10px;
    /* padding: 9px 0; */
    height: 14px;
    width: 14px;
    &:before,&:after {
      content: "";
      height: 8px;
      width: 2px;
      position: absolute;
      top: 50%;
      left: 50%;
      background: rgb(255, 255, 255);
      border-radius: 6px;
    }
    &:before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
    &:after {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    &:hover {
      background: rgba(255,255,255,0.3);
    }
  }

  .remove-filter {
    margin-right: -20px;
    margin-top: -5px;
    height: 20px;
    width: 20px;
    &:before,&:after {
      height: 14px;
      width: 2px;
    }
  }

  .loader {
    /* background: url(${images.icons.loader}) no-repeat center/cover; */
    height: 80px;
    width: 80px;
    position: fixed;
    text-indent: -9999px;
    z-index: 1;
  }

  .spinner-wave {
  width: 60px;
  text-align: center;
  font-size: 10px;
  height: 40px;
}
.spinner-wave > div {
  background-color: ${primary.pissYellow};
  border-radius: 4px;
  height: 100%;
  width: 5px;
  display: inline-block;
  -webkit-animation: spinner-stretchdelay 1.2s infinite ease-in-out;
  animation: spinner-stretchdelay 1.2s infinite ease-in-out;
  margin-right: 3px;
}
.spinner-wave .wave2 {
  -moz-animation-delay: -1.1s;
  -o-animation-delay: -1.1s;
  -ms-animation-delay: -1.1s;
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
.spinner-wave .wave3 {
  -moz-animation-delay: -1s;
  -o-animation-delay: -1s;
  -ms-animation-delay: -1s;
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
.spinner-wave .wave4 {
  -moz-animation-delay: -0.9s;
  -o-animation-delay: -0.9s;
  -ms-animation-delay: -0.9s;
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
/* .spinner-wave .wave5 {
  -moz-animation-delay: -0.8s;
  -o-animation-delay: -0.8s;
  -ms-animation-delay: -0.8s;
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
} */

@-webkit-keyframes spinner-stretchdelay {
  0%, 40%, 100% {
    -moz-transform: scale(1, 0.6);
    -o-transform: scale(1, 0.6);
    -ms-transform: scale(1, 0.6);
    -webkit-transform: scale(1, 0.6);
    transform: scale(1, 0.6);
  }
  20% {
    -moz-transform: scale(1, 1);
    -o-transform: scale(1, 1);
    -ms-transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
}
@keyframes spinner-stretchdelay {
  0%, 40%, 100% {
    -moz-transform: scale(1, 0.6);
    -o-transform: scale(1, 0.6);
    -ms-transform: scale(1, 0.6);
    -webkit-transform: scale(1, 0.6);
    transform: scale(1, 0.6);
  }
  20% {
    -moz-transform: scale(1, 1);
    -o-transform: scale(1, 1);
    -ms-transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
}

.container {
  height: 500px;
}

/* help-text */

.help-text {
  margin-right: 5px;
  position: relative;
  &:hover {
    .help-text__ {
      &icon {
      opacity: 0.8;
    }
    &content {
      opacity: 1;
      visibility: visible;
    }
    }
  }
}

.help-text__ {
  &icon {
    background: url(${images.icons.sprite}) no-repeat -54px -6px;
    border: 1px solid ${primary.white};
    border-radius: 50%;
    cursor: pointer;
    display: inline-block;
    height: 15px;
    opacity: 0.6;
    text-indent: -9999px;
    width: 15px;
  }
  &content {
    font-size: 12px;
    opacity: 0;
    left: -26px;
    padding: 8px;
    position: absolute;
    text-align: left;
    text-transform: none;
    top: 22px;
    visibility: hidden;
    width: 170px;
    .tooltip-arrow {
      left: 20%;
    }
  }
}

.scrollarea .scrollbar-container.vertical {
  background: ${primary.darkGrey}!important;
  border-radius: 20px;
  width: 8px!important;
  .scrollbar {
    background: ${primary.pissYellow}!important;
    border-radius: 20px;
    width: 6px!important;
  }
}

.data-not-available {
  margin-top: 16px;
}

.error-message {
  background-color: ${sec.pink};
  border-radius: 2px;
  color: ${primary.pink};
  margin: -12px 0 14px;
  padding: 4px 6px;
  position: relative;
  .tooltip-arrow {
    left: 20px;
    &:before {
      background-color: ${sec.pink};
    }
  }
}

.circular-progress-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

html.lightbox-open {
  overflow: hidden;
  position: fixed;
  width: 100%;
}

.lightbox-backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0px;
  left: 0px;
  z-index: 100;
}

.lightbox-btn-left,
.lightbox-btn-right,
.lightbox-btn-close,
.lightbox-title-content,
.lightbox-modifiers-box {
  -webkit-transition: opacity 200ms ease;
  -o-transition: opacity 200ms ease;
  transition: opacity 200ms ease;
}

@media (max-width: 767px) {
  .hide-controls .lightbox-btn-left,
  .hide-controls .lightbox-btn-right {
    opacity: 0;
    pointer-events: none;
  }
}

@media (max-height: 599px) {
  .hide-controls .lightbox-btn-close,
  .hide-controls .lightbox-title-content,
  .hide-controls .lightbox-modifiers-box {
    opacity: 0;
    pointer-events: none;
  }
}

.lightbox-btn-close {
  position: fixed;
  left: 0px;
  z-index: 2;
}

.lightbox-btn-right {
  position: absolute;
  top: 50%;
  margin-top: -1.5em;
  right: 0px;
}

.lightbox-btn-left {
  position: absolute;
  top: 50%;
  margin-top: -1.5em;
  left: 0px;
}

@media (min-width: 768px) {
  .lightbox-btn-right {
    padding-right: 10px;
  }

  .lightbox-btn-left {
    padding-left: 10px;
  }
}

.lightbox-title-content {
  background-color: rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
          box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
  position: absolute;
  width: 100%;
  z-index: 1;
  bottom: 0;
  text-align: center;
  padding: 10px;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  line-height: 1.42857143;
}

.lightbox-title {
  color: white;
  display: none;
  font-weight: 600;
  font-size: 16px;
}

.lightbox-description {
  color: #C5C5C5;
  display: none;
  font-size: 14px;
}

.lightbox-transition-image-appear {
  opacity: 0.1;
}

.lightbox-transition-image-appear.lightbox-transition-image-appear-active {
  opacity: 1;
  -webkit-transition: opacity .3s ease-in;
  -o-transition: opacity .3s ease-in;
  transition: opacity .3s ease-in;
}

.lightbox-transition-image-enter-right {
  -webkit-transform: translate(100%);
      -ms-transform: translate(100%);
          transform: translate(100%);
}

.lightbox-transition-image-enter-right.lightbox-transition-image-enter-right-active {
  -webkit-transform: translate(0%);
      -ms-transform: translate(0%);
          transform: translate(0%);
  -webkit-transition: -webkit-transform 300ms ease-in-out;
  transition: -webkit-transform 300ms ease-in-out;
  -o-transition: transform 300ms ease-in-out;
  transition: transform 300ms ease-in-out;
  transition: transform 300ms ease-in-out, -webkit-transform 300ms ease-in-out;
}

.lightbox-transition-image-leave-right {
  -webkit-transform: translate(0%);
      -ms-transform: translate(0%);
          transform: translate(0%);
}

.lightbox-transition-image-leave-right.lightbox-transition-image-leave-right-active {
  -webkit-transform: translate(-100%);
      -ms-transform: translate(-100%);
          transform: translate(-100%);
  -webkit-transition: -webkit-transform 300ms ease-in-out;
  transition: -webkit-transform 300ms ease-in-out;
  -o-transition: transform 300ms ease-in-out;
  transition: transform 300ms ease-in-out;
  transition: transform 300ms ease-in-out, -webkit-transform 300ms ease-in-out;
}

.lightbox-transition-image-enter-left {
  -webkit-transform: translate(-100%);
      -ms-transform: translate(-100%);
          transform: translate(-100%);
}

.lightbox-transition-image-enter-left.lightbox-transition-image-enter-left-active {
  -webkit-transform: translate(0%);
      -ms-transform: translate(0%);
          transform: translate(0%);
  -webkit-transition: -webkit-transform 300ms ease-in-out;
  transition: -webkit-transform 300ms ease-in-out;
  -o-transition: transform 300ms ease-in-out;
  transition: transform 300ms ease-in-out;
  transition: transform 300ms ease-in-out, -webkit-transform 300ms ease-in-out;
}

.lightbox-transition-image-leave-left {
  -webkit-transform: translate(0%);
      -ms-transform: translate(0%);
          transform: translate(0%);
}

.lightbox-transition-image-leave-left.lightbox-transition-image-leave-left-active {
  -webkit-transform: translate(100%);
      -ms-transform: translate(100%);
          transform: translate(100%);
  -webkit-transition: -webkit-transform 300ms ease-in-out;
  transition: -webkit-transform 300ms ease-in-out;
  -o-transition: transform 300ms ease-in-out;
  transition: transform 300ms ease-in-out;
  transition: transform 300ms ease-in-out, -webkit-transform 300ms ease-in-out;
}

.lightbox-content-center {
  width: 100%;
  height: 100%;
  position: absolute;
}

.lightbox-modifiers-box {
  background-color: rgba(0, 0, 0, 0.2);
  text-align: center;
  font-size: 1.2em;
  position: absolute;
  width: 100%;
  z-index: 1;
}

@media (min-height: 600px) {
  .lightbox-modifiers-box {
    background-color: transparent;
  }
}

@media (min-width: 768px) {
  .lightbox-image-container {
    margin: 0 5em;
  }
}

.lightbox-image-container {
  overflow: hidden;
  height: calc(100% - 102px);
  margin-top: 40px;
}

.lightbox-image {
  height: 100%;
  background-repeat: no-repeat;
}

.lightbox-image.moving {
  -webkit-transition: none;
  -o-transition: none;
  transition: none;
}

.lightbox-loader {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
      align-items: center;
  -ms-flex-pack: center;
      justify-content: center;
  height: 100%;
  fill: white;
  -webkit-animation: rotating 2s linear infinite;
          animation: rotating 2s linear infinite;
}

@-webkit-keyframes rotating {
  from {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(-360deg);
            transform: rotate(-360deg);
  }
}

@keyframes rotating {
  from {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(-360deg);
            transform: rotate(-360deg);
  }
}

[type="search"] {
  -webkit-appearance: textfield;
}




`;

export default base;
