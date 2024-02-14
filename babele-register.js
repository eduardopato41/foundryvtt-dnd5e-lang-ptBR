
var types = {
	"aberration (shapechanger)": "Aberração (metamorfo)",
	"aberration": "Aberração",
	"beast": "Besta",
	"celestial (titan)": "Celestial (titã)",
	"celestial": "Celestial",
	"construct": "Constructo",
	"dragon": "Dragão",
	"elemental": "Elemental",
	"fey": "Fada",
	"fiend (demon)": "Ínfero (demônio)",
	"fiend (demon, orc)": "Ínfero (demônio, orc)",
	"fiend (demon, shapechanger)": "Ínfero (demônio, metamorfo)",
	"fiend (devil)": "Ínfero (diabo)",
	"fiend (devil, shapechanger)": "Ínfero (diabo, metamorfo)",
	"fiend (gnoll)": "Ínfero (gnoll)",
	"fiend (shapechanger)": "Ínfero (metamorfo)",
	"fiend (yugoloth)": "Ínfero (yugoloth)",
	"fiend": "Ínfero",
	"giant (cloud giant)": "Gigante (gigante das nuvens)",
	"giant (fire giant)": "Gigante (gigante do fogo)",
	"giant (frost giant)": "Gigante (gigante do gelo)",
	"giant (hill giant)": "Gigante (gigante da colina)",
	"giant (stone giant)": "Gigante (gigante de pedra)",
	"giant (storm giant)": "Gigante (gigante da tempestade)",
	"giant": "Gigante",
	"humanoid (aarakocra)": "Humanoide (aarakocra)",
	"humanoid (any race)": "Humanoide (qualquer raça)",
	"humanoid (bullywug)": "Humanoide (bullywug)",
	"humanoid (dwarf)": "Humanoide (anão)",
	"humanoid (elf)": "Humanoide (elfo)",
	"humanoid (firenewt)": "Humanoide (firenewt)",
	"humanoid (gith)": "Humanoide (gith)",
	"humanoid (gnoll)": "Humanoide (gnoll)",
	"humanoid (gnome)": "Humanoide (gnomo)",
	"humanoid (goblinoid)": "Humanoide (goblinoide)",
	"humanoid (grimlock)": "Humanoide (grimlock)",
	"humanoid (grung)": "Humanoide (grung)",
	"humanoid (human)": "Humanoide (humano)",
	"humanoid (human, shapechanger)": "Humanoide (humano, metamorfo)",
	"humanoid (kenku)": "Humanoide (kenku)",
	"humanoid (kobold)": "Humanoide (kobold)",
	"humanoid (kuo-toa)": "Humanoide (kuo-toa)",
	"humanoid (lizardfolk)": "Humanoide (povo lagarto)",
	"humanoid (merfolk)": "Humanoide (povo do mar)",
	"humanoid (orc)": "Humanoide (orc)",
	"humanoid (quaggoth)": "Humanoide (quaggoth)",
	"humanoid (sahuagin)": "Humanoide (sahuagin)",
	"humanoid (shapechanger)": "Humanoide (metamorfo)",
	"humanoid (thri-kreen)": "Humanoide (thri-kreen)",
	"humanoid (troglodyte)": "Humanoide (troglodita)",
	"humanoid (xvart)": "Humanoide (xvart)",
	"humanoid (yuan-ti)": "Humanoide (yuan-ti)",
	"humanoid": "Humanoide",
	"monstrosity (shapechanger)": "Monstruosidade (metamorfo)",
	"monstrosity (shapechanger, yuan-ti)": "Monstruosidade (metamorfo, yuan-ti)",
	"monstrosity (titan)": "Monstruosidade (titã)",
	"monstrosity": "Monstruosidade",
	"ooze": "Gosma",
	"plant": "Planta",
	"swarm of Tiny beasts": "Enxame de feras minúsculas",
	"undead (shapechanger)": "Morto-vivo (metamorfo)",
	"undead": "Morto-vivo"
};

var alignments = {
	"chaotic evil": "Cáotico",
	"chaotic neutral": "Cáotico e neutro",
	"chaotic good": "Cáotico e bom",
	"neutral evil": "Neutro e mau",
	"true neutral": "Neutro",
	"neutral": "Neutro",
	"neutral good": "Neutro e bom",
	"lawful evil": "Ordeiro e mau",
	"lawful neutral": "Ordeiro e neutro",
	"lawful good": "Ordeiro e bom",
	"chaotic good evil": "Cáotico e bom/mau",
	"lawful chaotic evil": "Ordeiro/Caótico e mau",
	"unaligned": "Sem alinhamento",
	"any non-lawful": "Qualquer alinhamento não ordeiro",
	"any": "Qualquer",
};

