OBLECOBUJ.[sk|cz]
========================

#### Nazov INeed sa pouziva ako hlavny namespace. Vznikol aj koli postupnemu vyvoju nazvu platformy vzhladom na prve nazvy: "Hodny Soused", "Ja Potrebujem" - a z toho "I Need"

## 1) Start

```Bash
$ cd /var/www # pouzi podla svojho
$ git clone git@gitlab.medium13.sk:ineed/ineed.git
```

*Note: you may add more excluded if you want*

### 1.1) Fix permissions on Unix systems

```Bash
$ cd ineed
$ rm -rf app/cache/* app/logs/* app/spool/* web/uploads/media/*
$ HTTPDUSER=`ps aux | grep -E '[a]pache|[h]ttpd|[_]www|[w]ww-data|[n]ginx' | grep -v root | head -1 | cut -d\  -f1`
```

#### a) Using ACL on a system that supports chmod +a

```Bash
$ sudo chmod +a "$HTTPDUSER allow delete,write,append,file_inherit,directory_inherit" app/cache app/logs app/spool web/uploads
$ sudo chmod +a "`whoami` allow delete,write,append,file_inherit,directory_inherit" app/cache app/logs app/spool web/uploads
```

#### b) Using ACL on a system that does not support chmod +a

```Bash
$ sudo setfacl -R -m u:"$HTTPDUSER":rwX -m u:`whoami`:rwX app/cache app/logs app/spool web/uploads
$ sudo setfacl -dR -m u:"$HTTPDUSER":rwX -m u:`whoami`:rwX app/cache app/logs app/spool web/uploads
```

If this doesn't work, try adding -n option.

#### c) Without using ACL
```Bash
umask(0002); # This will let the permissions be 0775
# or
umask(0000); # This will let the permissions be 0777
```


## 2) install dependecies via composer 

__(go to https://getcomposer.org/doc/00-intro.md if you haven't a composer)__

```Bash
$ composer install
```

V ramci composer install sa vas pri prvom spusteni bude pytat na nastavenie parameters.yml
odporucam ponechat default hodnoty (tie su nastavene na devel databazu a vsetko potrebne) 
_staci podrzat enter az dokym nenabehne cast "Download or update create"_


## 3) prepare cache

```Bash
$ php app/console cache:clear -q  # THIS IS NECCESSERY!!!
```

## 4) Install Assets

```Bash
$ php app/console assets:install
```

## 5) Finish 

now you can browse your application via localhost (e.g.: http://localhost/ineed/web/app_dev.php - for development mode)
or
setup virtual host to web directory in your application


### Troubleshooting

* **Windows problem with max path lenght**

```
    [ErrorException]
    ZipArchive::extractTo(): Full extraction path exceed MAXPATHLEN (260)
```

*Sulution: install your application in e.g. /c/www*


* **Problem s github tokenom**

```
- Vytvorit account na github.com
- Prihlasit sa, moj profil/Personal access tokens
- Generate new token
- skopirovat token
- vytvorit subor "auth.json" tu -> c:/%user%/AppData/Roaming/Composer
- vlozit do suboru a ulozit:
{
     "http-basic": {},
     "github-oauth": {
         "github.com": "tvoj token"}
}
- pre istotu vymazat zlozku vendor v projekte 
- znova pokracovat bodom 2)
```

* ** Error: You must define a binary prior to conversion**
```
Install lib http://wkhtmltopdf.org/ & citaj Hint 2)
```

# OBLECOBUJ

1) Start your day with git pull :)
2) ak chces generovat faktury (bez erroru: You must define a binary prior to conversion), nainstaluj si: http://wkhtmltopdf.org/  a vo svojom parameters.yml si nastav "knp_snappy.pdf.binary" podla svojej konfiguracie

# TODO:
- kazdu poslednu hodinu pride mail s ponukamni za poslednu hodinu (min. jedna) (nastavitelne v profile - Notifikacie)
- to iste uvidi v zalozke (Kupec) Kufor > Nove ( pagiation - dnes, vcera, [utorok, pondelok(posl;edny), x dni do zadu ... 1 mesiac dozadu... stvrt roka do zadu, poll roka, 3/4 roka do zadu, rok, 2 roky ...] )

