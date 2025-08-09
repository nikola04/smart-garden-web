export function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    return date.toLocaleString('en-US', options);
}

export function timeElapsed(date: Date): {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds: number;
} {
    const elapsedSec = Math.floor((Date.now() - date.getTime()) / 1000);

    const days = Math.floor(elapsedSec / 86400); // 24*60*60
    const hours = Math.floor((elapsedSec % 86400) / 3600);
    const minutes = Math.floor((elapsedSec % 3600) / 60);
    const seconds = elapsedSec % 60;

    const result: {
        days?: number;
        hours?: number;
        minutes?: number;
        seconds: number;
    } = { seconds };

    if (days > 0) result.days = days;
    if (hours > 0) result.hours = hours;
    if (minutes > 0) result.minutes = minutes;

    return result;
}

export function formatTimeElapsedString(date: Date): string {
    const elapsed = timeElapsed(date);

    if (elapsed.days){
        const hoursString = `${elapsed.hours ?? 0} hour${(elapsed.hours ?? 0) !== 1 ? 's' : ''}`;
        return `${elapsed.days} day${elapsed.days > 1 ? 's' : ''} ${(elapsed.hours ?? 0) > 0 ? hoursString : ''} ago`;
    }

    if (elapsed.hours){
        const minutesString = `${elapsed.minutes ?? 0} minutes${(elapsed.minutes ?? 0) !== 1 ? 's' : ''}`;
        return `${elapsed.hours} hour${elapsed.hours > 1 ? 's' : ''} ${(elapsed.minutes ?? 0) > 0 ? minutesString : ''} ago`;
    }

    if (elapsed.minutes)
        return `${elapsed.minutes} min${elapsed.minutes > 1 ? 's' : ''} ago`;

    return `Just now`
}
