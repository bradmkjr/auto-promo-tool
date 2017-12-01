const Twit = require('twit');

const T = new Twit( {
  consumer_key: process.env.twitter_consumer_key,
  consumer_secret: process.env.twitter_consumer_secret,
  access_token: process.env.twitter_access_token,
  access_token_secret: process.env.twitter_access_token_secret
} );

// default age for active cache entries
const cacheLifetime = '128 hours';

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

client.connect(function(err, res){ });

var accounts = ["djkingassassin", "Warx2TheMovie", "CordeiroRick", "zbleumoon", "bynsny", "MonsterFunder", "rowdytukgoon", "jstorres", "GNews_Center", "EarthPixDaiIy", "BenWilliam1989", "williamtincup", "DanHogman", "crowdfundcash", "_Meekalina", "GoalsOnTrack", "Moosetheprince", "adi_yeezy", "ZOMBIEWASHOTGUN", "985TheMixFM", "ashleygene89", "sharker102s", "GeorgeHatcher", "stanfossum", "mtjsblog", "APBsayin", "ShaneDWalters", "MHawkProduction", "MarkBird17", "BackThePolice", "SLPierce57", "ChrisRCason", "EdaraBabyG", "DigitalDripped", "LifeExtension", "DraftDiamonds", "MonsterFunders", "fastretweet_sa", "emitoms", "AvilaVIP", "ltsquotestumblr", "Explorevscos", "DrBrianKiczek", "sayingperfact", "Scaler17", "NancyRichmond", "LetzKeepItReal", "FundingExperts", "DMashak", "TheMindsConsole", "EBaySurfer", "LifeboatHQ", "Mountsplus", "EdPerezLive", "YoungJHollyWood", "SurvivalPulse", "yeezy_jordan", "Best_Food_Porn", "itslovefeeling", "W_Angels_Wings", "ToLearnHistory", "IndustriSurplus", "Ravious101", "SpaceEnquiry", "SimonCocking", "audiboyg5", "bestspuppy", "DietShop", "CHAMPl0NSLEAGUE", "MrTerrellHarris", "Mindustry_PR", "PyramidsOnMars_", "HungryTruckerAB", "DennisCardiff", "LauVanni", "Manhattanpeachy", "JOKERS_WILD_JJ", "LeadersBest", "gettingbalance", "mayhemstudios", "BusuyiGuitar", "TeamTrumpAZ", "joeygiggles", "AMike4761", "LynnConnor45", "AmyJRomine", "Alberthexa_", "awakeatlastrock", "cyberceas", "AAA_Stripe_Pro", "RoxanneBarbour", "2nd_To_None", "Pat_Lorna", "ConserValidity", "ImBRightTho", "LimitedCards", "Necole_Monroe", "pmatas", "FamousTruth", "RoseBartu", "livepositive11", "logosporns", "rapgamejordan", "itsFoodporns", "PaxVillageVoice", "TravelFor_food", "FreddieSirmans", "ThaRealMikeFeez", "Airohub", "iOgrapher", "LaydenRobinson", "MySocialPoint", "WritingSpecial", "ScrollsawArt", "Lov3Lov3rz", "iLoveCSTAX", "EdmEternal", "GallagherAuthor", "SarahJunner", "denverpokerdude", "barriebriggs", "R47R", "eric_kavanagh", "beautiesofarts", "LarryOzAuthor", "foodsfact", "LaughterRide", "Neilsonagain", "hiptronicmag", "MarionFiedlerTN", "bdmowell", "filmystic", "NYGPROMOZ", "HOUSEHOLDSTRESS", "Kaitwrites", "RhondaSasser", "RealMuckmaker", "_LILYOTE", "LavanaYoken", "hiphopoverload1", "VinylFresh", "YourNikt", "EricDavisW", "DinamicoPromo", "KristaNeher", "PublicistAgent2", "JimmyLevyMusic", "sixsoundmagazin", "JakeHargisBooks", "amazonfashion_", "thetypicalchick", "footballrs", "JackRatchet", "CupAttic", "puntanious", "itsworldbeauty", "lavishstuff", "DjJWattsLive", "shane_bruwer", "jackbgoode1", "6hoursleep", "RadioSucksMag", "beer47", "baefeeling_", "CollageBabe", "Numerology2016", "Relatablefoods", "chrisgoagency", "YoungDieselBBM", "bitxhless", "WeLov3Lov3rz", "Itstheclothporn", "lizords", "LowkeyLaw", "StudentRushNYC", "PNBurrows", "Lov3rzLov3U", "StrangeFunnies", "1037HNSradio", "jontsai", "africaupdates", "greatman0008", "CZSharon", "Funny_n_Serious", "tuneofthedayca", "riteshmm60", "CouponistaQueen", "PrellWHO", "OJoeUSA", "ImraanGill", "TOLuxurySuites", "unique_twets", "muleties", "muckrack", "PeaceZicklin", "Arysandys", "UCStrategies", "CarsADICTS", "freekidbooks", "NorthLLC", "Trivelle905", "sunsetcolour", "TomFlowers", "learningquotes_", "RebeccaRennerFL", "Sarobi", "DiffuserFM", "AestheticClips_", "CStoreNews_", "Video_Promoter", "BeerRightNowIND", "C0MEDYVINES", "charlescmarquez", "Har_vey007", "MyriamSelbig", "omartiz", "CharlesTersolo", "Mike_Press19", "HendrixDesign", "motivationlive", "tweetlrk", "OfficialJrichol", "bearded_boys", "sprtcrdlui", "PaulaSheets24", "48Laws757", "agreencleveland", "SteveO_Writer", "alonshalevsf", "troycap", "incomeincubator", "BucklesandBulls", "YouBrandInc", "MikeCookAuthor", "JDRichards0322", "verna_water", "CapertonFineArt", "itsw0wfacts", "_friend4ever", "Sunni_Tzu", "silversdave", "pulsedaniel", "thegoagency", "BecomeACeleb", "OuvrezLeChien", "Brar_Parkash", "jvdwl", "KrystenBachler", "skip_conover", "ItsDressing", "AwwOutfit", "TheMysteryLadie", "facpronline", "c_vongunten", "Motobec810", "ahoychrispineda", "hairhuck", "OverseerLewis", "mysimplymary", "MrNaassir", "DivasOn24", "MimiMemeMeLOL", "Totalradionet", "laviecockatoo", "lindeeloo1956", "bchtravel", "FanYourFlame", "FrugalBookPromo", "instudioEphoto", "Theflowerworld3", "KyiranFamous", "badgirl_loony", "kurtwvs", "DallasRemington", "PainfulPunz", "2A_MAG", "Paksalah", "MarvinStone", "RetiredTeacherD", "Jixavision", "VCRebecca", "MusicPRclub", "absolutelypsych", "DJSAppcenter", "WorldMktng", "FriedrickRyan", "NBAInside_Stuff", "EnchantmentLL", "LennyToSaucy_", "SVNPOFoundation", "GayRepublicSwag", "IranPlus", "AcesEbooks", "IamDV_Official", "shonelledouglas", "marrymarr10", "RZPromotions1", "BrendanWitcher", "FairTaxOfficial", "heykim", "Marty_Aftewicz", "CityCadillac", "Smoovee_DJayy", "FeelingHacks", "YARAHAMEDD", "StarCavalli", "rosalieinc", "SportsTalkLine", "Alex_Carrick", "navarrofrank11", "SatyayInfotech", "twodriftersxo", "SmokHaus6", "815wrldtrvlr", "protoninfo", "friendstegram", "SteveMotley", "S__a__212", "5thdimdreamz", "PopHaydn", "MichaelKNeeley", "CathyTurneyLafs", "ThriftNFlip", "Nascar_Tom", "GamingWScott", "LesliePivin", "Indo_Art_House", "ERamich411", "MBAbstract", "EnvironThreads", "Emalfarb", "thebethogden", "ChrisWeissCT", "DavidClinchNews", "powerhoster", "BeyondMorale", "CAT1PRO", "IAMYOUNGCHITOWN", "msmitchell357", "itshoosierdaddy", "Indigo_Adults", "pre_desire", "almaghribtoday", "GlobalFMA", "dynamixreel", "MySkyroam", "dalegriffen", "Annimallover", "Dysrupted", "m7i45", "MrsAndiLutz", "TVRadioDoc", "P_Davinci", "Jordan__French", "HeidiHmoretti", "Jim_Peoples_", "fellingsads", "Neckillusions", "TheFoodPorning", "hiphopgrindtv", "bianccogroup", "John__Black", "ARedPillReport", "fooddealsno1", "Temoge", "marketingdoctor", "SwaggerjackProd", "Omganimaldog", "GoSocialAcademy", "BestDealAirline", "MoneyMarkDiggla", "prepperbooks", "tinieblasswat", "IndustriNorge", "BernedSt", "abwmcertified", "accesssonora", "HotelsAvailable", "DUNKNOWN1", "DavidKamatoy", "AZmazo_Reed", "ToddGetts", "lord_thc", "lihua08", "realcomedyyy", "nightlovers0", "ScarlettScotlan", "gregkihn", "NorthVibess", "kreaturebt", "bradhanks", "StrengthStack52", "GordWeisflock", "activprayer", "designnominees", "EvilDeadNews", "monkeys_robots", "C_E_Lawrence", "fastmetrics1", "cynicalhumor", "GloriaDarni", "yaromancebooks", "johnrutledge", "labrador_do", "itstravelscen", "kylewalz", "Snikk", "upternative", "CarleeElia", "deathbyhibachi", "FadedIndustry", "Anandks123", "dude_fm", "Tiffany_Norris7", "Terpstir", "daSportsCommish", "lovelypet12", "thedopestsounds", "JudyNetworks", "DilTown", "NASCARRacingCo", "marksmithvr", "fuckumalibu", "KardashTruths", "kevinmartinblog", "FastLeaderShow", "SonyaSone7", "HhgtvFitness", "meomine09", "scifibooks33", "dubvLIVE", "maak224", "GrassRootRevolt", "Only_advanture", "CathyScott", "textycafe", "KidsDealsNo1", "LaceyRamot", "syntecgroup", "PrepperSilver", "BublishMe", "SlideBotIO", "itsamericancat", "Joseph_Santoro", "newsography1", "watchnews_nawcc", "JustinaHadnott", "RabbitRayy", "Cross_Genre", "monitoringhub", "BabyAnimalPost_", "CeciliaGunadia", "ricordk", "bbvida", "emariei", "PolicyAdvantage", "relevance", "FashionPRGirl_", "jodijeannine", "7DaysOfSmiles", "themixtapemastr", "ShaynaYasui", "Disciple4Lif", "Worldnews_____", "PetOverloads", "Roarkimagine", "WoWheedaLTD", "MarielaCooperri", "OvrdoseVibes", "adampaulgreen", "GrandVillaofPPK", "LoudPack_Tevin", "MLMBigProfits", "_susandaniels", "Lavy02", "BlackXpoAmerica", "mypassiontest", "BibliosBlood", "MDesbarres", "solikobidafiz", "theskkul", "CorrectWinger", "GrandVillaLargo", "DRoseAuthor", "thenameblogger", "Set_entertainme", "CecilyKorth", "BMWLACHIKC1", "WILLIAMSRETWEET", "MusicLov3rzWW", "ShaeDerringer", "OKCStormWatcher", "IvyGalasso", "GrandVillaofDBW", "UndersHead", "all_freeapps", "commonsharing", "WritingCoachSWS", "horrorbooks33", "Brad_Justus", "sandcrapper", "flipgazemedia", "TheAfricaMentor", "EnriqueFiallo", "SportsLineHotel", "AryanBiz", "ScottRickhoff", "OdessaGBlack", "WomenCentric", "MusicSuccessADG", "StashStickPen", "fabbaloo", "ThomasWillie", "SusanHerdian", "GrandVillaASP", "KingTurboRicky", "mclaubscher", "itspaintmyfeea", "Lora_Realtor", "rasangarocks", "Silverimagelimo", "GrandVillaOB", "literarybooks33", "nicksautographs", "30SecondSpanlsh", "a1_s25m", "greencitymedia", "00ggzz", "purplecreamband", "richardwelsh", "IM_PEACH_45", "BezalelPower", "GrandVillaofM", "Huntmcm", "getsteward", "NewAppleAwards", "Am1ssen", "Banatmasr2016", "CoopsCoaching", "itsWriteNow100", "bealpat", "InsuranceLendin", "starhymerdotsXe", "H_Town_74", "Crossbearer1956", "CynthiaStott", "GainMoreLeads", "Sash2T", "KareyMeraza", "AoxoA_Creative", "_SweetLovers", "JcliffyHuff", "lovemsgHQ", "4aPeoplesParty", "AmberlySilverio", "Dodo_Tribe", "nasoma564", "Revelation1217", "shark_in_ocean", "GrandVillaSTP", "pinki943", "JasSynergy", "zenful_woman", "ItsScaryNature", "BScharp22", "AnneJanzer", "VlogsVoyage", "HansKAnderson", "zwriter", "TripVerse", "barterb", "banntty", "cybersecdr", "RasimSafe6", "MartinAnstee", "GOLDMOUF", "careytha1", "AndyAUCD", "jbuchana", "Parkashji1", "AtlanticTranspG", "bettol23", "GeekJaskaur", "MiaoReport", "diamondrcreate", "DylanCornelius", "MINEBITCOIN_", "ChelleMartin47", "NormanTurrell", "davidabaileyjr", "DefiantSun", "Honey80517156", "MediBasket", "crowdfundingpr_", "Eykis", "LifeFlipMedia", "ElephantCrunch", "FosterKinn", "world_flag", "TikiGirlTreas", "beauty0fnature", "JolandaDieteman", "USAmericaFans1", "PitchYourStuff", "KobmaxQueen", "DetGoodMoney", "suzannehobbs365", "MDP_Podcast", "brambledowndes1", "LadyPatriot777", "NatriceR", "AlulaSnap", "Dip_Think", "Manusichhillarr", "NishaCarelse", "krasi333", "Rainbojangles", "italamerican", "AnnieMakind", "BreedersLove", "DataGek", "leecm363", "TrailerSource", "CutesDaily", "teamlerumo", "mobiledeals121", "hotchickdiaries", "Sylpete", "JG_social", "PCL_Money", "FieldLevel", "Timeonmyhandcom", "conciseonline", "casita_sol", "gdlcolorado", "HD_Thomson", "MesmerizngViews", "justaguy654321", "SteadyGloed", "BDSMRomance1", "hoda_kaa78", "AndyWhite1234", "freedomtank", "OnlineDDS", "RoseBartuFans", "constancefic", "BigDave74Tex", "Mr_Residuals", "RandyFloss", "WiseCrowdGlobal", "brandiluv", "RozPattyWriters", "bitcoins_get", "DJFrankieee", "JanaeOdonell", "Tito171", "DeniseSalmon1", "seoalien", "KealaLanae", "AnthonySald", "Sci_Instinct", "family_law_info", "GoldnRetiever", "OspreyFlyer", "Chris_Gerbehy", "420StonerCorner", "Citizenone3", "SwapnilK05", "lunamation", "mike4354", "BITCLUBHQ", "Vlad221180", "Urban_Island_", "jeffkagan", "mantasies", "Pauline_Campos", "michaelbsacks", "ToryValentina", "NAFS2016", "BuddhaDaHippie", "LionelGeek", "SugarGal_69", "rubyoklahoma25", "KevaPrentise", "RomanticErotic2", "joycetstrand", "financialpanthe", "ART_PIXS", "K29Omg", "MikeArend", "AR_Annahita", "RabbitRidgeWine", "Cristianromanc", "DogZoneUK", "ReallyBob", "StartMyPlanB", "jamiescottsmith", "PFJohnson", "TweetStarFollow", "AZanswers", "OnlyRealPromo", "AllenEllis14", "AngeloSind", "Deacon_1971", "MShiningElk", "VintageArtCafe", "DickInDaDope", "_clippersnation", "ProSmallCaps", "MikeEllsworth", "CyrusWebb", "RecoverMySpirit", "TransgenderU", "LyndaAtchison", "edna_mariaa", "warrenwarmachi1", "haldonahue", "trump4pres13", "ethniccanuck", "me7haa", "dsshep1959", "dgs615", "BfriendShipGoaI", "BrownGJ2", "Macel_Corbin", "RandyStillinger", "into_view_mag", "jordankwilsonjr", "MattaAbraham1", "Scumezza", "ConservGayGuy", "DrAurore", "RasimSafe10", "JohnEgreek", "Gurdjieff_Words", "The_Anti_Fox", "SquawkingPoints", "sportobsession6", "GalleryhopCom", "JeffreeTrouble", "freewillfighter", "MomsGetReal", "ekaterinasamard", "dpwallace", "onsip", "deathrep", "_kdwight", "ArrestedAplomb", "SagArcher", "MentorTerri", "SoulRebelMusic", "hwolpoff", "MicheleTrainer", "LisaYoga1995", "cdcatx", "HannaGepheart", "957CRUZFM", "VidRetal", "Joe_Bauer", "MusembiRap", "SexInWords", "shasta247", "pasquale0022", "Ryan7Read", "AWSA", "darielgarner", "drtiemintimwu", "FreePublicTrans", "NYspanish", "dedactiv", "conbrood", "Quinn_TFZ", "conundrumstix", "KentStuverRE", "YourFireStory", "milesw", "WifiGallery", "MichaelAddams", "GizmoSays", "solarcollab", "bo2k_now", "AbideMindfully", "nancelarson", "americandream09", "startupers", "optim1stic", "jafelco", "DutchRhudy", "mrgogetit247", "jasoncaine", "lealuna", "PlanetLARP", "Timothy_Elkin", "Ed4Online", "ladyartness", "Dave_Roessler", "shelhorowitz", "webutekk", "marveleveryday", "ReganGroup", "500DrumSquad", "ChandraWademan", "InstaVR", "Lastmangoinfla", "tryshold", "toonchooi", "graca5683", "KaizaraKaye", "SkiPow7", "therapywild", "KimBaoule", "GUCCISLIMEE", "Oswashi", "Ant_The_Manager", "CryptoWorld101", "paradise2012", "yinnus", "FrancisFriedman", "Tobivibes", "3seawarrior47", "Mrs_Sara_Fields", "BhusriHeart", "durk13", "MalibuMel07", "AntiDuper", "RapStarVidz", "DeniseNatishan", "tonypiparo", "BlowAKissJB", "PlanTheTrade_", "Shamstress", "murder_mickey", "ocfooddiva", "shogoldy", "Moorkk", "___BESTJOKKES__", "bajaruss", "robbjas", "Liars_Inc", "EffieShrevee", "AlamoOnTheRise", "KidsAndWomen", "BillPaige02", "lrnogrphy", "cooperengineer", "bayonnebernie", "Kaybirds", "JennDark", "ChaseCarbon", "MyPenNameOnly", "gastarbooks", "RWozneyVentures", "tenswordpoem", "AskAdamExpert", "GVFortMyers", "DBerg_writer", "Joyce5577", "wpiajbmdkox1", "bulldoghill", "ConversionAid", "iemilyjohannson", "redoyakash95", "yellooh", "GregoryRMiller", "TaliaLozaro", "Collazo474", "writesromance", "ricktreat42", "WeightLossTipps", "LABYRINTH23_KSC", "wcpreston", "FineAssApril", "PghMoms", "winesellersltd", "NonSlipSurfaces", "DeSmogCanada", "JohnTSonne", "zerodoubtzone", "aastharani82", "jobseekus", "tammiefields", "saurabh09991", "TheDigitalMrkt", "101apparel", "jndevito", "HIPAAEx", "InTheElections", "TruthSoldierz", "hostfully_", "PDXStephenG", "SurrendrDorothy", "DrShirleyDavis", "Creativefamfun", "himanshu9869", "PeggyMcAloon", "deathbynothin", "FamousStan_", "redideo", "kathylstadler", "WebsiteBits", "Hautex_Fashion", "FoundersGyan", "mvasey", "1192Folsom", "KeeleyLoehner", "last_buffoon", "therichguccibae", "PainNewsNetwork", "EngCareerCoach", "zipcapitalgroup", "realKDilan", "AndyTtree", "CDW_Jessica", "MathaSmarra", "KidsOfInmates", "RosaRuya", "suefernphillips", "Darko246", "donrelyea", "PaulDalyy", "Ghetto_Lono", "affiliate_tom", "gvdunedin", "SharonCraigen", "ColleenD5000", "Kindle_E_Books", "CJeanneGilbert", "AngelaTague", "golden23rus", "islovelife9", "CajunTVNetwork", "american_love12", "UssLibertyy", "Guerrerocxcx", "inthebasement", "TirzaMotivates", "peopleshark", "Janice_Garner", "timmackrap", "hopecassity", "Mikey_Renzo1", "GEOYNOT", "_BlueTsunami", "AuthorJCHowell", "LornaWarrik", "BettieHillman", "pyaariguriya", "fineartfan", "thelagosgirl", "TheTrendingTalk", "mybeautiful_nat", "Markenglisharch", "Syrah_Queen", "PeterDParrish", "btcfarhad", "Romantic_Artist", "cellphio", "QuirkOfTIme", "ItsPromoKing", "IndigenousSWs", "bigstickdogg", "NiritBraun", "luckyorange", "madisonmcw7", "OrenErgas", "bobswetzonline", "unknownalice", "Savers_Place", "andj7871", "MPhilipOliver", "JohnFildes", "AmericanEmpath", "Ma1ohier", "BostonTechCorp", "MyBrandt", "DJRossstar", "Curriki", "LifelongSucess", "MexicoTravel360", "discoveriesUSA", "JenniferMeacher", "SurvivalDays", "dannyreb", "FeralislandMick", "nmitch", "SharpieGirlSue", "iRadek6", "ShariLauree", "mindandvoice", "Derrick5L", "homedon5", "grandvlakeland", "wisejohnp", "vannessalesniew", "MotivationLP7", "DYKCars", "MommyDiscipline", "boystoysdirect", "Artisti777", "StevenageTown" ];