kufor (admin) /
- listing tovaru
- listing katalogov
- pagination
--- vsetko do kopy
    - modul edit
        - s obrazkami alebo bez...
        - uprava fieldov...

user / platba
- iba cez sms verzia: 1. 1,xx EUR (Top), verzia: 2. 13 EUR (URL)

to do /
- event - update user avatar - a spravit event a zamazat predosli avar - media
- chat / kuper - predajca /
    - predajca plati 10 EUR / mes. aby mohol chatovat
    - kupec napise poziadavku, predajcovia reaguju
    - vznika chat #predajca
    - 

### TASKS

--- To publish
- Vymazavanie artiklov a katalogov (events onArticleDelete || onCatalogueDelete)
- Purifier nad fieldami
- Poznamka pri pridavani artiklu
- Po pridani artiklu - stranka, tovar bol pridany - linka na pridanie dalsieho, ist na hlavnu stranku, otvorit moje tovary, ...
- Katalog restriction - 10 artiklov obuv a 10 oblecenie - za kazdy dalsi navyse Single SMS kredit
- Pridat moznost darujem, do pridania aj filtra
- Kod kreditov - componenta - popup s overenim user hesla z bezpecnostnych dovodov sa zobrazia vsetky kody kreditov
- Pri zadani URL adresy pri artikly, nech vyskoci platba - zadanie credit codu
- Spravit HP vyhlasdavanie - hp listing
- Zaregistrovat, platobnu branu a SMS payment - obchodne podmienky podla pravnickych ... a doklad o zaplateni
- osetrit pri vyhladavani specialne znaky *!@#$%^&*() atd
- Publish

--- Dalsie
- Hned pridany artikel, sa zobrazi vo vyhlade kupca. Cize bars kde bude, ci modal, ci ... okienko v strede, 3 sec (novy artikel)... prec
- V kategorii moznost vybrat main article .. podobne ako main media - zobrazi sa jeho nahlad atd (napr. pri katalogoch) ..
- Artikel bez obrazku zobrazit bud obuv, alebo oblecenie siluetu - zrejme font icon
- Pri bliziacich sa expiracii - vyditelnost a vymazanie - mail notifikacia - cron console script
- Cron, console command, 7 dni stare artikle zmazat

-- "Pis a predavaj" - sluzba... kupec, sprava... placeholder - "nanutit" - prehovorit, ze piste svoje poziadavky, kde okamzite ziskavate ponuky presne na tovar, ktory hladate atd ...
-- Na ziatku, ked ester nikto nebude mat tuto sluzbu predplatenu,m obdrzia ju prvy 5ti predavaci, s najvyssim poctom artiklou s tym, ze dostanu o tom presnu informaciu o co ide... preco to dostali, kedy to bude kto dostavatg, atd... ze to dostali zatial preto, lebo si vazime ich ucast na portali a kvoli najvacsom pocte ponuk dostaly tuto moznost... gratulujeme...
-- URL creadit

- URL reklama nebude to priame... prvorade bude 13eur za to, ze bude artikel uplne v popredi na 1 mesiac s tym, ze je mozne s tymto dat si aj link na svoju stranku, nebude nic vyditelne. Tieto artikle budu aj ako top v prvom rade.... nasledne sa zobrazia este raz, hned za topom este raz, ako normalny artikel
- TOP bude s flagom TOP - viditelne, a bude tiez v popredi...
    - POPUP MESSAGE - tesne pred skoincenim url mesiaca, alebo odporucenie, predplatte si url reklamu a zvyste sa do najvyssich pozici vyhladavania

... na kliknuie na galleriu musi byt moznost ...

- edit field dole v pravo pod fieldom boxik, s ikonkami, OK - fajka, cancel X 
- pozret kde su loggy od symfony
- HP - prvych 5 ikon, posledny tovar, top, alebo url ... kazdy den, dalsich 5...
- HP - vsetky aktualne ponuky z platenej formy. Primarne URL reklamy ponuky, nasledne TOP aktualne ponuky (nikdy sa nebude zobrazovat TOP flag!)...
   -> Plozka dalej, bude zobrazovat next page podla aktualneho vyhladavacieho kriteria.

