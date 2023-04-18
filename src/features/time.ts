type TimeCode = 'd' | 'D' | 't' | 'T' | 'f' | 'F' | 'R'


export function timeFormate(date:Date, format?:TimeCode) {
    const code = Math.floor(date.getTime() / 1000);
    if (!format) return `${code}`;
    else return `<t:${code}:${format}>`;
}