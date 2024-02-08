export function getRandomNumber(min: number, max: number): number {
    return (Math.floor(Math.random() * (max - min) + min));
}

export function headsOrTails(): boolean {
    return getRandomNumber(0, 100) <= 50;
}