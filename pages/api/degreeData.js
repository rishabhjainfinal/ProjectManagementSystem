// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    res.status(200).json([
        { label: 'Bachelor of Technology', value: 'Bachelor of Technology' },
        { label: 'Bachelor of Science', value: 'Bachelor of Science' },
        { label: 'Bachelor of Computer Applications', value: 'Bachelor of Computer Applications' },
        { label: 'Master of Technology', value: 'Master of Technology' },
        { label: 'Master of Science', value: 'Master of Science' },
        { label: 'Master of Computer Applications', value: 'Master of Computer Applications' },
    ])
}
