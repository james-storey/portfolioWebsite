
var emailFill = function () 
// Email obfuscator script 2.1 by Tim Williams, University of Arizona
// Random encryption key feature by Andrew Moulden, Site Engineering Ltd
// This code is freeware provided these four comment lines remain intact
// A wizard to generate this code is at http://www.jottings.com/obfuscator/
{ 
	coded = "g4LeOU.VpyOg@Fypdu.CLy"
	key = "VNQhiDxYlgLJMbUKec6t10kATfdz3auFmZv8W9OCj4wXH7SqEsop2PyGrBR5In"
	shift=coded.length
	link=""
	for (i=0; i<coded.length; i++) {
	    if (key.indexOf(coded.charAt(i))==-1) {
	      	ltr = coded.charAt(i)
	      	link += (ltr)
	    }
	    else {     
	      	ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length
	      	link += (key.charAt(ltr))
	    }
	}
	document.getElementById("email").innerHTML = link;
}