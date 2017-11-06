export function randomFromArray(arr, existing){
    if(!arr.length || arr.length === 0)
        return null;
    existing = existing || [];
    var item;
    do{
        item = arr[randomIntRange(0, arr.length)];
    }
    while(existing.indexOf(item) !== -1)
    return item;
}

var names = [
    'Barthélémy', 'Célestin', 'Antonin', 'Emery', 'Edmond', 'Auguste', 'Albertin', 'Basile', 'Hector', 'Mathurin', 'Octave', 'Roméo', 'Prospère', 'Aristide', 'Ernest', 'Oscar', 'Gaspard', 'Léopold', 'Gédéon', 'Nestor', 'Eugène', 'Philémon', 'Albin', 'Gaston', 'Gildas', 'Hubert', 'Florimond', 'Romuald', 'Zébulon', 'Innocent', 'Zéphirin', 'Gustave', 'Arthurin', 'Félix', 'Léonard', 'Gontrand', 'Philémond', 'Isidore', 'Zacharie', 'Alphonse', 'Emery', 'Horace', 'Rupert', 'Théophile', 'Théodule', 'Valère', 'Côme', 'Léon', 'Mortimer', 'Placide', 'Abéline', 'Florette', 'Isolde', 'Perrine', 'Blanche', 'Philémone', 'Rosalie', 'Dahlia', 'Yvoline', 'Anastasie', 'Hermine', 'Nellie', 'Yacinthe', 'Corantine', 'Blondine', 'Emeline', 'Marguerite', 'Lorine', 'Bérénisse', 'Guillemette', 'Valériane', 'Appoline', 'Jéméline', 'Marceline', 'Rosie', 'Adélina', 'Louisette', 'Sélénie', 'Prudence', 'Cybelle', 'Lorette', 'Mélusine', 'Linette', 'Ludmilla', 'Constance', 'Joalie', 'Georgelle', 'Berthilde', 'Eugénie', 'Rosette', 'Emerise', 'Ernestine', 'Violette', 'Madeleine', 'Gloria', 'Bélinda', 'Zéphirine', 'Irma', 'Dulcina', 'Blandine'
];
export function randomName(existing){
    return randomFromArray(names, existing);
}

var colors = [
    '#000', '#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f'
];
export function randomColor(existing){
    return randomFromArray(colors, existing);
}

export function randomIntRange(min, max){
    return Math.floor(randomRange(min, max));
}

export function randomRange(min, max){
    return Math.random() * (max - min) + min;
}

export function hexToRgb(color){
    if(typeof color !== 'string')
        throw new Error('Color not type of string');
    if(color.indexOf('#') === 0)
        color.splice(0, 1);
    if(color.length === 3)
        return [parseInt(color[0]+color[0], 16), parseInt(color[1]+color[1], 16), parseInt(color[2]+color[2], 16)];
    else if(color.length === 6)
        return [parseInt(color[0]+color[1], 16), parseInt(color[2]+color[3], 16), parseInt(color[4]+color[5], 16)];
    return [0,0,0];
}

export function textColorContrast(color){
    var rgb = hexToRgb(color);
    if((rbg[0] + rgb[1] + rgb[2]) / 3 > 128)
        return '#000';
    return '#fff';
}
