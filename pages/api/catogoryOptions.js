// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    res.status(200).json([
        { label: 'Dean', value: 'Dean' },
        { label: 'Faculty', value: 'Faculty' },
        { label: 'Program Chair', value: 'Program Chair' },
        { label: 'Project Cordinator', value: 'Project Cordinator' },
        { label: 'Project Team Member', value: 'Project Team Member' }])
}
