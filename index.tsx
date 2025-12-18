
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { 
  Loader2, 
  Copy, 
  Check, 
  Sparkles, 
  GraduationCap, 
  RefreshCcw, 
  Wand2, 
  X, 
  Sun, 
  Moon, 
  ArrowRight, 
  ArrowLeft,
  ChevronRight,
  User,
  Zap,
  Target,
  MessageSquare
} from 'lucide-react';

const Logo = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 258 271" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    <path d="M0 0 C2.91999805 1.47704181 5.51201152 3.32384803 8.1328125 5.265625 C9.04317261 5.92836426 9.04317261 5.92836426 9.97192383 6.60449219 C11.29268329 7.56607295 12.61170809 8.53003979 13.92919922 9.49609375 C16.03272434 11.03383633 18.14547961 12.55793503 20.26171875 14.078125 C28.13274937 19.73417024 35.96250283 25.44317899 43.7578125 31.203125 C50.26225933 36.00902096 56.80319355 40.7556621 63.39453125 45.44140625 C67.73772961 48.53036648 72.0608579 51.64703989 76.3828125 54.765625 C77.48894897 55.56238647 77.48894897 55.56238647 78.61743164 56.37524414 C80.04238503 57.40404666 81.46521642 58.43579572 82.88574219 59.47070312 C84.36037207 60.54427168 85.84062581 61.6101407 87.32519531 62.66992188 C88.05834961 63.20166016 88.79150391 63.73339844 89.546875 64.28125 C90.21154785 64.75852539 90.8762207 65.23580078 91.56103516 65.72753906 C92.03847168 66.15260742 92.5159082 66.57767578 93.0078125 67.015625 C93.0078125 67.675625 93.0078125 68.335625 93.0078125 69.015625 C90.77075195 70.59692383 90.77075195 70.59692383 87.62109375 72.47265625 C87.05679657 72.81175018 86.49249939 73.15084412 85.91110229 73.50021362 C84.0513426 74.61606944 82.18581307 75.72189865 80.3203125 76.828125 C78.37891769 77.99040722 76.43910094 79.15529437 74.49928284 80.32020569 C73.19400387 81.10373215 71.8882041 81.88639163 70.58189392 82.66819763 C65.08563608 85.95886974 59.63259971 89.31590156 54.1953125 92.703125 C46.99043021 97.18115706 39.75880433 101.61265254 32.5078125 106.015625 C24.73831984 110.73439773 16.98702569 115.4811294 9.2578125 120.265625 C8.37029297 120.81476563 7.48277344 121.36390625 6.56835938 121.9296875 C3.35373519 123.92270391 0.15522094 125.9173527 -2.9921875 128.015625 C-8.29519344 127.97754237 -12.13205453 124.3075698 -16.1796875 121.265625 C-17.79928903 120.07135669 -19.41908608 118.87735349 -21.0390625 117.68359375 C-21.86341797 117.07177246 -22.68777344 116.45995117 -23.53710938 115.82958984 C-27.30868064 113.04291775 -31.12082915 110.31346687 -34.9296875 107.578125 C-41.14620238 103.09621503 -47.32795247 98.56911779 -53.4921875 94.015625 C-59.68034493 89.44578231 -65.88329359 84.89791838 -72.1171875 80.390625 C-72.84534668 79.86291504 -73.57350586 79.33520508 -74.32373047 78.79150391 C-78.15118832 76.027748 -82.00376792 73.30896666 -85.8984375 70.640625 C-86.68976074 70.09486816 -87.48108398 69.54911133 -88.29638672 68.98681641 C-89.81283469 67.94383967 -91.33510117 66.90925928 -92.86376953 65.88427734 C-94.62688891 64.66910327 -96.31803444 63.35070909 -97.9921875 62.015625 C-97.9921875 61.025625 -97.9921875 60.035625 -97.9921875 59.015625 C-96.2265625 57.64038086 -96.2265625 57.64038086 -93.7421875 56.23046875 C-92.83243164 55.70541748 -91.92267578 55.18036621 -90.98535156 54.6394043 C-89.99760742 54.08293213 -89.00986328 53.52645996 -87.9921875 52.953125 C-85.94440647 51.77240331 -83.8975351 50.5901026 -81.8515625 49.40625 C-80.84287109 48.82552734 -79.83417969 48.24480469 -78.79492188 47.64648438 C-75.22926222 45.57169287 -71.72676311 43.41058902 -68.2421875 41.203125 C-61.39631415 36.88444987 -54.51287571 32.62931962 -47.6171875 28.390625 C-45.97266602 27.37923462 -45.97266602 27.37923462 -44.29492188 26.34741211 C-39.05102545 23.12311418 -33.80584095 19.90092448 -28.55929565 16.68093872 C-26.18960702 15.22631834 -23.82044464 13.77084224 -21.45135498 12.31524658 C-19.78271779 11.29051517 -18.11329236 10.26706767 -16.44384766 9.24365234 C-15.42339355 8.61668457 -14.40293945 7.9897168 -13.3515625 7.34375 C-12.40732422 6.76560547 -11.46308594 6.18746094 -10.49023438 5.59179688 C-8.43168596 4.29293169 -6.47161946 2.93424104 -4.5078125 1.5 C-1.9921875 0.015625 -1.9921875 0.015625 0 0 Z " fill="#9B5688" transform="translate(161.9921875,3.984375)"/>
    <path d="M0 0 C2.12103817 1.23405059 4.13692277 2.46794027 6.11523438 3.91845703 C7.16275879 4.68065552 7.16275879 4.68065552 8.23144531 5.45825195 C8.97426758 6.00715088 9.71708984 6.5560498 10.48242188 7.12158203 C11.65853027 7.9807019 11.65853027 7.9807019 12.85839844 8.85717773 C15.36266512 10.68914972 17.86075737 12.52926577 20.35742188 14.37158203 C21.17243164 14.97212402 21.98744141 15.57266602 22.82714844 16.19140625 C26.06176286 18.5750444 29.29577101 20.95949369 32.52758789 23.34692383 C38.24155917 27.56405687 43.99962722 31.71327418 49.78710938 35.82861328 C55.40729068 39.82606618 61.00012739 43.86117347 66.58007812 47.91455078 C69.94570021 50.35875909 73.33194669 52.771372 76.72851562 55.17236328 C78.48006321 56.42592658 80.23137144 57.67982439 81.98242188 58.93408203 C82.81862061 59.51770508 83.65481934 60.10132813 84.51635742 60.70263672 C85.28117432 61.25467773 86.04599121 61.80671875 86.83398438 62.37548828 C87.51541504 62.85832275 88.1968457 63.34115723 88.89892578 63.83862305 C90.35742188 65.37158203 90.35742188 65.37158203 90.35742188 69.37158203 C88.39575195 70.99633789 88.39575195 70.99633789 85.62695312 72.58642578 C84.60714355 73.18334229 83.58733398 73.78025879 82.53662109 74.39526367 C81.42561035 75.02682373 80.31459961 75.65838379 79.16992188 76.30908203 C77.44004718 77.31819604 75.71018374 78.32733202 73.98175049 79.33891296 C72.80795877 80.02505501 71.63310177 80.70937772 70.45721436 81.391922 C65.15182988 84.47274943 59.93420836 87.68239946 54.73242188 90.93408203 C47.46633935 95.45604786 40.17316453 99.93040649 32.85742188 104.37158203 C24.24179689 109.60270624 15.65631208 114.88021906 7.09375 120.19775391 C5.51461027 121.17829824 3.93310476 122.15504875 2.34863281 123.12695312 C0.73096333 124.13809572 -0.84904262 125.20931019 -2.41601562 126.29736328 C-4.64257812 127.37158203 -4.64257812 127.37158203 -7.00585938 127.38720703 C-10.79611708 125.92725592 -13.65698513 123.62279514 -16.83007812 121.12158203 C-18.2625058 120.01980393 -19.69614445 118.91959882 -21.13085938 117.82080078 C-22.24388428 116.96494385 -22.24388428 116.96494385 -23.37939453 116.09179688 C-27.04433148 113.30612851 -30.77857545 110.61908013 -34.51757812 107.93408203 C-35.64135864 107.12535645 -35.64135864 107.12535645 -36.7878418 106.30029297 C-38.3116726 105.20395558 -39.83584306 104.10809013 -41.36035156 103.01269531 C-45.12556882 100.30518671 -48.88373865 97.58793407 -52.64257812 94.87158203 C-54.14254378 93.78820115 -55.6425438 92.70486783 -57.14257812 91.62158203 C-66.14257812 85.12158203 -66.14257812 85.12158203 -68.39648438 83.49365234 C-69.88332598 82.41989412 -71.3703032 81.34632367 -72.85742188 80.27294922 C-76.80992846 77.41971182 -80.75942547 74.56241679 -84.70507812 71.69970703 C-85.53136719 71.1009375 -86.35765625 70.50216797 -87.20898438 69.88525391 C-88.80099265 68.7314951 -90.39217299 67.57659277 -91.98242188 66.42041016 C-93.05169922 65.64600586 -93.05169922 65.64600586 -94.14257812 64.85595703 C-95.08617188 64.17098145 -95.08617188 64.17098145 -96.04882812 63.47216797 C-97.66051488 62.30417481 -97.66051488 62.30417481 -99.64257812 61.37158203 C-99.64257812 60.38158203 -99.64257812 59.39158203 -99.64257812 58.37158203 C-98.70800781 57.86111328 -97.7734375 57.35064453 -96.81054688 56.82470703 C-88.42445162 52.19972726 -80.2623003 47.31122998 -72.19042969 42.15869141 C-66.03371924 38.23388037 -59.82362508 34.40660216 -53.58007812 30.62158203 C-42.95624841 24.17871426 -32.3690881 17.67825133 -21.79101562 11.16064453 C-20.79166992 10.55124023 -19.79232422 9.94183594 -18.76269531 9.31396484 C-16.52956204 7.92376075 -14.3388127 6.50987881 -12.15527344 5.04638672 C-11.57500397 4.66638519 -10.9947345 4.28638367 -10.3968811 3.89486694 C-8.76989355 2.82789542 -7.1543564 1.74352314 -5.53955078 0.65820312 C-2.64257812 -0.62841797 -2.64257812 -0.62841797 0 0 Z " fill="#878787" transform="translate(102.642578125,139.62841796875)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(98,267)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(103,264)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#868686" transform="translate(106,262)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#888888" transform="translate(86,262)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(108,261)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(111,259)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(82,259)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(116,256)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#868686" transform="translate(119,254)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#888888" transform="translate(75,254)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(121,253)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(124,251)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#868686" transform="translate(71,251)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#868686" transform="translate(68,249)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(129,248)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#868686" transform="translate(132,246)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(64,246)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(134,245)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(137,243)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(60,243)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#868686" transform="translate(57,241)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(142,240)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(53,238)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#868686" transform="translate(147,237)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(150,235)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#868686" transform="translate(46,233)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(155,232)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(42,230)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(160,229)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#868686" transform="translate(163,227)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(165,226)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#868686" transform="translate(35,225)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(168,224)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(31,222)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(173,221)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#868686" transform="translate(176,219)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(178,218)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#888888" transform="translate(24,217)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(181,216)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(20,214)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(186,213)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#868686" transform="translate(191,210)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(13,209)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(9,206)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#868686" transform="translate(6,204)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#868686" transform="translate(189,201)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(186,199)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#888888" transform="translate(182,196)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#888888" transform="translate(7,194)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#868686" transform="translate(10,192)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(175,191)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(15,189)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#868686" transform="translate(171,188)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(20,186)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(23,184)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(164,183)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#858585" transform="translate(25,183)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(28,181)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(160,180)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(33,178)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(36,176)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(153,175)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#868686" transform="translate(38,175)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(41,173)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#868686" transform="translate(149,172)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(146,170)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#888888" transform="translate(46,170)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(142,167)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#888888" transform="translate(51,167)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(54,165)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#868686" transform="translate(138,164)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(135,162)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(59,162)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#888888" transform="translate(131,159)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#888888" transform="translate(64,159)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(67,157)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(127,156)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(72,154)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(120,151)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(77,151)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(80,149)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#868686" transform="translate(116,148)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#858585" transform="translate(82,148)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(85,146)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(109,143)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(90,143)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(93,141)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#868686" transform="translate(95,140)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(102,138)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(98,138)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#878787" transform="translate(100,137)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9C5789" transform="translate(157,133)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(152,131)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(162,130)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5588" transform="translate(165,128)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9C5589" transform="translate(148,128)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5588" transform="translate(170,125)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5687" transform="translate(141,123)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(175,122)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(178,120)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5787" transform="translate(137,120)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(180,119)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5788" transform="translate(183,117)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9C5689" transform="translate(130,115)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(188,114)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5788" transform="translate(191,112)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9D568A" transform="translate(126,112)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5588" transform="translate(193,111)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5688" transform="translate(196,109)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(119,107)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9C5788" transform="translate(201,106)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5587" transform="translate(204,104)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9C5589" transform="translate(115,104)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5588" transform="translate(206,103)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9C5688" transform="translate(209,101)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5687" transform="translate(108,99)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(214,98)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5788" transform="translate(104,96)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(219,95)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9C5589" transform="translate(222,93)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5687" transform="translate(97,91)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5588" transform="translate(227,90)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5787" transform="translate(93,88)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(232,87)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5787" transform="translate(90,86)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(235,85)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(237,84)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9C5688" transform="translate(86,83)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5788" transform="translate(240,82)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9D5589" transform="translate(82,80)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(245,79)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(79,78)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5787" transform="translate(248,77)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5588" transform="translate(250,76)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9C5589" transform="translate(75,75)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5688" transform="translate(253,74)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5688" transform="translate(68,70)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5788" transform="translate(64,67)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5788" transform="translate(248,65)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5687" transform="translate(244,62)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(64,61)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5787" transform="translate(66,60)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(69,58)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5689" transform="translate(237,57)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5588" transform="translate(74,55)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(233,54)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9C5689" transform="translate(79,52)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(82,50)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9C5589" transform="translate(226,49)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(87,47)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(222,46)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9C5688" transform="translate(92,44)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(95,42)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9C5688" transform="translate(215,41)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5788" transform="translate(100,39)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5787" transform="translate(211,38)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9D5589" transform="translate(208,36)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5688" transform="translate(105,36)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5688" transform="translate(108,34)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5788" transform="translate(204,33)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5587" transform="translate(110,33)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(113,31)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5787" transform="translate(197,28)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5788" transform="translate(118,28)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(121,26)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5688" transform="translate(193,25)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5787" transform="translate(123,25)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(126,23)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5788" transform="translate(186,20)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5588" transform="translate(131,20)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5687" transform="translate(182,17)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9C5688" transform="translate(136,17)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(139,15)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5788" transform="translate(175,12)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5688" transform="translate(144,12)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5688" transform="translate(171,9)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9C5688" transform="translate(149,9)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5688" transform="translate(152,7)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9B5587" transform="translate(154,6)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9C5589" transform="translate(164,4)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9C5788" transform="translate(157,4)"/>
    <path d="M0 0 C2 1 2 1 2 1 Z " fill="#9A5688" transform="translate(161,2)"/>
  </svg>
);

