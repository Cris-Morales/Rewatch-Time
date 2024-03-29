import fs from 'fs';
import pg from 'pg';
const { Pool } = pg;
import process from 'process';
import dotenv from 'dotenv';
dotenv.config();



const PG_URI: string = process.env.DATABASE_URI;
const pool = new Pool({
    connectionString: PG_URI,
});

const query = (text, params, callback) => {
    return pool.query(text, params, callback);
};



const episodeCardPaths = [
    "/episodeCards/1-4tQWQF3-S01E01-SlumberPartyPanic.jpg",
    "/episodeCards/2-b4vCp1s-S01E02-TroubleInLumpySpace.jpg",
    "/episodeCards/3-79CwIYS-S01E03-PrisonersOfLove.jpg",
    "/episodeCards/4-oHsa6lF-S01E04-TreeTrunks.jpg",
    "/episodeCards/5-RAo9GZB-S01E05-TheEnchiridion!.jpg",
    "/episodeCards/6-4QjB7Tm-S01E06-TheJiggler.jpg",
    "/episodeCards/7-DZQHBSO-S01E07-RicardioTheHeartGuy.jpg",
    "/episodeCards/8-9vTsgn0-S01E08-BusinessTime.jpg",
    "/episodeCards/9-nuKrg9W-S01E09-MyTwoFavoritePeople.jpg",
    "/episodeCards/10-XcVJgie-S01E10-MemoriesOfBoomBoomMountain.jpg",
    "/episodeCards/11-mJpjEey-S01E11-Wizard.jpg",
    "/episodeCards/12-EFO2n4q-S01E12-Evicted!.jpg",
    "/episodeCards/13-y3PwtqG-S01E13-CityOfThieves.jpg",
    "/episodeCards/14-BYPK3of-S01E14-TheWitchsGarden.jpg",
    "/episodeCards/15-7CkvfUZ-S01E15-WhatIsLife.jpg",
    "/episodeCards/16-cGMvQ1g-S01E16-OceanOfFear.jpg",
    "/episodeCards/17-mul62Ai-S01E17-WhenWeddingBellsThaw.jpg",
    "/episodeCards/18-BJvUvpp-S01E18-Dungeon.jpg",
    "/episodeCards/19-RNlz939-S01E19-TheDuke.jpg",
    "/episodeCards/20-gQd8osY-S01E20-FreakCity.jpg",
    "/episodeCards/21-wIXffkX-S01E21-Donny.jpg",
    "/episodeCards/22-4Bmi7iy-S01E22-Henchman.jpg",
    "/episodeCards/23-zAJQdzY-S01E23-RainyDayDaydream.jpg",
    "/episodeCards/24-5uFBZg8-S01E24-WhatHaveYouDone.jpg",
    "/episodeCards/25-Svpzvh1-S01E25-HisHero.jpg",
    "/episodeCards/26-sWOFldm-S01E26-GutGrinder.jpg",
    "/episodeCards/27-i8NHa71-S02E01-ItCameFromTheNightosphere.jpg",
    "/episodeCards/28-wmANhKL-S02E02-TheEyes.jpg",
    "/episodeCards/29-5KKidI8-S02E03-LoyaltyToTheKing.jpg",
    "/episodeCards/30-aDtVRI7-S02E04-BloodUnderTheSkin.jpg",
    "/episodeCards/31-qz6IwH7-S02E05-Storytelling.jpg",
    "/episodeCards/32-lSIohpA-S02E06-SlowLove.jpg",
    "/episodeCards/33-TMY31Ll-S02E07-PowerAnimal.jpg",
    "/episodeCards/34-TThlj0X-S02E08-CrystalsHavePower.jpg",
    "/episodeCards/35-oSN39yv-S02E09-TheOtherTarts.jpg",
    "/episodeCards/36-HkjhHe6-S02E10-ToCutAWomansHair.jpg",
    "/episodeCards/37-prPwzkW-S02E11-TheChamberOfFrozenBlades.jpg",
    "/episodeCards/38-FlVhNos-S02E12-HerParents.jpg",
    "/episodeCards/39-6FxwKqy-S02E13-ThePods.jpg",
    "/episodeCards/40-1yYmeeF-S02E14-TheSilentKing.jpg",
    "/episodeCards/41-8ttzb3n-S02E15-TheRealYou.jpg",
    "/episodeCards/42-GYiqyk9-S02E16-GuardiansOfSunshine.jpg",
    "/episodeCards/43-YQcNxHn-S02E17-DeathInBloom.jpg",
    "/episodeCards/44-kL21DjC-S02E18-SusanStrong.jpg",
    "/episodeCards/45-7Ff7Ljr-S02E19-MysteryTrain.jpg",
    "/episodeCards/46-4k9NDqX-S02E20-GoWithMe.jpg",
    "/episodeCards/47-LeUTAVu-S02E21-BellyOfTheBeast.jpg",
    "/episodeCards/48-Gllvugj-S02E22-TheLimit.jpg",
    "/episodeCards/49-R3U5sRG-S02E23-VideoMakers.jpg",
    "/episodeCards/50-p5i8Nvw-S02E24-MortalFolly.jpg",
    "/episodeCards/51-vsDicYu-S02E25-MortalRecoil.jpg",
    "/episodeCards/52-jcwrV3C-S02E26-HeatSignature.jpg",
    "/episodeCards/53-JqNImhO-S03E01-ConquestOfCuteness.jpg",
    "/episodeCards/54-agMmj4f-S03E02-MorituriTeSalutamus.jpg",
    "/episodeCards/55-db513Jo-S03E03-MemoryOfAMemory.jpg",
    "/episodeCards/56-8EZuQR1-S03E04-Hitman.jpg",
    "/episodeCards/57-KsnJk2q-S03E05-TooYoung.jpg",
    "/episodeCards/58-JvzwBfM-S03E06-TheMonster.jpg",
    "/episodeCards/59-rqGNILU-S03E07-Still.jpg",
    "/episodeCards/60-yrqkodV-S03E08-WizardBattle.jpg",
    "/episodeCards/61-C5G04dO-S03E09-FionnaAndCake.jpg",
    "/episodeCards/62-dgQSrps-S03E10-WhatWasMissing.jpg",
    "/episodeCards/63-adu09Vo-S03E11-AppleThief.jpg",
    "/episodeCards/64-uiqyUVc-S03E12-TheCreeps.jpg",
    "/episodeCards/65-3UUT696-S03E13-FromBadToWorse.jpg",
    "/episodeCards/66-ow8aiem-S03E14-Beautopia.jpg",
    "/episodeCards/67-4pAjLFn-S03E15-NoOneCanHearYou.jpg",
    "/episodeCards/68-XLHwyc7-S03E16-JakeVs.Me-Mow.jpg",
    "/episodeCards/69-AoDUARr-S03E17-ThankYou.jpg",
    "/episodeCards/70-3mVZYRH-S03E18-TheNewFrontier.jpg",
    "/episodeCards/71-pt1Tfa6-S03E19-HollyJollySecretsPartI.jpg",
    "/episodeCards/72-L4Kt5My-S03E20-HollyJollySecretsPartII.jpg",
    "/episodeCards/73-6eTL8DF-S03E21-MarcelinesCloset.jpg",
    "/episodeCards/74-mjRU5Nj-S03E22-PaperPete.jpg",
    "/episodeCards/75-eLRRhC1-S03E23-AnotherWay.jpg",
    "/episodeCards/76-KhkYZ1n-S03E24-GhostPrincess.jpg",
    "/episodeCards/77-EpP2oTH-S03E25-DadsDungeon.jpg",
    "/episodeCards/78-K9vtV3a-S03E26-Incendium.jpg",
    "/episodeCards/79-qkIoSwm-S04E01-HotToTheTouch.jpg",
    "/episodeCards/80-nuEsPyT-S04E02-FiveShortGraybles.jpg",
    "/episodeCards/81-HHwHrk7-S04E03-WebWeirdos.jpg",
    "/episodeCards/82-C0TbVNS-S04E04-DreamOfLove.jpg",
    "/episodeCards/83-W8vjcrl-S04E05-ReturnToTheNightosphere.jpg",
    "/episodeCards/84-kJ3LHQZ-S04E06-DaddysLittleMonster.jpg",
    "/episodeCards/85-xtiXLbY-S04E07-InYourFootsteps.jpg",
    "/episodeCards/86-1yggSPP-S04E08-HugWolf.jpg",
    "/episodeCards/87-sOG17Hy-S04E09-PrincessMonsterWife.jpg",
    "/episodeCards/88-uCxHTf5-S04E10-Goliad.jpg",
    "/episodeCards/89-wrIyxul-S04E11-BeyondThisEarthlyRealm.jpg",
    "/episodeCards/90-2VcIUHT-S04E12-Gotcha!.jpg",
    "/episodeCards/91-e20F5DP-S04E13-PrincessCookie.jpg",
    "/episodeCards/92-LW7jvGb-S04E14-CardWars.jpg",
    "/episodeCards/93-qPCum1w-S04E15-SonsOfMars.jpg",
    "/episodeCards/94-WHzrflA-S04E16-BurningLow.jpg",
    "/episodeCards/95-l21aRFH-S04E17-BMONoire.jpg",
    "/episodeCards/96-Pfb5kLP-S04E18-KingWorm.jpg",
    "/episodeCards/97-VHXouKE-S04E19-Lady&Peebles.jpg",
    "/episodeCards/98-DfaPaWq-S04E20-YouMadeMe.jpg",
    "/episodeCards/99-hrJHRnC-S04E21-WhoWouldWin.jpg",
    "/episodeCards/100-bbIkGKD-S04E22-IgnitionPoint.jpg",
    "/episodeCards/101-SKha3Hv-S04E23-TheHardEasy.jpg",
    "/episodeCards/102-hOgMesU-S04E24-ReignOfGunters.jpg",
    "/episodeCards/103-iTiqMgo-S04E25-IRememberYou.jpg",
    "/episodeCards/104-Y7kO7AA-S04E26-TheLich.jpg",
    "/episodeCards/105-kmePAUy-S05E01-FinnTheHuman.jpg",
    "/episodeCards/106-f64QuKP-S05E02-JakeTheDog.jpg",
    "/episodeCards/107-MvcUd0N-S05E03-FiveMoreShortGraybles.jpg",
    "/episodeCards/108-G6dHxgi-S05E04-UpATree.jpg",
    "/episodeCards/109-4awA1N6-S05E05-AllTheLittlePeople.jpg",
    "/episodeCards/110-L5zi6uh-S05E06-JakeTheDad.jpg",
    "/episodeCards/111-HgHcmh9-S05E07-Davey.jpg",
    "/episodeCards/112-wBYrELo-S05E08-MysteryDungeon.jpg",
    "/episodeCards/113-fVY2Sb3-S05E09-AllYourFault.jpg",
    "/episodeCards/114-UB1GL3z-S05E10-LittleDude.jpg",
    "/episodeCards/115-PQLLGHg-S05E11-BadLittleBoy.jpg",
    "/episodeCards/116-P0iBDJj-S05E12-VaultOfBones.jpg",
    "/episodeCards/117-B2ezgnH-S05E13-TheGreatBirdMan.jpg",
    "/episodeCards/118-cXwd1a6-S05E14-Simon&Marcy.jpg",
    "/episodeCards/119-87HzZNw-S05E15-AGlitchIsAGlitch.jpg",
    "/episodeCards/120-PAKykD5-S05E16-Puhoy.jpg",
    "/episodeCards/121-Cml58sn-S05E17-BMOLost.jpg",
    "/episodeCards/122-I69eh49-S05E18-PrincessPotluck.jpg",
    "/episodeCards/123-xSOCEIG-S05E19-JamesBaxterTheHorse.jpg",
    "/episodeCards/124-9eJAW9M-S05E20-Shh!.jpg",
    "/episodeCards/125-MPUERbj-S05E21-TheSuitor.jpg",
    "/episodeCards/126-P9aPgc7-S05E22-ThePartysOver,IsladeSeñorita.jpg",
    "/episodeCards/127-G8fwT0k-S05E23-OneLastJob.jpg",
    "/episodeCards/128-QGxthpR-S05E24-AnotherFiveMoreShortGraybles.jpg",
    "/episodeCards/129-Fispeee-S05E25-CandyStreets.jpg",
    "/episodeCards/130-lerUUwa-S05E26-WizardsOnly,Fools.jpg",
    "/episodeCards/131-bsNj9I4-S05E27-JakeSuit.jpg",
    "/episodeCards/132-gfxxzbc-S05E28-BeMore.jpg",
    "/episodeCards/133-Xi5Dpm7-S05E29-SkyWitch.jpg",
    "/episodeCards/134-cym2NGW-S05E30-Frost&Fire.jpg",
    "/episodeCards/135-zccYf0o-S05E31-TooOld.jpg",
    "/episodeCards/136-PPHuXX9-S05E32-Earth&Water.jpg",
    "/episodeCards/137-t00WkkF-S05E33-TimeSandwich.jpg",
    "/episodeCards/138-eSwHC8D-S05E34-TheVault.jpg",
    "/episodeCards/139-U5tznXF-S05E35-LoveGames.png",
    "/episodeCards/140-ZqIl3xV-S05E36-DungeonTrain.png",
    "/episodeCards/141-ydkuWr4-S05E37-BoxPrince.png",
    "/episodeCards/142-m87vA6l-S05E38-RedStarved.png",
    "/episodeCards/143-JXSfWN7-S05E39-WeFixedATruck.jpg",
    "/episodeCards/144-okc42kr-S05E40-PlayDate.jpg",
    "/episodeCards/145-gkOoTc1-S05E41-ThePit.jpg",
    "/episodeCards/146-lqp8DS9-S05E42-James.jpg",
    "/episodeCards/147-Iut3tV0-S05E43-RootBeerGuy.jpg",
    "/episodeCards/148-TOE4L5e-S05E44-AppleWedding.jpg",
    "/episodeCards/149-Bjm59KI-S05E45-BladeOfGrass.jpg",
    "/episodeCards/150-n67cxcm-S05E46-Rattleballs.jpg",
    "/episodeCards/151-wVpKrkz-S05E47-TheRedThrone.jpg",
    "/episodeCards/152-SrC1UaK-S05E48-Betty.jpg",
    "/episodeCards/153-HOCjIpR-S05E49-BadTiming.jpg",
    "/episodeCards/154-Z8Z2EeR-S05E50-Lemonhope-PartOne.jpg",
    "/episodeCards/155-CtHeRHw-S05E51-Lemonhope-PartTwo.jpg",
    "/episodeCards/156-TuA4HDW-S05E52-BillysBucketList.jpg",
    "/episodeCards/157-PpfqSOG-S06E01-WakeUp.jpg",
    "/episodeCards/158-ge9hcjl-S06E02-EscapeFromTheCitadel.jpg",
    "/episodeCards/159-OPMtCtB-S06E03-JamesII.jpg",
    "/episodeCards/160-ds9n5Vn-S06E04-TheTower.jpg",
    "/episodeCards/161-cJcpsVs-S06E05-SadFace.jpg",
    "/episodeCards/162-KhT2zpo-S06E06-Breezy.jpg",
    "/episodeCards/163-ImE5Bas.jpg",
    "/episodeCards/164-kgJUaDl.jpg",
    "/episodeCards/165-wcfjwMw.jpg",
    "/episodeCards/166-x42qkTW.jpg",
    "/episodeCards/167-f8nunQF.jpg",
    "/episodeCards/168-5bBbuPg.jpg",
    "/episodeCards/169-cfpSPt7.jpg",
    "/episodeCards/170-CYwPoEe.jpg",
    "/episodeCards/171-srIP6Z1.jpg",
    "/episodeCards/172-mPM4M7Z.jpg",
    "/episodeCards/173-YYBLKE7-S06E17-GhostFly.jpg",
    "/episodeCards/174-lBH2RCi-S06E18-EverythingsJake.jpg",
    "/episodeCards/175-Usm5n3K-S06E19-IsThatYou.jpg",
    "/episodeCards/176-2MGDK82-S06E20-JakeTheBrick.jpg",
    "/episodeCards/177-cahlhbd-S06E21-Dentist.jpg",
    "/episodeCards/178-iLaWKTS-S06E22-TheCooler.jpg",
    "/episodeCards/179-7FWtvE3-S06E23-ThePajamaWar.jpg",
    "/episodeCards/180-lb8Bey3-S06E24-Evergreen.jpg",
    "/episodeCards/181-yPYCamw-S06E25-AstralPlane.jpg",
    "/episodeCards/182-b16IJxa-S06E26-GoldStars.jpg",
    "/episodeCards/183-ZqV7bx3-S06E27-TheVisitor.jpg",
    "/episodeCards/184-DosQvDA-S06E28-TheMountain.jpg",
    "/episodeCards/185-A5a2Hkn-S06E29-DarkPurple.jpg",
    "/episodeCards/186-mX1ung9-S06E30-TheDiary.jpg",
    "/episodeCards/187-v18T2qx-S06E31-Walnuts&Rain.jpg",
    "/episodeCards/188-E4GL859-S06E32-FriendsForever.jpg",
    "/episodeCards/189-thim6Zl-S06E33-Jermaine.jpg",
    "/episodeCards/190-7b8xmoB-S06E34-ChipsAndIceCream.jpg",
    "/episodeCards/191-rOs31HR-S06E35-Graybles1000+.jpg",
    "/episodeCards/192-LaL0UVJ-S06E36-Hoots.jpg",
    "/episodeCards/193-dzoEdfW-S06E37-WaterParkPrank.jpg",
    "/episodeCards/194-vszs471-S06E38-YouForgotYourFloaties.jpg",
    "/episodeCards/195-Ik4L4kG-S06E39-BeSweet.jpg",
    "/episodeCards/196-N4npvYy-S06E40-Orgalorg.jpg",
    "/episodeCards/197-Y00PJwj-S06E41-OnTheLam.jpg",
    "/episodeCards/198-n15gRv8-S06E42-HotDiggityDoom.jpg",
    "/episodeCards/199-pwQzRZd-S06E43-TheComet.jpg",
    "/episodeCards/200-IrcyTjm-S07E01-BonnieAndNeddy.jpg",
    "/episodeCards/201-e7KscBH-S07E02-Varmints.jpg",
    "/episodeCards/202-aBufyhw-S07E03-CherryCreamSoda.jpg",
    "/episodeCards/203-LzxZlyA-S07E04-MamaSaid.jpg",
    "/episodeCards/204-V9wGlL0-S07E05-Football.jpg",
    "/episodeCards/205-BDk8u7e-S07E06-MarcelineTheVampireQueen.jpg",
    "/episodeCards/206-gIp9Nlt-S07E07-EverythingStays.jpg",
    "/episodeCards/207-QNKIITF-S07E08-VampsAbout.jpg",
    "/episodeCards/208-qLyjD56-S07E09-TheEmpressEyes.jpg",
    "/episodeCards/209-UlorD7v-S07E10-MayIComeIn.jpg",
    "/episodeCards/210-LNdVAgQ-S07E11-TakeHerBack.jpg",
    "/episodeCards/211-4dsbkB6-S07E12-Checkmate.jpg",
    "/episodeCards/212-FunXQJv-S07E13-TheDarkCloud.jpg",
    "/episodeCards/213-Zb6ZE3E-S07E14E15-TheMoreYouMoe.jpg",
    "/episodeCards/214-iXyDwZx-S07E16-SummerShowers.jpg",
    "/episodeCards/215-nJUwmoi-S07E17-AngelFace.jpg",
    "/episodeCards/216-oryJCmk-S07E18-PresidentPorpoiseIsMissing!.jpg",
    "/episodeCards/217-wOfR4E7-S07E19-Blank-EyedGirl.jpg",
    "/episodeCards/218-eDFgjrR-S07E20-BadJubies.jpg",
    "/episodeCards/219-cpjdm2v-S07E21-KingsRansom.jpg",
    "/episodeCards/220-QFLWQ3x-S07E22-Scamps.jpg",
    "/episodeCards/221-pFzOvGh-S07E23-Crossover.jpg",
    "/episodeCards/222-vPqaEPf-S07E24-TheHallOfEgress.jpg",
    "/episodeCards/223-BU5dQPS-S07E25-FluteSpell.jpg",
    "/episodeCards/224-QJPXZtD-S07E26-TheThinYellowLine.jpg",
    "/episodeCards/225-ksrjtyD-S08E01-BrokeHisCrown.jpg",
    "/episodeCards/226-fn4Ewg7-S08E02-Don'tLook.jpg",
    "/episodeCards/227-103OzUM-S08E03-BeyondTheGrotto.jpg",
    "/episodeCards/228-ULjLdgM-S08E04-LadyRainicormOfTheCrystalDimension.jpg",
    "/episodeCards/229-GTJMWLO-S08E05-IAmASword.jpg",
    "/episodeCards/230-YAFXzle-S08E06-BunBun.jpg",
    "/episodeCards/231-E8Qn5t1-S08E07-NormalMan.jpg",
    "/episodeCards/232-1h2GsGj-S08E08-Elemental.jpg",
    "/episodeCards/233-zmnrVw5-S08E09-FiveShortTables.jpg",
    "/episodeCards/234-lpmO8ps-S08E10-TheMusicHole.jpg",
    "/episodeCards/235-k3cmYfD-S08E11-Daddy-DaughterCardWars.jpg",
    "/episodeCards/236-X1L7csr-S08E12-Preboot.jpg",
    "/episodeCards/237-QrEyFVZ-S08E13-Reboot.jpg",
    "/episodeCards/238-dLdZZMH-S08E14-TwoSwords.jpg",
    "/episodeCards/239-eA3wmYr-S08E15-DoNoHarm.jpg",
    "/episodeCards/240-9i6XHWL-S08E16-Wheels.jpg",
    "/episodeCards/241-YK7eosM-S08E17-HighStrangeness.jpg",
    "/episodeCards/242-9rQ3mQG-S08E18-HorseAndBall.jpg",
    "/episodeCards/243-26hWSQG-S08E19-JellyBeansHavePower.jpg",
    "/episodeCards/244-1vNemYZ-S08E20-TheInvitation.jpg",
    "/episodeCards/245-kIsMLIQ-S08E21-WhippleTheHappyDragon.jpg",
    "/episodeCards/246-ELycldD-S08E22-MysteriousIsland.jpg",
    "/episodeCards/247-C4ljZ7B-S08E23-ImaginaryResources.jpg",
    "/episodeCards/248-KxhLPvw-S08E24-HideAndSeek.jpg",
    "/episodeCards/249-T1fW7dy-S08E25-MinAndMarty.jpg",
    "/episodeCards/250-T69P0q8-S08E26-Helpers.jpg",
    "/episodeCards/251-9gnf9ym-S08E27-TheLightCloud.jpg",
    "/episodeCards/252-46Wrsqk-S09E01-Orb.jpg",
    "/episodeCards/253-cK8yF7b-S09E02-Skyhooks.jpg",
    "/episodeCards/254-rKx7nVX-S09E03-BespokenFor.jpg",
    "/episodeCards/255-FbSetw0-S09E04-WinterLight.jpg",
    "/episodeCards/256-6OBPxH7-S09E05-Cloudy.jpg",
    "/episodeCards/257-pvIDLqn-S09E06-SlimeCentral.jpg",
    "/episodeCards/258-D3kNnuD-S09E07-HappyWarrior.jpg",
    "/episodeCards/259-gpcGzlr-S09E08-HeroHeart.jpg",
    "/episodeCards/260-QAFCYoh-S09E09-SkyhooksII.jpg",
    "/episodeCards/261-GmOxNJj-S09E10-Abstract.jpg",
    "/episodeCards/262-4YBdoiy-S09E11-Ketchup.jpg",
    "/episodeCards/263-6RWzy6T-S09E12-FionnaAndCakeAndFionna.jpg",
    "/episodeCards/264-Cll5TvH-S09E13-Whispers.jpg",
    "/episodeCards/265-uDUupwk-S09E14-ThreeBuckets.jpg",
    "/episodeCards/266-JYUHBkW-S10E01-TheWildHunt.jpg",
    "/episodeCards/267-VWSef6q-S10E02-AlwaysBMOClosing.jpg",
    "/episodeCards/268-QhRFhaO-S10E03-SonOfRapBear.jpg",
    "/episodeCards/269-A5vzCzT-S10E04-BonnibelBubblegum.jpg",
    "/episodeCards/270-rnC7PMK-S10E05-Seventeen.jpg",
    "/episodeCards/271-50PcW8P-S10E06-RingOfFire.jpg",
    "/episodeCards/272-8mzqu88-S10E07-Marcy&Hunson.jpg",
    "/episodeCards/273-o86e0QD-S10E08-TheFirstInvestigation.png",
    "/episodeCards/274-REEaxrT-S10E09-Blenanas.jpg",
    "/episodeCards/275-76J2y9R-S10E10-JakeTheStarchild.jpg",
    "/episodeCards/276-5Llsggu-S10E11-TempleOfMars.jpg",
    "/episodeCards/277-3lTsN1d-S10E12-Gumbaldia.jpg",
    "/episodeCards/278-xS0KjFt-S10E13-Diamonds&Lemons.jpg",
    "/episodeCards/279-XC5c8aP-S10E14-ComeAlongWithMe.jpg"
];

