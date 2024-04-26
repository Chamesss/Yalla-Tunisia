export function formatString(ch: string) {
    let ch1 = ch.trim()
    ch1 = ch1.charAt(0).toUpperCase() + ch1.slice(1);
    return ch1;
}