const Confetti = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="absolute top-0 w-2 h-2 rounded-full animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: ['#714B67', '#017E84', '#8F8F8F'][i % 3],
            animationDelay: `${Math.random() * 0.6}s`
          }}
        />
      ))}
    </div>
  );
};

const EXAMPLE_DATA = {
  name: 'Jalaludeen Adobanyi',
  strengths: 'excellent group work, deep analytical skills',
  weaknesses: 'should focus on meeting deadlines, needs more drafting time',
};

const STEPS = [
  { id: 'name', title: 'Student Name', icon: User, description: 'Enter the pupil name' },
  { id: 'strengths', title: 'Strengths', icon: Zap, description: 'What are they good at?' },
  { id: 'weaknesses', title: 'Focus Areas', icon: Target, description: 'Where can they improve?' },
  { id: 'tone', title: 'Voice', icon: MessageSquare, description: 'Pick a report style' },
];

const App = () => {
  const [view, setView] = useState<'home' | 'app'>('home');
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [formData, setFormData] = useState({
    name: '',
    strengths: '',
    weaknesses: '',
  });

  const [generatedComment, setGeneratedComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [tone, setTone] = useState('encouraging');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  const [showToast, setShowToast] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setDirection('forward');
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection('backward');
      setCurrentStep(prev => prev - 1);
    }
  };

  const fillExample = () => {
    setFormData(EXAMPLE_DATA);
    setCurrentStep(3);
    setError('');
  };

  const handleCopy = () => {
    if (!generatedComment) return;
    navigator.clipboard.writeText(generatedComment);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateReport = async () => {
    if (!formData.name || !formData.strengths || !formData.weaknesses) {
      setError('Missing information. Please complete all steps.');
      return;
    }

    setError('');
    setLoading(true);
    setGeneratedComment('');

    try {
      const prompt = `
    Task: Write a short end-of-term report comment for a pupil. Use clear and natural English.
    Tone: ${tone.replace('-', ' ')}
    Pupil name: ${formData.name}
    Strengths: ${formData.strengths}
    Areas for improvement: ${formData.weaknesses}
    Guidelines:
    1. Keep the comment between 2 and 4 sentences.
    2. Use the stated tone consistently.
    3. Mention the pupil by name once at the beginning.
    4. Refer to the strengths directly.
    5. Address the areas to improve without sounding harsh.
    6. Avoid exaggerated praise or negative language.
        `.trim();

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, tone }),
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();

      if (data.text) {
        setGeneratedComment(data.text.trim().replace(/^"|"$/g, ''));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1800);
      } else {
        setError("No response received from the model.");
      }

    } catch (err) {
      console.error(err);
      setError('Failed to generate comment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    if (currentStep === 0) return formData.name.trim().length > 0;
    if (currentStep === 1) return formData.strengths.trim().length > 2;
    if (currentStep === 2) return formData.weaknesses.trim().length > 2;
    return true;
  };

  const renderStepContent = () => {
    const activeStepId = STEPS[currentStep].id;
    const animationClass = direction === 'forward' ? 'animate-slideInRight' : 'animate-slideInLeft';

    switch (activeStepId) {
      case 'name':
        return (
          <div className={`space-y-3 ${animationClass}`}>
            <label className="block text-[10px] font-bold text-brand-gray uppercase tracking-widest">Student Full Name</label>
            <input
              autoFocus
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && isStepValid() && nextStep()}
              placeholder="e.g. Jalaludeen Adobanyi"
              className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-brand-gray/30 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-sm dark:text-white"
            />
          </div>
        );
      case 'strengths':
        return (
          <div className={`space-y-3 ${animationClass}`}>
            <label className="block text-[10px] font-bold text-brand-gray uppercase tracking-widest">Notable Strengths</label>
            <textarea
              autoFocus
              name="strengths"
              value={formData.strengths}
              onChange={handleInputChange}
              rows={3}
              placeholder="What have they done well?"
              className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-brand-gray/30 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none text-sm dark:text-white"
            />
          </div>
        );
      case 'weaknesses':
        return (
          <div className={`space-y-3 ${animationClass}`}>
            <label className="block text-[10px] font-bold text-brand-gray uppercase tracking-widest">Areas for growth</label>
            <textarea
              autoFocus
              name="weaknesses"
              value={formData.weaknesses}
              onChange={handleInputChange}
              rows={3}
              placeholder="What needs a bit more work?"
              className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-brand-gray/30 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none text-sm dark:text-white"
            />
          </div>
        );
      case 'tone':
        return (
          <div className={`space-y-3 ${animationClass}`}>
            <label className="block text-[10px] font-bold text-brand-gray uppercase tracking-widest">Report Tone</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'encouraging', label: 'Motivating' },
                { id: 'firm-supportive', label: 'Direct' },
                { id: 'outstanding', label: 'Outstanding' },
                { id: 'needs-improvement', label: 'Constructive' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  className={`p-3 text-center rounded-xl border transition-all text-xs font-semibold ${
                    tone === t.id 
                      ? 'bg-brand-primary border-brand-primary text-white shadow-md' 
                      : 'bg-white dark:bg-zinc-900 border-brand-gray/20 dark:border-zinc-800 text-brand-gray dark:text-zinc-400 hover:border-brand-primary'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const progressPercentage = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-brand-primary dark:text-zinc-100 font-sans transition-colors duration-200">
      {/* Header */}
      <header className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-brand-gray/10 sticky top-0 z-50 transition-colors">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-2 text-brand-primary dark:text-zinc-100 cursor-pointer group"
              onClick={() => {
                setView('home');
                setCurrentStep(0);
                setGeneratedComment('');
              }}
            >
              <div className="transition-transform group-hover:scale-110">
                <Logo className="w-8 h-8" />
              </div>
              <h1 className="text-lg font-extrabold tracking-tight">
                specAI
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-brand-gray/5 text-brand-gray transition-all active:scale-90"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {view === 'home' ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 py-12 text-center">
          <div className="max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/5 text-brand-primary text-[10px] mb-6 border border-brand-primary/10">
              <Sparkles className="w-3 h-3" />
              <span>BY SPRING ED CONSULTING</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-brand-primary dark:text-white mb-6 leading-tight">
              Smartest Way to<br /><span className="text-brand-secondary">Write Comments.</span>
            </h2>
            <p className="text-base text-brand-gray dark:text-zinc-400 mb-10 leading-relaxed max-w-md mx-auto">
              Draft personalized, professional end-of-term comments in seconds!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setView('app')}
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-brand-primary hover:opacity-90 text-white font-bold rounded-xl shadow-xl shadow-brand-primary/20 transition-all hover:scale-[1.02] active:scale-95 text-base"
              >
                Try It
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <main className="max-w-xl mx-auto p-4 md:p-8 pt-12">
          
          {/* Step Meta */}
          {!generatedComment && (
            <div className="mb-6 animate-in fade-in duration-500">
               <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center">
                   {React.createElement(STEPS[currentStep].icon, { className: "w-5 h-5 text-brand-primary" })}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-primary dark:text-zinc-100 uppercase tracking-widest">{STEPS[currentStep].title}</h3>
                  <p className="text-brand-gray text-[10px] font-medium">{STEPS[currentStep].description}</p>
                </div>
              </div>
              
              <div className="h-1 w-full bg-brand-gray/10 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-primary transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Stepper Card */}
          {!generatedComment ? (
            <div className="bg-brand-muted dark:bg-brand-darkMuted rounded-2xl border border-brand-gray/10 p-6 md:p-8 transition-all duration-300">
              
              <div className="mb-6">
                {renderStepContent()}
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                    currentStep === 0 
                      ? 'opacity-0 cursor-default' 
                      : 'text-brand-gray hover:text-brand-primary hover:bg-brand-primary/5'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                {currentStep === STEPS.length - 1 ? (
                  <button
                    onClick={generateReport}
                    disabled={loading || !isStepValid()}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-secondary hover:opacity-90 disabled:bg-brand-gray/20 disabled:text-brand-gray text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-95 text-xs shadow-lg shadow-brand-secondary/20"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {loading ? 'Drafting...' : 'Build Comment'}
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary hover:opacity-90 disabled:bg-brand-gray/20 disabled:text-brand-gray text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-95 text-xs shadow-lg shadow-brand-primary/10"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Result Section */
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-6">
              <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl shadow-brand-primary/5 border border-brand-primary/10 p-8 relative overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-sm font-black text-brand-primary dark:text-white uppercase tracking-tighter">Drafted Report</h2>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      copied 
                        ? 'bg-brand-secondary text-white' 
                        : 'bg-brand-primary/5 text-brand-primary hover:bg-brand-primary/10'
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <div className="p-6 bg-brand-muted dark:bg-zinc-800 rounded-2xl border border-brand-primary/5">
                  <p className="text-lg leading-relaxed text-brand-primary dark:text-zinc-200 font-medium italic">
                    "{generatedComment}"
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-brand-gray/10 pt-6">
                  <div className="flex items-center gap-4 text-[10px] text-brand-gray font-bold uppercase tracking-widest">
                    <span>{formData.name}</span>
                    <span className="w-1 h-1 rounded-full bg-brand-gray/30" />
                    <span>{generatedComment.split(' ').length} words</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setGeneratedComment('');
                        setCurrentStep(0);
                      }}
                      className="px-4 py-2 rounded-lg text-brand-gray hover:text-brand-primary text-xs font-bold transition-all"
                    >
                      New Student
                    </button>
                    <button
                      onClick={generateReport}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-primary/5 border border-brand-primary/10 rounded-lg text-brand-primary text-xs font-bold hover:bg-brand-primary/10 transition-all group"
                    >
                      <RefreshCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                      Rewrite
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl text-center border border-red-100">
              {error}
            </div>
          )}
        </main>
      )}

      {showConfetti && <Confetti />}

      <footer className="fixed bottom-0 left-0 w-full border-t border-brand-gray/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm transition-colors z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 text-center text-[9px] text-brand-gray uppercase tracking-[0.2em]">
          <p>
            Secure Assistant • Spring Ed Consulting • specAI
          </p>
        </div>
      </footer>
    </div>
  );
};

const container = document.getElementById('root') || document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
