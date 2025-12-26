export type RecordItem = {
    "Name": string
    "Year": number
    "School": string
    "Major": string
    "Scholarship Name": string
    "Scholarship Amount": number
}

export function cleanData(data: RecordItem[], year: string) {
    return data.filter(d => {
        const basicValid = d.Name && d.School;

        if (!basicValid) return false;

        if (year === 'ALL') {
            return true;
        }

        return d.Year.toString() === year; 
    });
}

export function countBySchool(data: RecordItem[]) {
    const map: Record<string, number> = {}

    data.forEach(d => {
        map[d.School] = (map[d.School] || 0) + 1
    })

    return Object.entries(map).map(([label, value]) => ({ label, value }))
}

export function countByMajorCategory(data: RecordItem[]) {
    const map: Record<string, number> = {}

    function category(major: string) {
        const m = major.toLowerCase()
        if (m.includes('computer') || m.includes('software') || m.includes('engineering')) return 'Computer / Engineering'
        if (m.includes('science') || m.includes('math') || m.includes('biology') || m.includes('health')) return 'Science'
        if (m.includes('business') || m.includes('commerce') || m.includes('management')) return 'Business'
        if (m.includes('art') || m.includes('social') || m.includes('humanities')) return 'Arts / Social Science'
        if (m.includes('aviation') || m.includes('aero')) return 'Aviation'
        return 'Others'
    }

    data.forEach(d => {
        const key = category(d.Major)
        map[key] = (map[key] || 0) + 1
    })

    return Object.entries(map).map(([label, value]) => ({ label, value }))
}

export function scholarshipBySchool(data: RecordItem[]) {
    const map: Record<string, number> = {}

    data.forEach(d => {
        map[d.School] = (map[d.School] || 0) + d['Scholarship Amount']
    })

    return Object.entries(map).map(([label, value]) => ({ label, value }))
}

export function scholarshipByName(data: RecordItem[]) {
    return data
        .filter(d => d['Scholarship Amount'] > 0)
        .map(d => ({
            Name: d.Name,
            Year: d.Year,
            School: d.School,
            ScholarshipName: d['Scholarship Name'],
            ScholarshipAmount: d['Scholarship Amount'],
        }))
}

/**
 * 
 * @param data 
 * @param by 
 * @param order 
 */
export function sortBy<T>(
    data: T[],
    by: keyof T,
    order: 'asc' | 'desc' = 'asc'
): T[] {
    return [...data].sort((a, b) => {
        const aVal = a[by];
        const bVal = b[by];

        if (aVal === bVal) return 0;

        if (aVal == null) return 1;
        if (bVal == null) return -1;

        const result =
            typeof aVal === 'number' && typeof bVal === 'number'
                ? aVal - bVal
                : String(aVal).localeCompare(String(bVal));

        return order === 'asc' ? result : -result;
    });
}