import React from 'react';
import Image from "next/image";
import Link from "next/link";
import GIF from '../public/error.gif'
import { motion } from "framer-motion"

function Error404() {
    return (
        <motion.section
            initial={{
                opacity: 0,
                y: -30
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: 0.5,
            }}
            exit={{
                opacity: 0,
                y: 30
            }}
            key="404"
            className="ErrorPagepage_404">
            <div className="ErrorPagecointainer">
                <h1 className="ErrorPagetext-center text404">
                    404
                </h1>
                <div className="ErrorPageimageGIF">
                    <Image src={GIF} alt="GIF 404" />
                </div>
                <div className="ErrorPagecontant_box_404">
                    <h3 className="ErrorPageh2">
                        Look like you're lost
                    </h3>
                    <p>
                        The page you are looking for not avaible!
                    </p>
                    <Link href="/" className="ErrorPagelink_404">
                        <a>
                            Go to Home
                        </a>
                    </Link>
                </div>
            </div>
        </motion.section>
    )
}

export default Error404
