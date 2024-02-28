Hooks.once('init', () => {

	if (typeof Babele !== 'undefined') {

		game.settings.register("dnd5e_pt-BR", "convert", {
			name: "Conversões automáticas",
			hint: "Converte todas as medidas e distâncias para o sistema métrico.",
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
			"pages": Converters.pages(),
			"weight": Converters.weight(),
			"range": Converters.range(),
			"sightRange": Converters.sightRange(),
			"alignement": Converters.alignment(),
			"movement": Converters.movement(),
			"senses": Converters.senses(),
			"di": Converters.damage(),
			"languages": Converters.languages(),
			"token": Converters.token(),
			"race": Converters.race(),
			"rarity": Converters.rarity(),
			"raceRequirements": Converters.raceRequirements(),
			"classRequirements": Converters.classRequirements(),
			"source": Converters.source(),
			"type": Converters.type()
		});
	}
});

Hooks.once('ready', () => {
	setEncumbranceData();
});

Hooks.on('createScene', (scene) => {
	if (convertEnabled()) {
		scene.update({
			"gridUnits": "m", "gridDistance": 1.5
		});
	}
});

Hooks.on('createActor', (actor) => {
	if (actor.getFlag("babele", "translated")) {
		return;
	}
	if (convertEnabled()) {
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

Hooks.on("renderActorSheet", async function () {
	skillSorting();
});

function convertEnabled() {
	return game.settings.get("dnd5e_pt-BR", "convert");
}

function setEncumbranceData() {
	let convert = convertEnabled();
	game.settings.set("dnd5e", "metricWeightUnits", convert);

	// Fix system bug 
	CONFIG.DND5E.encumbrance.threshold.encumbered = mergeObject(
		CONFIG.DND5E.encumbrance.threshold.encumbered, {
			metric: 2.5
		}
	);
	CONFIG.DND5E.encumbrance.threshold.heavilyEncumbered = mergeObject(
		CONFIG.DND5E.encumbrance.threshold.heavilyEncumbered, {
			metric: 5
		}
	);
	CONFIG.DND5E.encumbrance.threshold.maximum = mergeObject(
		CONFIG.DND5E.encumbrance.threshold.maximum , {
			metric: 7.5
		}
	);
	CONFIG.DND5E.encumbrance.speedReduction = mergeObject(
		CONFIG.DND5E.encumbrance.speedReduction, {
			encumbered : 3,
			heavilyEncumbered : 6
		}
	);
}

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
		complist.sort(function (a, b) {
			return (a.innerText > b.innerText) ? 1 : -1;
		});
		for (let sk of complist) {
			list.appendChild(sk)
		}
	}
}

/**
 * Utility class with all predefined converters
 */

class Converters {

	// Override babele page to translate tooltips
	static pages() {
		return (pages, translations) => Converters._pages(pages, translations);
	}
	static _pages(pages, translations) {
		return pages.map(data => {
			if (!translations) {
				return data;
			}

			const translation = translations[data.name];
			if (!translation) {
				return data;
			}

			return mergeObject(data, {
				name: translation.name,
				image: { caption: translation.caption ?? data.image.caption },
				src: translation.src ?? data.src,
				text: { content: translation.text ?? data.text.content },
				video: {
					width: translation.width ?? data.video.width,
					height: translation.height ?? data.video.height,
				},
				system: { tooltip: translation.tooltip ?? data.system.tooltip },
				translated: true,
			});
		});
	}

	static weight() {
		return (value) => Converters._weight(value);
	}

	static _weight(value) {
		if (!convertEnabled()) {
			return value;
		}
		return Converters.lbToKg(value);
	}

	static range() {
		return (range) => Converters._range(range);
	}

	static _range(range) {
		if (!range) {
			return range;
		}

		if (!convertEnabled()) {
			return range;
		}
		if (range.units === "ft") {
			return mergeObject(range, {
				"value": Converters.footsToMeters(range.value),
				"long": Converters.footsToMeters(range.long),
				"units": "m"
			});
		}
		if (range.units === "mi") {
			return mergeObject(range, {
				"value": Converters.milesToMeters(range.value),
				"long": Converters.milesToMeters(range.long),
				"units": "km"
			});
		}
		return range;
	}

	static alignment() {
		return (alignment) => Converters._alignment(alignment);
	}

	static _alignment(alignment) {
		return alignments[alignment.toLowerCase()];
	}

	static sightRange() {
		return (range) => Converters._sightRange(range);
	}

	static _sightRange(range) {
		if (!convertEnabled()) {
			return range;
		}
		return Converters.footsToMeters(range)
	}

	static alignment(){
		return (alignment) => Converters._alignment(alignment);
	}

	static _alignment(alignment) {
		return alignments[alignment.toLowerCase()];
	}

	static movement() {
		return (movement) => Converters._movement(movement);
	}

	static _movement(movement) {

		if (!convertEnabled()) {
			return movement;
		}

		let convert = (value) => { return value; };
		let units = movement.units;
		if (units === 'ft') {
			convert = (value) => { return Converters.footsToMeters(value) };
			units = "m";
		}
		if (units === 'ml') {
			convert = (value) => { return Converters.milesToMeters(value) };
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
	}

	static senses() {
		return (senses) => Converters._senses(senses);
	}

	static _senses(senses) {
		if(!convertEnabled()) {
			return senses;
		}

		let convert = (value) => { return value; };
		let units = senses.units;
		if(units === 'ft') {
			convert = (value) => { return Converters.footsToMeters(value) };
			units = "m";
		}
		if(units === 'ml') {
			convert = (value) => { return Converters.milesToMeters(value) };
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
	}

	static damage() {
		return (damage) => Converters._damage(damage);
	}

	static _damage(damage) {
		return Converters.parseDamage(damage);
	}

	static languages() {
		return (lang) => Converters._languages(lang);
	}

	static _languages(lang) {
		if (lang == null) {
			return lang;
		}

		const languagesSplit = lang.split('; ');
		let languagesFin = '';
		let languagesTr = '';
		languagesSplit.forEach(function(el){
			languagesTr = languages[el];
			if (languagesTr != null) {
				if (languagesFin === '') {
					languagesFin = languagesTr;
				}  else {
					languagesFin = languagesFin + ' ; '  + languagesTr;
				}
			}
		});
		return languagesFin;
	}

	static token() {
		return (token) => Converters._token(token);
	}

	static _token(token) {
		return mergeObject(
			token, {
				sight: Converters.footsToMeters(token.dimSight),
				brightSight: Converters.footsToMeters(token.brightSight)
			}
		);
	}

	static race() {
		return (race) => Converters._race(race);
	}

	static _race(race) {
		return races[race] ? races[race] : race;
	}

	static rarity() {
		return (r) => Converters._rarity(r);
	}

	static _rarity(r) {
		return rarity[r] ? rarity[r] : r
	}

	static raceRequirements() {
		return (requirements) => Converters._raceRequirements(requirements);
	}

	static _raceRequirements(requirements) {
		let names = requirements.split(',');
		let translated = [];
		names.map(name => name.trim()).forEach(name => {
			translated.push(races[name] ? races[name] : name)
		});
		return translated.join(', ');
	}

	static classRequirements() {
		return (requirements) => Converters._classRequirements(requirements);
	}

	static _classRequirements(requirements) {
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
	}

	static source() {
		return (source) => Converters._source(source);
	}

	static _source(source) {
		let keys = Object.keys(source);
		let translatedSource = source.book;

		if (translatedSource) {
			keys.forEach(key => {
				translatedSource = translatedSource.replace(key, sources[key])
			});
		}
		return mergeObject(
			source, {
			book: translatedSource
		}
		);
	}

	static type() {
		return (type) => Converters._type(type);
	}

	static _type(type) {	
		console.log(typeof(races));
		console.log(type)	;
		console.log(type.subtype.toLowerCase());
		console.log(races[type.subtype.toLowerCase()]);
		let index;
		for (let key of Object.keys(races)) {
			if (key.toLowerCase() !== type.subtype.toLowerCase()){
				continue;
			}

			index = key;
			break;
		}

		return mergeObject(type,
			{
				subtype: index ? races[index].toLowerCase() : type.subtype,				
			}
		);
	}



	static round(num) {
		return Math.round((num + Number.EPSILON) * 100) / 100;
	}

	static lbToKg(lb) {
		if (!lb) {
			return lb;
		}
		return parseInt(lb) / 2;
	}

	static footsToMeters(ft) {
		if (!ft) {
			return ft;
		}
		return Converters.round(parseInt(ft) * 0.3);
	}

	static milesToMeters(mi) {
		if (!mi) {
			return mi;
		}
		return Converters.round(parseInt(mi) * 1.5);
	}

	static parseDamage(damage) {
		damage = damage.replace(/bludgeoning/gi, 'contundente');
		damage = damage.replace(/piercing/gi, 'perfurante');
		damage = damage.replace(/and/gi, 'e');
		damage = damage.replace(/slashing/gi, 'cortante');
		damage = damage.replace(/from/gi, 'de');
		damage = damage.replace(/damage/gi, 'dano');
		damage = damage.replace(/spells/gi, 'magias');
		damage = damage.replace(/nonmagical attacks/gi, 'ataques não mágicos');
		damage = damage.replace(/that aren't silvered/gi, 'que não sejam com prata');
		damage = damage.replace(/not made with silvered weapons/gi, 'não seja com uma arma prateada');
    damage = damage.replace(/that aren't adamantine/gi, 'que não sejam de adamantina');
		return damage;
	}
}

var alignments = {
	"chaotic evil": "Cáotico e mau",
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
	"any alignment": "Qualquer alinhamento",
};

var languages = {
	"(Any 6 Languages)": "Quaisquer 6 idiomas",
  "(can't speak in bear form)": "(não pode falar na forma de urso)",
  "(can't speak in boar form)": "(não pode falar na forma javali)",
  "(can't speak in rat form)": "(não pode falar na forma de rato)",
  "(can't speak in tiger form)": "(não pode falar na forma de tigre)",
  "(can't speak in wolf form)": "(não pode falar na forma de lobo)",
  "5 other languages": "e até mais outros cinco idiomas",
  "All": "Todos",
  "All languages known to its summoner": "Todos os idiomas conhecidos por quem o invocou",
  "any four languages": "Quatro idiomas quaisquer",
  "any languages it knew in life": "Todos os idiomas que conhecia em vida",
  "any one language": "Um idioma qualquer",
  "any one language (usually Common)": "Um idioma qualquer (geralmente Comum)",
  "any two": "Dois idiomas quaisquer",
  "any two languages": "Dois idiomas quaisquer",
  "Blink Dog": "Cão Teleportador",
  "can't speak": "mas não pode falar",
  "Cannot Speak": "mas não pode falar",
  "Common and Auran (understands but cannot speak)": "Entende Comum e Auran, mas não pode falar",
  "Giant Eagle": "Águia Gigante",
  "Giant Elk": "Alce Gigante",
  "Giant Owl": "Coruja gigante",
  "Languages it knew in life": "Os idiomas que conhecia em vida",
  "one language known by its creator": "Um idioma conhecido pelo seu criador",
  "Sphinx": "Esfinge",
  "Telepathy 120 ft.": "Telepatia 36m",
  "Telepathy 60 ft.": "Telepatia 18m",
  "Telepathy 60 ft. (works only with creatures that understand Abyssal)": "Telepatia 18m (funciona apenas com criaturas que entendam Abissal)",
  "the languages it knew in life": "Os idiomas que conhecia em vida",
  "understands Abyssal, Celestial, Infernal, and Primordial but can't speak": "Entende Abissal, Celestial, Infernal e Primordial mas não pode falar",
  "understands Abyssal, Common, and Infernal but can't speak": "Entende Abissal, Comum e Infernal, mas não pode falar",
  "Understands all languages it knew in life but can't speak": "Compreende todos os idiomas que conhecia em vida, mas não pode falar",
  "understands but can't speak": "Compreende Abissal, mas não pode falar",
  "understands Celestial, Common, Elvish, and Sylvan but can't speak": "Entende Celestial, Comum, Élfico e Silvestre mas não pode falar",
  "understands commands given in any language but can't speak": "Entende comandos em qualquer idioma, mas não pode falar",
  "understands Common and Giant but can't speak": "Compreende Comum e Gigante, mas não pode falar",
  "Understands Common but can't speak": "Compreende Comum, mas não pode falar",
  "understands Common but doesn't speak it": "Entende Comum, mas não pode falar",
  "Understands Common, Elvish, and Sylvan but can't speak them": "Entende Comum, Élfico e Silvestre, mas não pode falar",
  "Understands Deep Speech but can't speak": "Entende Dialeto Obscuro mas não pode falar",
  "Understands Draconic but can't speak": "Entende Dracônico, mas não pode falar",
  "understands Infernal but can't speak it": "Entende Infernal, mas não pode falar",
  "understands Sylvan but can't speak it": "Entende Silvestre, mas não pode falar",
  "understands the languages it knew in life but can't speak": "Compreende os idiomas que conhecia em vida, mas não pode falar",
  "understands the languages of its creator but can't speak": "Entende o idioma de quem o criou, mas não pode falar",
  "Understands the languages of its creator but cannot speak": "Entende o idioma de quem o criou, mas não pode falar",
  "Winter Wolf": "Lobo Invernal",
  "Worg": "Worg"
};

var races = {
	"Dragonborn": "Draconato",
	"Dwarf": "Anão",
	"Hill Dwarf": "Anão da Colina",
	"Elf": "Elfo",
	"High Elf": "Alto Elfo",
	"Rock Gnome": "Gnomo das rochas",
	"Gnome": "Gnomo",
	"Half Elf": "Meio-elfo",
	"Half-Elf": "Meio-elfo",
	"Half-elf": "Meio-elfo",
	"Halfling": "Pequenino",
	"Lightfoot Halfling": "Pequenino pés-ligeiros",
	"Half Orc": "Meio-Orc",
	"Half-Orc": "Meio-Orc",
	"HUMAN": "Humano",
	"Human": "Humano",
	"Variant Human": "Humano (Variante)",
	"Tiefling": "Tiferino",
	"Any Race": "Qualquer raça"
};

var classes = {
	"Barbarian": "Bárbaro",
	"Bard": "Bardo",
	"Cleric": "Clérigo",
	"Druid": "Druida",
	"Fighter": "Guerreiro",
	"Monk": "Monge",
	"Paladin": "Paladino",
	"Ranger": "Guardião",
	"Rogue": "Ladino",
	"Sorcerer": "Feiticeiro",
	"Warlock": "Bruxo",
	"Wizard": "Mago",
	"Champion": "Campeão",
	"College of Lore": "Colégio do Conhecimento",
	"Oath of Devotion": "Juramento da Devoção",
	"Life Domain": "Domínio da Vida",
	"Circle of the Land": "Círculo da Terra",
	"The Fiend": "O Ínfero",
	"Hunter": "Caçador",
	"School of Evocation": "Escola de Evocação",
	"Path of the Berserker": "Trilha do Berserker",
	"Eldritch Blast": "Raio Místico",
	"Pact of the Tome": "Pacto do Tomo",
	"Pact of the Blade": "Pacto da Lâmina",
	"Pact of the Chain": "Pacto da Corrente",
	"Way of the Open Hand": "Caminho da Mão Espalmada",
	"Draconic Bloodline": "Linhagem Dracônica",
	"STR": "FOR",
	"or higher" : "ou maior"
};

var sources = {
	"SRD": "SRD"
};

var rarity = {
	"Common": "Commun",
	"Uncommon": "Incomum",
	"Rare": "Raro",
	"Very rare": "Muito Raro",
	"Legendary": "Lendário"
};