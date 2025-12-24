export type RecordItem = {
    "Name": string
    "Year": number
    "School": string
    "Major": string
    "Scholarship Name": string
    "Scholarship Amount": number
}

export function cleanData(data: RecordItem[]) {
    return data.filter(d => d.Name && d.School)
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