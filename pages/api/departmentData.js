// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    res.status(200).json([
        { label: 'School of Computing Science & Engineering', value: 'School of Computing Science & Engineering' },
        { label: 'School of Electrical, Electronics & Communication Engineering', value: 'School of Electrical, Electronics & Communication Engineering' },
        { label: 'School of Civil Engineering', value: 'School of Civil Engineering' },
        { label: 'School of Mechanical Engineering', value: 'School of Mechanical Engineering' }])
}