/*
const options = { name: 'Contest-Winners', description: 'Friendship is the true prize'  };

//
//  Creates a new list for the authenticated user. Note that you can create up to 1000 lists per account.
//
T.post('lists/create', options, function(error, data, response) {
  // console.log(data);
  // console.log(data.statuses.length);
  // console.log(response);

  if( data != undefined && !error && response.statusCode == 200 ){
  	 	
	  console.log(data);
	  
  	
  } // end if
  else if( error )
  {
	console.log(error);	
	console.log(data);
	console.log(response.statusCode);
  }
  

}); // end lists/create

*/

/*

{ id: 936734729998540800,
  id_str: '936734729998540800',
  name: 'New Auto Owners',
  uri: '/mtpoker/lists/new-auto-owners',
  subscriber_count: 0,
  member_count: 0,
  mode: 'public',
  description: '',
  slug: 'new-auto-owners',
  full_name: '@mtpoker/new-auto-owners',
  created_at: 'Fri Dec 01 23:12:17 +0000 2017',
  following: false,
  user: 
   { id: 15120246,
     id_str: '15120246',
     name: 'mtpoker',
     screen_name: 'mtpoker',

*/

const list_id = '936734729998540800';

var a = 0;

const limit = 500;

const pause = 60000;

postUser();

