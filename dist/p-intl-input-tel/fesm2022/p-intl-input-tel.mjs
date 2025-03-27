import * as lpn from 'google-libphonenumber';
import { PhoneNumberUtil, PhoneNumberFormat, PhoneNumber } from 'google-libphonenumber';
import * as i0 from '@angular/core';
import { Pipe, Directive, input, EventEmitter, signal, forwardRef, Component, Input, Output } from '@angular/core';
import * as i4 from '@angular/forms';
import { FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import * as i1 from 'primeng/dropdown';
import { DropdownModule } from 'primeng/dropdown';
import * as i3 from 'primeng/inputtext';
import { InputTextModule } from 'primeng/inputtext';
import * as i2 from 'primeng/api';

var SearchCountryField;
(function (SearchCountryField) {
    SearchCountryField["DIALCODE"] = "dialCode";
    SearchCountryField["ISO2"] = "iso2";
    SearchCountryField["NAME"] = "name";
})(SearchCountryField || (SearchCountryField = {}));
;

class Country {
    name;
    iso2;
    dialCode;
    priority;
    areaCodes;
    htmlId;
    flagClass;
    placeHolder;
    isFavorite;
    constructor() {
        this.name = '';
        this.iso2 = '';
        this.dialCode = '';
        this.priority = 0;
        this.areaCodes = undefined;
        this.htmlId = '';
        this.flagClass = '';
        this.placeHolder = '';
    }
}

class ChangeData {
    number;
    internationalNumber;
    nationalNumber;
    e164Number;
    countryCode;
    dialCode;
    constructor(phoneNumber) {
        const utils = PhoneNumberUtil.getInstance();
        this.countryCode = phoneNumber && utils.getRegionCodeForNumber(phoneNumber) ? utils.getRegionCodeForNumber(phoneNumber) : '';
        this.dialCode = phoneNumber?.getCountryCode() ? `+${phoneNumber.getCountryCode()}` : '';
        this.e164Number = phoneNumber && utils.format(phoneNumber, PhoneNumberFormat.E164) !== '+0' ? utils.format(phoneNumber, PhoneNumberFormat.E164) : '';
        this.internationalNumber = phoneNumber ? utils.format(phoneNumber, PhoneNumberFormat.INTERNATIONAL) : '';
        this.nationalNumber = phoneNumber ? utils.format(phoneNumber, PhoneNumberFormat.NATIONAL) : '';
        this.number = phoneNumber ? utils.format(phoneNumber, PhoneNumberFormat.NATIONAL) : '';
    }
}

var CountryISO;
(function (CountryISO) {
    CountryISO["Afghanistan"] = "af";
    CountryISO["Albania"] = "al";
    CountryISO["Algeria"] = "dz";
    CountryISO["AmericanSamoa"] = "as";
    CountryISO["Andorra"] = "ad";
    CountryISO["Angola"] = "ao";
    CountryISO["Anguilla"] = "ai";
    CountryISO["AntiguaAndBarbuda"] = "ag";
    CountryISO["Argentina"] = "ar";
    CountryISO["Armenia"] = "am";
    CountryISO["Aruba"] = "aw";
    CountryISO["Australia"] = "au";
    CountryISO["Austria"] = "at";
    CountryISO["Azerbaijan"] = "az";
    CountryISO["Bahamas"] = "bs";
    CountryISO["Bahrain"] = "bh";
    CountryISO["Bangladesh"] = "bd";
    CountryISO["Barbados"] = "bb";
    CountryISO["Belarus"] = "by";
    CountryISO["Belgium"] = "be";
    CountryISO["Belize"] = "bz";
    CountryISO["Benin"] = "bj";
    CountryISO["Bermuda"] = "bm";
    CountryISO["Bhutan"] = "bt";
    CountryISO["Bolivia"] = "bo";
    CountryISO["BosniaAndHerzegovina"] = "ba";
    CountryISO["Botswana"] = "bw";
    CountryISO["Brazil"] = "br";
    CountryISO["BritishIndianOceanTerritory"] = "io";
    CountryISO["BritishVirginIslands"] = "vg";
    CountryISO["Brunei"] = "bn";
    CountryISO["Bulgaria"] = "bg";
    CountryISO["BurkinaFaso"] = "bf";
    CountryISO["Burundi"] = "bi";
    CountryISO["Cambodia"] = "kh";
    CountryISO["Cameroon"] = "cm";
    CountryISO["Canada"] = "ca";
    CountryISO["CapeVerde"] = "cv";
    CountryISO["CaribbeanNetherlands"] = "bq";
    CountryISO["CaymanIslands"] = "ky";
    CountryISO["CentralAfricanRepublic"] = "cf";
    CountryISO["Chad"] = "td";
    CountryISO["Chile"] = "cl";
    CountryISO["China"] = "cn";
    CountryISO["ChristmasIsland"] = "cx";
    CountryISO["Cocos"] = "cc";
    CountryISO["Colombia"] = "co";
    CountryISO["Comoros"] = "km";
    CountryISO["CongoDRCJamhuriYaKidemokrasiaYaKongo"] = "cd";
    CountryISO["CongoRepublicCongoBrazzaville"] = "cg";
    CountryISO["CookIslands"] = "ck";
    CountryISO["CostaRica"] = "cr";
    CountryISO["C\u00F4teDIvoire"] = "ci";
    CountryISO["Croatia"] = "hr";
    CountryISO["Cuba"] = "cu";
    CountryISO["Cura\u00E7ao"] = "cw";
    CountryISO["Cyprus"] = "cy";
    CountryISO["CzechRepublic"] = "cz";
    CountryISO["Denmark"] = "dk";
    CountryISO["Djibouti"] = "dj";
    CountryISO["Dominica"] = "dm";
    CountryISO["DominicanRepublic"] = "do";
    CountryISO["Ecuador"] = "ec";
    CountryISO["Egypt"] = "eg";
    CountryISO["ElSalvador"] = "sv";
    CountryISO["EquatorialGuinea"] = "gq";
    CountryISO["Eritrea"] = "er";
    CountryISO["Estonia"] = "ee";
    CountryISO["Ethiopia"] = "et";
    CountryISO["FalklandIslands"] = "fk";
    CountryISO["FaroeIslands"] = "fo";
    CountryISO["Fiji"] = "fj";
    CountryISO["Finland"] = "fi";
    CountryISO["France"] = "fr";
    CountryISO["FrenchGuiana"] = "gf";
    CountryISO["FrenchPolynesia"] = "pf";
    CountryISO["Gabon"] = "ga";
    CountryISO["Gambia"] = "gm";
    CountryISO["Georgia"] = "ge";
    CountryISO["Germany"] = "de";
    CountryISO["Ghana"] = "gh";
    CountryISO["Gibraltar"] = "gi";
    CountryISO["Greece"] = "gr";
    CountryISO["Greenland"] = "gl";
    CountryISO["Grenada"] = "gd";
    CountryISO["Guadeloupe"] = "gp";
    CountryISO["Guam"] = "gu";
    CountryISO["Guatemala"] = "gt";
    CountryISO["Guernsey"] = "gg";
    CountryISO["Guinea"] = "gn";
    CountryISO["GuineaBissau"] = "gw";
    CountryISO["Guyana"] = "gy";
    CountryISO["Haiti"] = "ht";
    CountryISO["Honduras"] = "hn";
    CountryISO["HongKong"] = "hk";
    CountryISO["Hungary"] = "hu";
    CountryISO["Iceland"] = "is";
    CountryISO["India"] = "in";
    CountryISO["Indonesia"] = "id";
    CountryISO["Iran"] = "ir";
    CountryISO["Iraq"] = "iq";
    CountryISO["Ireland"] = "ie";
    CountryISO["IsleOfMan"] = "im";
    CountryISO["Israel"] = "il";
    CountryISO["Italy"] = "it";
    CountryISO["Jamaica"] = "jm";
    CountryISO["Japan"] = "jp";
    CountryISO["Jersey"] = "je";
    CountryISO["Jordan"] = "jo";
    CountryISO["Kazakhstan"] = "kz";
    CountryISO["Kenya"] = "ke";
    CountryISO["Kiribati"] = "ki";
    CountryISO["Kosovo"] = "xk";
    CountryISO["Kuwait"] = "kw";
    CountryISO["Kyrgyzstan"] = "kg";
    CountryISO["Laos"] = "la";
    CountryISO["Latvia"] = "lv";
    CountryISO["Lebanon"] = "lb";
    CountryISO["Lesotho"] = "ls";
    CountryISO["Liberia"] = "lr";
    CountryISO["Libya"] = "ly";
    CountryISO["Liechtenstein"] = "li";
    CountryISO["Lithuania"] = "lt";
    CountryISO["Luxembourg"] = "lu";
    CountryISO["Macau"] = "mo";
    CountryISO["Macedonia"] = "mk";
    CountryISO["Madagascar"] = "mg";
    CountryISO["Malawi"] = "mw";
    CountryISO["Malaysia"] = "my";
    CountryISO["Maldives"] = "mv";
    CountryISO["Mali"] = "ml";
    CountryISO["Malta"] = "mt";
    CountryISO["MarshallIslands"] = "mh";
    CountryISO["Martinique"] = "mq";
    CountryISO["Mauritania"] = "mr";
    CountryISO["Mauritius"] = "mu";
    CountryISO["Mayotte"] = "yt";
    CountryISO["Mexico"] = "mx";
    CountryISO["Micronesia"] = "fm";
    CountryISO["Moldova"] = "md";
    CountryISO["Monaco"] = "mc";
    CountryISO["Mongolia"] = "mn";
    CountryISO["Montenegro"] = "me";
    CountryISO["Montserrat"] = "ms";
    CountryISO["Morocco"] = "ma";
    CountryISO["Mozambique"] = "mz";
    CountryISO["Myanmar"] = "mm";
    CountryISO["Namibia"] = "na";
    CountryISO["Nauru"] = "nr";
    CountryISO["Nepal"] = "np";
    CountryISO["Netherlands"] = "nl";
    CountryISO["NewCaledonia"] = "nc";
    CountryISO["NewZealand"] = "nz";
    CountryISO["Nicaragua"] = "ni";
    CountryISO["Niger"] = "ne";
    CountryISO["Nigeria"] = "ng";
    CountryISO["Niue"] = "nu";
    CountryISO["NorfolkIsland"] = "nf";
    CountryISO["NorthKorea"] = "kp";
    CountryISO["NorthernMarianaIslands"] = "mp";
    CountryISO["Norway"] = "no";
    CountryISO["Oman"] = "om";
    CountryISO["Pakistan"] = "pk";
    CountryISO["Palau"] = "pw";
    CountryISO["Palestine"] = "ps";
    CountryISO["Panama"] = "pa";
    CountryISO["PapuaNewGuinea"] = "pg";
    CountryISO["Paraguay"] = "py";
    CountryISO["Peru"] = "pe";
    CountryISO["Philippines"] = "ph";
    CountryISO["Poland"] = "pl";
    CountryISO["Portugal"] = "pt";
    CountryISO["PuertoRico"] = "pr";
    CountryISO["Qatar"] = "qa";
    CountryISO["R\u00E9union"] = "re";
    CountryISO["Romania"] = "ro";
    CountryISO["Russia"] = "ru";
    CountryISO["Rwanda"] = "rw";
    CountryISO["SaintBarth\u00E9lemy"] = "bl";
    CountryISO["SaintHelena"] = "sh";
    CountryISO["SaintKittsAndNevis"] = "kn";
    CountryISO["SaintLucia"] = "lc";
    CountryISO["SaintMartin"] = "mf";
    CountryISO["SaintPierreAndMiquelon"] = "pm";
    CountryISO["SaintVincentAndTheGrenadines"] = "vc";
    CountryISO["Samoa"] = "ws";
    CountryISO["SanMarino"] = "sm";
    CountryISO["S\u00E3oTom\u00E9AndPr\u00EDncipe"] = "st";
    CountryISO["SaudiArabia"] = "sa";
    CountryISO["Senegal"] = "sn";
    CountryISO["Serbia"] = "rs";
    CountryISO["Seychelles"] = "sc";
    CountryISO["SierraLeone"] = "sl";
    CountryISO["Singapore"] = "sg";
    CountryISO["SintMaarten"] = "sx";
    CountryISO["Slovakia"] = "sk";
    CountryISO["Slovenia"] = "si";
    CountryISO["SolomonIslands"] = "sb";
    CountryISO["Somalia"] = "so";
    CountryISO["SouthAfrica"] = "za";
    CountryISO["SouthKorea"] = "kr";
    CountryISO["SouthSudan"] = "ss";
    CountryISO["Spain"] = "es";
    CountryISO["SriLanka"] = "lk";
    CountryISO["Sudan"] = "sd";
    CountryISO["Suriname"] = "sr";
    CountryISO["SvalbardAndJanMayen"] = "sj";
    CountryISO["Swaziland"] = "sz";
    CountryISO["Sweden"] = "se";
    CountryISO["Switzerland"] = "ch";
    CountryISO["Syria"] = "sy";
    CountryISO["Taiwan"] = "tw";
    CountryISO["Tajikistan"] = "tj";
    CountryISO["Tanzania"] = "tz";
    CountryISO["Thailand"] = "th";
    CountryISO["TimorLeste"] = "tl";
    CountryISO["Togo"] = "tg";
    CountryISO["Tokelau"] = "tk";
    CountryISO["Tonga"] = "to";
    CountryISO["TrinidadAndTobago"] = "tt";
    CountryISO["Tunisia"] = "tn";
    CountryISO["Turkey"] = "tr";
    CountryISO["Turkmenistan"] = "tm";
    CountryISO["TurksAndCaicosIslands"] = "tc";
    CountryISO["Tuvalu"] = "tv";
    CountryISO["USVirginIslands"] = "vi";
    CountryISO["Uganda"] = "ug";
    CountryISO["Ukraine"] = "ua";
    CountryISO["UnitedArabEmirates"] = "ae";
    CountryISO["UnitedKingdom"] = "gb";
    CountryISO["UnitedStates"] = "us";
    CountryISO["Uruguay"] = "uy";
    CountryISO["Uzbekistan"] = "uz";
    CountryISO["Vanuatu"] = "vu";
    CountryISO["VaticanCity"] = "va";
    CountryISO["Venezuela"] = "ve";
    CountryISO["Vietnam"] = "vn";
    CountryISO["WallisAndFutuna"] = "wf";
    CountryISO["WesternSahara"] = "eh";
    CountryISO["Yemen"] = "ye";
    CountryISO["Zambia"] = "zm";
    CountryISO["Zimbabwe"] = "zw";
    CountryISO["\u00C5landIslands"] = "ax";
})(CountryISO || (CountryISO = {}));

const ALL_COUNTRIES = [
    [
        'Afghanistan (‫افغانستان‬‎)',
        CountryISO.Afghanistan,
        '93'
    ],
    [
        'Albania (Shqipëri)',
        CountryISO.Albania,
        '355'
    ],
    [
        'Algeria (‫الجزائر‬‎)',
        CountryISO.Algeria,
        '213'
    ],
    [
        'American Samoa',
        'as',
        '1',
        1,
        [
            '684',
        ]
    ],
    [
        'Andorra',
        CountryISO.Andorra,
        '376'
    ],
    [
        'Angola',
        CountryISO.Angola,
        '244'
    ],
    [
        'Anguilla',
        'ai',
        '1',
        1,
        [
            '264',
        ]
    ],
    [
        'Antigua and Barbuda',
        'ag',
        '1',
        1,
        [
            '268',
        ]
    ],
    [
        'Argentina',
        CountryISO.Argentina,
        '54'
    ],
    [
        'Armenia (Հայաստան)',
        CountryISO.Armenia,
        '374'
    ],
    [
        'Aruba',
        CountryISO.Aruba,
        '297'
    ],
    [
        'Australia',
        CountryISO.Australia,
        '61',
        0
    ],
    [
        'Austria (Österreich)',
        CountryISO.Austria,
        '43'
    ],
    [
        'Azerbaijan (Azərbaycan)',
        CountryISO.Azerbaijan,
        '994'
    ],
    [
        'Bahamas',
        'bs',
        '1',
        1,
        [
            '242',
        ]
    ],
    [
        'Bahrain (‫البحرين‬‎)',
        CountryISO.Bahrain,
        '973'
    ],
    [
        'Bangladesh (বাংলাদেশ)',
        CountryISO.Bangladesh,
        '880'
    ],
    [
        'Barbados',
        'bb',
        '1',
        1,
        [
            '246',
        ]
    ],
    [
        'Belarus (Беларусь)',
        CountryISO.Belarus,
        '375'
    ],
    [
        'Belgium (België)',
        CountryISO.Belgium,
        '32'
    ],
    [
        'Belize',
        CountryISO.Belize,
        '501'
    ],
    [
        'Benin (Bénin)',
        CountryISO.Benin,
        '229'
    ],
    [
        'Bermuda',
        'bm',
        '1',
        1,
        [
            '441',
        ]
    ],
    [
        'Bhutan (འབྲུག)',
        CountryISO.Bhutan,
        '975'
    ],
    [
        'Bolivia',
        CountryISO.Bolivia,
        '591'
    ],
    [
        'Bosnia and Herzegovina (Босна и Херцеговина)',
        CountryISO.BosniaAndHerzegovina,
        '387'
    ],
    [
        'Botswana',
        CountryISO.Botswana,
        '267'
    ],
    [
        'Brazil (Brasil)',
        CountryISO.Brazil,
        '55'
    ],
    [
        'British Indian Ocean Territory',
        CountryISO.BritishIndianOceanTerritory,
        '246'
    ],
    [
        'British Virgin Islands',
        'vg',
        '1',
        1,
        [
            '284',
        ]
    ],
    [
        'Brunei',
        CountryISO.Brunei,
        '673'
    ],
    [
        'Bulgaria (България)',
        CountryISO.Bulgaria,
        '359'
    ],
    [
        'Burkina Faso',
        CountryISO.BurkinaFaso,
        '226'
    ],
    [
        'Burundi (Uburundi)',
        CountryISO.Burundi,
        '257'
    ],
    [
        'Cambodia (កម្ពុជា)',
        CountryISO.Cambodia,
        '855'
    ],
    [
        'Cameroon (Cameroun)',
        CountryISO.Cameroon,
        '237'
    ],
    [
        'Canada',
        CountryISO.Canada,
        '1',
        1,
        [
            '204', '226', '236', '249', '250', '289', '306', '343', '365', '387', '403', '416',
            '418', '431', '437', '438', '450', '506', '514', '519', '548', '579', '581', '587',
            '604', '613', '639', '647', '672', '705', '709', '742', '778', '780', '782', '807',
            '819', '825', '867', '873', '902', '905'
        ]
    ],
    [
        'Cape Verde (Kabu Verdi)',
        CountryISO.CapeVerde,
        '238'
    ],
    [
        'Caribbean Netherlands',
        CountryISO.CaribbeanNetherlands,
        '599',
        1
    ],
    [
        'Cayman Islands',
        'ky',
        '1',
        1,
        [
            '345',
        ]
    ],
    [
        'Central African Republic (République centrafricaine)',
        CountryISO.CentralAfricanRepublic,
        '236'
    ],
    [
        'Chad (Tchad)',
        CountryISO.Chad,
        '235'
    ],
    [
        'Chile',
        CountryISO.Chile,
        '56'
    ],
    [
        'China (中国)',
        CountryISO.China,
        '86'
    ],
    [
        'Christmas Island',
        CountryISO.ChristmasIsland,
        '61',
        2
    ],
    [
        'Cocos (Keeling) Islands',
        CountryISO.Cocos,
        '61',
        1
    ],
    [
        'Colombia',
        CountryISO.Colombia,
        '57'
    ],
    [
        'Comoros (‫جزر القمر‬‎)',
        CountryISO.Comoros,
        '269'
    ],
    [
        'Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)',
        CountryISO.CongoDRCJamhuriYaKidemokrasiaYaKongo,
        '243'
    ],
    [
        'Congo (Republic) (Congo-Brazzaville)',
        CountryISO.CongoRepublicCongoBrazzaville,
        '242'
    ],
    [
        'Cook Islands',
        CountryISO.CookIslands,
        '682'
    ],
    [
        'Costa Rica',
        CountryISO.CostaRica,
        '506'
    ],
    [
        'Côte d’Ivoire',
        CountryISO.CôteDIvoire,
        '225'
    ],
    [
        'Croatia (Hrvatska)',
        CountryISO.Croatia,
        '385'
    ],
    [
        'Cuba',
        CountryISO.Cuba,
        '53'
    ],
    [
        'Curaçao',
        CountryISO.Curaçao,
        '599',
        0
    ],
    [
        'Cyprus (Κύπρος)',
        CountryISO.Cyprus,
        '357'
    ],
    [
        'Czech Republic (Česká republika)',
        CountryISO.CzechRepublic,
        '420'
    ],
    [
        'Denmark (Danmark)',
        CountryISO.Denmark,
        '45'
    ],
    [
        'Djibouti',
        CountryISO.Djibouti,
        '253'
    ],
    [
        'Dominica',
        CountryISO.Dominica,
        '1767'
    ],
    [
        'Dominican Republic (República Dominicana)',
        CountryISO.DominicanRepublic,
        '1',
        2,
        ['809', '829', '849']
    ],
    [
        'Ecuador',
        CountryISO.Ecuador,
        '593'
    ],
    [
        'Egypt (‫مصر‬‎)',
        CountryISO.Egypt,
        '20'
    ],
    [
        'El Salvador',
        CountryISO.ElSalvador,
        '503'
    ],
    [
        'Equatorial Guinea (Guinea Ecuatorial)',
        CountryISO.EquatorialGuinea,
        '240'
    ],
    [
        'Eritrea',
        CountryISO.Eritrea,
        '291'
    ],
    [
        'Estonia (Eesti)',
        CountryISO.Estonia,
        '372'
    ],
    [
        'Ethiopia',
        CountryISO.Ethiopia,
        '251'
    ],
    [
        'Falkland Islands (Islas Malvinas)',
        CountryISO.FalklandIslands,
        '500'
    ],
    [
        'Faroe Islands (Føroyar)',
        CountryISO.FaroeIslands,
        '298'
    ],
    [
        'Fiji',
        CountryISO.Fiji,
        '679'
    ],
    [
        'Finland (Suomi)',
        CountryISO.Finland,
        '358',
        0
    ],
    [
        'France',
        CountryISO.France,
        '33'
    ],
    [
        'French Guiana (Guyane française)',
        CountryISO.FrenchGuiana,
        '594'
    ],
    [
        'French Polynesia (Polynésie française)',
        CountryISO.FrenchPolynesia,
        '689'
    ],
    [
        'Gabon',
        CountryISO.Gabon,
        '241'
    ],
    [
        'Gambia',
        CountryISO.Gambia,
        '220'
    ],
    [
        'Georgia (საქართველო)',
        CountryISO.Georgia,
        '995'
    ],
    [
        'Germany (Deutschland)',
        CountryISO.Germany,
        '49'
    ],
    [
        'Ghana (Gaana)',
        CountryISO.Ghana,
        '233'
    ],
    [
        'Gibraltar',
        CountryISO.Gibraltar,
        '350'
    ],
    [
        'Greece (Ελλάδα)',
        CountryISO.Greece,
        '30'
    ],
    [
        'Greenland (Kalaallit Nunaat)',
        CountryISO.Greenland,
        '299'
    ],
    [
        'Grenada',
        CountryISO.Grenada,
        '1473'
    ],
    [
        'Guadeloupe',
        CountryISO.Guadeloupe,
        '590',
        0
    ],
    [
        'Guam',
        'gu',
        '1',
        1,
        [
            '671',
        ]
    ],
    [
        'Guatemala',
        CountryISO.Guatemala,
        '502'
    ],
    [
        'Guernsey',
        CountryISO.Guernsey,
        '44',
        1,
        [1481]
    ],
    [
        'Guinea (Guinée)',
        CountryISO.Guinea,
        '224'
    ],
    [
        'Guinea-Bissau (Guiné Bissau)',
        CountryISO.GuineaBissau,
        '245'
    ],
    [
        'Guyana',
        CountryISO.Guyana,
        '592'
    ],
    [
        'Haiti',
        CountryISO.Haiti,
        '509'
    ],
    [
        'Honduras',
        CountryISO.Honduras,
        '504'
    ],
    [
        'Hong Kong (香港)',
        CountryISO.HongKong,
        '852'
    ],
    [
        'Hungary (Magyarország)',
        CountryISO.Hungary,
        '36'
    ],
    [
        'Iceland (Ísland)',
        CountryISO.Iceland,
        '354'
    ],
    [
        'India (भारत)',
        CountryISO.India,
        '91'
    ],
    [
        'Indonesia',
        CountryISO.Indonesia,
        '62'
    ],
    [
        'Iran (‫ایران‬‎)',
        CountryISO.Iran,
        '98'
    ],
    [
        'Iraq (‫العراق‬‎)',
        CountryISO.Iraq,
        '964'
    ],
    [
        'Ireland',
        CountryISO.Ireland,
        '353'
    ],
    [
        'Isle of Man',
        CountryISO.IsleOfMan,
        '44',
        2,
        [1624]
    ],
    [
        'Israel (‫ישראל‬‎)',
        CountryISO.Israel,
        '972'
    ],
    [
        'Italy (Italia)',
        CountryISO.Italy,
        '39',
        0
    ],
    [
        'Jamaica',
        'jm',
        '1',
        1,
        [
            '876',
        ]
    ],
    [
        'Japan (日本)',
        CountryISO.Japan,
        '81'
    ],
    [
        'Jersey',
        CountryISO.Jersey,
        '44',
        3,
        [1534]
    ],
    [
        'Jordan (‫الأردن‬‎)',
        CountryISO.Jordan,
        '962'
    ],
    [
        'Kazakhstan (Казахстан)',
        CountryISO.Kazakhstan,
        '7',
        1
    ],
    [
        'Kenya',
        CountryISO.Kenya,
        '254'
    ],
    [
        'Kiribati',
        CountryISO.Kiribati,
        '686'
    ],
    [
        'Kosovo',
        CountryISO.Kosovo,
        '383'
    ],
    [
        'Kuwait (‫الكويت‬‎)',
        CountryISO.Kuwait,
        '965'
    ],
    [
        'Kyrgyzstan (Кыргызстан)',
        CountryISO.Kyrgyzstan,
        '996'
    ],
    [
        'Laos (ລາວ)',
        CountryISO.Laos,
        '856'
    ],
    [
        'Latvia (Latvija)',
        CountryISO.Latvia,
        '371'
    ],
    [
        'Lebanon (‫لبنان‬‎)',
        CountryISO.Lebanon,
        '961'
    ],
    [
        'Lesotho',
        CountryISO.Lesotho,
        '266'
    ],
    [
        'Liberia',
        CountryISO.Liberia,
        '231'
    ],
    [
        'Libya (‫ليبيا‬‎)',
        CountryISO.Libya,
        '218'
    ],
    [
        'Liechtenstein',
        CountryISO.Liechtenstein,
        '423'
    ],
    [
        'Lithuania (Lietuva)',
        CountryISO.Lithuania,
        '370'
    ],
    [
        'Luxembourg',
        CountryISO.Luxembourg,
        '352'
    ],
    [
        'Macau (澳門)',
        CountryISO.Macau,
        '853'
    ],
    [
        'Macedonia (FYROM) (Македонија)',
        CountryISO.Macedonia,
        '389'
    ],
    [
        'Madagascar (Madagasikara)',
        CountryISO.Madagascar,
        '261'
    ],
    [
        'Malawi',
        CountryISO.Malawi,
        '265'
    ],
    [
        'Malaysia',
        CountryISO.Malaysia,
        '60'
    ],
    [
        'Maldives',
        CountryISO.Maldives,
        '960'
    ],
    [
        'Mali',
        CountryISO.Mali,
        '223'
    ],
    [
        'Malta',
        CountryISO.Malta,
        '356'
    ],
    [
        'Marshall Islands',
        CountryISO.MarshallIslands,
        '692'
    ],
    [
        'Martinique',
        CountryISO.Martinique,
        '596'
    ],
    [
        'Mauritania (‫موريتانيا‬‎)',
        CountryISO.Mauritania,
        '222'
    ],
    [
        'Mauritius (Moris)',
        CountryISO.Mauritius,
        '230'
    ],
    [
        'Mayotte',
        CountryISO.Mayotte,
        '262',
        1
    ],
    [
        'Mexico (México)',
        CountryISO.Mexico,
        '52'
    ],
    [
        'Micronesia',
        CountryISO.Micronesia,
        '691'
    ],
    [
        'Moldova (Republica Moldova)',
        CountryISO.Moldova,
        '373'
    ],
    [
        'Monaco',
        CountryISO.Monaco,
        '377'
    ],
    [
        'Mongolia (Монгол)',
        CountryISO.Mongolia,
        '976'
    ],
    [
        'Montenegro (Crna Gora)',
        CountryISO.Montenegro,
        '382'
    ],
    [
        'Montserrat',
        'ms',
        '1',
        1,
        [
            '664',
        ]
    ],
    [
        'Morocco (‫المغرب‬‎)',
        CountryISO.Morocco,
        '212',
        0
    ],
    [
        'Mozambique (Moçambique)',
        CountryISO.Mozambique,
        '258'
    ],
    [
        'Myanmar (Burma) (မြန်မာ)',
        CountryISO.Myanmar,
        '95'
    ],
    [
        'Namibia (Namibië)',
        CountryISO.Namibia,
        '264'
    ],
    [
        'Nauru',
        CountryISO.Nauru,
        '674'
    ],
    [
        'Nepal (नेपाल)',
        CountryISO.Nepal,
        '977'
    ],
    [
        'Netherlands (Nederland)',
        CountryISO.Netherlands,
        '31'
    ],
    [
        'New Caledonia (Nouvelle-Calédonie)',
        CountryISO.NewCaledonia,
        '687'
    ],
    [
        'New Zealand',
        CountryISO.NewZealand,
        '64'
    ],
    [
        'Nicaragua',
        CountryISO.Nicaragua,
        '505'
    ],
    [
        'Niger (Nijar)',
        CountryISO.Niger,
        '227'
    ],
    [
        'Nigeria',
        CountryISO.Nigeria,
        '234'
    ],
    [
        'Niue',
        CountryISO.Niue,
        '683'
    ],
    [
        'Norfolk Island',
        CountryISO.NorfolkIsland,
        '672'
    ],
    [
        'North Korea (조선 민주주의 인민 공화국)',
        CountryISO.NorthKorea,
        '850'
    ],
    [
        'Northern Mariana Islands',
        CountryISO.NorthernMarianaIslands,
        '1670'
    ],
    [
        'Norway (Norge)',
        CountryISO.Norway,
        '47',
        0
    ],
    [
        'Oman (‫عُمان‬‎)',
        CountryISO.Oman,
        '968'
    ],
    [
        'Pakistan (‫پاکستان‬‎)',
        CountryISO.Pakistan,
        '92'
    ],
    [
        'Palau',
        CountryISO.Palau,
        '680'
    ],
    [
        'Palestine (‫فلسطين‬‎)',
        CountryISO.Palestine,
        '970'
    ],
    [
        'Panama (Panamá)',
        CountryISO.Panama,
        '507'
    ],
    [
        'Papua New Guinea',
        CountryISO.PapuaNewGuinea,
        '675'
    ],
    [
        'Paraguay',
        CountryISO.Paraguay,
        '595'
    ],
    [
        'Peru (Perú)',
        CountryISO.Peru,
        '51'
    ],
    [
        'Philippines',
        CountryISO.Philippines,
        '63'
    ],
    [
        'Poland (Polska)',
        CountryISO.Poland,
        '48'
    ],
    [
        'Portugal',
        CountryISO.Portugal,
        '351'
    ],
    [
        'Puerto Rico',
        CountryISO.PuertoRico,
        '1',
        3,
        ['787', '939']
    ],
    [
        'Qatar (‫قطر‬‎)',
        CountryISO.Qatar,
        '974'
    ],
    [
        'Réunion (La Réunion)',
        CountryISO.Réunion,
        '262',
        0
    ],
    [
        'Romania (România)',
        CountryISO.Romania,
        '40'
    ],
    [
        'Russia (Россия)',
        CountryISO.Russia,
        '7',
        0
    ],
    [
        'Rwanda',
        CountryISO.Rwanda,
        '250'
    ],
    [
        'Saint Barthélemy (Saint-Barthélemy)',
        CountryISO.SaintBarthélemy,
        '590',
        1
    ],
    [
        'Saint Helena',
        CountryISO.SaintHelena,
        '290'
    ],
    [
        'Saint Kitts and Nevis',
        CountryISO.SaintKittsAndNevis,
        '1869'
    ],
    [
        'Saint Lucia',
        'lc',
        '1',
        1,
        [
            '758',
        ]
    ],
    [
        'Saint Martin (Saint-Martin (partie française))',
        CountryISO.SaintMartin,
        '590',
        2
    ],
    [
        'Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)',
        CountryISO.SaintPierreAndMiquelon,
        '508'
    ],
    [
        'Saint Vincent and the Grenadines',
        'vc',
        '1',
        1,
        [
            '784',
        ]
    ],
    [
        'Samoa',
        CountryISO.Samoa,
        '685'
    ],
    [
        'San Marino',
        CountryISO.SanMarino,
        '378'
    ],
    [
        'São Tomé and Príncipe (São Tomé e Príncipe)',
        CountryISO.SãoToméAndPríncipe,
        '239'
    ],
    [
        'Saudi Arabia (‫المملكة العربية السعودية‬‎)',
        CountryISO.SaudiArabia,
        '966'
    ],
    [
        'Senegal (Sénégal)',
        CountryISO.Senegal,
        '221'
    ],
    [
        'Serbia (Србија)',
        CountryISO.Serbia,
        '381'
    ],
    [
        'Seychelles',
        CountryISO.Seychelles,
        '248'
    ],
    [
        'Sierra Leone',
        CountryISO.SierraLeone,
        '232'
    ],
    [
        'Singapore',
        CountryISO.Singapore,
        '65'
    ],
    [
        'Sint Maarten',
        'sx',
        '1',
        1,
        [
            '721',
        ]
    ],
    [
        'Slovakia (Slovensko)',
        CountryISO.Slovakia,
        '421'
    ],
    [
        'Slovenia (Slovenija)',
        CountryISO.Slovenia,
        '386'
    ],
    [
        'Solomon Islands',
        CountryISO.SolomonIslands,
        '677'
    ],
    [
        'Somalia (Soomaaliya)',
        CountryISO.Somalia,
        '252'
    ],
    [
        'South Africa',
        CountryISO.SouthAfrica,
        '27'
    ],
    [
        'South Korea (대한민국)',
        CountryISO.SouthKorea,
        '82'
    ],
    [
        'South Sudan (‫جنوب السودان‬‎)',
        CountryISO.SouthSudan,
        '211'
    ],
    [
        'Spain (España)',
        CountryISO.Spain,
        '34'
    ],
    [
        'Sri Lanka (ශ්‍රී ලංකාව)',
        CountryISO.SriLanka,
        '94'
    ],
    [
        'Sudan (‫السودان‬‎)',
        CountryISO.Sudan,
        '249'
    ],
    [
        'Suriname',
        CountryISO.Suriname,
        '597'
    ],
    [
        'Svalbard and Jan Mayen',
        CountryISO.SvalbardAndJanMayen,
        '47',
        1
    ],
    [
        'Swaziland',
        CountryISO.Swaziland,
        '268'
    ],
    [
        'Sweden (Sverige)',
        CountryISO.Sweden,
        '46'
    ],
    [
        'Switzerland (Schweiz)',
        CountryISO.Switzerland,
        '41'
    ],
    [
        'Syria (‫سوريا‬‎)',
        CountryISO.Syria,
        '963'
    ],
    [
        'Taiwan (台灣)',
        CountryISO.Taiwan,
        '886'
    ],
    [
        'Tajikistan',
        CountryISO.Tajikistan,
        '992'
    ],
    [
        'Tanzania',
        CountryISO.Tanzania,
        '255'
    ],
    [
        'Thailand (ไทย)',
        CountryISO.Thailand,
        '66'
    ],
    [
        'Timor-Leste',
        CountryISO.TimorLeste,
        '670'
    ],
    [
        'Togo',
        CountryISO.Togo,
        '228'
    ],
    [
        'Tokelau',
        CountryISO.Tokelau,
        '690'
    ],
    [
        'Tonga',
        CountryISO.Tonga,
        '676'
    ],
    [
        'Trinidad and Tobago',
        'tt',
        '1',
        1,
        [
            '868',
        ]
    ],
    [
        'Tunisia (‫تونس‬‎)',
        CountryISO.Tunisia,
        '216'
    ],
    [
        'Turkey (Türkiye)',
        CountryISO.Turkey,
        '90'
    ],
    [
        'Turkmenistan',
        CountryISO.Turkmenistan,
        '993'
    ],
    [
        'Turks and Caicos Islands',
        CountryISO.TurksAndCaicosIslands,
        '1649'
    ],
    [
        'Tuvalu',
        CountryISO.Tuvalu,
        '688'
    ],
    [
        'U.S. Virgin Islands',
        'vi',
        '1',
        1,
        [
            '340',
        ]
    ],
    [
        'Uganda',
        CountryISO.Uganda,
        '256'
    ],
    [
        'Ukraine (Україна)',
        CountryISO.Ukraine,
        '380'
    ],
    [
        'United Arab Emirates (‫الإمارات العربية المتحدة‬‎)',
        CountryISO.UnitedArabEmirates,
        '971'
    ],
    [
        'United Kingdom',
        CountryISO.UnitedKingdom,
        '44',
        0
    ],
    [
        'United States',
        CountryISO.UnitedStates,
        '1',
        0
    ],
    [
        'Uruguay',
        CountryISO.Uruguay,
        '598'
    ],
    [
        'Uzbekistan (Oʻzbekiston)',
        CountryISO.Uzbekistan,
        '998'
    ],
    [
        'Vanuatu',
        CountryISO.Vanuatu,
        '678'
    ],
    [
        'Vatican City (Città del Vaticano)',
        CountryISO.VaticanCity,
        '39',
        1
    ],
    [
        'Venezuela',
        CountryISO.Venezuela,
        '58'
    ],
    [
        'Vietnam (Việt Nam)',
        CountryISO.Vietnam,
        '84'
    ],
    [
        'Wallis and Futuna',
        CountryISO.WallisAndFutuna,
        '681'
    ],
    [
        'Western Sahara (‫الصحراء الغربية‬‎)',
        CountryISO.WesternSahara,
        '212',
        1
    ],
    [
        'Yemen (‫اليمن‬‎)',
        CountryISO.Yemen,
        '967'
    ],
    [
        'Zambia',
        CountryISO.Zambia,
        '260'
    ],
    [
        'Zimbabwe',
        CountryISO.Zimbabwe,
        '263'
    ],
    [
        'Åland Islands',
        CountryISO.ÅlandIslands,
        '358',
        1
    ]
];

class LocalPhoneUtils {
    /**
     * Returns parse PhoneNumber object.
     * @param phoneNumber string
     * @param regionCode string
     */
    static getParsedNumber(phoneNumber = '', regionCode = '') {
        if (!phoneNumber || !regionCode)
            return new PhoneNumber();
        try {
            return lpn.PhoneNumberUtil.getInstance().parse(phoneNumber, regionCode.toUpperCase());
        }
        catch (e) {
            return new PhoneNumber();
        }
    }
    /**
     * Return a ChangeData object initialized with a phone number
     * @param phoneNumber
     */
    static getChangeData(phoneNumber) {
        return new ChangeData(!phoneNumber ? new PhoneNumber() : lpn.PhoneNumberUtil.getInstance().parse(phoneNumber));
    }
    /**
     * Gets formatted example phone number from phoneUtil.
     * @param numberFormat
     * @param countryCode
     */
    static getPhoneNumberPlaceHolder(numberFormat, countryCode) {
        const phoneUtil = lpn.PhoneNumberUtil.getInstance();
        return phoneUtil.format(phoneUtil.getExampleNumber(countryCode), numberFormat);
    }
    /**
     * Sifts through all countries and returns iso code of the primary country
     * based on the number provided.
     * @param number PhoneNumber
     * @param countryCode country code in number format
     */
    static getCountryIsoCode(number, countryCode) {
        if (!countryCode)
            return;
        // Will use this to match area code from the first numbers
        // @ts-ignore
        const rawNumber = number['values_']['2'].toString();
        // List of all countries with countryCode (can be more than one. e.x. US, CA, DO, PR all have +1 countryCode)
        const countriesFiltered = ALL_COUNTRIES.filter((c) => c[2].toString() === countryCode.toString());
        // Main country is the country, which has no areaCodes specified in country-code.ts file.
        const mainCountry = countriesFiltered.find((c) => c[4] === undefined);
        // Secondary countries are all countries, which have areaCodes specified in country-code.ts file.
        const secondaryCountries = countriesFiltered.filter((c) => c[4] !== undefined);
        let matchedCountry = mainCountry ? mainCountry[1].toString() : undefined;
        /*
          Iterate over each secondary country and check if nationalNumber starts with any of areaCodes available.
          If no matches found, fallback to the main country.
        */
        secondaryCountries.forEach((country) => {
            // @ts-ignore
            country[4].forEach((areaCode) => {
                if (rawNumber.startsWith(areaCode))
                    matchedCountry = country[1].toString();
            });
        });
        return matchedCountry;
    }
}

/**
 * Check if the phone number provide is in a valid format compare to the country selected
 * If not, an error is pushed to the FormControl: { invalidFormat: true }
 * It can be catched in the parent form to display a user error
 * @param control
 */
const phoneNumberValidator = (control) => {
    if (!control.value)
        return;
    // @ts-ignore
    // Native element property is added with NativeElementInjectorDirective
    const el = control['nativeElement'];
    const inputBox = el?.querySelector('input[type="tel"]') || undefined;
    if (inputBox) {
        const isCheckValidation = !!inputBox.getAttribute('validation');
        if (!isCheckValidation)
            control.clearValidators();
        const phoneUtil = lpn.PhoneNumberUtil.getInstance();
        const phoneNumber = phoneUtil.parse(control.value);
        const phoneFormatted = new ChangeData(!control.value ? new PhoneNumber() : phoneNumber);
        const number = phoneUtil.parse(phoneFormatted.number, LocalPhoneUtils.getCountryIsoCode(phoneNumber, phoneNumber?.getCountryCode()));
        if (!phoneUtil.isValidNumberForRegion(number, phoneFormatted.countryCode))
            return { invalidFormat: true };
    }
    return;
};

class DialCodePipe {
    transform(dialoCode) {
        if (!dialoCode)
            return '';
        return `+${dialoCode}`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: DialCodePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.2.0", ngImport: i0, type: DialCodePipe, isStandalone: true, name: "dialCode" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: DialCodePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'dialCode',
                    standalone: true
                }]
        }] });