- Quickmessage len pre tych co si zaplatili za URL...

- Platene ze jako na HP - 1st pictre screen - 4 responmsive ponuky - za kazdou platenou vecou, ide poradie do DB queue... tieto sa tu nacitavaju
- Fungovanie - 
    - HP(first-page) - NIC. 4 ponuky (tymyot prejdu svojou prioritou) az  dole. Kazda platena forma - 3x 1 strana (nasledne podla hodnoteni...)
- Filter vyhladdavania na HP

- Co najmeneej prace, co najmenej duplicitnej prace, resp. SINGLE prace. 2. brany - z jeho webu - z mojho webu.

- Ranky 
    - Intelekt: Priemer pocet celkovych sprav, najviac poziticnych reakcii... ku kazdej sprave -- hodnotenie - pozitivne/negativne
    - Poctivy obchodnik: priemer, hodnotenia po kupe... jak spersused, po odoslani tovaru alebo obdzeni, kazdy da ranka na obchod toho druheho (kupec, predajca)
- Overeny p - - zaplatena URL reklama... pri len jednom URL credite - bude overeny - bude sa to hybat okolo artiklu... najnavstevovanejsie a najviac diskusatible - sucet v porovnani s ostatnimi
- Notifikacia, sprava - trosku viac vyrazne - viac dolezita vec, + 25% icon scale
- Dat vyhladavanie hned na uvod ! jak google
- Menu - nastavenie - slider zoom poloziek na HP
- Material popup all items, click to set input
- Sitemap: katalogy a tovar
- Ihned napiste
- Throw exceptions, vyhodit nazov triedy a metody
- Pri autocomplete, to vypisuje v pozadi na stranke item
- Dobit kredit, novy pouzivatel, bude moct dobit kredit 3x free - dostane pri registracii 3 kredity... inzercia na URL, nie
- 13eur za URL to bude chcciet od kazdehgo predajcu, to bude moct ihned reagovat na spravu od kupcu...
- Diskusia, sa otvori cela nova stranka, nieco jak kurfik. V lavo otvorene chaty, mena uzivatelov (chat) s ktorym si cokolvek napisal.
- Suitcase Kredit, copy to clipboard kredit code
- Do pop hlasky hodit v pravo hore close ikonku, jemnejsej farby, po nadideni nad hlasku hover color

- Vyhoda katalogu: 
    - Bude to vypadat jak taka mikrosajta. Nase logo - Jeho nazov katalogu - Nazov firmy - (URL ak si zaplati / url je predplatne na jeden mesiac)
    - bude mat vlastnu stranku aj URL slug, oblecobuj.sk/katalog/moj-nazov-katalogu - zoznam artiklov...
    - Zdielanie na siete
    - katalog bude mat expiraciou po 3och mesiacov, ja to opodstatnene sezonou, pretoze katalog je sezonny, jar, leto, jesen, zima
    - iba katalog moze mat diskusiu- automaticky bude zasktrtnuty checkbox na sledovanie po prispeni spravy - email notifikacia
    - katalog mozu ludia hodnotit, cize pribuda popularita, cize pribuda zobrazenie vo vyssich prieckach...
    - ked sa katalog vymaze, nic to nemeni, uzivatel ziskava nejake celkove ratio z tychto hodnoteni, co bude mat dopad na (len na zaciatok, novo vzniknuteho katalogu, resp. startovnne hodnotenie... by mohlo byt 15% uspenosti)
    - upsesnost by sa mala riadit ratiom
        - platene: +10% URL linka, +10% top
        - hodnotenie samotneho poouzivatela (percenta - priemer hodnoteni)
        - pocet hodnoteni artiklov v katalogu (od ludi) (primer)
        - pocet sprav (v diskusii) (concat-priemer sprav nad katalogom)
    - Tiez to ludom popisat, guide - Kedze kazdy tovar alebo katalog u nas zije, tieto kriteria ovplivnuju popularitu tovaru v co najvysiich prieckach zoznamu.

