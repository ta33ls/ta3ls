export const heroSceneMarkup = `<defs>
    <radialGradient id="gAura" cx="50%" cy="48%" r="52%">
      <stop offset="0" stop-color="#FF4D8D" stop-opacity=".22"/>
      <stop offset=".45" stop-color="#8B6CFF" stop-opacity=".16"/>
      <stop offset="1" stop-color="#8B6CFF" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gMoonGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#E9D8FF" stop-opacity=".42"/>
      <stop offset=".38" stop-color="#B58CFF" stop-opacity=".16"/>
      <stop offset="1" stop-color="#8B6CFF" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gMoon" cx="36%" cy="32%" r="78%">
      <stop offset="0" stop-color="#FFF8FF"/>
      <stop offset=".52" stop-color="#F3E3FB"/>
      <stop offset="1" stop-color="#D9BEEC"/>
    </radialGradient>
    <linearGradient id="gTop" x1="0" y1="0" x2=".8" y2="1">
      <stop offset="0" stop-color="#2A245F"/>
      <stop offset=".55" stop-color="#1D1747"/>
      <stop offset="1" stop-color="#131033"/>
    </linearGradient>
    <linearGradient id="gRockL" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2E1D54"/>
      <stop offset=".55" stop-color="#190F39"/>
      <stop offset="1" stop-color="#0A0620"/>
    </linearGradient>
    <linearGradient id="gRockR" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#452A75"/>
      <stop offset=".5" stop-color="#28184E"/>
      <stop offset="1" stop-color="#0F0928"/>
    </linearGradient>
    <linearGradient id="gWater" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#EAFFFF" stop-opacity=".9"/>
      <stop offset=".35" stop-color="#5BF0E4" stop-opacity=".55"/>
      <stop offset="1" stop-color="#5BF0E4" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="gKoi" x1="0" y1="0" x2="1" y2=".15">
      <stop offset="0" stop-color="#FFF6FA"/>
      <stop offset=".38" stop-color="#FFE8F0"/>
      <stop offset=".66" stop-color="#FFC1D3"/>
      <stop offset=".88" stop-color="#FF7FA6"/>
      <stop offset="1" stop-color="#FF5A88"/>
    </linearGradient>
    <linearGradient id="gFin" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FFB3C9"/>
      <stop offset=".55" stop-color="#FF7FA6"/>
      <stop offset="1" stop-color="#B58CFF"/>
    </linearGradient>
    <linearGradient id="gWarm" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FFE0AE"/>
      <stop offset="1" stop-color="#FF9E6B"/>
    </linearGradient>
    <linearGradient id="gCool" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#DFFFFF"/>
      <stop offset="1" stop-color="#5BF0E4"/>
    </linearGradient>
    <radialGradient id="gPinkLight">
      <stop offset="0" stop-color="#FF4D8D" stop-opacity=".5"/>
      <stop offset="1" stop-color="#FF4D8D" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gCyanLight">
      <stop offset="0" stop-color="#5BF0E4" stop-opacity=".4"/>
      <stop offset="1" stop-color="#5BF0E4" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gAmberLight">
      <stop offset="0" stop-color="#FFC46B" stop-opacity=".55"/>
      <stop offset="1" stop-color="#FFC46B" stop-opacity="0"/>
    </radialGradient>
    <pattern id="pDots" width="10" height="10" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="#F4ECFF" opacity=".35"/>
    </pattern>
    <pattern id="pScales" width="28" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
      <path d="M0 10 Q7 3 14 10" stroke="#3A0B40" stroke-width="1.1" fill="none" opacity=".3"/>
      <path d="M14 20 Q21 13 28 20" stroke="#3A0B40" stroke-width="1.1" fill="none" opacity=".3"/>
    </pattern>
    <filter id="fGlowPink" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="fGlowCyan" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="fBlur" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
    <filter id="fSoft" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3"/>
    </filter>
    <clipPath id="clipMoon"><circle cx="1245" cy="225" r="138"/></clipPath>
    <clipPath id="clipTop"><polygon points="1075,300 1470,510 1080,710 690,505"/></clipPath>
    <clipPath id="clipKoi"><path d="M1084 284 C1088 276 1084 265 1072 256 C1050 242 1024 236 996 232 C944 224 890 224 838 229 C786 235 740 250 712 270 C700 280 694 292 694 302 C706 312 726 316 750 318 C812 326 882 330 944 324 C998 319 1044 304 1066 292 C1074 288 1080 286 1084 284 Z"/></clipPath>
  </defs>

  <g class="layer layer--aura" aria-hidden="true">
    <ellipse cx="1080" cy="560" rx="760" ry="430" fill="url(#gAura)"/>
  </g>

  <g class="layer layer--stars" aria-hidden="true">
    <g fill="#F4ECFF">
      <circle class="star star--a" cx="170" cy="146" r="1.7"/>
      <circle class="star star--b" cx="325" cy="88" r="1.1"/>
      <circle class="star star--c" cx="468" cy="214" r="1.4"/>
      <circle class="star star--a" cx="556" cy="96" r="1"/>
      <circle class="star star--b" cx="648" cy="178" r="1.8"/>
      <circle class="star star--c" cx="742" cy="70" r="1.2"/>
      <circle class="star star--a" cx="856" cy="140" r="1"/>
      <circle class="star star--b" cx="964" cy="66" r="1.5"/>
      <circle class="star star--c" cx="1082" cy="112" r="1.1"/>
      <circle class="star star--a" cx="1328" cy="64" r="1.4"/>
      <circle class="star star--b" cx="1442" cy="148" r="1.1"/>
      <circle class="star star--c" cx="1530" cy="286" r="1.7"/>
      <circle class="star star--a" cx="114" cy="312" r="1.2"/>
      <circle class="star star--b" cx="238" cy="408" r="1.6"/>
      <circle class="star star--c" cx="422" cy="336" r="1"/>
      <circle class="star star--a" cx="596" cy="420" r="1.3"/>
      <circle class="star star--b" cx="716" cy="360" r="1.5"/>
      <circle class="star star--c" cx="1352" cy="402" r="1.2"/>
      <circle class="star star--a" cx="1488" cy="468" r="1.6"/>
      <circle class="star star--b" cx="86" cy="606" r="1.4"/>
      <circle class="star star--c" cx="282" cy="536" r="1"/>
      <circle class="star star--a" cx="498" cy="644" r="1.3"/>
    </g>
    <g fill="#5BF0E4">
      <circle class="star star--b" cx="1448" cy="212" r="1.6"/>
      <circle class="star star--a" cx="726" cy="470" r="1.2"/>
      <circle class="star star--c" cx="334" cy="648" r="1.4"/>
    </g>
    <path class="spark" d="M1452 136 l6 21 21 6 -21 6 -6 21 -6 -21 -21 -6 21 -6 z" fill="#F4ECFF" opacity=".85"/>
    <path class="spark spark--late" d="M518 170 l4 14 14 4 -14 4 -4 14 -4 -14 -14 -4 14 -4 z" fill="#FFC46B" opacity=".7"/>
  </g>

  <g class="layer layer--moon" aria-hidden="true">
    <circle cx="1245" cy="225" r="282" fill="url(#gMoonGlow)"/>
    <ellipse cx="1245" cy="225" rx="246" ry="82" transform="rotate(-16 1245 225)" fill="none" stroke="#CBB4FF" stroke-opacity=".24" stroke-dasharray="2 10"/>
    <circle cx="1245" cy="225" r="138" fill="url(#gMoon)"/>
    <g clip-path="url(#clipMoon)" opacity=".55">
      <ellipse cx="1192" cy="186" rx="21" ry="11" transform="rotate(-22 1192 186)" fill="#C7A7DE" opacity=".55"/>
      <ellipse cx="1272" cy="256" rx="26" ry="13" transform="rotate(-12 1272 256)" fill="#C7A7DE" opacity=".45"/>
      <ellipse cx="1302" cy="176" rx="10" ry="7" fill="#C7A7DE" opacity=".5"/>
      <ellipse cx="1216" cy="292" rx="13" ry="7" transform="rotate(-18 1216 292)" fill="#C7A7DE" opacity=".4"/>
      <ellipse cx="1250" cy="214" rx="34" ry="19" transform="rotate(-24 1250 214)" fill="#EDDCF7" opacity=".6"/>
      <path d="M1130 262 C1180 242 1224 272 1256 258" fill="none" stroke="#C7A7DE" stroke-width="2" stroke-opacity=".35"/>
    </g>
    <circle cx="1245" cy="225" r="138" fill="none" stroke="#FFF3FF" stroke-opacity=".45"/>
  </g>

  <g class="layer layer--clouds-back" aria-hidden="true">
    <path d="M236 476 C306 432 392 440 448 472 C514 448 586 468 610 500 C668 500 692 532 654 552 C548 578 330 562 268 542 C212 524 202 496 236 476 Z" fill="#8B6CFF" opacity=".1" filter="url(#fBlur)"/>
    <path d="M1012 338 C1084 304 1170 312 1218 344 C1298 320 1372 342 1394 374 C1448 384 1456 416 1402 428 C1290 450 1092 438 1032 410 C992 392 985 356 1012 338 Z" fill="#F4ECFF" opacity=".06" filter="url(#fBlur)"/>
    <path d="M122 720 C210 676 310 690 354 726 C420 706 480 728 496 758 C540 768 540 800 490 814 C378 834 208 812 150 786 C108 766 100 740 122 720 Z" fill="#FF4D8D" opacity=".05" filter="url(#fBlur)"/>
  </g>

  <g class="layer layer--koi" aria-hidden="true">
    <g class="koi-drift">
      <g transform="translate(50 -30)">
      <ellipse cx="850" cy="282" rx="252" ry="104" fill="#FF4D8D" opacity=".1" filter="url(#fBlur)"/>
      <g>
        <path d="M706 300 C666 258 616 224 556 210 C572 250 606 286 654 308 C626 298 600 296 574 298 C606 316 650 320 698 312 Z" fill="url(#gFin)" opacity=".62"/>
        <path d="M706 306 C652 302 594 314 544 342 C592 346 646 334 698 318 Z" fill="url(#gFin)" opacity=".52"/>
        <path d="M708 314 C680 352 642 384 586 406 C600 366 646 332 698 312 Z" fill="url(#gFin)" opacity=".56"/>
        <g fill="none" stroke="#FFB3C9" stroke-opacity=".45" stroke-width="1">
          <path d="M700 302 C660 270 622 244 584 226"/>
          <path d="M702 306 C660 296 618 296 582 302"/>
          <path d="M706 312 C676 338 644 360 606 376"/>
        </g>
      </g>
      <path d="M876 226 C876 190 892 162 918 144 C914 178 922 206 942 228 Z" fill="url(#gFin)" opacity=".48"/>
      <path d="M934 230 C952 204 976 192 998 190 C982 210 972 228 968 246 Z" fill="url(#gFin)" opacity=".3"/>
      <path d="M1084 284 C1088 276 1084 265 1072 256 C1050 242 1024 236 996 232 C944 224 890 224 838 229 C786 235 740 250 712 270 C700 280 694 292 694 302 C706 312 726 316 750 318 C812 326 882 330 944 324 C998 319 1044 304 1066 292 C1074 288 1080 286 1084 284 Z" fill="url(#gKoi)" stroke="#FFD9E7" stroke-opacity=".35" stroke-width="1.2"/>
      <g clip-path="url(#clipKoi)">
        <path d="M1012 243 C1054 248 1076 264 1084 284 C1052 300 1014 286 996 258 Z" fill="#FF5A88" opacity=".5"/>
        <path d="M812 238 C844 224 888 226 906 242 C884 258 848 262 818 254 Z" fill="#FF8FB2" opacity=".4"/>
        <path d="M720 276 C736 266 754 260 768 262 C756 278 738 290 718 294 Z" fill="#FFC46B" opacity=".2"/>
      </g>
      <path d="M1084 284 C1088 276 1084 265 1072 256 C1050 242 1024 236 996 232 C944 224 890 224 838 229 C786 235 740 250 712 270 C700 280 694 292 694 302 C706 312 726 316 750 318 C812 326 882 330 944 324 C998 319 1044 304 1066 292 C1074 288 1080 286 1084 284 Z" fill="url(#pScales)" opacity=".5"/>
      <path d="M1016 306 C1002 342 966 370 916 382 C934 354 956 326 972 300 Z" fill="url(#gFin)" fill-opacity=".55" stroke="#FFD9E7" stroke-opacity=".25" stroke-width=".8"/>
      <path d="M1006 310 C992 336 966 358 936 368" fill="none" stroke="#FFD9E7" stroke-opacity=".4"/>
      <path d="M994 309 C982 330 962 348 940 358" fill="none" stroke="#FFD9E7" stroke-opacity=".28"/>
      <path d="M914 326 C906 352 886 372 858 382 C866 354 876 334 886 322 Z" fill="url(#gFin)" opacity=".45"/>
      <path d="M1000 246 C996 270 1004 290 1020 304" fill="none" stroke="#8A2348" stroke-opacity=".22" stroke-width="1.4"/>
      <path d="M714 300 C786 242 870 214 962 220" fill="none" stroke="#FFF5FA" stroke-opacity=".6" stroke-width="2.2"/>
      <path d="M744 318 C818 312 908 312 986 300" fill="none" stroke="#5BF0E4" stroke-opacity=".38" stroke-width="1.4"/>
      <path d="M1076 284 C1088 288 1090 294 1082 300" fill="none" stroke="#6A1B38" stroke-width="2" stroke-linecap="round"/>
      <circle cx="1036" cy="272" r="9.5" fill="none" stroke="#FFC46B" stroke-opacity=".45"/>
      <circle cx="1036" cy="272" r="7" fill="#140B2B"/>
      <circle cx="1038" cy="269.5" r="2.2" fill="#FFF5FA"/>
      <path d="M1076 282 C1098 292 1110 306 1112 324" fill="none" stroke="#FFC46B" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>
      <path d="M1074 275 C1100 278 1112 272 1124 262" fill="none" stroke="#FFC46B" stroke-width="1.2" stroke-linecap="round" opacity=".7"/>
      <g fill="none" stroke="#DFFCFF" stroke-opacity=".5">
        <circle cx="1112" cy="214" r="4"/>
        <circle cx="1136" cy="180" r="7"/>
        <circle cx="1160" cy="146" r="3"/>
        <circle cx="1168" cy="202" r="2.5"/>
        <circle cx="606" cy="246" r="3"/>
        <circle cx="578" cy="214" r="2"/>
      </g>
      <g fill="#FF8FB4" opacity=".55">
        <circle cx="676" cy="356" r="1.5"/>
        <circle cx="648" cy="374" r="1"/>
        <circle cx="702" cy="338" r="1.2"/>
      </g>
      </g>
    </g>
  </g>

  <g class="layer layer--island" aria-hidden="true">
    <ellipse cx="1080" cy="900" rx="470" ry="110" fill="#FF4D8D" opacity=".07" filter="url(#fBlur)"/>

    <polygon points="690,537 1080,742 1000,980 942,948 885,962 858,910 792,922 776,858 715,846 722,786 662,742 676,684 645,642 664,590" fill="url(#gRockL)"/>
    <polygon points="1080,742 1470,542 1428,628 1448,676 1372,708 1390,772 1305,788 1322,852 1240,856 1248,912 1168,906 1142,952 1070,958 1000,980" fill="url(#gRockR)"/>
    <path d="M1080 742 L1024 858 L1000 980" fill="none" stroke="#8B6CFF" stroke-opacity=".22" stroke-width="2"/>
    <g opacity=".35">
      <polygon points="720,760 790,850 762,910 708,836" fill="#0A061A"/>
      <polygon points="860,860 938,900 916,952 852,924" fill="#0A061A"/>
      <polygon points="1180,820 1300,790 1262,860 1198,872" fill="#5B3B8C" opacity=".35"/>
      <polygon points="1342,690 1408,660 1378,742 1320,750" fill="#5B3B8C" opacity=".3"/>
      <path d="M714 792 C776 774 812 810 872 792" fill="none" stroke="#0A061A" stroke-width="2"/>
      <path d="M774 864 C838 846 884 890 934 862" fill="none" stroke="#0A061A" stroke-width="2"/>
      <path d="M1118 816 C1180 796 1246 826 1310 796" fill="none" stroke="#0A061A" stroke-width="2"/>
      <path d="M1148 890 C1208 872 1268 892 1338 858" fill="none" stroke="#0A061A" stroke-width="2"/>
      <path d="M1206 936 C1264 914 1320 922 1390 884" fill="none" stroke="#5B3B8C" stroke-width="1.4" opacity=".6"/>
    </g>
    <g fill="none" stroke="#6B4B9E" stroke-width="2" stroke-opacity=".42" stroke-linecap="round">
      <path d="M722 604 C712 684 736 726 720 800"/>
      <path d="M786 646 C774 706 798 752 782 826"/>
      <path d="M980 706 C968 760 992 790 974 846"/>
      <path d="M1342 664 C1330 718 1352 756 1332 810"/>
      <path d="M1410 616 C1396 660 1408 692 1392 724"/>
      <path d="M820 770 C812 812 828 840 814 878"/>
    </g>
    <g class="crystals">
      <ellipse cx="862" cy="824" rx="28" ry="12" fill="#5BF0E4" opacity=".16" filter="url(#fBlur)"/>
      <polygon points="854,790 868,812 858,838 842,814" fill="#5BF0E4" opacity=".75" filter="url(#fGlowCyan)"/>
      <polygon points="856,798 864,812 858,828 849,812" fill="#EAFFFF" opacity=".8"/>
      <polygon points="1286,806 1298,824 1290,846 1276,826" fill="#FF8FB4" opacity=".6" filter="url(#fGlowPink)"/>
      <polygon points="1180,900 1192,918 1184,938 1170,920" fill="#5BF0E4" opacity=".45"/>
    </g>

    <g class="waterfall">
      <path d="M880 616 C894 700 900 758 882 840 C872 892 900 920 912 950 L952 944 C932 900 920 860 930 800 C942 730 930 668 918 618 Z" fill="url(#gWater)" opacity=".5"/>
      <g fill="none" stroke="#EAFFFF" stroke-linecap="round">
        <path class="waterfall-line" d="M896 624 C906 706 910 768 894 856" stroke-width="1.6" stroke-dasharray="4 12" opacity=".8"/>
        <path class="waterfall-line waterfall-line--b" d="M914 636 C922 712 922 790 912 864" stroke-width="1" stroke-dasharray="2 14" opacity=".6"/>
        <path class="waterfall-line waterfall-line--c" d="M930 660 C936 728 934 792 924 846" stroke-width="1.2" stroke-dasharray="3 16" opacity=".5"/>
      </g>
      <g fill="#DFFCFF">
        <circle cx="892" cy="668" r="1.6" opacity=".7"/>
        <circle cx="928" cy="700" r="2" opacity=".6"/>
        <circle cx="906" cy="748" r="1.2" opacity=".7"/>
        <circle cx="938" cy="806" r="1.6" opacity=".5"/>
        <circle cx="902" cy="858" r="2.2" opacity=".4"/>
      </g>
      <ellipse cx="910" cy="946" rx="54" ry="14" fill="#5BF0E4" opacity=".14" filter="url(#fBlur)"/>
    </g>

    <polygon points="690,505 1080,710 1080,742 690,537" fill="#171139"/>
    <polygon points="1080,710 1470,510 1470,542 1080,742" fill="#211847"/>
    <polygon points="1075,300 1470,510 1080,710 690,505" fill="url(#gTop)"/>
    <path d="M690 505 L1080 710 L1470 510" fill="none" stroke="#B58CFF" stroke-opacity=".5" stroke-width="1.4"/>

    <g clip-path="url(#clipTop)">
      <ellipse cx="1080" cy="584" rx="330" ry="112" fill="url(#gPinkLight)" opacity=".55"/>
      <ellipse cx="1210" cy="642" rx="120" ry="46" fill="url(#gCyanLight)" opacity=".7"/>
      <ellipse cx="912" cy="618" rx="100" ry="36" fill="url(#gAmberLight)" opacity=".35"/>
      <g stroke="#8B6CFF" stroke-width="1" opacity=".09">
        <path d="M540 548 L1260 926"/>
        <path d="M604 474 L1324 852"/>
        <path d="M672 400 L1392 778"/>
        <path d="M736 326 L1456 704"/>
        <path d="M1640 438 L920 816"/>
        <path d="M1660 512 L940 890"/>
        <path d="M1680 586 L960 964"/>
        <path d="M1580 370 L860 748"/>
      </g>
      <g opacity=".35" fill="none" stroke="#F4ECFF" stroke-width="1.2">
        <path d="M952 664 L1000 688"/>
        <path d="M972 654 L1020 678"/>
        <path d="M992 644 L1040 668"/>
      </g>
      <ellipse cx="1014" cy="678" rx="58" ry="13" fill="#5BF0E4" opacity=".14"/>
      <ellipse cx="1012" cy="677" rx="34" ry="6" fill="#DFFFFF" opacity=".1"/>
      <ellipse cx="1176" cy="690" rx="40" ry="9" fill="#FF4D8D" opacity=".18"/>
      <ellipse cx="1174" cy="689" rx="22" ry="4" fill="#FFD9E7" opacity=".12"/>
      <g opacity=".4" fill="none" stroke="#5BF0E4" stroke-width="1">
        <path d="M982 700 q16 4 32 0"/>
        <path d="M1156 702 q12 3 24 0"/>
      </g>
    </g>

    <g class="building building--b">
      <ellipse cx="946" cy="514" rx="92" ry="26" fill="#05020F" opacity=".45"/>
      <polygon points="940,505 872,479 872,349 940,375" fill="#1B1640"/>
      <polygon points="940,505 1008,471 1008,341 940,375" fill="#2A2358"/>
      <polygon points="940,375 1008,341 940,315 872,349" fill="#3A3275"/>
      <path d="M872 349 L940 375 L1008 341" fill="none" stroke="#8B6CFF" stroke-opacity=".35"/>
      <g transform="translate(940 375) skewY(-26.565)" fill="#FFC46B" opacity=".85">
        <rect x="10" y="24" width="12" height="16" rx="1"/>
        <rect x="34" y="24" width="12" height="16" rx="1" fill="#5BF0E4" opacity=".8"/>
        <rect x="10" y="52" width="12" height="16" rx="1" fill="#5BF0E4" opacity=".55"/>
        <rect x="54" y="52" width="12" height="16" rx="1"/>
        <rect x="34" y="78" width="12" height="16" rx="1" fill="#2A2358" opacity=".9"/>
        <rect x="10" y="78" width="12" height="16" rx="1"/>
      </g>
      <g transform="translate(940 375) skewY(26.565)" fill="#FF9EC2" opacity=".6">
        <rect x="-56" y="42" width="11" height="14" rx="1"/>
        <rect x="-34" y="42" width="11" height="14" rx="1" fill="#5BF0E4"/>
        <rect x="-56" y="70" width="11" height="14" rx="1" fill="#FFC46B"/>
        <rect x="-34" y="96" width="11" height="14" rx="1" fill="#2A2358" opacity=".6"/>
      </g>
      <ellipse cx="962" cy="334" rx="12" ry="5" fill="#2D2459"/>
      <path d="M952 334 v16 h20 v-16" fill="#221B49" stroke="#4B3F86" stroke-width="1"/>
      <ellipse cx="962" cy="334" rx="10" ry="4" fill="#42397D"/>
      <path d="M936 350 h16 M930 356 h22" stroke="#8B6CFF" stroke-opacity=".25"/>
      <g class="hanging-sign">
        <path d="M986 372 L1000 359" stroke="#0B0720" stroke-width="2"/>
        <rect x="978" y="372" width="20" height="86" rx="1" fill="#120B2A" stroke="#FFC46B" stroke-opacity=".65" filter="url(#fGlowPink)"/>
        <text class="sign-char" x="988" y="400" text-anchor="middle" font-size="10" fill="#FFD9A6">TEA</text>
        <text class="sign-char" x="988" y="432" text-anchor="middle" font-size="13" fill="#FFD9A6">33</text>
      </g>
      <path d="M1008 341 L1008 471" stroke="#B58CFF" stroke-opacity=".18"/>
    </g>

    <g class="building building--a">
      <ellipse cx="1172" cy="526" rx="112" ry="32" fill="#05020F" opacity=".5"/>
      <polygon points="1160,520 1098,496 1098,276 1160,300" fill="#1B143C"/>
      <polygon points="1160,520 1222,489 1222,269 1160,300" fill="#2C245B"/>
      <polygon points="1160,300 1222,269 1160,245 1098,276" fill="#42397D"/>
      <path d="M1098 276 L1160 300 L1222 269" fill="none" stroke="#8B6CFF" stroke-opacity=".4"/>
      <g transform="translate(1160 300) skewY(-26.565)">
        <rect x="6" y="30" width="50" height="66" rx="1" fill="#0A071D" stroke="#FF4D8D" stroke-opacity=".65"/>
        <rect x="10" y="34" width="42" height="58" fill="#0B0A26" opacity=".85"/>
        <text class="screen-text" x="31" y="61" text-anchor="middle" font-size="21" fill="#5BF0E4">25</text>
        <text class="screen-text" x="31" y="80" text-anchor="middle" font-size="21" fill="#5BF0E4">00</text>
        <rect x="14" y="86" width="20" height="2" fill="#FF4D8D" opacity=".75"/>
        <circle cx="44" cy="87" r="2.2" fill="#FF4D8D"/>
      </g>
      <g transform="translate(1160 300) skewY(-26.565)" fill="#FFC46B" opacity=".8">
        <rect x="10" y="116" width="13" height="15" rx="1"/>
        <rect x="32" y="116" width="13" height="15" rx="1" fill="#5BF0E4" opacity=".65"/>
        <rect x="32" y="144" width="13" height="15" rx="1" fill="#2C245B" opacity=".5"/>
        <rect x="10" y="144" width="13" height="15" rx="1"/>
        <rect x="48" y="172" width="8" height="12" rx="1" fill="#FF8FB4"/>
      </g>
      <g transform="translate(1160 300) skewY(26.565)" fill="#FF9EC2" opacity=".65">
        <rect x="-56" y="112" width="12" height="15" rx="1" fill="#5BF0E4"/>
        <rect x="-34" y="112" width="12" height="15" rx="1"/>
        <rect x="-56" y="142" width="12" height="15" rx="1" fill="#2C245B" opacity=".5"/>
        <rect x="-34" y="142" width="12" height="15" rx="1" fill="#FFC46B"/>
        <rect x="-56" y="172" width="12" height="15" rx="1"/>
      </g>
      <rect x="1102" y="336" width="32" height="140" rx="1" fill="#100A25" stroke="#FF4D8D" stroke-opacity=".75" filter="url(#fGlowPink)"/>
      <text class="sign-char" x="1118" y="374" text-anchor="middle" font-size="14" fill="#FFD9E6">33</text>
      <text class="sign-char" x="1118" y="414" text-anchor="middle" font-size="14" fill="#FFD9E6">FM</text>
      <text class="sign-char" x="1118" y="454" text-anchor="middle" font-size="14" fill="#FFD9E6">ON</text>
      <path d="M1134 344 L1152 338" stroke="#FF4D8D" stroke-opacity=".4"/>
      <path d="M1134 470 L1152 476" stroke="#FF4D8D" stroke-opacity=".4"/>
      <g class="roof">
        <path d="M1132 262 h12 v40 h-12 z" fill="#221B49"/>
        <ellipse cx="1138" cy="262" rx="6" ry="2" fill="#4B3F86"/>
        <ellipse cx="1188" cy="259" rx="14" ry="6" fill="#30275F" stroke="#5BF0E4" stroke-opacity=".35"/>
        <path d="M1188 265 v10 M1180 249 l8 10" stroke="#8B6CFF" stroke-opacity=".5" stroke-width="1.4"/>
        <path d="M1157 272 L1157 150" stroke="#0B0720" stroke-width="3"/>
        <path d="M1157 150 L1157 112" stroke="#8B6CFF" stroke-opacity=".6" stroke-width="1.2"/>
        <path d="M1146 178 h22 M1149 206 h16 M1152 234 h10" stroke="#0B0720" stroke-width="2"/>
        <path d="M1157 150 L1157 112" stroke="#5BF0E4" stroke-opacity=".45"/>
        <circle class="beacon" cx="1157" cy="110" r="4" fill="#FF4D8D" filter="url(#fGlowPink)"/>
        <circle cx="1157" cy="110" r="9" fill="#FF4D8D" opacity=".18"/>
      </g>
    </g>

    <g class="broadcast" fill="none" stroke="#5BF0E4">
      <circle class="broadcast-ring" cx="1157" cy="126" r="24" stroke-opacity=".3"/>
      <circle class="broadcast-ring broadcast-ring--b" cx="1157" cy="126" r="48" stroke-opacity=".2"/>
      <circle class="broadcast-ring broadcast-ring--c" cx="1157" cy="126" r="76" stroke-opacity=".14"/>
    </g>

    <g class="lantern-cable">
      <path d="M1002 344 C1022 374 1080 380 1110 336" fill="none" stroke="#0A061A" stroke-width="1.6" opacity=".9"/>
      <g class="lantern" transform="translate(1024 365)">
        <path d="M0 0 v12" stroke="#0A061A" stroke-width="1"/>
        <ellipse cx="0" cy="22" rx="6" ry="9" fill="#FFC46B" opacity=".9" filter="url(#fGlowPink)"/>
        <ellipse cx="0" cy="22" rx="3.5" ry="6" fill="#FFF4DA"/>
      </g>
      <g class="lantern" transform="translate(1054 378)">
        <path d="M0 0 v12" stroke="#0A061A" stroke-width="1"/>
        <ellipse cx="0" cy="22" rx="6" ry="9" fill="#FF8FB4" opacity=".9" filter="url(#fGlowPink)"/>
        <ellipse cx="0" cy="22" rx="3.5" ry="6" fill="#FFE5EF"/>
      </g>
      <g class="lantern" transform="translate(1085 365)">
        <path d="M0 0 v12" stroke="#0A061A" stroke-width="1"/>
        <ellipse cx="0" cy="22" rx="6" ry="9" fill="#FFC46B" opacity=".85" filter="url(#fGlowPink)"/>
        <ellipse cx="0" cy="22" rx="3.5" ry="6" fill="#FFF4DA"/>
      </g>
    </g>

    <g class="building building--c">
      <ellipse cx="852" cy="576" rx="72" ry="20" fill="#05020F" opacity=".45"/>
      <polygon points="850,570 796,549 796,497 850,518" fill="#241A4A"/>
      <polygon points="850,570 904,543 904,491 850,518" fill="#352662"/>
      <polygon points="850,518 904,491 850,470 796,497" fill="#4A3A82"/>
      <path d="M796 497 L850 518 L904 491" fill="none" stroke="#B58CFF" stroke-opacity=".35"/>
      <g transform="translate(850 518) skewY(-26.565)" fill="#FFC46B" opacity=".9">
        <rect x="14" y="16" width="16" height="13" rx="1"/>
        <rect x="38" y="11" width="10" height="18" rx="1" fill="#5BF0E4" opacity=".7"/>
        <rect x="14" y="34" width="34" height="3" fill="#FF8FB4" opacity=".7"/>
      </g>
      <g transform="translate(850 518) skewY(26.565)" fill="#FF9EC2" opacity=".5">
        <rect x="-44" y="24" width="12" height="14" rx="1"/>
        <rect x="-24" y="34" width="12" height="14" rx="1" fill="#FFC46B"/>
      </g>
      <polygon points="850,518 904,491 912,506 858,533" fill="#120B2A"/>
      <polygon points="850,518 860.8,512.6 868.8,527.6 858,533" fill="#FF4D8D" opacity=".8"/>
      <polygon points="871.6,507.2 882.4,501.8 890.4,516.8 879.6,522.2" fill="#F4ECFF" opacity=".8"/>
      <polygon points="893.2,496.4 904,491 912,506 901.2,511.4" fill="#FF4D8D" opacity=".8"/>
      <circle cx="862" cy="540" r="4" fill="#FFC46B" filter="url(#fGlowPink)"/>
      <path d="M862 540 v-6" stroke="#0A061A"/>
      <path d="M876 548 C884 548 888 552 888 558" fill="none" stroke="#FFC46B" stroke-opacity=".25" stroke-width="7" filter="url(#fSoft)"/>
      <path d="M872 530 h20" stroke="#0A061A" stroke-width="1" opacity=".5"/>
      <rect x="828" y="474" width="9" height="14" fill="#2A2054"/>
      <ellipse cx="832" cy="474" rx="6" ry="2" fill="#4A3A82"/>
    </g>

    <g class="building building--d">
      <ellipse cx="1256" cy="592" rx="98" ry="27" fill="#05020F" opacity=".45"/>
      <polygon points="1255,585 1193,562 1193,470 1255,493" fill="#201846"/>
      <polygon points="1255,585 1317,554 1317,462 1255,493" fill="#31265F"/>
      <polygon points="1255,493 1317,462 1255,439 1193,470" fill="#443A80"/>
      <path d="M1193 470 L1255 493 L1317 462" fill="none" stroke="#8B6CFF" stroke-opacity=".35"/>
      <g transform="translate(1255 493) skewY(-26.565)" fill="#FFC46B" opacity=".75">
        <rect x="12" y="22" width="13" height="15" rx="1"/>
        <rect x="34" y="16" width="13" height="15" rx="1" fill="#5BF0E4" opacity=".8"/>
        <rect x="12" y="48" width="13" height="15" rx="1" fill="#FF9EC2"/>
        <rect x="12" y="70" width="36" height="4" fill="#5BF0E4" opacity=".8"/>
      </g>
      <g transform="translate(1255 493) skewY(26.565)" fill="#FF9EC2" opacity=".6">
        <rect x="-46" y="26" width="12" height="14" rx="1" fill="#5BF0E4"/>
        <rect x="-24" y="40" width="12" height="14" rx="1"/>
        <rect x="-46" y="54" width="12" height="14" rx="1" fill="#FFC46B"/>
      </g>
      <rect x="1298" y="508" width="24" height="66" rx="1" fill="#0C0A22" stroke="#5BF0E4" stroke-opacity=".6" filter="url(#fGlowCyan)"/>
      <text class="screen-text" x="1310" y="534" text-anchor="middle" font-size="12" fill="#5BF0E4">24</text>
      <text class="screen-text" x="1310" y="550" text-anchor="middle" font-size="12" fill="#5BF0E4">H</text>
      <path d="M1255 585 L1317 554" stroke="#0A061A" stroke-opacity=".4"/>
      <path d="M1193 470 L1255 493" stroke="#B58CFF" stroke-opacity=".2"/>
      <path d="M1268 462 v12 h18 v-12" fill="#221B49" stroke="#4B3F86" stroke-width="1"/>
      <ellipse cx="1277" cy="462" rx="9" ry="3.5" fill="#42397D"/>
      <path d="M1290 455 l10 -8 M1300 447 v10" stroke="#8B6CFF" stroke-opacity=".45" stroke-width="1.2"/>
      <circle cx="1196" cy="486" r="3" fill="#FF4D8D" opacity=".65" filter="url(#fGlowPink)"/>
    </g>

    <g class="tree tree--left" transform="translate(768 516)">
      <ellipse cx="0" cy="32" rx="26" ry="8" fill="#05020F" opacity=".4"/>
      <path d="M0 30 C1 16 -2 4 0 -8" stroke="#1A1033" stroke-width="4" fill="none"/>
      <circle cx="-12" cy="-14" r="20" fill="#4A2A6B" opacity=".85"/>
      <circle cx="11" cy="-20" r="24" fill="#5B3579" opacity=".8"/>
      <circle cx="2" cy="-36" r="17" fill="#77458E" opacity=".7"/>
      <circle cx="-8" cy="-24" r="11" fill="#FF8FB4" opacity=".18"/>
      <circle cx="16" cy="-30" r="2" fill="#FFC46B" filter="url(#fGlowPink)"/>
    </g>
    <g class="tree tree--right" transform="translate(1344 526)">
      <ellipse cx="0" cy="34" rx="30" ry="9" fill="#05020F" opacity=".4"/>
      <path d="M0 32 C2 16 -2 2 0 -10" stroke="#1A1033" stroke-width="4" fill="none"/>
      <circle cx="-14" cy="-18" r="22" fill="#40245F"/>
      <circle cx="12" cy="-24" r="26" fill="#5B3579" opacity=".9"/>
      <circle cx="2" cy="-40" r="18" fill="#77458E" opacity=".7"/>
      <circle cx="10" cy="-32" r="10" fill="#5BF0E4" opacity=".14"/>
      <circle cx="-8" cy="-44" r="2.4" fill="#FFC46B" filter="url(#fGlowPink)"/>
      <path d="M-8 -44 v8" stroke="#0A061A" stroke-width="1"/>
    </g>

    <g class="street-props">
      <g class="power-pole">
        <path d="M814 538 L814 474" stroke="#0A061A" stroke-width="3"/>
        <path d="M804 482 h20 M807 494 h14" stroke="#0A061A" stroke-width="2"/>
        <path d="M814 480 C840 500 864 470 884 448" fill="none" stroke="#0A061A" stroke-width="1.2" opacity=".8"/>
        <path d="M814 486 C846 512 876 486 902 462" fill="none" stroke="#0A061A" stroke-width="1" opacity=".6"/>
        <circle cx="814" cy="470" r="2.4" fill="#FFC46B" filter="url(#fGlowPink)"/>
      </g>
      <g class="street-lamp" transform="translate(1002 644)">
        <ellipse cx="4" cy="4" rx="34" ry="9" fill="url(#gAmberLight)" opacity=".7"/>
        <path d="M0 0 V-58 C0 -66 8 -70 16 -70" fill="none" stroke="#0A061A" stroke-width="3"/>
        <circle cx="20" cy="-70" r="18" fill="url(#gAmberLight)" opacity=".8"/>
        <circle cx="20" cy="-70" r="4" fill="#FFF4DA" filter="url(#fGlowPink)"/>
        <path d="M-4 0 h8" stroke="#0A061A" stroke-width="3"/>
      </g>
      <g class="vending" transform="translate(928 596)">
        <ellipse cx="16" cy="28" rx="34" ry="9" fill="#5BF0E4" opacity=".18" filter="url(#fBlur)"/>
        <polygon points="0,0 8,-4 34,-4 26,0" fill="#121A3D"/>
        <polygon points="26,0 34,-4 34,24 26,28" fill="#071022"/>
        <rect x="0" y="0" width="26" height="28" rx="1.5" fill="#091228" stroke="#5BF0E4" stroke-opacity=".55"/>
        <rect x="4" y="4" width="18" height="14" fill="url(#gCool)" opacity=".75"/>
        <rect x="4" y="30" width="18" height="2" fill="#5BF0E4" opacity=".5"/>
        <circle cx="20" cy="24" r="1.4" fill="#FF4D8D"/>
        <path d="M7 6 v10 M11 6 v10 M15 8 v8" stroke="#071022" stroke-width="1" opacity=".5"/>
      </g>
      <g class="cat" transform="translate(1074 664)">
        <ellipse cx="0" cy="10" rx="12" ry="4" fill="#05020F" opacity=".45"/>
        <path d="M-7 8 C-7 0 -2 -4 3 -3 C8 -2 9 3 8 8 Z" fill="#0A061A"/>
        <circle cx="4" cy="-7" r="5" fill="#0A061A"/>
        <path d="M0 -10 l-1 -5 4 3 M7 -11 l3 -4 0 5" fill="#0A061A"/>
        <path d="M8 4 C15 2 16 8 11 9" fill="none" stroke="#0A061A" stroke-width="2" stroke-linecap="round"/>
        <circle cx="3" cy="-8" r=".9" fill="#FFC46B"/>
        <circle cx="6.5" cy="-8" r=".9" fill="#FFC46B"/>
      </g>
      <g class="walker" transform="translate(958 662)">
        <ellipse cx="0" cy="8" rx="11" ry="3" fill="#05020F" opacity=".4"/>
        <path d="M-8 -8 C-10 -27 10 -29 9 -8 Z" fill="#0C0720"/>
        <circle cx="0" cy="-32" r="4" fill="#0C0720"/>
        <path d="M-16 -40 C-13 -52 13 -52 16 -40 C7 -44 -6 -44 -16 -40 Z" fill="#FF4D8D" opacity=".8"/>
        <path d="M0 -40 v8" stroke="#FF4D8D" stroke-opacity=".6" stroke-width="1"/>
        <path d="M-4 -4 v9 M4 -4 v9" stroke="#0C0720" stroke-width="3"/>
      </g>
      <g class="walker walker--b" transform="translate(1038 650)">
        <ellipse cx="0" cy="8" rx="10" ry="3" fill="#05020F" opacity=".35"/>
        <path d="M-7 -7 C-9 -24 9 -26 8 -7 Z" fill="#0C0720"/>
        <circle cx="0" cy="-29" r="3.6" fill="#0C0720"/>
        <path d="M-14 -36 C-11 -46 11 -46 14 -36 C6 -40 -5 -40 -14 -36 Z" fill="#5BF0E4" opacity=".6"/>
        <path d="M0 -36 v7" stroke="#5BF0E4" stroke-opacity=".5" stroke-width="1"/>
        <circle cx="2" cy="-8" r="1.4" fill="#5BF0E4" filter="url(#fGlowCyan)"/>
        <path d="M-3 -4 v8 M3 -4 v8" stroke="#0C0720" stroke-width="2.5"/>
      </g>
      <g fill="#5BF0E4" opacity=".5">
        <circle cx="825" cy="536" r="1.4"/>
        <circle cx="900" cy="604" r="1"/>
        <circle cx="1168" cy="618" r="1.2"/>
        <circle cx="1280" cy="608" r="1"/>
      </g>
    </g>
  </g>

  <g class="layer layer--rocks" aria-hidden="true">
    <g class="float-rock float-rock--a">
      <polygon points="590,710 650,740 590,770 530,740" fill="#2A225C"/>
      <polygon points="530,740 590,770 590,786 530,756" fill="#181038"/>
      <polygon points="590,770 650,740 650,756 590,786" fill="#221644"/>
      <polygon points="530,756 590,786 650,756 620,850 586,830 570,864" fill="url(#gRockL)"/>
      <path d="M540 744 C566 734 600 744 640 734" fill="none" stroke="#5BF0E4" stroke-opacity=".35"/>
      <circle cx="600" cy="730" r="2.2" fill="#FFC46B" filter="url(#fGlowPink)"/>
      <path d="M600 730 v10" stroke="#0A061A"/>
    </g>
    <g class="float-rock float-rock--b">
      <polygon points="1518,674 1558,694 1518,714 1478,694" fill="#2A225C"/>
      <polygon points="1478,694 1518,714 1518,726 1478,706" fill="#181038"/>
      <polygon points="1518,714 1558,694 1558,706 1518,726" fill="#221644"/>
      <polygon points="1478,706 1518,726 1558,706 1534,770 1508,752 1496,780" fill="url(#gRockL)"/>
      <polygon points="1530,688 1536,698 1530,712 1524,700" fill="#5BF0E4" opacity=".55"/>
      <circle cx="1518" cy="690" r="2" fill="#FFC46B" opacity=".8"/>
    </g>
    <g class="float-rock float-rock--c">
      <polygon points="716,378 746,394 716,410 686,394" fill="#241C50"/>
      <polygon points="716,410 746,394 746,404 716,420" fill="#181038"/>
      <polygon points="686,394 716,410 716,420 686,404" fill="#1C133C"/>
      <polygon points="686,404 716,420 746,404 732,452 712,438 704,458" fill="#1A1033"/>
    </g>
  </g>

  <g class="layer layer--clouds-front" aria-hidden="true">
    <path d="M-80 920 C40 860 190 876 250 920 C330 890 420 910 456 950 C520 950 560 978 520 1000 L-80 1000 Z" fill="#221844" opacity=".7" filter="url(#fBlur)"/>
    <path d="M1120 962 C1190 916 1300 924 1350 956 C1430 924 1520 944 1560 978 C1600 986 1620 1000 1580 1000 L1080 1000 Z" fill="#2A1C50" opacity=".75" filter="url(#fBlur)"/>
    <path d="M700 812 C780 786 850 800 884 822 C930 806 976 822 990 846 C944 862 862 860 800 850 C750 844 714 830 700 812 Z" fill="#5BF0E4" opacity=".05" filter="url(#fBlur)"/>
    <path d="M-40 730 C60 700 150 716 178 744 C120 766 42 766 -40 750 Z" fill="#B58CFF" opacity=".05" filter="url(#fBlur)"/>
  </g>

  <g class="layer layer--motes" aria-hidden="true">
    <circle class="mote" cx="700" cy="600" r="1.6" fill="#FFC46B" filter="url(#fGlowPink)"/>
    <circle class="mote" cx="1130" cy="560" r="2" fill="#5BF0E4" filter="url(#fGlowCyan)"/>
    <circle class="mote" cx="880" cy="470" r="1.4" fill="#FF8FB4"/>
    <circle class="mote" cx="1270" cy="720" r="1.8" fill="#FFC46B" filter="url(#fGlowPink)"/>
    <circle class="mote" cx="980" cy="760" r="1.2" fill="#DFFCFF"/>
    <circle class="mote" cx="600" cy="650" r="1.8" fill="#5BF0E4"/>
    <circle class="mote" cx="1450" cy="620" r="1.4" fill="#FF8FB4"/>
    <circle class="mote" cx="760" cy="700" r="1.2" fill="#FFC46B"/>
    <circle class="mote" cx="1360" cy="540" r="1.6" fill="#DFFCFF"/>
    <circle class="mote" cx="1120" cy="680" r="1.3" fill="#5BF0E4"/>
    <circle class="mote" cx="500" cy="820" r="1.5" fill="#FF8FB4"/>
    <circle class="mote" cx="1500" cy="780" r="1.2" fill="#FFC46B"/>
  </g>`;
