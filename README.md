Ca sa adaugati components:
  1. Creati in stylesSass/modules fisierul pentru stilul componentei respective si la nume puneti _ in fata. Ex: _card.scss.
  2. In stylesSass/modules/_index.scss faceti import la fisier. Ex: @import './card';
  * fisierele cu _ in fata se numesc partials in sass, daca vreti sa cititi mai mult. Efectiv ele vor fi importate o singura data
  indiferent de cat de des sunt importate.
Haideti pt fiecare task sa facem cate un branch cu numele task-ului, sau cate un branch de persoana, 
ca sa fie mai usor sa facem tracking. Si sa facem push pe branch-ul respectiv, nu pe master. Dupa facem merge.
Numele sa fie de ex: cardComponent
