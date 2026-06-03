import { motion } from 'framer-motion';

export default function GenericHeroSection({ title, subtitle }: { title: string, subtitle: string }) {
    return (
        <section className="pt-32 pb-16 px-6 bg-[#FAFAFA]">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                        {title}
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        {subtitle}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