// createList();

function createList(){
	
	
  console.log('Starting List Create');

  var T = new Twit( {
      consumer_key: process.env.twitter_consumer_key,
      consumer_secret: process.env.twitter_consumer_secret,
      access_token: process.env.twitter_access_token,
      access_token_secret: process.env.twitter_access_token_secret
    } );

  	var name = 'New Auto Owners';
  	var description = '';
  	
  	return;

  	//
	//  Creates a new list for the authenticated user. Note that you can create up to 1000 lists per account.
	//
	T.post('lists/create', { name: name, description: description  }, function(error, data, response) {
	  // console.log(data);
	  // console.log(data.statuses.length);
	  // console.log(response);

	  if( data != undefined && !error && response.statusCode == 200 ){
	  	// res.write(JSON.stringify(data));	
	  	
 		  console.log(data);

	  	
	  } // end if
	  else if( data != undefined && !error )
	   {
			console.log(response.statusCode);
			res.write(response.statusCode);
			res.end(); 			

	   }	
	  else if( error )
	  {
		console.log(error);	
		console.log(data);
		console.log(response.statusCode);
		console.log(response.statusCode);
		res.write(response.statusCode);
		res.end();
	  }
	  

	}); // end search/tweets

	
}

function postUser(){
	
	console.log(accounts[a]);
	
	var method  = 'post';
	var command = 'friendships/create';
	var options = { screen_name: accounts[a], friendship: process.env.twitter_handle };
	
	getCache( command, options, function(err, res){		
		if( res == undefined ){
			// Cache Miss!!
			console.log('Cache MISS: postUser');
			twitterApi(method, command, options, function(data){	
				wait(pause);			
				postList();
			});		
		}else{
			// Cache HIT
			console.log('Cache HIT: postUser');
			postList();
		}		
	});

}

