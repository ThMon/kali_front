export function isValidDateFenchDate(dateString: string):boolean {
    // Expression régulière pour vérifier le format dd/mm/yyyy
    var regex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(dateString);
}

export function convertDateFrenchToUsa(inputDate: string): string {
    var parts = inputDate.split("/");
    // Vérification du format de la date d'entrée
    if (parts.length !== 3 || parts[0].length !== 2 || parts[1].length !== 2 || parts[2].length !== 4) {
        return "Format de date d'entrée incorrect. Utilisez le format dd/mm/yyyy.";
    }
    var day = parts[0];
    var month = parts[1];
    var year = parts[2];
    // Construction de la date au format yyyy-mm-dd
    var outputDate = year + "-" + month + "-" + day;
    return outputDate;
}
