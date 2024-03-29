/**
 * Functions Script
 * Provides useful functions globally used by the system - like randomRange and Verbose
 * By Arthur Annibal - WebAniversario
 * Version 0.0.0
 */

/** Global verbose: controls if system will speak out everything it's doing */ 
var activateVerbose = true;

/** Global utils: object containing all utillity functions */
utils = {};

/** Logs to the console. TODO: improved cross-browser console.log */
function verbose() {
	if (activateVerbose) {
		if (arguments.length==1) {
			console.log(arguments[0]);
			return;
		} 
		if (arguments.length==2) {
			console.log(arguments[0],arguments[1]);
			return;
		}
		if (arguments.length==3) {
			console.log(arguments[0],arguments[1],arguments[2]);
			return;
		}
		console.log(arguments);
	}
}

/**
 *  Returns value in B scale proportional to a current value in A scale
 *  @param Array A - the minimal and maximal values of scale A. example [10, 270]
 *  @param Array B - the minimal and maximal values of scale B. example [5, 8]
 *  @param float current - the number in A scale. truncated to A if overflowing.
 *  @returns float - the number in B scale
 */
function getScaledRatio(A, B, current) {
    if (current < A[0]) current = A[0];
    if (current > A[1]) current = A[1];
    /*
    var Amax = A[1] - A[0];
    var altCurrent = current - A[0];
    var xPercA = altCurrent/Amax;
    var Bmax = B[1] - B[0]
    var propX = Bmax * xPercA;
    return propX + B[0];
    */
    
    return (B[1] - B[0]) * ((current-A[0])/(A[1] - A[0])) + B[0];
}
/**
 *  Returns value in B scale proportional to a current value in A scale
 *  @param Array A - the minimal and maximal values of scale A. example [10, 270]
 *  @param Array B - the minimal and maximal values of scale B. example [5, 8]
 *  @param float current - the number in A scale. truncated to A if overflowing.
 *  @returns float - the number in B scale
 */
function getScaledRatioInverse(A, B, current) {
    if (current < A[1]) current = A[1];
    if (current > A[0]) current = A[0];
    /*
    var Amax = A[1] - A[0];
    var altCurrent = current - A[0];
    var xPercA = altCurrent/Amax;
    var Bmax = B[1] - B[0]
    var propX = Bmax * xPercA;
    return propX + B[0];
    */
    
    return (B[1] - B[0]) * ((current-A[0])/(A[1] - A[0])) + B[0];
}

/**
 * Returns a value overlapped inside min and max. performs a loop as if wrapping the value STEP times.
 * @param Number value - the value to be wrapped.
 * @param Number min - the floor
 * @param Number max - the roof
 * @param Number [step] - optional, defaults to max+1. how much to remove/add if beyond min/max.
 * @throws Error if a infinite loop happens
 * @returns Number the wrapped value.
 */
function wrapWithin(value, min, max, step) {
    if (step == undefined) step = max+1;
    var counter = 0;
    while (value > max) {
        value -= step;
        counter++;
        if (counter > 10000) { throw "Infinite loop at Wrap Within: MIN="+min+", MAX="+max+", STEP="+step+"."; }
    }
    counter = 0;
    while (value < min) {
        value += step;
        counter++;
        if (counter > 10000) { throw "Infinite loop at Wrap Within: MIN="+min+", MAX="+max+", STEP="+step+"."; }
    }
    return value;
}
function wrap360(value) {
    return wrapWithin(value,0,359);
}

/**
 * Trims the value inside min and max.
 * @param Number value - the value to be trimmed.
 * @param Number min - the minimum.
 * @param Number max - the maximum.
 * @returns Number value, if inside min and max. min or max if not.
 */
function trimWithin(value, min, max) {
    if (value > max) return max;
    if (value < min) return min;
    return value;
}

/**
 * Verifies if a value is among an array.
 * @param Mixed value - anything.
 * @param Array arr - the list of things to be checked
 * @returns Boolean true if found, false if not found.
 */
function inArray(value, arr) {
    for (var ir in arr) {
        if (value == arr[ir]) {
            return true;
        }
    }
    return false;
}

