(function(){
"use strict";

/* ---------- Icons ---------- */
const HEART='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.5-9.2C1 8 3 4.5 6.5 4.5c2 0 3.7 1.1 5.5 3 1.8-1.9 3.5-3 5.5-3C21 4.5 23 8 21.5 11.8 19.5 16.4 12 21 12 21z" fill="#ff4f9a" stroke="#c42a72" stroke-width="1.5" stroke-linejoin="round"/></svg>';
const COIN='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#ffd23f" stroke="#d9a400" stroke-width="1.5"/><circle cx="12" cy="12" r="6" fill="none" stroke="#d9a400" stroke-width="1.8"/></svg>';
const FLAME='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 2c1 4 5 6 5 11a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-10z" fill="#ff8a3d" stroke="#c9570c" stroke-width="1.5" stroke-linejoin="round"/></svg>';
const SPK='<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 8a5 5 0 0 1 0 8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
const MUTE='<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const BULB='<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" fill="#ffd23f" stroke="#b88700" stroke-width="1.5"/><rect x="9" y="19" width="6" height="3" rx="1.5" fill="#b88700"/></svg>';
const XI='<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="#32163a" stroke-width="3" stroke-linecap="round"/></svg>';
const USERI='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="8" r="4.2" fill="#7b4dff"/><path d="M3.5 21c.8-4.6 4.2-6.8 8.5-6.8s7.7 2.2 8.5 6.8z" fill="#7b4dff"/></svg>';
const LOCK='<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="3" fill="#fff"/><path d="M8 10V8a4 4 0 0 1 8 0v2" stroke="#fff" stroke-width="2.4" fill="none"/></svg>';
function star(on,s){return '<svg viewBox="0 0 24 24" width="'+s+'" height="'+s+'" aria-hidden="true"><path d="M12 2l3.1 6.6 7.2.9-5.3 5 1.4 7.2L12 18.1 5.6 21.7 7 14.5 1.7 9.5l7.2-.9z" fill="'+(on?'#ffd23f':'rgba(50,22,58,.16)')+'" '+(on?'stroke="#d9a400" stroke-width="1.5" stroke-linejoin="round"':'')+'/></svg>';}

/* ---------- Colours ---------- */
const P=[
 {a:'#ff8ac0',b:'#ff4f9a',d:'#c42a72'},
 {a:'#ffb067',b:'#ff8a3d',d:'#c9570c'},
 {a:'#5eeac0',b:'#1fcf9c',d:'#0b8f6a'},
 {a:'#7ed0ff',b:'#38b6ff',d:'#1678b8'},
 {a:'#ab8cff',b:'#7b4dff',d:'#4a28bd'},
 {a:'#b4e34f',b:'#7ac70c',d:'#4a8200'}
];
const OC=['#ff4f9a','#1f9fe8','#f07a1f','#14b383'];

/* ---------- Questions ---------- */
const pick=(code,ask,a,w,why)=>({t:'pick',code,ask,a,w,why});
const fill=(code,ask,a,w,why)=>({t:'fill',code,ask,a,w,why});
const build=(ask,ans,extra,why)=>({t:'build',ask,ans,extra,why});

const WORLDS=[
{name:'Sugar Start',sub:'Print, variables and math',w1:'#ff8ac0',w2:'#d92f82',bg:'#ffe6f2',clusters:[
 {name:'print()',col:0,qs:[
  pick('print("Hi")','What shows up on screen?','Hi',['"Hi"','print Hi','Nothing'],`«print()» shows whatever is inside the brackets. The quote marks only tell Python "this is text", so they are not shown.`),
  build('Print the word Yum',['print(','"Yum"',')'],['show(','Yum'],`A function call has three parts: the name «print», the brackets, and the thing you hand it. Text always goes in quotes.`),
  fill('___("Yum")','Which word makes the screen show Yum?','print',['show','echo','out'],`Python's own word for showing something is «print». Other languages use echo or console.log, but not Python.`),
  pick('print("a" + "b")','What shows up?','ab',['a b','a+b','Error'],`«+» between two pieces of text glues them together with no gap. This is called concatenation.`),
  pick('print(2 + 3)','What shows up?','5',['23','2 + 3','Error'],`No quotes means Python treats it as numbers and does the math before printing.`)
 ]},
 {name:'Variables',col:1,qs:[
  pick('x = 4\nprint(x)','What shows up?','4',['x','Error','0'],`A variable is a labeled box. «x = 4» puts 4 in the box named x, and «print(x)» shows what is inside.`),
  fill('score ___ 10','Which symbol stores 10 in score?','=',['==','=>',':'],`A single «=» means "put this value in the box". Two «==» ask a question instead, which you will meet with if.`),
  pick('a = 2\na = 5\nprint(a)','What shows up?','5',['2','7','Error'],`A new value replaces the old one. The box only holds the latest thing you put in.`),
  build('Store 7 in a variable called lives',['lives',' = ','7'],[' == ','"7"'],`Name first, then «=», then the value. No quotes around 7, because it is a number.`),
  pick('name = "Mia"\nprint(name)','What shows up?','Mia',['name','"Mia"','Error'],`Printing the variable shows the value inside it, not the variable's name.`)
 ]},
 {name:'Math',col:3,qs:[
  pick('print(7 - 2)','What shows up?','5',['9','72','Error'],`«-» subtracts. The other signs are «+», «*» for times and «/» for divide.`),
  pick('print(3 * 4)','What shows up?','12',['7','34','Error'],`Python uses the star «*» for multiply, since the letter x is already a normal name.`),
  pick('print(9 // 2)','What shows up?','4',['4.5','5','Error'],`«//» divides and throws away the leftover part, so 9 split into 2s gives 4.`),
  pick('print(10 % 3)','What shows up?','1',['3','0','3.33'],`«%» gives the remainder. 3 fits into 10 three times (9), and 1 is left over.`),
  pick('print(2 ** 3)','What shows up?','8',['6','5','23'],`«**» means power: 2 × 2 × 2 = 8.`)
 ]}
]},
{name:'Loopland',sub:'Decisions and repeating things',w1:'#1fbf8f',w2:'#0c8a67',bg:'#dcfaee',clusters:[
 {name:'if condition',col:2,qs:[
  pick('if 5 > 3:\n    print("Yes")','What shows up?','Yes',['Nothing','No','Error'],`«if» runs the indented lines only when the condition is True. 5 is bigger than 3, so it runs.`),
  pick('if 2 > 9:\n    print("Yes")','What shows up?','Nothing',['Yes','No','Error'],`2 is not bigger than 9, so the condition is False and Python skips the indented line. No error, just silence.`),
  fill('if x ___ 5:','Which sign checks that x equals 5?','==',['=','=>','is not'],`One «=» stores a value. Two «==» compare two values. Mixing them up is the classic beginner slip.`),
  pick('x = 4\nif x > 3:\n    print("big")\nelse:\n    print("small")','What shows up?','big',['small','big small','Nothing'],`«else» is the backup plan. It only runs when the «if» condition is False.`),
  build('Write the line that checks age is at least 18',['if ','age',' >= ','18',':'],[' => ',' = '],`«>=» means "greater than or equal to". The colon at the end tells Python an indented block comes next.`),
  pick('n = 5\nif n < 3:\n    print("A")\nelif n < 9:\n    print("B")\nelse:\n    print("C")','What shows up?','B',['A','C','A B'],`Python checks top to bottom and stops at the first True. «n < 3» is False, «n < 9» is True, so it prints B and skips the rest.`)
 ]},
 {name:'for loop',col:4,qs:[
  pick('for i in range(3):\n    print("Yay")','How many times does Yay show up?','3 times',['1 time','4 times','0 times'],`«range(3)» hands out three numbers, so the loop body runs three times.`),
  pick('for i in range(3):\n    print(i)','What shows up?','0, 1, 2',['1, 2, 3','0, 1, 2, 3','3'],`range starts counting at 0 and stops before the number you give it.`),
  fill('for i in ___(5):','Which word gives the loop its numbers?','range',['loop','repeat','count'],`«range(5)» makes the numbers 0 to 4. It is the usual partner of «for».`),
  build('Write the line that loops 4 times',['for ','i',' in ','range(4)',':'],[' of ','range[4]'],`The shape is «for name in range(times):». The name «i» is just a habit, any word works.`),
  pick('for c in "hey":\n    print(c)','How many lines show up?','3',['1','2','4'],`A for loop can walk through text too, one letter at a time: h, e, y.`),
  pick('total = 0\nfor n in range(1, 4):\n    total = total + n\nprint(total)','What shows up?','6',['3','4','10'],`«range(1, 4)» gives 1, 2, 3. Adding them into total gives 1 + 2 + 3 = 6.`)
 ]},
 {name:'while loop',col:5,qs:[
  pick('n = 3\nwhile n > 0:\n    print(n)\n    n = n - 1','What shows up?','3, 2, 1',['3, 2, 1, 0','1, 2, 3','It never stops'],`«while» repeats as long as the condition stays True. When n hits 0, «n > 0» is False and the loop ends before printing 0.`),
  fill('while n ___ 5:','Keep looping while n is below 5. Which sign?','<',['>','==','='],`The loop keeps going while the condition is True, so we want «n < 5».`),
  pick('n = 1\nwhile n < 4:\n    n = n + 1\nprint(n)','What shows up?','4',['3','5','1'],`n grows 1, 2, 3, 4. At 4 the check «n < 4» fails, the loop stops, and 4 is printed.`),
  pick('n = 1\nwhile n > 0:\n    n = n + 1','What happens?','It never stops',['It prints 1','It stops at 0','Error'],`n only grows, so «n > 0» is always True. That is an infinite loop. Make sure something inside the loop can change the condition.`),
  build('Write the line that loops while lives is above 0',['while ','lives',' > ','0',':'],[' if ',' = '],`A while line has the same shape as an if line: keyword, condition, colon.`),
  fill('while True:\n    print("go")\n    ___','Which word jumps out of the loop?','break',['exit','stop','end'],`«break» ends the loop on the spot. It is how «while True» loops get a way out.`)
 ]}
]},
{name:'Listopia',sub:'Text and collections',w1:'#9a78ff',w2:'#5530cc',bg:'#e9e3ff',clusters:[
 {name:'Strings',col:1,qs:[
  pick('print(len("candy"))','What shows up?','5',['4','candy','Error'],`«len()» counts the characters. c-a-n-d-y is five.`),
  pick('print("ha" * 3)','What shows up?','hahaha',['ha3','ha ha ha','Error'],`Multiplying text repeats it. No spaces are added.`),
  pick('print("sweet".upper())','What shows up?','SWEET',['Sweet','sweet','Error'],`Text has built-in tools you call with a dot. «.upper()» makes every letter a capital.`),
  pick('s = "sugar"\nprint(s[0])','What shows up?','s',['sugar','u','0'],`Positions start at 0, so «s[0]» is the first letter.`),
  build('Print the word pop in capitals',['print(','"pop"','.upper()',')'],['.up()','.big()'],`Chain the tool onto the text: «"pop".upper()» gives POP, then print shows it.`),
  pick('print("a,b,c".split(","))','What shows up?',`['a', 'b', 'c']`,['a b c','abc',`['a,b,c']`],`«.split(",")» cuts the text at every comma and gives back a list of the pieces.`)
 ]},
 {name:'Lists',col:0,qs:[
  pick('nums = [4, 8, 2]\nprint(nums[1])','What shows up?','8',['4','2','Error'],`List positions also start at 0. Position 1 is the second item, which is 8.`),
  pick('print(len([1, 2, 3, 4]))','What shows up?','4',['3','10','Error'],`«len()» works on lists too and counts the items.`),
  pick('a = [1]\na.append(2)\nprint(a)','What shows up?','[1, 2]',['[2]','[1]','[2, 1]'],`«.append()» adds an item to the end of the list.`),
  fill('fruits = ["fig"]\nfruits.___("kiwi")','Which tool adds kiwi to the end?','append',['add','push','put'],`Python lists use «append». Add and push belong to other languages.`),
  pick('print(sum([1, 2, 3]))','What shows up?','6',['123','3','[6]'],`«sum()» adds up every number in the list.`),
  pick('print([1, 2, 3][-1])','What shows up?','3',['1','2','Error'],`A negative position counts from the end. -1 is the last item.`),
  build('Print the biggest number in the list nums',['print(','max(','nums',')',')'],['min(','big('],`«max()» finds the biggest item. Here it sits inside print, so the brackets close twice.`)
 ]}
]}
];

const LV=[];
WORLDS.forEach((w,wi)=>w.clusters.forEach((c,ci)=>{
  for(let k=0;k<=c.qs.length;k++) LV.push({w,wi,c,ci,k,boss:k===c.qs.length,q:c.qs[k]});
}));
LV.forEach((l,i)=>{l.i=i;});

/* ---------- State ---------- */
const KEY='levelleet-v1';
function freshS(){return {stars:{},coins:30,xp:0,hearts:5,heartTs:null,streak:0,lastDay:'',treatDay:'',sound:true,voice:true,seen:{}};}
let S=freshS();
try{const raw=localStorage.getItem(KEY);if(raw)S=Object.assign(freshS(),JSON.parse(raw));}catch(e){}
if(!S.seen||typeof S.seen!=='object')S.seen={};
function saveLocal(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function save(){saveLocal();if(window.LevelleetSync)window.LevelleetSync.schedule();}
function dayStr(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
const today=()=>dayStr(new Date());
const yesterday=()=>dayStr(new Date(Date.now()-864e5));
const REGEN=600000;
function tick(){
  if(S.hearts>=5){S.hearts=5;S.heartTs=null;return;}
  if(!S.heartTs)S.heartTs=Date.now();
  const n=Math.floor((Date.now()-S.heartTs)/REGEN);
  if(n>0){S.hearts=Math.min(5,S.hearts+n);S.heartTs=S.hearts>=5?null:S.heartTs+n*REGEN;save();}
}
const unlocked=i=>i===0||(S.stars[i-1]||0)>0;
const curIdx=()=>{const k=LV.findIndex(l=>!S.stars[l.i]);return k<0?LV.length-1:k;};
const plvl=()=>Math.floor(S.xp/100)+1;

/* ---------- Helpers ---------- */
const $=id=>document.getElementById(id);
const hudEl=$('hud'),mapEl=$('map'),playEl=$('play'),sheetEl=$('sheet'),scrimEl=$('scrim'),toastEl=$('toast');
const notebookEl=$('notebook'),lessonEl=$('lesson');
const NOTE_KEY='levelleet-scratch-canvas-v1';
function openNotebook(){
  let saved='';try{saved=localStorage.getItem(NOTE_KEY)||'';}catch(e){}
  notebookEl.innerHTML='<div class="scratch-top"><button class="x" data-act="closenotebook" aria-label="Close rough work">'+XI+'</button><h2>Rough work</h2><div class="scratch-tools"><button class="btn ghost" data-act="undoScratch">↶ Undo</button><button class="btn ghost" data-act="erasenotes">Erase</button></div></div><div class="scratch-paper-wrap"><canvas id="scratchcanvas" aria-label="Blank page to draw or write with your finger"></canvas><div class="scratch-hint">Write or draw with your finger. Your rough work stays here until you erase it.</div></div>';
  notebookEl.hidden=false;lockScroll();
  const canvas=$('scratchcanvas'),ctx=canvas.getContext('2d');let drawing=false,last=null,strokes=[];
  function paintStroke(st){if(!st||st.length<2)return;ctx.beginPath();ctx.moveTo(st[0].x,st[0].y);for(let i=1;i<st.length;i++)ctx.lineTo(st[i].x,st[i].y);ctx.strokeStyle='#222';ctx.lineWidth=3;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();}
  function redraw(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);strokes.forEach(paintStroke);}
  function save(){try{localStorage.setItem(NOTE_KEY,JSON.stringify(strokes));}catch(e){}}
  function resize(){let old=document.createElement('canvas');old.width=canvas.width;old.height=canvas.height;old.getContext('2d').drawImage(canvas,0,0);const ratio=Math.max(1,window.devicePixelRatio||1),rect=canvas.getBoundingClientRect();canvas.width=Math.round(rect.width*ratio);canvas.height=Math.round(rect.height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);redraw();}
  try{const data=JSON.parse(saved);if(Array.isArray(data))strokes=data;}catch(e){}
  function paintAll(){const ratio=Math.max(1,window.devicePixelRatio||1);ctx.setTransform(ratio,0,0,ratio,0,0);redraw();}
  function point(e){const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};}
  canvas.addEventListener('pointerdown',e=>{drawing=true;canvas.setPointerCapture(e.pointerId);last=point(e);strokes.push([last]);});
  canvas.addEventListener('pointermove',e=>{if(!drawing)return;const p=point(e),st=strokes[strokes.length-1];st.push(p);ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.strokeStyle='#222';ctx.lineWidth=3;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();last=p;});
  function stopDraw(){if(drawing){drawing=false;last=null;save();}}
  canvas.addEventListener('pointerup',stopDraw);canvas.addEventListener('pointercancel',stopDraw);canvas.addEventListener('lostpointercapture',stopDraw);
  // Resize canvas backing store without discarding the saved strokes.
  function fit(){const ratio=Math.max(1,window.devicePixelRatio||1),r=canvas.getBoundingClientRect();canvas.width=Math.round(r.width*ratio);canvas.height=Math.round(r.height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);redraw();}
  fit();const oldResize=window.__levelleetScratchResize;if(oldResize)window.removeEventListener('resize',oldResize);window.__levelleetScratchResize=fit;window.addEventListener('resize',fit);
  notebookEl.__scratchUndo=()=>{strokes.pop();redraw();save();};notebookEl.__scratchErase=()=>{strokes=[];redraw();save();};
}
function closeNotebook(){notebookEl.hidden=true;if(window.__levelleetScratchResize){window.removeEventListener('resize',window.__levelleetScratchResize);window.__levelleetScratchResize=null;}lockScroll();}
/* ---------- Animated lessons ---------- */
const LESSONS=[{"name":"Sugar Start","hello":"Welcome to Sugar Start. Watch Python code write itself, then run.","bye":"You can now show messages, store values and do math. Time to play!","chapters":[{"name":"print()","cluster":0,"wrap":"That is print. It shows messages, numbers and results on the screen.","scenes":[{"code":"print(\"hi\")","say":"`print` shows a message on the screen. Whatever sits inside the quotes is the message.","steps":[{"ln":0,"vars":{},"out":["hi"]}]},{"code":"print(\"hi\")\nprint(\"hi\")\nprint(\"hi\")","say":"Python reads from the top, one line at a time. Three lines, three messages.","steps":[{"ln":0,"vars":{},"out":["hi"]},{"ln":1,"vars":{},"out":["hi"]},{"ln":2,"vars":{},"out":["hi"]}]},{"code":"print(2 + 3)","say":"No quotes means numbers. Python does the math first, then prints 5.","steps":[{"ln":0,"vars":{},"out":["5"]}]},{"code":"print(\"2 + 3\")","say":"With quotes it is only text, so Python prints it exactly as written.","steps":[{"ln":0,"vars":{},"out":["2 + 3"]}]},{"code":"print(\"a\" + \"b\")","say":"Plus glues pieces of text together. No space is added.","steps":[{"ln":0,"vars":{},"out":["ab"]}]},{"code":"print(\"Total:\", 75)","say":"A comma puts a space between the parts. This is how apps show bills and scores.","steps":[{"ln":0,"vars":{},"out":["Total: 75"]}]}],"tries":[{"label":"\"Yum\"","scene":{"code":"print(\"Yum\")","say":"Any text works. Just keep it inside the quotes.","steps":[{"ln":0,"vars":{},"out":["Yum"]}]}},{"label":"10 - 4","scene":{"code":"print(10 - 4)","say":"Numbers without quotes get calculated. 10 minus 4 is 6.","steps":[{"ln":0,"vars":{},"out":["6"]}]}},{"label":"\"Hi \" + \"Mia\"","scene":{"code":"print(\"Hi \" + \"Mia\")","say":"The space inside the quotes shows up in the result.","steps":[{"ln":0,"vars":{},"out":["Hi Mia"]}]}}]},{"name":"Variables","cluster":1,"wrap":"Variables are boxes with names. They remember values for later.","scenes":[{"code":"a = 1\nprint(a)","say":"A variable is a labeled box. `a = 1` puts the number 1 into a box named a.","steps":[{"ln":0,"vars":{"a":"1"}},{"ln":1,"vars":{"a":"1"},"out":["1"]}]},{"code":"a = 2\nprint(a)","say":"Change the number and the output changes. The box holds whatever you put in.","steps":[{"ln":0,"vars":{"a":"2"}},{"ln":1,"vars":{"a":"2"},"out":["2"]}]},{"code":"a = 2\na = 5\nprint(a)","say":"Put a new value in the same box and the old one is gone. Only the latest stays.","steps":[{"ln":0,"vars":{"a":"2"}},{"ln":1,"vars":{"a":"5"}},{"ln":2,"vars":{"a":"5"},"out":["5"]}]},{"code":"name = \"Mia\"\nprint(name)","say":"A box can hold text too. Printing shows what is inside, not the name of the box.","steps":[{"ln":0,"vars":{"name":"\"Mia\""}},{"ln":1,"vars":{"name":"\"Mia\""},"out":["Mia"]}]},{"code":"a = 3\nb = 4\nprint(a + b)","say":"Boxes work in math. Python opens both, adds 3 and 4, and prints 7.","steps":[{"ln":0,"vars":{"a":"3"}},{"ln":1,"vars":{"a":"3","b":"4"}},{"ln":2,"vars":{"a":"3","b":"4"},"out":["7"]}]},{"code":"lives = 3\nlives = lives - 1\nprint(lives)","say":"Games keep lives, scores and prices in variables. `lives - 1` takes one life away.","steps":[{"ln":0,"vars":{"lives":"3"}},{"ln":1,"vars":{"lives":"2"}},{"ln":2,"vars":{"lives":"2"},"out":["2"]}]}],"tries":[{"label":"lives = 5","scene":{"code":"lives = 5\nlives = lives - 1\nprint(lives)","say":"Start with 5 lives, lose one, and 4 are left.","steps":[{"ln":0,"vars":{"lives":"5"}},{"ln":1,"vars":{"lives":"4"}},{"ln":2,"vars":{"lives":"4"},"out":["4"]}]}},{"label":"a - b","scene":{"code":"a = 10\nb = 4\nprint(a - b)","say":"Change the sign and the same two boxes give a different answer.","steps":[{"ln":0,"vars":{"a":"10"}},{"ln":1,"vars":{"a":"10","b":"4"}},{"ln":2,"vars":{"a":"10","b":"4"},"out":["6"]}]}},{"label":"pet = \"Momo\"","scene":{"code":"pet = \"Momo\"\nprint(pet)","say":"Name a box anything you like. Pick names that explain themselves.","steps":[{"ln":0,"vars":{"pet":"\"Momo\""}},{"ln":1,"vars":{"pet":"\"Momo\""},"out":["Momo"]}]}}]},{"name":"Math","cluster":2,"wrap":"Python is a calculator: plus, minus, star, slash, double slash, percent and power.","scenes":[{"code":"print(7 - 2)","say":"Python can calculate. Minus subtracts, so 7 minus 2 is 5.","steps":[{"ln":0,"vars":{},"out":["5"]}]},{"code":"print(3 * 4)","say":"Star means times. Python uses a star because the letter x is a normal name.","steps":[{"ln":0,"vars":{},"out":["12"]}]},{"code":"print(3 / 2)","say":"One slash divides and keeps the decimal part. 3 divided by 2 is 1.5.","steps":[{"ln":0,"vars":{},"out":["1.5"]}]},{"code":"print(3 // 2)","say":"Two slashes divide and throw the leftover away. 3 split into 2s gives 1.","steps":[{"ln":0,"vars":{},"out":["1"]}]},{"code":"print(10 % 3)","say":"Percent gives the remainder. 3 goes into 10 three times, and 1 is left over.","steps":[{"ln":0,"vars":{},"out":["1"]}]},{"code":"print(2 ** 3)","say":"Two stars mean power. 2 times 2 times 2 is 8.","steps":[{"ln":0,"vars":{},"out":["8"]}]},{"code":"price = 25\nquantity = 3\nprint(price * quantity)","say":"Shops multiply price by quantity to get your bill.","steps":[{"ln":0,"vars":{"price":"25"}},{"ln":1,"vars":{"price":"25","quantity":"3"}},{"ln":2,"vars":{"price":"25","quantity":"3"},"out":["75"]}]}],"tries":[{"label":"9 // 2","scene":{"code":"print(9 // 2)","say":"Nine split into 2s gives 4. The leftover is thrown away.","steps":[{"ln":0,"vars":{},"out":["4"]}]}},{"label":"7 % 2","scene":{"code":"print(7 % 2)","say":"A remainder of 1 means the number is odd. A remainder of 0 means even.","steps":[{"ln":0,"vars":{},"out":["1"]}]}},{"label":"5 ** 2","scene":{"code":"print(5 ** 2)","say":"Five to the power of 2 is 5 times 5.","steps":[{"ln":0,"vars":{},"out":["25"]}]}}]}]},{"name":"Loopland","hello":"Welcome to Loopland. Here Python learns to decide and to repeat.","bye":"Now you can make decisions and repeat work. Time to play!","chapters":[{"name":"if condition","cluster":0,"wrap":"An if asks a question. True runs the block, False skips it, and else is the backup.","scenes":[{"code":"if 5 > 3:\n    print(\"Yes\")","say":"`if` asks a question. 5 is bigger than 3, so the answer is True and the indented line runs.","steps":[{"ln":0,"note":{"kind":"cond","text":"5 > 3","res":true},"vars":{}},{"ln":1,"vars":{},"out":["Yes"]}]},{"code":"if 2 > 9:\n    print(\"Yes\")","say":"Now the answer is False, so Python skips the indented line. Nothing is printed.","steps":[{"ln":0,"note":{"kind":"cond","text":"2 > 9","res":false},"vars":{}}],"empty":true},{"code":"x = 4\nif x == 4:\n    print(\"four\")","say":"Two equals signs ask a question: are they the same? One equals sign only stores a value.","steps":[{"ln":0,"vars":{"x":"4"}},{"ln":1,"note":{"kind":"cond","text":"4 == 4","res":true},"vars":{"x":"4"}},{"ln":2,"vars":{"x":"4"},"out":["four"]}]},{"code":"score = 40\nif score >= 50:\n    print(\"Pass\")\nelse:\n    print(\"Try again\")","say":"`else` is the backup plan. It runs only when the `if` answer is False.","steps":[{"ln":0,"vars":{"score":"40"}},{"ln":1,"note":{"kind":"cond","text":"40 >= 50","res":false},"vars":{"score":"40"}},{"ln":4,"vars":{"score":"40"},"out":["Try again"]}]},{"code":"n = 5\nif n < 3:\n    print(\"A\")\nelif n < 9:\n    print(\"B\")\nelse:\n    print(\"C\")","say":"Python checks from the top and stops at the first True. The first check fails, the second passes, so it prints B.","steps":[{"ln":0,"vars":{"n":"5"}},{"ln":1,"note":{"kind":"cond","text":"5 < 3","res":false},"vars":{"n":"5"}},{"ln":3,"note":{"kind":"cond","text":"5 < 9","res":true},"vars":{"n":"5"}},{"ln":4,"vars":{"n":"5"},"out":["B"]}]},{"code":"score = 82\nif score >= 90:\n    print(\"Gold\")\nelif score >= 60:\n    print(\"Silver\")\nelse:\n    print(\"Keep going\")","say":"Apps use this to pick a reward. 82 is not 90 or more, but it is 60 or more, so Silver.","steps":[{"ln":0,"vars":{"score":"82"}},{"ln":1,"note":{"kind":"cond","text":"82 >= 90","res":false},"vars":{"score":"82"}},{"ln":3,"note":{"kind":"cond","text":"82 >= 60","res":true},"vars":{"score":"82"}},{"ln":4,"vars":{"score":"82"},"out":["Silver"]}]}],"tries":[{"label":"score = 95","scene":{"code":"score = 95\nif score >= 90:\n    print(\"Gold\")\nelif score >= 60:\n    print(\"Silver\")\nelse:\n    print(\"Keep going\")","say":"95 is 90 or more, so the first block runs and Python skips the rest.","steps":[{"ln":0,"vars":{"score":"95"}},{"ln":1,"note":{"kind":"cond","text":"95 >= 90","res":true},"vars":{"score":"95"}},{"ln":2,"vars":{"score":"95"},"out":["Gold"]}]}},{"label":"score = 30","scene":{"code":"score = 30\nif score >= 90:\n    print(\"Gold\")\nelif score >= 60:\n    print(\"Silver\")\nelse:\n    print(\"Keep going\")","say":"30 fails both questions, so the else block runs.","steps":[{"ln":0,"vars":{"score":"30"}},{"ln":1,"note":{"kind":"cond","text":"30 >= 90","res":false},"vars":{"score":"30"}},{"ln":3,"note":{"kind":"cond","text":"30 >= 60","res":false},"vars":{"score":"30"}},{"ln":6,"vars":{"score":"30"},"out":["Keep going"]}]}},{"label":"x == 5","scene":{"code":"x = 4\nif x == 5:\n    print(\"five\")\nelse:\n    print(\"not five\")","say":"Two equals signs ask a question. 4 is not 5, so else runs.","steps":[{"ln":0,"vars":{"x":"4"}},{"ln":1,"note":{"kind":"cond","text":"4 == 5","res":false},"vars":{"x":"4"}},{"ln":4,"vars":{"x":"4"},"out":["not five"]}]}}]},{"name":"for loop","cluster":1,"wrap":"A for loop repeats for a fixed number of turns, or once for every item.","scenes":[{"code":"for i in range(3):\n    print(\"Yay\")","say":"A `for` loop repeats the indented lines. `range(3)` hands out three numbers, so Yay prints three times.","steps":[{"ln":0,"vars":{"i":"0"},"note":{"kind":"next","text":"i = 0"}},{"ln":1,"vars":{"i":"0"},"out":["Yay"]},{"ln":0,"vars":{"i":"1"},"note":{"kind":"next","text":"i = 1"}},{"ln":1,"vars":{"i":"1"},"out":["Yay"]},{"ln":0,"vars":{"i":"2"},"note":{"kind":"next","text":"i = 2"}},{"ln":1,"vars":{"i":"2"},"out":["Yay"]},{"ln":0,"vars":{"i":"2"},"note":{"kind":"done","text":"no more values, the loop ends"}}]},{"code":"for i in range(3):\n    print(i)","say":"The loop variable `i` takes the next number each turn. Counting starts at 0, not 1.","steps":[{"ln":0,"vars":{"i":"0"},"note":{"kind":"next","text":"i = 0"}},{"ln":1,"vars":{"i":"0"},"out":["0"]},{"ln":0,"vars":{"i":"1"},"note":{"kind":"next","text":"i = 1"}},{"ln":1,"vars":{"i":"1"},"out":["1"]},{"ln":0,"vars":{"i":"2"},"note":{"kind":"next","text":"i = 2"}},{"ln":1,"vars":{"i":"2"},"out":["2"]},{"ln":0,"vars":{"i":"2"},"note":{"kind":"done","text":"no more values, the loop ends"}}]},{"code":"for i in range(1, 4):\n    print(i)","say":"`range(1, 4)` starts at 1 and stops before 4. The last number is never included.","steps":[{"ln":0,"vars":{"i":"1"},"note":{"kind":"next","text":"i = 1"}},{"ln":1,"vars":{"i":"1"},"out":["1"]},{"ln":0,"vars":{"i":"2"},"note":{"kind":"next","text":"i = 2"}},{"ln":1,"vars":{"i":"2"},"out":["2"]},{"ln":0,"vars":{"i":"3"},"note":{"kind":"next","text":"i = 3"}},{"ln":1,"vars":{"i":"3"},"out":["3"]},{"ln":0,"vars":{"i":"3"},"note":{"kind":"done","text":"no more values, the loop ends"}}]},{"code":"total = 0\nfor n in range(1, 4):\n    total = total + n\nprint(total)","say":"Loops can build a result. Each turn adds n into total: 1, then 3, then 6.","steps":[{"ln":0,"vars":{"total":"0"}},{"ln":1,"vars":{"total":"0","n":"1"},"note":{"kind":"next","text":"n = 1"}},{"ln":2,"vars":{"total":"1","n":"1"}},{"ln":1,"vars":{"total":"1","n":"2"},"note":{"kind":"next","text":"n = 2"}},{"ln":2,"vars":{"total":"3","n":"2"}},{"ln":1,"vars":{"total":"3","n":"3"},"note":{"kind":"next","text":"n = 3"}},{"ln":2,"vars":{"total":"6","n":"3"}},{"ln":1,"vars":{"total":"6","n":"3"},"note":{"kind":"done","text":"no more values, the loop ends"}},{"ln":3,"vars":{"total":"6","n":"3"},"out":["6"]}]},{"code":"for c in \"hey\":\n    print(c)","say":"A `for` loop can also walk through text, one letter at a time.","steps":[{"ln":0,"vars":{"c":"\"h\""},"note":{"kind":"next","text":"c = \"h\""}},{"ln":1,"vars":{"c":"\"h\""},"out":["h"]},{"ln":0,"vars":{"c":"\"e\""},"note":{"kind":"next","text":"c = \"e\""}},{"ln":1,"vars":{"c":"\"e\""},"out":["e"]},{"ln":0,"vars":{"c":"\"y\""},"note":{"kind":"next","text":"c = \"y\""}},{"ln":1,"vars":{"c":"\"y\""},"out":["y"]},{"ln":0,"vars":{"c":"\"y\""},"note":{"kind":"done","text":"no more values, the loop ends"}}]},{"code":"cart = [\"tea\", \"rice\"]\nfor item in cart:\n    print(\"Pack\", item)","say":"Real apps loop over every item in a list, like products in a cart. No copy and paste needed.","steps":[{"ln":0,"vars":{"cart":"['tea', 'rice']"}},{"ln":1,"vars":{"cart":"['tea', 'rice']","item":"\"tea\""},"note":{"kind":"next","text":"item = \"tea\""}},{"ln":2,"vars":{"cart":"['tea', 'rice']","item":"\"tea\""},"out":["Pack tea"]},{"ln":1,"vars":{"cart":"['tea', 'rice']","item":"\"rice\""},"note":{"kind":"next","text":"item = \"rice\""}},{"ln":2,"vars":{"cart":"['tea', 'rice']","item":"\"rice\""},"out":["Pack rice"]},{"ln":1,"vars":{"cart":"['tea', 'rice']","item":"\"rice\""},"note":{"kind":"done","text":"no more values, the loop ends"}}]}],"tries":[{"label":"range(5)","scene":{"code":"for i in range(5):\n    print(i)","say":"Five turns: 0, 1, 2, 3 and 4. The 5 never appears.","steps":[{"ln":0,"vars":{"i":"0"},"note":{"kind":"next","text":"i = 0"}},{"ln":1,"vars":{"i":"0"},"out":["0"]},{"ln":0,"vars":{"i":"1"},"note":{"kind":"next","text":"i = 1"}},{"ln":1,"vars":{"i":"1"},"out":["1"]},{"ln":0,"vars":{"i":"2"},"note":{"kind":"next","text":"i = 2"}},{"ln":1,"vars":{"i":"2"},"out":["2"]},{"ln":0,"vars":{"i":"3"},"note":{"kind":"next","text":"i = 3"}},{"ln":1,"vars":{"i":"3"},"out":["3"]},{"ln":0,"vars":{"i":"4"},"note":{"kind":"next","text":"i = 4"}},{"ln":1,"vars":{"i":"4"},"out":["4"]},{"ln":0,"vars":{"i":"4"},"note":{"kind":"done","text":"no more values, the loop ends"}}]}},{"label":"range(1)","scene":{"code":"for i in range(1):\n    print(\"Once\")","say":"A range of 1 gives a single turn.","steps":[{"ln":0,"vars":{"i":"0"},"note":{"kind":"next","text":"i = 0"}},{"ln":1,"vars":{"i":"0"},"out":["Once"]},{"ln":0,"vars":{"i":"0"},"note":{"kind":"done","text":"no more values, the loop ends"}}]}},{"label":"range(0)","scene":{"code":"for i in range(0):\n    print(\"Never\")","say":"A range of 0 gives zero turns, so the body never runs.","steps":[{"ln":0,"vars":{},"note":{"kind":"done","text":"no more values, the loop ends"}}],"empty":true}}]},{"name":"while loop","cluster":2,"wrap":"A while loop repeats while its question is True. Always change something inside, or add a break.","scenes":[{"code":"n = 3\nwhile n > 0:\n    print(n)\n    n = n - 1","say":"`while` repeats as long as its question stays True. It checks before every turn, and stops when n reaches 0.","steps":[{"ln":0,"vars":{"n":"3"}},{"ln":1,"note":{"kind":"cond","text":"3 > 0","res":true},"vars":{"n":"3"}},{"ln":2,"vars":{"n":"3"},"out":["3"]},{"ln":3,"vars":{"n":"2"}},{"ln":1,"note":{"kind":"cond","text":"2 > 0","res":true},"vars":{"n":"2"}},{"ln":2,"vars":{"n":"2"},"out":["2"]},{"ln":3,"vars":{"n":"1"}},{"ln":1,"note":{"kind":"cond","text":"1 > 0","res":true},"vars":{"n":"1"}},{"ln":2,"vars":{"n":"1"},"out":["1"]},{"ln":3,"vars":{"n":"0"}},{"ln":1,"note":{"kind":"cond","text":"0 > 0","res":false},"vars":{"n":"0"}}]},{"code":"n = 1\nwhile n < 4:\n    n = n + 1\nprint(n)","say":"Something inside the loop must change, so the question can become False. Here n grows until 4 is not less than 4.","steps":[{"ln":0,"vars":{"n":"1"}},{"ln":1,"note":{"kind":"cond","text":"1 < 4","res":true},"vars":{"n":"1"}},{"ln":2,"vars":{"n":"2"}},{"ln":1,"note":{"kind":"cond","text":"2 < 4","res":true},"vars":{"n":"2"}},{"ln":2,"vars":{"n":"3"}},{"ln":1,"note":{"kind":"cond","text":"3 < 4","res":true},"vars":{"n":"3"}},{"ln":2,"vars":{"n":"4"}},{"ln":1,"note":{"kind":"cond","text":"4 < 4","res":false},"vars":{"n":"4"}},{"ln":3,"vars":{"n":"4"},"out":["4"]}]},{"code":"n = 1\nwhile n > 0:\n    n = n + 1","say":"Careful. n only grows, so the question is always True. This loop never stops. It is called an infinite loop.","steps":[{"ln":0,"vars":{"n":"1"}},{"ln":1,"note":{"kind":"cond","text":"1 > 0","res":true},"vars":{"n":"1"}},{"ln":2,"vars":{"n":"2"}},{"ln":1,"note":{"kind":"cond","text":"2 > 0","res":true},"vars":{"n":"2"}},{"ln":2,"vars":{"n":"3"}},{"ln":1,"note":{"kind":"cond","text":"3 > 0","res":true},"vars":{"n":"3"}},{"ln":2,"vars":{"n":"4"}}],"inf":true},{"code":"while True:\n    print(\"go\")\n    break","say":"`while True` would run forever, so `break` is the exit door. It ends the loop right away.","steps":[{"ln":0,"note":{"kind":"cond","text":"True","res":true},"vars":{}},{"ln":1,"vars":{},"out":["go"]},{"ln":2,"note":{"kind":"break","text":"break: jump out of the loop"},"vars":{}}]},{"code":"lives = 3\nwhile lives > 0:\n    print(\"Lives:\", lives)\n    lives = lives - 1\nprint(\"Game over\")","say":"Games keep going while the player has lives. At zero lives the question is False and the game ends.","steps":[{"ln":0,"vars":{"lives":"3"}},{"ln":1,"note":{"kind":"cond","text":"3 > 0","res":true},"vars":{"lives":"3"}},{"ln":2,"vars":{"lives":"3"},"out":["Lives: 3"]},{"ln":3,"vars":{"lives":"2"}},{"ln":1,"note":{"kind":"cond","text":"2 > 0","res":true},"vars":{"lives":"2"}},{"ln":2,"vars":{"lives":"2"},"out":["Lives: 2"]},{"ln":3,"vars":{"lives":"1"}},{"ln":1,"note":{"kind":"cond","text":"1 > 0","res":true},"vars":{"lives":"1"}},{"ln":2,"vars":{"lives":"1"},"out":["Lives: 1"]},{"ln":3,"vars":{"lives":"0"}},{"ln":1,"note":{"kind":"cond","text":"0 > 0","res":false},"vars":{"lives":"0"}},{"ln":4,"vars":{"lives":"0"},"out":["Game over"]}]}],"tries":[{"label":"n > 2","scene":{"code":"n = 5\nwhile n > 2:\n    print(n)\n    n = n - 1","say":"The loop stops as soon as n is 2, because 2 is not greater than 2.","steps":[{"ln":0,"vars":{"n":"5"}},{"ln":1,"note":{"kind":"cond","text":"5 > 2","res":true},"vars":{"n":"5"}},{"ln":2,"vars":{"n":"5"},"out":["5"]},{"ln":3,"vars":{"n":"4"}},{"ln":1,"note":{"kind":"cond","text":"4 > 2","res":true},"vars":{"n":"4"}},{"ln":2,"vars":{"n":"4"},"out":["4"]},{"ln":3,"vars":{"n":"3"}},{"ln":1,"note":{"kind":"cond","text":"3 > 2","res":true},"vars":{"n":"3"}},{"ln":2,"vars":{"n":"3"},"out":["3"]},{"ln":3,"vars":{"n":"2"}},{"ln":1,"note":{"kind":"cond","text":"2 > 2","res":false},"vars":{"n":"2"}}]}},{"label":"count up","scene":{"code":"n = 0\nwhile n < 3:\n    print(n)\n    n = n + 1","say":"Counting up works too. Just make sure n moves toward the end.","steps":[{"ln":0,"vars":{"n":"0"}},{"ln":1,"note":{"kind":"cond","text":"0 < 3","res":true},"vars":{"n":"0"}},{"ln":2,"vars":{"n":"0"},"out":["0"]},{"ln":3,"vars":{"n":"1"}},{"ln":1,"note":{"kind":"cond","text":"1 < 3","res":true},"vars":{"n":"1"}},{"ln":2,"vars":{"n":"1"},"out":["1"]},{"ln":3,"vars":{"n":"2"}},{"ln":1,"note":{"kind":"cond","text":"2 < 3","res":true},"vars":{"n":"2"}},{"ln":2,"vars":{"n":"2"},"out":["2"]},{"ln":3,"vars":{"n":"3"}},{"ln":1,"note":{"kind":"cond","text":"3 < 3","res":false},"vars":{"n":"3"}}]}},{"label":"after loop","scene":{"code":"n = 3\nwhile n > 0:\n    n = n - 1\nprint(\"Liftoff\")","say":"Anything after the loop runs once, when the loop is finished.","steps":[{"ln":0,"vars":{"n":"3"}},{"ln":1,"note":{"kind":"cond","text":"3 > 0","res":true},"vars":{"n":"3"}},{"ln":2,"vars":{"n":"2"}},{"ln":1,"note":{"kind":"cond","text":"2 > 0","res":true},"vars":{"n":"2"}},{"ln":2,"vars":{"n":"1"}},{"ln":1,"note":{"kind":"cond","text":"1 > 0","res":true},"vars":{"n":"1"}},{"ln":2,"vars":{"n":"0"}},{"ln":1,"note":{"kind":"cond","text":"0 > 0","res":false},"vars":{"n":"0"}},{"ln":3,"vars":{"n":"0"},"out":["Liftoff"]}]}}]}]},{"name":"Listopia","hello":"Welcome to Listopia. Here Python learns to handle text and lists of things.","bye":"You can now work with text and lists. Time to play!","chapters":[{"name":"Strings","cluster":0,"wrap":"Text has tools: len counts, star repeats, dot tools change it, and brackets pick a letter.","scenes":[{"code":"print(len(\"candy\"))","say":"`len` counts the characters in text. c, a, n, d, y is five.","steps":[{"ln":0,"vars":{},"out":["5"]}]},{"code":"print(\"ha\" * 3)","say":"Star repeats text. Three times ha, with no spaces.","steps":[{"ln":0,"vars":{},"out":["hahaha"]}]},{"code":"print(\"sweet\".upper())","say":"A dot after text calls a built-in tool. `upper` turns every letter into a capital.","steps":[{"ln":0,"vars":{},"out":["SWEET"]}]},{"code":"s = \"sugar\"\nprint(s[0])","say":"Every letter has a position, and counting starts at 0. So `s[0]` is the first letter.","steps":[{"ln":0,"vars":{"s":"\"sugar\""}},{"ln":1,"vars":{"s":"\"sugar\""},"out":["s"]}]},{"code":"s = \"sugar\"\nprint(s[-1])","say":"A negative position counts from the end. Minus 1 is the last letter.","steps":[{"ln":0,"vars":{"s":"\"sugar\""}},{"ln":1,"vars":{"s":"\"sugar\""},"out":["r"]}]},{"code":"print(\"a,b,c\".split(\",\"))","say":"`split` cuts text at every comma and gives back a list of the pieces.","steps":[{"ln":0,"vars":{},"out":["['a', 'b', 'c']"]}]},{"code":"name = \"mia\"\nprint(\"Hi \" + name.upper())","say":"Apps tidy up names with these tools before showing them.","steps":[{"ln":0,"vars":{"name":"\"mia\""}},{"ln":1,"vars":{"name":"\"mia\""},"out":["Hi MIA"]}]}],"tries":[{"label":"len(\"python\")","scene":{"code":"print(len(\"python\"))","say":"Count the letters: p, y, t, h, o, n.","steps":[{"ln":0,"vars":{},"out":["6"]}]}},{"label":"\"yo\" * 4","scene":{"code":"print(\"yo\" * 4)","say":"Repeat the text four times.","steps":[{"ln":0,"vars":{},"out":["yoyoyoyo"]}]}},{"label":".lower()","scene":{"code":"print(\"Hello\".lower())","say":"`lower` is the opposite of `upper`. Every letter becomes small.","steps":[{"ln":0,"vars":{},"out":["hello"]}]}}]},{"name":"Lists","cluster":1,"wrap":"A list holds many values. Use brackets to pick one, append to add, and a loop to visit all.","scenes":[{"code":"nums = [4, 8, 2]\nprint(nums)","say":"A list keeps many values in one box. Square brackets hold the items, separated by commas.","steps":[{"ln":0,"vars":{"nums":"[4, 8, 2]"}},{"ln":1,"vars":{"nums":"[4, 8, 2]"},"out":["[4, 8, 2]"]}]},{"code":"nums = [4, 8, 2]\nprint(nums[1])","say":"Positions start at 0, so `nums[1]` is the second item, 8.","steps":[{"ln":0,"vars":{"nums":"[4, 8, 2]"}},{"ln":1,"vars":{"nums":"[4, 8, 2]"},"out":["8"]}]},{"code":"nums = [4, 8, 2]\nprint(len(nums))","say":"`len` counts the items in a list too.","steps":[{"ln":0,"vars":{"nums":"[4, 8, 2]"}},{"ln":1,"vars":{"nums":"[4, 8, 2]"},"out":["3"]}]},{"code":"a = [1]\na.append(2)\nprint(a)","say":"`append` adds an item to the end of the list.","steps":[{"ln":0,"vars":{"a":"[1]"}},{"ln":1,"vars":{"a":"[1, 2]"}},{"ln":2,"vars":{"a":"[1, 2]"},"out":["[1, 2]"]}]},{"code":"nums = [4, 8, 2]\nprint(sum(nums))","say":"`sum` adds up every number in the list: 4 plus 8 plus 2.","steps":[{"ln":0,"vars":{"nums":"[4, 8, 2]"}},{"ln":1,"vars":{"nums":"[4, 8, 2]"},"out":["14"]}]},{"code":"nums = [4, 8, 2]\nprint(max(nums))","say":"`max` finds the biggest item.","steps":[{"ln":0,"vars":{"nums":"[4, 8, 2]"}},{"ln":1,"vars":{"nums":"[4, 8, 2]"},"out":["8"]}]},{"code":"tasks = [\"Study\", \"Code\"]\ntasks.append(\"Test\")\nfor t in tasks:\n    print(t)","say":"Lists and loops work as a team. Add a task, and the same loop shows every task.","steps":[{"ln":0,"vars":{"tasks":"['Study', 'Code']"}},{"ln":1,"vars":{"tasks":"['Study', 'Code', 'Test']"}},{"ln":2,"vars":{"tasks":"['Study', 'Code', 'Test']","t":"\"Study\""},"note":{"kind":"next","text":"t = \"Study\""}},{"ln":3,"vars":{"tasks":"['Study', 'Code', 'Test']","t":"\"Study\""},"out":["Study"]},{"ln":2,"vars":{"tasks":"['Study', 'Code', 'Test']","t":"\"Code\""},"note":{"kind":"next","text":"t = \"Code\""}},{"ln":3,"vars":{"tasks":"['Study', 'Code', 'Test']","t":"\"Code\""},"out":["Code"]},{"ln":2,"vars":{"tasks":"['Study', 'Code', 'Test']","t":"\"Test\""},"note":{"kind":"next","text":"t = \"Test\""}},{"ln":3,"vars":{"tasks":"['Study', 'Code', 'Test']","t":"\"Test\""},"out":["Test"]},{"ln":2,"vars":{"tasks":"['Study', 'Code', 'Test']","t":"\"Test\""},"note":{"kind":"done","text":"no more values, the loop ends"}}]}],"tries":[{"label":"nums[0]","scene":{"code":"nums = [4, 8, 2]\nprint(nums[0])","say":"Position 0 is the first item.","steps":[{"ln":0,"vars":{"nums":"[4, 8, 2]"}},{"ln":1,"vars":{"nums":"[4, 8, 2]"},"out":["4"]}]}},{"label":"nums[-1]","scene":{"code":"nums = [4, 8, 2]\nprint(nums[-1])","say":"Minus 1 picks the last item.","steps":[{"ln":0,"vars":{"nums":"[4, 8, 2]"}},{"ln":1,"vars":{"nums":"[4, 8, 2]"},"out":["2"]}]}},{"label":"append","scene":{"code":"fruit = [\"fig\"]\nfruit.append(\"kiwi\")\nprint(fruit)","say":"The new item goes to the end.","steps":[{"ln":0,"vars":{"fruit":"['fig']"}},{"ln":1,"vars":{"fruit":"['fig', 'kiwi']"}},{"ln":2,"vars":{"fruit":"['fig', 'kiwi']"},"out":["['fig', 'kiwi']"]}]}}]}]}];
const REDUCED=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches);
const hasSpeech=('speechSynthesis' in window)&&('SpeechSynthesisUtterance' in window);
const SPEEDS=[1,1.5,2,0.75];
const I_PLAY='<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
const I_PAUSE='<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor"/></svg>';
const I_PREV='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M6 5h2.5v14H6zM20 5v14L9.5 12z" fill="currentColor"/></svg>';
const I_NEXT='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M15.5 5H18v14h-2.5zM4 5v14l10.5-7z" fill="currentColor"/></svg>';
const I_REPLAY='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 5a7 7 0 1 1-6.6 4.7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M12 1.5L7.5 5 12 8.5z" fill="currentColor"/></svg>';
const I_X='<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="#f7f1f9" stroke-width="3" stroke-linecap="round"/></svg>';
const PEN='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 20l1-5L16.5 3.5a2.1 2.1 0 0 1 3 3L8 18z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></svg>';
const PLAYSM='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#ffc21a"/><path d="M9.5 7.5v9l7-4.5z" fill="#2a1b00"/></svg>';

function lockScroll(){
  const any=!playEl.hidden||!notebookEl.hidden||!lessonEl.hidden;
  document.body.style.overflow=any?'hidden':'';
}

/* Stick figure: joints are tweened between poses, laptop moves with the hand */
const FIG_SVG='<svg class="ls-fig" id="lsfig" viewBox="0 0 170 200" aria-hidden="true">'+
  '<ellipse cx="108" cy="193" rx="48" ry="5" fill="rgba(0,0,0,.5)"/>'+
  '<rect x="6" y="152" width="74" height="41" rx="8" fill="#241b2c"/>'+
  '<polyline id="fRA" class="limb far" points="0,0 0,0 0,0"/>'+
  '<polyline id="fRL" class="limb far" points="0,0 0,0 0,0"/>'+
  '<line id="fTo" class="limb" x1="0" y1="0" x2="0" y2="0"/>'+
  '<polyline id="fLL" class="limb" points="0,0 0,0 0,0"/>'+
  '<circle id="fHd" r="12.5" fill="#ffc21a"/>'+
  '<g id="fLap">'+
    '<path d="M-30 0 L30 0 L26 -6 L-26 -6 Z" fill="#d9d2e0"/>'+
    '<path d="M-27 -6 L-36 -44 L-28 -45 L-19 -6 Z" fill="#efeaf4"/>'+
    '<path d="M-26 -9 L-33 -40 L-29.5 -40.5 L-22.5 -9 Z" class="lapglow" fill="#8fb4ff"/>'+
  '</g>'+
  '<polyline id="fLA" class="limb" points="0,0 0,0 0,0"/>'+
'</svg>';
const POSES={
  type:{h:[84,85],n:[92,102],p:[113,138],le:[80,124],lh:[60,146],re:[90,127],rh:[72,149],lk:[104,166],lf:[100,190],rk:[121,166],rf:[126,190],L:[40,152,0]},
  stand:{h:[112,66],n:[112,84],p:[112,132],le:[96,108],lh:[82,112],re:[127,108],rh:[129,130],lk:[106,162],lf:[100,190],rk:[120,162],rf:[124,190],L:[62,116,-12]},
  think:{h:[112,66],n:[112,84],p:[112,132],le:[96,108],lh:[82,112],re:[130,104],rh:[119,83],lk:[106,162],lf:[100,190],rk:[120,162],rf:[124,190],L:[62,116,-12]},
  cheer:{h:[110,64],n:[110,84],p:[110,132],le:[92,72],lh:[86,46],re:[128,72],rh:[136,46],lk:[102,162],lf:[94,190],rk:[120,162],rf:[128,190],L:[40,152,0]},
  wave:{h:[110,66],n:[110,84],p:[110,132],le:[94,108],lh:[92,130],re:[128,86],rh:[136,62],lk:[104,162],lf:[98,190],rk:[118,162],rf:[122,190],L:[40,152,0]}
};
function figFlat(z){return [].concat(z.h,z.n,z.p,z.le,z.lh,z.re,z.rh,z.lk,z.lf,z.rk,z.rf,z.L);}
const FIG={cur:figFlat(POSES.type),from:null,to:null,t0:0,dur:0,pose:'type',raf:0,els:null};
function figTo(name,ms){
  FIG.pose=name;FIG.from=FIG.cur.slice();FIG.to=figFlat(POSES[name]);FIG.t0=performance.now();
  FIG.dur=REDUCED?0:(ms==null?450:ms);
}
function figPaint(a){
  const E=FIG.els;
  E.hd.setAttribute('cx',a[0]);E.hd.setAttribute('cy',a[1]);
  E.to.setAttribute('x1',a[2]);E.to.setAttribute('y1',a[3]);E.to.setAttribute('x2',a[4]);E.to.setAttribute('y2',a[5]);
  E.la.setAttribute('points',a[2]+','+a[3]+' '+a[6]+','+a[7]+' '+a[8]+','+a[9]);
  E.ra.setAttribute('points',a[2]+','+a[3]+' '+a[10]+','+a[11]+' '+a[12]+','+a[13]);
  E.ll.setAttribute('points',a[4]+','+a[5]+' '+a[14]+','+a[15]+' '+a[16]+','+a[17]);
  E.rl.setAttribute('points',a[4]+','+a[5]+' '+a[18]+','+a[19]+' '+a[20]+','+a[21]);
  E.lap.setAttribute('transform','translate('+a[22]+' '+a[23]+') rotate('+a[24]+')');
}
function figFrame(now){
  FIG.raf=requestAnimationFrame(figFrame);
  if(!FIG.els)return;
  if(FIG.to){
    const k=FIG.dur>0?Math.min(1,(now-FIG.t0)/FIG.dur):1;
    const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
    FIG.cur=FIG.from.map((v,i)=>v+(FIG.to[i]-v)*e);
    if(k>=1)FIG.to=null;
  }
  const a=FIG.cur.slice();
  if(!REDUCED){
    const br=Math.sin(now/520)*1.2;a[1]+=br;a[3]+=br*.5;
    if(LS.typing&&FIG.pose==='type'){a[9]+=Math.sin(now/55)*3.5;a[13]+=Math.cos(now/55)*3.5;a[8]+=Math.sin(now/110)*1.5;}
    if(FIG.pose==='wave'){a[12]+=Math.sin(now/110)*7;a[13]+=Math.cos(now/110)*4;}
    if(FIG.pose==='cheer'){const b=Math.abs(Math.sin(now/230))*5;a[1]-=b;a[3]-=b;a[7]-=b;a[9]-=b;a[11]-=b;a[13]-=b;}
  }
  figPaint(a);
}
function figStart(){
  const svg=$('lsfig');if(!svg)return;
  FIG.els={hd:$('fHd'),to:$('fTo'),la:$('fLA'),ra:$('fRA'),ll:$('fLL'),rl:$('fRL'),lap:$('fLap'),svg:svg};
  cancelAnimationFrame(FIG.raf);FIG.cur=figFlat(POSES.type);FIG.to=null;FIG.pose='type';
  FIG.raf=requestAnimationFrame(figFrame);
}
function figStop(){cancelAnimationFrame(FIG.raf);FIG.raf=0;FIG.els=null;}

/* Lesson state */
const LS={w:0,flat:[],i:0,curC:-1,tok:0,paused:false,speed:1,idle:true,ended:false,level:null,back:'map',done:{},typing:false,code:'',vars:{},out:[],introDone:false,mode:'lesson',tryOn:-1};
let elCode,elVars,elThink,elOut,elSay,elDots,elChaps,elTry,elFoot,elStage,elCtl;

/* Syntax colours, character by character so a selection or the caret can sit anywhere */
function lsClassify(line){
  const cls=new Array(line.length).fill('');
  const re=/("[^"]*"?|'[^']*'?)|(#.*)|\b(if|elif|else|for|while|in|break|True|False|and|or|not)\b|\b(print|len|sum|max|min|range|append|upper|lower|split)\b|\b(\d+(?:\.\d+)?)\b/g;
  let m;
  while((m=re.exec(line))){
    const c=m[1]?'s':m[2]?'c':m[3]?'k':m[4]?'f':'n';
    for(let k=m.index;k<m.index+m[0].length;k++)cls[k]=c;
  }
  return cls;
}
function lsRenderCode(text,o){
  o=o||{};
  let base=0,html='';
  text.split('\n').forEach((ln,li)=>{
    const cls=lsClassify(ln);let h='';
    for(let k=0;k<=ln.length;k++){
      const g=base+k;
      if(o.caret===g)h+='<span class="caret"></span>';
      if(k===ln.length)break;
      const c=(cls[k]||'')+((o.sel&&g>=o.sel[0]&&g<o.sel[1])?' sel':'');
      h+='<span'+(c?' class="'+c.trim()+'"':'')+'>'+esc(ln[k])+'</span>';
    }
    base+=ln.length+1;
    html+='<div class="ln'+(o.hl===li?' on':'')+'">'+(h||'&nbsp;')+'</div>';
  });
  return html;
}
function lsSetCode(text,o){LS.code=text;elCode.innerHTML=lsRenderCode(text,o);}
function lsDiff(a,b){
  const m=Math.min(a.length,b.length);let p=0;
  while(p<m&&a[p]===b[p])p++;
  let s=0;
  while(s<a.length-p&&s<b.length-p&&a[a.length-1-s]===b[b.length-1-s])s++;
  return {p:p,s:s,del:a.slice(p,a.length-s),ins:b.slice(p,b.length-s)};
}
function lsVarsSet(v){
  const keys=Object.keys(v||{});
  elVars.innerHTML=keys.map(k=>'<span class="vc'+(LS.vars[k]!==v[k]?' pop':'')+'"><b>'+esc(k)+'</b><span>=</span><em>'+esc(v[k])+'</em></span>').join('');
  LS.vars=Object.assign({},v||{});
}
function lsThink(n){
  if(!n){elThink.innerHTML='';return;}
  let h='';
  if(n.kind==='cond')h='<span class="q">Python checks</span><code>'+esc(n.text)+'</code> <span>&rarr;</span> <span class="'+(n.res?'t':'x')+'">'+(n.res?'True':'False')+'</span>';
  else if(n.kind==='next')h='<span class="q">Next value</span><code>'+esc(n.text)+'</code>';
  else if(n.kind==='done')h='<span class="q">Loop</span>'+esc(n.text);
  else if(n.kind==='break')h='<span class="q">break</span>jump out of the loop';
  else if(n.kind==='inf')h='<span class="warn">'+esc(n.text)+'</span>';
  elThink.innerHTML=h;
}
function lsOutRender(fresh,none){
  let h='<small>Output</small>';
  if(LS.out.length)h+=LS.out.map((l,k)=>'<div class="ol'+(fresh&&k===LS.out.length-1?' new':'')+'">'+esc(l)+'</div>').join('');
  else if(none)h+='<div class="none">nothing printed</div>';
  elOut.innerHTML=h;
}
function lsOutClear(){LS.out=[];lsOutRender(false,false);}
function lsSay(t){elSay.innerHTML='<span>'+esc(t).replace(/`([^`]+)`/g,'<code>$1</code>')+'</span>';}

/* Voice: prefer an English male-sounding voice when the device provides one. */
let ttsVoice=null;
function pickVoice(){
  if(!hasSpeech)return;
  try{
    const vs=speechSynthesis.getVoices().filter(v=>/^en([_-]|$)/i.test(v.lang));
    if(!vs.length)return;
    const maleHints=/(david|guy|mark|james|daniel|alex|thomas|matthew|ryan|aaron|christopher|george|lee|ravi|prabhat|male)/i;
    const femaleHints=/(zira|samantha|victoria|karen|susan|hazel|aria|jenny|female|heera|priya)/i;
    const score=v=>{
      const name=v.name||'';let n=0;
      if(maleHints.test(name))n+=10;
      if(femaleHints.test(name))n-=12;
      if(/^en[-_]IN/i.test(v.lang))n+=3;
      if(/^en[-_]GB/i.test(v.lang))n+=2;
      if(/^en[-_]US/i.test(v.lang))n+=1;
      if(v.default)n+=0.5;
      return n;
    };
    vs.sort((a,b)=>score(b)-score(a));
    ttsVoice=vs[0]||null;
  }catch(e){}
}
if(hasSpeech){pickVoice();try{speechSynthesis.onvoiceschanged=pickVoice;}catch(e){}}
function speakify(t){
  return t.replace(/`([^`]+)`/g,function(m,c){
    return ' '+c.replace(/==/g,' equals equals ').replace(/>=/g,' greater than or equal to ').replace(/<=/g,' less than or equal to ')
      .replace(/\/\//g,' double slash ').replace(/\*\*/g,' double star ')
      .replace(/[=+\-*\/%<>]/g,function(x){return {'=':' equals ','+':' plus ','-':' minus ','*':' star ','/':' slash ','%':' percent ','<':' less than ','>':' greater than '}[x];})
      .replace(/[()\[\]{}"':,.]/g,' ').replace(/_/g,' ')+' ';
  }).replace(/\s+/g,' ').trim();
}
function lsSilence(){try{if(hasSpeech)speechSynthesis.cancel();}catch(e){}lsTalk(false);}
function lsTalk(on){try{const f=document.getElementById('lssay');if(f)f.classList.toggle('talk',!!on);const b=document.getElementById('lsvoice');if(b)b.classList.toggle('talk',!!on);}catch(e){}}
function lsPrime(){
  /* called from a tap: unlocks speech on phones that block it until the user touches the page */
  if(!hasSpeech)return;
  try{pickVoice();speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(' ');u.volume=0;speechSynthesis.speak(u);}catch(e){}
}
function lsChunks(t){
  const parts=t.match(/[^.!?;]+[.!?;]*/g)||[t];const out=[];let cur='';
  parts.forEach(function(p){p=p.trim();if(!p)return;if((cur+' '+p).length>110&&cur){out.push(cur);cur=p;}else cur=cur?cur+' '+p:p;});
  if(cur)out.push(cur);return out;
}
function lsSpeak(text){
  return new Promise(function(res){
    if(!S.voice||!hasSpeech)return res();
    try{
      const chunks=lsChunks(speakify(text));let k=0,fin=false;
      const total=setTimeout(function(){if(!fin){fin=true;lsTalk(false);res();}},Math.max(5000,text.length*150/LS.speed)+2500);
      const finish=function(){if(fin)return;fin=true;clearTimeout(total);lsTalk(false);res();};
      const next=function(){
        if(fin)return;
        if(k>=chunks.length)return finish();
        const u=new SpeechSynthesisUtterance(chunks[k++]);
        if(ttsVoice){u.voice=ttsVoice;u.lang=ttsVoice.lang;}else u.lang='en-IN';
        /* Aim for an upbeat, friendly male-teacher delivery. The actual voice depends on the device's installed voices. */
        u.rate=Math.min(1.35,1.04*LS.speed);u.pitch=0.94;u.volume=1;
        let moved=false;const adv=function(){if(moved)return;moved=true;clearTimeout(guard);next();};
        const guard=setTimeout(adv,Math.max(2500,u.text.length*170/LS.speed));
        u.onstart=function(){lsTalk(true);};
        u.onend=adv;u.onerror=adv;
        speechSynthesis.speak(u);
      };
      try{speechSynthesis.resume();}catch(e){}
      next();
    }catch(e){res();}
  });
}

function lsSleep(ms,tok){
  return new Promise(function(res){
    let left=ms/(LS.speed*(window.__TS||1));
    const step=function(){
      if(tok!==LS.tok)return res(false);
      if(LS.paused){setTimeout(step,90);return;}
      if(left<=0)return res(true);
      const d=Math.min(50,left);left-=d;setTimeout(step,d);
    };
    step();
  });
}

/* One scene: edit the code like a person would, run it, explain it */
async function lsScene(tok,sc,prev,quiet){
  lsSetCode(prev,{});lsOutClear();lsVarsSet({});lsThink(null);
  elStage.classList.remove('run');
  lsSay(sc.say);
  const speech=lsSleep(120,tok).then(function(ok){return ok?lsSpeak(sc.say):null;});
  figTo(prev?'think':'type',350);
  let ok=await lsSleep(250,tok);if(!ok)return false;
  const d=lsDiff(prev,sc.code);
  let head=prev.slice(0,d.p),tail=prev.slice(prev.length-d.s);
  if(d.del.length){
    lsSetCode(prev,{sel:[d.p,d.p+d.del.length]});
    ok=await lsSleep(d.del.length>5?1000:750,tok);if(!ok)return false;
    lsSetCode(head+tail,{caret:d.p});
    ok=await lsSleep(260,tok);if(!ok)return false;
  }
  if(d.ins.length){
    figTo('type',350);LS.typing=true;
    const per=Math.max(22,Math.min(62,1900/d.ins.length));
    for(let k=1;k<=d.ins.length;k++){
      lsSetCode(head+d.ins.slice(0,k)+tail,{caret:d.p+k});
      ok=await lsSleep(d.ins[k-1]==='\n'?per+140:per,tok);if(!ok){LS.typing=false;return false;}
    }
    LS.typing=false;
  }
  lsSetCode(sc.code,{caret:sc.code.length});
  ok=await lsSleep(420,tok);if(!ok)return false;
  // run it
  figTo('type',250);LS.typing=true;
  ok=await lsSleep(380,tok);LS.typing=false;if(!ok)return false;
  elStage.classList.add('run');
  figTo('stand',500);
  const fast=sc.steps.length>8;
  for(let k=0;k<sc.steps.length;k++){
    const st=sc.steps[k];
    lsSetCode(sc.code,{hl:st.ln});
    lsThink(st.note||null);
    ok=await lsSleep(fast?280:420,tok);if(!ok)return false;
    lsVarsSet(st.vars);
    if(st.out){st.out.forEach(function(l){LS.out.push(l);});lsOutRender(true,false);}
    ok=await lsSleep(fast?400:640,tok);if(!ok)return false;
  }
  lsSetCode(sc.code,{});
  lsThink(sc.inf?{kind:'inf',text:'...and it keeps going forever'}:null);
  if(sc.empty||sc.inf)lsOutRender(false,sc.empty);
  if(sc.inf)figTo('think',400);
  await speech;if(tok!==LS.tok)return false;
  ok=await lsSleep((S.voice&&hasSpeech)?600:Math.max(800,sc.say.length*22),tok);
  return ok;
}

function lsIdxOfChapter(c){return LS.flat.findIndex(function(f){return f.c===c&&f.s===0;});}
function lsChapterUi(c,s){
  const W=LESSONS[LS.w],ch=W.chapters[c];
  if(LS.curC!==c){
    LS.curC=c;
    // fit the code to the stage: longest line decides the width, most lines decide the height
    const wd=elStage.clientWidth||340,ht=elStage.clientHeight||420;
    let m=10,nl=1;
    ch.scenes.concat(ch.tries.map(function(t){return t.scene;})).forEach(function(sc){const ls=sc.code.split('\n');nl=Math.max(nl,ls.length);ls.forEach(function(l){m=Math.max(m,l.length);});});
    let fs=Math.min(30,(wd-52)/(m*0.61));
    const avail=ht-24-40-26-96-36;
    fs=Math.max(13,Math.min(fs,avail/(1.7*nl)));
    elStage.style.setProperty('--cfs',fs.toFixed(1)+'px');
    elStage.style.setProperty('--cl',String(nl));
    elStage.style.setProperty('--ofs',Math.max(14,Math.min(19,fs*0.8)).toFixed(1)+'px');
    elTry.innerHTML='<small>Try it</small>'+ch.tries.map(function(t,k){return '<button data-act="ltry" data-k="'+k+'">'+esc(t.label)+'</button>';}).join('');
    LS.tryOn=-1;
  }
  Array.prototype.forEach.call(elChaps.children,function(b,i){b.classList.toggle('on',i===c);b.classList.toggle('done',!!LS.done[i]&&i!==c);});
  const on=elChaps.children[c];if(on&&on.scrollIntoView){try{elChaps.scrollTo({left:on.offsetLeft-20,behavior:'smooth'});}catch(e){}}
  elDots.innerHTML=ch.scenes.map(function(_,k){return '<i class="'+(k<s?'done':k===s?'on':'')+'"></i>';}).join('');
  Array.prototype.forEach.call(elTry.querySelectorAll('button'),function(b){b.classList.remove('on');});
}
function lsCtl(){
  const playing=!LS.paused&&!LS.idle;
  elCtl.innerHTML=
    '<button class="cb" data-act="lprev" aria-label="Previous step">'+I_PREV+'</button>'+
    '<button class="cb main" data-act="lplay" aria-label="'+(LS.idle?(LS.ended?'Watch again':'Continue'):(LS.paused?'Play':'Pause'))+'">'+(LS.idle&&LS.ended?I_REPLAY:playing?I_PAUSE:I_PLAY)+'</button>'+
    '<button class="cb" data-act="lnext" aria-label="Next step">'+I_NEXT+'</button>'+
    '<button class="cb" data-act="lreplay" aria-label="Replay this lesson part">'+I_REPLAY+'</button>'+
    '<button class="cb spd" data-act="lspeed" aria-label="Speed">'+LS.speed+'x</button>';
}
function lsFoot(){
  if(LS.level!=null){
    elFoot.innerHTML=LS.ended
      ?'<button class="btn gold" data-act="lstart">Start level '+(LS.level+1)+'</button>'
      :'<button class="btn skip" data-act="lstart">Skip lesson and play level '+(LS.level+1)+'</button>';
  }else if(LS.ended){
    elFoot.innerHTML='<button class="btn gold" data-act="lclose">'+(LS.back==='level'?'Back to level':'Back to map')+'</button>';
  }else elFoot.innerHTML='';
}

async function lsIntro(tok){
  const W=LESSONS[LS.w];
  lsSetCode('',{caret:0});lsOutClear();lsVarsSet({});lsThink(null);
  lsSay(W.hello);figTo('wave',500);
  const sp=lsSleep(150,tok).then(function(ok){return ok?lsSpeak(W.hello):null;});
  let ok=await lsSleep(1500,tok);if(!ok)return false;
  await sp;if(tok!==LS.tok)return false;
  return lsSleep((S.voice&&hasSpeech)?300:600,tok);
}
async function lsChapterEnd(tok,c){
  const ch=LESSONS[LS.w].chapters[c];
  lsThink(null);lsSay(ch.wrap);figTo('cheer',450);beep('ok');
  const sp=lsSleep(150,tok).then(function(ok){return ok?lsSpeak(ch.wrap):null;});
  let ok=await lsSleep(1400,tok);if(!ok)return false;
  await sp;if(tok!==LS.tok)return false;
  ok=await lsSleep((S.voice&&hasSpeech)?500:Math.max(600,ch.wrap.length*18),tok);if(!ok)return false;
  if(c<LESSONS[LS.w].chapters.length-1){
    elCode.classList.add('wipe');
    ok=await lsSleep(350,tok);
    elCode.classList.remove('wipe');
    if(!ok)return false;
  }
  return true;
}
async function lsLessonEnd(tok){
  const W=LESSONS[LS.w];
  lsSetCode('',{});lsVarsSet({});lsThink(null);lsOutClear();elOut.innerHTML='';
  lsSay(W.bye);figTo('cheer',450);
  LS.ended=true;LS.idle=true;LS.paused=false;
  Array.prototype.forEach.call(elChaps.children,function(b){b.classList.remove('on');b.classList.add('done');});
  confetti();beep('win');
  lsCtl();lsFoot();
  lsSleep(150,tok).then(function(ok){if(ok)lsSpeak(W.bye);});
}
async function lsPlayFrom(i){
  const tok=++LS.tok;lsSilence();
  LS.idle=false;LS.ended=false;LS.paused=false;LS.mode='lesson';LS.typing=false;
  lsCtl();lsFoot();
  if(i===0&&!LS.introDone){
    LS.introDone=true;
    if(!(await lsIntro(tok)))return;
  }
  for(;i<LS.flat.length;i++){
    const f=LS.flat[i],ch=LESSONS[LS.w].chapters[f.c];
    LS.i=i;
    lsChapterUi(f.c,f.s);
    const prev=f.s>0?ch.scenes[f.s-1].code:'';
    if(!(await lsScene(tok,ch.scenes[f.s],prev)))return;
    if(f.s===ch.scenes.length-1){
      LS.done[f.c]=1;
      if(!(await lsChapterEnd(tok,f.c)))return;
    }
  }
  await lsLessonEnd(tok);
}
async function lsTry(k){
  const ch=LESSONS[LS.w].chapters[Math.max(0,LS.curC)],t=ch.tries[k];
  if(!t)return;
  const tok=++LS.tok;lsSilence();
  LS.paused=false;LS.idle=false;LS.ended=false;LS.mode='try';LS.typing=false;
  Array.prototype.forEach.call(elTry.querySelectorAll('button'),function(b,n){b.classList.toggle('on',n===k);});
  lsCtl();lsFoot();
  const ok=await lsScene(tok,t.scene,LS.code);
  if(!ok)return;
  LS.idle=true;LS.paused=false;figTo('stand',400);lsCtl();
}
function lsStep(dir){
  LS.introDone=true;
  const n=LS.i+dir;
  if(n<0)lsPlayFrom(0);
  else lsPlayFrom(Math.min(n,LS.flat.length));
}
function lsTogglePlay(){
  if(LS.idle){
    LS.introDone=true;
    if(LS.ended){LS.done={};lsPlayFrom(0);}
    else lsPlayFrom(Math.max(0,Math.min(LS.i,LS.flat.length-1)));
    return;
  }
  LS.paused=!LS.paused;
  try{if(hasSpeech){if(LS.paused)speechSynthesis.pause();else speechSynthesis.resume();}}catch(e){}
  lsCtl();
}
function lsVoiceUi(){
  const b=$('lsvoice');if(!b)return;
  b.setAttribute('aria-pressed',S.voice?'true':'false');
  b.setAttribute('aria-label',S.voice?'Voice on':'Voice off');
  b.innerHTML=(S.voice?SPK:MUTE)+'<em>'+(S.voice?'Voice':'Muted')+'</em>';
}
function buildLessonDom(){
  const W=LESSONS[LS.w];
  lessonEl.innerHTML=
    '<div class="ls-top"><button class="lbtn" data-act="lclose" aria-label="Close lesson">'+I_X+'</button>'+
      '<div class="ls-title"><small>World '+(LS.w+1)+'</small><b>'+esc(W.name)+'</b></div>'+
      (hasSpeech?'<button class="lbtn vbtn" data-act="lvoice" id="lsvoice"></button>':'<span class="ls-spacer"></span>')+'</div>'+
    '<div class="ls-chaps" id="lschaps">'+W.chapters.map(function(c,i){return '<button class="ls-chap" data-act="lchap" data-c="'+i+'">'+esc(c.name)+'</button>';}).join('')+'</div>'+
    '<div class="ls-stage" id="lsstage"><div class="ls-board"><pre class="ls-code" id="lscode" aria-label="Code"></pre><div class="ls-vars" id="lsvars"></div><div class="ls-think" id="lsthink"></div><div class="ls-out" id="lsout"></div></div>'+FIG_SVG+'</div>'+
    '<div class="ls-say" id="lssay" aria-live="polite"></div>'+
    '<div class="ls-dots" id="lsdots"></div>'+
    '<div class="ls-ctl" id="lsctl"></div>'+
    '<div class="ls-try" id="lstry"></div>'+
    '<div class="ls-foot" id="lsfoot"></div>';
  elCode=$('lscode');elVars=$('lsvars');elThink=$('lsthink');elOut=$('lsout');elSay=$('lssay');elDots=$('lsdots');
  elChaps=$('lschaps');elTry=$('lstry');elFoot=$('lsfoot');elStage=$('lsstage');elCtl=$('lsctl');
  lsVoiceUi();lsCtl();lsFoot();
}
function openLesson(w,opts){
  opts=opts||{};
  if(!LESSONS[w])return;
  lsPrime();LS.tok++;lsSilence();
  LS.w=w;LS.level=(opts.level!=null)?opts.level:null;LS.back=opts.back||'map';
  LS.flat=[];LESSONS[w].chapters.forEach(function(c,ci){c.scenes.forEach(function(_,si){LS.flat.push({c:ci,s:si});});});
  LS.done={};LS.curC=-1;LS.i=0;LS.vars={};LS.code='';LS.out=[];LS.ended=false;LS.idle=false;LS.paused=false;LS.typing=false;
  S.seen[w]=1;save();
  buildLessonDom();
  lessonEl.hidden=false;lockScroll();figStart();
  let start=0;
  if(opts.chapter!=null){const j=lsIdxOfChapter(opts.chapter);if(j>0)start=j;}
  LS.introDone=start>0;
  lsPlayFrom(start);
}
function closeLesson(){
  LS.tok++;lsSilence();LS.typing=false;
  lessonEl.hidden=true;figStop();lockScroll();
}
window.addEventListener('resize',function(){
  if(lessonEl.hidden||LS.curC<0)return;
  const c=LS.curC;LS.curC=-1;
  const keepTry=elTry.querySelector('button.on');const k=keepTry?[].indexOf.call(elTry.querySelectorAll('button'),keepTry):-1;
  lsChapterUi(c,Math.max(0,LS.flat[LS.i]?LS.flat[LS.i].s:0));
  if(k>=0)elTry.querySelectorAll('button')[k].classList.add('on');
});

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function fmt(s){return esc(s).replace(/«(.+?)»/g,'<code>$1</code>');}
function hl(c){
  const e=c.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return e.replace(/("[^"\n]*"|'[^'\n]*')|\b(if|elif|else|for|while|in|break|True|False)\b|\b(print|len|sum|max|range|upper|split|append)\b|\b(\d+)\b/g,
    (m,s,k,f,n)=>s?'<span class="s">'+s+'</span>':k?'<span class="k">'+k+'</span>':f?'<span class="f">'+f+'</span>':'<span class="n">'+n+'</span>'
  ).replace('___','<span class="blank" id="blank">___</span>');
}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
let tt=0;
function toast(m){toastEl.textContent=m;toastEl.hidden=false;clearTimeout(tt);tt=setTimeout(()=>{toastEl.hidden=true;},1900);}
let AC=null;
function beep(k){
  if(!S.sound)return;
  try{
    AC=AC||new (window.AudioContext||window.webkitAudioContext)();
    const seq={ok:[[660,0],[880,.1]],bad:[[190,0],[140,.12]],win:[[523,0],[659,.1],[784,.2],[1047,.3]],pop:[[520,0]]}[k];
    seq.forEach(([f,t])=>{
      const o=AC.createOscillator(),g=AC.createGain(),n=AC.currentTime+t;
      o.type=k==='bad'?'sawtooth':'triangle';o.frequency.value=f;
      g.gain.setValueAtTime(.0001,n);g.gain.exponentialRampToValueAtTime(.1,n+.02);g.gain.exponentialRampToValueAtTime(.0001,n+.18);
      o.connect(g);g.connect(AC.destination);o.start(n);o.stop(n+.2);
    });
  }catch(e){}
}
function confetti(){
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const cols=['#ff4f9a','#ffd23f','#1fcf9c','#38b6ff','#7b4dff','#ff8a3d'];
  for(let i=0;i<30;i++){
    const d=document.createElement('div');d.className='cf';
    d.style.left=Math.random()*100+'%';d.style.background=cols[i%6];
    d.style.setProperty('--dx',(Math.random()*160-80)+'px');
    d.style.animationDelay=(Math.random()*.5)+'s';
    document.body.appendChild(d);setTimeout(()=>d.remove(),2800);
  }
}


/* ---------- HUD ---------- */
function hud(){
  tick();
  const rem=S.heartTs&&S.hearts<5?Math.max(0,S.heartTs+REGEN-Date.now()):0;
  const m=Math.floor(rem/60000),s=Math.floor(rem%60000/1000);
  const streak=(S.lastDay===today()||S.lastDay===yesterday())?S.streak:0;
  hudEl.innerHTML=
   '<div class="pill" aria-label="Hearts">'+HEART+'<span>'+S.hearts+'</span>'+(rem?'<small>'+m+':'+String(s).padStart(2,'0')+'</small>':'')+'</div>'+
   '<div class="pill" aria-label="Coins">'+COIN+'<span>'+S.coins+'</span></div>'+
   '<div class="pill" aria-label="Day streak">'+FLAME+'<span>'+streak+'</span></div>'+
   '<button class="btn grapeb small" style="padding:8px 11px;border-radius:13px" data-act="notebook" aria-label="Open rough work page" title="Rough work">'+PEN+'</button>'+
   '<button class="pill" data-act="account" aria-label="Account">'+USERI+'<small>'+esc(window.LevelleetSync?window.LevelleetSync.label():'Login')+'</small></button>'+
   '<button class="pill ic" data-act="sound" aria-label="Sound '+(S.sound?'on':'off')+'">'+(S.sound?SPK:MUTE)+'</button>'+
   '<div class="pill lvl"><span>Lv '+plvl()+'</span><div class="xp"><i style="width:'+(S.xp%100)+'%"></i></div><small>'+(S.xp%100)+'/100 XP</small></div>';
}

/* ---------- Map ---------- */
let scrollNext=true;
function renderMap(){
  const W=mapEl.clientWidth||340;
  const cur=curIdx();
  let html='';
  const totS=LV.reduce((a,l)=>a+(S.stars[l.i]||0),0),doneL=LV.filter(l=>S.stars[l.i]).length,curL=LV[cur]||LV[0];
  const LOGO='Levelleet'.split('').map((ch,k)=>'<span style="--k:'+k+';--c:'+['#ffe56a','#7ff0c8','#ffe56a','#7fd3ff','#ffb3d9','#ffe56a','#7ff0c8','#ffe56a','#7fd3ff'][k]+'">'+ch+'</span>').join('');
  html+='<div class="hero"><i class="candy" style="left:8%;top:18%;background:#ffe56a;--d:0s"></i><i class="candy sq" style="right:9%;top:14%;background:#7ff0c8;--d:.8s"></i><i class="candy st" style="left:5%;top:52%;background:#fff;--d:1.4s"></i><i class="candy" style="right:12%;bottom:30%;background:#7fd3ff;--d:2s"></i>'+
    '<div class="logo" aria-label="Levelleet">'+LOGO+'</div><div class="tagline">Match the code. Clear the level. Collect stars.</div>'+
    '<button class="playbig" data-act="level" data-i="'+cur+'" aria-label="Play level '+(cur+1)+'"><svg viewBox="0 0 24 24" width="38" height="38" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" fill="#3b2400"/></svg><span class="pt"><small>Level '+(cur+1)+'</small>Play</span></button>'+
    '<div class="herostats"><div>'+totS+'<small>Stars</small></div><div>'+doneL+'/'+LV.length+'<small>Levels</small></div><div>'+S.coins+'<small>Coins</small></div></div></div>';
  if(S.treatDay!==today()){
    html+='<div class="treat"><div><b>Daily treat is ready</b><span>One free gift every day.</span></div><button class="btn small" data-act="treat">Claim 15 coins</button></div>';
  }
  WORLDS.forEach((w,wi)=>{
    const lvls=LV.filter(l=>l.wi===wi);
    const got=lvls.reduce((a,l)=>a+(S.stars[l.i]||0),0);
    let y=34,last=0,inner='',pts=[];
    w.clusters.forEach(c=>{
      const cl=LV.filter(l=>l.c===c);
      const done=cl.filter(l=>S.stars[l.i]).length;
      inner+='<div class="chip" style="top:'+y+'px;--b:'+P[c.col].b+'"><i></i>'+esc(c.name)+'<small>'+done+'/'+cl.length+'</small></div>';
      y+=94;
      cl.forEach(l=>{
        const x=W/2+Math.sin(l.i*0.95)*W*0.28;
        pts.push([x,y]);
        const lock=!unlocked(l.i),st=S.stars[l.i]||0,col=P[c.col];
        inner+='<div class="nw" style="left:'+x.toFixed(1)+'px;top:'+y+'px">'+
          (l.i===cur&&!lock?'<div class="you">PLAY</div>':'')+
          '<button class="node'+(l.boss?' boss':'')+(lock?' locked':'')+'" data-act="level" data-i="'+l.i+'" style="--a:'+col.a+';--b:'+col.b+';--d:'+col.d+'" aria-label="Level '+(l.i+1)+', '+esc(c.name)+(l.boss?' review':'')+', '+(lock?'locked':st+' of 3 stars')+'">'+
          (lock?LOCK:l.boss?'<span><span class="bn">'+(l.i+1)+'</span><span class="rv">REVIEW</span></span>':(l.i+1))+'</button>'+
          (lock?'':'<div class="nstars'+(l.boss?' b':'')+'">'+star(st>=1,16)+star(st>=2,16)+star(st>=3,16)+'</div>')+
          '</div>';
        last=y;y+=96;
      });
      y=last+84;
    });
    let d='';
    pts.forEach((p,k)=>{
      if(!k){d='M'+p[0].toFixed(1)+' '+p[1];return;}
      const q=pts[k-1],dy=(p[1]-q[1])/2;
      d+=' C'+q[0].toFixed(1)+' '+(q[1]+dy)+' '+p[0].toFixed(1)+' '+(p[1]-dy)+' '+p[0].toFixed(1)+' '+p[1];
    });
    html+='<section class="world" style="--wbg:'+w.bg+';--w1:'+w.w1+';--w2:'+w.w2+'">'+
      '<div class="wh"><small>World '+(wi+1)+'</small><h2>'+esc(w.name)+'</h2><p><span>'+esc(w.sub)+'</span><span>'+got+' / '+lvls.length*3+' stars</span></p><button class="world-video" data-act="worldvideo" data-wi="'+wi+'">'+PLAYSM+' Watch lesson</button></div>'+
      '<div class="track" style="height:'+y+'px"><svg class="path" width="'+W+'" height="'+y+'" viewBox="0 0 '+W+' '+y+'" aria-hidden="true">'+
      '<path d="'+d+'" fill="none" stroke="rgba(50,22,58,.16)" stroke-width="13" stroke-linecap="round" stroke-dasharray="1 20"/>'+
      '<path d="'+d+'" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-dasharray="1 20"/></svg>'+inner+'</div></section>';
  });
  html+='<div class="soon"><h2>World 4: Functions</h2><p>Coming soon. Clear every star you can in the first three worlds.</p></div>';
  html+='<div class="tools"><span class="note-status">Tip: tap Watch lesson on any world, or inside a level, to see it explained again.</span></div>';
  html+='<div class="foot"><button class="btn ghost small" data-act="reset" id="resetbtn">Reset progress</button></div>';
  mapEl.innerHTML=html;
  if(scrollNext){
    scrollNext=false;
    const el=mapEl.querySelector('.you');
    if(el)setTimeout(()=>{window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-window.innerHeight*0.4});},60);
  }
}

/* ---------- Play ---------- */
let G=null;
function startLevel(i,skipIntro=false){
  tick();
  if(!unlocked(i)){toast('Clear the level before this one first');return;}
  if(!skipIntro&&LV[i]&&LESSONS[LV[i].wi]){const first=LV.find(l=>l.wi===LV[i].wi);if(first&&first.i===i&&!S.seen[LV[i].wi]){openLesson(LV[i].wi,{level:i});return;}}
  if(S.hearts<=0){outOfHearts();return;}
  const l=LV[i];
  const qs=l.boss?shuffle(l.c.qs.slice()).slice(0,3):[l.q];
  G={i,l,qs,qi:0,wrong:0,xp0:S.xp};
  playEl.hidden=false;lockScroll();playEl.scrollTop=0;
  renderQ();
}
function closePlay(){playEl.hidden=true;G=null;closeSheet();lockScroll();}
function renderQ(){
  const q=G.qs[G.qi],c=P[G.l.c.col];
  G.opts=null;G.gone=[];G.bad=[];G.locked=false;G.line=[];G.tokens=null;
  if(q.t==='build')G.tokens=shuffle(q.ans.concat(q.extra).map((t,id)=>({id,t})));
  const segs=G.qs.map((_,k)=>'<i class="'+(k<G.qi?'on':k===G.qi?'cur':'')+'"></i>').join('');
  playEl.innerHTML='<div class="pin"><div class="ptop"><button class="x" data-act="close" aria-label="Leave level">'+XI+'</button><div class="segs">'+segs+'</div><div class="moves" id="moves"></div></div>'+
    '<div class="play-tools"><button class="btn ghost" data-act="notebook">'+PEN+' Rough work</button><button class="btn grapeb" data-act="levelExplain">'+PLAYSM+' Watch lesson</button></div>'+
    '<div class="tag" style="color:'+c.d+'">'+esc(G.l.c.name)+' · '+(G.l.boss?'Review':'Level '+(G.i+1))+'</div>'+
    '<h2 class="ask">'+esc(q.ask)+'</h2>'+
    (q.code?'<pre class="code">'+hl(q.code)+'</pre>':'')+
    '<div id="ans"></div>'+
    '<div class="pbar"><button class="btn ghost small" data-act="hint">'+BULB+' Hint <span class="cost">'+COIN.replace(/22/g,'16')+' 10</span></button></div></div>';
  updateMoves();renderAns();
}
function updateMoves(){
  const m=$('moves');if(!m)return;
  m.setAttribute('aria-label',(3-G.wrong)+' moves left');
  m.innerHTML=[0,1,2].map(k=>'<b class="mv'+(k<G.wrong?' lost':'')+'"></b>').join('');
}
function renderAns(){
  const q=G.qs[G.qi],a=$('ans');
  if(q.t==='build'){
    const used=new Set(G.line);
    a.innerHTML='<div class="line" id="line">'+(G.line.length?G.line.map(id=>'<button class="tok in" data-act="untok" data-id="'+id+'">'+esc(G.tokens[id].t)+'</button>').join(''):'<span class="ph">Tap the pieces in order</span>')+'</div>'+
      '<div class="tray">'+G.tokens.map(t=>'<button class="tok'+(used.has(t.id)?' used':'')+'" data-act="tok" data-id="'+t.id+'">'+esc(t.t)+'</button>').join('')+'</div>'+
      '<div class="brow"><button class="btn ghost small" data-act="clear">Clear</button><button class="btn" data-act="check">Check</button></div>';
  }else{
    if(!G.opts)G.opts=shuffle([q.a].concat(q.w));
    a.innerHTML='<div class="opts">'+G.opts.map((o,k)=>'<button class="opt'+(G.gone.includes(o)?' gone':'')+(G.bad.includes(o)?' bad':'')+'" data-act="opt" data-k="'+k+'" style="--oc:'+OC[k%4]+'"><span class="badge">'+'ABCD'[k]+'</span><span>'+esc(o)+'</span></button>').join('')+'</div>';
  }
}
function pickOpt(k,el){
  if(!G||G.locked)return;
  const q=G.qs[G.qi],o=G.opts[k];
  const b=$('blank');
  if(q.t==='fill'&&b)b.textContent=o;
  if(o===q.a){el.classList.add('right');correct();}
  else{
    G.bad.push(o);el.classList.add('bad');
    if(q.t==='fill'&&b)setTimeout(()=>{if(G&&!G.locked)b.textContent='___';},700);
    wrong();
  }
}
function lineText(){return G.line.map(id=>G.tokens[id].t).join('');}
function prefixLen(){const q=G.qs[G.qi];let k=0;while(k<G.line.length&&G.tokens[G.line[k]].t===q.ans[k])k++;return k;}
function check(){
  if(!G||G.locked)return;
  const q=G.qs[G.qi];
  if(!G.line.length){toast('Tap some pieces first');return;}
  if(lineText()===q.ans.join('')){correct();}
  else{const ln=$('line');if(ln){ln.classList.remove('shake');void ln.offsetWidth;ln.classList.add('shake');}wrong();}
}
function correct(){
  G.locked=true;S.xp+=10;save();beep('ok');hud();
  const q=G.qs[G.qi],last=G.qi===G.qs.length-1;
  sheet('good','<h3>Sweet!</h3><p class="why">'+fmt(q.why)+'</p><div class="sbtns"><button class="btn" data-act="cont">'+(last?'Finish':'Continue')+'</button></div>');
}
function wrong(){
  G.wrong++;beep('bad');updateMoves();
  if(G.wrong>=3){setTimeout(fail,450);G.locked=true;}
  else toast('Not quite. '+(3-G.wrong)+' move'+(3-G.wrong===1?'':'s')+' left');
}
function fail(){
  tick();
  if(S.hearts>=5)S.heartTs=Date.now();
  S.hearts=Math.max(0,S.hearts-1);save();hud();
  const q=G.qs[G.qi],ans=q.t==='build'?q.ans.join(''):q.a;
  sheet('bad','<h3>Out of moves</h3><p>The answer was <code>'+esc(ans)+'</code></p><p class="why">'+fmt(q.why)+'</p>'+
    '<div class="sbtns">'+(S.hearts>0?'<button class="btn pinkb" data-act="retry">Try again</button>':'<button class="btn grapeb" data-act="refill">Refill hearts · 30</button>')+'<button class="btn ghost" data-act="map">Back to map</button></div>'+
    (S.hearts>0?'':'<p>No hearts left. The next one arrives in a few minutes.</p>'));
}
function finish(){
  const st=Math.max(1,3-G.wrong),old=S.stars[G.i]||0;
  let coins=0;
  if(st>old){coins=(st-old)*5+(old===0?5:0);S.stars[G.i]=st;}
  S.coins+=coins;
  const t=today();
  if(S.lastDay!==t){S.streak=(S.lastDay===yesterday())?S.streak+1:1;S.lastDay=t;}
  save();renderMap();hud();
  const up=plvl()>Math.floor(G.xp0/100)+1;
  const hasNext=G.i+1<LV.length;
  beep('win');confetti();
  sheet('res','<h3 style="text-align:center">'+(G.l.boss?'Review cleared':'Level cleared')+'</h3>'+
    '<div class="stars3">'+star(st>=1,56)+star(st>=2,56)+star(st>=3,56)+'</div>'+
    '<div class="rew"><span>+'+G.qs.length*10+' XP</span>'+(coins?'<span>+'+coins+' coins</span>':'')+(up?'<span>Player level '+plvl()+'</span>':'')+'</div>'+
    '<div class="sbtns">'+(hasNext?'<button class="btn" data-act="next">Next level</button>':'')+'<button class="btn ghost" data-act="map">Map</button></div>');
}
function hint(){
  if(!G||G.locked)return;
  if(S.coins<10){toast('You need 10 coins for a hint');return;}
  const q=G.qs[G.qi];
  if(q.t==='build'){
    const k=prefixLen();
    if(k>=q.ans.length){toast('Your line already matches. Press Check.');return;}
    G.line=G.line.slice(0,k);
    const tk=G.tokens.find(t=>t.t===q.ans[k]&&!G.line.includes(t.id));
    G.line.push(tk.id);
  }else{
    const live=shuffle(G.opts.filter(o=>o!==q.a&&!G.gone.includes(o)&&!G.bad.includes(o)));
    if(!live.length){toast('Only the right answer is left');return;}
    live.slice(0,2).forEach(o=>G.gone.push(o));
  }
  S.coins-=10;save();hud();beep('pop');renderAns();
}
function outOfHearts(){
  tick();
  const rem=S.heartTs?Math.max(0,S.heartTs+REGEN-Date.now()):0;
  sheet('bad','<h3>No hearts left</h3><p>The next heart arrives in about '+Math.max(1,Math.ceil(rem/60000))+' min. You can also refill now.</p>'+
    '<div class="sbtns"><button class="btn grapeb" data-act="refill">Refill · 30 coins</button><button class="btn ghost" data-act="closesheet">Close</button></div>');
}
function sheet(kind,html){
  sheetEl.className='sheet '+kind;
  sheetEl.innerHTML='<div class="si">'+html+'</div>';
  scrimEl.hidden=false;sheetEl.hidden=false;
}
function closeSheet(){sheetEl.hidden=true;scrimEl.hidden=true;}

/* ---------- Events ---------- */
let resetArmed=false;
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-act]');if(!t)return;
  const a=t.dataset.act,id=t.dataset.id!==undefined?+t.dataset.id:0;
  switch(a){
    case 'sound':S.sound=!S.sound;save();hud();if(S.sound)beep('pop');break;
    case 'treat':S.treatDay=today();S.coins+=15;save();beep('win');hud();renderMap();toast('+15 coins');break;
    case 'level':startLevel(+t.dataset.i);break;
    case 'notebook':openNotebook();break;
    case 'undoScratch':if(notebookEl.__scratchUndo)notebookEl.__scratchUndo();break;
    case 'closenotebook':closeNotebook();break;
    case 'erasenotes':
      if(t.dataset.armed){delete t.dataset.armed;t.textContent='Erase';if(notebookEl.__scratchErase)notebookEl.__scratchErase();else{try{localStorage.removeItem(NOTE_KEY);}catch(e){}}toast('Rough work erased');}
      else{t.dataset.armed='1';t.textContent='Tap again to erase';setTimeout(()=>{if(t.isConnected&&t.dataset.armed){delete t.dataset.armed;t.textContent='Erase';}},3500);}
      break;
    case 'worldvideo':openLesson(+t.dataset.wi);break;
    case 'levelExplain':if(G)openLesson(G.l.wi,{chapter:G.l.ci,back:'level'});break;
    case 'lclose':closeLesson();break;
    case 'lplay':lsTogglePlay();break;
    case 'lprev':lsStep(-1);break;
    case 'lnext':lsStep(1);break;
    case 'lreplay':{const f=LS.flat[LS.i];LS.introDone=true;lsPlayFrom(f?lsIdxOfChapter(f.c):0);break;}
    case 'lspeed':LS.speed=SPEEDS[(SPEEDS.indexOf(LS.speed)+1)%SPEEDS.length];lsCtl();break;
    case 'lvoice':S.voice=!S.voice;save();lsVoiceUi();if(!S.voice)lsSilence();break;
    case 'lchap':LS.introDone=true;LS.done={};{const c=+t.dataset.c;for(let k=0;k<c;k++)LS.done[k]=1;lsPlayFrom(lsIdxOfChapter(c));}break;
    case 'ltry':lsTry(+t.dataset.k);break;
    case 'lstart':{const i=LS.level;closeLesson();if(i!=null)startLevel(i,true);break;}
    case 'close':closePlay();break;
    case 'hint':hint();break;
    case 'opt':pickOpt(+t.dataset.k,t);break;
    case 'tok':if(G&&!G.locked&&!G.line.includes(id)){G.line.push(id);beep('pop');renderAns();}break;
    case 'untok':if(G&&!G.locked){G.line=G.line.filter(x=>x!==id);renderAns();}break;
    case 'clear':if(G&&!G.locked){G.line=[];renderAns();}break;
    case 'check':check();break;
    case 'cont':closeSheet();if(G.qi<G.qs.length-1){G.qi++;renderQ();}else finish();break;
    case 'retry':{const i=G.i;closeSheet();startLevel(i);break;}
    case 'next':{const i=G.i+1;closeSheet();startLevel(i);break;}
    case 'map':closePlay();scrollNext=true;renderMap();break;
    case 'closesheet':closeSheet();break;
    case 'refill':
      if(S.coins>=30){S.coins-=30;S.hearts=5;S.heartTs=null;save();hud();closeSheet();toast('Hearts refilled');if(G&&!playEl.hidden){const i=G.i;startLevel(i);}}
      else toast('You need 30 coins');
      break;
    case 'reset':
      if(!resetArmed){resetArmed=true;t.textContent='Tap again to erase everything';setTimeout(()=>{resetArmed=false;const b=$('resetbtn');if(b)b.textContent='Reset progress';},3500);}
      else{S=Object.assign(freshS(),{sound:S.sound,voice:S.voice});save();resetArmed=false;scrollNext=true;hud();renderMap();window.scrollTo({top:0});}
      break;
  }
});

