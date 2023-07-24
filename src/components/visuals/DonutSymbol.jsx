import React from "react";

const DonutSymbol = ({ color }) => {
  return (
    
    <div>
      {/* <?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd"> */}
      <svg
        className="h-6 w-6 flex-no-shrink"
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1280.000000 1280.000000"
        preserveAspectRatio="xMidYMid meet"
        fill={`#${color}`}
      >
        <metadata>
          Created by potrace 1.15, written by Peter Selinger 2001-2017
        </metadata>
        <g
          transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
        >
          <path
            d="M5980 11639 c-1144 -99 -2171 -523 -3040 -1257 -262 -221 -581 -561
-802 -852 -1043 -1379 -1349 -3199 -816 -4850 142 -441 354 -885 606 -1270
214 -328 414 -573 702 -860 212 -212 366 -347 574 -503 1142 -851 2545 -1207
3966 -1006 1494 212 2843 1071 3683 2345 506 767 800 1631 867 2549 13 180 13
590 0 770 -93 1283 -638 2473 -1550 3385 -267 267 -496 455 -810 665 -718 480
-1476 758 -2359 866 -133 17 -241 21 -541 24 -206 2 -422 -1 -480 -6z m723
-3215 c591 -82 1134 -427 1471 -934 73 -109 173 -307 220 -434 146 -392 170
-853 65 -1263 -193 -756 -787 -1346 -1548 -1538 -296 -74 -629 -81 -941 -19
-638 128 -1196 563 -1485 1158 -347 715 -265 1562 214 2204 83 111 261 294
371 382 323 257 735 423 1142 459 130 12 347 5 491 -15z"
          />
        </g>
      </svg>
    </div>
  );
};

export default DonutSymbol;