/**
 * Almost a HASH function, gives a 6-char with a "#" leading, that represents a color.
 * Generates the same color for the same string, not beeing random.
 * @param String string - any text.
 * @returns String from #000000 to #FFFFFF.
 */
function randomStringToHexColor(string) {
    var stringHexNumber = (                       // 1
        parseInt(                                 // 2
            parseInt(string, 36)  // 3
                .toExponential()                  // 4
                .slice(2,-5)                      // 5
        , 10) & 0xFFFFFF                          // 6
    ).toString(16).toUpperCase(); // "32EF01"     // 7
    return '#' + ('000000' + stringHexNumber).slice(-6);
}

/**
 * Generates a completely random UID.
 * @returns String an unique id.
 */
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

/**
 * Calculates the average from all values of an array.
 * @param Array arr - an list of numbers
 * @returns Float - the average of all.
 */
function calculateArrayAverage(arr) {
    var sum = 0, count = 0;
    for (var caaCounter in arr) {
        sum+=parseFloat(arr[caaCounter]);
        count++;
    }
    return sum/count;
}

/**
 * Returns random number between min and max. doesn't includes max parameter
 * @param int minNum minimum number
 * @param int maxNum maximum number
 * @returns int random number
 */
function randomRange(minNum, maxNum) {
     return (Math.floor(Math.random() * (maxNum - minNum)) + minNum);
}

/**
 * Returns random item from array
 * @param array victim where the values are
 * @returns int random item from victim array
 */
 function randomArr(victim) {
	 return victim[randomRange(0,victim.length)];
 }

/**
 * Returns random number between min and max. doesn't includes max parameter
 * @param float minNum minimum number
 * @param float maxNum maximum number
 * @param float dec    number of decimal houses
 * @returns float random number
 */
function randomFloat(minNum, maxNum, dec) {
    var rNumber = (Math.random() * (maxNum - minNum)) + minNum;
    // +1 for period char count
    return parseFloat( (rNumber+"").substr(0,(rNumber+"").indexOf(".")+(dec == undefined ? (2+1) : (dec+1))) );
}

/**
 * Returns the array, shuffled.
 * @param number x1
 * @param number x2
 * @param number x3
 * @param number x4
 * @returns float distance
 */
function shuffleArray(arr) {
    aux = [];
    var len = 0;
    for (var arrIndex1 in arr) {
        aux.push(arr[arrIndex1]);   
        len++;
    }
    aux2 = [];
    for (var arrIndex2=0; arrIndex2<len; arrIndex2++) {
        aux2.push( aux.splice(randomRange(0,aux.length), 1)[0] );
    }
    return aux2;
}

/**
 * Returns the distance between 2 points
 * @param number x1
 * @param number x2
 * @param number x3
 * @param number x4
 * @returns float distance
 */
function pointDistance(x1,y1, x2,y2) {
    return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
}

/**
 * Returns the angle between 2 points
 * @param number x1
 * @param number x2
 * @param number x3
 * @param number x4
 * @returns float angle
 */
function pointAngle(x1,y1,x2,y2) {
    return rad2deg(Math.atan2(-(y1-y2), x2-x1))+180;
}

/**
 * Converts an 'pointAngle' generated angle into an 'Math.sin()' usable value
 * @param number angle
 * @returns number radians
 */
function jsAngle(angle) {
    return deg2rad(270-angle);
}

/**
 * Esta fodendo funÃ§Ã£o
 * Fodendo pega um numero ordinal
 * e fodendo transforma-o num numero por extenso
 * essa funÃ§Ã£o Ã© foda
 * @param String|Int number - um nÃºmero. se for muito grande melhor mandar string mesmo. pode ter uma virgula/ponto se for decimal
 * @returns String - o nÃºmero por extenso, tipo, 23 vira "vinte e trÃªs", 1008.901 vira "mil e oito virgula novecentos e um".
 */
