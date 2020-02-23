function FormatDateFunction(newDate) {
    const months = {
        '0': 'ene',
        '1': 'feb',
        '2': 'mar',
        '3': 'abr',
        '4': 'may',
        '5': 'jun',
        '6': 'jul',
        '7': 'ago',
        '8': 'sep',
        '9': 'oct',
        '10': 'nov',
        '11': 'dic'
    }
    return newDate.getDate() + " " + months[newDate.getMonth()+""] + " " + newDate.getFullYear(); 
}

export default FormatDateFunction;