var languages = {
	"giant eagle": "Águia Gigante",
	"worg": "Worg",
	"winter wolf": "Lobo Invernal",
	"sahuagin": "Sahuagin",
	"giant owl": "Coruja gigante",
	"giant owl, understands but cannot speak all but giant owl": "Chouette Gigantee, comprend mais ne peut pas parler sauf en Chouette Gigantee",
	"giant elk but can't speak them": "Elan Gigante, mais ne peut pas le parler",
	"understands infernal but can't speak it": "comprend l'infernal mais ne peut pas le parler",
	"understands draconic but can't speak": "comprend le draconic mais ne peut pas le parler",
	"understands common but doesn't speak it": "comprend le commun mais ne peut pas le parler",
	"understands abyssal but can't speak": "comprend l'infernal mais ne peut pas le parler",
	"understands all languages it knew in life but can't speak": "comprend toutes les langues qu'il a apprises dans sa vie mais ne peut pas les parler",
	"understands commands given in any language but can't speak": "comprend les ordres donnés dans n'importe quelle langue mais ne peut pas parler",
	"(can't speak in rat form)": "(Ne peut pas parler sous forme de rat)",
	"(can't speak in boar form)": "(ne peut pas parler sous forme de sanglier)",
	"(can't speak in bear form)": "(ne peut pas parler sous forme d'ours)",
	"(can't speak in tiger form)": "(ne peut pas parler sous forme de tigre)",
	"any one language (usually common)": "une langue quelconque (généralement le commun)",
	"any two languages": "deux langues quelconques",
	"any four languages": "quatre langues quelconques",
	"5 other languages": "5 autres langues",
	"any, usually common": "généralement le commun",
	"one language known by its creator": "une langue connue de son créateur",
	"the languages it knew in life": "les langues qu'il connaissait dans la vie",
	"those it knew in life": "les langues qu'il connaissait dans la vie",
	"all it knew in life": "les langues qu'il connaissait dans la vie",
	"any it knew in life": "les langues qu'il connaissait dans la vie",
	"all, telepathy 120 ft.": "toutes, télépathie 36m",
	"telepathy 60 ft.": "télépathie 18m",
	"telepathy 60ft. (works only with creatures that understand abyssal)": "télépathie 18m (seulement avec les créatures qui connaissent l'abyssal)",
	"telepathy 120 ft.": "télépathie 36m",
	"but can't speak": "mais ne peut pas parler",
	"but can't speak it": "mais ne peut pas le parler",
	"choice": "au choix",
	"understands the languages of its creator but can't speak": "comprend les langues de son créateur mais ne paut pas les parler",
	"understands common and giant but can't speak": "comprend le gigante et le commun mais ne peut pas les parler",
	"cannot speak": "Ne parle pas"
};

var races = {
	"Dragonborn": "Drakéide",
	"Dwarf": "Nain",
	"Hill Dwarf": "Nain des collines",
	"Elf": "Elfe",
	"High Elf": "Haut-elfe",
	"Rock Gnome": "Gnome des roches",
	"Gnome": "Gnome",
	"Half Elf": "Demi-elfe",
	"Half-Elf": "Demi-elfe",
	"Half-elf": "Demi-elfe",
	"Halfling": "Halfelin",
	"Lightfoot Halfling": "Halfelin pied-léger",
	"Half Orc": "Demi-Orc",
	"Half-Orc": "Demi-Orc",
	"HUMAN": "humano",
	"Human": "humano",
	"Variant Human": "humano (variante)",
	"Tiefling": "Tieffelin"
};

var classes = {
	"Barbarian": "Barbare",
	"Bard": "Barde",
	"Cleric": "Clerc",
	"Druid": "Druide",
	"Fighter": "Guerrier",
	"Monk": "Moine",
	"Paladin": "Paladin",
	"Ranger": "Rôdeur",
	"Rogue": "Roublard",
	"Sorcerer": "Ensorceleur",
	"Warlock": "Occultiste",
	"Wizard": "Magicien",
	"Champion": "Champion",
	"College of Lore": "Collège du savoir",
	"Oath of Devotion": "Serment de dévotion",
	"Life Domain": "Domaine de la Vie",
	"Circle of the Land": "Cercle de la terre",
	"The Fiend": "Le fiélon",
	"Hunter": "Chasseur",
	"School of Evocation": "Ecole d'évocation",
	"Path of the Berserker": "Berserker",
	"Eldritch Blast": "Décharge occulte",
	"Pact of the Tome": "Pacte du grimoire",
	"Pact of the Blade": "Pacte de la lame",
	"Pact of the Chain": "Pacte de la chaîne",
	"Way of the Open Hand": "Voie de la main ouverte",
	"Draconic Bloodline": "Lignée draconique",
	"STR": "FOR",
	"or higher" : "ou plus"
};