function extenseNumber(number) {
    if (number == 0) return "zero";
    if ((number+"").indexOf(".") != -1) {
        splited = (number+"").split(".")
        str = extenseNumber(splited[0]) + " virgula "+ extenseNumber(splited[1].replace(/[0]*$/g,""));
        return str;
    }
    if ((number+"").indexOf(",") != -1) {
        splited = (number+"").split(",");
        str = extenseNumber(splited[0]) + " virgula "+ extenseNumber(splited[1].replace(/[0]*$/g,""));
        return str;
    }
    var unitStr = ["", "Um", "Dois", "TrÃªs", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove"];
    var dezenaStr = [ "", "Dez", "Vinte", "Trinta", "Quarenta", "Cinquenta", "Sessenta", "Setenta", "Oitenta", "Noventa"];
    var onzenaStr = [ "", "Onze", "Doze", "Treze", "Quatorze", "Quinze", "Dezesseis", "Dezessete", "Dezoito", "Dezenove"];
    var centenaStr = [ "", "Cem|Cento", "Duzentos", "Trezentos", "Quatrocentos", "Quinhentos", "Seissentos", "Setecentos", "Oitocentos", "Novecentos"];
    var kStr = "Mil";
    var kNStr = [ "", ["MilhÃ£o","MilhÃµes"], ["BilhÃ£o","BilhÃµes"], ["TrilhÃ£o","TrilhÃµes"], ["QuadrilhÃ£o","QuadrilhÃµes"], ["QuintilhÃ£o","QuintilhÃµes"],["SextilhÃ£o","SextilhÃµes"] ];
    //if (number < 0 || number > 999) { throw "Numero fora da extensÃ£o de nÃºmeros por extenso"; }

    var aux = (number+"").split("");
    var n = [], i = 0;
    for (i = aux.length-1; i>=0; i--) {
        n.push(aux[i]);
    }
    for (i=0; i<24; i++) { n[i] = (n[i] == undefined ? 0 : parseInt(n[i]) ); }
    var str = "";

    for (i=23; i>=0; i-=3) {
        var ic = i;
        var id = i-1;
        var iu = i-2;

        // indicador de milhar, casa 4
        if (i != 23) {
            var m = parseInt(i/3);
            if (n[i+1] != 0 || n[i+2] != 0 || n[i+3] != 0) {
                if (m == 0) {
                    str += " "+kStr+" ";
                    if (n[ic] != 0 || n[id] != 0 || n[iu] != 0) {
                        str += "e ";   
                    }
                } else {
                    if (n[i+1] == 1 && n[i+2] == 0 && n[i+3] == 0) {
                        str += " "+kNStr[m][0]+" ";
                    } else {
                        str += " "+kNStr[m][1]+" ";
                    }
                }
            }
        }

        // casa 3 centena
        if (n[ic] == 1) {
            var cem = centenaStr[1].split("|");
            if (n[id] == 0 && n[iu] == 0) {
                str += cem[0];
            } else {
                str += cem[1];   
            }
        } else {
            str += centenaStr[n[ic]];
        }
        if (n[ic] != 0 && (n[id] != 0 || n[iu] != 0)) {
            str += " e ";
        }

        // casa 2 dezena e casa 1 unidade
        if (n[id] == 1 && n[iu] != 0) {
            str += onzenaStr[n[iu]];
        } else {
           str += dezenaStr[n[id]];
            if (n[id] != 0 && (n[iu] != 0) ) {
                str += " e " + unitStr[n[iu]];
            }
        }

        if (n[id] == 0 && n[iu] != 0) {
            str  += unitStr[n[iu]];   
        }
    }
    return str.toLowerCase();
}

function zeroFill(number,length) {
    length = (length == undefined ? 4 : length)
    var len = (number+"").length;
    return "0".repeat(length-len < 0 ? 0 : (length-len)) + number;
}

utils.zeroFill = zeroFill;
utils.extenseNumber = extenseNumber;
utils.jsAngle = jsAngle;
utils.pointAngle = pointAngle;
utils.pointDistance = pointDistance;
utils.shuffleArray = shuffleArray;
utils.randomFloat = randomFloat;
utils.randomRange = randomRange;
utils.calculateArrayAverage = calculateArrayAverage;
utils.generateUUID = generateUUID;
utils.inArray = inArray;
utils.trimWithin = trimWithin;
utils.wrap360 = wrap360;
utils.wrapWithin = wrapWithin;
utils.getScaledRatioInverse = getScaledRatioInverse;
utils.getScaledRatio = getScaledRatio;
utils.verbose = verbose;
utils.randomArr = randomArr;