class FavoriteElementInjectorDirective {
    el;
    constructor(el) {
        this.el = el;
    }
    ngOnInit() {
        if (this.el.nativeElement.classList.contains('favorite')) {
            this.el.nativeElement.parentNode.parentNode.classList.add('favoriteItem');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: FavoriteElementInjectorDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.0", type: FavoriteElementInjectorDirective, isStandalone: true, selector: "[favorite]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: FavoriteElementInjectorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[favorite]',
                    standalone: true
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }] });

/*
"Property 'nativeElement' does not exist on type 'FormControl'".
'NativeElementInjectorDirective' injects nativeElement to each control,
so we can access it from inside validator for example.
More about this approach and reasons for this:
https://github.com/angular/angular/issues/18025
https://stackoverflow.com/a/54075119/1617590
*/
class NativeElementInjectorDirective {
    controlDir;
    host;
    constructor(controlDir, host) {
        this.controlDir = controlDir;
        this.host = host;
    }
    ngOnInit() {
        //@ts-ignore
        if (this.controlDir.control)
            this.controlDir.control['nativeElement'] = this.host.nativeElement;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: NativeElementInjectorDirective, deps: [{ token: i4.NgControl }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.0", type: NativeElementInjectorDirective, isStandalone: true, selector: "[ngModel], [formControl], [formControlName]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: NativeElementInjectorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngModel], [formControl], [formControlName]',
                    standalone: true
                }]
        }], ctorParameters: () => [{ type: i4.NgControl }, { type: i0.ElementRef }] });