function postList(){

	var method  = 'post';
	var command = 'lists/members/create';
	var options = { list_id: list_id, screen_name: accounts[a] };
	

	getCache( command, options, function(err, res){		
		if( res == undefined ){
			// Cache Miss!!
			console.log('Cache MISS: postList');
			twitterApi(method, command, options, function(data){
				wait(pause);
				getFriends();
			});			
		}else{
			// Cache HIT
			console.log('Cache HIT: postList');
			getFriends();
		}		
	});	
}

function getFriends(){		
	method = 'get';	
	command = 'friends/list';
	options = { "screen_name": accounts[a], "include_entities": false, "count": 200  };	
	
	getCache( command, options, function( err, data ){
		if( data == undefined ){	
			console.log('Cache MISS: getFriends');
			twitterApi( method, command, options, function(data){
				for( i = 0; i < data.users.length; i++){
				    	recordAccount(data.users[i], i, function(error, results, data){
				    		console.log('Recorded friend: '+ data.screen_name );
				    		// console.log(data);
						});
					}
				wait(pause);	
				getFollowers();	
			});
		}else{	
			console.log('Cache HIT: getFriends');
			// cache hit		
			for( i = 0; i < data.users.length; i++){
			    	recordAccount(data.users[i], i, function(error, results, data){
			    		console.log('Recorded friend: '+ data.screen_name );
					});
				}				
			getFollowers();				
		}
	});
	
	}
	