var sources = {
	"SRD": "SRD"
};

var rarity = {
	"Common": "Commun",
	"Uncommon": "peu commun",
	"Rare": "Rare",
	"Very rare": "Très rare",
	"Legendary": "Légendaire"
};

function round(num) {
	return Math.round((num + Number.EPSILON) * 100) / 100;
}

function lbToKg(lb) {
	if(!lb) {
		return lb;
	}
	return parseInt(lb)/2;
}

function footsToMeters(ft) {
	if(!ft) {
		return ft;
	}
	return round(parseInt(ft)*0.3);
}

function milesToMeters(mi) {
	if(!mi) {
		return mi;
	}
	return round(parseInt(mi)*1.5);
}

function parseSenses(sensesText) {
	const senses = sensesText.split('. ');
	let parsed = '';
	senses.forEach(sense => { parsed = parseSense(sense) + ' ' + parsed; });
	return parsed;
}

function parseSense(sense) {
	var regexp = /([0-9]+)/gi;
	sense = sense.replace(/ft/gi, 'm');
	sense = sense.replace(/feet/gi, 'm');
	sense = sense.replace(/Darkvision/gi, "Vision dans le noir");
	sense = sense.replace(/Darvision/gi, "Vision dans le noir"); //bug ^^
	sense = sense.replace(/Blindsight/gi, "Vision aveugle");
	sense = sense.replace(/Truesight/gi, "Vision véritable");
	sense = sense.replace(/tremorsense/gi, "Perception des vibrations");
	sense = sense.replace(/Blind Beyond/gi, "Aveugle au-delà");
	sense = sense.replace(/this radius/gi, "de ce rayon");
	sense = sense.replace((sense.match(regexp)), footsToMeters(sense.match(regexp)));
	sense = sense.replace("(blind beyond this radius)", "(aveugle au-delà de ce rayon)");
	return sense;
}

function checkVersion(version1, version2) {
    const v1 = version1.split('.');
    const v2 = version2.split('.');
    
    const maxLength = Math.max(v1.length, v2.length);
    
    for (let i = 0; i < maxLength; i++) {
        const num1 = parseInt(v1[i]) || 0;
        const num2 = parseInt(v2[i]) || 0;
        
        if (num1 < num2) {
            return -1;
        } else if (num1 > num2) {
            return 1;
        }
    }
    
    return 0;
}