class FilterPipe {
    transform(items, field, value) {
        if (!items)
            return [];
        // @ts-ignore
        return items.filter((item) => item[field] === value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: FilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.2.0", ngImport: i0, type: FilterPipe, isStandalone: true, name: "filter" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: FilterPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'filter',
                    standalone: true
                }]
        }] });

class IntlInputTelComponent {
    // Custom css classes
    cssClass = 'form-control';
    favoriteCountries = [];
    // User option to display only some countries
    onlyCountries = [];
    // If true, the country will be set automatically if the user fill the region code
    enableAutoCountrySelect = true;
    displayPlaceholder = true;
    customPlaceholder;
    numberFormat = PhoneNumberFormat.INTERNATIONAL;
    // Flag to display or not the input search for countries
    displaySearchCountry = true;
    // Search country property
    searchCountryField = [SearchCountryField.NAME];
    searchCountryPlaceholder = 'Search Country';
    maxLength;
    // User option to select by default the first item of the list, default true
    selectFirstCountry = true;
    // Allow or not the phone validation form
    phoneValidation = true;
    // Customize the input id
    inputId = 'phone';
    selectedCountryISO;
    separateDialCode = false;
    // Set the language for search and display name country
    lang = 'fr';
    appendTo = input(null);
    set disabled(value) {
        this.setDisabledState(value);
    }
    countryChange = new EventEmitter();
    SearchCountryField = SearchCountryField;
    phoneUtil = lpn.PhoneNumberUtil.getInstance();
    selectedCountry = signal(new Country());
    countries = [];
    phoneNumber$ = new BehaviorSubject(new PhoneNumber);
    phoneNumberControl = new FormControl('');
    onTouched = () => {
    };
    propagateChange = (_) => {
    };
    get favorites() {
        return this.countries.filter(c => c.isFavorite);
    }
    constructor() {
        this.phoneNumberControl.valueChanges.subscribe(value => {
            this.onPhoneNumberChange(value);
        });
        this.phoneNumber$.subscribe((phoneNumber) => {
            this.propagateChange(this.phoneUtil.format(phoneNumber, PhoneNumberFormat.INTERNATIONAL));
        });
    }
    ngOnChanges(changes) {
        if (this.isSelectedCountryChanged(changes['selectedCountryISO']) && !changes['selectedCountryISO'].firstChange)
            this.updateSelectedCountry();
        if (changes['favoriteCountries'] && !changes['favoriteCountries'].firstChange)
            this.onFavoriteCountriesChanged();
    }
    init() {
        this.fetchCountryData();
        if (this.onlyCountries.length)
            this.countries = this.countries.filter((c) => this.onlyCountries.includes(c.iso2));
        this.updateSelectedCountry();
    }
    /* --------------------------------- Events management -------------------------------- */
    onPhoneNumberChange(value) {
        const currentCountryCode = this.selectedCountry().iso2;
        const number = LocalPhoneUtils.getParsedNumber(value, currentCountryCode);
        // Auto select country based on the extension (and areaCode if needed) (e.g select Canada if number starts with +1 416)
        if (this.enableAutoCountrySelect) {
            const countryCode = LocalPhoneUtils.getCountryIsoCode(number, number?.getCountryCode()) || currentCountryCode;
            if (countryCode && countryCode !== this.selectedCountry().iso2) {
                const newCountry = this.countries
                    .sort((a, b) => a.priority - b.priority)
                    .find((c) => c.iso2 === countryCode);
                if (newCountry)
                    this.setSelectedCountry(newCountry);
            }
        }
        this.phoneNumber$.next(number);
    }
    onCountrySelect(country, el) {
        let number = new PhoneNumber();
        if (country !== this.selectedCountry())
            this.setSelectedCountry(country);
        const currentValue = this.phoneNumberControl.value;
        if (currentValue)
            number = LocalPhoneUtils.getParsedNumber(currentValue, this.selectedCountry().iso2);
        this.phoneNumber$.next(number);
        setTimeout(() => el?.focus(), 100);
    }
    onFavoriteCountriesChanged() {
        this.fetchCountryData();
        this.onCountrySelect(this.selectedCountry());
    }
    onInputKeyPress(event) {
        const allowedChars = /[0-9\+\-\(\)\ ]/;
        const allowedCtrlChars = /[axcv]/; // Allows copy-pasting
        const allowedOtherKeys = [
            'ArrowLeft',
            'ArrowUp',
            'ArrowRight',
            'ArrowDown',
            'Home',
            'End',
            'Insert',
            'Delete',
            'Backspace',
            'Tab'
        ];
        if (!allowedChars.test(event.key)
            && !(event.ctrlKey && allowedCtrlChars.test(event.key))
            && !allowedOtherKeys.includes(event.key))
            event.preventDefault();
    }
    /* --------------------------------- Overwrite NG_VALUE_ACCESSOR -------------------------------- */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        isDisabled ? this.phoneNumberControl.disable() : this.phoneNumberControl.enable();
    }
    writeValue(obj) {
        this.init();
        const phoneNumber = LocalPhoneUtils.getChangeData(obj);
        this.setSelectedCountry(this.countries.find(c => c.iso2.toUpperCase() === phoneNumber.countryCode));
        this.phoneNumberControl.setValue(phoneNumber.number || '');
    }
    /* --------------------------------- Helpers -------------------------------- */
    fetchCountryData() {
        const regionsNames = new Intl.DisplayNames([this.lang], {
            type: 'region',
        });
        this.countries = ALL_COUNTRIES.map(country => ({
            name: regionsNames.of(country[1].toString()?.toUpperCase()) || '',
            iso2: country[1].toString(),
            dialCode: country[2].toString(),
            priority: +country[3] || 0,
            areaCodes: country[4] || undefined,
            htmlId: `item-${country[1].toString()}`,
            flagClass: `iti__flag iti__${country[1].toString().toLocaleLowerCase()}`,
            placeHolder: this.getPlaceholder(country[1].toString().toUpperCase()),
            isFavorite: this.favoriteCountries.includes(country[1].toString())
        })).sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));
        if (this.selectFirstCountry) {
            const country = this.favoriteCountries.length ? this.favorites[0] : this.countries[0];
            this.setSelectedCountry(country);
        }
    }
    /**
     * Updates selectedCountry.
     */
    updateSelectedCountry() {
        if (!this.selectedCountryISO)
            return;
        const countrySelected = this.countries.find((c) => c.iso2.toLowerCase() === this.selectedCountryISO.toLowerCase());
        this.setSelectedCountry(countrySelected);
    }
    setSelectedCountry(country) {
        if (!country)
            return;
        this.selectedCountry.set(country);
        this.countryChange.emit(country);
    }
    isSelectedCountryChanged(selectedISO) {
        return this.countries && selectedISO && selectedISO.currentValue !== selectedISO.previousValue;
    }
    getPlaceholder(countryCode) {
        if (!this.displayPlaceholder)
            return '';
        if (this.customPlaceholder)
            return this.customPlaceholder;
        const placeholder = LocalPhoneUtils.getPhoneNumberPlaceHolder(this.numberFormat, countryCode);
        if (this.separateDialCode && this.numberFormat === PhoneNumberFormat.INTERNATIONAL)
            return LocalPhoneUtils.getChangeData(placeholder).number || '';
        return placeholder;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: IntlInputTelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.0", type: IntlInputTelComponent, isStandalone: true, selector: "p-intl-tel-input", inputs: { cssClass: { classPropertyName: "cssClass", publicName: "cssClass", isSignal: false, isRequired: false, transformFunction: null }, favoriteCountries: { classPropertyName: "favoriteCountries", publicName: "favoriteCountries", isSignal: false, isRequired: false, transformFunction: null }, onlyCountries: { classPropertyName: "onlyCountries", publicName: "onlyCountries", isSignal: false, isRequired: false, transformFunction: null }, enableAutoCountrySelect: { classPropertyName: "enableAutoCountrySelect", publicName: "enableAutoCountrySelect", isSignal: false, isRequired: false, transformFunction: null }, displayPlaceholder: { classPropertyName: "displayPlaceholder", publicName: "displayPlaceholder", isSignal: false, isRequired: false, transformFunction: null }, customPlaceholder: { classPropertyName: "customPlaceholder", publicName: "customPlaceholder", isSignal: false, isRequired: false, transformFunction: null }, numberFormat: { classPropertyName: "numberFormat", publicName: "numberFormat", isSignal: false, isRequired: false, transformFunction: null }, displaySearchCountry: { classPropertyName: "displaySearchCountry", publicName: "displaySearchCountry", isSignal: false, isRequired: false, transformFunction: null }, searchCountryField: { classPropertyName: "searchCountryField", publicName: "searchCountryField", isSignal: false, isRequired: false, transformFunction: null }, searchCountryPlaceholder: { classPropertyName: "searchCountryPlaceholder", publicName: "searchCountryPlaceholder", isSignal: false, isRequired: false, transformFunction: null }, maxLength: { classPropertyName: "maxLength", publicName: "maxLength", isSignal: false, isRequired: false, transformFunction: null }, selectFirstCountry: { classPropertyName: "selectFirstCountry", publicName: "selectFirstCountry", isSignal: false, isRequired: false, transformFunction: null }, phoneValidation: { classPropertyName: "phoneValidation", publicName: "phoneValidation", isSignal: false, isRequired: false, transformFunction: null }, inputId: { classPropertyName: "inputId", publicName: "inputId", isSignal: false, isRequired: false, transformFunction: null }, selectedCountryISO: { classPropertyName: "selectedCountryISO", publicName: "selectedCountryISO", isSignal: false, isRequired: false, transformFunction: null }, separateDialCode: { classPropertyName: "separateDialCode", publicName: "separateDialCode", isSignal: false, isRequired: false, transformFunction: null }, lang: { classPropertyName: "lang", publicName: "lang", isSignal: false, isRequired: false, transformFunction: null }, appendTo: { classPropertyName: "appendTo", publicName: "appendTo", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: false, isRequired: false, transformFunction: null } }, outputs: { countryChange: "countryChange" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => IntlInputTelComponent),
                multi: true,
            },
            {
                provide: NG_VALIDATORS,
                useValue: phoneNumberValidator,
                multi: true,
            },
        ], usesOnChanges: true, ngImport: i0, template: "<div class=\"p-inputgroup\">\n    <p-dropdown class=\"p-inputgroup-addon\" [options]=\"countries\" [filter]=\"true\" [filterFields]=\"searchCountryField\" [resetFilterOnHide]=\"true\"\n                [disabled]=\"phoneNumberControl.disabled\" panelStyleClass=\"fixWidth\" [class.withoutDialCode]=\"!separateDialCode\"\n                [ngModel]=\"selectedCountry()\" (onChange)=\"onCountrySelect($event.value, input)\"\n                [appendTo]=\"appendTo()\">\n        <ng-template pTemplate=\"selectedItem\">\n            <div class=\"flex align-items-center gap-2\">\n                <div id=\"flag\" [class]=\"selectedCountry().flagClass\"></div>\n                @if (separateDialCode) {\n                    <span id=\"dialcode\" class=\"ms-2\">{{ selectedCountry().dialCode | dialCode }}</span>\n                }\n            </div>\n        </ng-template>\n\n        <ng-template let-country pTemplate=\"item\" class=\"test\">\n            <div class=\"flex align-items-center gap-2 w-full\" [class.favorite]=\"country.isFavorite\" favorite>\n                <div [class]=\"country.flagClass\"></div>\n                <span>{{ country.name }}</span>\n                <span>{{ country.dialCode | dialCode }}</span>\n            </div>\n        </ng-template>\n    </p-dropdown>\n\n    <input pInputText #input class=\"form-control\" type=\"tel\" [id]=\"inputId\" autocomplete=\"off\" (blur)=\"onTouched()\"\n           [placeholder]=\"this.selectedCountry().placeHolder\" [formControl]=\"phoneNumberControl\" (keydown)=\"onInputKeyPress($event)\"\n           [attr.maxLength]=\"maxLength\" [attr.validation]=\"phoneValidation\">\n</div>\n", dependencies: [{ kind: "ngmodule", type: DropdownModule }, { kind: "component", type: i1.Dropdown, selector: "p-dropdown", inputs: ["id", "scrollHeight", "filter", "name", "style", "panelStyle", "styleClass", "panelStyleClass", "readonly", "required", "editable", "appendTo", "tabindex", "placeholder", "loadingIcon", "filterPlaceholder", "filterLocale", "variant", "inputId", "dataKey", "filterBy", "filterFields", "autofocus", "resetFilterOnHide", "checkmark", "dropdownIcon", "loading", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "autoDisplayFirst", "group", "showClear", "emptyFilterMessage", "emptyMessage", "lazy", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "overlayOptions", "ariaFilterLabel", "ariaLabel", "ariaLabelledBy", "filterMatchMode", "maxlength", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "focusOnHover", "selectOnFocus", "autoOptionFocus", "autofocusFilter", "disabled", "itemSize", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "filterValue", "options"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide", "onClear", "onLazyLoad"] }, { kind: "directive", type: i2.PrimeTemplate, selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "ngmodule", type: InputTextModule }, { kind: "directive", type: i3.InputText, selector: "[pInputText]", inputs: ["variant"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: DialCodePipe, name: "dialCode" }, { kind: "directive", type: FavoriteElementInjectorDirective, selector: "[favorite]" }, { kind: "directive", type: NativeElementInjectorDirective, selector: "[ngModel], [formControl], [formControlName]" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: IntlInputTelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'p-intl-tel-input', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => IntlInputTelComponent),
                            multi: true,
                        },
                        {
                            provide: NG_VALIDATORS,
                            useValue: phoneNumberValidator,
                            multi: true,
                        },
                    ], standalone: true, imports: [DropdownModule, InputTextModule, FormsModule, ReactiveFormsModule, DialCodePipe, FilterPipe,
                        FavoriteElementInjectorDirective, NativeElementInjectorDirective], template: "<div class=\"p-inputgroup\">\n    <p-dropdown class=\"p-inputgroup-addon\" [options]=\"countries\" [filter]=\"true\" [filterFields]=\"searchCountryField\" [resetFilterOnHide]=\"true\"\n                [disabled]=\"phoneNumberControl.disabled\" panelStyleClass=\"fixWidth\" [class.withoutDialCode]=\"!separateDialCode\"\n                [ngModel]=\"selectedCountry()\" (onChange)=\"onCountrySelect($event.value, input)\"\n                [appendTo]=\"appendTo()\">\n        <ng-template pTemplate=\"selectedItem\">\n            <div class=\"flex align-items-center gap-2\">\n                <div id=\"flag\" [class]=\"selectedCountry().flagClass\"></div>\n                @if (separateDialCode) {\n                    <span id=\"dialcode\" class=\"ms-2\">{{ selectedCountry().dialCode | dialCode }}</span>\n                }\n            </div>\n        </ng-template>\n\n        <ng-template let-country pTemplate=\"item\" class=\"test\">\n            <div class=\"flex align-items-center gap-2 w-full\" [class.favorite]=\"country.isFavorite\" favorite>\n                <div [class]=\"country.flagClass\"></div>\n                <span>{{ country.name }}</span>\n                <span>{{ country.dialCode | dialCode }}</span>\n            </div>\n        </ng-template>\n    </p-dropdown>\n\n    <input pInputText #input class=\"form-control\" type=\"tel\" [id]=\"inputId\" autocomplete=\"off\" (blur)=\"onTouched()\"\n           [placeholder]=\"this.selectedCountry().placeHolder\" [formControl]=\"phoneNumberControl\" (keydown)=\"onInputKeyPress($event)\"\n           [attr.maxLength]=\"maxLength\" [attr.validation]=\"phoneValidation\">\n</div>\n" }]
        }], ctorParameters: () => [], propDecorators: { cssClass: [{
                type: Input
            }], favoriteCountries: [{
                type: Input
            }], onlyCountries: [{
                type: Input
            }], enableAutoCountrySelect: [{
                type: Input
            }], displayPlaceholder: [{
                type: Input
            }], customPlaceholder: [{
                type: Input
            }], numberFormat: [{
                type: Input
            }], displaySearchCountry: [{
                type: Input
            }], searchCountryField: [{
                type: Input
            }], searchCountryPlaceholder: [{
                type: Input
            }], maxLength: [{
                type: Input
            }], selectFirstCountry: [{
                type: Input
            }], phoneValidation: [{
                type: Input
            }], inputId: [{
                type: Input
            }], selectedCountryISO: [{
                type: Input
            }], separateDialCode: [{
                type: Input
            }], lang: [{
                type: Input
            }], disabled: [{
                type: Input
            }], countryChange: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { ChangeData, CountryISO, FavoriteElementInjectorDirective, IntlInputTelComponent, LocalPhoneUtils, NativeElementInjectorDirective, SearchCountryField };
//# sourceMappingURL=p-intl-input-tel.mjs.map
