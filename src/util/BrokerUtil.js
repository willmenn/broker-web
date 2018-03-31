export const convertEnglishDaysToPtBr= function(day) {
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
