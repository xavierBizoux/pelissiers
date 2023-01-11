const data = {
    "FR": {
        "E00000": "Les données ont été sauvées!",
        "E00001": "Un utilisateur avec ce nom et ce prénom existe déjà.",
        "E00002": "Un utilisateur utilise déjà cette addresse e-mail.",
        "E00003": "L'utilisateur a bien été supprimé.",
        "E00004": "Le rôle a été supprimé pour cette partition.",
        "E00005": "La partition et les rôles liés ont été supprimés.",
        "E00006": "Le rôle a été supprimé.",
        "E00007": "L'éditeur a été supprimé.",
        "E00008": "La personne a été supprimée.",
        "E00009": "Le propriétaire a été supprimé.",
        "E00010": "L'utilisateur ou le mot de passe sont incorrects!",
        "E00011": "La requête ne contient pas de token!",
        "E00012": "Accès refusé!",
        "E00013": "Ce propriétaire existe déjà!",
        "E00014": "La validation a échoué.",
    }
}
const intErrorMessages = (lang, code) => {
    return data[lang][code]
}

export default intErrorMessages