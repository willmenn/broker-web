export const convertEnglishDaysToPtBr = function (day) {
    let en_day = {
        "MON": "Segunda",
        "TUE": "Terça",
        "WED": "Quarta",
        "THU": "Quinta",
        "FRI": "Sexta",
        "SAT": "Sábado",
        "SUN": "Domingo"
    }
    return en_day[day];
}

export const convertDayPtBrToEnglish = function (day) {
    let pt_day = {
        "Segunda": "MON",
        "Terça": "TUE",
        "Quarta": "WED",
        "Quinta": "THU",
        "Sexta": "FRI",
        "Sábado": "SAT",
        "Domingo": "SUN"
    }
    return pt_day[day];
}

export const convertShiftPtBrToEnglish = function (day) {
    let pt_shift = {
        "Manhã": "MORNING",
        "Tarde": "AFTERNOON",
        "Noite": "NIGHT"
    }
    return pt_shift[day];
}