- Benefit, prvych 50 uzivatelov dostane luck (byt stedri)
    - Gratulujeme, patrite medzi prvych 20. zaregistrovanych pouzivatelov a preto ziskavate premiove konto s Balickom Stastie. Tento balicek sa neda kupit a znamena to, ze prvych 5 dobiti kreditu bude pre vas najjednoduchsie ziskat uplne zadarmo. Po 5tom dobiti uz budu vsetky Vase dobijania v rukach 15% sance ziskat kredit bezplatne. Verime, ze to ocenite, a naplno budete vyuzivat nase sluzby. Naoplatku uvitame Vase napady akehokolvek typu. Zelame Vam vela uspechov :)
        alebo
    - Gratulujeme ste nas 100-ty zakaznik, a preto ziskavate ...
    - Dobit kredit - budu mat button, dobit, nasledne, dostane 5x luck - dobit zadarmo.
        Sance:
        1. 100%
        2. 75%
        3. 50%
        4. 25%
        5. 15%
        - Po vycerpani bude stale 5. bod
        - Kladny vysledok: Super. Kredit mate zadarmo!
        - Zaporny vysledok: Skoda, nevyslo to.

- Rychle spravy budu zobrazene hned, uz pre neprihlaseneho, na klik, ze to chce otvorit, nabehne text, ze sa musi prihlasit pod predajcom..., tiez sprava o tom, ze moze napisat spravu aj ako kupujuci. Ako predajca, musi mat povolenie. Bude to navyse ako balik, pretoze nie len z rychlych sprav alebo z diskusii v roznych katalogoch, kde si zvoli, sledovat toto tema... dostane okamzite notifikaciu... Ostatnych ju dostanu az po 10min...
    - kupec dostane po odoslani spravi o tomto informaciu, kludne moze zavriet chat, neskor mu zapipa ikonka, alebo mu pride mail notifikacia.
    - ak sa kupec rozhodne, moze kedykolvek diskusiu uzavriet.

- Kupujuci a Predajca budu mat rozlicne notifikacie. V kazdom notifikacnom mailu, bude link na nastavenie kokretnej roli. Na webe bude upozornenie o rozlicnosti.

- Kazdy bude drzat diskusiu svojeho artikla alebo katalogu...

- vstup do kazdej diskusia bude na accept. Tzv - zaujemnca napise co v zaujme, a host, resp. vlastnik polozky, ho acceptne alebo ne

- kupujuci diskusia - uvidia automaticky prihlaseny predajcovia, sa bude kyvat svoncek, a pribudat cisla na pocet novych sprav, az po 10minutach. Kupec dosatne o tom spravu... po 10min, zacne crngat hore zvoncek pre prihlasenych predajcov.

-  popri URL a single kredite... pre vacsie firmy, 100eur na mesiac, budu zobrazovane tie articly - bannery, url... nenapadne tak jak ostatne, medzi nimi.
    prve:
    do 3. dni - prve miesto
    tyzden - 2 miesto
    2 tzdne - 4 miesto
    3 tyzdne - do 10teho miesta
    mesiac - 

- Bude platit kazdy mesiac 

- Buducnost
    - moznost importu poloziek cez web... nejake oznacenie blokov zo zdrojove kodu, napr. kategoria link, artrikel css blok, header css blok, text css blok, image css blok...

Newsletter succes points:
👉 predmet 
👉 personalizované oslovenie
👉 deň a čas odoslania emailu
👉 témy obsahu
👉 typy CTA tlačidiel a ich farebnosť
👉 tón a štýl komunikácie
👉 nadpisy
👉 použité obrázky
👉 deň a čas odoslania emailu
👉 použitie animovaných gifov
👉 interaktivita v emailoch


KAPULISKA Raskusko:
- Kúpalisko Parkbad, Bruck an der Leitha v Rakúsku
- Kúpalisko Erlebnisbad Prellenkirchen

-----

0940 865 044

0902 809 041 denis 
ada 0918 450 730 dinsova mama

-----

zubarka olinka 19.2. 14.00

-----

https://www.protein.sk/1-1-zadarmo-arginine-pure-akg-best-nutrition-produkt?gclid=EAIaIQobChMIqOfDmLmO2gIVwzbgCh29EgzoEAEYASABEgIvRPD_BwE
https://biocare.sk/eshop/produkt/chanca-piedra

-----

znacka 36er/3182/2011 na tajomnicku exekucneho konania na okresny sud 5 - volat v maji
