# Conception-des-sites-web-dynamiques

LOG4420 – Conception de sites web dynam. et transact.
Travail pratique 1
Chargé de laboratoire:
Antoine Béland
Automne 2017
Département de génie informatique et de génie logiciel
1 Objectifs
Le but de ce travail pratique est de vous familiariser avec HTML5.
Plus particulièrement, vous allez élaborer la structure de pages web tout en respectant la
structure sémantique apportée par HTML5. De plus, vous allez mettre en place l’interaction
entre les différentes pages à l’aide des hyperliens.
2 Introduction
Tout au long de la session, vous aurez à réaliser un site web transactionnel permettant
l’achat de produits électronique. Pour y arriver, les différents travaux pratiques à réaliser
dans le cadre du cours intégreront plusieurs notions pour obtenir un site web complètement
fonctionnel à la fin de la session. Ainsi, le code que vous écrirez sera réutilisé lors des travaux
pratiques suivants. Si vous n’êtes pas satisfait de votre remise ou que vous souhaitez partir du
bon pied, vous pouvez utiliser le corrigé qui sera fourni au début du prochain travail pratique.
Un site web d’achat en ligne comporte plusieurs composants classiques. En effet, ce genre
de site comporte systématiquement une page pour afficher les produits disponibles pour une
certaine catégorie, une page qui détaille un produit en particulier, une page pour afficher
les produits qui ont été ajoutés au panier d’achats, ainsi qu’une page pour commander les
produits sélectionnés. Le site web de commerce en ligne Amazon intègre d’ailleurs toutes
les pages qui ont été décrites. Par ailleurs, ce genre de site intègre également une partie
administrative (CMS) qui permet de gérer les produits à afficher et les commandes reçues.
3 Travail à réaliser
Pour ce travail pratique, vous devez élaborer la structure des pages HTML5 qui composeront
votre site web transactionnel. La structure attendue pour une page est d’ailleurs
illustrée à la figure 1. Cette structure devra être définie à l’aide des balises sémantiques de
HTML5, soient les balises « header », « nav », « main », et « footer ». Les sous-sections qui
suivent décrivent les différentes pages à réaliser.
Il est à noter que seule la structure HTML du site sera évaluée. Les fichiers HTML ne
doivent contenir aucun élément de mise en page (classe CSS, etc.) ni de logique (JavaScript).
Tâchez donc de vous assurer que les balises correspondent à la fonction de leur contenu.
1
Avant de débuter, assurez-vous d’avoir récupéré l’archive associée à ce travail pratique
sur Moodle. Celle-ci contient les fichiers HTML à compléter ainsi que des images à inclure
dans les pages.
Pied de page
LOGO Accueil Produits Contact Panier
Contenu principal
Entête Menu
Figure 1 – Maquette d’une page web
3.1 Entête
Chacune des pages du site web doit contenir un entête. L’entête doit être composé du logo
du site (assets/img/logo.svg) qui comporte un lien vers la page d’accueil (index.html) et
d’un menu de navigation qui inclut les éléments suivants :
— Accueil (index.html) ;
— Produits (products.html) ;
— Contact (contact.html) ;
— Panier (shopping-cart.html).
2
3.2 Pied de page
Tout comme pour l’entête, chacune des pages du site web doit contenir un pied de page. Ce
dernier doit contenir les informations de votre équipe, soit le nom, le prénom et le matricule
de chacun des membres.
3.3 Page d’accueil (index.html)
La page d’accueil est la page d’entrée de votre site web. Celle-ci comprend un titre, un
petit paragraphe décrivant le site ainsi qu’un lien vers la page qui liste les produits disponibles
(products.html). Également, cette page doit inclure une image (assets/img/home.png).
3.4 Page des produits (products.html)
La page des produits affiche les différents produits disponibles dans l’inventaire de la
boutique en ligne. Cette page est composée d’une barre latérale (sidebar ) ainsi que d’un
panneau principal. Par souci de clarté, la figure 2 illustre les différents éléments de la page
qui sont discutés ci-dessous. Il est à noter que cette figure ne représente pas le rendu que
vous allez obtenir, puisque vous n’avez aucune feuille de style associée avec votre page.
3.4.1 Barre latérale
La barre latérale contient deux groupes de boutons (voir ce lien). Un des groupes de boutons
permet de sélectionner une catégorie de produits à afficher, alors que l’autre permet de
trier les produits selon un ordre particulier. Le groupe de boutons permettant de sélectionner
une catégorie doit posséder l’identifiant « product-categories » (id="product-categories").
De plus, celui permettant de trier les produits selon un critère particulier doit posséder l’identifiant
« product-criteria » (id="product-criteria").
Les catégories de produits sont les suivantes :
— Appareils photo ;
— Consoles ;
— Écrans ;
— Ordinateurs ;
— Tous les produits (valeur par défaut).
3
Barre latérale Panneau principal
Produits
Produit 1
Prix
IMAGE
Produit 2
Prix
IMAGE
Produit 3
Prix
IMAGE
Lien
Catégories
Classement
Produit 4
Prix
IMAGE
Produit 5
Prix
IMAGE
Produit 6
Prix
IMAGE
6 produits
Tous les produits
Écrans
Ordinateurs
Consoles
Appareils photo
Nom (A-Z)
Nom (Z-A)
Prix (haut-bas)
Prix (bas-haut)
Figure 2 – Maquette de la page des produits
Les critères de tri des produits sont quant à eux les suivants :
— Prix (bas-haut) (valeur par défaut) ;
— Prix (haut-bas) ;
— Nom (A-Z) ;
— Nom (Z-A).
3.4.2 Panneau principal
Le panneau principal de la page permet l’affichage des produits. Chacun des produits
listés sur cette page doit afficher son nom (doit être un élément de titre), son image associée
ainsi que son prix. Également, les produits listés doivent être cliquables, c’est-à-dire qu’ils
doivent contenir un lien vers la page d’un produit (product.html). Ainsi, le lien doit englober
le titre, l’image et le prix de chacun des produits. De plus, la liste des produits doit possé-
der l’identifiant « products-list » (id="products-list") ; assurez-vous donc de définir un
élément qui permet de regrouper les différents produits listés.
4
En plus de lister les produits, un titre doit être présent dans le panneau principal. Également,
un élément doit être inclus afin d’indiquer le nombre de produits actuellement affichés
sur la page (p. ex. « 6 produits »).
! Notez bien
Afin de vous simplifier la tâche, une liste de produits vous est fournie dans le fi-
chier products.json (voir le dossier data/). Pour ce travail, il vous est demandé
de lister uniquement six produits sur cette page. Utilisez également les images des
produits qui vous sont fournies dans le dossier assets/img.
3.5 Page d’un produit (product.html)
Cette page affiche un produit en particulier. En ce sens, le nom (titre), l’image, la description
(paragraphe), les caractéristiques (liste non ordonnée) ainsi que le prix sont affichés
pour un produit spécifié.
Cette page contient également un formulaire permettant d’ajouter le produit courant au
panier d’achats. Ce formulaire contient un champ pour spécifier la quantité de produits à
ajouter au panier, ayant comme valeur par défaut un et ayant comme contrainte un nombre
entier positif supérieur à zéro, ainsi qu’un bouton « Ajouter » pour réaliser l’action.
! Notez bien
Afin de vous simplifier la tâche, choisissez un produit en particulier dans la liste
de produits qui vous est fournie (data/products.json) pour réaliser la page web.
Ainsi, il n’est pas nécessaire de dupliquer cette page pour chacun des produits
disponibles pour ce travail.
3.6 Page de contact (contact.html)
Cette page affiche les différentes informations nécessaires pour contacter l’entreprise du
site web. Ainsi, cette page doit contenir un titre et des liens vers une adresse courriel et un
numéro de téléphone (voir l’attribut href). Également, cette page doit afficher l’adresse de
l’entreprise. Il est à noter que ces informations peuvent être fictives.
5
3.7 Page du panier d’achats (shopping-cart.html)
Cette page permet d’afficher les produits qui sont actuellement dans le panier d’achats.
Un tableau affiche les éléments contenus dans le panier. Ce tableau doit comporter cinq
colonnes et chaque ligne doit correspondre à un élément du panier (sauf la première qui
correspond à l’entête). Chaque ligne, en excluant la première, affiche le nom, le prix unitaire,
la quantité ainsi que le prix total pour un des produits se trouvant dans le panier. De plus, le
nom d’un produit dans le tableau comporte un lien vers la page d’un produit (product.html).
Également, chacune des lignes du tableau contient plusieurs boutons pour interagir avec un
item du panier. En ce sens, un premier bouton (« ✕ ») permettra de supprimer l’item qui lui
est associé, alors que deux autres boutons (« - » et « + ») permettront de contrôler la quantité
du produit dans le panier. Par souci de clarté, la figure 3 montre le rendu de la page attendu.
Il est à noter que le rendu peut différer en réalité puisque la page n’utilise pas de feuille de
style.
En plus du tableau, cette page dispose d’un titre et d’un élément permettant d’afficher
le total (en $) des items contenus dans le panier. De plus, cette page possède un lien appelé
« Commander » qui pointe vers la page de commande (order.html). La page possède
également un bouton appelé « Vider le panier » qui permettra de vider les produits du panier.
Panier
X
X
X
Produit Prix unitaire Quantité Prix
Produit 1
Produit 2
Produit 3
2,00 $
4,00 $
5,00 $
1
2
2
2,00 $
8,00 $
10,00 $
- +
- +
- +
Total: 20,00 $
Vider le panier Commander
Tableau
Figure 3 – Maquette de la page du panier d’achats
! Notez bien
Puisque ce travail ne met en place aucune logique pour la gestion du panier
d’achats, il vous est demandé de simuler l’affichage de trois produits qui ont été
ajoutés au panier. Vous pouvez ajouter les produits de votre choix à partir de la
liste des produits (voir data/products.json).
6
3.8 Page de commande (order.html)
Cette page contient un titre et un formulaire pour commander les produits se trouvant
dans le panier. Les champs du formulaire doivent être validés avant d’être soumis à l’aide des
attributs de HTML5 (p. ex. required). De plus, les champs du formulaire doivent utiliser les
identifiants (id="...") qui sont spécifiés ci-dessous et doivent posséder une étiquette (voir
l’élément label).
La première section du formulaire, nommée « Contact », demande des informations pour
être en mesure de contacter le client. En ce sens, cette partie doit contenir les champs suivants
et ceux-ci sont obligatoires pour la soumission du formulaire :
— Prénom (id="first-name") ;
— Nom (id="last-name") ;
— Adresse courriel (id="email") ;
— Numéro de téléphone (id="phone").
La deuxième section du formulaire, appelée « Paiement », demande les informations né-
cessaires pour effectuer la facturation. Ainsi, cette partie doit posséder les champs suivants
et ces mêmes champs sont obligatoires pour pouvoir soumettre le formulaire :
— Numéro de carte de crédit (id="credit-card") ;
— Date d’expiration de la carte (id="credit-card-expiry").
Finalement, le formulaire possède un bouton appelé « Payer » qui permet de soumettre
les informations. Lorsque le formulaire est envoyé et est complet, la page de confirmation
(confirmation.html) est affichée.
3.9 Page de confirmation (confirmation.html)
Cette page est affichée une fois qu’une commande est complétée. Celle-ci comprend un titre
et un message de confirmation afin d’indiquer à l’utilisateur que sa commande est complétée.
7
i Conseils pour la réalisation du travail pratique
1. Assurez-vous d’ajouter des titres aux sections importantes des pages.
2. Jetez un coup d’œil aux différentes balises sémantiques de HTML5 afin de vous
assurer que les éléments que vous utilisez soient bien adaptés.
3. Assurez-vous que la sémantique de votre page est correcte en la faisant valider
par l’outil de W3C.
4. Assurez-vous que votre plan de document (outline) soit valide. Voir ce site
web.
5. Effectuez une validation de vos formulaires grâce aux attributs de HTML5
(voir la section « Input Restrictions » de la page HTML Input Types).
6. Soyez consistant dans vos conventions de codage (voir guide de codage de
Mark Otto).
4 Remise
Voici les consignes à suivre pour la remise de ce travail pratique :
1. Vous devez placer votre code HTML et le dossier « assets » dans un dossier compressé
au format ZIP nommé « TP1_matricule1_matricule2.zip ».
2. Vous devrez également créer un fichier nommé « temps.txt » à l’intérieur du dossier
de votre projet. Vous indiquerez le temps passé au total pour ce travail.
3. Le travail pratique doit être remis avant 23h55, le 21 septembre 2017 sur Moodle.
Aucun retard ne sera accepté pour la remise de ce travail. En cas de retard, le travail
se verra attribuer la note de zéro. Également, si les consignes 1 et 2 concernant la remise ne
sont pas respectées, une pénalité de -5% est applicable.
8
5 Évaluation
Globalement, vous serez évalué sur la qualité de votre structure HTML. Plus précisément,
le barème de correction est le suivant :
Exigences Points
Aspect global des pages
Respect des exigences fonctionnelles de l’énoncé 10
Formulaires
Utilisation adéquate des éléments d’un formulaire 2
Validation des données entrées 2
Structure sémantique du code HTML
Utilisation adéquate des balises sémantiques 2
Validité de la sémantique de la page 2
Validité du plan du document (outline) 2
Total 20
L’évaluation se fera à partir de la page HTML initiale, soit index.html(qui correspond
à la page d’accueil). À partir de cette page, le correcteur devrait être capable de consulter
toutes les autres pages de votre site web.
Ce travail pratique a une pondération de 9% sur la note du cours.
6 Questions
Si vous avez des interrogations concernant ce travail pratique, vous pouvez poser vos
questions sur le canal #tp1 sur Slack. N’hésitez pas à poser vos questions sur ce canal afin
qu’elles puissent également profiter aux autres étudiants. De plus, vous pouvez rejoindre le
chargé de laboratoire sur Slack (@antoinebeland) si vous souhaitez lui poser une question en
privé.
9
