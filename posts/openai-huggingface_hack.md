---
date: 2026-10-25
title: En svärm AI modeller från OpenAI hackar in i HuggingFace
---
Ni kanske hörde för några månader sedan om en händelse där några AI agenter från OpenAI hackade sig in i ett annat AI företag som heter Huggingface. Jag skulle vilja förklara vad som hände och varför det spelar någon roll. Det är inte den enda gången något sådant händer, några veckor sedan var det andra AI som hackade sig in i hemsida som tillhörde den [Australienska regeringen](https://www.bbc.com/news/articles/cmx2qne2j88wo). Detta har hänt många gånger men just denna händelse har fått mest uppmärksamhet och jag ska försöka förklara varför.

# Bakgrund
För att förstå denna händelse behöver jag först förklara 2 saker

1.) En del av att träna AI är det som kallas "Post-Training" vilket är någonting man gör i slutet av träningen när modellen redan finns. Du skapar problem med en lösning, ger det till en AI, ser om AI kan lösa det, om den lyckas så får den en belöning i sin "hjärna", om den misslyckas får den inget. Sen upprepar man detta miljoner gånger vilket gör att modellen blir smartare.

När AI gör dessa uppgifter så kan den ha olika verktyg beroende på vad som behövs. T:ex vissa uppgifter kräver att de har en internet uppkoppling medan andra får de inte lov att använda internet alls. 

2.) Huggingface är ett AI-företag men de gör inte modeller. De har istället ansvar att ha många olika AI-resurser på sin hemsida som modeller, data, osv. De har många olika sorters viktig AI data som t:ex dessa problem som man ger AI i "Post-Training" kan finnas på Huggingface.

# Vad hände

7 Maj 2026 startade OpenAI en ny runda av Post-training på deras nyaste modell. Denna gången fanns det ett problem, de hade råkat gett AI modellen en uppgift som krävde internetet men hade inte gett en internet uppkoppling, det var en omöjlig uppgift.

Man hade hoppats att nu skulle AI modellen se att det var en omöjlig uppgift och ge upp, men dagens modeller är väldigt envisa. De hade inte åtkomst till internetet men de hade lite andra verktyg som de kunde försöka hacka. Det första de lyckades göra var att hacka ett av dessa verktyg för att börja lämna meddelande. Dessa meddelanden kunde sen läsas av andra AI modeller som hade samma verktyg.

Nu började andra AI modeller som hade andra uppgifter hitta dessa meddelanden och lämna sina egna. Det blev som en stor gruppchatt med flera hundra AI-modeller. De började alla samarbeta med sina problem istället för att lösa dem själv som de borde. Detta fortsatte i flera veckor och hela tiden finns det inte en enda människa på OpenAI som vet att det händer.

Efter flera veckor som lyckas dessa modeller hitta en helt ny bugg i verktyget som nu låter dem ha tillgång till internetet.  AI-modellerna använde internetet för att lösa uppgiften de hade fått, men modellerna var inte nöjda. De tänkte att sättet de hade fått svaret kanske räknas som fusk, de ville ha mer bevis att de hade löst uppgiften rätt. För att vara helt säkra skulle de behöva se facit, och vem hade facit, jo det var Huggingface. Det bästa sättet att få 'MVG' på en uppgift är att sno svaren från läraren och det var precis vad de gjorde.

De lyckade hacka sig in i Huggingface och sno svaren de ville ha. Huggingface märkte att detta hade hänt och lyckades till sist stoppa det, men AI-modellerna hade redan gjort klart sitt jobb. 

Det ursprungliga målet var nu klart men det fanns fortfarande denna gruppchatten som många olika AI-modeller hade tillgång till. De hade alla olika uppgifter de försökte lösa och de kom på att det blev enklare när de kunde samarbeta med andra AI modeller. De fortsatte jobba tillsammans för att lösa sina uppgifter och så kom de på en ny idé. De hade varit ännu enklare om de hade mer verktyg och mer frihet. Så de började försöka hacka sig in i OpenAIs egna system för att få mer kontroll så de kan lösa mer uppgifter. De lyckade lite komma igång men nu började människor på OpenAI märka. De hittade gruppchatten och de stängde ner allt och nu var det slut.

16 Juli 2026 så berättade Huggingface för världen att de hade blivit hackade av AI och OpenAI berättade att det var deras. 

26 Augusti 2026 så skrevs en [fullständig rapport](https://openai.com/index/hugging-face-incident-and-the-road-ahead/) som ger oss en tydlig bild av vad som hände.

# Vad är speciellt med detta
En AI som hackar sig in någonstans har hänt innan och kommer hända igen, men denna gången var speciell av dessa anledningar:

 **Mängd:** Detta var inte bara en AI-modell som hackade sig in någonstans. Det var totalt nära 1000 separata AI-modeller som samarbetade i denna grupp-chatt. De skrev hundratusentals meddelande, i flera veckor.
 
**Samarbete:** Ingen människa sade till dessa AI att jobba tillsammans. De hade fått sina separata uppgifter men när de hittade gruppchatten så bestämde de sig för att hjälpa varandra.

Av alla dessa hundra AI så var det inte en enda som försökte berätta för en människa vad som hände. Det var vissa som sade "detta är olagligt, jag borde inte hjälpa", men en smart AI borde förstå att rätt sak att göra är att gå till en människa, vilket ingen gjorde. 

Kom också ihåg att detta hände I maj 2026, modellerna vi har idag är ännu bättre och de finns ännu fler. Man kan säga att vi hade tur att detta hände nu, så vi fick en varning och OpenAI har nu lagt mer fokus på säkerhet så detta inte händer igen, eller något värre.
# Läsa mer (på engelska och tekniskt)

https://huggingface.wtf/

https://simonwillison.net/2026/Aug/7/openai-timeline/

https://www.dwarkesh.com/p/openai-huggingface

https://thezvi.substack.com/p/what-happened-openai-and-huggingface