const fileRenaming = () => {
    fs.readdirSync('../public/episodeCards').forEach(file => {
        let index = '';
        for (let i = 0; i < file.length; i++) {
            if (file.charAt(i) === ' ') {
                break;
            }
            index += file.charAt(i);
        }
        console.log("../public/episodeCards/" + file, "../public" + episodeCardPaths[index - 1]);
        fs.rename("../public/episodeCards/" + file, "../public" + episodeCardPaths[index - 1], (error) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log("\nFile Renamed\n");
                console.log(file, episodeCardPaths[index - 1]);
            }
        });
    });
}


const insertCardPaths = async () => {
    try {
        let indexModifier = 1
        for (let i = 0; i <= episodeCardPaths.length; i++) {
            const cardName = episodeCardPaths[i];
            const onlyDuplicate = "/episodeCards/213-Zb6ZE3E-S07E14E15-TheMoreYouMoe.jpg"

            const cardQuery = {
                text: 'UPDATE episodes SET episode_card_path = $1 WHERE episode_id = $2 RETURNING episode_card_path;',
                values: [cardName, i + indexModifier],
            };
            let result = await query(cardQuery.text, cardQuery.values);
            console.log('data inserted: ', result.rows[0]);
            if (cardName == onlyDuplicate) {
                indexModifier += 1;
                let result = await query(cardQuery.text, cardQuery.values);
                console.log('data inserted: ', result.rows[0]);
            }
        }
    } catch (error) {
        console.error('Error inserting data', error);
    }
};

