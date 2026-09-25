/**
 * Décor fixe de l'accueil : les six paysages, copiés à l'identique de la maquette
 * (docs/refonte/solyb-reference.html). Composant serveur : le dessin part dans le
 * HTML, le script (VoyageController) ne fait que l'animer et y ajouter les éléments
 * tirés au hasard (tiges de canne, tôle, étoiles, lucioles).
 *
 * Les attributs data-d des plans (.L) donnent leur profondeur, du ciel (0) au
 * premier plan (4) : ils règlent l'arrivée des plans et la parallaxe.
 * data-foyer : abscisse (dans le dessin 1600×900) de ce qu'il faut voir en
 * priorité quand l'écran est étroit — l'île : volcan et soleil ; la plage : le
 * grand palmier ; la rivière : la cascade ; la canne : la distillerie ; le
 * couchant : le soleil et le palmier ; la nuit : le volcan et la lune.
 * data-foyer-y : hauteur de ce point, quand il est dessiné trop bas pour la bande
 * que les cartes laissent libre en haut de l'écran mobile ; le paysage est alors
 * remonté, et son sol prolongé sous y = 900 (rectangles invisibles sur ordinateur,
 * où le cadre s'arrête à 900) comble le bas de l'écran.
 */

/** Formes partagées par les paysages (palmes, nuages, feuilles, hibiscus). */
export function SharedShapes() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="frond" overflow="visible"><path d="M0 0 C45 -46 130 -48 205 8 C160 -10 120 -6 90 8 C60 20 30 16 0 0Z" /></symbol>
      <symbol id="cloud" overflow="visible"><rect x="-110" y="-22" width="220" height="44" rx="22" /><rect x="-62" y="-52" width="124" height="60" rx="30" /></symbol>
      <symbol id="leaf" overflow="visible"><path d="M0 0 C-70 -40 -80 -160 0 -240 C80 -160 70 -40 0 0Z" /><path d="M0 -5 L0 -220" stroke="rgba(255,255,255,.18)" strokeWidth="5" /></symbol>
      <symbol id="hib" overflow="visible"><g fill="#C4472A"><circle cx="0" cy="-17" r="15" /><circle cx="16" cy="-5" r="15" /><circle cx="10" cy="14" r="15" /><circle cx="-10" cy="14" r="15" /><circle cx="-16" cy="-5" r="15" /></g><circle r="6" fill="#FFC94A" /></symbol>
    </svg>
  )
}

/** Libellés des paysages, dans l'ordre des data-scene (repris par le rail). */
export const SCENES = [
  "L'île et la Soufrière",
  "La plage",
  "La rivière et la cascade",
  "La canne et la distillerie",
  "Deshaies au couchant",
  "La nuit sur l'île"
] as const

/** Clés stables des paysages, dans le même ordre que SCENES. */
export const PAYSAGES = ["ile", "plage", "riviere", "canne", "couchant", "nuit"] as const
export type Paysage = (typeof PAYSAGES)[number]

/**
 * Tous les paysages (l'accueil), ou seulement ceux demandés : une page qui n'en
 * montre qu'un ne charge que celui-là.
 */