function getFollowers(){

	method = 'get';		
	command = 'followers/list';
	options = { "screen_name": accounts[a], "include_entities": false, "count": 200  };	
	
	getCache( command, options, function( err, data ){	
		if( data == undefined ){	
			console.log('Cache MISS: getFollowers');
			twitterApi( method, command, options, function(data){
				var followers = data.users.length -1;
				for( i = 0; i < data.users.length; i++){
				    	recordAccount(data.users[i], i, function(error, results, data, index){
				    		console.log('Recorded follower: '+ data.screen_name );			    							    	
						});
					}
				a++;
				console.log('Index: '+a);	
				if( a < limit && a < accounts.length ){
					wait(pause);
					postUser();
				}else{
					console.log('Done!!');
					process.exit();		
				}						
			});	
		}else{	
			// cache hit
			console.log('Cache HIT: getFollowers');	
			var followers = data.users.length -1;	
			for( i = 0; i < data.users.length; i++){
			    	recordAccount(data.users[i], i, function(error, results, data, index){
			    		console.log('Recorded follower: '+ data.screen_name );			    		
					});
				}
			a++;
			console.log(a);	
			if( a < limit && a < accounts.length ){
				postUser();
			}else{
				console.log('Done!!');
				process.exit();		
			}
			
		}
	
	});	
	
	}

