var ALADEEN = ALADEEN || {};

ALADEEN.main = (function(){
	
	var getRandomBooleanValue = function() {
		return ALADEEN.util.getRandomInt(100) > (100 - ALADEEN.settings.textReplacePercent);
	}
	
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
						var text = node.nodeValue.trim();
						if(text === '')
							continue;
						
						var words = text.split(' ');
						
						var replacedText = '';
						for(var k =0; k <words.length; k++) {
							if(words[k] === ' ') {
								replacedText += ' ';
								continue;
							}
							
							if(words[k].length === 1) {
								continue;
							}
							
							if(getRandomBooleanValue()) {
								if(k != 0)
									replacedText += ' ';
								replacedText += ALADEEN.settings.replaceValue;
							}
							else {
								if(k != 0)
									replacedText += ' ';
								replacedText += words[k];
							}
						}

						node.nodeValue = replacedText;
					}
				}
			}
		}		
	}
	
	return {
		init : init
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


ALADEEN.settings = (function(){
	return {
		replaceValue : 'Aladeen',
		textReplacePercent : 10
	}
})();

ALADEEN.main.init();