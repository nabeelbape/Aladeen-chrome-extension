var ALADEEN = ALADEEN || {};

ALADEEN.main = (function(){
	
	var init = function() {
		var bodyElement = document.getElementsByTagName('body');

		if (bodyElement != undefined && bodyElement[0] != undefined) {
			var elements = bodyElement[0].getElementsByTagName('*');
			for (var i = 0; i < elements.length; i++) {
				var element = elements[i];
				
				if(element.tagName == 'SCRIPT' || element.tagName == 'STYLE' || element.tagName == 'NOSCRIPT')
					continue;
				
				for (var j = 0; j < element.childNodes.length; j++) {
					var node = element.childNodes[j];
					
					if(node.tagName == 'SCRIPT' || node.tagName == 'STYLE' || node.tagName == 'NOSCRIPT')
						continue;

					if (node.nodeType === 3) {
						node.nodeValue = ALADEEN.textProcessor.processText(node.nodeValue);						
					}
				}
			}
		}
	}
	
	return {
		init : init
	}
})();

ALADEEN.textProcessor = (function(){
	
	var invalidCharsRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~123456789]/;
	
	var tokenize = function(text) {
		var tokens = [];
		var token = '';
		for(let i = 0; i < text.length; i++) {
			let currentChar = text[i];
			
			if(currentChar === ' ' || ALADEEN.data.punctuations.has(currentChar)) {
				if(token !== '') {
					tokens.push(token);
					token = '';
				}
				tokens.push(currentChar);
				continue;
			}
			
			token += currentChar;
		}
		
		if(token.length > 0)
			tokens.push(token);
		
		return tokens;
	}
	
	var isTokenValidForTextReplace = function(token) {
		var tokenValue = token.toLowerCase();
		if(tokenValue.length < 3
			|| invalidCharsRegex.test(tokenValue)
			|| ALADEEN.data.conjunctions.has(tokenValue)
			|| ALADEEN.data.prepositions.has(tokenValue)
			|| ALADEEN.data.determiners.has(tokenValue)
			|| ALADEEN.data.verbs.has(tokenValue)
			|| tokenValue.endsWith('ly')
			|| tokenValue.endsWith('ing')
		)
			return false;
		return true;		
	}
	
	var getRandomBooleanValue = function() {
		return ALADEEN.util.getRandomInt(100) > (100 - ALADEEN.data.textReplacePercent);
	}
	
	var processText = function(text) {
		
		if(text.trim() === '')
			return text;
				
		var replacedText = '';		
		var tokens = tokenize(text);
		
		var replaceDistance = ALADEEN.data.replaceWordDistance;
		
		for(let i = 0; i < tokens.length; i++) {
			let token = tokens[i];
			
			if(replaceDistance < ALADEEN.data.replaceWordDistance && token !== ' ') {
				replaceDistance++;
			}
			else if(isTokenValidForTextReplace(token) && getRandomBooleanValue()) {
				replaceDistance = 0;
				token = ALADEEN.data.replaceValue;
			}
			
			replacedText += token;
		}
		return replacedText;
	}
	
	return {
		processText : processText
	}
})();

ALADEEN.util = (function(){
	
	var getRandomInt = function(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}
	
	return {
		getRandomInt : getRandomInt
	}
})();


ALADEEN.data = (function(){
	
	let punctuationSet = new Set
	([
		'.', 
		'?', 
		'!', 
		',', 
		':', 
		';', 
		'-', 
		'[', 
		']', 
		'{', 
		'}', 
		'(', 
		')', 
		'\'', 
		'"'
	]);
	
	let conjunctionSet = new Set
	([
		'for',
		'and',
		'nor',
		'but',
		'or',
		'yet',
		'so',
		'though',
		'although',
		'even',
		'while',
		'if',
		'only',
		'unless',
		'until',
		'provided',
		'that',
		'assuming',
		'in',
		'case',
		'lest',
		'than',
		'rather',
		'whether',
		'as',
		'much',
		'whereas',
		'after',
		'long',
		'soon',
		'before',
		'by',
		'the',
		'time',
		'now',
		'once',
		'since',
		'till',
		'when',
		'whenever',
		'because',
		'order',
		'why',
		'what',
		'whatever',
		'which',
		'whichever',
		'who',
		'whoever',
		'whom',
		'whomever',
		'whose',
		'how',
		'where',
		'wherever',
		'just as',
		'both',
		'hardly',
		'scarcely',
		'either',
		'neither',
		'then',
		'not',
		'no sooner',
		'also',
		'besides',
		'furthermore',
		'likewise',
		'moreover',
		'similar',
		'to',
		'however',
		'nevertheless',
		'nonetheless',
		'still',
		'conversely',
		'instead',
		'otherwise',
		'accordingly',
		'consequently',
		'hence',
		'meanwhile',
		'therefore',
		'thus'
	]);
	
	let prepositionSet = new Set
	([
		'about',
		'above',
		'according',
		'across',
		'against',
		'of',
		'ahead',
		'along',
		'amidst',
		'among',
		'amongst',
		'apart',
		'around',
		'well',
		'aside',
		'at',
		'barring',
		'behind',
		'below',
		'beneath',
		'beside',
		'between',
		'beyond',
		'means',
		'circa',
		'concerning',
		'despite',
		'down',
		'due',
		'during',
		'lieu',
		'spite',
		'inside',
		'into',
		'except',
		'excluding',
		'following',
		'from',
		'like',
		'minus',
		'near',
		'next',
		'past',
		'per',
		'prior',
		'round',
		'off',
		'on',
		'behalf',
		'onto',
		'opposite',
		'out',
		'outside',
		'over',
		'owing',
		'plus',
		'through',
		'throughout',
		'times',
		'toward',
		'towards',
		'under',
		'underneath',
		'unlike',
		'unto',
		'up',
		'upon',
		'via',
		'with',
		'within',
		'without'
	]);
	
	let determinerSet = new Set
	([
		'every',
		'most',
		'little',
		'half',
		'another',
		'other',
		'her',
		'my',
		'their',
		'a',
		'an',
		'his',
		'these',
		'them',
		'all',
		'its',
		'no',
		'this',
		'any',
		'those',
		'least',
		'our',
		'each',
		'less',
		'several',
		'many',
		'some',
		'enough',
		'more',
		'such',
		'your'
	]);
	
	let verbSet = new Set
	([
		'be',
		'have',
		'do',
		'say',
		'get',
		'make',
		'go',
		'know',
		'take',
		'see',
		'come',
		'think',
		'look',
		'want',
		'give',
		'use',
		'find',
		'tell',
		'ask',
		'work',
		'seem',
		'feel',
		'try',
		'leave',
		'call',
		'don',
		'dont',
		'become',
		'begin',
		'can',
		'could',
		'hear',
		'help',
		'keep',
		'let',
		'live',
		'may',
		'mean',
		'might',
		'move',
		'need',
		'play',
		'put',
		'run',
		'should',
		'show',
		'start',
		'talk',
		'turn',
		'will',
		'would',
		'had'
	]);
	
	return {
		replaceValue : 'Aladeen',
		textReplacePercent : 20,
		replaceWordDistance : 3,
		punctuations : punctuationSet,
		conjunctions : conjunctionSet,
		prepositions : prepositionSet,
		determiners : determinerSet,
		verbs : verbSet
	}
})();

ALADEEN.main.init();