function twitterApi(method, command, options, callback){

	if( 'post' == method ){
		T.post(command, options,  function (error, data, response) {
						      					            
		    if(error != undefined || response.statusCode != 200 ){
				console.log("Something went wrong!");
				console.log(error);
				console.log(response.statusCode);			
		   
		    }else{
				writeCache(command, options, data, callback);
			}
			
		}); // end users/show
	}else{
		T.get(command, options,  function (error, data, response) {
						      					            
		    if(error != undefined || response.statusCode != 200 ){
				console.log("Something went wrong!");
				console.log(error);
				console.log(response.statusCode);			
		   
		    }else{
				writeCache(command, options, data, callback);
			}
			
		}); // end users/show
	}	
}

function getCache( command, options, callback){
	
	// query database for data based on key with date within lifetime
	const text = "SELECT command, options, data FROM twitapicache WHERE command = $1 AND options = $2 AND date_updated > now() - interval '"+cacheLifetime+"' ;";
	const values = [command, options];
	
	// callback
	client.query(text, values, (err, res) => {
	  if (err) {
	    callback(err, undefined );  
	  } else if( res.rows == undefined || res.rows.length == 0 ){
		callback(err, undefined );  
	  } else {
	  	callback(err, res.rows[0].data);
	  }
	});
	
}



