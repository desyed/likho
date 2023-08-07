import Link from "next/link";
import {Github, Linkedin, Twitter} from "lucide-react";

const Footer = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full bg-gray-100 py-10">
            <div className="flex gap-5">
                <Link href="https://github.com/desyed/likho" target="_blank"><Github width={20} /></Link>
                <Link href="https://twitter.com/dev_syedshihab" target="_blank"><Twitter width={20} /></Link>
                <Link href="https://linkedin.com/in/syedshihab" target="_blank"><Linkedin width={20} /></Link>
            </div>
            <p className="text-gray-500 mt-2 text-sm uppercase">Developed by <a href="https://github.com/desyed" className="text-gray-900 hover:text-gray-500">Syed Shihab</a></p>
            <p className="text-gray-500 text-xs">Proudly open source</p>
        </div>
    )

}
export default Footer;