function parseDamage(damage) {
	damage = damage.replace(/bludgeoning/gi, 'contondant');
	damage = damage.replace(/piercing/gi, 'perforant');
	damage = damage.replace(/and/gi, 'et');
	damage = damage.replace(/slashing/gi, 'tranchant');
	damage = damage.replace(/from/gi, 'd\'');
	damage = damage.replace(/nonmagical attacks/gi, 'attaques non magiques');
	damage = damage.replace(/that aren't silvered/gi, 'non réalisées avec des armes en argent');
	damage = damage.replace(/not made with silvered weapons/gi, 'non réalisées avec des armes en argent');
	return damage;
}


function convertEnabled() {
	return game.settings.get("dnd5e_pt-BR", "convert");
}

function setEncumbranceData() {
	let convert = convertEnabled();
	game.settings.set("dnd5e", "metricWeightUnits", convert);
}

// ==== \\
//  Ne maintenant plus que du bout des doigts le module, 
//   le code ci-dessous est repris depuis la version italienne ( @Simone ) 
// ==== \\	
Hooks.once('init', () => {

	if(typeof Babele !== 'undefined') {

		game.settings.register("dnd5e_pt-BR", "convert", {
			name: "Conversions automatiques",
			hint: "Applique le système métrique à toutes les mesures, distances",
			scope: "world",
			type: Boolean,
			default: true,
			config: true,
			onChange: convert => {
				setEncumbranceData();
			}
		});

		Babele.get().register({
			module: 'dnd5e_pt-BR',
			lang: 'pt-BR',
			dir: 'lang/pt-BR/compendium'
		});

		Babele.get().registerConverters({
			"weight": (value) => {
				if(!convertEnabled()) {
					return value;
				}
				return lbToKg(value);
			},
			"range": (range) => {
				if(range) {
					if(!convertEnabled()) {
						return range;
					}
					if(range.units === "ft") {
						return mergeObject(range, {
							"value": footsToMeters(range.value),
							"long": footsToMeters(range.long),
							"units": "m"
						});
					}
					if(range.units === "mi") {
						return mergeObject(range, {
							"value": milesToMeters(range.value),
							"long": milesToMeters(range.long),
							"units": "km"
						});
					}
					return range;
				}
			},
			"sightRange": (range) => {
				if(!convertEnabled()) {
					return range;
				}
				return footsToMeters(range)
			},
			"alignement": (alignment) => {
				return alignments[alignment.toLowerCase()];
			},
			"movement": (movement) => {

				if(!convertEnabled()) {
					return movement;
				}

				let convert = (value) => { return value; };
				let units = movement.units;
				if(units === 'ft') {
					convert = (value) => { return footsToMeters(value) };
					units = "m";
				}
				if(units === 'ml') {
					convert = (value) => { return milesToMeters(value) };
					units = "m";
				}

				return mergeObject(movement, {
					burrow: convert(movement.burrow),
					climb: convert(movement.climb),
					fly: convert(movement.fly),
					swim: convert(movement.swim),
					units: units,
					walk: convert(movement.walk)
				});
			},
			"senses": (senses) => {
				if(!convertEnabled()) {
					return senses;
				}

				let convert = (value) => { return value; };
				let units = senses.units;
				if(units === 'ft') {
					convert = (value) => { return footsToMeters(value) };
					units = "m";
				}
				if(units === 'ml') {
					convert = (value) => { return milesToMeters(value) };
					units = "m";
				}

				return mergeObject(senses, {
					darkvision: convert(senses.darkvision),
					blindsight: convert(senses.blindsight),
					tremorsense: convert(senses.tremorsense),
					truesight: convert(senses.truesight),
					units: units,
					special: convert(senses.special)
				});
			},
			"di": (damage) => {
				return parseDamage(damage);
			},
			"languages": (lang) => {
				if (lang != null ) {
					const languagesSplit = lang.split('; ');
					let languagesFin = '';
					let languagesTr = '';
					languagesSplit.forEach(function(el){
            languagesTr = languages[el];
						if (languagesTr != null) {
              languagesTr = languagesTr.toLowerCase();
							if (languagesFin === '') {
								languagesFin = languagesTr;
							}  else {
								languagesFin = languagesFin + ' ; '  + languagesTr;
							}
						}
					});
					return languagesFin;
				}
			},
			"token": (token) => {
				mergeObject(
					token, {
						sight: footsToMeters(token.dimSight),
						brightSight: footsToMeters(token.brightSight)
					}
				);
			},
			"race": (race) => {
				return races[race] ? races[race] : race;
			},
			"rarity": (r) => {
				return rarity[r] ? rarity[r] : r
			},
			"raceRequirements": (requirements) => {
				let names = requirements.split(',');
				let translated = [];
				names.map(name => name.trim()).forEach(name => {
					translated.push(races[name] ? races[name] : name)
				});
				return translated.join(', ');
			},
			"classRequirements": (requirements) => {
				let names = requirements.split(',');
				let translated = [];
				names.map(name => name.trim()).forEach(name => {
					let keys = Object.keys(classes);
					let translatedName = name;
					keys.forEach(key => {
						translatedName = translatedName.replace(key, classes[key])
					});
					translated.push(translatedName)
				});
				return translated.join(', ');
			},
			"source": (source) => {
				let keys = Object.keys(sources);
				let translatedSource = source;
				const isNewStructure = checkVersion(dnd5e.version, '2.4.0')>=0;
				if (isNewStructure){
					translatedSource = source.book;
				}

				if (translatedSource){
					keys.forEach(key => {
						translatedSource = translatedSource.replace(key, sources[key])
					});
				}

				if (isNewStructure){
					return mergeObject(
						source, {
							book: translatedSource
						}
					);
				}
				return translatedSource;
			},
			
		});
	}
});

Hooks.once('ready', () => {
	setEncumbranceData();
});

Hooks.on('createScene', (scene) => {
	if(convertEnabled()) {
		scene.update({
			"gridUnits": "m", "gridDistance": 1.5
		});
	}
});

Hooks.on('createActor', (actor) => {
	if(actor.getFlag("babele", "translated")) {
		return;
	}
	if(convertEnabled()) {
		actor.update({
			 token: {
				 dimSight: footsToMeters(actor.data.token.dimSight),
				 brightSight: footsToMeters(actor.data.token.brightSight)
			 },
			 data: {
				 attributes: {
					 movement: {
						 burrow: 0,
						 climb: 0,
						 fly: 0,
						 swim: 0,
						 units: 'm',
						 walk: 9
					 }
				 }
			 }
		 });
	}
})

async function skillSorting() {
	const lists = document.getElementsByClassName("skills-list");
	for (let list of lists) {
		const competences = list.childNodes;
		let complist = [];
		for (let sk of competences) {
			if (sk.innerText && sk.tagName == "LI") {
				complist.push(sk);
			}
		}
		complist.sort(function(a, b) {
			return (a.innerText > b.innerText) ? 1 : -1;
		});
		for (let sk of complist) {
			list.appendChild(sk)
		}
	}
}

Hooks.on("renderActorSheet", async function() {
	skillSorting();
});