function writeCache( command, options, data, callback ){
	
	const text = "WITH upsert AS (UPDATE twitapicache SET data = $3, date_updated = now() WHERE command = $1 AND options = $2 RETURNING *) INSERT INTO twitapicache ( command, options, data, date_created, date_updated ) SELECT $1, $2, $3, now(), now() WHERE NOT EXISTS (SELECT * FROM upsert);";
	const values = [ command, options, data ];
				
	// callback
	client.query(text, values, (err, res) => {
	  if (err) {
	    console.log(err.stack)
	  } else {
	  	// console.log(values);	    
	  	callback(data);
	  }
	}); // end client.query			
	
}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   var seconds = ( ms / 1000 );
   var last = end;
   while(end < start + ms) {
   	 if( 0 == ( end % 1000 ) && last != end ){
	   	 console.log('Waiting: '+ ( --seconds )+' seconds');
   	 }
   	 last = end;
     end = new Date().getTime();
  }
}

function recordAccount(data, index, callback){
	
	const text = "WITH upsert AS (UPDATE account SET data = $3, date_updated = now() WHERE user_id = $1 RETURNING *) INSERT INTO account ( user_id, user_name, data, date_created, followers_count, friends_count, statuses_count, created_at, status_created_at ) SELECT $1, $2, $3, now(), $4, $5, $6, $7, $8 WHERE NOT EXISTS (SELECT * FROM upsert);";
	const values = [ data.id_str, data.screen_name, data, data.followers_count, data.friends_count, data.statuses_count, data.created_at, (data.status != undefined && data.status.created_at != undefined)?data.status.created_at:null ];
	
	// callback
	client.query(text, values, (error, results) => {	
	  if (error) {
	    console.log(error);
	    console.log(error.stack);
	    callback(error, results);
	  } else {
	  	callback(error, results, data, index);
	  }
	}); // end client.query
	
}