export default function Stage({ paysages }: { paysages?: readonly Paysage[] }) {
  const voir = (p: Paysage) => !paysages || paysages.includes(p)
  return (
    <div className="stage" aria-hidden="true">
      {/* A · L'île */}
      {voir("ile") && (
        <div className="scene" data-name="L'île et la Soufrière" data-paysage="ile" data-foyer="1319" data-foyer-y="330">
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
          <defs><linearGradient id="aSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F5F2ED" /><stop offset=".6" stopColor="#FFE6BC" /><stop offset="1" stopColor="#FFCB8E" /></linearGradient></defs>
          <g className="L" data-d="0"><g><rect width="1600" height="900" fill="url(#aSky)" /><circle className="a-sun" cx="1430" cy="250" r="78" fill="#FFC94A" /></g></g>
          <g className="L" data-d="1"><g className="drift" fill="#fff"><use href="#cloud" x="330" y="210" opacity=".9" /><use href="#cloud" x="880" y="140" opacity=".75" transform="scale(1)" /><use href="#cloud" x="1500" y="380" opacity=".8" /></g></g>
          <g className="L" data-d="1"><g>
          <path d="M760 900 L1130 380 Q1170 330 1210 356 Q1250 330 1290 380 L1600 760 L1600 900Z" fill="#8DBFB3" />
          <path d="M1130 380 Q1170 330 1210 356 Q1250 330 1290 380 L1260 420 L1215 400 L1170 425Z" fill="#A9CFC5" />
          <g className="smoke" fill="#fff"><ellipse cx="1210" cy="346" rx="120" ry="26" opacity=".95" /><ellipse cx="1270" cy="318" rx="70" ry="22" opacity=".85" /><ellipse cx="1150" cy="328" rx="55" ry="18" opacity=".8" /></g>
          </g></g>
          <g className="L" data-d="2"><g><path d="M0 900 L0 640 Q200 560 420 600 T820 570 Q1000 530 1180 610 T1600 590 L1600 900Z" fill="#3E8C7F" /></g></g>
          <g className="L" data-d="3"><g fill="#17625D"><path d="M0 900 L0 720 Q180 660 360 700 T760 690 Q960 650 1160 712 T1600 690 L1600 900Z" /><circle cx="420" cy="690" r="34" /><circle cx="470" cy="700" r="28" /><circle cx="980" cy="668" r="36" /><circle cx="1030" cy="676" r="26" /><circle cx="1400" cy="690" r="32" /></g></g>
          <g className="L" data-d="4"><g fill="#0E0D0B"><rect y="899" width="1600" height="361" /><path d="M0 900 L0 820 Q300 770 620 810 T1250 800 Q1450 780 1600 800 L1600 900Z" /><circle cx="120" cy="815" r="40" /><circle cx="180" cy="800" r="46" /><circle cx="240" cy="820" r="36" /><circle cx="1280" cy="795" r="44" /><circle cx="1340" cy="780" r="52" /><circle cx="1410" cy="800" r="40" /><use href="#hib" x="1340" y="850" transform="" /></g></g>
          <g className="L" data-d="2"><g className="birds" fill="none" stroke="#0E0D0B" strokeWidth="3" strokeLinecap="round"><path d="M620 300 q12 -12 24 0 q12 -12 24 0" /><path d="M690 330 q9 -9 18 0 q9 -9 18 0" /><path d="M560 350 q8 -8 16 0 q8 -8 16 0" /></g></g>
          </svg>
        </div>
      )}

      {/* B · La plage */}
      {voir("plage") && (
        <div className="scene" data-name="La plage" data-paysage="plage" data-foyer="1250">
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
          <defs><linearGradient id="bSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A8DDD6" /><stop offset="1" stopColor="#F5F2ED" /></linearGradient></defs>
          <g className="L" data-d="0"><g><rect width="1600" height="900" fill="url(#bSky)" /><circle cx="1250" cy="170" r="60" fill="#FFC94A" /></g></g>
          <g className="L" data-d="1"><g className="drift" fill="#fff"><use href="#cloud" x="420" y="170" opacity=".9" /><use href="#cloud" x="1000" y="260" opacity=".8" /></g></g>
          <g className="L" data-d="1"><g><rect y="470" width="1600" height="430" fill="#1E8C84" /><path d="M980 472 Q1050 420 1130 472Z" fill="#3E8C7F" /><path d="M1060 440 l0 -18 M1060 424 q10 -8 18 0" stroke="#17625D" strokeWidth="4" fill="none" />
          <g className="boat"><path d="M620 462 L700 462 L688 478 L632 478Z" fill="#C4472A" /><path d="M660 458 L660 380 L705 456Z" fill="#fff" /><path d="M656 456 L656 400 L625 454Z" fill="#F5F2ED" /></g></g></g>
          <g className="L" data-d="2"><g><path d="M0 900 L0 560 Q400 540 800 560 T1600 555 L1600 900Z" fill="#00BFA5" />
          <g className="waves" fill="none" stroke="#F5F2ED" strokeWidth="3" strokeLinecap="round" opacity=".6"><path d="M80 600 q30 -10 60 0 q30 10 60 0" /><path d="M500 590 q30 -10 60 0 q30 10 60 0" /><path d="M900 610 q30 -10 60 0 q30 10 60 0" /><path d="M1300 596 q30 -10 60 0 q30 10 60 0" /></g></g></g>
          <g className="L" data-d="3"><g><path className="shore" d="M0 900 L0 690 Q200 660 420 690 T840 680 Q1080 660 1300 690 T1600 680 L1600 900Z" fill="#7FD1C4" />
          <path className="foamline" d="M0 712 Q200 682 420 712 T840 702 Q1080 682 1300 712 T1600 702" fill="none" stroke="#fff" strokeWidth="6" opacity=".85" /></g></g>
          <g className="L" data-d="4"><g><path d="M0 900 L0 760 Q260 730 560 760 T1160 750 Q1400 735 1600 752 L1600 900Z" fill="#F6DEA6" /><path d="M0 900 L0 820 Q400 800 800 830 T1600 815 L1600 900Z" fill="#F1CF86" />
          <g className="palm" data-ox="1250" data-oy="470"><path d="M1320 870 Q1300 650 1250 470" stroke="#0E0D0B" strokeWidth="20" fill="none" strokeLinecap="round" />
          <g className="crown" fill="#17625D"><use href="#frond" x="1250" y="470" transform="rotate(-160 1250 470)" /><use href="#frond" x="1250" y="470" transform="rotate(-125 1250 470)" /><use href="#frond" x="1250" y="470" transform="rotate(-90 1250 470) scale(1)" /><use href="#frond" x="1250" y="470" transform="rotate(-55 1250 470)" /><use href="#frond" x="1250" y="470" transform="rotate(-15 1250 470)" /><use href="#frond" x="1250" y="470" transform="rotate(20 1250 470)" /><use href="#frond" x="1250" y="470" transform="rotate(160 1250 470)" /><circle cx="1245" cy="486" r="11" fill="#C9573D" /><circle cx="1262" cy="482" r="10" fill="#C9573D" /></g></g>
          <g className="palm" data-ox="1480" data-oy="540"><path d="M1440 880 Q1450 700 1480 540" stroke="#0E0D0B" strokeWidth="16" fill="none" strokeLinecap="round" />
          <g className="crown" fill="#3E8C7F"><use href="#frond" x="1480" y="540" transform="rotate(-170 1480 540) scale(.8)" /><use href="#frond" x="1480" y="540" transform="rotate(-120 1480 540) scale(.8)" /><use href="#frond" x="1480" y="540" transform="rotate(-70 1480 540) scale(.8)" /><use href="#frond" x="1480" y="540" transform="rotate(-20 1480 540) scale(.8)" /><use href="#frond" x="1480" y="540" transform="rotate(25 1480 540) scale(.8)" /></g></g>
          <g><rect x="980" y="800" width="120" height="14" rx="7" fill="#C4472A" /><path d="M1040 800 L1040 700" stroke="#0E0D0B" strokeWidth="5" /><path d="M960 715 Q1040 650 1120 715Z" fill="#FFC94A" /></g>
          </g></g>
          </svg>
        </div>
      )}

      {/* C · La rivière */}
      {voir("riviere") && (
        <div className="scene" data-name="La rivière et la cascade" data-paysage="riviere" data-foyer="1235">
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
          <defs><linearGradient id="cSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1E6F63" /><stop offset="1" stopColor="#0E0D0B" /></linearGradient></defs>
          <g className="L" data-d="0"><g><rect width="1600" height="900" fill="url(#cSky)" /></g></g>
          <g className="L" data-d="1"><g fill="#2A7E70"><path d="M0 0 H1600 V260 Q1500 300 1420 250 Q1340 310 1250 250 Q1160 300 1080 240 Q980 300 880 250 Q780 300 680 240 Q560 290 460 250 Q340 300 220 250 Q110 290 0 250Z" /></g></g>
          <g className="L" data-d="2"><g>
          <path d="M800 900 L860 300 Q900 200 1000 180 L1170 170 L1170 700 L800 900Z" fill="#244B4B" />
          <path d="M1300 700 L1300 160 L1460 180 Q1560 220 1600 320 L1600 900 L1300 900Z" fill="#244B4B" />
          <rect x="1170" y="160" width="130" height="560" fill="#CFE9E4" />
          <g className="fall" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeDasharray="46 34"><path d="M1185 160 V715" /><path d="M1210 160 V715" /><path d="M1235 160 V715" /><path d="M1260 160 V715" /><path d="M1285 160 V715" /></g>
          </g></g>
          <g className="L" data-d="3"><g>
          <ellipse cx="1235" cy="740" rx="300" ry="60" fill="#00BFA5" />
          <g className="ripples" fill="none" stroke="#F5F2ED" strokeWidth="3"><ellipse cx="1235" cy="735" rx="80" ry="14" /><ellipse cx="1235" cy="735" rx="80" ry="14" /><ellipse cx="1235" cy="735" rx="80" ry="14" /></g>
          <g className="mist" fill="#fff"><ellipse cx="1235" cy="712" rx="170" ry="30" opacity=".45" /><ellipse cx="1170" cy="700" rx="90" ry="22" opacity=".35" /><ellipse cx="1310" cy="704" rx="90" ry="22" opacity=".35" /></g>
          <path d="M900 900 Q940 770 1040 760 Q1090 790 1050 900Z" fill="#0E0D0B" /><path d="M1600 900 L1400 900 Q1420 780 1500 770 Q1570 780 1600 820Z" fill="#0E0D0B" />
          </g></g>
          <g className="L" data-d="4"><g>
          <g className="sway" data-ox="120" data-oy="900" fill="#17625D"><use href="#leaf" x="120" y="900" transform="rotate(-30 120 900) scale(1.3)" /><use href="#leaf" x="120" y="900" transform="rotate(10 120 900) scale(1.5)" /><use href="#leaf" x="120" y="900" transform="rotate(45 120 900) scale(1.1)" /></g>
          <g className="sway" data-ox="1560" data-oy="900" fill="#0E0D0B"><use href="#leaf" x="1560" y="900" transform="rotate(-40 1560 900) scale(1.4)" /><use href="#leaf" x="1560" y="900" transform="rotate(-10 1560 900) scale(1.2)" /></g>
          <use href="#hib" x="260" y="800" /><use href="#hib" x="1440" y="820" transform="scale(1)" /><use href="#hib" x="330" y="850" />
          </g></g>
          </svg>
        </div>
      )}

      {/* D · Champs de canne et distillerie */}
      {voir("canne") && (
        <div className="scene" data-name="La canne et la distillerie" data-paysage="canne" data-foyer="1355" data-foyer-y="440">
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
          <defs><linearGradient id="dSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE9C2" /><stop offset="1" stopColor="#FFD27A" /></linearGradient></defs>
          <g className="L" data-d="0"><g><rect width="1600" height="900" fill="url(#dSky)" /><circle cx="960" cy="210" r="115" fill="#FFC94A" opacity=".25" /><circle cx="960" cy="210" r="80" fill="#FFC94A" /></g></g>
          <g className="L" data-d="1"><g>
          <rect y="899" width="1600" height="361" fill="#A9C9A4" />
          <path d="M0 900 L0 540 Q300 480 600 520 T1200 500 Q1420 485 1600 510 L1600 900Z" fill="#A9C9A4" />
          <path d="M-20 596 Q400 572 800 588 T1640 578 L1640 612 Q1200 602 800 620 T-20 630Z" fill="#D9A85B" />
          <g className="distil">
          <g className="smoke-d" fill="#F5F2ED"><circle cx="1410" cy="312" r="13" /><circle cx="1410" cy="312" r="13" /><circle cx="1410" cy="312" r="13" /><circle cx="1410" cy="312" r="13" /><circle cx="1410" cy="312" r="13" /></g>
          <path d="M1394 575 L1399 330 L1421 330 L1426 575Z" fill="#8A3B24" />
          <rect x="1391" y="322" width="38" height="12" rx="2" fill="#6E2E1C" />
          <g fill="#6E2E1C"><rect x="1397" y="380" width="27" height="5" /><rect x="1396" y="440" width="29" height="5" /><rect x="1395" y="500" width="31" height="5" /></g>
          <rect x="1180" y="474" width="200" height="104" fill="#E6D5B8" />
          <path d="M1168 478 L1280 420 L1392 478Z" fill="#C4472A" />
          <g className="corrug" stroke="#9E3620" strokeWidth="2"></g>
          <rect x="1168" y="476" width="224" height="6" fill="#9E3620" />
          <g fill="#0E0D0B" opacity=".82"><rect x="1198" y="500" width="20" height="32" rx="10" /><rect x="1232" y="500" width="20" height="32" rx="10" /><rect x="1308" y="500" width="20" height="32" rx="10" /><rect x="1342" y="500" width="20" height="32" rx="10" /></g>
          <rect x="1263" y="520" width="34" height="58" rx="4" fill="#5A3A25" />
          <rect x="1426" y="508" width="110" height="70" fill="#D8C3A0" />
          <path d="M1420 512 L1542 492 L1542 504 L1420 522Z" fill="#9E3620" />
          <g strokeWidth="7" strokeLinecap="round"><path d="M1440 578 L1500 548" stroke="#A7B454" /><path d="M1446 578 L1512 552" stroke="#9A9C4A" /><path d="M1452 578 L1524 558" stroke="#A7B454" /><path d="M1438 572 L1496 540" stroke="#8C7A5A" /></g>
          </g>
          <g transform="translate(1690 600)"><g className="tractor"><g transform="scale(-1 1)">
          <g className="load" strokeWidth="6" strokeLinecap="round"><path d="M4 -54 L116 -60" stroke="#B5C75A" /><path d="M2 -62 L114 -70" stroke="#8FAE45" /><path d="M8 -70 L110 -80" stroke="#A7B454" /><path d="M14 -78 L104 -88" stroke="#B5C75A" /><path d="M24 -86 L94 -94" stroke="#8FAE45" /></g>
          <rect x="0" y="-54" width="122" height="30" rx="4" fill="#B8760A" />
          <g className="wheel"><circle cx="30" cy="-12" r="12" fill="#0E0D0B" /><circle cx="30" cy="-12" r="4" fill="#F5F2ED" /><path d="M30 -22 V-2 M20 -12 H40" stroke="#5A544C" strokeWidth="2" /></g>
          <g className="wheel"><circle cx="92" cy="-12" r="12" fill="#0E0D0B" /><circle cx="92" cy="-12" r="4" fill="#F5F2ED" /><path d="M92 -22 V-2 M82 -12 H102" stroke="#5A544C" strokeWidth="2" /></g>
          <rect x="120" y="-30" width="22" height="4" fill="#0E0D0B" />
          <path d="M142 -46 H204 L218 -32 V-18 H142Z" fill="#C4472A" />
          <path d="M148 -46 V-88 H184 L190 -46" fill="rgba(245,242,237,.35)" stroke="#0E0D0B" strokeWidth="4" strokeLinejoin="round" />
          <rect x="143" y="-93" width="48" height="7" rx="2" fill="#0E0D0B" />
          <rect x="203" y="-72" width="5" height="26" fill="#0E0D0B" />
          <g className="wheel"><circle cx="160" cy="-22" r="22" fill="#0E0D0B" /><circle cx="160" cy="-22" r="8" fill="#B8760A" /><path d="M160 -42 V-2 M140 -22 H180 M146 -36 L174 -8 M174 -36 L146 -8" stroke="#3A342D" strokeWidth="3" /></g>
          <g className="wheel"><circle cx="208" cy="-12" r="12" fill="#0E0D0B" /><circle cx="208" cy="-12" r="4" fill="#B8760A" /><path d="M208 -22 V-2 M198 -12 H218" stroke="#3A342D" strokeWidth="2" /></g>
          </g></g></g>
          </g></g>
          <g className="L" data-d="2"><g className="cane" data-row="0"></g></g>
          <g className="L" data-d="3"><g className="cane" data-row="1"></g></g>
          <g className="L" data-d="4"><g className="cane" data-row="2"></g></g>
          </svg>
        </div>
      )}

      {/* E · Deshaies au couchant */}
      {voir("couchant") && (
        <div className="scene" data-name="Deshaies au couchant" data-paysage="couchant" data-foyer="1225" data-foyer-y="540">
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
          <defs><linearGradient id="eSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0E0D0B" /><stop offset=".45" stopColor="#C4472A" /><stop offset=".62" stopColor="#FFC94A" /></linearGradient>
          <linearGradient id="eSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4A3328" /><stop offset="1" stopColor="#0E0D0B" /></linearGradient></defs>
          <g className="L" data-d="0"><g><rect width="1600" height="900" fill="url(#eSky)" /><circle className="e-sun" cx="1150" cy="560" r="120" fill="#FFE39A" /></g></g>
          <g className="L" data-d="1"><g><rect y="560" width="1600" height="340" fill="url(#eSea)" />
          <g className="glints" fill="#FFC94A"><rect x="1070" y="580" width="160" height="6" rx="3" /><rect x="1095" y="605" width="110" height="5" rx="2.5" fill="#C4472A" /><rect x="1050" y="632" width="200" height="6" rx="3" /><rect x="1110" y="660" width="80" height="5" rx="2.5" fill="#C4472A" /><rect x="1080" y="690" width="140" height="5" rx="2.5" /></g>
          <g fill="#0E0D0B"><path d="M820 552 L880 552 L872 562 L828 562Z" /><path d="M850 548 V470" stroke="#0E0D0B" strokeWidth="3" /><path d="M920 556 L960 556 L955 563 L925 563Z" /><path d="M940 552 V500" stroke="#0E0D0B" strokeWidth="2" /></g></g></g>
          <g className="L" data-d="2"><g fill="#0E0D0B"><path d="M0 900 L0 380 Q140 330 260 400 Q380 440 480 520 Q560 560 700 562 L700 900Z" /><path d="M1600 562 Q1520 520 1480 530 Q1440 540 1420 562Z" /></g></g>
          <g className="L" data-d="4"><g fill="#0E0D0B"><rect y="899" width="1600" height="361" /><path d="M600 900 Q900 820 1600 840 L1600 900Z" />
          <g className="palm" data-ox="1350" data-oy="500"><path d="M1420 880 Q1400 680 1350 500" stroke="#0E0D0B" strokeWidth="18" fill="none" strokeLinecap="round" />
          <g className="crown"><use href="#frond" x="1350" y="500" transform="rotate(-160 1350 500)" /><use href="#frond" x="1350" y="500" transform="rotate(-120 1350 500)" /><use href="#frond" x="1350" y="500" transform="rotate(-75 1350 500)" /><use href="#frond" x="1350" y="500" transform="rotate(-30 1350 500)" /><use href="#frond" x="1350" y="500" transform="rotate(15 1350 500)" /><use href="#frond" x="1350" y="500" transform="rotate(160 1350 500)" /></g></g></g></g>
          </svg>
        </div>
      )}

      {/* F · La nuit */}
      {voir("nuit") && (
        <div className="scene" data-name="La nuit sur l'île" data-paysage="nuit" data-foyer="1243">
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
          <defs><linearGradient id="fSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0E0D0B" /><stop offset=".7" stopColor="#0E0D0B" /><stop offset="1" stopColor="#3A2A22" /></linearGradient>
          <filter id="glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="4" /></filter></defs>
          <g className="L" data-d="0"><g><rect width="1600" height="900" fill="url(#fSky)" /><g className="stars" fill="#F5F2ED"></g>
          <circle cx="1350" cy="190" r="56" fill="#F5F2ED" /><circle cx="1374" cy="176" r="50" fill="#0E0D0B" /></g></g>
          <g className="L" data-d="1"><g><path d="M700 900 L1080 470 Q1120 430 1160 452 Q1200 430 1240 470 L1600 800 L1600 900Z" fill="#2A221C" /></g></g>
          <g className="L" data-d="2"><g><path d="M0 900 L0 650 Q220 580 460 620 T900 600 Q1120 570 1320 640 T1600 620 L1600 900Z" fill="#1E1915" />
          <g className="lights"><circle cx="300" cy="640" r="4" fill="#FFC94A" /><circle cx="330" cy="648" r="3" fill="#C4472A" /><circle cx="360" cy="636" r="4" fill="#FFC94A" /><circle cx="820" cy="612" r="4" fill="#FFC94A" /><circle cx="850" cy="620" r="3" fill="#C4472A" /><circle cx="1180" cy="612" r="4" fill="#FFC94A" /><circle cx="1210" cy="622" r="3" fill="#FFC94A" /><circle cx="1240" cy="616" r="4" fill="#C4472A" /></g></g></g>
          <g className="L" data-d="3"><g><path d="M0 900 L0 760 Q300 700 640 740 T1300 730 Q1480 720 1600 740 L1600 900Z" fill="#151210" /></g></g>
          <g className="L" data-d="4"><g><g className="flies" fill="#FFC94A" filter="url(#glow)"></g>
          <g className="sway" data-ox="1500" data-oy="900" fill="#0A0908"><use href="#leaf" x="1500" y="900" transform="rotate(-35 1500 900) scale(1.3)" /><use href="#leaf" x="1500" y="900" transform="rotate(5 1500 900) scale(1.1)" /></g></g></g>
          </svg>
        </div>
      )}
    </div>
  )
}