let lastW=0,rt=0;
window.addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{if(mapEl.clientWidth!==lastW){lastW=mapEl.clientWidth;renderMap();}},150);});


/* ---------- Bridge to the backend sync layer (js/api.js) ---------- */
window.LevelleetBridge={
  snapshot(){
    return {
      stars:S.stars,coins:S.coins,xp:S.xp,hearts:S.hearts,heartTs:S.heartTs,
      streak:S.streak,lastDay:S.lastDay,treatDay:S.treatDay,
      sound:!!S.sound,voice:!!S.voice,
      seen:Object.keys(S.seen||{}).map(Number)
    };
  },
  apply(p){
    const seen={};(p.seen||[]).forEach(w=>{seen[w]=1;});
    S=Object.assign(freshS(),{
      stars:p.stars||{},coins:p.coins,xp:p.xp,hearts:p.hearts,heartTs:p.heartTs,
      streak:p.streak,lastDay:p.lastDay||'',treatDay:p.treatDay||'',
      sound:!!p.sound,voice:!!p.voice,seen:seen
    });
    saveLocal();hud();renderMap();
  },
  reset(){S=freshS();saveLocal();scrollNext=true;hud();renderMap();},
  refresh(){hud();}
};

hud();renderMap();lastW=mapEl.clientWidth;
setInterval(hud,1000);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{});
})();
